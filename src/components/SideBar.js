import React, { useState } from "react";
import DateRange from "./DateRange.js";

export const SideBar = (props) => {
  const [input, setInput] = useState(props.searchInput);

  const onKeyDown = (e) /*= (event: React.KeyboardEvent<HTMLDivElement>): void*/ => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      props.handleSubmit(input)
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="side-bar">
      <div className="widget">
        <h2>Filter:</h2>
        <div className="search-container">
          <form>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              className="search"
              onKeyDown={onKeyDown}
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
          </form>
        </div>
      </div>
      <div className="widget">
        <h2>Watchlist:</h2>
        <form class='watchlist'>
          <input type="checkbox" className="checkbox" checked={props.checkbox} onClick={() => props.handleClick(!props.checkbox)} id="msft-ticker" value="MSFT"  />
          <label for="msft-ticker">MSFT</label>
          <input type="checkbox" id="tsla-ticker" value="TSLA" />
          <label for="tsla-ticker">TSLA</label>
        </form>
      </div>
      <div className="widget">
        <h2>Date Range:</h2>
        <DateRange dates={props.dates} handleDates={props.handleDates} />
      </div>
    </div>
  );
};
