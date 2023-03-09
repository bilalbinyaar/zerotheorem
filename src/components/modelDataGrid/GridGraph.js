import React, { useMemo } from "react";
import CanvasSplineForcasteCard from "../models/graphs/CanvasSplineForcasteCard";
import "./ModelDataGrid.css";
import TradingViewSplineAreaChart from "../models/graphs/TradingViewSplineAreaChart";
const GridGraph = (props) => {
  const Name = useMemo(() => props.model_name, []);
  return <TradingViewSplineAreaChart key={Name} model_name={Name} />;
};

export default GridGraph;
