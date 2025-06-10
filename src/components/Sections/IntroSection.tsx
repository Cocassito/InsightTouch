import React from "react";
import { SectionComponentProps } from "../../data/sections";
import BlocText from "../BlocText";

const IntroSection: React.FC<SectionComponentProps> = ({ id }) => {
  return (
    <div className="section" id={id}>
      <div className="SectionIntro__container" id="LogoBaselineIntro">
        <div id="logoInsightTouch" className="SectionIntro__logoInsightTouch">
          <img
            src="/img/InsightTouchLogo.svg"
            alt="Logo InsightTouch"
            width="100%"
            height="100%"
          />
        </div>
        <h4 id="BaseLineIntro">
          Le premier outil révolutionnaire pour une analyse graphique sans
          support visuel
        </h4>
      </div>
      <BlocText
        id="BlocTextIntro1"
        title="La donnée à portée de main"
        text="Explorez vos données de manière tactile et immédiate. InsightTouch transforme les graphiques en une expérience interactive accessible à tous."
        right="100px"
      />
      <BlocText
        id="BlocTextIntro2"
        title="Compréhension intuitive"
        text="Ressentez l'évolution des marchés grâce à notre système innovant de retour haptique. Une approche naturelle qui rend l'analyse financière plus accessible et immersive."
        right="100px"
      />
      <BlocText
        id="BlocTextIntro3"
        title="Confort"
        text="Conçu pour s'adapter parfaitement à votre main, InsightTouch allie légèreté et ergonomie. Sa forme étudiée et ses dimensions optimisées permettent une prise en main naturelle pour des sessions d'analyse prolongées sans fatigue."
        right="100px"
      />
    </div>
  );
};

export default IntroSection;
