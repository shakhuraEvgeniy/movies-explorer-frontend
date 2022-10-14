import React from "react";
import Header from "../Header/Header";
import "./Profile.css"

const Profile = ({name="Виталий", email="pochta@yandex.ru"}) => {
  return (
    <section className="profile">
      <Header />
      <h2 className="profile__title">Привет, {name}!</h2>
      <form className="profile__form">
        <div className="profile__input-block">
          <h3 className="profile__name">Имя</h3>
          <input placeholder={name} className="profile__input"></input>
          <span className="profile-name-input-error profile__input-error"></span>
        </div>
        <div className="profile__input-block">
          <h3 className="profile__name">E-mail</h3>
          <input placeholder={email} className="profile__input"></input>
          <span className="profile-name-input-error profile__input-error"></span>
        </div>
        <button className="profile__edit">Редактировать</button>
        <button className="profile__logout">Выйти из аккаунта</button>
      </form>

    </section>
  );
};

export default Profile;
