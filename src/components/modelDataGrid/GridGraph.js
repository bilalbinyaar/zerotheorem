import React, { useMemo } from "react";
import CanvasSplineForcasteCard from "../models/graphs/CanvasSplineForcasteCard";
import "./ModelDataGrid.css";

const GridGraph = (props) => {
  const Name = useMemo(() => props.model_name, []);
  return <CanvasSplineForcasteCard key={Name} model_name={Name} />;
};

export default GridGraph;
