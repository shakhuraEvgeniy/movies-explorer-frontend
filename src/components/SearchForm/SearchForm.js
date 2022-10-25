import "./SearchForm.css";

const SearchForm = () => {
  return (
    <div className="search">
      <form className="search__form">
        <input
          className="search__input"
          type="text"
          placeholder="Фильм"
          required
        ></input>
        <button className="search__button">Поиск</button>
      </form>
    </div>
  );
};

export default SearchForm;
