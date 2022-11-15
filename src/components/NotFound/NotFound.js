import React from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <main className="notFound">
      <h2 className="notFound__title">404</h2>
      <h3 className="notFound__subtitle">Страница не найдена</h3>
      <button
        className="notFound__button"
        onClick={() => {
          history.goBack();
        }}
      >
        Назад
      </button>
    </main>
  );
};

export default NotFound;
