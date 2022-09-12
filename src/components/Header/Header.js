import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
  <header className="header">
    <Link className="header__link" to="/"></Link>
    <ul className="header__menu">
      <li>
        <button className="header__signup">Регистрация</button>
      </li>
      <li>
        <button className="header__accaunt">Войти</button>
      </li>
    </ul>
  </header>
  );
};

export default Header;
