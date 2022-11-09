import "./SearchForm.css";

const SearchForm = ({ onSubmit, onChange, values }) => {
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
        ></input>
        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
