import React from "react";
import Navbar from "./Navbar";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return <div>
    <Navbar />
  </div>;
};

export default Header;
