import CanvasCard from "./CanvasCard/CanvasCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { fabric } from 'fabric';

export default function CanvasSelectionMenu() {
    const [canvasName, setCanvasNames] = useState("Nombre del Canvas");
    const [canvasList, setCanvasList] = useState([]);
    const [hasCanvas, setHasCanvas] = useState(false);

    const addCanvas = () => {

        const canvas = new fabric.Canvas('c', {
            backgroundColor: "#ccc",
            selection: true,
            centeredScaling: true
        });

        const limiter = new fabric.Rect({
            fill: '#fff',
            width: 1000,
            height: 1000,

        });

        limiter.toObject = (function (toObject) {
            return function () {
                return fabric.util.object.extend(toObject.call(this), {
                    isLimiter: true,
                    selectable: false,
                    hoverCursor: 'auto',
                });
            };
        })(limiter.toObject);

        canvas.add(limiter);

        const canvasJson = JSON.stringify(canvas.toJSON(['selection', 'centeredScaling']));
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/canvas/post`, { content: canvasJson })
            .then(response => {
                console.log(response);
                setHasCanvas(true);
                setCanvasList(prevCanvasList => [...prevCanvasList, response.data]);
            })
            .catch(error => {
                console.error(error);
                setHasCanvas(false);
            });
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/canvas/get`)
            .then(response => {
                if (response.data.length > 0) {
                    setHasCanvas(true);
                    setCanvasList(response.data);
                }
            })
            .catch(error => {
                console.error(error);
                setHasCanvas(false);
            });

    }, []);


    return (
        <section className="h-screen flex flex-col justify-start items-center mx-96">
            <div className="flex-none w-full flex justify-center items-center h-32">
                <h1 className="text-2xl font-semibold">
                    Mis Canvas
                </h1>
            </div>
            {hasCanvas ?
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
                    {canvasList.map((canvas, index) => (
                        <CanvasCard key={index} id={canvas._id} name="nombre del canvas" />
                    ))}
                    <div className="h-[200px] flex justify-center items-center">
                        <button className="h-min bg-black text-white font-bold py-2 px-4 rounded hover:scale-110" onClick={addCanvas}>
                            Agregar nuevo canvas
                        </button>
                    </div>
                </div>
                :
                <button className=" bg-black text-white font-bold py-2 px-4 rounded hover:scale-110" onClick={addCanvas}>
                    Agregar nuevo canvas
                </button>
            }
        </section>
    );
}
