import React from "react";
import { SectionComponentProps } from "../../data/sections";

const FeaturesSection: React.FC<SectionComponentProps> = ({ id }) => {
  return (
      <div className="section" id={id}>
        <h1>Bienvenue dans le pipi</h1>
        <p>Voici la première section de la page.</p>
      </div>
  );
};

export default FeaturesSection;
