import React, { useState, useEffect, memo, useRef } from "react";
import CanvasJSReact from "../../../canvasjs.stock.react";
import { useStateContext } from "../../../ContextProvider";

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

function CandleGraphCanvasjs(props) {
  const [model_name, set_model_name] = useState(null);
  console.log("I am here with values -->", props.model_name, model_name);

  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  const chartRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const [startX, setStartX] = useState(null);

  const handlePinchStart = (event) => {
    if (event.touches.length === 2) {
      setIsZooming(true);
      setStartX(event.touches[0].clientX);
    }
  };

  const handlePinchMove = (event) => {
    if (isZooming && event.touches.length === 2) {
      const currentX = event.touches[0].clientX;
      const delta = currentX - startX;

      if (delta > 0) {
        chartRef.current.zoomIn();
      } else if (delta < 0) {
        chartRef.current.zoomOut();
      }

      setStartX(currentX);
    }
  };

  const handlePinchEnd = () => {
    setIsZooming(false);
    setStartX(null);
  };

  const [dataPoints1, setDataPoints1] = useState([]);
  const [dataPoints2, setDataPoints2] = useState([]);
  const [dataPoints3, setDataPoints3] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [start_date, set_start_date] = useState(null);
  const [entry_price, set_entry_price] = useState(null);
  const [current_price, set_current_price] = useState(null);

  const [strategies, setStrategies] = useState(null);
  const { strategies_cache, Set_strategies_cache } = useStateContext();
  useEffect(() => {
    if (Object.keys(strategies_cache).length == 0) {
      fetch("https://zt-rest-api-3hwk7v5hda-uc.a.run.app/get_strategies", {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data["response"].length);
          var data_for_strategies = {};
          var model_names = [];
          var coin_names = [];
          var unique_coins = {};
          var index = 0;
          for (var i = 0; i < data["response"].length; i++) {
            // console.log(data["response"][i].strategy_name);
            data_for_strategies[data["response"][i].strategy_name] = {
              current_position: data["response"][i].current_position,
              time_horizon: data["response"][i].time_horizon,
              currency: data["response"][i].currency,
              date_started: data["response"][i].date_started,
              entry_price: data["response"][i].entry_price,
              forecast_time: new Date(
                parseInt(data["response"][i].forecast_time) * 1000
              )
                .toISOString()
                .slice(0, 16),
              next_forecast: data["response"][i].next_forecast,
              current_price: data["response"][i].current_price,
              strategy_name: data["response"][i].strategy_name,
              current_pnl: data["response"][i].current_pnl,
              position_start_time: data["response"][i].position_start_time,
            };
            index++;
          }
          if (JSON.stringify(data_for_strategies) !== "{}") {
            setStrategies(data_for_strategies);
            //console.log("Strategies final -->", data_for_strategies);
            Set_strategies_cache({ strategies: data_for_strategies });
          }
        })
        .catch((err) => console.log(err));
    } else {
      // console.log(
      //   "I am using cached value of strategies -->",
      //   strategies_cache
      // );
      setStrategies(strategies_cache["strategies"]);
    }
  }, [model_name]);

  const containerProps = {
    width: "100%",
    height: "550px",
    margin: "auto",
  };
  useEffect(() => {
    if (strategies == null) {
      return;
    } else {
      // console.log("Here is it ", strategies[props.model_name]);
      fetch(
        `https://zt-rest-api-3hwk7v5hda-uc.a.run.app/get_btc_minute_data/${parseInt(
          strategies[props.model_name].position_start_time
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          const dps1 = [];
          const dps2 = [];
          const dps3 = [];
          console.log(
            "Finally btc data -->",
            new Date(parseInt(data["response"][0].timestamp) * 1000)
          );

          for (let i = 0; i < data["response"].length; i++) {
            dps1.push({
              x: new Date(parseInt(data["response"][i].timestamp) * 1000),
              y: [
                Number(data["response"][i].open),
                Number(data["response"][i].high),
                Number(data["response"][i].low),
                Number(data["response"][i].close),
              ],
              color:
                data["response"][i].open < data["response"][i].close
                  ? "#16C784"
                  : "#FF2E2E",
            });
            dps2.push({
              x: new Date(parseInt(data["response"][i].timestamp) * 1000),
              y: Number(data["response"][i].volume),
              color:
                data["response"][i].open < data["response"][i].close
                  ? "#16C784"
                  : "#FF2E2E",
            });
            dps3.push({
              x: new Date(parseInt(data["response"][i].timestamp) * 1000),
              y: Number(data["response"][i].close),
            });
          }
          setDataPoints1(dps1);
          setDataPoints2(dps2);
          setDataPoints3(dps3);
          setIsLoaded(true);
          // console.log("Console values -->", dps1, dps2, dps3);
          let start_time = parseInt(
            strategies[props.model_name].position_start_time
          );
          let end_time = parseInt(
            data["response"][data["response"].length - 1].timestamp
          );
          let avg = (end_time - start_time) / 2;
          let result = avg + start_time;
          // console.log("Result -->", end_time, start_time, result, result2);
          set_start_date(result);
          setStart(parseInt(strategies[props.model_name].position_start_time));
          setEnd(
            parseInt(data["response"][data["response"].length - 1].timestamp)
          );
          set_entry_price(parseInt(strategies[props.model_name].entry_price));
          set_current_price(
            parseInt(strategies[props.model_name].current_price)
          );
        });
    }
  }, [strategies]);
  const options = {
    theme: "light2",
    backgroundColor: "transparent",
    rangeSelector: {
      enabled: false, //change it to true
    },
    charts: [
      {
        rangeSelector: {
          enabled: false, //change it to true
        },
        height: null,
        width: null,
        responsive: true,
        zoomEnabled: true, // Enable zoom

        axisX: {
          gridColor: "#43577533",
          tickColor: "#43577533",
          labelFontSize: 10,
          lineThickness: 1,
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e) {
              return "";
            },
          },
        },
        axisY: {
          // title: "Litecoin Price",
          prefix: "$",
          tickLength: 0,
          labelFontSize: 10,
          gridColor: "#43577533",
          tickColor: "#43577533",
          // labelFormatter: function (e) {
          //   return "";
          // },
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
              // console.log("Datapoint tooltip -->", entry.dataPoint.y[0]);
              if (entry.dataPoint.y[0]) {
                const close = entry.dataPoint.y[3];
                let color = "#ff2e2e";
                if (close > entry.dataPoint.y[0]) {
                  color = "#16c784"; // green for long position
                } else if (close < entry.dataPoint.y[0]) {
                  color = "#ff2e2e"; // red for short position
                }
                content += `<span style="color: ${color};">Open</span> :  $${entry.dataPoint.y[0]}<br/>`;
                content += `<span style="color: ${color};">High</span> :  $${entry.dataPoint.y[1]}<br/>`;
                content += `<span style="color: ${color};">Low</span> :  $${entry.dataPoint.y[2]}<br/>`;
                content += `<span style="color: ${color};">Close</span> :   $${entry.dataPoint.y[3]}</span><br/>`;
              }
            });

            return content;
          },
        },

        data: [
          {
            name: "Price (in USD)",
            yValueFormatString: "$#,###.##",
            // axisYType: "secondary",
            type: "candlestick",
            risingColor: "#16C784",
            fallingColor: "#FF2E2E",
            dataPoints: dataPoints1,
          },

          {
            type: "line",
            color: "purple",
            lineThickness: 1.5,

            lineDashType: "dash",

            dataPoints: [
              {
                x: new Date(start * 1000),
                y: entry_price,
              },
              {
                x: new Date(end * 1000),
                y: entry_price,
              },
            ],
          },
          {
            type: "line",
            color: "#FFAD72",
            lineThickness: 1.5,
            lineDashType: "dash",

            label: "Current price",

            dataPoints: [
              {
                x: new Date(start * 1000),
                y: current_price,
              },
              {
                x: new Date(end * 1000),
                y: current_price,
              },
            ],
          },
        ],
      },
      {
        height: 100,
        axisX: {
          gridColor: "#43577533",
          tickColor: "#43577533",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        axisY: {
          gridColor: "#43577533",
          tickColor: "#43577533",
          // title: "Volume",
          // prefix: "$",
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
        },
        toolTip: {
          fontSize: 10,
          shared: true,
          contentFormatter: (e) => {
            const date = CanvasJSReact.CanvasJS.formatDate(
              e.entries[0].dataPoint.x,
              "DD/MM/YYYY HH:mm:ss"
            );
            let content = `<strong>${date}</strong><br/><br/>`;

            e.entries.forEach((entry) => {
              content += `<span style="color: ${entry.dataPoint.color};">Volume</span> :  $${entry.dataPoint.y}<br/>`;
            });

            return content;
          },
        },
        data: [
          {
            name: "Volume",
            yValueFormatString: "$#,###.##",
            type: "column",
            dataPoints: dataPoints2,
          },
        ],
      },
    ],
    navigator: {
      axisX: {
        labelFontSize: 10,
      },

      data: [
        {
          color: "#16c784",
          dataPoints: dataPoints3,
        },
      ],
      slider: {
        minimum: new Date(start_date * 1000),
        maximum: new Date(end * 1000),
        handleColor: "#fddd4e",
        handleBorderThickness: 1,
        handleBorderColor: "#fddd4e",
      },
    },
  };
  return (
    <div>
      {isLoaded ? (
        <div className="current-position">
          <div className="container">
            <h2 className="current-position-heading">Current Position</h2>

            <div className="current-position-body">
              <div className="current-position-body-spans">
                <div className="current-position-spans no-padding">
                  <span>Open : </span>
                  <span className="">
                    {Object.values(dataPoints1) ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints1)[
                              Object.keys(dataPoints1).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints1)[
                            Object.keys(dataPoints1).length - 1
                          ].y[0]
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div>
                <div className="current-position-spans">
                  <span>High : </span>
                  <span className="">
                    {Object.values(dataPoints1) ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints1)[
                              Object.keys(dataPoints1).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints1)[
                            Object.keys(dataPoints1).length - 1
                          ].y[1]
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div>
                <div className="current-position-spans">
                  <span>Low : </span>
                  <span className="">
                    {Object.values(dataPoints1) ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints1)[
                              Object.keys(dataPoints1).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints1)[
                            Object.keys(dataPoints1).length - 1
                          ].y[2]
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div>
                <div className="current-position-spans">
                  <span>Close : </span>
                  <span className="">
                    {Object.values(dataPoints1) ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints1)[
                              Object.keys(dataPoints1).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints1)[
                            Object.keys(dataPoints1).length - 1
                          ].y[3]
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div>

                {/* <div className="current-position-spans">
                  <span>Volume : </span>
                  <span className="">
                    {Object.values(dataPoints2) ? (
                      <span
                        style={{
                          color:
                            Object.values(dataPoints2)[
                              Object.keys(dataPoints2).length - 1
                            ].color,
                        }}
                      >
                        {
                          Object.values(dataPoints2)[
                            Object.keys(dataPoints2).length - 1
                          ].y
                        }
                      </span>
                    ) : (
                      "Loading"
                    )}
                  </span>
                </div> */}
              </div>

              {/* <div className='horizon-left'>
                    <div className='hours-list'>
                        <ul>
                            <li className='active'>1m</li>
                            <li>1h</li>
                            <li>2h</li>
                            <li>4h</li>
                            <li>6h</li>
                            <li>24h</li>
                            <li><AiOutlineCalendar /></li>
                        </ul>
                    </div>
                </div> */}

              <div className="ep-cp">
                <div className="ep">
                  <p className="for-ep-color">- - - -</p>
                  <p>Entry Price</p>
                </div>
                <div className="cp">
                  <p className="for-cp-color">- - - -</p>
                  <p>Current Price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container candle-canvas">
        {isLoaded && (
          <CanvasJSStockChart
            containerProps={containerProps}
            options={options}
          />
        )}
      </div>
    </div>
  );
}

export default memo(CandleGraphCanvasjs);
