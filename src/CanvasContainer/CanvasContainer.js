import { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import SideBar from '../Sidebar/Sidebar';
import FabricJS from './FabricsJS/FabricJS';

export default function CanvasContainer() {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const container = document.getElementById('container');

    const fabricCanvas = new fabric.Canvas('canvas', {
      width: container.offsetWidth,
      height: container.offsetHeight,
      backgroundColor: '#ccc',
      selection: true,
      lockScalingFlip: true,
    });

    const clip = new fabric.Rect({
      width: 800,
      height: 600,
      fill: '#fff', 
      left: fabricCanvas.width / 2 - 800 / 2,
      top: fabricCanvas.height / 2 - 600 / 2,
      selectable: false,
      stroke: '#000', 
      strokeWidth: 2,
    });

    fabricCanvas.add(clip);


    let isAdjusting = false; // Variable para controlar si ya se está ajustando la posición

    fabricCanvas.on('after:render', function (event) {
      if (!isAdjusting) {
        isAdjusting = true;
    
        fabricCanvas.forEachObject(function (obj) {
          // Verificar si el objeto está fuera de los límites del clip
          if (
            obj.left < clip.left ||
            obj.top < clip.top ||
            obj.left + obj.width > clip.left + clip.width ||
            obj.top + obj.height > clip.top + clip.height
          ) {
            // Ajustar la posición del objeto para que esté dentro de los límites del clip
            obj.set({
              left: Math.max(clip.left, Math.min(obj.left, clip.left + clip.width - obj.width)),
              top: Math.max(clip.top, Math.min(obj.top, clip.top + clip.height - obj.height)),
            });
          }
        });
    
        fabricCanvas.renderAll(); // Volver a renderizar el lienzo con los ajustes
    
        isAdjusting = false; // Restablecer la variable después de ajustar
      }
    });

    
    fabricCanvas.on('mouse:wheel', function (opt) {
      if (opt.e.ctrlKey) {
        var delta = opt.e.deltaY;
        var zoom = fabricCanvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.5) zoom = 0.5;


        fabricCanvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      }
    });

    let initialTop, initialLeft, initialScaleX, initialScaleY;
    fabricCanvas.on('mouse:down', function (event) {
      const obj = event.target;
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

    //const rectB = new fabric.Rect({ fill: 'white', width: 600, height: 400, selectable: false, hoverCursor:'arrow'});
    //fabricCanvas.add(rectB);
    //fabricCanvas.centerObject(rectB);
    //fabricCanvas.sendToBack(rectB);
    var rect = new fabric.Rect({ fill: "red", width: 100, height: 100 });
    var rect2 = new fabric.Rect({ fill: "blue", width: 100, height: 100 });
    fabricCanvas.add(rect);
    fabricCanvas.add(rect2);

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.off('mouse:wheel')
      fabricCanvas.off('mouse:down');
      fabricCanvas.off('object:scaling');
      fabricCanvas.off('object:modified');
      fabricCanvas.off('selection:created');
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
  
    if(canvas){

          //----------zoom controls-------------
          canvas.on('mouse:wheel', function(opt) {
            if (opt.e.ctrlKey) {
              let delta = opt.e.deltaY;
              let zoom = canvas.getZoom();
              let center = canvas.getCenter();
              zoom *= 0.999 ** delta;
              if (zoom > 5) zoom = 5;
              if (zoom < 0.5) zoom = 0.5;
              if(zoom >0.5 && zoom<=1) {canvas.zoomToPoint({ x: center.left, y:  center.top }, zoom)
              }else{canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)}
              opt.e.preventDefault();
              opt.e.stopPropagation();
              let vpt = this.viewportTransform;
              console.log(canvas.getWidth() * zoom);
              console.log(vpt[4])
                if (vpt[4] >= 0) {
                  vpt[4] = 0;
                } else if (vpt[4] < canvas.getWidth() - (canvas.getWidth() * zoom)) {
                  vpt[4] = canvas.getWidth() - (canvas.getWidth() * zoom);
                }
                if (vpt[5] >= 0) {
                  vpt[5] = 0;
                } else if (vpt[5] < canvas.getHeight() - (canvas.getHeight() * zoom)) {
                  vpt[5] = canvas.getHeight() - (canvas.getHeight() * zoom);
                }
              }
          });


          
          //-----------------------------------
          //-----------Dragging controls-------
          canvas.on('mouse:down', function(opt) {
            var evt = opt.e;
            if (evt.altKey === true) {
              this.isDragging = true;
              this.selection = false;
              this.lastPosX = evt.clientX;
              this.lastPosY = evt.clientY;
            }
          });
          canvas.on('mouse:move', function(opt) {
            if (this.isDragging) {
              var e = opt.e;
              var vpt = this.viewportTransform;
              vpt[4] += e.clientX - this.lastPosX;
              vpt[5] += e.clientY - this.lastPosY;
              if (vpt[4] >= 0) {
                vpt[4] = 0;
              } else if (vpt[4] < canvas.getWidth() - (canvas.getWidth() * canvas.getZoom())) {
                vpt[4] = canvas.getWidth() - (canvas.getWidth() * canvas.getZoom());
              }
              if (vpt[5] >= 0) {
                vpt[5] = 0;
              } else if (vpt[5] < canvas.getHeight() - (canvas.getHeight() * canvas.getZoom())) {
                vpt[5] = canvas.getHeight() - (canvas.getHeight() * canvas.getZoom());
              }
              this.requestRenderAll();
              this.lastPosX = e.clientX;
              this.lastPosY = e.clientY;
            }
          });
          canvas.on('mouse:up', function(opt) {
            // on mouse up we want to recalculate new interaction
            // for all objects, so we call setViewportTransform
            this.setViewportTransform(this.viewportTransform);
            this.isDragging = false;
            this.selection = true;
          });
    //-----------------------------------
    

    
    }
  return (
    <div>
      <SideBar onImageUpload={handleImageUpload} generateDownload={generateDownload} canvas={canvas} />
      <FabricJS />
    </div>
  );
}

