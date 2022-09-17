import React from "react";
import Title from "../Title/Title";
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <div className="about-project">
      <Title title={"О проекте"} />
      <ul className="table">
        <li className="table__cell">
          <h3 className="table__heading">Дипломный проект включал 5 этапов</h3>
          <p className="table__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="table__cell">
          <h3 className="table__heading">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="table__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__scale">
        <li className="about-project__cell">
          <h3 className="about-project__heading about-project__heading_color_green">
            1 неделя
          </h3>
          <p className="about-project__text">Back-end</p>
        </li>
        <li className="about-project__cell">
          <h3 className="about-project__heading about-project__heading_color_grey">4 недели</h3>
          <p className="about-project__text">Front-end</p>
        </li>
      </ul>
    </div>
  );
};

export default AboutProject;