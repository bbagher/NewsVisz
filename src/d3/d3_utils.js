import { select } from "d3";
import { lolliPopRenderSVG, lineChartRenderSVG } from "./d3_charts.js";

export const renderVizs = (props) => {
  const svg = select(`#id${0}`);
  const svg2 = select(`#pid${0}`);
  const svg3 = select(`#nid${0}`);
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  lineChartRenderSVG(props.sentimentScore, svg, width, height);

  lolliPopRenderSVG(
    "Top Positive Word Frequency",
    props.positiveCommonWords,
    svg2,
    width,
    height
  );
  lolliPopRenderSVG(
    "Top Negative Word Frequency",
    props.negativeCommonWords,
    svg3,
    width,
    height
  );
};
