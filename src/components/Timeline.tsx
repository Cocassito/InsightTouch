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
  // Fonction pour animer tous les matériaux du modèle
  const animateMaterials = (properties: any) => {
    let materialCount = 0;



    model.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (Array.isArray(node.material)) {
          node.material.forEach((mat) => {
            materialCount++;
            gsap.to(mat, {
              ...properties,
            });
          });
        } else {
          materialCount++;
          gsap.to(node.material, {
            ...properties,
          });
        }
      }
    });
  };

  // === Timeline pour le logo swap ===
  const logoTopbarTimeline = gsap.timeline();

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
  const sectionDefaultTimeline = gsap.timeline();

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
    .to(
      model.rotation,
      {
        x: 2, // Tour complet sur X
        duration: 1,
        ease: "power1.inOut",
      },
      "<"
    )

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
      model.rotation,
      {
        x: 2, // Tour complet sur X

        z: 1,
        duration: 1,
        ease: "power1.inOut",
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
    .to(model.position, { x: isMobile ? -1 : -3, y: 0, duration: 1 }, "<")
    .to(
      model.rotation,
      {
        x: 2, // Tour complet sur X

        z: -2,
        duration: 1,
        ease: "power1.inOut",
      },
      "<"
    )
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
    .to(model.rotation, { x: 1.5, y: -1.55, z: 1, duration: 1 }, "<")

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

    .add(() => {
      model.traverse((node) => {
        if (node instanceof THREE.Mesh && node.name === "Bille") {
          const end = node.position.clone(); // position actuelle
          // Reprendre le même segment que l'aller, mais inversé
          const start = new THREE.Vector3(
            node.position.x - 0.009,
            node.position.y, // Y reste constant
            node.position.z - 0.015
          );
          // Accentuation de la courbe : calcul du point de contrôle sur la perpendiculaire
          const curveStrength = 1.2; // Même valeur que l'aller
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
          const offset = 0.005 * curveStrength; // Même offset
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
                (1 - t) * (1 - t) * end.x +
                2 * (1 - t) * t * control.x +
                t * t * start.x;
              node.position.y = start.y; // Y ne change jamais
              node.position.z =
                (1 - t) * (1 - t) * end.z +
                2 * (1 - t) * t * control.z +
                t * t * start.z;
            },
          });
        }
      });
    }, "<")

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
    // Animation de la bille sur une courbe vers la droite (même logique que le segment 1 mais direction opposée)
    .add(() => {
      model.traverse((node) => {
        if (node instanceof THREE.Mesh && node.name === "Bille") {
          const start = node.position.clone();
          // Mouvement vers la droite : X positif, Z négatif
          const end = new THREE.Vector3(
            node.position.x + 0.009,
            node.position.y, // Y reste constant
            node.position.z - 0.015
          );
          // Accentuation de la courbe : calcul du point de contrôle sur la perpendiculaire (vers l'extérieur)
          const curveStrength = 1.2;
          const dx = end.x - start.x;
          const dz = end.z - start.z;
          // Vecteur perpendiculaire dans le plan XZ, inversé pour aller vers l'extérieur
          const perp = new THREE.Vector2(dz, -dx).normalize();
          // Milieu du segment
          const mid = new THREE.Vector3(
            (start.x + end.x) / 2,
            start.y,
            (start.z + end.z) / 2
          );
          // Offset sur la perpendiculaire
          const offset = 0.005 * curveStrength;
          const control = new THREE.Vector3(
            mid.x + perp.x * offset,
            start.y,
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
              node.position.y = start.y;
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
      "#trend3",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      ">"
    )
    .to(
      [
        "#graphLine",
        "#graphDot",
        "#trend1",
        "#trend2",
        "#trend3",
        "#trend__title",
      ],
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Optionnel : cacher les éléments après l'animation
          gsap.set(
            [
              "#graphLine",
              "#graphDot",
              "#trend1",
              "#trend2",
              "#trend3",
              "#trend__title",
              "#trend__container",
            ],
            { display: "none" }
          );
        },
      },
      "+=0.5"
    )
    // 4e segment : retour de la bille à la position du segment 2 (avant le segment 3) avec arrondi
    .add(() => {
      model.traverse((node) => {
        if (node instanceof THREE.Mesh && node.name === "Bille") {
          // Position de départ : fin du segment 3
          const start = node.position.clone();
          // Position cible = position du segment 2 (avant le segment 3)
          const end = new THREE.Vector3(
            node.position.x - 0.009, // on annule le déplacement du segment 3
            node.position.y,
            node.position.z + 0.015 // on annule le déplacement du segment 3
          );
          // Arrondi : calcul du point de contrôle sur la perpendiculaire (même logique que les autres segments)
          const curveStrength = 1.2;
          const dx = end.x - start.x;
          const dz = end.z - start.z;
          // Vecteur perpendiculaire dans le plan XZ (vers l'extérieur du segment)
          const perp = new THREE.Vector2(-dz, dx).normalize();
          const mid = new THREE.Vector3(
            (start.x + end.x) / 2,
            start.y,
            (start.z + end.z) / 2
          );
          const offset = 0.005 * curveStrength;
          const control = new THREE.Vector3(
            mid.x + perp.x * offset,
            start.y,
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
              node.position.y = start.y;
              node.position.z =
                (1 - t) * (1 - t) * start.z +
                2 * (1 - t) * t * control.z +
                t * t * end.z;
            },
          });
        }
      });
    }, "<");

  ////// TIMELINE POUR LA SECTION Dimension /////////

  const dimensionTimeline = gsap.timeline();
  dimensionTimeline
    .addLabel("portabilityAnimation")
    // Initialisation des paths des vecteurs
    .set(["#vectorWidth", "#vectorLength", "#vectorHeight"], {
      opacity: 0,
      strokeDasharray: function (_i: number, el: SVGPathElement) {
        return el.getTotalLength();
      },
      strokeDashoffset: function (_i: number, el: SVGPathElement) {
        return el.getTotalLength();
      },
    })
    // Configuration initiale
    .set("#section3", { display: "flex", opacity: 1 })
    .set("#portability__container", { display: "block", opacity: 1 })

    // Affichage du titre
    .to("#portability__title", {
      opacity: 1,
      y: 20,
      duration: 0.7,
      ease: "power2.out",
    })

    .to(model.rotation, {
      z: 0,
    })

    // Phase 1 : Animation de la longueur
    .to("#vectorLength", {
      opacity: 1,
      duration: 0.3,
    })
    .to("#vectorLength", {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(
      "#portability__length",
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      ">-0.2"
    )

    // Pause courte pour la lecture
    .to({}, { duration: 0.8 })

    // Phase 2 : Animation de la largeur
    .to("#vectorWidth", {
      opacity: 1,
      duration: 0.3,
    })
    .to("#vectorWidth", {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(
      "#portability__width",
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      ">-0.2"
    )

    // Pause courte pour la lecture
    .to({}, { duration: 0.8 })

    // Disparition progressive des vecteurs longueur et largeur
    .to(
      [
        "#vectorWidth",
        "#vectorLength",
        "#portability__width",
        "#portability__length",
      ],
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }
    )
    // Phase 3 : Rotation de l'objet 3D
    .to(model.rotation, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "power3.inOut",
    })

    // Pause courte après la rotation
    .to({}, { duration: 0.3 })

    // Phase 4 : Animation de la hauteur
    .to("#vectorHeight", {
      opacity: 1,
      duration: 0.4,
    })
    .to("#vectorHeight", {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(
      "#portability__height",
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      ">-0.2"
    )

    // Pause finale pour la lecture
    .to({}, { duration: 1.5 })

    // Affichage du texte de prise en main

    .to(["#vectorHeight", "#portability__height"], {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    })

    // Disparition finale du titre
    .to("#portability__title", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set("#portability__container", { display: "none" });
      },
    })

    // Animation de disparition douce de l'objet 3D
    .addLabel("objectDisappear")
    .to(
      model.rotation,
      {
        x: model.rotation.x + Math.PI / 4,
        y: model.rotation.y + Math.PI / 6,
        z: model.rotation.z + Math.PI / 8,
        duration: 2,
        ease: "power1.inOut",
      },
      "objectDisappear"
    )
    .to(
      model.scale,
      {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 2,
        ease: "power1.inOut",
      },
      "objectDisappear"
    )
    .call(
      () =>
        animateMaterials({
          opacity: 0,
          duration: 2,
          ease: "power1.inOut",
        }),
      [],
      "objectDisappear"
    );

  ////// TIMELINE POUR LA SECTION CAS D'USAGE /////////
  const casUsageTimeline = gsap.timeline();

  casUsageTimeline
    // Initialisation
    .set(["#casUsage2", "#casUsage3"], {
      display: "none",
      opacity: 0,
      x: 50,
    })
    .set("#casUsage1", {
      opacity: 0,
      x: 50,
    })

    // Animation de la section
    .to("#section4", {
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.5 : 1,
    })

    // Premier cas d'usage (Analyse)
    .to("#casUsage1", {
      display: "flex",
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
    })
    .to({}, { duration: 3 }) // Pause pour la lecture

    // Transition vers le deuxième cas (Trading)
    .to("#casUsage1", {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        gsap.set("#casUsage1", { display: "none" });
      },
    })
    .set("#casUsage2", {
      display: "flex",
      opacity: 0,
      x: 50,
    })
    .to("#casUsage2", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
    })
    .to({}, { duration: 3 }) // Pause pour la lecture

    // Transition vers le troisième cas (Education)
    .to("#casUsage2", {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        gsap.set("#casUsage2", { display: "none" });
      },
    })
    .set("#casUsage3", {
      display: "flex",
      opacity: 0,
      x: 50,
    })
    .to("#casUsage3", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
    })
    .to({}, { duration: 3 }) // Pause pour la lecture

    .to("#section4", { opacity: 0, duration: 0.5 })

    .set("#section4", { display: "none" });

  ////// TIMELINE POUR LA SECTION CONTACT /////////
  const contactTimeline = gsap.timeline();

  contactTimeline
    .set("#section5", { display: "flex", opacity: 1 })
    .set("#contact__container", { display: "flex" })

    // Animation du titre
    .to("#contact__title", {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    })

    // Animation du contenu
    .to(
      "#contact__content",
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      ">-0.3"
    )

    // Animation du CTA
    .to(
      "#contact__cta",
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      ">-0.3"
    )

    // Pause pour la lecture
    .to({}, { duration: 3 })
    
    
    ;

  // === Timeline principale ===
  const masterTimeline = gsap.timeline({
    onStart: () => console.log("Animation started"),
  });

  masterTimeline
    .add(sectionDefaultTimeline)
    .add(sectionTimelineIntro, 1)
    .add(meshTimelineIntro, "<")
    .add(logoTopbarTimeline, 2)
    .add(featureSection)
    .add(dimensionTimeline)
    .add(casUsageTimeline)
    .add(contactTimeline);

  const scrollTrigger = ScrollTrigger.create({
  animation: masterTimeline,
  trigger: "#scroll-container",
  scroller: "#scroll-container", // 👍 INDISPENSABLE
  start: "top top",
  end: `+=${masterTimeline.duration() * 100}px`, // adapte la longueur du scroll
  scrub: 1,
  markers: true,
});
  console.log(masterTimeline.duration()); // pour voir combien de scroll il te faut
  ScrollTrigger.refresh(); // 👈 Important ici

  return {
    scrollTrigger,
    masterTimeline,
    logoTopbarTimeline,
    meshTimelineIntro,
    sectionTimelineIntro,
    featureSection,
    dimensionTimeline,
    casUsageTimeline,
  };
};
