import React, { useEffect, useState, useRef } from "react";
import { AiOutlineDown, AiOutlineFieldTime } from "react-icons/ai";
import { useStateContext } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import { style } from "@mui/system";

const ModelNameCol = (props) => {
  // console.log("Testing data -->", props.value);
  // TOTAL PNL COLORS
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

  const {
    checked,
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
  const [topPerformerModels, setTopPerformersModels] = useState([]);
  useEffect(() => {
    if (Object.keys(stats_cache).length == 0) {
      fetch("https://zt-rest-api-3hwk7v5hda-uc.a.run.app/get_stats", {
        method: "get",
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
            model_names.push({
              label: data["response"][i].strategy_name.replace("_", "-"),
              value: data["response"][i].time_horizon,
              currency: data["response"][i].currency,
            });
            if (!unique_coins[data["response"][i].currency]) {
              unique_coins[data["response"][i].currency] = 1;
              coin_names.push({
                label: data["response"][i].currency,
                // value: i,
              });
            }
            var dt = new Date(
              parseInt(data["response"][i].forecast_time) * 1000
            ).toLocaleString();
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
            // console.log("Strategies final -->", data_for_strategies);
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
  // To Link Grid Rows to Models Component
  const linkModels = useNavigate();
  // To Link Grid Rows to Models Component

  // FOR RESPONSIVENESS
  const windowWidth = useRef(window.innerWidth);
  // FOR RESPONSIVENESS

  return (
    <div className="forecasts-model-name">
      <h3
        onClick={() => {
          linkModels(`/${props.value[2].replace("_", "-")}`, {
            state: {
              model_name: props.value[2],
            },
          });
        }}
      >
        {props.value[2].replace("_", "-")}
      </h3>
      <div className="model-details-left-body for-forecasts-card">
        <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
          <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
          <p>{props.value[0]}</p>
        </div>
        <div className="model-details-left-body-stats date for-forecast-card-details">
          <p className="para-margin">{props.value[1]}</p>
        </div>
        <div>
          {props.value[3] === "Short" ? (
            <div className="bg-short">
              <p>Short</p>
            </div>
          ) : (
            <div className="bg-long">
              <p>Long</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelNameCol;
