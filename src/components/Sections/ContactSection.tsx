import React from "react";
import { SectionComponentProps } from "../../data/sections";

const ContactSection: React.FC<SectionComponentProps> = ({ id }) => {
  return (
    <div className="section" id={id}>
      <div id="contact__container" className="contact__container" style={{ display: "none" }}>
        <h2 id="contact__title" className="contact__title">
          Intéressé par InsightTouch ?
        </h2>
        <div id="contact__content" className="contact__content">
          <p>
            Ce projet est actuellement en phase de recherche et développement.
            Nous sommes à la recherche de partenaires et de financement pour
            concrétiser cette innovation.
          </p>
          <div id="contact__cta" className="contact__cta">
            <h3>
              Contactez-nous pour en savoir plus
            </h3>
            <a href="mailto:contact@insighttouch.tech">
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
