import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { SodaCan } from "./SodaCan";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { CanvasTexture } from "three";


function Cube () {

    const meshRef = useRef(null);
    const canvasRef = useRef(document.getElementById('canvas'))
    const textureRef = useRef()
  



    useFrame(()=>{
        if (!meshRef.current){
            return;
        }

        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
        if (textureRef.current) {
            textureRef.current.needsUpdate = true;
          }
    }

    );


    return(
        <mesh ref={meshRef}>
            <boxGeometry args={[2,2,2]}/>
            <meshBasicMaterial>
          <canvasTexture
            ref={textureRef}
            attach="map"
            image={canvasRef.current}
          />
        </meshBasicMaterial>
        </mesh>

    );
}



export default function Fiber3d(props){

    return(
        <Canvas>
            <PerspectiveCamera makeDefault fov={80} position={[0,0,7]}/>
            <ambientLight/>
            <pointLight position={[10,10,10]}/>
            <OrbitControls/>
            <SodaCan />
        </Canvas>
    );
}