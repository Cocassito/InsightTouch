import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const setupScrollTimeline = (
  model: THREE.Object3D,
  setActiveSection: (id: string | null) => void,
  isMobile: boolean
) => {
  console.log("Setting up timeline with model:", model);

  const rotationProxy = { y: model.rotation.y };

  // Fonction pour animer un mesh spécifique
  const animateSingleMesh = (meshName: string, properties: any) => {
    let meshFound = false;
    model.traverse((node) => {
      if (node instanceof THREE.Mesh && node.name === meshName) {
        meshFound = true;
        console.log(`Animating mesh: ${meshName}`);
        if (Array.isArray(node.material)) {
          node.material.forEach((mat) => {
            gsap.to(mat, {
              ...properties,
              onStart: () => console.log(`Starting animation for ${meshName}`),
              onUpdate: () =>
                console.log(
                  `Updating ${meshName}: ${JSON.stringify(properties)}`
                ),
            });
          });
        } else {
          gsap.to(node.material, {
            ...properties,
            onStart: () => console.log(`Starting animation for ${meshName}`),
            onUpdate: () =>
              console.log(
                `Updating ${meshName}: ${JSON.stringify(properties)}`
              ),
          });
        }
      }
    });
    if (!meshFound) {
      console.warn(`Mesh "${meshName}" not found in model`);
    }
  };

  // Fonction pour animer tous les matériaux du modèle
  const animateMaterials = (properties: any) => {
    console.log("Animating materials with properties:", properties);
    let materialCount = 0;

    model.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (Array.isArray(node.material)) {
          node.material.forEach((mat) => {
            materialCount++;
            gsap.to(mat, {
              ...properties,
              onStart: () =>
                console.log(
                  `Starting animation for material in array, opacity target: ${properties.opacity}`
                ),
              onUpdate: () => console.log(`Current opacity: ${mat.opacity}`),
            });
          });
        } else {
          materialCount++;
          gsap.to(node.material, {
            ...properties,
            onStart: () =>
              console.log(
                `Starting animation for single material, opacity target: ${properties.opacity}`
              ),
            onUpdate: () =>
              console.log(`Current opacity: ${node.material.opacity}`),
          });
        }
      }
    });
    console.log(`Found ${materialCount} materials to animate`);
  };

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

  // === Timeline pour la section défaut (intro) ===
  const sectionDefaultTimeline = gsap.timeline({
    onStart: () => console.log("Animation défaut"),
  });

  sectionDefaultTimeline.to("#defaultSection", {
    opacity: 0,
    y: 0,
    duration: 0.5,
  });

  // === Timeline pour la mesh 3D en intro ===
  const meshTimelineIntro = gsap.timeline();

  if (!isMobile) {
    meshTimelineIntro

      .addLabel("rotateAndScaleIntro")
      .call(() =>
        animateMaterials({
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.5,
        })
      )
      .to(
        model.scale,
        { x: 1.5, y: 1.5, z: 1.5, duration: 1 },
        "rotateAndScaleIntro"
      )
      .to(
        model.rotation,
        { x: 1.5, y: -1, duration: 1 },
        "rotateAndScaleIntro"
      );
  } else {
    meshTimelineIntro
      .call(() =>
        animateMaterials({
          opacity: 0,
          duration: 0,
          ease: "power2.inOut",
        })
      )
      .call(() =>
        animateMaterials({
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        })
      );
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
    .to(model.position, { x: isMobile ? -0.5 : -1, y: 0, duration: 1 }, "<")

    // Bloc 2
    .set("#BlocTextIntro2", { display: "flex", opacity: 0, y: 10 })
    .to("#BlocTextIntro2", {
      opacity: 1,
      x: isMobile ? 0 : -75,
      ease: "power2.inOut",
      duration: isMobile ? 0.5 : 1,
    })
    .to(model.position, { x: isMobile ? -1 : -2, y: 0, duration: 1 }, "<")
    .to(
      rotationProxy,
      {
        y: "+=0.3",
        duration: isMobile ? 0.5 : 1,
        onUpdate: () => {
          model.rotation.y = rotationProxy.y;
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
    .to(model.position, { x: 0, y: 0, duration: 1 }, "<")
    .to(model.rotation, { x: 1.5, y: -1.55, duration: 1 }, "<")

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

    // Animation du point avec pauses et textes
    .addLabel("dotAnimation")
    .to("#graphDot", { opacity: 1, duration: 0.3 })

    // Premier segment (baissier)
    .to("#graphDot", {
      motionPath: {
        path: "#graphLine",
        align: "#graphLine",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
        start: 0,
        end: 0.33,
      },
      duration: 1,
      ease: "power1.inOut", // Easing plus doux
    })
    .add(() => {
      model.traverse((node) => {
        if (node instanceof THREE.Mesh && node.name === "Bille") {
          const start = node.position.clone();
          const end = new THREE.Vector3(
            node.position.x + 0.009,
            node.position.y, // Y reste constant
            node.position.z + 0.015
          );
          // Accentuation de la courbe : calcul du point de contrôle sur la perpendiculaire
          const curveStrength = 1.2; // Augmentez cette valeur pour accentuer l'arrondi
          const dx = end.x - start.x;
          const dz = end.z - start.z;
          // Vecteur perpendiculaire dans le plan XZ
          const perp = new THREE.Vector2(-dz, dx).normalize();
          // Milieu du segment
          const mid = new THREE.Vector3(
            (start.x + end.x) / 2,
            start.y, // Y constant
            (start.z + end.z) / 2
          );
          // Offset sur la perpendiculaire
          const offset = 0.005 * curveStrength; // Ajustez pour plus d'arrondi
          const control = new THREE.Vector3(
            mid.x + perp.x * offset,
            start.y, // Y constant
            mid.z + perp.y * offset
          );
          const tObj = { t: 0 };
          gsap.to(tObj, {
            t: 1,
            duration: 1,
            ease: "power1.inOut",
            onUpdate: () => {
              const t = tObj.t;
              node.position.x =
                (1 - t) * (1 - t) * start.x +
                2 * (1 - t) * t * control.x +
                t * t * end.x;
              node.position.y = start.y; // Y ne change jamais
              node.position.z =
                (1 - t) * (1 - t) * start.z +
                2 * (1 - t) * t * control.z +
                t * t * end.z;
            },
          });
        }
      });
    }, "<")

    .to(
      "#trend1",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      ">"
    )

    // Deuxième segment (stable)
    .to(
      "#graphDot",
      {
        motionPath: {
          path: "#graphLine",
          align: "#graphLine",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          start: 0.33,
          end: 0.66,
        },
        duration: 1,
        ease: "power1.inOut", // Easing plus doux
      },
      "+=0.5"
    )

    .to(
      "#trend2",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      ">"
    )

    // Troisième segment (haussier)
    .to(
      "#graphDot",
      {
        motionPath: {
          path: "#graphLine",
          align: "#graphLine",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          start: 0.66,
          end: 1,
        },
        duration: 1,
        ease: "power1.inOut", // Easing plus doux
      },
      "+=0.5"
    )

    .to(
      "#trend3",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      ">"
    );

  // === Timeline principale ===
  const masterTimeline = gsap.timeline({
    onStart: () => console.log("Animation started"),
  });

  masterTimeline
    .add(sectionDefaultTimeline)
    .add(sectionTimelineIntro, 1)
    .add(meshTimelineIntro, "<") // Démarrer exactement au même moment que sectionTimelineIntro
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
