import React, { useEffect, useRef, useState } from "react";
import SectionNavbar from "./SectionNavbar";
import Header from "./Header";
import { sections } from "../data/sections";
import { useViewport } from "../hook/useViewport";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Scene from "./Scene";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupScrollTimeline } from "./Timeline";

gsap.registerPlugin(ScrollToPlugin);

const OnePageLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const meshRef = useRef<{ getMesh: () => THREE.Mesh | null }>(null);
  const objectRef = useRef<any>(null);
  let t: any;
  const { isMobile } = useViewport();

  useEffect(() => {
    const interval = setInterval(() => {
      const mesh = meshRef.current?.getMesh();
      const actions = meshRef.current?.getActions();
      if (mesh) {
        t = setupScrollTimeline(
          mesh,
          actions,
          setActiveSection,
          isMobile,
          objectRef
        );

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
{/* 
      {!isMobile && (
        <SectionNavbar
          sections={sections}
          activeSection={activeSection}
          onSectionClick={(id) => {
            console.log("Clicked:", id);
            console.log(
              t.masterTimeline.scrollTrigger.labelToScroll("dimension")
            );
            console.log(t.scrollTrigger);

            window.scrollTo({
              top: t.masterTimeline.scrollTrigger.labelToScroll("dimension"),
              left: 0,
              behavior: "smooth",
            });

            // gsap.to(window, {
            //   // scrollTo: t.scrollTrigger.labelToScroll(id),
            //   scrollTo: 150000,
            //   duration: 1,
            //   onComplete: () => {
            //     console.log("azer");
            //   },
            // });
          }}
        />
      )} */}

      <Scene ref={meshRef} />
    </div>
  );
};

export default OnePageLayout;
