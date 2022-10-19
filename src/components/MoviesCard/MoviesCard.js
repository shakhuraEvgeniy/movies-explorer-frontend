import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({ card }) => {
  const { image, title, duration } = card;
  return (
    <article className="card">
      <div className="card__group">
        <h2 className="card__title">{title}</h2>
        <span className="card__duration">{duration}</span>
        <button className="card__like" type="button"></button>
      </div>
      <img src={image} alt="" className="card__image" />
    </article>
  );
};

export default MoviesCard;
