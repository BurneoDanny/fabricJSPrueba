import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fabric } from 'fabric';
import SideBar from '../Sidebar/Sidebar';
import FabricJS from './FabricsJS/FabricJS';
import axios from 'axios';

import './canvas.css';

import HandleKeyDown from './FabricsJS/HandleKeyDown';
import HandleDownload from './FabricsJS/HandleDownload';

export default function CanvasContainer() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState(null);
  const [limiter, setLimiter] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/canvas/get/${id}`)
      .then(response => {
        const canvasJson = response.data.content;
        const container = document.getElementById('container');
        const canvas = new fabric.Canvas('canvas', {
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
        canvas.loadFromJSON(canvasJson, () => {
          canvas.renderAll();
        });

        handleCanvasFunctionalities(canvas);
        handleCopyPaste(canvas);
        handlePanning(canvas);

        setCanvas(canvas);
        setLimiter(limiter);
      })
      .catch(error => {
        console.error(error);
      });

  }, [id]);

  const handleCanvasFunctionalities = (canvas) => {
    canvas.setZoom(0.5);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    canvas.forEachObject((obj) => {
      const objBoundingBox = obj.getBoundingRect();
      minX = Math.min(minX, objBoundingBox.left);
      minY = Math.min(minY, objBoundingBox.top);
      maxX = Math.max(maxX, objBoundingBox.left + objBoundingBox.width);
      maxY = Math.max(maxY, objBoundingBox.top + objBoundingBox.height);
    });

    const boundingBoxCenterX = (minX + maxX) / 2;
    const boundingBoxCenterY = (minY + maxY) / 2;
    const viewportCenter = canvas.getCenter();
    const deltaX = viewportCenter.left - boundingBoxCenterX;
    const deltaY = viewportCenter.top - boundingBoxCenterY;
    // Setting canvas viewport's center to bounding box's center
    canvas.relativePan(new fabric.Point(deltaX, deltaY));

    canvas.on('mouse:wheel', function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.1) zoom = 0.1;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    canvas.on('object:scaling', function (e) {
      const obj = e.target;
      obj.lockScalingFlip = true;
    });

    let initialTop, initialLeft, initialScaleX, initialScaleY;
    canvas.on('mouse:down', function (e) {
      const obj = e.target;
      if (obj && obj.selectable) {
        initialTop = obj.top;
        initialLeft = obj.left;
        initialScaleX = obj.scaleX;
        initialScaleY = obj.scaleY;
      }
    });

    canvas.on('object:modified', function (e) {
      const obj = e.target;
      if (obj && !obj.intersectsWithObject(limiter)) {
        console.log('out of bounds');
        obj.set({
          left: initialLeft,
          top: initialTop,
          scaleX: initialScaleX,
          scaleY: initialScaleY,
        });
        obj.setCoords();
        canvas.requestRenderAll();
      }
    });

    canvas.on('before:selection:cleared', function (e) {
      const obj = e.target;
      if (obj && obj.type === 'activeSelection') {
        const limiterWith = limiter.width;
        const limiterHeight = limiter.height;
        const leftBoundary = 0;
        const topBoundary = 0;
        const rightBoundary = limiterWith - obj.width * obj.scaleX;
        const bottomBoundary = limiterHeight - obj.height * obj.scaleY;
        obj.set({
          left: Math.max(leftBoundary, Math.min(obj.left, rightBoundary)),
          top: Math.max(topBoundary, Math.min(obj.top, bottomBoundary))
        });
        canvas.renderAll();
      }
    });


    return () => {
      canvas.off('mouse:down');
      canvas.off('object:scaling');
      canvas.off('object:modified');
      canvas.off('before:selection:cleared');
    };
  };

  const handleCopyPaste = (canvas) => {

    const handleKeyInteraction = (event) => {
      HandleKeyDown(event, canvas);
    };
    document.addEventListener('keydown', handleKeyInteraction);

    return () => {
      document.removeEventListener('keydown', handleKeyInteraction);
    };

  };

  const handlePanning = (canvas) => {

    let isPanning = false;
    let lastPosX = 0;
    let lastPosY = 0;

    const handleMouseDown = (event) => {
      if (event.altKey) {
        isPanning = true;
        lastPosX = event.clientX;
        lastPosY = event.clientY;

        document.body.classList.add('alt-panning');
      }
    };

    const handleMouseMove = (event) => {
      if (isPanning) {
        const deltaX = event.clientX - lastPosX;
        const deltaY = event.clientY - lastPosY;

        // Panning the canvas
        canvas.relativePan({ x: deltaX, y: deltaY });

        lastPosX = event.clientX;
        lastPosY = event.clientY;
      }
    };

    const handleMouseUp = () => {
      isPanning = false;

      document.body.classList.remove('alt-panning');
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

  };


  const updateCanvas = () => {
    if (canvas) {
      const canvasJson = JSON.stringify(canvas.toJSON(['selectable', 'hoverCursor']));
      axios.put(`${process.env.REACT_APP_BACKEND_URL}/canvas/put/${id}`, { content: canvasJson })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const generateDownload = () => {
    if (canvas) {
      HandleDownload(canvas, limiter)
    }
  };

  return (
    <div className='overflow-hidden bg-slate-100' style={{ minWidth: '100%', minHeight: '100%' }}>
      <SideBar canvas={canvas} generateDownload={generateDownload} />
      <FabricJS canvas={canvas} />
      <div className='absolute w-42 h-10 bg-black text-white font-semibold text-base'>
        <button className='w-full h-full' onClick={updateCanvas}>Guardar Canvas</button>
      </div>
    </div>
  );
}

