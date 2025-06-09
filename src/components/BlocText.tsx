import React from "react";

type BlocTextProps = {
  text: string;
  title: string;
  id: string;
  right?: string;
  top?: string;
};

const BlocText: React.FC<BlocTextProps> = ({ text, title, id, right, top }) => {
  return (
    <div
      className="BlocText__container"
      id={id}
      style={{
        position: "absolute",
        right,
        top,
      }}
    >
      <h3 id="BlocTextTitle">{title}</h3>
      <p id="BlocTextText">{text}</p>
    </div>
  );
};

export default BlocText;
