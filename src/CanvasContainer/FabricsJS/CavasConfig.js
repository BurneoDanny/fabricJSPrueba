
import { fabric } from "fabric";
import { useRef, useEffect, useState } from "react";


export default function InitialCanvas (props) {
    //const canvasRef = useRef(null)
    //const etiqueta = props.etiqueta

    useEffect(()=>{
        const canvas = new fabric.Canvas('canvas',{
            height: 800,
            width: 1200,
            backgroundColor: '#aaaaaa'
        });
        
        fabric.Image.fromURL("", function (img) { //Hay que poner el url
            scaleImage(img, canvas);
            img=img.set({
              id:"Image",
              selectable:false,
              hoverCursor:"arrow"
            }) 
            canvas.add(img);
            canvas.centerObject(img)
            canvas.sendToBack(img);
            
          });
        
        
        return () => canvas.dispose();
    }, []);
    
    return (
        <div className="mx-auto"> 
            <canvas id="canvas" />
        </div>
    );
}


//funcion de escalado automatico para imagenes respecto al canvas
function scaleImage(img, canvas){
    const imageAspectRatio = img.width / img.height;
    const canvasAspectRatio = canvas.getWidth() / canvas.getHeight();

    let scaleFactor;
    if (imageAspectRatio > canvasAspectRatio){
        scaleFactor = canvas.getWidth() / img.width;
    } else {
        scaleFactor = canvas.getHeight() / img.height;
    }
    img.scale(scaleFactor);
    img.set({ left: canvas.getWidth() / 2, top: canvas.getHeight() / 2 }); 
}

