import React, { useState, useEffect, useContext } from "react";
import Example from "./DateRange.js";



export const SideBar = (props) => {
  const [input, setInput] = useState(props.inputValues);
  const [checkbox, setCheckbox] = useState(props.checkbox);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (checkbox)
      document
        .getElementsByClassName("checkbox")[0]
        .setAttribute("checked", "true");
  }, [checkbox]);

  return (
    <div className="side-bar">
      <div className="widget">
        <h2>Filter:</h2>
        <div className="search-container">
          <ul>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              className="search"
              value={input}
              onChange={handleChange}
            />
            <button
              type="submit"
              onClick={(e) => {
                props.handleSubmit([e, input]);
                e.preventDefault();
              }}
            >
              <i className="fa fa-search"></i>
            </button>
          </ul>
        </div>
      </div>
      <div className="widget">
        <h2>Watchlist:</h2>
        <ul>
          <label>
            <input
              className="checkbox"
              type="checkbox"
              onClick={(e) => {
                e.preventDefault()
                props.handleClick(checkbox ? false : true);

              }}
            />
          </label>
          <li>MSFT</li>
          <input id="tesla-checkbox" type="checkbox" />
          <li>TSLA</li>
        </ul>
      </div>
      <div className="widget">
        <h2>Date Range:</h2>
        <Example dates={props.dates} handleDates={props.handleDates} />
      </div>
    </div>
  );
};
