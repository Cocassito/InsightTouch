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
              Explorez vos données financières d'une manière totalement nouvelle. 
              InsightTouch permet aux analystes de ressentir physiquement les tendances
              et variations du marché, offrant une dimension supplémentaire à l'analyse traditionnelle.
            </p>
          </div>
        </div>

        <div className="CasUsage__case" id="casUsage2">
          <img src="/img/tradingCasUsage.jpg" alt="Trading et veille" />
          <div className="text-content">
            <h3>Trading et veille de marché</h3>
            <p>
              Restez connecté aux mouvements du marché en temps réel. La réponse haptique 
              d'InsightTouch vous alerte instantanément des changements significatifs, 
              vous permettant de réagir plus rapidement aux opportunités.
            </p>
          </div>
        </div>

        <div className="CasUsage__case" id="casUsage3">
          <img src="/img/etudeJeuneCasUsage.jpg" alt="Formation et éducation" />
          <div className="text-content">
            <h3>Formation et éducation</h3>
            <p>
              Rendez l'apprentissage des marchés financiers plus accessible et intuitif. 
              InsightTouch offre une nouvelle approche pédagogique qui facilite la 
              compréhension des concepts financiers pour les étudiants et les nouveaux traders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasUsage;
