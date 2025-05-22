import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export const setupScrollTimeline = (
  mesh: THREE.Mesh,
  setActiveSection: (id: string | null) => void
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#scroll-container",
      scroller: "#scroll-container",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: true,
      onUpdate: (self) => {
        console.log("Scroll progress:", self.progress); // pour debug
        const progress = self.progress;
        if (progress === 0) setActiveSection(null);
        else if (progress < 0.5) setActiveSection("section1");
        else setActiveSection("section2");
      },
    },
  });

  tl.to(mesh.rotation, { y: Math.PI, duration: 1 })
    .to(mesh.position, { x: 2, duration: 1 })
    .to(mesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 })
    .to("#defaultSection", { opacity: 1, y: 0, duration: 1 }, 0)
    .to("#section1", { opacity: 1, y: 20, duration: 1 }, 2)
    .to("#section2", { opacity: 1, y: 20, duration: 1 }, 9);
};
