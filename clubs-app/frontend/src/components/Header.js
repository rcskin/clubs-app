import React from "react";
import Logo from "../images/STC-logo.png";

const Header = () => {
  return (
    <div className="header">
      <h1>STC Extra-Curricular Clubs App</h1>
      <img className="logo" src={Logo} alt={"STC logo"} />
    </div>
  );
};

export default Header;
