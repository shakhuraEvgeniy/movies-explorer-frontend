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
    liked: true,
  },
  {
    image: PhotoPath,
    title: "33 слова о дизайне",
    duration: "1ч 47м",
    liked: true,
  },
  {
    image: PhotoPath,
    title: "33 слова о дизайне",
    duration: "1ч 47м",
    liked: false,
  },
  {
    image: PhotoPath,
    title: "33 слова о дизайне",
    duration: "1ч 47м",
    liked: false,
  },
];

const MoviesCardList = ({saved}) => {
  return (
    <section className="movies-card-list">
      {cards.map((card) => (
        <MoviesCard card={card} saved={saved} />
      ))}
    </section>
  );
};

export default MoviesCardList;
