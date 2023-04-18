import React from "react";
import CanvasJSReact from "../canvasjs.react";



const CanvasJSChart = CanvasJSReact.CanvasJSChart;


function PerformanceMultiLine() {
  
  const options = {
    theme: "light2",
    backgroundColor: "transparent",


    axisX: {
      includeZero: false,
      labelFontSize: 10,
      gridColor: "#43577533",
      tickColor: "#43577533",
      lineColor: "#43577533",   
    },


    axisY: {
      includeZero: false,
      labelFontSize: 10,
      gridColor: "#43577533",
      tickColor: "#43577533",

    },

    axisY2: {
      includeZero: true,
      gridColor: "#B5E5F5",
      tickColor: "#B5E5F5",
      labelFontSize: 10,
    },

    data: [{
      type: "line",
      color: "#16c784",
      axisYType: "primary",
      labelFontSize: 10,
      gridColor: "#43577533",
      tickColor: "#43577533",

      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 95 },
        { x: 60, y: 68 },
        { x: 70, y: 28 },
        { x: 80, y: 34 },
        { x: 90, y: 14 },
        { x: 100, y: 45 }
      ]
    },
    
    {
      type: "line",
      color: "#ff2e2e",
      axisYType: "secondary",
      labelFontSize: 10,

      dataPoints: [
        { x: 10, y: 101 },
        { x: 20, y: 85 },
        { x: 30, y: 80 },
        { x: 40, y: 95 },
        { x: 50, y: 125 },
        { x: 60, y: 98 },
        { x: 70, y: 58 },
        { x: 80, y: 64 },
        { x: 90, y: 44 },
        { x: 100, y: 75 }
      ]
    }
  ]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PerformanceMultiLine;
