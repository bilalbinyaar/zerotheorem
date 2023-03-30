import React from "react";
import NegativeColumns from "../graphs/NegativeColumns";
import GradientDonut from "../graphs/GradientDonut";
import "./InDepth.css";
import CanvasDoughnut from "../graphs/CanvasDoughnut";
import CanvasNegativeBar from "../graphs/CanvasNegativeBar";
import IndividualPnlCanvasjs from "../graphs/IndividualPnlCanvasjs";
const inDepthBacktest = (props) => {
  return (
    <div className="in-depth">
      <div className="container">
        <div className="in-depth-head">
          <h2>In-depth Analysis and Details</h2>
        </div>
        <div className="in-depth-charts">
          <div className="in-depth-nc">
            <h3>Individual PNL</h3>
            <div className="for-hr"></div>
            {/* <NegativeColumns model_name={props.model_name} /> */}
            {/* <CanvasNegativeBar model_name={props.model_name} /> */}
            <IndividualPnlCanvasjs model_name={props.model_name} />
          </div>
          <div className="in-depth-gd">
            <h3>Win/Loss</h3>
            <div className="for-hr"></div>
            {/* <GradientDonut model_name={props.model_name} /> */}
            {/* <CanvasDoughnut model_name={props.model_name} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default inDepthBacktest;
