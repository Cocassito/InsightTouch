import React from "react";

type BlocTextProps = {
  text: string;
  title: string;
  id: string; 
};

const BlocText: React.FC<BlocTextProps> = ({ text, title, id }) => {
  return (
    <div className="BlocText__container" id={id}>
      <h3 id="BlocTextTitle">{title}</h3>
      <p id="BlocTextText">{text}</p>
    </div>
  );
};

export default BlocText;
