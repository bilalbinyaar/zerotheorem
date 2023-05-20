import React from "react";
import "../models/inDepth/InDepth.css";


import { useStateContext } from "../../ContextProvider.js";
import PerformanceMultiLine from "../../graphs/PerformanceMultiLine";

const DuplicatesForPerformanceLineCharts = (props) => {
  const { authCheckLoginInvestor } = useStateContext();
  return (
    <div className="in-depth">
      <div className="in-depth-charts">
        <div className="in-depth-nc for-performance-mb kelly-line-charts">
          <h2>Kelly Optimal Portfolio Allocation</h2>
          <PerformanceMultiLine model_name={"ZT1_0M24BTC1"} />
          {/* <PerformanceMultiLine model_name={"ZT1_0M24BTC1"} />  */}
        </div>
        <div className="in-depth-gd for-performance-mb kelly-line-charts">
          <h2>Kelly Optimal Growth Rate</h2>
            <PerformanceMultiLine model_name={"ZT1_0M24BTC1"} />
        </div>
      </div>
    </div>
  );
};

export default DuplicatesForPerformanceLineCharts;
