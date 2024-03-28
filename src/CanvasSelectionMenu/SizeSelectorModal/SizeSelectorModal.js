
import { useEffect, useState } from 'react';
import CustomSizeSelector from './CustomSizeSelector';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomShapeSelector from './CustomShapeSelector';


export default function SizeSelectorModal({ isOpen, onClose }) {
    const [customSizeModal, setCustomSizeModal] = useState(false);
    const [customShapeModal, setCustomShapeModal] = useState(false);
    const navigate = useNavigate();

    const openCustomSizeModal = () => {
        setCustomSizeModal(true);
    };

    const openCustomShapeModal = () => {
        setCustomShapeModal(true);
    };

    const goToCanvas = (width, height, format) => {
        onClose();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        const formattedTime = `${currentDate.getHours()}.${currentDate.getMinutes()}.${currentDate.getSeconds()}`;
        const canvasName = `Untitled - ${formattedDate} at ${formattedTime}`;
        console.log(width, height, format);
        if (format === 'in') {
            width = Math.round(width * 300);
            height = Math.round(height * 300);
        }
        else if (format === 'cm') {
            width = Math.round(width * 118.11);
            height = Math.round(height * 118.11);
        }
        else if (format === 'mm') {
            width = Math.round(width * 11.811);
            height = Math.round(height * 11.811);
        }
        console.log(width, height);
        const newCanvasJsonData = {
            name: canvasName,
            content: 'new',
            width: width,
            height: height
        };
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/canvas/create`, newCanvasJsonData)
            .then(response => {
                //setHasCanvas(true);
                //setCanvasList(prevCanvasList => [...prevCanvasList, response.data]);
                navigate(`/canvasContainer/${response.data._id}`);
            })
            .catch(error => {
                console.error(error);

            });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
            <div className="animate-pop align-bottom bg-white rounded-lg shadow-xl w-1/2 h-[90%] px-3 py-1 overflow-hidden">
                <div className='h-full w-full flex flex-col items-center gap-3'>
                    <div className='w-full  flex justify-center items-center'>
                        <div className='text-2xl w-auto font-bold'>
                            Select your size
                        </div>
                        <button onClick={onClose} className='absolute right-3 text-white'>Cerrar</button>
                    </div>
                    <div className='flex flex-col gap-2 w-full min-h-96'>
                        <h1 className='text-xl'>
                            Standard / Most Common sizes
                        </h1>
                        <div className='flex justify-center items-center gap-2  h-full flex-wrap overflow-auto'>
                            <div className='w-80 h-80 hover:scale-90 cursor-pointer' onClick={() => goToCanvas(1080, 1080, "px")}>
                                <div className='flex-1 flex justify-center items-center bg-[#CCCCCC] hover:bg-primary hover:text-white h-full w-full'>
                                    <span className='text-lg font-bold'>
                                        1:1
                                    </span>
                                </div>
                            </div>
                            <div className='w-80 h-44 hover:scale-90 cursor-pointer' onClick={() => goToCanvas(1920, 1080, "px")}>
                                <div className='flex-1 flex justify-center items-center bg-[#CCCCCC] hover:bg-primary hover:text-white h-full w-full'>
                                    <span className='text-lg font-bold'>
                                        16:9
                                    </span>
                                </div>
                            </div>
                            <div className='w-44 h-80 hover:scale-90 cursor-pointer' onClick={() => goToCanvas(1080, 1920, "px")}>
                                <div className='flex-1 flex justify-center items-center bg-[#CCCCCC] hover:bg-primary hover:text-white h-full w-full'>
                                    <span className='text-lg font-bold'>
                                        9:16
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <h1 className='text-xl'>Suggested Sizes</h1>
                        <div className='text-center mb-2'>
                            <div className='flex items-center gap-2 hover:bg-gray-100 cursor-pointer' onClick={openCustomSizeModal}>
                                <span className='text-base font-bold'>Custom Size</span>
                            </div>
                        </div>
                        <div className='text-center mb-2'>
                            <div className='flex items-center gap-2 hover:bg-gray-100 cursor-pointer' onClick={openCustomShapeModal}>
                                <span className='text-base font-bold'>Custom shape</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full flex flex-col gap-2 overflow-y-auto'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex justify-between cursor-pointer hover:bg-gray-100 p-2'>
                                <label className='text-base'>
                                    Box
                                </label>
                                <label className='text-gray-400'>
                                    1000x1000 px
                                </label>
                            </div>
                            <div className='flex justify-between cursor-pointer hover:bg-gray-100 p-2'>
                                <label className='text-base'>
                                    Bottle
                                </label>
                                <label className='text-gray-400'>
                                    1000x1000 px
                                </label>
                            </div>
                            <div className='flex justify-between cursor-pointer hover:bg-gray-100 p-2'>
                                <label className='text-base'>
                                    Bag
                                </label>
                                <label className='text-gray-400'>
                                    1000x1000 px
                                </label>
                            </div>
                            <div className='flex justify-between cursor-pointer hover:bg-gray-100 p-2'>
                                <label className='text-base'>
                                    Beer Bottle
                                </label>
                                <label className='text-gray-400'>
                                    1000x1000 px
                                </label>
                            </div>
                            <div className='flex justify-between cursor-pointer hover:bg-gray-100 p-2'>
                                <label className='text-base'>
                                    Soda Can
                                </label>
                                <label className='text-gray-400'>
                                    1000x1000 px
                                </label>
                            </div>
                            <div className='flex justify-between cursor-pointer hover:bg-gray-100 p-2'>
                                <label className='text-base'>
                                    Tube
                                </label>
                                <label className='text-gray-400'>
                                    1000x1000 px
                                </label>
                            </div>
                            <div className='flex justify-between cursor-pointer hover:bg-gray-100 p-2'>
                                <label className='text-base'>
                                    Packet
                                </label>
                                <label className='text-gray-400'>
                                    1000x1000 px
                                </label>
                            </div>
                            <div className='flex justify-between cursor-pointer hover:bg-gray-100 p-2'>
                                <label className='text-base'>
                                    Jar
                                </label>
                                <label className='text-gray-400'>
                                    1000x1000 px
                                </label>
                            </div>
                            <div className='flex justify-between cursor-pointer hover:bg-gray-100 p-2'>
                                <label className='text-base'>
                                    Bucket
                                </label>
                                <label className='text-gray-400'>
                                    1000x1000 px
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomSizeSelector isOpen={customSizeModal} onClose={() => setCustomSizeModal(false)} onGoToCanvas={goToCanvas} />
            <CustomShapeSelector isOpen={customShapeModal} onClose={() => setCustomShapeModal(false)} />
        </div>
    );
};
