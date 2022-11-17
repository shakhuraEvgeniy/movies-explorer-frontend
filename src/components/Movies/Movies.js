import React, { useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import { useState } from "react";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import NotFoundMovies from "../NotFoundMovies/NotFoundMovies";
import {
  ADD_MOVIES_DESKTOP,
  ADD_MOVIES_MOBILE,
  ADD_MOVIES_TABLET,
  COUNT_MOVIES_DESKTOP,
  COUNT_MOVIES_MOBILE,
  COUNT_MOVIES_TABLET,
} from "../../utils/constants";

let countRenderMovies = COUNT_MOVIES_DESKTOP;

const Movies = ({
  loggedIn,
  onSearch,
  getSaveMovies,
  onMovieLike,
  onCheckValidSearchForm,
  getMovies,
  isBloked,
}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, setValues } = useFormWithValidation({
    searchInput: "",
  });
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isActivAdd, setIsActivAdd] = useState(false);

  let startCountRenderMovies =
    window.screen.width >= 1280
      ? COUNT_MOVIES_DESKTOP
      : window.screen.width >= 768
      ? COUNT_MOVIES_TABLET
      : COUNT_MOVIES_MOBILE;

  useEffect(() => {
    localStorage.getItem("searchInput") &&
      setValues({
        ...values,
        searchInput: localStorage.getItem("searchInput"),
      });
    localStorage.getItem("filterCheckbox") &&
      setIsShortFilm(JSON.parse(localStorage.getItem("filterCheckbox")));

    const allMovies = localStorage.getItem("allFindMovies")
      ? JSON.parse(localStorage.getItem("allFindMovies"))
      : [];
    allMovies && sortedMovies(allMovies);
    window.addEventListener("resize", resizeThrottler, false);

    localStorage.getItem("renderMovies") && sortRenderMovies();
    return () => {
      window.removeEventListener("resize", resizeThrottler, false);
    };
  }, []);

  useEffect(() => {
    values.searchInput && searchMovies();
  }, [isShortFilm]);

  useEffect(() => {
    if (movies.length === 0 && values.searchInput) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [movies]);

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
      countRenderMovies = COUNT_MOVIES_DESKTOP;
      renderMovies();
    } else {
      if (window.screen.width >= 768) {
        countRenderMovies = COUNT_MOVIES_TABLET;
        renderMovies();
      } else {
        countRenderMovies = COUNT_MOVIES_MOBILE;
        renderMovies();
      }
    }
  }

  const sortRenderMovies = async () => {
    const saveRenderMovies = JSON.parse(localStorage.getItem("renderMovies"));
    const sortSaveMovies = await sortedMovies(saveRenderMovies);
    localStorage.setItem("renderMovies", JSON.stringify(sortSaveMovies));
    renderMovies();
  };

  const saveDataToLS = () => {
    localStorage.setItem("searchInput", values.searchInput);
    localStorage.setItem("filterCheckbox", JSON.stringify(isShortFilm));
  };

  const sortedMovies = async (activMovie) => {
    const saveMovies = await getSaveMovies();
    const newArray = activMovie.map((item) => {
      const newItem = saveMovies.find((c) => c.movieId === item.id);
      return newItem ? { ...item, _id: newItem._id } : { ...item, _id: "" };
    });
    return newArray;
  };

  const renderMovies = () => {
    const allFindMovies = localStorage.getItem("renderMovies")
      ? JSON.parse(localStorage.getItem("renderMovies"))
      : [];
    const activMovie = allFindMovies.slice(0, countRenderMovies);
    activMovie.length < allFindMovies.length
      ? setIsActivAdd(true)
      : setIsActivAdd(false);
    setMovies(activMovie);
  };

  const searchMovies = () => {
    const allMovies = JSON.parse(localStorage.getItem("allFindMovies"));
    const findMovies = onSearch(allMovies, values.searchInput, isShortFilm);
    saveDataToLS();
    if (startCountRenderMovies < countRenderMovies)
      countRenderMovies = startCountRenderMovies;
    localStorage.setItem("renderMovies", JSON.stringify(findMovies));
    renderMovies();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onCheckValidSearchForm(values.searchInput)) {
      setIsLoading(true);
      setIsActivAdd(false);
      setIsNotFound(false);
      if (!localStorage.getItem("allFindMovies")) {
        const data = await getMovies();
        const sortMovies = await sortedMovies(data);
        localStorage.setItem("allFindMovies", JSON.stringify(sortMovies));
      }
      searchMovies();
      setIsLoading(false);
    }
  };

  const handleCheckbox = () => {
    setIsShortFilm(!isShortFilm);
  };

  const addMovies = () => {
    let countAdd;
    if (window.screen.width >= 1280) {
      countAdd = ADD_MOVIES_DESKTOP;
    } else {
      if (window.screen.width >= 768) {
        countAdd = ADD_MOVIES_TABLET;
      } else {
        countAdd = ADD_MOVIES_MOBILE;
      }
    }
    countRenderMovies = countRenderMovies + countAdd;
    renderMovies();
  };

  const handleLike = async (movie, imageUrl, isLiked) => {
    const saveMovie = await onMovieLike(movie, imageUrl, isLiked);
    const newMovies = movies.map((c) =>
      c.id === saveMovie.movieId ? { ...c, _id: saveMovie._id } : c
    );
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
          isBloked={isBloked}
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
