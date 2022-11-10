import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import "./Profile.css";

const Profile = ({ loggedIn, onLogout, onUpdate, isBloked }) => {
  const currentUser = useContext(CurrentUserContext);
  const [edit, setEdit] = useState(false);
  const [isChangeProfile, setIsChangeProfile] = useState(false);
  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation({
      emailInput: "",
      nameInput: "",
    });

  const onEditProfile = () => {
    setEdit(true);
    setIsChangeProfile(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(values.emailInput, values.nameInput);
    setEdit(false);
  };

  useEffect(() => {
    setValues({
      ...values,
      emailInput: currentUser.email,
      nameInput: currentUser.name,
    });
  }, [currentUser]);

  useEffect(() => {
    values.emailInput === currentUser.email &&
    values.nameInput === currentUser.name
      ? setIsChangeProfile(false)
      : setIsChangeProfile(true);
  }, [values.emailInput, values.nameInput]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__input-block">
            <h3 className="profile__name">Имя</h3>
            <input
              className="profile__input"
              name="nameInput"
              onChange={handleChange}
              value={values.nameInput || ""}
              required
              disabled={!edit || isBloked}
            ></input>
            <span className="profile__input-error">{errors.nameInput}</span>
          </div>
          <div className="profile__input-block">
            <h3 className="profile__name">E-mail</h3>
            <input
              type="email"
              required
              name="emailInput"
              onChange={handleChange}
              value={values.emailInput || ""}
              className="profile__input"
              disabled={!edit || isBloked}
            ></input>
            <span className="profile__input-error">{errors.emailInput}</span>
          </div>
          <button
            type="submit"
            className={`profile__submit ${edit || "button_disabled"} ${
              isValid && isChangeProfile && "active"
            }`}
            disabled={!isValid || isBloked}
          >
            Сохранить
          </button>
        </form>
        <button
          className={`profile__edit ${edit && "button_disabled"}`}
          onClick={onEditProfile}
        >
          Редактировать
        </button>
        <button
          className={`profile__logout ${edit && "button_disabled"}`}
          onClick={onLogout}
        >
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
};

export default Profile;
