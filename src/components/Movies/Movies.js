import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = () => {
  return (
    <main className="movies">
      <SearchForm />
      <FilterCheckbox />
      <Preloader isLoading={false} />
      <MoviesCardList saved={false} />
      <button className="movies__button">Ещё</button>
    </main>
  );
};

export default Movies;
