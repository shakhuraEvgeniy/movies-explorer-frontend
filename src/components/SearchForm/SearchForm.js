import "./SearchForm.css";

const SearchForm = ({ onSubmit, onChange, values, isBloked }) => {
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
          disabled={isBloked}
        ></input>
        <button className="search__button" type="submit" disabled={isBloked}>
          Поиск
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
