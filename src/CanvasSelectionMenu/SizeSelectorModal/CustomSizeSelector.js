
import { useState } from 'react';

export default function CustomSizeSelector({ isOpen, onClose, onGoToCanvas }) {
    const [selectedType, setSelectedType] = useState('px');
    const [rangeMessage, setRangeMessage] = useState('Width and Height must be between 50 and 2000 px');
    const [isListOpen, setIsListOpen] = useState(false);
    const [maximunLimit, setMaximunLimit] = useState(2000);
    const [minimunLimit, setMinimunLimit] = useState(50);
    const showList = () => {
        setIsListOpen(!isListOpen);
    };

    const handleTypeSelection = (typeId) => {
        setSelectedType(typeId);
        setIsListOpen(false);
        if (typeId === 'px') {
            setRangeMessage('Width and Height must be between 50 and 2000 px');
            setMaximunLimit(2000);
            setMinimunLimit(50);
        }
        else if (typeId === 'in') {
            setRangeMessage('Width and Height must be between 0.17 and 20 in');
            setMaximunLimit(20);
            setMinimunLimit(0.17);
        }
        else if (typeId === 'cm') {
            setRangeMessage('Width and Height must be between 0.43 and 50.8 cm');
            setMaximunLimit(50.8);
            setMinimunLimit(0.43);
        }
        else if (typeId === 'mm') {
            setRangeMessage('Width and Height must be between 4.3 and 508 mm');
            setMaximunLimit(508);
            setMinimunLimit(4.3);
        }
    };

    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');

    const handleWidthChange = (event) => {
        const value = event.target.value;
        setWidth(value);
    };

    const handleHeightChange = (event) => {
        const value = event.target.value;
        setHeight(value);
    };



    const isWidthValid = width >= minimunLimit && width <= maximunLimit;
    const isHeightValid = height >= minimunLimit && height <= maximunLimit;

    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
            <div className="animate-pop align-bottom bg-white rounded-lg shadow-xl h-[30%] w-[30%] px-3 py-1 overflow-hidden">
                <div className='flex flex-col items-center gap-3 h-full'>
                    <div className='h-auto'>
                        <button onClick={onClose} className='absolute left-3 top-3 text-white'>ATRAS</button>
                        <div className='text-2xl w-auto font-bold'>
                            Custom Size
                        </div>
                    </div>
                    <label>
                        {rangeMessage}
                    </label>
                    <hr className='w-full' />
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className='flex justify-center gap-3'>
                            <div className='w-auto flex flex-col justify-between items-start'>
                                <label htmlFor='width' className='text-lg font-medium'>Width</label>
                                <input
                                    type='number'
                                    id='width'
                                    className={`border-2 rounded-lg p-2 ${!isWidthValid && 'border-red-500'}`}
                                    min={50}
                                    max={2000}
                                    value={width}
                                    onChange={handleWidthChange}
                                />
                            </div>
                            <div className='w-auto flex flex-col justify-between items-start'>
                                <label htmlFor='height' className='text-lg font-medium'>Height</label>
                                <input
                                    type='number'
                                    id='height'
                                    className={`border-2 rounded-lg p-2 ${!isHeightValid && 'border-red-500'}`}
                                    min={50}
                                    max={2000}
                                    value={height}
                                    onChange={handleHeightChange}
                                />
                            </div>
                            <div className="flex justify-center items-end">
                                <div className='w-24'>
                                    <div class="relative mt-2 w-auto ">
                                        <button onClick={showList} type="button" class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                            <span class="flex items-center">
                                                <span class="ml-3 block truncate">{selectedType}</span>
                                            </span>
                                            <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                //
                                            </span>
                                        </button>
                                        {isListOpen &&
                                            <ul class="absolute z-10 mt-1 max-h-24 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg 
                                                ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                                <li className={`text-gray-900 w-full relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-primary hover:text-white `}
                                                    role="option" onClick={() => handleTypeSelection('px')}>
                                                    <div className="flex items-center w-[100%]">
                                                        <span className="font-normal ml-3 block truncate">px</span>
                                                    </div>
                                                </li>
                                                <li className={`text-gray-900 w-full relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-primary hover:text-white `}
                                                    role="option" onClick={() => handleTypeSelection('in')}>
                                                    <div className="flex items-center w-[100%]">
                                                        <span className="font-normal ml-3 block truncate">in</span>
                                                    </div>
                                                </li>
                                                <li className={`text-gray-900 w-full relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-primary hover:text-white `}
                                                    role="option" onClick={() => handleTypeSelection('cm')}>
                                                    <div className="flex items-center w-[100%]">
                                                        <span className="font-normal ml-3 block truncate">cm</span>
                                                    </div>
                                                </li>
                                                <li className={`text-gray-900 w-full relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-primary hover:text-white `}
                                                    role="option" onClick={() => handleTypeSelection('mm')}>
                                                    <div className="flex items-center w-[100%]">
                                                        <span className="font-normal ml-3 block truncate">mm</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-auto flex justify-end pb-2'>
                        <button
                            disabled={!isHeightValid || !isWidthValid}
                            onClick={() => onGoToCanvas(width, height, selectedType)}
                            type="button"
                            className={`rounded-full px-6 py-3 ${(!isHeightValid || !isWidthValid) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:scale-110 hover:bg-green-600'} text-blue-100 font-bold shadow-md`}
                        >
                            Create new file
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
