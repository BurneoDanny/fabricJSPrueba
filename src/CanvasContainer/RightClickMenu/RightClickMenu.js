import { useEffect } from 'react';

export default function RightClickMenu(props) {
    useEffect(() => {

        const handleClickOutside = (event) => {
            if (!event.target.closest('.right-click-menu')) {
                props.onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [props]);

    const bringToFront = () => {
        props.onAction('bringToFront');
    }

    const bringForward = () => {
        props.onAction('bringForward');
    }

    const bringBackward = () => {
        props.onAction('bringBackward');
    }

    const sendToBack = () => {
        props.onAction('sendToBack');
    }


    return (
        <div className="right-click-menu bg-[#051E46] flex flex-col gap-2 justify-center text-white items-center text-base font-semibold right-click-menu" style={{ position: 'absolute', left: props.x, top: props.y }}>
            <span onClick={bringToFront}>
                <button className="hover:bg-gray-700 w-32 h-8">Bring to front</button>
            </span>
            <span onClick={bringForward}>
                <button className="hover:bg-gray-700 w-32 h-8">Bring forward</button>
            </span>
            <span onClick={bringBackward}>
                <button className="hover:bg-gray-700 w-32 h-8">Send backward</button>
            </span>
            <span onClick={sendToBack}>
                <button className="hover:bg-gray-700 w-32 h-8">Send to back</button>
            </span>
        </div>
    );
}