import React, { useEffect } from "react";
import { SideBar } from "./SideBar.js";
import { renderVizs } from "../d3/d3_utils.js";
import { select } from "d3";

export default function Visz(props) {

  useEffect(() => {
    renderVizs(props);

    return () => {
      select("svg").remove();
      select("svg").remove();
      select("svg").remove();
      select(".visz")
        .append("svg")
        .attr("width", 1100)
        .attr("height", 700)
        .attr("id", "id0");
      select(".visz")
        .append("svg")
        .attr("width", 1100)
        .attr("height", 700)
        .attr("id", "pid0");
      select(".visz")
        .append("svg")
        .attr("width", 1100)
        .attr("height", 700)
        .attr("id", "nid0");
    };
  }, [props]);

  return (
    <main>
      <div className="main">
        <div className="title-block">
          <h1>Visualizations</h1>
        </div>
        <div className="body-container">
          <div className="visz">
            <>
              <svg id={`id${0}`} width="1000" height="700"></svg>
              <svg id={`pid${0}`} width="1000" height="700"></svg>
              <svg id={`nid${0}`} width="1000" height="700"></svg>
            </>
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
    </main>
  );
}
