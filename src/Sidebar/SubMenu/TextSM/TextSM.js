import { fabric } from "fabric";
import Fuentes from "./Fuentes";
import { useState } from "react";

export default function TextSM (props){

    const [text, setText] = useState(null)

    const addText = () =>{
        
        let text = new fabric.Textbox('sample text',{
            left: 150,
            top: 200,
            fontSize: 50,
            width: 200,
        })
        setText(text)
        props.canvas.add(text).setActiveObject(text);

    }

    



    return(
            <div class='flex-row items-top justify-center min-h-auto space-y-5'>
                <button class="px-5 md:px-4 py-1 md:py-2 bg-sky-600 border border-sky-600 text-white rounded-lg hover:bg-sky-700"
                    onClick={addText}>
                    <i class="fa-solid fa-arrow-right-to-bracket" ></i> Agregar Texto</button>  
            
                <p className="text-lg font-medium text-gray-800 dark:text-white">Color:</p>
                <Fuentes text={text} canvas={props.canvas}/>
            </div>
    );
}