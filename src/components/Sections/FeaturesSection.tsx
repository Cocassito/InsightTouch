import React from "react";
import { SectionComponentProps } from "../../data/sections";

const FeaturesSection: React.FC<SectionComponentProps> = ({ id }) => {
  return (
    <div className="section" id={id}>
      <div className="feature__container">
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
        </svg>
      </div>
    </div>
  );
};

export default FeaturesSection;
