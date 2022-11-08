import React, { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import NotFoundMovies from "../NotFoundMovies/NotFoundMovies";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import * as mainApi from "../../utils/MainApi";

const SavedMovies = ({ loggedIn, getSaveMovies, onSearch }) => {
  const [allSavedMovies, setAllSavedMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [movies, setMovies] = useState([]);

  const { values, handleChange, errors, isValid } =
    useFormWithValidation({
      searchInput: "",
    });
  const [isShortFilm, setIsShortFilm] = useState(false);

  useEffect(() => {
    getMovies()
  },[]);

  const getMovies = async () => {
    const saveMovies = await getSaveMovies();
    console.log(saveMovies);
    setMovies(saveMovies)
    setAllSavedMovies(saveMovies);
  }

  const handleCheckbox = () => {
    setIsShortFilm(!isShortFilm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const findMovies = onSearch(allSavedMovies, values.searchInput, isShortFilm);
    if (findMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    setMovies(findMovies);
  };

  const handleLike = async (movie, imageUrl, isLiked) => {
    try {
      const saveMovie = await mainApi.changeLikedMovieStatus({
        ...movie,
        movieId: movie.id,
        image: imageUrl,
        isLiked,
      });
      const newMovies = movies.filter((c) =>
      c._id !== saveMovie._id && c
    )
      setMovies(newMovies);
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm  onSubmit={handleSubmit}
          onChange={handleChange}
          values={values}
          errors={errors}
          isValid={isValid}/>
        <FilterCheckbox onChange={handleCheckbox} checked={isShortFilm}/>
        <MoviesCardList saved={true} cards={movies} onMovieLike={handleLike}/>
        <NotFoundMovies isNotFound={isNotFound} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
