import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import { useStateContext } from "../../ContextProvider";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { MathComponent } from "mathjax-react";
import { useSelector, useDispatch } from "react-redux";


const Portfolio = () => {
  // console.log("Hello");
  // TOTAL PNL COLORS
  const persistant_states = useSelector((state) => state.scroll);
  // console.log("Scroll value -->", scroll);
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
  // TOTAL PNL COLORS

  const { theme } = useStateContext();

  const {
    stats_cache,
    strategies_cache,
    sorted_stats_cache,
    Set_strategies_cache,
    Set_sorted_stats_cache,
    Set_stats_cache,
    coin_selection_cache,
    Set_coin_search_selection_cache,
    model_selection_cache,
    Set_model_search_selection_cache,
  } = useStateContext();
  // All time Drop Down
  const [drop, setDrop] = useState(false);
  const dropDown = () => setDrop(!drop);
  // All time Drop Down End
  const [topPerformerModels, setTopPerformersModels] = useState({});
  useEffect(() => {
    if (Object.keys(stats_cache).length == 0) {
      fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_stats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data["msg"].length);
          var model_names = {};
          for (var i = 0; i < data["msg"].length; i++) {
            // console.log(data["msg"][i].strategy_name);
            var name = data["msg"][i].strategy_name;
            model_names[data["msg"][i].strategy_name] = {
              strategy_name: data["msg"][i].strategy_name,
              current_drawdown: data["msg"][i].current_drawdown,
              curr_drawdown_duration: data["msg"][i].curr_drawdown_duration,
              average_drawdown: data["msg"][i].average_drawdown,
              average_drawdown_duration:
                data["msg"][i].average_drawdown_duration,
              max_drawdown: data["msg"][i].max_drawdown,
              max_drawdown_duration: data["msg"][i].max_drawdown_duration,
              r2_score: data["msg"][i].r2_score,
              sharpe: data["msg"][i].sharpe,
              sortino: data["msg"][i].sortino,
              total_pnl: data["msg"][i].total_pnl,
              total_positive_pnl: data["msg"][i].total_positive_pnl,
              total_negative_pnl: data["msg"][i].total_negative_pnl,
              total_wins: data["msg"][i].total_wins,
              total_losses: data["msg"][i].total_losses,
              consective_wins: data["msg"][i].consective_wins,
              consective_losses: data["msg"][i].consective_losses,
              win_percentage: data["msg"][i].win_percentage,
              loss_percentage: data["msg"][i].loss_percentage,
              pnl_sum_1: data["msg"][i].pnl_sum_1,
              pnl_sum_7: data["msg"][i].pnl_sum_7,
              pnl_sum_15: data["msg"][i].pnl_sum_15,
              pnl_sum_30: data["msg"][i].pnl_sum_30,
              pnl_sum_45: data["msg"][i].pnl_sum_45,
              pnl_sum_60: data["msg"][i].pnl_sum_60,
              average_daily_pnl: data["msg"][i].average_daily_pnl,
              win_loss_ratio: data["msg"][i].win_loss_ratio,

              rank: data["msg"][i].rank,
            };
          }
          if (JSON.stringify(model_names) !== "{}") {
            // console.log("Sortable -->", model_names);

            const sorted = Object.keys(model_names)
              .map((key) => {
                return { ...model_names[key], key };
              })
              .sort((a, b) => b.total_pnl - a.total_pnl);
            setTopPerformersModels(sorted);
            Set_stats_cache({ stats: model_names });

            Set_sorted_stats_cache({ sorted_stats: sorted });
          }
        })
        .catch((err) => console.log(err));
    } else {
      // console.log(
      //   "I am using cached values of sorted stats -->",
      //   sorted_stats_cache
      // );
      setTopPerformersModels(sorted_stats_cache["sorted_stats"]);
    }
  }, []);

  const [strategies, setStrategies] = useState({});

  useEffect(() => {
    if (Object.keys(strategies_cache).length == 0) {
      fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_strategies", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
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
            model_names.push({
              label: data["response"][i].strategy_name.replace("_", "-"),
              value: data["response"][i].time_horizon,
              currency: data["response"][i].currency,
            });
            if (!unique_coins[data["response"][i].currency]) {
              unique_coins[data["response"][i].currency] = 1;
              coin_names.push({
                label: data["response"][i].currency,
                value: index,
              });
            }
            var dt = new Date(
              parseInt(data["response"][i].forecast_time) * 1000
            ).toLocaleString();
            // console.log("Locale string -->", dt.split(" ")[2]);

            if (curr_time_version == "PM") {
              hours = parseInt(hours) + 12;
            }
            var year = dt.split("/")[2].split(",")[0];
            var month = dt.split("/")[0];
            if (month.length == 1) {
              month = "0" + month;
            }
            var day = dt.split("/")[1];
            if (day.length == 1) {
              day = "0" + day;
            }
            var hours = dt.split(", ")[1].split(":")[0];
            if (hours.length == 1) {
              hours = "0" + hours;
            }

            var minutes = dt.split(":")[1];
            if (minutes.length == 1) {
              minutes = "0" + minutes;
            }
            var curr_time_version = dt.split(" ")[2];
            if (curr_time_version == "PM") {
              hours = parseInt(hours) + 12;
            }
            var dt_str =
              year + "-" + month + "-" + day + " " + hours + ":" + minutes;
            // console.log("DT", dt, dt_str);

            data_for_strategies[data["response"][i].strategy_name] = {
              current_position: data["response"][i].current_position,
              time_horizon: data["response"][i].time_horizon,
              currency: data["response"][i].currency,
              date_started: data["response"][i].date_started,
              entry_price: data["response"][i].entry_price,
              forecast_time: dt_str,
              // .split(".")[0]
              // .slice(0, -3),
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
            Set_coin_search_selection_cache({
              coin_names: coin_names,
            });
            Set_model_search_selection_cache({
              model_names: model_names,
            });
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
  }, [topPerformerModels]);

  // MUI DROP DOWN
  const [days, setDays] = React.useState("All");

  const handleChange = (event) => {
    // console.log("Dropdown value -->", event.target.value);
    setDays(event.target.value);
    var model_names = stats_cache["stats"];
    if (event.target.value == 30) {
      const sorted = Object.keys(model_names)
        .map((key) => {
          return { ...model_names[key], key };
        })
        .sort((a, b) => b.pnl_sum_30 - a.pnl_sum_30);
      setTopPerformersModels(sorted);
    } else if (event.target.value == 7) {
      const sorted = Object.keys(stats_cache["stats"])
        .map((key) => {
          return { ...model_names[key], key };
        })
        .sort((a, b) => b.pnl_sum_7 - a.pnl_sum_7);
      setTopPerformersModels(sorted);
    } else if (event.target.value == "All") {
      const sorted = Object.keys(stats_cache["stats"])
        .map((key) => {
          return { ...model_names[key], key };
        })
        .sort((a, b) => b.total_pnl - a.total_pnl);
      setTopPerformersModels(sorted);
    } else if (event.target.value == 60) {
      const sorted = Object.keys(stats_cache["stats"])
        .map((key) => {
          return { ...model_names[key], key };
        })
        .sort((a, b) => b.pnl_sum_60 - a.pnl_sum_60);
      setTopPerformersModels(sorted);
    } else if (event.target.value == 45) {
      const sorted = Object.keys(stats_cache["stats"])
        .map((key) => {
          return { ...model_names[key], key };
        })
        .sort((a, b) => b.pnl_sum_45 - a.pnl_sum_45);
      setTopPerformersModels(sorted);
    } else if (event.target.value == 15) {
      const sorted = Object.keys(stats_cache["stats"])
        .map((key) => {
          return { ...model_names[key], key };
        })
        .sort((a, b) => b.pnl_sum_15 - a.pnl_sum_15);
      setTopPerformersModels(sorted);
    } else if (event.target.value == 1) {
      const sorted = Object.keys(stats_cache["stats"])
        .map((key) => {
          return { ...model_names[key], key };
        })
        .sort((a, b) => b.pnl_sum_1 - a.pnl_sum_1);
      setTopPerformersModels(sorted);
    }
  };



  return (
    <div id="forecasts" className="forecasts">
      <div className="container">
        <div className="top-div">
          <h1>Portfolio</h1>
        </div>

        <div className="forecasts-details">
          <p className="forcasts-description">
            Zero Theorem is an economic framework for valuing Bitcoin. On the
            forecast page you will find a variety of machine learning solutions
            to the Zero Theorem governing equation. Each model attempts to
            estimate substitution parameter 𝛼<sub>𝑘</sub> to solve the market
            sizing dilemma. Hence each model also produces a forward valuation
            and pricing direction.
          </p>

          {theme === "dark-theme" ? (
            <div className="equation-img">
              <div className="equation-i-div">
                <Tooltip
                  className="equation-i"
                  title="Where πBTC = αPbtc/αt represents the rate of change, Pbtc = price of Bitcoin in USD, Pk = price of k asset in USD, Rk = volume traded of k asset in USD, αk = substitution rate phenomena, T’j= velocity of transactions, b = block reward, h = hash rate and d = difficulty"
                >
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <MathComponent
                tex={String.raw`\pi_{B T C}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n \alpha_k \cdot P_k \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln (b)-\ln (h)+\ln (d)\right]`}
              />
              <p className="equation-caption">
                Zero Theorem Governing Equation ​
              </p>
            </div>
          ) : (
            <div className="equation-img">
              <div className="equation-i-div">
                <Tooltip
                  className="equation-i"
                  title="Where πBTC = αPbtc/αt represents the rate of change, Pbtc = price of Bitcoin in USD, Pk = price of k asset in USD, Rk = volume traded of k asset in USD, αk = substitution rate phenomena, T’j= velocity of transactions, b = block reward, h = hash rate and d = difficulty"
                >
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <MathComponent
                tex={String.raw`\pi_{B T C}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n \alpha_k \cdot P_k \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln (b)-\ln (h)+\ln (d)\right]`}
              />
              <p className="equation-caption">
                Zero Theorem Governing Equation ​
              </p>
            </div>
          )}
        </div>

        <div className="portfolio-stats">
            <div className="today-stats">
                <h3>Today</h3>
                <h3>Stats</h3>
            </div>

            <div className="overall-stats">
                <h3>Overall Return</h3>
                <h3>Stats</h3>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Portfolio;