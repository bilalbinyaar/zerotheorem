import React from "react";
// import ModelDetailsGraph from '../../../../assets/modelDetailsGraph.png'
// import SplineGraph from "../../graphs/SplineGraph";
import SplineGraphCanvasjs from "../../graphs/SplineGraphCanvasjs";
const ModelDetailsRightGraph = (props) => {
  return (
    // <div>
    //     <img src={ModelDetailsGraph} alt='ModelDetailsGraph'/>
    // </div>
    <SplineGraphCanvasjs model_name={props.model_name} />
  );
};

export default ModelDetailsRightGraph;
