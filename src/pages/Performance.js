import React from "react";
import Portfolio from "../components/portfolio/Portfolio";
import PerformanceGraphs from "../components/performanceGraph/PerformanceGraphs";
import PerformanceDataGrid from "../components/performanceGrid/PerformanceDataGrid";
import CurrentPortfolio from "../components/currentPortfolio/CurrentPortfolio";
import LivePNL from "../components/livepnl/LivePNL";

const Performance = () => {
  return (
    <React.Fragment>
      <Portfolio />
      <PerformanceGraphs />
      <PerformanceDataGrid />
      <LivePNL />
      <CurrentPortfolio />
    </React.Fragment>
  );
};

export default Performance;
