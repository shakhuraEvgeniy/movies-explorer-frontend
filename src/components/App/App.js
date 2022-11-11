import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import InfoPopup from "../InfoPopup/infoPopup";
import { useEffect } from "react";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import { DURATION_SHORT_FILM, POPUP_ACTIV_PERIOD } from "../../utils/constants";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSuccessInfoPopup, setIsSuccessInfoPopup] = useState(false);
  const [textInfoPopup, setTextInfoPopup] = useState("");
  const [isBloked, setIsBloked] = useState(false);
  const history = useHistory();

  //-----------Обработка пользователя--------------

  useEffect(() => {
    getDataUser();
  }, []);

  const handleRegisterSubmit = async (email, password, name) => {
    try {
      setIsBloked(true);
      await mainApi.register(email, password, name);
      await handleLoginSubmit(email, password);
    } catch (e) {
      openPopup(false, e.message);
    } finally {
      setIsBloked(false);
    }
  };

  const handleLoginSubmit = async (email, password) => {
    try {
      setIsBloked(true);
      await mainApi.auth(email, password);
      await getDataUser();
      history.push("/movies");
    } catch (e) {
      openPopup(false, e.message);
    } finally {
      setIsBloked(false);
    }
  };

  const getDataUser = async () => {
    try {
      const user = await mainApi.getUser();
      setCurrentUser(user);
      setLoggedIn(true);
    } catch (e) {
      openPopup(false, e.message);
    }
  };

  const handleLogoutSubmit = async () => {
    try {
      setIsBloked(true);
      await mainApi.logout();
      setCurrentUser([]);
      setLoggedIn(false);
      localStorage.clear();
    } catch (e) {
      openPopup(false, e.message);
    } finally {
      setIsBloked(false);
    }
  };

  const handleUpdateUser = async (email, name) => {
    try {
      setIsBloked(true);
      const user = await mainApi.updateUser(email, name);
      openPopup(true, "Данные пользователя обновлены");
      setCurrentUser(user);
    } catch (e) {
      openPopup(false, e.message);
    } finally {
      setIsBloked(false);
    }
  };

  //-----------информационный попап--------------

  const openInfoPopup = (title) => {
    setTextInfoPopup(title);
    setIsInfoPopupOpen(true);
  };

  const closePopup = () => {
    setIsInfoPopupOpen(false);
    setTextInfoPopup("");
  };

  useEffect(() => {
    if (isInfoPopupOpen) {
      setTimeout(setIsInfoPopupOpen, POPUP_ACTIV_PERIOD, false);
    }
  }, [isInfoPopupOpen]);

  //--------------обработка фильмов--------------

  const searchMovies = (allMovies, searchInpit, isShortFilm) => {
    if (allMovies) {
      return allMovies.filter(
        (item) =>
          (item.nameRU.toLowerCase() || item.nameEN.toLowerCase()).includes(
            searchInpit.toLowerCase()
          ) &&
          (isShortFilm
            ? item.duration <= DURATION_SHORT_FILM
            : item.duration > 0)
      );
    } else {
      return [];
    }
  };

  const getMovies = async () => {
    try {
      setIsBloked(true);

      return await moviesApi.getAllMovies();
    } catch (e) {
      openPopup(false, e.message);
    } finally {
      setIsBloked(false);
    }
  };

  const getSaveMovies = async () => {
    try {
      setIsBloked(true);
      return await mainApi.getSavedMovie();
    } catch (e) {
      openPopup(false, e.message);
    } finally {
      setIsBloked(false);
    }
  };

  const handleLike = async (movie, imageUrl, isLiked) => {
    try {
      setIsBloked(true);
      return await mainApi.changeLikedMovieStatus({
        ...movie,
        movieId: movie.id,
        image: imageUrl,
        isLiked,
      });
    } catch (e) {
      openPopup(false, e.message);
    } finally {
      setIsBloked(false);
    }
  };

  const openPopup = (status, message) => {
    setIsSuccessInfoPopup(status);
    openInfoPopup(message);
  };

  const checkedValidSearchForm = (value) => {
    if (value) {
      return true;
    } else {
      openPopup(false, "Нужно ввести ключевое слово");
      return false;
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn} dark={true} />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            onSearch={searchMovies}
            getSaveMovies={getSaveMovies}
            onMovieLike={handleLike}
            onCheckValidSearchForm={checkedValidSearchForm}
            isBloked={isBloked}
            getMovies={getMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            getSaveMovies={getSaveMovies}
            loggedIn={loggedIn}
            component={SavedMovies}
            onSearch={searchMovies}
            onMovieLike={handleLike}
            onCheckValidSearchForm={checkedValidSearchForm}
            isBloked={isBloked}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onLogout={handleLogoutSubmit}
            onUpdate={handleUpdateUser}
            isBloked={isBloked}
          />
          <Route path="/signin">
            {!loggedIn ? (
              <Login onLogin={handleLoginSubmit} isBloked={isBloked} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/signup">
            {!loggedIn ? (
              <Register onRegister={handleRegisterSubmit} isBloked={isBloked} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route>
            {loggedIn ? <Redirect exact to="/movies" /> : <Redirect to="/" />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoPopup
          isSuccess={isSuccessInfoPopup}
          isOpen={isInfoPopupOpen}
          title={textInfoPopup}
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
