import React, { useState, useEffect } from "react";
import { SideBar } from "./SideBar.js";
import { renderVizs } from "../d3/d3_utils.js";
import { select } from "d3";

export default function Vizs(props) {
  const [visz, setVisz] = useState([0]);

  useEffect(() => {
    renderVizs(visz, props);

    return () => {
      select("svg").remove();
      select("svg").remove();
      select("svg").remove();
      select(".vizs")
        .append("svg")
        .attr("width", 1100)
        .attr("height", 700)
        .attr("id", "id0");
    };
  }, [visz]);

  return (
    <div className="main">
      <div className="title-block">
        <h1>Visualizations</h1>
      </div>
      <div className="body-container">
        <div className="vizs">
          {visz.map((e, i) => {
            return (
              <>
                <svg id={`id${i}`} width="1000" height="700"></svg>
                <svg id={`pid${i}`} width="1000" height="700"></svg>
                <svg id={`nid${i}`} width="1000" height="700"></svg>
              </>
            );
          })}
        </div>
        <SideBar
          dates={props.dates}
          checkbox={props.checkbox}
          searchInput={props.searchInput}
          handleDates={props.handleDates}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
          handleClick={props.handleClick}
        />
      </div>
    </div>
  );
}
