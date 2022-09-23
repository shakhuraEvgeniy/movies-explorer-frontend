import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import './App.css';
import Main from '../Main/Main';
import SearchForm from '../SearchForm/SearchForm';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Route path="/">
      <SearchForm />
        {/* <Main /> */}
      </Route>
      <Route path="/movies">
      </Route>
      <Route path="/saved-movies"></Route>
      <Route path="/profile"></Route>
      <Route path="/signin"></Route>
      <Route path="/signup"></Route>
    </div>
  );
}

export default App;
