import React from "react";
import SectionNavbar from "./SectionNavbar";
import { sections } from "../data/sections";

const Header: React.FC = () => {
  return (
    <div>
      <SectionNavbar sections={sections} />
    </div>
  );
};

export default Header;
