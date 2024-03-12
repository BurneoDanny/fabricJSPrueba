import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


export default function FabricJS({ canvas }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleWheel = (ref, event) => {
    if (canvas) {
      const newZoomLevel = zoomLevel + event.deltaY * 0.001;
      const clampedZoomLevel = Math.max(1, Math.min(6, newZoomLevel));

      // Calculate the zoom factor
      const zoom = clampedZoomLevel / zoomLevel;

      var canvasWidth = canvas.width;
      var canvasHeight = canvas.height;

      canvas.forEachObject((obj) => {
        obj.set({
          left: obj.left * zoom,
          top: obj.top * zoom,
          scaleX: obj.scaleX * zoom,
          scaleY: obj.scaleY * zoom,
        });
        obj.setCoords();
      });

      canvas.discardActiveObject();
      canvas.setDimensions({
        width: canvasWidth * zoom,
        height: canvasHeight * zoom,
      });

      // Update zoom level and render canvas
      setZoomLevel(clampedZoomLevel);
      canvas.renderAll();

      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    // <TransformWrapper maxScale={6} panning={{ activationKeys: ["Shift"] }} wheel={{ smoothStep: 0.002, activationKeys: ["Control"] }}
    //  className="border border-black">
    //   <TransformComponent >
        <div className=" bg-slate-100 h-[calc(100vh-55px)] flex justify-center items-center" id="container">
          <canvas id="canvas" className="border borde-black"></canvas>
        </div>
    //   </TransformComponent>
    // </TransformWrapper>
  );
}
