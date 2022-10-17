import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  return (
    <section className="register">
      <div className="register__logo"></div>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <div className="register__input-block">
          <h3 className="register__name">Имя</h3>
          <input className="register__input"></input>
          <span className="register-name-input-error register__input-error"></span>
        </div>
        <div className="register__input-block">
          <h3 className="register__name">E-mail</h3>
          <input className="register__input" type="email"></input>
          <span className="register-name-input-error register__input-error"></span>
        </div>
        <div className="register__input-block">
          <h3 className="register__name">Пароль</h3>
          <input className="register__input" type="password"></input>
          <span className="register-name-input-error register__input-error"></span>
        </div>
        <button type="submit" className="register__submit">
          Зарегистрироваться
        </button>
      </form>
      <h3 className="register__caption">
        Уже зарегистрированы?{" "}
        <Link className="register__caption register__link-login" to="/signin">
          Войти
        </Link>
      </h3>
    </section>
  );
};

export default Register;
