import React from "react";
import { SectionComponentProps } from "../../data/sections";
import BlocText from "../BlocText";

const CasUsage: React.FC<SectionComponentProps> = ({ id }) => {
  return (
    <div className="section" id={id}>
      <div className="CasUsage__container" id="CasUsage__container">
      <BlocText id="" title="" text="" />
      </div>
    </div>
  );
};

export default CasUsage;
