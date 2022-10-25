import React from "react";
import Title from "../Title/Title";
import "./Techs.css";

const Techs = ({ title }) => {
  return (
    <section className="techs">
      <Title title={"Технологии"} />
      <h2 className="techs__title">7 технологий</h2>
      <p className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__table">
        <li className="techs__items">HTML</li>
        <li className="techs__items">CSS</li>
        <li className="techs__items">JS</li>
        <li className="techs__items">React</li>
        <li className="techs__items">Git</li>
        <li className="techs__items">Express.js</li>
        <li className="techs__items">mongoDB</li>
      </ul>
    </section>
  );
};

export default Techs;
