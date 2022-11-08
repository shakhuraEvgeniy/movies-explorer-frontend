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

let countRenderMovies = 12;

const Movies = ({ loggedIn, onSearch, getSaveMovies, onMovieLike }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, setValues, errors, isValid } =
    useFormWithValidation({
      searchInput: "",
    });
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isActivAdd, setIsActivAdd] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  let startCountRenderMovies =
    window.screen.width >= 1280 ? 12 : window.screen.width >= 768 ? 8 : 5;

  useEffect(() => {
    localStorage.getItem("renderMovies") &&
      setMovies(JSON.parse(localStorage.getItem("renderMovies")));
    localStorage.getItem("searchInput") &&
      setValues({
        ...values,
        searchInput: localStorage.getItem("searchInput"),
      });
    localStorage.getItem("filterCheckbox") &&
      setIsShortFilm(JSON.parse(localStorage.getItem("filterCheckbox")));
      getSavedMovies();
  }, []);

  window.addEventListener("resize", resizeThrottler, false);

  let resizeTimeout;
  function resizeThrottler() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        actualResizeHandler();
      }, 1000);
    }
  }

  function actualResizeHandler() {
    if (window.screen.width >= 1280) {
      countRenderMovies = 12;
      renderMovies();
    } else {
      if (window.screen.width >= 768) {
        countRenderMovies = 8;
        renderMovies();
      } else {
        countRenderMovies = 5;
        renderMovies();
      }
    }
  }

  const getSavedMovies = async () => {
    const saveMovies = await getSaveMovies();
    setSavedMovies(saveMovies)
  }

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
    localStorage.setItem("searchInput", values.searchInput);
    localStorage.setItem("filterCheckbox", JSON.stringify(isShortFilm));
  };

  const sortedMovies = (activMovie) =>{
    const newArray = activMovie.map((item) => {
      const newItem = savedMovies.find(c => c.movieId === item.id )
      return (newItem) ? {...item, _id: newItem._id, liked: true} : item
    })
    setMovies(newArray);
    return newArray
  }

  const renderMovies = () => {
    const allFindMovies = localStorage.getItem("allFindMovies")
      ? JSON.parse(localStorage.getItem("allFindMovies"))
      : [];
    const activMovie = allFindMovies.slice(0, countRenderMovies);
    activMovie.length < allFindMovies.length
      ? setIsActivAdd(true)
      : setIsActivAdd(false);
    const sortMovies = sortedMovies(activMovie)
    localStorage.setItem("renderMovies", JSON.stringify(sortMovies));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsActivAdd(false);
    const data = await getMovies();
    const findMovies = onSearch(data, values.searchInput, isShortFilm);
    localStorage.setItem("allFindMovies", JSON.stringify(findMovies));
    if (findMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    saveDataToLS();
    if (startCountRenderMovies < countRenderMovies)
      countRenderMovies = startCountRenderMovies;
    renderMovies();
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
    countRenderMovies = countRenderMovies + countAdd;
    renderMovies();
  };

  const handleLike = async (movie, imageUrl, isLiked) => {
      const saveMovie = await onMovieLike(movie, imageUrl, isLiked);
      const newMovies = movies.map((c) =>
      c.id === saveMovie.movieId
        ? { ...c, _id: saveMovie._id }
        : c
    )
      setMovies(newMovies);
      localStorage.setItem("renderMovies", JSON.stringify(newMovies));
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
        <MoviesCardList saved={false} cards={movies} onMovieLike={handleLike} />
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
