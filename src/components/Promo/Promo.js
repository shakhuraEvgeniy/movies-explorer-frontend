import React from "react";
import "./Promo.css";
import PromoLogoPath from "../../images/text__COLOR_landing-logo.png";

const Promo = () => {
  return (
    <div className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
      <h2 className="promo__text">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </h2>
      <img
        className="promo__image"
        src={PromoLogoPath}
        alt="Эмблема земли из слов web"
      />
      <button className="promo__button">Узнать больше</button>
    </div>
  );
};

export default Promo;

