import React from "react";
import "./PerformanceGraphs.css";
import { RiCheckboxBlankFill } from "react-icons/ri";
import PerformanceMultiLine from "../../graphs/PerformanceMultiLine";
import PerformanceBarChart from "../../graphs/PerformanceBarChart";
import IndividualPnlCanvasjs from "../models/graphs/IndividualPnlCanvasjs";
import PolarAreaChartApexCharts from "../models/graphs/PolarAreaChartApexCharts";
const PerformanceGraphs = () => {
  return (
    <div className="performance-graphs">
      <div className="container">
        <div className="performance-graphs-main">
          <h2>Portfolio Returns</h2>

          

          <div className="overview-indicators for-performance-legends">
            <div className="indicator">
              <RiCheckboxBlankFill className="indicator-long" />
              <p>PNL Sum</p>
            </div>
            {/* <div className="indicator">
                <RiCheckboxBlankFill className="indicator-short" />
                <p>Alpha</p>
              </div> */}
          </div>
          <PerformanceMultiLine model_name={"ZT1_0M24BTC1"} />
          {/* <IndividualPnlCanvasjs model_name={"ZT1_0M24BTC1"} /> */}
        </div>

        {/* <h2 className="for-mb-returns">Daily Returns</h2>
        <PerformanceBarChart model_name={"live_pnls"} /> */}
      </div>
    </div>
  );
};

export default PerformanceGraphs;
