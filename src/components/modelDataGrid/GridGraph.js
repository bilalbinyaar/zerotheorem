import React, { useMemo } from "react";
import CanvasSplineForcasteCard from "../models/graphs/CanvasSplineForcasteCard";
import "./ModelDataGrid.css";
import TradingViewSplineArea from "../models/graphs/TvSplineAreaChart";
// import TradingViewSplineAreaChart from "../models/graphs/TvSplineAreaChart";
import TradingViewTopPerformer from "../models/graphs/TvSplineAreaChart";
const GridGraph = (props) => {
  const Name = useMemo(() => props.model_name, []);
  return <TradingViewSplineArea key={Name} model_name={Name} />;
};

export default GridGraph;
