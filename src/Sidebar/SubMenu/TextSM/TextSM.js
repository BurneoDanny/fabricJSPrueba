import { fabric } from "fabric";
import Fuentes from "./Fuentes";
import { useState } from "react";

export default function TextSM (props){

    const [text, setText] = useState(null)
    const [statement, setStatement] = useState(null)

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
    
    const addStatement = () =>{
        if(statement){
            props.canvas.remove(statement)
            setStatement(null)
        } else {
        let statement = new fabric.Textbox('Este producto contiene transgénicos',{
            left: 380,
            top: 10,
            fontSize: 20,
            width: 300,
            selectable: false,
            hoverCursor:"arrow"  

        });
        props.canvas.add(statement)
        setStatement(statement);
        }
    }


    return(
            <div class='flex-row items-top justify-center min-h-auto space-y-5'>
                <button class="px-5 md:px-4 py-1 md:py-2 bg-sky-600 border border-sky-600 text-white rounded-lg hover:bg-sky-700"
                    onClick={addText}>
                    <i class="fa-solid fa-arrow-right-to-bracket" ></i> Agregar Texto</button>  
            
                <p className="text-lg font-medium text-gray-800 dark:text-white">Color:</p>
                <Fuentes text={text} canvas={props.canvas}/>
                <p className="text-lg font-medium text-gray-800 dark:text-white">Declaraciones:</p>
                <fieldset class="mb-5">
                    <div class="flex items-center mb-4">
                        <input id="checkbox-2" aria-describedby="checkbox-2" type="checkbox" class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" onChange={addStatement}></input>
                        <label for="checkbox-2" class="text-sm ml-3 font-medium text-gray-900">Este producto contiene transgénicos</label>
                    </div>
                </fieldset>

            </div>
    );
}