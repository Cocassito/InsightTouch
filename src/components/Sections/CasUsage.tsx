import React from "react";
import { SectionComponentProps } from "../../data/sections";

const CasUsage: React.FC<SectionComponentProps> = ({ id }) => {
  return (
    <div className="section" id={id}>
      <div className="CasUsage__container" id="CasUsage__container">
        <h2 style={{ color: "#F4F6F7", paddingTop:"60px" }} id="casUsage__title">
          Cas d'usages
        </h2>
        
        <div className="CasUsage__case" id="casUsage1">
          <img src="/img/analyseCasUsage.jpg" alt="Analyse de données" />
          <div className="text-content">
            <h3>Analyse de données</h3>
            <p>
              Explorez vos données statistiques d'une manière totalement nouvelle. 
              InsightTouch permet de ressentir physiquement les tendances et variations
              de vos graphiques, ajoutant une dimension sensorielle à l'analyse mathématique.
            </p>
          </div>
        </div>

        <div className="CasUsage__case" id="casUsage2">
          <img src="/img/tradingCasUsage.jpg" alt="Trading et veille" />
          <div className="text-content">
            <h3>Visualisation scientifique</h3>
            <p>
              Explorez des données scientifiques complexes de manière intuitive. 
              La réponse haptique d'InsightTouch vous permet de mieux comprendre 
              les variations et les tendances dans vos données de recherche, 
              offrant une nouvelle perspective dans l'analyse scientifique.
            </p>
          </div>
        </div>

        <div className="CasUsage__case" id="casUsage3">
          <img src="/img/etudeJeuneCasUsage.jpg" alt="Formation et éducation" />
          <div className="text-content">
            <h3>Formation et éducation</h3>
            <p>
              Rendez l'apprentissage des mathématiques plus accessible et intuitif. 
              InsightTouch offre une nouvelle approche pédagogique qui facilite la 
              compréhension des graphiques et des fonctions pour les élèves, transformant
              l'apprentissage en une expérience interactive et ludique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasUsage;
