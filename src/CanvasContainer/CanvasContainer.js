import { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import SideBar from '../Sidebar/Sidebar';
import FabricJS from './FabricsJS/FabricJS';
import jsPDF from 'jspdf';


export default function CanvasContainer() {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas('canvas', {
      width: 800,
      height: 600,
    });

    var rect = new fabric.Rect({ fill: "red", width: 100, height: 100 });
    var rect2 = new fabric.Rect({ fill: "blue", width: 100, height: 100 });
    fabricCanvas.add(rect);
    fabricCanvas.add(rect2);

    let initialTop, initialLeft;

    fabricCanvas.on('mouse:down', function (event) {
      const obj = event.target;

      // Guardar las coordenadas iniciales solo si es un objeto seleccionable
      if (obj && obj.selectable) {
        initialTop = obj.top;
        initialLeft = obj.left;
      }
    });

    fabricCanvas.on('mouse:up', function (event) {
      const obj = event.target;

      // Verificar si el objeto es nulo antes de intentar acceder a sus propiedades
      if (obj && obj.selectable) {
        // Obtener las coordenadas del objeto al soltarlo
        const left = obj.left;
        const top = obj.top;
        const bottom = top + obj.height * obj.scaleY;
        const right = left + obj.width * obj.scaleX;
        // Verificar si el objeto está completamente fuera del canvas
        if (
          right < 0 ||  // está fuera del canvas por la parte izquierda
          left > fabricCanvas.width || // está fuera del canvas por la parte derecha
          top > fabricCanvas.height ||  // está fuera del canvas por la parte inferior
          bottom < 0  // está fuera del canvas por la parte de arriba
        ) {
          console.log("está fuera");
          // Restaurar la posición inicial solo si es un objeto seleccionable
          obj.set({ left: initialLeft, top: initialTop });
          obj.setCoords();
          fabricCanvas.requestRenderAll();
        } else {
          console.log("está dentro");
        }
      }
    });


    setCanvas(fabricCanvas);

    return () => {
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

  const generatePDF = () => {
    console.log('pdf')
    if(canvas){
      const doc = new jsPDF();
      const imgData = canvas.toDataURL({ format: 'png' })
      doc.addImage(imgData, 'png',0,0)
      doc.save("dowload.pdf")
    }
  }


  return (
    <div>
      <SideBar onImageUpload={handleImageUpload} generateDownload={generateDownload} generatePDF={generatePDF}/>
      <FabricJS canvas={canvas} />
    </div>
  );
}
