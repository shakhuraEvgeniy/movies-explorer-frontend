import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = () => {
  return (
    <section className="movies">
      <Header loggedIn={false} />
      <SearchForm />
      <FilterCheckbox />
      <Preloader isLoading={false} />
      <MoviesCardList />
      <button className="movies__button">Ещё</button>
    </section>
  );
};

export default Movies;
