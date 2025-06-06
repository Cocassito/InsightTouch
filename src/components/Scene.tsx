import { Canvas } from "@react-three/fiber";
import { Object3DModel } from "./ObjetModel";
import { forwardRef } from "react";
import { sections } from "../data/sections";
import DefaultSection from "./DefaultSection";
import { Environment, Preload } from "@react-three/drei";

const Scene = forwardRef((_, ref) => {
  return (
    <>
      <DefaultSection />
      <div id="canvas-container">
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            position: "sticky",
            top: 0,
            background: "transparent",
          }}
          gl={{ alpha: true }}
        >
          {/* Lumière ambiante plus forte pour l'éclairage global */}
          <ambientLight intensity={1} />

          {/* Plusieurs lumières directionnelles plus douces pour un éclairage diffus */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.9}
            color="white"
          />
          <directionalLight
            position={[-5, 5, -5]}
            intensity={0.7}
            color="white"
          />
          <directionalLight
            position={[0, -5, 0]}
            intensity={0.1}
            color="white"
          />

          {/* Lumière spot dédiée pour la bille */}
          <pointLight
            position={[3, 3, 3]}
            intensity={1}
            distance={10}
            decay={2}
          />

          <Environment
            preset="city"
            background={false}
            resolution={128}
            blur={800}
          />

          <Object3DModel ref={ref} />
          <Preload all />
        </Canvas>
        <div className="sections-overlay">
          {sections.map(({ id, component: Component }) => (
            <Component key={id} id={id} />
          ))}
        </div>
      </div>
    </>
  );
});

export default Scene;
