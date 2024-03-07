import { useEffect } from "react";


export default function FabricJS() {


  return (
    <div className=" bg-green-300 h-[calc(100vh-55px)] flex justify-center items-center" id="container">
      <canvas id="canvas" className="border border-black "></canvas>
    </div>
  );
}
