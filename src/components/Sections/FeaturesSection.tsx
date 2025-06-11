import React from "react";
import { SectionComponentProps } from "../../data/sections";

const FeaturesSection: React.FC<SectionComponentProps> = ({ id }) => {
  return (
    <div className="section" id={id}>
      <div className="feature__container" id="trend__container">
        <h2
          style={{ color: "#F4F6F7", marginBottom: "150px" }}
          id="trend__title"
        >
          {" "}
          Système à bille{" "}
        </h2>
        <div className="feature__text-blocks">
          <div
            id="trend1"
            className="feature__text-block"
            style={{ opacity: 0 }}
          >
            <h4>Tendance Baissière</h4>
            <p>
              Quand la bille se positionne à gauche, on peut analyser des
              périodes de baisse et leurs impacts
            </p>
          </div>
          <div
            id="trend2"
            className="feature__text-block"
            style={{ opacity: 0 }}
          >
            <h4>Phase de Stabilité</h4>
            <p>
              Tandis que lorsqu'elle se situe vers le milieu on peut observer
              des périodes de consolidation
            </p>
          </div>
          <div
            id="trend3"
            className="feature__text-block"
            style={{ opacity: 0 }}
          >
            <h4>Tendance Haussière</h4>
            <p>
              Puis quand la bille se déplace à droite, on peut identifier des
              phases de croissance
            </p>
          </div>
        </div>

        <svg
          className="feature__graph"
          width="800"
          height="400"
          viewBox="0 0 800 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="graphLine"
            d="M 50,200 
                 C 150,200 200,300 300,300 
                 C 400,300 450,300 500,300 
                 C 600,300 650,100 750,100"
            fill="none"
            stroke="white"
            strokeWidth="3"
          />
          <circle id="graphDot" r="6" fill="white" opacity="0" />
        </svg>
      </div>

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

export default FeaturesSection;
