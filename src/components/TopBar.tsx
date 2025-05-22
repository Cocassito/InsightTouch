import React, { useState } from "react";
import { useViewport } from "../hook/useViewport";
import SectionNavbar from "./SectionNavbar";
import { sections } from "../data/sections";

const TopBar: React.FC = () => {
  const { isMobile } = useViewport();
  const [activeSection, setActiveSection] = useState<string>("");

  return (
    <>
      <div className="topBar__container">
        <div id="logoInsightTouch" className="topBar__logoInsightTouch">
          <img
            src="/img/InsightTouchLogo.svg"
            alt="Logo InsightTouch"
            width="100%"
            height="100%"
          />
        </div>
        <div id="logoIT" className="topBar__logoIT">
          <img src="/img/ITLogo.svg" alt="Logo IT" width="100%" height="100%" />
        </div>

        {isMobile && (
          <SectionNavbar
            sections={sections}
            activeSection={activeSection}
            onSectionClick={(id) => {
              console.log("Clicked:", id);
            }}
          />
        )}
      </div>
    </>
  );
};

export default TopBar;
