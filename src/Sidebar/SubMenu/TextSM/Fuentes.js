import { useState } from "react"
import Sketch from '@uiw/react-color-sketch';




export default function Fuentes(props){
  const [text,setText] = useState(props.text)

  const [hex, setHex] = useState('#000000');
  const [disableAlpha, setDisableAlpha] = useState(false);




  
  const changeColor = (cValue) =>{
    if(props.canvas.getActiveObject()){
      if(props.canvas.getActiveObject().get('type')==='textbox'){
        props.canvas.getActiveObject().set({fill: cValue})
        props.canvas.renderAll()
      }
    }
  }

  return(
    <Sketch
        style={{ marginLeft: 20 }}
        color={hex}
        disableAlpha={disableAlpha}
        onChange={(color) => {
          setHex(color.hex);
          changeColor(color.hex);
        }}
        
      />

  );
}