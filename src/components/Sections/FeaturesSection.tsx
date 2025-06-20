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
    </div>
  );
};

export default FeaturesSection;
