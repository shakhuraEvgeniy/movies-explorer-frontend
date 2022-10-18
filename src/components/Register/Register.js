import Auth from "../Auth/Auth";
import "../Auth/Auth.css";

const Register = () => {
  return (
    <Auth
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
    >
      <div className="auth__input-block">
        <h3 className="auth__name">Имя</h3>
        <input className="auth__input"></input>
        <span className="auth-name-input-error auth__input-error"></span>
      </div>
      <div className="auth__input-block">
        <h3 className="auth__name">E-mail</h3>
        <input className="auth__input" type="email"></input>
        <span className="auth-name-input-error auth__input-error"></span>
      </div>
      <div className="auth__input-block">
        <h3 className="auth__name">Пароль</h3>
        <input className="auth__input" type="password"></input>
        <span className="auth-name-input-error auth__input-error"></span>
      </div>
    </Auth>
  );
};

export default Register;
