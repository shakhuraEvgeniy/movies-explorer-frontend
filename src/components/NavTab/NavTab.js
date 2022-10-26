import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavTab.css";

const NavTab = ({ loggedIn }) => {
  const [activBurger, setActivBurger] = useState(false);
  const hendleBurger = () => {
    setActivBurger(!activBurger);
  };
  return (
    <>
      {loggedIn ? (
        <ul className="nav-tab__profile">
          <li>
            <Link className="nav-tab__signup" to="/signup">
              Регистрация
            </Link>
          </li>
          <li>
            <Link className="nav-tab__signin" to="/signin">
              Войти
            </Link>
          </li>
        </ul>
      ) : (
        <section className="nav-tab">
          <div className={`nav-tab__blur ${activBurger && "activ"}`}> </div>
          <div
            className={`nav-tab__burger ${activBurger && "activ"}`}
            onClick={hendleBurger}
          >
            <span></span>
          </div>
          <nav className={`nav-tab__menu ${activBurger && "activ"}`}>
            <div className="nav-tab__movies-block">
              <NavLink
                exact
                to="/"
                className="nav-tab__movies nav-tab__main-page"
                activeClassName="nav-tab__movies_activ"
              >
                Главная
              </NavLink>
              <NavLink
                to="/movies"
                className="nav-tab__movies"
                activeClassName="nav-tab__movies_activ"
              >
                Фильмы
              </NavLink>
              <NavLink
                to="/saved-movies"
                className="nav-tab__movies"
                activeClassName="nav-tab__movies_activ"
              >
                Сохранённые фильмы
              </NavLink>
            </div>
            <Link className="nav-tab__account" to="/profile">
              <svg className="nav-tab__pic" width="12" height="14"></svg>
              Аккаунт
            </Link>
          </nav>
        </section>
      )}
    </>
  );
};
export default NavTab;
