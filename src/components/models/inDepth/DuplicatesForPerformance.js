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
import { useStateContext } from "../../../ContextProvider";
import HeatMapChart from "../graphs/HeatmapChart";
import PolarAreaChartApexCharts from "../graphs/PolarAreaChartApexCharts";
const DuplicatesForPerformance = (props) => {
  const { authCheckLoginInvestor } = useStateContext();
  return (
    <div className="in-depth">
      <div className="in-depth-charts">
        <div className="in-depth-nc for-performance-mb for-performance-nc">
          {/* {authCheckLoginInvestor ? (
            // <h3>Daily Returns</h3>
            null
          ) : (
            <h3>Individual Returns</h3>
          )} */}

          {/* <PerformanceBarChart model_name={"live_pnls"} /> */}
          <h3>Correlation Plot</h3>
          <HeatMapChart model_name={"strategy_1"} />
        </div>
        <div className="in-depth-gd for-performance-mb portfolio-allocation-div">
          <h3>Portfolio Allocation</h3>
          <PolarAreaChartApexCharts />
          {/* <PerformancePieChart /> */}
          {/* <GradientDonut model_name={"collection"} /> */}
        </div>
      </div>
    </div>
  );
};

export default DuplicatesForPerformance;
