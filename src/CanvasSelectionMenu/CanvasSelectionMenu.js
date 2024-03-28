import CanvasCard from "./CanvasCard/CanvasCard";
import { useState, useEffect } from "react";
import axios from "axios";
import SizeSelectorModal from "./SizeSelectorModal/SizeSelectorModal";

export default function CanvasSelectionMenu() {
    const [canvasList, setCanvasList] = useState([]);
    const [hasCanvas, setHasCanvas] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


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
            });

    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };


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
                        <button onClick={openModal} className="h-min bg-black text-white font-bold py-2 px-4 rounded hover:scale-110">
                            Agregar nuevo canvas
                        </button>
                    </div>
                </div>
                :
                <button onClick={openModal} className=" bg-black text-white font-bold py-2 px-4 rounded hover:scale-110">
                    Agregar nuevo canvas
                </button>
            }
            <SizeSelectorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
