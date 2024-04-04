import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fabric } from 'fabric';
import SideBar from '../Sidebar/Sidebar';
import axios from 'axios';

import './canvas.css';

import HandleKeyDown from './FabricsJS/HandleKeyDown';
import HandleDownload from './FabricsJS/HandleDownload';
import RightClickMenu from './RightClickMenu/RightClickMenu';

export default function CanvasContainer() {
  const { id } = useParams();
  const [canvas, setCanvas] = useState(null);
  const [limiter, setLimiter] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);


  useEffect(() => {
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = '#051E46';
    fabric.Object.prototype.cornerStyle = 'circle';

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
        const applyZoomAndCenterLimiter = (limiter) => {
          const zoomLevel = 0.4;
          canvas.setZoom(zoomLevel);
          const canvasCenter = {
            x: canvas.width / 2,
            y: canvas.height / 2,
          };
          const limiterCenter = {
            x: limiter.left + (limiter.width * zoomLevel) / 2,
            y: limiter.top + (limiter.height * zoomLevel) / 2,
          };
          const panX = canvasCenter.x - limiterCenter.x;
          const panY = canvasCenter.y - limiterCenter.y;
          canvas.relativePan({ x: panX, y: panY });
          canvas.renderAll();
        };

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

        applyZoomAndCenterLimiter(limiter);
        setLimiter(limiter);
        canvas.add(limiter);
        canvas.clipPath = limiter;
        limiter.sendToBack();
        canvas.renderAll();
        let initialTop, initialLeft, initialScaleX, initialScaleY, initialAngle;
        canvas.on('mouse:down', function (e) {
          const obj = e.target;
          if (obj && obj.selectable) {
            initialTop = obj.top;
            initialLeft = obj.left;
            initialScaleX = obj.scaleX;
            initialScaleY = obj.scaleY;
            initialAngle = obj.angle;
            if (e.button === 3) {
              canvas.setActiveObject(obj);
              e.e.preventDefault();
              setShowMenu(true);
              setMenuPosition({ x: e.e.clientX, y: e.e.clientY });
            }
          }
        });

        canvas.on('object:scaling', function (e) {
          const obj = e.target;
          obj.lockScalingFlip = true;

        });

        canvas.on('object:modified', function (e) {
          const obj = e.target;
          if (obj && !obj.intersectsWithObject(limiter)) {
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

        canvas.selection = true;
        canvas.centeredScaling = true;
        canvas.lockScalingFlip = true;
        canvas.stopContextMenu = true;
        canvas.fireRightClick = true;
        canvas.controlsAboveOverlay = true;

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

      })
      .catch(error => {
        console.error(error);
      });


    return () => {
      canvas.off('mouse:down');
      canvas.off('object:scaling');
      canvas.off('object:modified');
      canvas.off('before:selection:cleared');
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
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
    }
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

  const onAction = (action) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && limiter) {
      switch (action) {
        case 'bringToFront':
          activeObject.bringToFront();
          break;
        case 'bringForward':
          activeObject.bringForward();
          break;
        case 'bringBackward':
          activeObject.sendBackwards();
          limiter.sendToBack();
          break;
        case 'sendToBack':
          activeObject.sendToBack();
          limiter.sendToBack();
          break;
        default:
          break;
      }
      setShowMenu(false);
    }
  };

  return (
    <>
      <SideBar canvas={canvas} generateDownload={generateDownload} />
      <div className="h-[calc(100vh-55px)] flex justify-center items-center overflow-auto bg-[#ccc]" id="container" >
        <canvas id="canvas" className="border border-black"></canvas>
      </div>
      <div className='absolute right-0 w-42 h-10 bg-black text-white font-semibold text-base'>
        <button className='w-full h-full' onClick={updateCanvas}>Guardar Canvas</button>
      </div>
      {showMenu && <RightClickMenu onClose={() => setShowMenu(false)} x={menuPosition.x} y={menuPosition.y} onAction={onAction} />}
    </>
  );
}

