import Auth from "../Auth/Auth";
import "../Auth/Auth.css";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    emailInput: "",
    passwordlInput: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.emailInput, values.passwordlInput);
  }

  return (
    <Auth name="login" title="Рады видеть!" buttonText="Войти" isValid={isValid} onSubmit={handleSubmit}>
      <div className="auth__input-block">
        <h3 className="auth__name">E-mail</h3>
        <input
          className="auth__input"
          type="email"
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

export default Login;
