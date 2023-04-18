import React from "react";
import NegativeColumns from "../graphs/NegativeColumns";
import GradientDonut from "../graphs/GradientDonut";
import "./InDepth.css";
import CanvasDoughnut from "../graphs/CanvasDoughnut";
import CanvasNegativeBar from "../graphs/CanvasNegativeBar";
import IndividualPnlCanvasjs from "../graphs/IndividualPnlCanvasjs";
const DuplicatesForPerformance = (props) => {
  return (
    <div className="in-depth">
      <div className="container">
        <div className="in-depth-charts">
          <div className="in-depth-nc">
            <h3>PNL Sum</h3>
            <div className="for-hr"></div>
            {/* <NegativeColumns model_name={props.model_name} /> */}
            {/* <CanvasNegativeBar model_name={props.model_name} /> */}
            <IndividualPnlCanvasjs model_name={props.model_name} />
          </div>
          <div className="in-depth-gd">
            <h3>Current Portfolio Allocation</h3>
            <div className="for-hr"></div>
            {/* <GradientDonut model_name={props.model_name} /> */}
            <CanvasDoughnut model_name={props.model_name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuplicatesForPerformance;
