import React from "react";
import { Link } from "react-router-dom";
import NavTab from "../NavTab/NavTab";
import "./Header.css";

const Header = ({ loggedIn }) => {
  return (
    <header className={`header ${loggedIn && "header_dark"}`}>
      <Link className="header__logo" to="/"></Link>
      <NavTab loggedIn={loggedIn} />
    </header>
  );
};

export default Header;
