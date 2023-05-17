import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useStateContext } from "../ContextProvider";
import { ThreeDots } from "react-loader-spinner";

const PerformancePieChart = (props) => {
  const [model_name, set_model_name] = useState(props.model_name);
  const [labels, setLabels] = useState([]);
  if (model_name != props.model_name) {
    set_model_name(props.model_name);
  }
  const [stats, setStats] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [series, setSeries] = useState([]);
  const { stats_cache, Set_stats_cache } = useStateContext();
  useEffect(() => {
    fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_strategies", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data["response"].length);
        var model_names = {};
        var temp_labels = [];
        var temp_stats = [];
        for (var i = 0; i < data["response"].length; i++) {
          // console.log(data["response"][i].strategy_name);
          model_names[data["response"][i].strategy_name] = {
            portfolio_allocation: data["response"][i].portfolio_allocation,
          };
          temp_stats.push(data["response"][i].portfolio_allocation);
          temp_labels.push(data["response"][i].strategy_name);
        }
        if (JSON.stringify(model_names) !== "{}") {
          // console.log("Sortable -->", model_names);

          // const sorted = Object.keys(model_names)
          //   .map((key) => {
          //     return { ...model_names[key], key };
          //   })
          //   .sort((a, b) => b.total_pnl - a.total_pnl);
          setStats(model_names);
          setSeries(temp_stats);
          setLabels(temp_labels);
          setIsLoaded(true);
          // Set_sorted_stats_cache({ sorted_stats: sorted });
        }
      })
      .catch((err) => console.log(err));
  }, [model_name]);

  // useEffect(() => {
  //   if (stats == null) {
  //     return;
  //   } else {
  //     var data_for_stat = [];
  //     for (let i = 0; i < data_for_stat.length; i++) {
  //       data_for_stat.push(stats[labels[i]].portfolio_allocation);
  //     }
  //     //console.log("Strategy -->", data["response"][i].strategy_name);
  //     // data_for_stat.push(data["response"]);
  //     if (data_for_stat.length !== 0) {
  //       setSeries(data_for_stat);
  //       // console.log("Data for setting stat -->", data_for_stat);
  //     }
  //   }
  // }, [stats]);

  const options = {
    labels: labels,
    // colors: ["#16C784", "#FF2E2E"],
    chart: {
      width: 500,
      height: 300,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "40%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      show: true,
      floating: true,
      fontSize: "16px",
      position: "right",
      offsetX: 160,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart" className="donut-chart">
      {isLoaded ? (
        <div>
          <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height={350}
          />
        </div>
      ) : (
        <div className="container loader-container">
          <ThreeDots
            className="backtest-loader"
            color="#fddd4e"
            height={80}
            width={80}
          />
        </div>
      )}
    </div>
  );
};

export default PerformancePieChart;
