import "./SearchForm.css";

const SearchForm = ({ onSubmit }) => {
  return (
    <div className="search">
      <form className="search__form" onSubmit={onSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="Фильм"
          required
        ></input>
        <span className="search-input-error search__input-error"></span>
        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
