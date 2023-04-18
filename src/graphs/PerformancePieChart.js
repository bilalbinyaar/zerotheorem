

import React from "react";
import CanvasJSReact from "../canvasjs.react";



const CanvasJSChart = CanvasJSReact.CanvasJSChart;


function PerformancePieChart() {
  
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
				type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: [
					{ y: 20, label: "Airfare" },
					{ y: 24, label: "Food & Drinks" },
					{ y: 20, label: "Accomodation" },
					{ y: 14, label: "Transportation" },
					{ y: 12, label: "Activities" },
					{ y: 10, label: "Misc" }	
				]
			}]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PerformancePieChart;
