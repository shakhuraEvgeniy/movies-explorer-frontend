import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import './App.css';

function App() {
  return (
    <div className="App">  
      <Header />
      <Route path="/"></Route>
      <Route path="/movies"></Route>
      <Route path="/saved-movies"></Route>
      <Route path="/profile"></Route>
      <Route path="/signin"></Route>
      <Route path="/signup"></Route>
    </div>
  );
}

export default App;
