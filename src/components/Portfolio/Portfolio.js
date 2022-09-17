import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link className="portfolio__link">
            <p className="portfolio__text">Статичный сайт</p>
            <p className="portfolio__pik">↗</p>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link">
            <p className="portfolio__text">Адаптивный сайт</p>
            <p className="portfolio__pik">↗</p>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link">
            <p className="portfolio__text">Одностраничное приложение</p>
            <p className="portfolio__pik">↗</p>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
