import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const HeatMapChart = () => {
  const correlationMatrix = [
    [1, 0.8, 0.2, -0.5, -0.9],
    [0.8, 1, -0.3, 0.1, 0.6],
    [0.2, -0.3, 1, -0.9, -0.1],
    [-0.5, 0.1, -0.9, 1, 0.5],
    [-0.9, 0.6, -0.1, 0.5, 1],
  ];

  const variables = [
    "Strategy_1",
    "Strategy_2",
    "Strategy_3",
    "Strategy_4",
    "Strategy_5",
  ];

  const [correlations, setCorrelations] = useState([]);

  const series = variables.map((variable, index) => ({
    // name: "Strategy",
    name: " " + variable,
    data: correlationMatrix[index],
  }));

  const options = {
    chart: {
      // height: 350,
      type: "heatmap",
      toolbar: {
        show: false, // Hide the chart toolbar
      },
    },
    plotOptions: {
      heatmap: {
        // shadeIntensity: 0.5,
        radius: 0,
        // useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            { from: -1, to: -0.8, name: "Strong Negative", color: "#FF0000" },
            {
              from: -0.8,
              to: -0.6,
              name: "Moderate Negative",
              color: "#FF6600",
            },
            { from: -0.6, to: -0.4, name: "Weak Negative", color: "#FFCC00" },
            { from: -0.4, to: -0.2, name: "Slight Negative", color: "#FFFF00" },
            { from: -0.2, to: 0.2, name: "No Correlation", color: "#FFFFFF" },
            { from: 0.2, to: 0.4, name: "Slight Positive", color: "#00FFFF" },
            { from: 0.4, to: 0.6, name: "Weak Positive", color: "#00CCFF" },
            {
              from: 0.6,
              to: 0.8,
              name: "Moderate Positive",
              color: "#0066FF",
            },
            { from: 0.8, to: 1, name: "Strong Positive", color: "#0000FF" },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    // stroke: {
    //   width: 1,
    // },
    xaxis: {
      categories: variables,
      labels: {
        style: {
          colors: "#000000",
        },
      },
    },
    yaxis: {
      categories: variables,
      opposite: false,
      forceNiceScale: false,
      floating: false,
      labels: {
        // minWidth: 0,
        // maxWidth: 500,
        align: "center",
        style: {
          colors: "#000000",
        },
      },
    },
    title: {
      text: "HeatMap Chart with Color Range and Correlation",
    },
  };

  return (
    <div className="container">
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        // height={350}
      />
    </div>
  );
};

export default HeatMapChart;
