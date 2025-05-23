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
  const logoTopbarTimeline = gsap.timeline({
    onStart: () => console.log("Animation lgo"),
  });
  logoTopbarTimeline
    .to("#logoIT", {
      ease: "power2.inOut",
      opacity: 0,
      x: -30,
      duration: 0.5,
      onComplete: () => {
        gsap.set("#logoIT", { display: "none" });
      },
    })
    .set("#logoInsightTouch", { display: "block" })
    .to("#logoInsightTouch", {
      opacity: 1,
      x: 0,
      ease: "power2.inOut",
      duration: 0.5, // ← ici aussi
    });

  // === Timeline pour la section défaut ===
  const sectionDefaultTimeline = gsap.timeline({
    onStart: () => console.log("Animation défaut"),
  });
  sectionDefaultTimeline.to("#defaultSection", {
    opacity: 0,
    y: 0,
    duration: 0.5,
  });

  // === Timeline pour le mesh 3D ===
  const meshTimelineIntro = gsap.timeline();
  meshTimelineIntro
    .to(mesh.material, { opacity: 0, duration: 1 })
    .addLabel("rotateAndScaleIntro")
    .to(mesh.material, { opacity: 1, duration: 1 }, "rotateAndScaleIntro")
    .to(mesh.rotation, { y: Math.PI, duration: 1 }, "rotateAndScaleIntro")
    .to(
      mesh.scale,
      { x: 1.5, y: 1.5, z: 1.5, duration: 1 },
      "rotateAndScaleIntro"
    );

  // === Timeline pour la section INTRO ===
  const sectionTimelineIntro = gsap.timeline();
  sectionTimelineIntro
    .to("#section1", { opacity: 1, y: 0, duration: 1 })
    .to("#BaseLineIntro", { opacity: 1, y: 0, duration: 1 }, "<")
    .set("#BlocTextIntro", { display: "none" }, "<")
    .to("#LogoBaselineIntro", { opacity: 0, duration: 1 })
    .set("#LogoBaselineIntro", { display: "none", duration: 1 })
    .set("#BlocTextIntro", { display: "block", opacity: 0, y: 10 })
    .to("#BlocTextIntro", {
      opacity: 1,
      y: 0,
      ease: "power2.inOut",
    });

  // === Timeline principale ===
  const masterTimeline = gsap.timeline({
    onStart: () => console.log("Animation started"),
  });

  masterTimeline
    .add(sectionDefaultTimeline, "<")
    .add(meshTimelineIntro, "<")
    .add(sectionTimelineIntro, 1)
    .add(logoTopbarTimeline, 2);

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
    logoTopbarTimeline,
    meshTimelineIntro,
    sectionTimelineIntro,
  };
};
