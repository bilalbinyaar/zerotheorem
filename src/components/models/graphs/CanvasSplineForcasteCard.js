import React, { Component, useState, useEffect } from "react";
import CanvasJSReact from "../../../canvasjs.react";
import { useStateContext } from "../../../ContextProvider";

function CanvasSplineForcasteCard(props) {
  const { negative_canvasjs_graph_cache, Set_negative_canvasjs_graph_cache } =
    useStateContext();
  const [
    forecastSpline_canvasjs_graph_cache,
    Set_forecastSpline_canvasjs_graph_cache,
  ] = useState([]);
  const [cummulative_pnl, set_cum_pnl] = useState([]);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    theme: "light2",
    animationEnabled: true,
  });
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  useEffect(() => {
    if (!forecastSpline_canvasjs_graph_cache[props.model_name]) {
      fetch(`https://zt-rest-api-3hwk7v5hda-uc.a.run.app/${props.model_name}`, {
        method: "get",
      })
        .then((response) => response.json())
        .then(async (data) => {
          var main_series = [];
          var temp_positive_series = [];
          var temp_negative_series = [];
          for (var index = 0; index < data["response"].length; index++) {
            if (index + 1 == data["response"].length) {
              if (temp_positive_series.length != 0) {
                main_series.push({
                  type: "splineArea",
                  color: "#16c784",
                  markerType: "none",
                  fillOpacity: 0.4,
                  dataPoints: temp_positive_series,
                });
              } else {
                main_series.push({
                  type: "splineArea",
                  color: "#ff2e2e",
                  markerType: "none",
                  fillOpacity: 0.4,
                  dataPoints: temp_negative_series,
                });
              }
            } else {
              if (parseInt(data["response"][index].pnl_sum) >= 0) {
                if (temp_negative_series.length != 0) {
                  main_series.push({
                    type: "splineArea",
                    color: "#ff2e2e",
                    markerType: "none",
                    fillOpacity: 0.4,
                    dataPoints: temp_negative_series,
                  });
                  temp_negative_series = [];
                } else {
                  temp_positive_series.push({
                    x: index,
                    y: parseInt(data["response"][index].pnl_sum),
                  });
                }
              } else {
                if (temp_positive_series.length != 0) {
                  main_series.push({
                    type: "splineArea",
                    color: "#16c784",
                    markerType: "none",
                    fillOpacity: 0.4,
                    dataPoints: temp_positive_series,
                  });
                  temp_positive_series = [];
                } else {
                  temp_negative_series.push({
                    x: index,
                    y: parseInt(data["response"][index].pnl_sum),
                  });
                }
              }
            }
          }
          // console.log("Testing data -->", main_series);

          if (main_series.length != 0) {
            set_cum_pnl(main_series);
            Set_forecastSpline_canvasjs_graph_cache({
              [props.model_name]: main_series,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl(forecastSpline_canvasjs_graph_cache[props.model_name]);
    }
  }, []);

  useEffect(() => {
    if (cummulative_pnl.length != 0) {
      // console.log("Datagrid canvas data -->", cummulative_pnl);
      setOptions({
        backgroundColor: "transparent",
        theme: "light2",
        animationEnabled: false,
        data: cummulative_pnl,
        toolTip: {
          enabled: true,
        },
        axisY: {
          gridColor: "#43577533",
          gridThickness: 0,
          // minimum: -20,
          // maximum: 150,
          labelFontColor: "rgb(55, 61, 63)",
          tickColor: "#43577533",
          tickThickness: 0,
          labelFormatter: function () {
            return " ";
          },
        },
        axisX: {
          labelFontColor: "rgb(55, 61, 63)",
          gridThickness: 0,
          tickColor: "#43577533",
          tickThickness: 0,
          lineThickness: 0,
          lineColor: "#43577577",
          labelFormatter: function () {
            return " ";
          },
        },
      });
    }
  }, [cummulative_pnl]);

  return (
    <div className="dataGrid-spline">
      <CanvasJSChart options={options} />
    </div>
  );
}

export default CanvasSplineForcasteCard;
