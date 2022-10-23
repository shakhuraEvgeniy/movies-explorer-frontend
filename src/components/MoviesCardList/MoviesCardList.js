import React from "react";
import "./MoviesCardList.css";
import PhotoPath from "../../images/Photo.jpeg";
import MoviesCard from "../MoviesCard/MoviesCard";

const cards = [
  // {
  //   image: PhotoPath,
  //   title: "33 слова о дизайне",
  //   duration: "1ч 47м",
  // },
  // {
  //   image: PhotoPath,
  //   title: "33 слова о дизайне",
  //   duration: "1ч 47м",
  // },
  // {
  //   image: PhotoPath,
  //   title: "33 слова о дизайне",
  //   duration: "1ч 47м",
  // },
  // {
  //   image: PhotoPath,
  //   title: "33 слова о дизайне",
  //   duration: "1ч 47м",
  // },
  // {
  //   image: PhotoPath,
  //   title: "33 слова о дизайне",
  //   duration: "1ч 47м",
  // },
  // {
  //   image: PhotoPath,
  //   title: "33 слова о дизайне",
  //   duration: "1ч 47м",
  // },
  // {
  //   image: PhotoPath,
  //   title: "33 слова о дизайне",
  //   duration: "1ч 47м",
  // },
  // {
  //   image: PhotoPath,
  //   title: "33 слова о дизайне",
  //   duration: "1ч 47м",
  // },
  {
    image: PhotoPath,
    title: "33 слова о дизайне",
    duration: "1ч 47м",
  },
  {
    image: PhotoPath,
    title: "33 слова о дизайне",
    duration: "1ч 47м",
  },
  {
    image: PhotoPath,
    title: "33 слова о дизайне",
    duration: "1ч 47м",
  },
  {
    image: PhotoPath,
    title: "33 слова о дизайне",
    duration: "1ч 47м",
  },
];

const MoviesCardList = () => {
  return (
    <section className="movies-card-list">
      {cards.map((card) => (
        <MoviesCard card={card} />
      ))}
    </section>
  );
};

export default MoviesCardList;
