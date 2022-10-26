import { Link } from "react-router-dom";
import "./Auth.css";

function Auth({ name, title, buttonText, onSubmit, children }) {
  return (
    <main className={`auth auth_type_${name}`}>
      <Link className="auth__logo" to="/"></Link>
      <h2 className="auth__title">{title}</h2>
      <form
        className="auth__form"
        name={`auth__form_${name}`}
        onSubmit={onSubmit}
      >
        <div>{children}</div>
        <button className="auth__submit" type="submit">
          {buttonText}
        </button>
      </form>
      {name === "register" && (
        <h3 className="auth__caption">
          Уже зарегистрированы?{" "}
          <Link className="auth__caption auth__link-login" to="/signin">
            Войти
          </Link>
        </h3>
      )}
      {name === "login" && (
        <h3 className="auth__caption">
          Ещё не зарегистрированы?{" "}
          <Link className="auth__caption auth__link-login" to="/signup">
            Регистрация
          </Link>
        </h3>
      )}
    </main>
  );
}

export default Auth;
