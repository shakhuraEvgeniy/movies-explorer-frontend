import React, { useState } from "react";
import Header from "../Header/Header";
import "./Profile.css";

const Profile = ({
  name = "Виталий",
  email = "pochta@yandex.ru",
  loggedIn,
}) => {
  const [edit, setEdit] = useState(false);

  const onEditProfile = () => {
    setEdit(true);
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile">
        <h2 className="profile__title">Привет, {name}!</h2>
        <form className="profile__form">
          <div className="profile__input-block">
            <h3 className="profile__name">Имя</h3>
            <input
              value={name}
              className="profile__input"
              disabled={!edit}
            ></input>
            <span className="profile-name-input-error profile__input-error"></span>
          </div>
          <div className="profile__input-block">
            <h3 className="profile__name">E-mail</h3>
            <input
              value={email}
              className="profile__input"
              disabled={!edit}
            ></input>
            <span className="profile-name-input-error profile__input-error"></span>
          </div>
          <button
            type="submit"
            className={`profile__submit ${edit || "button_disabled"}`}
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
        <button className={`profile__logout ${edit && "button_disabled"}`}>
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
};

export default Profile;
