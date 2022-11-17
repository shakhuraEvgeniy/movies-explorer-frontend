import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavTab.css";

const NavTab = ({ loggedIn, dark }) => {
  const [activBurger, setActivBurger] = useState(false);
  const hendleBurger = () => {
    setActivBurger(!activBurger);
  };
  return (
    <>
      {loggedIn ? (
        <section className="nav-tab">
          <div className={`nav-tab__blur ${activBurger && "activ"}`}> </div>
          <div
            className={`nav-tab__burger ${activBurger && "activ"} ${(dark && !activBurger) && "nav-tab__burger_light"}`}
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
                className={`nav-tab__movies ${(dark && !activBurger) && "nav-tab__movies_light" }`}
                activeClassName="nav-tab__movies_activ"
              >
                Фильмы
              </NavLink>
              <NavLink
                to="/saved-movies"
                className={`nav-tab__movies ${(dark && !activBurger) && "nav-tab__movies_light"}`}
                activeClassName="nav-tab__movies_activ"
              >
                Сохранённые фильмы
              </NavLink>
            </div>
            <Link className={`nav-tab__account ${(dark && !activBurger) && "nav-tab__account_light"}`} to="/profile">
              <div className={`nav-tab__pic ${dark && "nav-tab__pic_light"}`}></div>
              Аккаунт
            </Link>
          </nav>
        </section>
      ) : (
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
      )}
    </>
  );
};
export default NavTab;
