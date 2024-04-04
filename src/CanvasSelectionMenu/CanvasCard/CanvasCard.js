import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CanvasCard(props) {
    const navigate = useNavigate();

    const goToCanvas = () => {
        navigate(`/canvasContainer/${props.id}`);
    };

    const deleteCanvas = () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/canvas/delete/${props.id}`)
            .then(response => {
                console.log(response);
                props.updateList(props.id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="border border-black h-min relative hover:scale-105">
            <div className="absolute top-0 right-0 bg-black text-white p-1 hover:cursor-pointer" onClick={deleteCanvas}>
                <p>ELIMINAR</p>
            </div>
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
