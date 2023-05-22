import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ScatterPlotApexCharts = () => {
  const [timer_for_current, set_timer_for_current_position] = useState(null);
  const [datapoint1, setDatapoint1] = useState([]);

  const [state, setState] = useState({
    series: [
      {
        name: "BTC Return ",
        data: datapoint1,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "scatter",
        zoom: {
          enabled: true,
          type: "xy",
        },
        toolbar: {
          show: false, // Hide the chart toolbar
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="tooltip">' +
            "<span>X: " +
            w.config.series[seriesIndex].data[dataPointIndex][0] +
            "</span>" +
            "<span>Y: " +
            w.config.series[seriesIndex].data[dataPointIndex][1] +
            "</span>" +
            "</div>"
          );
        },
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          align: "center",

          formatter: function (val) {
            return parseFloat(val).toFixed(1);
          },
        },
      },
      yaxis: {
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
    },
  });
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
              temp_data.push([
                data["response"][i].pnl,

                data["response"][i].btc_return,
              ]);
            }

            if (temp_data.length != 0) {
              // console.log("Btc return -->", temp_data);
              setState({
                series: [
                  {
                    name: "Market Return ",
                    data: temp_data,
                  },
                ],
                options: {
                  chart: {
                    height: 350,
                    type: "scatter",
                    zoom: {
                      enabled: true,
                      type: "xy",
                    },
                    toolbar: {
                      show: false, // Hide the chart toolbar
                    },
                  },
                  tooltip: {
                    custom: function ({
                      series,
                      seriesIndex,
                      dataPointIndex,
                      w,
                    }) {
                      return (
                        '<div class="tooltip" style="padding: 4px;">' +
                        "<span>Portfolio Return: " +
                        w.config.series[seriesIndex].data[dataPointIndex][0] +
                        "%</span><br>" +
                        "<span>Market Return: " +
                        w.config.series[seriesIndex].data[dataPointIndex][1] +
                        "%</span>" +
                        "</div>"
                      );
                    },
                  },
                  xaxis: {
                    title: {
                      text: "PNL Returns",
                    },
                    tickAmount: 10,
                    labels: {
                      align: "center",

                      formatter: function (val) {
                        return parseFloat(val).toFixed(1);
                      },
                    },
                  },
                  yaxis: {
                    title: {
                      text: "Market Returns",
                      offsetX: -10,
                      // style: {
                      //   padding: "10px 10px 10px 10px", // Adjust the margin as needed
                      // },
                    },

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
                      offsetX: 20,
                    },
                  },
                },
              });
              // set_data_for_graph_historical(temp_data);
              // console.log("Here is the data for current position", temp_data);
            }
          });
        set_timer_for_current_position(new Date());
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
              temp_data.push([
                data["response"][i].pnl,

                data["response"][i].btc_return,
              ]);
            }

            if (temp_data.length != 0) {
              // console.log("Btc return -->", temp_data);
              setState({
                series: [
                  {
                    name: "Market Return ",
                    data: temp_data,
                  },
                ],
                options: {
                  chart: {
                    height: 350,
                    type: "scatter",
                    zoom: {
                      enabled: true,
                      type: "xy",
                    },
                    toolbar: {
                      show: false, // Hide the chart toolbar
                    },
                  },
                  tooltip: {
                    shared: false,
                    x: {
                      formatter: function (val) {
                        return parseFloat(val).toFixed(1);
                      },
                    },
                    y: {
                      formatter: function (val) {
                        return val.toFixed(2);
                      },
                    },
                  },
                  xaxis: {
                    tickAmount: 10,
                    labels: {
                      align: "center",

                      formatter: function (val) {
                        return parseFloat(val).toFixed(1);
                      },
                    },
                  },
                  yaxis: {
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
                },
              });
              // set_data_for_graph_historical(temp_data);
              // console.log("Here is the data for current position", temp_data);
            }
          });
        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log("Error occured");
    }
  }, [timer_for_current]);

  return (
    <div className="scattered">
      <div className="container">
        <h2>Market Comparison Rate</h2>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="scatter"
          height={350}
        />
      </div>
    </div>
  );
};

export default ScatterPlotApexCharts;
