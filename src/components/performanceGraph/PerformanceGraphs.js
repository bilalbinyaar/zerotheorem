import React from "react";
import "./PerformanceGraphs.css";
import PerformanceMultiLine from "../../graphs/PerformanceMultiLine";
import PerformanceBarChart from "../../graphs/PerformanceBarChart";
import IndividualPnlCanvasjs from "../models/graphs/IndividualPnlCanvasjs";

const PerformanceGraphs = () => {
  return (
    <div className="performance-graphs">
      <div className="container">
        <div className="performance-graphs-main">
            

            <PerformanceMultiLine model_name={"ZT1_0M24BTC1"}/>
            <IndividualPnlCanvasjs model_name={"ZT1_0M24BTC1"} />

        </div>
      </div>
    </div>
  );
};

export default PerformanceGraphs;
