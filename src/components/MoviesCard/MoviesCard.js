import React from "react";
import { useState } from "react";
import "./MoviesCard.css";

const MoviesCard = ({ card, saved }) => {
  const { image, nameRU, duration, liked } = card;
  const [isLiked, setIsLiked] = useState(liked);
  const handleLiked = () => {
    saved || setIsLiked(!isLiked);
  };
  const imageUrl = `https://api.nomoreparties.co/${image.url}`;
  const durationFloor = Math.floor(duration / 60);
  const durationResidue = duration % 60;

  const durationDisplay = `${durationFloor > 0 ? `${durationFloor}ч` : ""} ${
    durationResidue > 0 ? `${durationResidue}мин` : ""
  }`;
  return (
    <article className="card">
      <div className="card__group">
        <h2 className="card__title">{nameRU}</h2>
        <span className="card__duration">{durationDisplay}</span>
        <button
          className={`card__like ${
            isLiked && saved
              ? "card__like_delete"
              : isLiked && "card__like_activ"
          } `}
          type="button"
          onClick={handleLiked}
        ></button>
      </div>
      <img src={imageUrl} alt={nameRU} className="card__image" />
    </article>
  );
};

export default MoviesCard;
