import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css"

const Movies = () => {
  return (
    <section className="movies">
      <Header loggedIn={false} />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
      <button className="movies__button">Ещё</button>
      <Footer />
    </section>
  );
};

export default Movies;
