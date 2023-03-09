import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../../canvasjs.stock.react";
import { useStateContext } from "../../../ContextProvider";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const CanvasjsSplineAreaChartWithRangeSelecetor = (props) => {
  const [model_name, set_model_name] = useState(props.model_name);
  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  const [dataPoints, setDataPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    theme: "light2",
    animationEnabled: false,
    rangeSelector: {
      enabled: false, //change it to true
    },
    navigator: {
      axisX: {
        labelFontSize: 10,
      },
      slider: {
        handleColor: "#fddd4e",
        handleBorderThickness: 1,
        handleBorderColor: "#fddd4e",
      },
    },
  });
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const {
    drawdown_negative_canvasjs_graph_cache,
    Set_drawdown_negative_canvasjs_graph_cache,
  } = useStateContext();
  const [cummulative_pnl, set_cum_pnl] = useState([]);

  useEffect(() => {
    if (!drawdown_negative_canvasjs_graph_cache[props.model_name]) {
      // console.log("I received model name for graph -->", props.model_name);

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
                    x: new Date(
                      parseInt(data["response"][index].ledger_timestamp) * 1000
                    ),
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
                    x: new Date(
                      parseInt(data["response"][index].ledger_timestamp) * 1000
                    ),
                    y: parseInt(data["response"][index].pnl_sum),
                  });
                }
              }
            }
          }
          // console.log("Testing data -->", main_series);

          if (main_series.length != 0) {
            let len = data["response"].length - 1;
            let start_time = parseInt(data["response"][0].ledger_timestamp);
            let end_time = parseInt(data["response"][len].ledger_timestamp);
            let avg = (end_time - start_time) / 2;
            let result = avg + start_time;
            console.log("Values are --->", start_time, end_time, avg, result);
            // console.log("Result -->", len, start_time, avg, result);
            setStart(new Date(result) * 1000);
            setEnd(
              new Date(parseInt(data["response"][len].ledger_timestamp)) * 1000
            );
            set_cum_pnl(main_series);
            Set_drawdown_negative_canvasjs_graph_cache({
              [props.model_name]: main_series,
            });
          }
          // console.log("Cum pnl -->", cum_pnl);
        })
        .catch((err) => console.log(err));
    } else {
      set_cum_pnl(drawdown_negative_canvasjs_graph_cache[props.model_name]);

      // console.log(
      //   "I am using cached value for straight spline graph -->",
      //   straight_spline_graph_cache[props.model_name]
      // );
    }
  }, [model_name]);

  useEffect(() => {
    if (cummulative_pnl.length != 0) {
      // console.log("Negative graph -->", cummulative_pnl);
      setDataPoints(cummulative_pnl);
      // console.log("I am here with values -->", start, end);
      setOptions({
        // title: {
        //   text: "React StockChart with Spline Area Chart",
        // },
        theme: "light2",
        backgroundColor: "transparent",

        // subtitles: [
        //   {
        //     text: "BTC/USD",
        //   },
        // ],
        charts: [
          {
            // rangeSelector: {
            //   enabled: false, //change it to true
            // },
            zoomEnabled: true, // Enable zoom

            axisX: {
              //   lineColor: "#43577533",
              labelFontSize: 10,
              gridColor: "#43577533",
              tickColor: "#43577533",
              lineThickness: 1,
              tickLength: 0,
              crosshair: {
                enabled: false,
                snapToDataPoint: false,
                valueFormatString: "MMM DD YYYY",
              },
            },
            rangeSelector: {
              enabled: false, //change it to true
            },
            axisY: {
              //   title: "Bitcoin Price",
              // prefix: "$",
              gridColor: "#43577533",
              tickColor: "#43577533",
              labelFontSize: 10,
              crosshair: {
                enabled: false,

                snapToDataPoint: false,
                valueFormatString: "$#,###.##",
              },
            },
            toolTip: {
              shared: true,
              fontSize: 10,

              contentFormatter: (e) => {
                const date = CanvasJSReact.CanvasJS.formatDate(
                  e.entries[0].dataPoint.x,
                  "DD/MM/YYYY HH:mm:ss"
                );
                let content = `<strong>${date}</strong><br/><br/>`;

                e.entries.forEach((entry) => {
                  content += `<span style="color: ${entry.dataPoint.color};">PNL: </span>${entry.dataPoint.y}<br/>`;
                });

                return content;
              },
            },
            data: cummulative_pnl,
          },
        ],
        navigator: {
          axisX: {
            labelFontSize: 10,
          },
          data: cummulative_pnl,
          slider: {
            minimum: start,
            maximum: end,
            handleColor: "#000000",
            handleBorderThickness: 1,
            handleBorderColor: "#fddd4e",
          },
        },
      });
    }
    setIsLoaded(true);
  }, [cummulative_pnl]);

  //   useEffect(() => {
  //     fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const dps = [];
  //         for (let i = 0; i < data.length; i++) {
  //           if (i % 2 === 0) {
  //             dps.push({
  //               x: new Date(data[i].date),
  //               y: 1 * Number(data[i].close),
  //             });
  //           } else {
  //             dps.push({
  //               x: new Date(data[i].date),
  //               y: -1 * Number(data[i].close),
  //             });
  //           }
  //         }
  //         setDataPoints(dps);
  //         setIsLoaded(true);
  //       });
  //   }, []);

  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto",
  };

  return (
    // <div>
    //   {isLoaded && (
    //     <CanvasJSStockChart containerProps={containerProps} options={options} />
    //   )}
    //   </div>
    <div className="canvas-main-div">
      <div className="container">
        <CanvasJSStockChart containerProps={containerProps} options={options} />
      </div>
    </div>
  );
};

export default CanvasjsSplineAreaChartWithRangeSelecetor;
