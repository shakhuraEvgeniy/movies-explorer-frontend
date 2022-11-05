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

const Movies = ({ loggedIn, onSearch }) => {
  const [allFindMovies, setAllFindMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, setValues, errors, isValid } =
    useFormWithValidation({
      searchInput: "",
    });
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isActivAdd, setIsActivAdd] = useState(false);
  const [countRenderMovies, setCountRenderMovies] = useState(3);

  window.addEventListener("resize", resizeThrottler, false);

  let resizeTimeout;
  function resizeThrottler() {
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();
       }, 1000);
    }
  }

  function actualResizeHandler() {
    if (window.screen.width >= 1280) {
      setCountRenderMovies(12);
    } else {
      if (window.screen.width >= 768) {
        setCountRenderMovies(8);
      } else {
        setCountRenderMovies(5);
      }
    }
  }

  useEffect(() => {
    localStorage.getItem("movies") &&
      setAllFindMovies(JSON.parse(localStorage.getItem("movies")));
    localStorage.getItem("renderMovies") &&
      setMovies(JSON.parse(localStorage.getItem("renderMovies")));
    setValues({
      ...values,
      searchInput: localStorage.getItem("searchInput"),
    });
    setIsShortFilm(Boolean(localStorage.getItem("filterCheckbox")));

    //renderMovies();
  }, []);

  useEffect(() => {
    if (window.screen.width >= 1280) {
      setCountRenderMovies(12);
    } else {
      if (window.screen.width >= 768) {
        setCountRenderMovies(8);
      } else {
        setCountRenderMovies(5);
      }
    }
  }, []);

  useEffect(() => {
    renderMovies();
  }, [countRenderMovies]);

  const getMovies = async () => {
    try {
      setIsNotFound(false);
      setIsLoading(true);
      setMovies([]);
      const data = await moviesApi.getAllMovies();
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDataToLS = () => {
    localStorage.setItem("movies", JSON.stringify(allFindMovies));
    localStorage.setItem("searchInput", values.searchInput);
    localStorage.setItem("filterCheckbox", String(isShortFilm));
  };

  const renderMovies = () => {
    const activMovie = allFindMovies.slice(0, countRenderMovies);
    activMovie.length < allFindMovies.length
      ? setIsActivAdd(true)
      : setIsActivAdd(false);
    setMovies(activMovie);
    localStorage.setItem("renderMovies", JSON.stringify(activMovie));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getMovies();
    const findMovies = onSearch(data, values.searchInput, isShortFilm);
    setAllFindMovies(findMovies);
    if (findMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    saveDataToLS();
    countRenderMovies < 3 ? setCountRenderMovies(3) : renderMovies();
  };

  const handleCheckbox = () => {
    setIsShortFilm(!isShortFilm);
  };

  const addMovies = () => {
    let countAdd;
     if (window.screen.width >= 1280) {
      countAdd = 3;
    } else {
      if (window.screen.width >= 768) {
        countAdd = 2;
      } else {
        countAdd = 2;
      }
    }
    setCountRenderMovies(countRenderMovies + countAdd);
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
        <MoviesCardList saved={false} cards={movies} />
        <NotFoundMovies isNotFound={isNotFound} />
        <Preloader isLoading={isLoading} />
        <button
          className="movies__button"
          hidden={!isActivAdd ? true : false}
          onClick={addMovies}
        >
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
