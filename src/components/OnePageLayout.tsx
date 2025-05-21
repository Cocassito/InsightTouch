import React from "react";
import Header from "./Header";
import { sections } from "../data/sections";
import SectionNavbar from "./SectionNavbar";
import { useViewport } from "../hook/useViewport";
import Object3D from "./Object3D";

const OnePageLayout: React.FC = () => {
  const { isMobile } = useViewport();
  return (
    <>
      <Header />
      {!isMobile && <SectionNavbar sections={sections} />}
      <main>
       <Object3D />
        {sections.map(({ id, component: Component }) => (
          <Component key={id} id={id} />
        ))}
      </main>
      <footer style={{ padding: "2rem" }}>© Footer</footer>
    </>
  );
};

export default OnePageLayout;
