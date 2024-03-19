const HandleKeyDown = (event, canvas) => {
    if(!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        if (event.ctrlKey && event.key === 'c') {
            activeObject.clone((cloned) => {
                canvas.set('clipboard', cloned);
            });
        } else if (event.ctrlKey && event.key === 'v') {
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
        } else if (!activeObject.isEditing && (event.key === 'Delete' || event.key === "Backspace")) {
            if (activeObject && activeObject.type === 'activeSelection') {
                activeObject.forEachObject((obj) => {
                    canvas.remove(obj);
                });
            }
            canvas.remove(activeObject);
            canvas.discardActiveObject();
            canvas.requestRenderAll();
        }
    }
};

export default HandleKeyDown;
