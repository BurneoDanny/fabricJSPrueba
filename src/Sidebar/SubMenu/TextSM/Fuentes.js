import { useState } from "react"

export default function Fuentes(props){

  const [fuente, setFuente] = useState("color")

  const changeFont=()=>{
    fuente = 'font'
  }

  
  const changeColor = (cValue) =>{
    if(props.canvas.getActiveObject()){
    props.canvas.getActiveObject().set({fill: cValue})
    props.canvas.renderAll()
    setFuente(cValue)
    }
}

  return(
    <button
      class="relative group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-lg border border-zinc-200"
      onChange={()=>console.log('change')}>
      <span>
        {fuente}
      </span>
      <svg class="rotate-90 group-focus:rotate-180" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
        viewBox="0 0 24 24">
        <path fill="currentColor"
          d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z" />
      </svg>
      <div
        class="absolute shadow-lg -bottom-40 left-0 w-full h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2">
        <span class="flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg" onClick={()=>changeColor('red')}>
          <p >Rojo</p>
        </span>
        <span class="flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"onClick={()=>changeColor('blue')}>
          <p>Azul</p>
        </span>
        <span class="flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"onClick={()=>changeColor('green')}>
          <p>Verde</p>
        </span>
      </div>
    </button>
  );
}