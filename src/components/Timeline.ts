import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export const setupScrollTimeline = (
  mesh: THREE.Mesh,
  setActiveSection: (id: string | null) => void,
  isMobile: boolean
) => {
  const rotationProxy = { y: mesh.rotation.y };

  // === Timeline pour le logo swap ===
  const logoTopbarTimeline = gsap.timeline({
    onStart: () => console.log("Animation logo"),
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
      duration: 0.5,
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

  // === Timeline pour la mesh 3D ===
  const meshTimelineIntro = gsap.timeline();

  if (!isMobile) {
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
  } else {
    meshTimelineIntro
      .to(mesh.material, { opacity: 0.8, duration: 0.5 })
      .to(mesh.material, { opacity: 1, duration: 0.5 });
  }

  // === Timeline pour la section INTRO/présentation global ===
  const sectionTimelineIntro = gsap.timeline();

  sectionTimelineIntro
    .to("#section1", { opacity: 1, y: 0, duration: isMobile ? 0.5 : 1 })
    .to(
      "#BaseLineIntro",
      { opacity: 1, y: 0, duration: isMobile ? 0.5 : 1 },
      "<"
    )

    .set("#BlocTextIntro1", { display: "none" }, "<")
    .set("#BlocTextIntro2", { display: "none" }, "<")
    .set("#BlocTextIntro3", { display: "none" }, "<")

    .to("#LogoBaselineIntro", { opacity: 0, duration: 1 })
    .set("#LogoBaselineIntro", { display: "none", duration: 1 })

    // Bloc 1
    .set("#BlocTextIntro1", { display: "flex", opacity: 0, y: 10 })
    .to("#BlocTextIntro1", {
      opacity: 1,
      x: isMobile ? 0 : -50,
      ease: "power2.inOut",
      duration: isMobile ? 0.5 : 1,
    })
    .to(mesh.position, { x: isMobile ? -0.5 : -1, y: 0, duration: 1 }, "<")

    // Bloc 2
    .set("#BlocTextIntro2", { display: "flex", opacity: 0, y: 10 })
    .to("#BlocTextIntro2", {
      opacity: 1,
      x: isMobile ? 0 : -75,
      ease: "power2.inOut",
      duration: isMobile ? 0.5 : 1,
    })
    .to(mesh.position, { x: isMobile ? -1 : -2, y: 0, duration: 1 }, "<")
    .to(
      rotationProxy,
      {
        y: "+=0.3",
        duration: isMobile ? 0.5 : 1,
        onUpdate: () => {
          mesh.rotation.y = rotationProxy.y;
        },
      },
      "<"
    )

    // Bloc 3
    .set("#BlocTextIntro3", { display: "flex", opacity: 0, y: 10 })
    .to("#BlocTextIntro3", {
      opacity: 1,
      x: isMobile ? 0 : -100,
      ease: "power2.inOut",
      duration: isMobile ? 0.5 : 1,
    })
    .to(["#BlocTextIntro1", "#BlocTextIntro2", "#BlocTextIntro3"], {
      opacity: 0,
      x: -75,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(["#BlocTextIntro1", "#BlocTextIntro2", "#BlocTextIntro3"], {
          display: "none",
        });
      },
    })
    .to(["#BlocTextTitle", "#BlocTextText"], { opacity: 0 }, "<");

  // === Timeline pour la section features ===
  const featureSection = gsap.timeline({
    onStart: () => {
      // Initialiser le SVG au début de l'animation
      const graphPath = document.querySelector("#graphLine");
      if (graphPath) {
        const pathLength = (graphPath as SVGPathElement).getTotalLength();
        gsap.set(graphPath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0,
        });
      }
    },
  });

  featureSection
    .to("#section2", { opacity: 1, y: 0, duration: isMobile ? 0.5 : 1 })
    .to(mesh.position, { x: 2, y: 0, duration: 1 }, "<")

    // Animation synchronisée du graphique et du cube
    .addLabel("graphAnimation")
    .to(
      "#graphLine",
      {
        opacity: 1,
        duration: 0.3,
      },
      "graphAnimation"
    )
    .to(
      "#graphLine",
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      },
      "graphAnimation+=0.1"
    )
    .to(
      mesh.rotation,
      {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.inOut",
      },
      "graphAnimation"
    );

  // === Timeline principale ===
  const masterTimeline = gsap.timeline({
    onStart: () => console.log("Animation started"),
  });

  masterTimeline
    .add(sectionDefaultTimeline, "<")
    .add(meshTimelineIntro, "<")
    .add(sectionTimelineIntro, 1)
    .add(logoTopbarTimeline, 2)
    .add(featureSection);

  // === ScrollTrigger (optionnel) ===
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

  return {
    masterTimeline,
    logoTopbarTimeline,
    meshTimelineIntro,
    sectionTimelineIntro,
    featureSection,
  };
};
