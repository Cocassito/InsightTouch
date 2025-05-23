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
        id="BlocTextIntro"
        title="Bonjour je suis un test"
        text="je suis un texte si long quemême moi jen ai marre d'crifrer c'et abbrrent azudis "
      />
    </div>
  );
};

export default IntroSection;
