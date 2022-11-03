import React, { useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import * as moviesApi from "../../utils/MoviesApi";
import { useState } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import NotFoundMovies from "../NotFoundMovies/NotFoundMovies";

const Movies = ({ loggedIn }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, setValues, errors, isValid } =
    useFormWithValidation({
      searchInput: "",
    });
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    localStorage.getItem("movies") &&
      setCards(JSON.parse(localStorage.getItem("movies")));
    setValues({
      ...values,
      searchInput: localStorage.getItem("searchInput"),
    });
    setIsShortFilm(Boolean(localStorage.getItem("filterCheckbox")));
  }, []);

  const getMovies = async () => {
    try {
      setIsLoading(true);
      setCards([]);
      const data = await moviesApi.getAllMovies();
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDataToLS = (data) => {
    localStorage.setItem("movies", JSON.stringify(data));
    localStorage.setItem("searchInput", values.searchInput);
    localStorage.setItem("filterCheckbox", String(isShortFilm));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getMovies();
    const findMovies = data.filter(
      (item) =>
        (item.nameRU.toLowerCase() || item.nameEN.toLowerCase()).includes(
          values.searchInput.toLowerCase()
        ) && (isShortFilm ? item.duration <= 40 : item.duration > 0)
    );
    if (findMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    setCards(findMovies);
    saveDataToLS(findMovies);
  };

  const handleCheckbox = () => {
    setIsShortFilm(!isShortFilm);
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          values={values}
          errors={errors}
          isValid={isValid}
        />
        <FilterCheckbox onChange={handleCheckbox} checked={isShortFilm} />
        <MoviesCardList saved={false} cards={cards} />
        <NotFoundMovies isNotFound={isNotFound} />
        <Preloader isLoading={isLoading} />
        <button
          className="movies__button"
          hidden={cards.length === 0 ? true : false}
        >
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
