import { select } from "d3";
import { lolliPopRenderSVG, lineChartRenderSVG } from "./d3_charts.js";

export const renderVizs = (visz, props) => {
  for (let i = 0; i < visz.length; i += 1) {
    const svg = select(`#id${i}`);
    console.log("this is svg", svg._groups[0][0]);
    if (svg._groups[0][0]) {
      const svg2 = select(`#pid${i}`);
      const svg3 = select(`#nid${i}`);
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
    }
  }
};
