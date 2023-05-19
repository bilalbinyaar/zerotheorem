import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ThreeDots } from "react-loader-spinner";

const PolarAreaChartApexCharts = () => {
  const [series, setSeries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Labels, setLabels] = useState([]);

  useEffect(() => {
    try {
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
            temp_stats.push(parseInt(data["response"][i].portfolio_allocation));
            temp_labels.push(data["response"][i].strategy_name);
          }
          if (JSON.stringify(model_names) !== "{}") {
            // console.log("Sortable -->", model_names);

            // const sorted = Object.keys(model_names)
            //   .map((key) => {
            //     return { ...model_names[key], key };
            //   })
            //   .sort((a, b) => b.total_pnl - a.total_pnl);
            setLabels(temp_labels);

            // setStats(model_names);
            setSeries(temp_stats);
            // console.log("Labels --->", temp_labels);
            setIsLoaded(true);
            // Set_sorted_stats_cache({ sorted_stats: sorted });
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("Error occured");
    }
  }, []);
  const options = {
    chart: {
      width: 380,
      type: "polarArea",
    },
    labels: Labels,
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "top",
    },
    // dataLabels: {
    //   enabled: true,
    // },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: false,
        shadeTo: "dark",
        shadeIntensity: 0.9,
      },
    },
  };

  return (
    <div id="chart">
      {isLoaded ? (
        <ReactApexChart
          options={options}
          series={series}
          type="polarArea"
          width={380}
        />
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

export default PolarAreaChartApexCharts;
