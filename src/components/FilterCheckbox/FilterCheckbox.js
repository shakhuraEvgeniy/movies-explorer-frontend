import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <label className="checkbox">
      <input className="checkbox__input" type="checkbox"></input>
      <div className="checkbox__box"></div>
      <span className="checkbox__title">Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
