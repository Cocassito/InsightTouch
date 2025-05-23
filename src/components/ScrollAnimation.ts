import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export const sectionPosition: Record<string, number> = {
  section1: 2,
  section2: 9,
};

export const setupScrollTimeline = (
  mesh: THREE.Mesh,
  setActiveSection: (id: string | null) => void
) => {
  // === Timeline pour le logo swap ===
  const logoTimeline = gsap.timeline();
  logoTimeline
    .to(
      "#logoIT",
      {
        opacity: 0,
        x: -30,
        duration: 0.5,
        onComplete: () => {
          gsap.set("#logoIT", { display: "none" });
        },
      },
      0
    )
    .set("#logoInsightTouch", { display: "block" }, 1)
    .to("#logoInsightTouch", { opacity: 1, x: 0, duration: 1 }, 1);

  // === Timeline pour le mesh 3D ===
  const meshTimeline = gsap.timeline();
  meshTimeline
    .to(mesh.material, { opacity: 0, duration: 1 })
    .to(mesh.material, { opacity: 1, duration: 1 })
    .to(mesh.rotation, { y: Math.PI, duration: 1 }, 2)
    .to(mesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 }, 3);

  // === Timeline pour la section défaut ===
  const sectionDefaultTimeline = gsap.timeline();
  sectionDefaultTimeline
    .to("#defaultSection", { opacity: 1, y: 0, duration: 1 })
    .to("#defaultSection", { opacity: 0, y: 0 });

  // === Timeline pour les sections ===
  const sectionTimeline = gsap.timeline();
  sectionTimeline.to("#section1", { opacity: 1, y: 0, delay: 0.5 });

  // === Timeline principale ===
  const masterTimeline = gsap.timeline({
    onStart: () => console.log("Animation started"),
  });

  masterTimeline
    .add(logoTimeline, 0)
    .add(sectionDefaultTimeline, 0)
    .add(sectionTimeline, 1)
    .add(meshTimeline);

  // // === ScrollTrigger (optionnel) ===
  // const scrollTrigger = ScrollTrigger.create({
  //   animation: masterTimeline,
  //   trigger: "#scroll-container",
  //   scroller: "#scroll-container",
  //   start: "top top",
  //   end: "bottom top",
  //   scrub: 2,
  //   markers: true,
  //   onUpdate: (self) => {
  //     const progress = self.progress;
  //     if (progress === 0) {
  //       gsap.set("#logoInsightTouch", { display: "none", opacity: 0 });
  //       gsap.set("#logoIT", { display: "block", opacity: 0, x: -30 });
  //       gsap.to("#logoIT", { x: 0, opacity: 1, duration: 0.5 });
  //       setActiveSection(null);
  //     } else if (progress < 0.5) {
  //       setActiveSection("section1");
  //     } else {
  //       setActiveSection("section2");
  //     }
  //   },
  // });

  // === Return global structuré ===
  return {
    masterTimeline,
    logoTimeline,
    meshTimeline,
    sectionTimeline,
  };
};
