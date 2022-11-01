import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import * as moviesApi from "../../utils/MoviesApi";
import { useState } from "react";
// import { useEffect } from "react";

const Movies = ({ loggedIn }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllMovies = async () => {
    try {
    setIsLoading(true);
    setCards([]);
    const data = await moviesApi.getAllMovies()
    setCards(data);
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getAllMovies();
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm onSubmit={handleSubmit}/>
        <FilterCheckbox />
        <MoviesCardList saved={false} cards={cards} />
        <Preloader isLoading={isLoading} />
        <button className="movies__button" hidden={(cards.length === 0) ? true : false}>Ещё</button>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
