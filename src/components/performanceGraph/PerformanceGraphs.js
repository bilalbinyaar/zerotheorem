import React from "react";
import "./PerformanceGraphs.css";
import PerformanceMultiLine from "../../graphs/PerformanceMultiLine";
import PerformanceBarChart from "../../graphs/PerformanceBarChart";
import IndividualPnlCanvasjs from "../models/graphs/IndividualPnlCanvasjs";
import ModelDetails from "../models/modelsDetails/ModelDetails";
const PerformanceGraphs = () => {
  return (
    <div className="performance-graphs">
      <div className="container">
        <IndividualPnlCanvasjs model_name={"ZT1_0M24BTC1"} />
        <div className="performance-graphs-wrapper">
          {/* <div className='performance-graph-div'>
                    <PerformanceMultiLine />
                </div> */}
          {/* <div className="performance-graph-div">
            <PerformanceBarChart />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraphs;
