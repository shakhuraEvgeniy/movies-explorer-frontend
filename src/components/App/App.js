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
import { POPUP_ACTIV_PERIOD } from "../../utils/constants";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSuccessInfoPopup, setIsSuccessInfoPopup] = useState(false);
  const [textInfoPopup, setTextInfoPopup] = useState("");
  const history = useHistory();

  //-----------Обработка пользователя--------------

  useEffect(() => {
    getDataUser();
  }, []);

  const handleRegisterSubmit = async (email, password, name) => {
    try {
      await mainApi.register(email, password, name);
      setIsSuccessInfoPopup(true);
      openInfoPopup("Пользователь зарегистрирован");
      history.push("/signin");
    } catch (e) {
      setIsSuccessInfoPopup(false);
      openInfoPopup(e.message);
    }
  };

  const handleLoginSubmit = async (email, password) => {
    try {
      await mainApi.auth(email, password);
      await getDataUser();
      history.push("/movies");
    } catch (e) {
      setIsSuccessInfoPopup(false);
      openInfoPopup(e.message);
    }
  };

  const getDataUser = async () => {
    try {
      const user = await mainApi.getUser();
      setCurrentUser(user);
      setLoggedIn(true);
    } catch (e) {
      setIsSuccessInfoPopup(false);
      openInfoPopup(e.message);
    }
  };

  const handleLogoutSubmit = async () => {
    try {
      await mainApi.logout();
      setCurrentUser([]);
      setLoggedIn(false);
    } catch (e) {
      setIsSuccessInfoPopup(false);
      openInfoPopup(e.message);
    }
  };

  const handleUpdateUser = async (email, name) => {
    try {
      const user = await mainApi.updateUser(email, name);
      setCurrentUser(user);
    } catch (e) {
      setIsSuccessInfoPopup(false);
      openInfoPopup(e.message);
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
    return allMovies.filter(
      (item) =>
        (item.nameRU.toLowerCase() || item.nameEN.toLowerCase()).includes(
          searchInpit.toLowerCase()
        ) && (isShortFilm ? item.duration <= 40 : item.duration > 0)
    );
  }

  const getSaveMovies = async () => {
    try {
      return await mainApi.getSavedMovie();
    } catch (err) {
      console.log(err);
    }
  };

    // const handleLike = async (movie, imageUrl, isLiked) => {
  //   try {
  //     const saveMovie = await mainApi.changeLikedMovieStatus({
  //       ...movie,
  //       movieId: movie.id,
  //       image: imageUrl,
  //       isLiked,
  //     });
  //     setMovies((state) =>
  //       state.map((c) =>
  //         c.id === saveMovie.movieId
  //           ? { ...c, _id: saveMovie._id }
  //           : c
  //       )
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
          />
          <ProtectedRoute
            path="/saved-movies"
            getSaveMovies={getSaveMovies}
            loggedIn={loggedIn}
            component={SavedMovies}
            onSearch={searchMovies}
          />
          {/* <ProtectedRoute path="/saved-movies" component={Footer} /> */}
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onLogout={handleLogoutSubmit}
            onUpdate={handleUpdateUser}
          />
          <Route path="/signin">
            <Login onLogin={handleLoginSubmit} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegisterSubmit} />
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
