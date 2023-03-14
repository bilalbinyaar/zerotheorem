import React from "react";
// import ModelDetailsGraph from '../../../../assets/modelDetailsGraph.png'
// import SplineGraph from "../../graphs/SplineGraph";
import SplineGraphCanvasjs from "../../graphs/SplineGraphCanvasjs";
import SplineTradeViewCard from "../../graphs/SplineTradeViewCard";
const ModelDetailsRightGraph = (props) => {
  return (
    // <div>
    //     <img src={ModelDetailsGraph} alt='ModelDetailsGraph'/>
    // </div>
    <SplineTradeViewCard model_name={props.model_name} />
  );
};

export default ModelDetailsRightGraph;
