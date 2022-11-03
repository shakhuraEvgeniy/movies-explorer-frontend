import Auth from "../Auth/Auth";
import "../Auth/Auth.css";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

const Register = ({onRegister}) => {
  const { values, handleChange, isValid, errors } = useFormWithValidation({
    emailInput: "",
    passwordlInput: "",
    nameInput: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.emailInput, values.passwordlInput, values.nameInput)
  }

  return (
    <Auth
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="auth__input-block">
        <h3 className="auth__name">Имя</h3>
        <input
          className="auth__input"
          name="nameInput"
          required
          onChange={handleChange}
          value={values.nameInput || ""}
        ></input>
        <span className="auth__input-error">{errors.nameInput}</span>
      </div>
      <div className="auth__input-block">
        <h3 className="auth__name">E-mail</h3>
        <input
          className="auth__input"
          type="email"
          required
          name="emailInput"
          onChange={handleChange}
          value={values.emailInput || ""}
        ></input>
        <span className="auth__input-error">{errors.emailInput}</span>
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
        <span className="auth__input-error">{errors.passwordlInput}</span>
      </div>
    </Auth>
  );
};

export default Register;
