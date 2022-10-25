import React from "react";
import Title from "../Title/Title";
import "./AboutMe.css";
import PhotoPath from "../../images/Photo.jpeg";
import Portfolio from "../Portfolio/Portfolio";

const AboutMe = ({ title }) => {
  return (
    <section className="about-me">
      <Title title={"Студент"} />
      <div className="about-me__information">
        <h2 className="about-me__name">Евгений</h2>
        <img className="about-me__image" src={PhotoPath} alt="Фото" />
        <h3 className="about-me__profession">Web-разработчик, 37 лет</h3>
        <p className="about-me__text">
          Я родился в поселке Балахта Красноярского края. Закончил СФУ по
          специальности "Системы автоматизированного проектирования в
          машиностроении". Женат, 2 детей. В свободное время люблю гулять,
          заниматься электроникой, смотреть фильмы. В 2021 году прошел обучение
          по программе инженер по тестированию, перешел работать в Wildberries и
          переехал жить в Москву. После прохождения курса по web-разработке
          планирую перейти в разработчики
        </p>
        <a
          className="about-me__link"
          href="https://github.com/shakhuraEvgeniy"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
      <Portfolio />
    </section>
  );
};

export default AboutMe;
