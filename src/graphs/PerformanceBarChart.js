import React from "react";
import CanvasJSReact from "../canvasjs.react";



const CanvasJSChart = CanvasJSReact.CanvasJSChart;


function PerformanceBarChart() {
  
  const options = {
    theme: "light2",
    backgroundColor: "transparent",
    dataPointWidth: 20,


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

    // data: [{
		// 		type: "column", //change type to bar, line, area, pie, etc
		// 		//indexLabel: "{y}", //Shows y value on all Data Points
		// 		indexLabelFontColor: "#5A5757",
		// 		indexLabelPlacement: "outside",
		// 		dataPoints: [
		// 			{ x: 10, y: 71 },
		// 			{ x: 20, y: 55 },
		// 			{ x: 30, y: 50 },
		// 			{ x: 40, y: 65 },
		// 			{ x: 50, y: 71 },
		// 			{ x: 60, y: 68 },
		// 			{ x: 70, y: 38 },
		// 			{ x: 80, y: 92, indexLabel: "Highest" },
		// 			{ x: 90, y: 54 },
		// 			{ x: 100, y: 60 },
		// 			{ x: 110, y: 21 },
		// 			{ x: 120, y: 49 },
		// 			{ x: 130, y: 36 }
		// 		]
		// 	}]


    data: [{
				type: "waterfall",
				yValueFormatString: "$#,##0,.00K",
        risingColor: "#16c784",
        fallingColor: "#ff2e2e",
				indexLabelOrientation: "vertical",
				dataPoints: [
					{ label: "Initial", y: 7655 },
					{ label: "Jan", y: 5312 },
					{ label: "Feb", y: 4065 },
					{ label: "Mar", y: -2564 },
					{ label: "Apr", y: 7004},
					{ label: "May", y: 5324 },
					{ label: "Jun", y: -11543 },
					{ label: "July", y: 4008 },
					{ label: "Aug", y: 5673 },
					{ label: "Sep", y: -6997 },
					{ label: "Oct", y: 6654 },
					{ label: "Nov", y: -10943 },
					{ label: "Dec", y: 4324 },
					{ label: "Final", isCumulativeSum: true }
				]
			}]
		
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PerformanceBarChart;

