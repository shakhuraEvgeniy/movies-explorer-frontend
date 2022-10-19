import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavTab.css";

const NavTab = ({ loggedIn }) => {
  return (
    <>
      {loggedIn || (
        <nav>
          <NavLink
            to="/movies"
            className="menu__movies"
            activeClassName="menu__movies_activ"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="menu__movies"
            activeClassName="menu__movies_activ"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
      )}
      {loggedIn ? (
        <ul className="menu__profile">
          <li>
            <Link className="menu__signup" to="/signup">
              Регистрация
            </Link>
          </li>
          <li>
            <Link className="menu__signin" to="/signin">
              Войти
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="menu__profile_login">
          <li>
            <Link className="menu__account" to="/profile">
              <svg className="menu__pic" width="12" height="14"></svg>
              Аккаунт
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavTab;
