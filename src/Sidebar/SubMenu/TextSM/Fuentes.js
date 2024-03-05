import { useState } from "react"
import Circle from '@uiw/react-color-circle';



export default function Fuentes(props){
  const [text,setText] = useState(props.text)

  const [hex, setHex] = useState('#000000');




  
  const changeColor = (cValue) =>{
    if(props.canvas.getActiveObject().get('type')=='textbox'){
    props.canvas.getActiveObject().set({fill: cValue})
    props.canvas.renderAll()
    }

  const changeSize = (sValue) =>{

  }

}

  return(
    <Circle
      colors={[ '#000000', '#F44E3B', '#FE9200', '#FCDC00', '#3f51b5' ]}
      color={hex}
      onChange={(color) => {
        setHex(color.hex);
      }}
      onClick={changeColor(hex)}
    />

  );
}