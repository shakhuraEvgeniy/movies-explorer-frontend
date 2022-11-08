import React from "react";
import { useState } from "react";
import { IMAGE_URL } from "../../utils/constants";
import "./MoviesCard.css";

const MoviesCard = ({ card, saved, onMovieLike }) => {
  const { image, nameRU, duration, trailerLink, _id } = card;
  const [isLiked, setIsLiked] = useState(_id ? true : false);
  const handleLiked = () => {
    onMovieLike(card, imageUrl, isLiked);
    saved || setIsLiked(!isLiked);
  };

  const imageUrl = image.url ? IMAGE_URL+image.url: image;
  const durationFloor = Math.floor(duration / 60);
  const durationResidue = duration % 60;

  const durationDisplay = `${durationFloor > 0 ? `${durationFloor}ч` : ""} ${
    durationResidue > 0 ? `${durationResidue}мин` : ""
  }`;

  const handleImage = () => {
    window.open(trailerLink, "_blank");
  };

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
      <img
        src={imageUrl}
        alt={nameRU}
        className="card__image"
        onClick={handleImage}
      />
    </article>
  );
};

export default MoviesCard;
