import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "../canvasjs.stock.react";
import { useStateContext } from "../ContextProvider";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const PerformanceBarChart = () => {
    const data = [
        { label: "A", y: 10 },
        { label: "B", y: -5 },
        { label: "C", y: 15 },
        { label: "D", y: -20 },
        { label: "E", y: 5 },
    ];
  const options = {
  axisY: {
    includeZero: false,
    minimum: -30,
    maximum: 30,
    interval: 10,
    labelFormatter: function (e) {
      return Math.abs(e.value);
    },
  },
  data: [
    {
      type: "bar",
      dataPoints: data,
    },
  ],
};

  return (
    <div>
        <CanvasJSStockChart options={options} />
    </div>
  );
};

export default PerformanceBarChart;
