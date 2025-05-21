// src/components/My3DObject.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";

const Object3D: React.FC = () => {
  return (
    <div id="canvas-container" style={{ height: "400px" }}>
      <Canvas>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhongMaterial />
        </mesh>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="red" />
      </Canvas>
    </div>
  );
};

export default Object3D;
