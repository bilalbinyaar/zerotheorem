import React, { useState, useEffect } from "react";
import CanvasJSReact from "../canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PerformanceMultiLine() {
  const [timer_for_current, set_timer_for_current_position] = useState(null);
  const [data_for_graph_historical, set_data_for_graph_historical] = useState(
    []
  );
  const [data_for_graph_historical2, set_data_for_graph_historical2] = useState(
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
        fetch(`https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_pnls`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data = [];
            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data.push({
                x: new Date(
                  parseInt(data["response"][i].ledger_timestamp) * 1000
                ),
                y: data["response"][i].pnl_sum,
              });
            }

            if (temp_data.length != 0) {
              set_data_for_graph_historical(temp_data);
              // console.log("Here is the data for current position", temp_data);
            }
          });
      }
      setTimeout(() => {
        fetch(`https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_pnls`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const temp_data = [];
            // console.log(
            //   "Finally btc data -->",
            //   new Date(parseInt(data["response"][0].timestamp) * 1000)
            // );

            for (let i = 0; i < data["response"].length; i++) {
              temp_data.push({
                x: new Date(
                  parseInt(data["response"][i].ledger_timestamp) * 1000
                ),
                y: data["response"][i].pnl_sum,
              });
            }

            if (temp_data.length != 0) {
              set_data_for_graph_historical(temp_data);
              // console.log("Here is stats -->", temp_data);
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
        color: "#16c784",
        axisYType: "primary",
        labelFontSize: 10,
        gridColor: "#43577533",
        tickColor: "#43577533",

        dataPoints: data_for_graph_historical,
      },

      {
        type: "line",
        color: "#ff2e2e",
        axisYType: "secondary",
        labelFontSize: 10,

        dataPoints: data_for_graph_historical2,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PerformanceMultiLine;
