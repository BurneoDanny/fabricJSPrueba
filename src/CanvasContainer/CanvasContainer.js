import { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import SideBar from '../Sidebar/Sidebar';
import FabricJS from './FabricsJS/FabricJS';

export default function CanvasContainer() {
  const [canvas, setCanvas] = useState(null);
  let fabricCanvas; 

  useEffect(() => {

    fabricCanvas = new fabric.Canvas('canvas', {
      width: 800,
      height: 600,
      backgroundColor: '#fff',
      selection: true,
      lockScalingFlip: true,
    });

    const container = document.getElementById('container');

    container.addEventListener('wheel', function (opt) {
      fabricCanvas.lowerCanvasEl = document.getElementById('canvas');
      if (opt.ctrlKey && fabricCanvas.lowerCanvasEl !== undefined) {
        console.log("pasa por aqui")
        var delta = opt.deltaY;
        var zoom = fabricCanvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.5) zoom = 0.5;
        var currentWidth = fabricCanvas.width;
        var currentHeight = fabricCanvas.height;

        // Ajustar el tamaño del canvas junto con el zoom
        var newWidth = currentWidth * zoom;
        var newHeight = currentHeight * zoom;

        // Cambiar el tamaño del canvas
        fabricCanvas.setDimensions({
          width: newWidth,
          height: newHeight
        });

        fabricCanvas.forEachObject(function (obj) {
          console.log(obj.left, obj.top, obj.scaleX, obj.scaleY);
          obj.scaleX *= zoom;
          obj.scaleY *= zoom;
          obj.setCoords();
          console.log(obj.left, obj.top, obj.scaleX, obj.scaleY);
        });
    
        // Aplicar el zoom al punto especificado
        //fabricCanvas.zoomToPoint({ x: opt.offsetX, y: opt.offsetY }, zoom);
        opt.preventDefault();
        opt.stopPropagation();
      }
    });
    


    let initialTop, initialLeft, initialScaleX, initialScaleY;
    fabricCanvas.on('mouse:down', function (e) {
      const obj = e.target;
      console.log("pasa por aqui", obj);
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

    fabricCanvas.on('object:modified', function (e) {
      const obj = e.target;
      if (obj && !obj.isOnScreen()) {
        console.log("OBJETO COMPLETO AFUERA")
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
        const canvasWidth = fabricCanvas.width;
        const canvasHeight = fabricCanvas.height;

        const leftBoundary = 0;
        const topBoundary = 0;
        const rightBoundary = canvasWidth - obj.width * obj.scaleX;
        const bottomBoundary = canvasHeight - obj.height * obj.scaleY;

        obj.set({
          left: Math.max(leftBoundary, Math.min(obj.left, rightBoundary)),
          top: Math.max(topBoundary, Math.min(obj.top, bottomBoundary))
        });

        fabricCanvas.renderAll();
      }
    });


    var rect = new fabric.Rect({ fill: "red", width: 100, height: 100 });
    var rect2 = new fabric.Rect({ fill: "blue", width: 100, height: 100 });
    fabricCanvas.add(rect);
    fabricCanvas.add(rect2);

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.off('mouse:down');
      fabricCanvas.off('object:scaling');
      fabricCanvas.off('object:modified');
      fabricCanvas.off('before:selection:cleared');
      fabricCanvas.dispose();
    };
  }, []);


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

  const handleImageUpload = (imageUrl) => {
    if (canvas) {
      fabric.Image.fromURL(imageUrl, (img) => {
        // Scale the image to fit the canvas
        img.scaleToWidth(800);
        img.scaleToHeight(600);
        canvas.add(img);
      });
    }
  };

  const generateDownload = () => {
    if (canvas) {
      // Get the canvas data URL
      const dataURL = canvas.toDataURL({ format: 'png' });

      // Create a download link
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'Sin Titulo.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className='overflow-hidden ' style={{ minWidth: '100%', minHeight: '100%' }}>
      <SideBar onImageUpload={handleImageUpload} generateDownload={generateDownload} canvas={canvas} />
      <FabricJS />
    </div>
  );
}

