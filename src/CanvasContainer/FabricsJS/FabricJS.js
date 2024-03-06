import { useEffect } from "react";


export default function FabricJS({ canvas }) {

  useEffect(() => {
    if (canvas) {
      // Establecer el color de fondo del canvas como blanco
      canvas.setBackgroundColor('#ffffff', canvas.renderAll.bind(canvas));
      
    }
  }, [canvas]);


  return (
    <div className="bg-slate-100 h-[calc(100vh-55px)] flex justify-center items-center">
      <canvas id="canvas" className="border canvas" />
    </div>

  );
}
