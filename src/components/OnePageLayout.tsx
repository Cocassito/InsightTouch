import React, { useEffect, useRef, useState } from "react";
import SectionNavbar from "./SectionNavbar";
import Header from "./Header";
import { sections } from "../data/sections";
import { useViewport } from "../hook/useViewport";
import * as THREE from "three";

import Scene from "./Scene";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupScrollTimeline } from "./Timeline";

const OnePageLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const meshRef = useRef<{ getMesh: () => THREE.Mesh | null }>(null);
  const { isMobile } = useViewport();

  useEffect(() => {
    const interval = setInterval(() => {
      const mesh = meshRef.current?.getMesh();
      if (mesh) {
        setupScrollTimeline(mesh, setActiveSection, isMobile);
        ScrollTrigger.refresh();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div id="scroll-container">
        <div id="scroll-content" />
      </div>

      <Header />

      {!isMobile && (
        <SectionNavbar
          sections={sections}
          activeSection={activeSection}
          onSectionClick={(id) => {
            console.log("Clicked:", id);
          }}
        />
      )}

      <Scene ref={meshRef} />
    </div>
  );
};

export default OnePageLayout;
