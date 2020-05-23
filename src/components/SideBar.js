import React, { useState } from "react";
import DateRange from "./DateRange.js";

export const SideBar = (props) => {
  const [input, setInput] = useState(props.searchInput);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

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
                props.handleSubmit(input);
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
              checked={props.checkbox}
              onClick={() => {
                props.handleClick(!props.checkbox);
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
        <DateRange dates={props.dates} handleDates={props.handleDates} />
      </div>
    </div>
  );
};
