import React from "react";
import { Link } from "react-router-dom";
import NavTab from "../NavTab/NavTab";
import "./Header.css";

const Header = ({ loggedIn, dark }) => {
  return (
    <header className={`header ${dark && "header_dark"}`}>
      <Link className="header__logo" to="/"></Link>
      <NavTab loggedIn={loggedIn} dark={dark}/>
    </header>
  );
};

export default Header;
