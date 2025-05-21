import React from "react";
import { useViewport } from "../hook/useViewport";
import SectionNavbar from "./SectionNavbar";
import { sections } from "../data/sections";

const TopBar: React.FC = () => {
  const { isMobile } = useViewport();

  return (
    <div className="topBar__container">
      <div className={isMobile ? "topBar__logoIT" : "topBar__logo"}>
        <img
          src={isMobile ? "/img/ITLogo.svg" : "/img/InsightTouchLogo.svg"}
          alt="Logo InsightTouch"
          width="100%"
          height="100%"
        />
      </div>
    <SectionNavbar sections={sections} />
    </div>
  );
};

export default TopBar;
