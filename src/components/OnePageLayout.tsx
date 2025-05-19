import React from "react";
import Header from "./Header";
import { sections } from "../data/sections";

const OnePageLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        {sections.map(({ id, component: Component }) => (
          <Component key={id} id={id} />
        ))}
      </main>
      <footer style={{ padding: "2rem" }}>© Footer</footer>
    </>
  );
};

export default OnePageLayout;
