import { Route, Switch, Redirect } from "react-router-dom";
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

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({})

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
          />
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route>
            {loggedIn ? <Redirect exact to="/movies" /> : <Redirect to="/" />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
