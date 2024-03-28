const HandleDownload = (canvas, limiter) => {
  if (!canvas) return;
  canvas.clone(tempCanvas => {
    limiter.set({ left: 0, top: 0 });
    tempCanvas.setDimensions({ width: limiter.width, height: limiter.height });
    tempCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

    tempCanvas.renderAll();
    const dataURL = tempCanvas.toDataURL({
      format: 'png',
      quality: 1
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'Sin_Titulo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);



    tempCanvas.dispose();
  });
};

export default HandleDownload;
