import "./SearchForm.css";

const SearchForm = ({ onSubmit, onChange, values, errors, isValid }) => {

  return (
    <div className="search">
      <form className="search__form" onSubmit={onSubmit}>
        <input
          className="search__input"
          name="searchInput"
          type="text"
          placeholder="Фильм"
          onChange={onChange}
          value={values.searchInput || ""}
          required
        ></input>
        <span className="search__input-error">{errors.searchInput}</span>
        <button className="search__button" type="submit" disabled={!isValid}>
          Поиск
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
