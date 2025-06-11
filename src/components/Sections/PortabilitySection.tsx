import React from "react";
import { SectionComponentProps } from "../../data/sections";

const PortabilitySection: React.FC<SectionComponentProps> = ({ id }) => {
  return (
    <div className="section" id={id}>
      <div
        id="portability__container"
        style={{
          display: "none",
          position: "relative",
          width: "800px",
          height: "600px",
          margin: "0 auto",
        }}
      >
        <h2
          id="portability__title"
          style={{
            color: "#F4F6F7",
            position: "absolute",
            top: "-75px",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
            fontSize: "3rem",
          }}
        >
          Dimensions
        </h2>
        <svg
          viewBox="0 0 800 600"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "600px",
          }}
        >
          {/* Ligne de Longueur (gauche) - 6cm = 300px */}
          <path
            id="vectorLength"
            d="M 200,150 L 200,450"
            stroke="white"
            strokeWidth="2"
            opacity="0"
          />

          {/* Ligne de Largeur (bas) - 5cm = 250px */}
          <path
            id="vectorWidth"
            d="M 275,470 L 525,470"
            stroke="white"
            strokeWidth="2"
            opacity="0"
          />

          {/* Ligne de Hauteur (droite) - 2cm = 100px */}
          <path
            id="vectorHeight"
            d="M 620,275 L 620,375"
            stroke="white"
            strokeWidth="2"
            opacity="0"
          />
        </svg>
        {/* Texte Largeur (en bas centré) */}
        <span
          id="portability__width"
          style={{
            position: "absolute",
            bottom: "80px",
            left: "40%",
            transform: "translateX(-50%)",
            color: "#F4F6F7",
            fontSize: "1.2rem",
            opacity: 0,
            scale: 0.8,
          }}
        >
          Largeur: 5cm
        </span>
        {/* Texte Longueur (à gauche) */}
        <span
          id="portability__length"
          style={{
            position: "absolute",
            top: "50%",
            left: "90px",
            transform: "translateY(-50%) rotate(-90deg)",
            color: "#F4F6F7",
            fontSize: "1.2rem",
            opacity: 0,
            scale: 0.8,
          }}
        >
          Longueur: 6cm
        </span>
        {/* Texte Hauteur (à droite, vertical) */}
        <span
          id="portability__height"
          style={{
            position: "absolute",
            top: "50%",
            right: "90px",
            transform: "translateY(-40%) rotate(90deg)",
            color: "#F4F6F7",
            fontSize: "1.2rem",
            opacity: 0,
            scale: 0.8,
          }}
        >
          Hauteur: 2cm
        </span>
      </div>
    </div>
  );
};

export default PortabilitySection;
