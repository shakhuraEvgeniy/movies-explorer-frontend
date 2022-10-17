import React from "react";
import {  Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({ loggedIn }) => {
  return (
    <header className={`header ${loggedIn && "header_dark"}`}>
      <div className="header__logo"></div>
      {loggedIn || (
        <nav className="header__menu-movies">
          <NavLink
            to="/movies"
            className="header__link"
            activeClassName="header__link_activ"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="header__link"
            activeClassName="header__link_activ"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
      )}
      {loggedIn ? (
        <ul className="header__menu">
          <li>
            <Link className="header__signup" to="/signup">Регистрация</Link>
          </li>
          <li>
            <Link className="header__signin" to="/signin">Войти</Link>
          </li>
        </ul>
      ) : (
        <ul className="header__menu_login">
          <li>
            <button className="header__account">
              <svg className="header__pic" width="12" height="14"></svg>
              Аккаунт
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
