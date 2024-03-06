import { useEffect } from "react";


export default function FabricJS() {


  return (
    <div className="bg-slate-100 h-[calc(100vh-55px)] flex justify-center items-center">
      <canvas id="canvas" className="border w-full h-full" />
    </div>

  );
}
