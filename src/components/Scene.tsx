import { Canvas } from "@react-three/fiber";
import { Object3DModel } from "./ObjetModel";
import { forwardRef } from "react";
import { sections } from "../data/sections";
import DefaultSection from "./DefaultSection";

const Scene = forwardRef((_, ref) => {
  return (
    <>
      {/* <div id="scroll-container">
        <div style={{ height: "200vh", pointerEvents: "none" }}></div>
      </div> */}

      <DefaultSection />
      <div id="canvas-container">
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            position: "sticky",
            top: 0,
          }}
        >
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 5]} color="white" />
          <Object3DModel ref={ref} />
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
