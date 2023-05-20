import React from "react";
import Portfolio from "../components/portfolio/Portfolio";
import PerformanceGraphs from "../components/performanceGraph/PerformanceGraphs";
import PerformanceDataGrid from "../components/performanceGrid/PerformanceDataGrid";
import CurrentPortfolio from "../components/currentPortfolio/CurrentPortfolio";
import HeatmapChart from "../components/models/graphs/HeatmapChart";
import LivePNL from "../components/livepnl/LivePNL";
import PerformanceBarChart from "../graphs/PerformanceBarChart";
import ScatterPlotApexCharts from "../components/models/graphs/ScatterPlotApexCharts";
import PerformanceLineCharts from "../components/performanceLineCharts/PerformanceLineCharts";
const Performance = () => {
  return (
    <React.Fragment>
      <Portfolio />
      <PerformanceGraphs />
      <PerformanceDataGrid />
      <LivePNL />
      <CurrentPortfolio />
      <ScatterPlotApexCharts />
      <PerformanceLineCharts />
      {/* <HeatmapChart model_name={"strategy_1"} /> */}
      {/* <PerformanceBarChart model_name={"live_pnls"} /> */}
    </React.Fragment>
  );
};

export default Performance;
