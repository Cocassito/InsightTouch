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
        const progress = self.progress;

        // À 0 : logo IT visible, logo InsightTouch caché
        if (progress === 0) {
          gsap.set("#logoIT", { display: "block" });
          gsap.set("#logoInsightTouch", { display: "none" });
          setActiveSection(null);
        } else if (progress < 0.5) {
          setActiveSection("section1");
        } else {
          setActiveSection("section2");
        }
      },
    },
  });

  tl.to(mesh.material, { opacity: 0 }, 0)
    .to(mesh.material, { opacity: 1 }, 1)
    .to(mesh.rotation, { y: Math.PI, duration: 1 })
    .to(mesh.position, { x: 2, duration: 1 })
    .to(mesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 });

  tl.to("#defaultSection", { opacity: 1, y: 0, duration: 1 }, 0)
    .to("#defaultSection", { opacity: 0, y: 0, duration: 1 }, 1)

    // Logo IT disparaît
    .to("#logoIT", {
      opacity: 0,
      x: -50,
      duration: 1,
      onComplete: () => {
        gsap.set("#logoIT", { display: "none" });
      },
    }, 0)

    // Logo InsightTouch devient visible
    .set("#logoInsightTouch", { display: "block" }, 1)
    .to("#logoInsightTouch", { opacity: 1, x: 0, duration: 1 }, 1)

    .to("#section1", { opacity: 1, y: 20, duration: 1 }, 2)
    .to("#section2", { opacity: 1, y: 20, duration: 1 }, 9);
};
