import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm />
        <FilterCheckbox />
        <Preloader isLoading={false} />
        <MoviesCardList saved={false} />
        <button className="movies__button">Ещё</button>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
