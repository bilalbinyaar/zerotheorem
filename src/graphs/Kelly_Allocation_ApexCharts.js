import React, { useState, useEffect } from "react";
import CanvasJSReact from "../canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Kelly_Allocation_ApexCharts() {
  const [timer_for_current, set_timer_for_current_position] = useState(null);
  const [data_for_graph_historical, set_data_for_graph_historical] = useState(
    []
  );
  const [data_for_graph_historical2, set_data_for_graph_historical2] = useState(
    []
  );
  const [data_for_graph_historical3, set_data_for_graph_historical3] = useState(
    []
  );
  const [data_for_graph_historical4, set_data_for_graph_historical4] = useState(
    []
  );
  const [data_for_graph_historical5, set_data_for_graph_historical5] = useState(
    []
  );
  const forColor = (total_pnl, id) => {
    try {
      if (total_pnl < 0) {
        document
          .getElementById(`${id}`)
          .setAttribute("style", "color:#FF2E2E !important");
      } else if (total_pnl >= 0) {
        document
          .getElementById(`${id}`)
          .setAttribute("style", "color:#16C784 !important");
      }
    } catch {}
  };
  useEffect(() => {
    try {
      if (timer_for_current == null) {
        fetch(
          `https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/kelly_allocation`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const temp_data_1 = [];
            const temp_data_2 = [];

            const temp_data_3 = [];
            const temp_data_4 = [];

            const temp_data_5 = [];

            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data_1.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_1,
              });
              temp_data_2.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_2,
              });
              temp_data_3.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_3,
              });
              temp_data_4.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_4,
              });
              temp_data_5.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_5,
              });
            }

            if (temp_data_1.length != 0) {
              set_data_for_graph_historical(temp_data_1);
              set_data_for_graph_historical2(temp_data_2);

              set_data_for_graph_historical3(temp_data_3);
              set_data_for_graph_historical4(temp_data_4);

              set_data_for_graph_historical5(temp_data_5);

              // console.log("Here is the data for current position", temp_data);
            }
          });
      }
      setTimeout(() => {
        fetch(
          `https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/kelly_allocation`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const temp_data_1 = [];
            const temp_data_2 = [];

            const temp_data_3 = [];
            const temp_data_4 = [];

            const temp_data_5 = [];

            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data_1.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_1,
              });
              temp_data_2.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_2,
              });
              temp_data_3.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_3,
              });
              temp_data_4.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_4,
              });
              temp_data_5.push({
                x: new Date(parseInt(data["response"][i].datetime) * 1000),
                y: data["response"][i].strategy_5,
              });
            }

            if (temp_data_1.length != 0) {
              set_data_for_graph_historical(temp_data_1);
              set_data_for_graph_historical2(temp_data_2);

              set_data_for_graph_historical3(temp_data_3);
              set_data_for_graph_historical4(temp_data_4);

              set_data_for_graph_historical5(temp_data_5);

              // console.log("Here is the data for current position", temp_data);
            }
          });
        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log("Error occured");
    }
  }, [timer_for_current]);
  const [datapoint1, setDatapoint1] = useState([]);

  const options = {
    theme: "light2",
    height: 300,
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

    data: [
      {
        type: "line",
        color: "#16C784",
        // axisYType: "primary",
        labelFontSize: 10,
        gridColor: "#43577533",
        tickColor: "#43577533",
        showInLegend: true,
        name: "strategy_1",
        dataPoints: data_for_graph_historical,
      },

      {
        type: "line",
        color: "#FF2E2E",
        // axisYType: "secondary",
        labelFontSize: 10,
        showInLegend: true,
        name: "strategy_2",
        dataPoints: data_for_graph_historical2,
      },
      {
        type: "line",
        color: "#F9A52B",
        // axisYType: "secondary",
        labelFontSize: 10,
        showInLegend: true,
        name: "strategy_3",
        dataPoints: data_for_graph_historical3,
      },
      {
        type: "line",
        color: "#4287f5",
        // axisYType: "secondary",
        labelFontSize: 10,
        showInLegend: true,
        name: "strategy_4",
        dataPoints: data_for_graph_historical4,
      },
      {
        type: "line",
        color: "#9B59B6",
        // axisYType: "secondary",
        labelFontSize: 10,
        showInLegend: true,
        name: "strategy_5",
        dataPoints: data_for_graph_historical5,
      },
    ],
  };
  //   ["#16C784", "#FF2E2E", "#F9A52B", "#4287f5", "#9B59B6"];
  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Kelly_Allocation_ApexCharts;
