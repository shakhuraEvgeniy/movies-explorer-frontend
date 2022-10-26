import React from "react";
import { useState } from "react";
import "./MoviesCard.css";

const MoviesCard = ({ card, saved }) => {
  const { image, title, duration, liked } = card;
  const [isLiked, setIsLiked] = useState(liked);
  const handleLiked = () => {
    saved || setIsLiked(!isLiked);
  };
  return (
    <article className="card">
      <div className="card__group">
        <h2 className="card__title">{title}</h2>
        <span className="card__duration">{duration}</span>
        <button
          className={`card__like ${(isLiked && saved) ? "card__like_delete" : isLiked && "card__like_activ"} `}
          type="button"
          onClick={handleLiked}
        ></button>
      </div>
      <img src={image} alt={title} className="card__image" />
    </article>
  );
};

export default MoviesCard;
