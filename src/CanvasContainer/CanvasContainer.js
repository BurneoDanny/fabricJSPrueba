import { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import SideBar from '../Sidebar/Sidebar';
import FabricJS from './FabricsJS/FabricJS';

import './canvas.css';

export default function CanvasContainer() {
  const [canvas, setCanvas] = useState(null);
  const [limiter, setLimiter] = useState(null);
  let topper, botter, lefter, righter;



  useEffect(() => {

    const container = document.getElementById('container');

    const fabricCanvas = new fabric.Canvas('canvas', {
      width: container.offsetWidth,
      height: container.offsetHeight,
      backgroundColor: '#ccc',
      selection: true,
      lockScalingFlip: true,
      centeredScaling: true,
    });


    const limiter = new fabric.Rect({
      fill: '#fff',
      width: 1000,
      height: 1000,
      selectable: false,
      hoverCursor: 'auto',

    });


    fabricCanvas.add(limiter);

    topper = new fabric.Rect({ top: -1001, left: -1000, fill: "#ccc", width: 3000, height: 1000, selectable: false, hoverCursor: 'auto' });
    fabricCanvas.add(topper);

    botter = new fabric.Rect({ top: 1000, left: -1000, fill: "#ccc", width: 3000, height: 1000, selectable: false, hoverCursor: 'auto' });
    fabricCanvas.add(botter);

    lefter = new fabric.Rect({ left: -1001, top: -5, fill: "#ccc", width: 1000, height: 1010, selectable: false, hoverCursor: 'auto' });
    fabricCanvas.add(lefter);

    righter = new fabric.Rect({ left: 1000, top: -5, fill: "#ccc", width: 1000, height: 1010, selectable: false, hoverCursor: 'auto' });
    fabricCanvas.add(righter);




    fabricCanvas.setZoom(0.5);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    fabricCanvas.forEachObject((obj) => {
      const objBoundingBox = obj.getBoundingRect();
      minX = Math.min(minX, objBoundingBox.left);
      minY = Math.min(minY, objBoundingBox.top);
      maxX = Math.max(maxX, objBoundingBox.left + objBoundingBox.width);
      maxY = Math.max(maxY, objBoundingBox.top + objBoundingBox.height);
    });
    const boundingBoxCenterX = (minX + maxX) / 2;
    const boundingBoxCenterY = (minY + maxY) / 2;
    const viewportCenter = fabricCanvas.getCenter();
    const deltaX = viewportCenter.left - boundingBoxCenterX;
    const deltaY = viewportCenter.top - boundingBoxCenterY;

    // Setting canvas viewport's center to bounding box's center
    fabricCanvas.relativePan(new fabric.Point(deltaX, deltaY));



    fabricCanvas.on('mouse:wheel', function (opt) {
      var delta = opt.e.deltaY;
      var zoom = fabricCanvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.1) zoom = 0.1;
      fabricCanvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();



    });

    let initialTop, initialLeft, initialScaleX, initialScaleY;
    fabricCanvas.on('mouse:down', function (e) {
      const obj = e.target;
      if (obj && obj.selectable) {
        initialTop = obj.top;
        initialLeft = obj.left;
        initialScaleX = obj.scaleX;
        initialScaleY = obj.scaleY;
      }
    });


    fabricCanvas.on('object:scaling', function (e) {
      const obj = e.target;
      obj.lockScalingFlip = true;

    });

    fabricCanvas.on('object:moving', function (event) {
      const obj = event.target;
      const objectsToCheck = [topper, botter, righter, lefter];

      for (const checker of objectsToCheck) {
        if (obj.intersectsWithObject(checker)) {
          checker.bringToFront();
        }
      }
    });


    fabricCanvas.on('object:modified', function (e) {
      const obj = e.target;
      if (obj && !obj.intersectsWithObject(limiter)) {
        obj.set({
          left: initialLeft,
          top: initialTop,
          scaleX: initialScaleX,
          scaleY: initialScaleY,
        });
        obj.setCoords();
        fabricCanvas.requestRenderAll();
      }
    });

    fabricCanvas.on('before:selection:cleared', function (e) {
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


        fabricCanvas.renderAll();
      }
    });


    var blue = new fabric.Rect({ fill: "blue", width: 100, height: 100 });
    fabricCanvas.add(blue);

    setCanvas(fabricCanvas);
    setLimiter(limiter);


    return () => {
      fabricCanvas.off('mouse:down');
      fabricCanvas.off('object:scaling');
      fabricCanvas.off('object:modified');
      fabricCanvas.off('before:selection:cleared');
      fabricCanvas.dispose();
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

        document.body.classList.add('alt-panning'); // Agregar clase al cuerpo del documento
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
    const handleKeyDowm = (event) => {
      if (canvas) {

        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          if (event.ctrlKey && event.key === 'c') {
            copyObjects();
          } else if (event.ctrlKey && event.key === 'v') {
            pasteObjects();
          } else if (!activeObject.isEditing && (event.key === 'Delete' || event.key === "Backspace")) {
            deleteObjects();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDowm);

    return () => {
      document.removeEventListener('keydown', handleKeyDowm);
    };
  }, [canvas]);

  const copyObjects = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.getActiveObject().clone((cloned) => {
          canvas.set('clipboard', cloned);
        });
      }
    }
  };

  const pasteObjects = () => {
    if (canvas) {
      canvas.get('clipboard').clone((clonedObj) => {
        canvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
          clonedObj.canvas = canvas;
          clonedObj.forEachObject((obj) => {
            canvas.add(obj);
          });
          clonedObj.setCoords();
        } else {
          canvas.add(clonedObj);
        }
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
      })
    }
  };

  const deleteObjects = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === 'activeSelection') {
        activeObject.forEachObject((obj) => {
          canvas.remove(obj);
        });
      }
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  const generateDownload = () => {
    if (canvas) {
      let tempCanvas = new fabric.Canvas();
      canvas.clone(tempCanvas => {
        tempCanvas.remove(topper);
        tempCanvas.remove(botter);
        tempCanvas.remove(lefter);
        tempCanvas.remove(righter);



        limiter.set({ left: 0, top: 0 });
        tempCanvas.setDimensions({ width: limiter.width, height: limiter.height });
        tempCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

        tempCanvas.renderAll();
        const dataURL = tempCanvas.toDataURL({
          format: 'png',
          quality: 1
        });

        // Crear un enlace de descarga para la imagen
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'Sin_Titulo.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);



        tempCanvas.dispose();
      });
    }
  };

  const prueba = () => {
    if (canvas) {
      canvas.remove(topper);
      canvas.remove(botter);
      canvas.remove(lefter);
      canvas.remove(righter);



      limiter.set({ left: 0, top: 0 });
      canvas.setDimensions({ width: limiter.width, height: limiter.height });
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);



      canvas.renderAll();



    }
  }



  return (
    <div className='overflow-hidden bg-slate-100' style={{ minWidth: '100%', minHeight: '100%' }}>
      <SideBar canvas={canvas} generateDownload={generateDownload} />
      <FabricJS canvas={canvas} />
      <div className='absolute w-42 h-10 bg-black text-white font-semibold text-base'>
        <button className='w-full h-full' onClick={prueba}>DISTORSIONAR</button>
      </div>
    </div>
  );
}

