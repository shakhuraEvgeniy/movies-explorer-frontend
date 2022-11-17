import "./NotFoundMovies.css";

const NotFoundMovies = ({ isNotFound }) => {
  return (
    <div
      className={`notFoundMovies ${isNotFound || "notFoundMovies_disabled"}`}
    >
      <span className="notFoundMovies__title">Ничего не найдено</span>
    </div>
  );
};

export default NotFoundMovies;
