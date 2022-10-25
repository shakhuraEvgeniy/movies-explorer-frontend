import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList saved={true}/>
    </main>
  );
};

export default SavedMovies;
