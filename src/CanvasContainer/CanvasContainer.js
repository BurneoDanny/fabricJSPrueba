import { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import SideBar from '../Sidebar/Sidebar';
import FabricJS from './FabricsJS/FabricJS';

export default function CanvasContainer() {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas('canvas', {
      width: 800,
      height: 600,
      selection: true,
      lockScalingFlip: true,
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

    // fabricCanvas.on('selection:created', function(event){
    //   const obj = fabricCanvas.getActiveObject();
    //   if (obj) {
    //     if (obj.type === 'activeSelection') {
    //       const center = obj.getCenterPoint();
    //       console.log("top - left" , obj.top, obj.left)
    //       console.log("centerY - centerX", center.y, center.x)
    //       obj._objects.forEach(innerObj => {
    //         innerObj.top = (innerObj.top + center.y) * obj.scaleY;
    //         innerObj.left = (innerObj.left + center.x) * obj.scaleX;
    //         innerObj.scaleX = innerObj.scaleX * obj.scaleX;
    //         innerObj.scaleY = innerObj.scaleY * obj.scaleY;
    //         console.log("innertop - innerleft" , innerObj.top, innerObj.left , innerObj)
    //       });
    //     }
    //   }
    // })

    fabricCanvas.on('object:scaling', function (e) {
      const obj = e.target;
      obj.lockScalingFlip = true;

    });


    fabricCanvas.on('before:selection:cleared',function(e){
      const modifiedObject = e.target;
      if (modifiedObject._objects && modifiedObject.type === 'activeSelection' && modifiedObject.isOnScreen()) {
        const group = modifiedObject;
        const center = group.getCenterPoint();
        group._objects.forEach(function (innerObj) {

          innerObj.top = (innerObj.top + center.y) * group.scaleY;
          innerObj.left = (innerObj.left + center.x) * group.scaleX;
          innerObj.scaleX = innerObj.scaleX * group.scaleX;
          innerObj.scaleY = innerObj.scaleY * group.scaleY;

          console.log("inner", innerObj.left, innerObj.top, innerObj.scaleX, innerObj.scaleY);
          if (!innerObj.isOnScreen()) {
            console.log("A group object is outside the screen!!");
          }
          
        });
      } 
    })

    fabricCanvas.on('object:modified', function (e) {
      const modifiedObject = e.target;
      console.log("modified")
      if (modifiedObject) {
          if (!modifiedObject.isOnScreen()) {
            console.log("objeto fuera")
            modifiedObject.set({
              left: initialLeft,
              top: initialTop,
              scaleX: initialScaleX,
              scaleY: initialScaleY,
            });
            modifiedObject.setCoords();
            fabricCanvas.requestRenderAll();
          }
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
      fabricCanvas.off('selection:created');
      fabricCanvas.dispose();
    };
  }, []);

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
    <div>
      <SideBar onImageUpload={handleImageUpload} generateDownload={generateDownload} />
      <FabricJS canvas={canvas} />
    </div>
  );
}

