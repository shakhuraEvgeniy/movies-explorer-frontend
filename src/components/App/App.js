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

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  // const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isSuccessInfoPopup, setIsSuccessInfoPopup] = useState(false);
  const [textInfoPopup, setTextInfoPopup] = useState("");
  const history = useHistory();

  useEffect(() => {
    getDataUser();
  }, []);

  useEffect(() => {
    if (isInfoPopupOpen) {
      setTimeout(setIsInfoPopupOpen, 10000, false);
    }
  }, [isInfoPopupOpen]);

  const closePopup = () => {
    setIsInfoPopupOpen(false);
    setTextInfoPopup("");
  };

  const handleRegisterSubmit = async (email, password, name) => {
    try {
      await mainApi.register(email, password, name);
      // setRegisterSuccess(true);
      history.push("/signin");
    } catch (e) {
      // setRegisterSuccess(false);
      setIsSuccessInfoPopup(false);
      openInfoPopup(e);
    }
  };

  const handleLoginSubmit = async (email, password) => {
    try {
      await mainApi.auth(email, password);
      await getDataUser();
      history.push("/movies");
    } catch (e) {
      // setRegisterSuccess(false);
      setIsSuccessInfoPopup(false);
      openInfoPopup(e);
    }
  };

  const getDataUser = async () => {
    try {
      const user = await mainApi.getUser();
      setCurrentUser(user);
      setLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogoutSubmit = async () => {
    try {
      await mainApi.logout();
      setCurrentUser([]);
      setLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateUser = async (email, name) => {
    try {
      const user = await mainApi.updateUser(email, name);
      setCurrentUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const openInfoPopup = (title) => {
    setTextInfoPopup(title);
    setIsInfoPopupOpen(true);
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
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
          />
          <ProtectedRoute path="/saved-movies" component={Footer} />
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
