import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__down">
        <p className="footer__copyright">&#169; {year}</p>
        <div className="footer__links">
          <Link className="footer__link">Яндекс.Практикум</Link>
          <Link className="footer__link">Github</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
