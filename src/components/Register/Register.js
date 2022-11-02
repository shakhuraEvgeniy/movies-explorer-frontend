import Auth from "../Auth/Auth";
import "../Auth/Auth.css";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

const Register = () => {
  const { values, handleChange } = useFormWithValidation({
    emailInput: "",
    passwordlInput: "",
    nameInput: "",
  });

  return (
    <Auth
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
    >
      <div className="auth__input-block">
        <h3 className="auth__name">Имя</h3>
        <input
          className="auth__input"
          name="nameInput"
          onChange={handleChange}
          value={values.nameInput || ""}
        ></input>
        <span className="auth-name-input-error auth__input-error"></span>
      </div>
      <div className="auth__input-block">
        <h3 className="auth__name">E-mail</h3>
        <input
          className="auth__input"
          type="email"
          name="emailInput"
          onChange={handleChange}
          value={values.emailInput || ""}
        ></input>
        <span className="auth-name-input-error auth__input-error"></span>
      </div>
      <div className="auth__input-block">
        <h3 className="auth__name">Пароль</h3>
        <input
          className="auth__input"
          type="password"
          name="passwordlInput"
          onChange={handleChange}
          required
          value={values.passwordlInput || ""}
        ></input>
        <span className="auth-name-input-error auth__input-error"></span>
      </div>
    </Auth>
  );
};

export default Register;
