import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (<section className="notFound">
    <h2 className="notFound__title">404</h2>
    <h3 className="notFound__subtitle">Страница не найдена</h3>
    <Link className="notFound__link" to="/">Назад</Link>
  </section>);
};

export default NotFound;
