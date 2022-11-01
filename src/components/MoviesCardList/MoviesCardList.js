import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({ saved, cards }) => {
  return (
    <section className="movies-card-list">
      {cards.map((card) => (
        <MoviesCard key={card.id} card={card} saved={saved} />
      ))}
    </section>
  );
};

export default MoviesCardList;
