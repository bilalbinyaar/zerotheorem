import React from "react";
import NegativeColumns from "../graphs/NegativeColumns";
import GradientDonut from "../graphs/GradientDonut";
import "./InDepth.css";
import CanvasDoughnut from "../graphs/CanvasDoughnut";
import CanvasNegativeBar from "../graphs/CanvasNegativeBar";
import IndividualPnlCanvasjs from "../graphs/IndividualPnlCanvasjs";
import PerformancePieChart from "../../../graphs/PerformancePieChart";
import PerformanceMultiLine from "../../../graphs/PerformanceMultiLine";
import PerformanceBarChart from "../../../graphs/PerformanceBarChart";
const DuplicatesForPerformance = (props) => {
  return (
    <div className="in-depth">
        <div className="in-depth-charts">
          <div className="in-depth-nc for-performance-mb">
            <h3>Individual Returns</h3>
            <PerformanceBarChart />
          </div>
          <div className="in-depth-gd for-performance-mb portfolio-allocation-div">
            <h3>Portfolio Allocation</h3>
            <PerformancePieChart />
          </div>
        </div>
    </div>
  );
};

export default DuplicatesForPerformance;
