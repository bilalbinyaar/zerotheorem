import React from "react";
// import DrawDownTable from "./DrawDownTable";
// import DrawDownTableBacktest from "./DrawDownTableBacktest";
import DrawDownTableBacktest from "./DrawDownTableBacktest";
import "./GraphsTable.css";
import PerformanceTable from "./PerformanceTable";
import WinLossTable from "./WinLossTable";
import WinLossTableBacktest from "./WinLossTableBacktest";
import PerformanceTableBacktest from "./PerformanceTableBacktest";
const GraphsTableBacktest = (props) => {
  //console.log("Finally drawdown model name -->", props.model_name);
  const name = props.model_name;
  // console.log("Here is model name -->", name);
  return (
    <div className="graphs-table">
      <div className="current-position">
        <div className="container">
          <div className="current-position-body">
            <h3 className="current-position-heading for-h3-font">
              Performance Metrics
            </h3>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="graph-table-main">
          <DrawDownTableBacktest model_name={name} />
          <WinLossTableBacktest model_name={name} />
          <PerformanceTableBacktest model_name={name} />
        </div>
      </div>
    </div>
  );
};

export default GraphsTableBacktest;
