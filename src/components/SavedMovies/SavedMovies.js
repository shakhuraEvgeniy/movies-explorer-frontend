import React, { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import NotFoundMovies from "../NotFoundMovies/NotFoundMovies";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

const SavedMovies = ({
  loggedIn,
  getSaveMovies,
  onSearch,
  onMovieLike,
  onCheckValidSearchForm,
}) => {
  const [allSavedMovies, setAllSavedMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [movies, setMovies] = useState([]);

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    searchInput: "",
  });
  const [isShortFilm, setIsShortFilm] = useState(false);

  useEffect(() => {
    searchMovies();
  }, [isShortFilm]);

  useEffect(() => {
    if (movies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [movies]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const saveMovies = await getSaveMovies();
    setMovies(saveMovies);
    setAllSavedMovies(saveMovies);
  };

  const handleCheckbox = () => {
    setIsShortFilm(!isShortFilm);
  };

  const searchMovies = () => {
    const findMovies = onSearch(
      allSavedMovies,
      values.searchInput,
      isShortFilm
    );
    setMovies(findMovies);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onCheckValidSearchForm(values.searchInput)) {
      searchMovies();
    }
  };

  const handleLike = async (movie, imageUrl, isLiked) => {
    const saveMovie = await onMovieLike(movie, imageUrl, isLiked);
    const newMovies = movies.filter((c) => c._id !== saveMovie._id && c);
    const allNewMovies = movies.filter((c) => c._id !== saveMovie._id && c);
    setMovies(newMovies);
    setAllSavedMovies(allNewMovies);
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          values={values}
          errors={errors}
          isValid={isValid}
        />
        <FilterCheckbox onChange={handleCheckbox} checked={isShortFilm} />
        <MoviesCardList saved={true} cards={movies} onMovieLike={handleLike} />
        <NotFoundMovies isNotFound={isNotFound} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
