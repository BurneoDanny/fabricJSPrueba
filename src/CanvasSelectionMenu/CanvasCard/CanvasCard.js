import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CanvasCard(props) {
    const navigate = useNavigate();

    const goToCanvas = () => {
        navigate(`/canvasContainer/${props.id}`);
    };

    return (
        <div className="border border-black h-min">
            <div onClick={goToCanvas}>
                <img src="https://via.placeholder.com/200" alt="placeholder" />
            </div>
            <div className="flex justify-center items-center border border-t-black">
                <h1>
                    {props.name}
                </h1>
            </div>
        </div>

    );
}
