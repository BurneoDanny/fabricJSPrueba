import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fabric } from 'fabric';
import SideBar from '../Sidebar/Sidebar';
import axios from 'axios';

import './canvas.css';

import HandleKeyDown from './FabricsJS/HandleKeyDown';
import HandleDownload from './FabricsJS/HandleDownload';

export default function CanvasContainer() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState(null);
  const [limiter, setLimiter] = useState(null);


  useEffect(() => {

    const container = document.getElementById('container');
    const canvas = new fabric.Canvas('canvas', {
      width: container.offsetWidth,
      height: container.offsetHeight,
      backgroundColor: '#ccc',
    });
    canvas.off('mouse:down');
    canvas.off('object:scaling');
    canvas.off('object:modified');
    canvas.off('before:selection:cleared');

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/canvas/get/${id}`)
      .then(response => {
        if (response.data.content !== 'new') {
          canvas.loadFromJSON(response.data.content);
        }
        const limiter = new fabric.Rect({
          fill: '#fff',
          width: response.data.width,
          height: response.data.height,
          selectable: false,
          hoverCursor: 'auto',
          excludeFromExport: true,

        });

        canvas.add(limiter);
        limiter.sendToBack();
        canvas.renderAll();
        setLimiter(limiter);


        let initialTop, initialLeft, initialScaleX, initialScaleY, initialAngle;
        canvas.on('mouse:down', function (e) {
          const obj = e.target;
          if (obj && obj.selectable) {
            initialTop = obj.top;
            initialLeft = obj.left;
            initialScaleX = obj.scaleX;
            initialScaleY = obj.scaleY;
            initialAngle = obj.angle;
          }
        });

        canvas.on('object:scaling', function (e) {
          const obj = e.target;
          obj.lockScalingFlip = true;

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
              angle: initialAngle
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
        canvas.relativePan(new fabric.Point(deltaX, deltaY));

      })
      .catch(error => {
        console.error(error);
      });

    canvas.selection = true;
    canvas.centeredScaling = true;
    canvas.lockScalingFlip = true;



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



    setCanvas(canvas);
    return () => {
      canvas.off('mouse:down');
      canvas.off('object:scaling');
      canvas.off('object:modified');
      canvas.off('before:selection:cleared');
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
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

  }, [canvas]);

  useEffect(() => {
    if (canvas) {
      const handleKeyInteraction = (event) => {
        HandleKeyDown(event, canvas);
      };
      document.addEventListener('keydown', handleKeyInteraction);

      return () => {
        document.removeEventListener('keydown', handleKeyInteraction);
      };
    }
  }, [canvas]);

  const updateCanvas = () => {
    if (canvas) {
      limiter.excludeFromExport = true;
      const canvasJson = JSON.stringify(canvas.toJSON(['selection', 'centeredScaling', 'lockScalingFlip']));
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
      limiter.excludeFromExport = false;
      HandleDownload(canvas, limiter)
    }
  };


  return (
    <>
      <SideBar canvas={canvas} generateDownload={generateDownload} />
      <div className="h-[calc(100vh-55px)] flex justify-center items-center overflow-auto bg-white" id="container" >
        <canvas id="canvas" className="border border-black"></canvas>
      </div>
      <div className='absolute right-0 w-42 h-10 bg-black text-white font-semibold text-base'>
        <button className='w-full h-full' onClick={updateCanvas}>Guardar Canvas</button>
      </div>
    </>
  );
}

