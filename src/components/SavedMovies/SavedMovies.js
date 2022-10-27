import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

const SavedMovies = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList saved={true} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
