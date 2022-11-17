import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ saved, cards, onMovieLike }) => {
  return (
    <section className="movies-card-list">
      {cards.map((card) => (
        <MoviesCard
          key={card.id ? card.id : card.movieId}
          card={card}
          saved={saved}
          onMovieLike={onMovieLike}
        />
      ))}
    </section>
  );
};

export default MoviesCardList;
