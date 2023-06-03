import React from "react";
import PerformanceGraphs from "../performanceGraph/PerformanceGraphs";
import PerformanceMultiLine from "../../graphs/PerformanceMultiLine";
import { RiCheckboxBlankFill } from "react-icons/ri";

const PR = () => {
  return (
    <div className="test-dr">
      <h2 className="for-mb-returns">Portfolio Returns</h2>
      {/* <div className="overview-indicators for-performance-legends">
        <div className="indicator">
          <RiCheckboxBlankFill className="indicator-long" />
          <p>PNL Sum</p>
        </div>
        <div className="indicator">
          <RiCheckboxBlankFill className="indicator-smooth" />
          <p>Smooth PNL Sum</p>
        </div>
      </div> */}
      <PerformanceMultiLine model_name={"ZT1_0M24BTC1"} />
    </div>
  );
};

export default PR;
