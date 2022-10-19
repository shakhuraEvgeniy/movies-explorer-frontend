import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

const SavedMovies = () => {
  return (
    <section className="saved-movies">
      <Header loggedIn={false} />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
    </section>
  );
};

export default SavedMovies;
