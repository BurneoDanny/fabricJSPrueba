

export default function CustomShapeSelector({ isOpen, onClose }) {

    const handleSVGUpload = () => {

    }


    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
            <div className="animate-pop align-bottom bg-white rounded-lg shadow-xl h-[30%] w-[30%] px-3 py-1 overflow-hidden">
                <div>
                    <div className='h-auto'>
                        <button onClick={onClose} className='absolute left-3 top-3 text-white'>ATRAS</button>
                        <div className='text-2xl w-auto font-bold'>
                            Custom Shape
                        </div>
                    </div>
                    <div className="overflow-y-auto h-auto border border-black">
                        <button className='bg-blue-700 text-white p-3' onClick={handleSVGUpload}>SUBIR SVG</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
