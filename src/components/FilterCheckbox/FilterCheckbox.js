import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = ({ onChange, checked }) => {
  return (
    <label className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        onChange={onChange}
        checked={checked}
      ></input>
      <div className="checkbox__box"></div>
      <span className="checkbox__title">Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
