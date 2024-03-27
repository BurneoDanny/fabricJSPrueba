import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { SodaCan } from "./SodaCan";
import { PerspectiveCamera } from "@react-three/drei";


function Cube () {

    const meshRef = useRef(null);


    useFrame(()=>{
        if (!meshRef.current){
            return;
        }

        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    }

    );


    return(
        <mesh ref={meshRef}>
            <boxGeometry args={[2,2,2]}/>
            <meshStandardMaterial color={"green"}/>
        </mesh>

    );
}



export default function Fiber3d(){
    return(
        <Canvas>
            <PerspectiveCamera makeDefault fov={80} position={[0,0,7]}/>
            <ambientLight/>
            <pointLight position={[10,10,10]}/>
            <SodaCan/>
        </Canvas>
    );
}