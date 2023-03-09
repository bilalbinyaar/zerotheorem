import { Tooltip } from "@mui/material";
import React, { useRef } from "react";
import "./ModelDetails.css";
import { BsFillInfoCircleFill } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import TimerModelPage from "../../timer/TimerModelPage";
import { useStateContext } from "../../../ContextProvider";

const ModelDetailsCenter = (props) => {
  const {
    stats_cache,
    strategies_cache,
    Set_strategies_cache,
    Set_stats_cache,
  } = useStateContext();
  // All time Drop Down
  const [drop, setDrop] = useState(false);
  const dropDown = () => setDrop(!drop);
  // All time Drop Down End
  const [stats, setStats] = useState([]);
  const [strategies, setStrategies] = useState({});

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

            // const sorted = Object.keys(model_names)
            //   .map((key) => {
            //     return { ...model_names[key], key };
            //   })
            //   .sort((a, b) => b.total_pnl - a.total_pnl);
            setStats(model_names);
            Set_stats_cache({ stats: model_names });

            // Set_sorted_stats_cache({ sorted_stats: sorted });
          }
        })
        .catch((err) => console.log(err));
    } else {
      //  console.log("I am using cached values of sorted stats -->", stats_cache);
      setStats(stats_cache["stats"]);
    }
  }, []);

  useEffect(() => {
    if (!stats) {
      return;
    } else {
      if (Object.keys(strategies_cache).length == 0) {
        fetch("https://zt-rest-api-3hwk7v5hda-uc.a.run.app/get_strategies", {
          method: "get",
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data["response"].length);
            var data_for_strategies = {};
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
              };
            }
            if (JSON.stringify(data_for_strategies) !== "{}") {
              setStrategies(data_for_strategies);
              // console.log("Strategies final -->", data_for_strategies);
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
    }
  }, [stats]);

  // FOR LONG SHORT COLORS
  const forLSColor = (current_position) => {
    if (current_position == "Short") {
      document
        .getElementById("for-long-short")
        .setAttribute("style", "color:#FF2E2E !important");
    } else if (current_position == "Long") {
      document
        .getElementById("for-long-short")
        .setAttribute("style", "color:#16C784 !important");
    } else if (current_position == "Long") {
      document
        .getElementById("for-long-short")
        .setAttribute("style", "color:#16C784 !important");
    }
  };

  const forLSMColor = (current_position) => {
    if (current_position == "Short") {
      document
        .getElementById("for-long-short-mob")
        .setAttribute("style", "color:#FF2E2E !important");
    } else if (current_position == "Long") {
      document
        .getElementById("for-long-short-mob")
        .setAttribute("style", "color:#16C784 !important");
    } else if (current_position == "Long") {
      document
        .getElementById("for-long-short-mob")
        .setAttribute("style", "color:#16C784 !important");
    }
  };
  // FOR LONG SHORT COLORS

  // CURRENT PNL COLORS
  const forPnlColor = (total_pnl, id) => {
    if (total_pnl < 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#FF2E2E !important");
    } else if (total_pnl >= 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#16C784 !important");
    }
  };

  const forPnlMColor = (total_pnl, id) => {
    if (total_pnl < 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#FF2E2E !important");
    } else if (total_pnl >= 0) {
      document
        .getElementById(`${id}`)
        .setAttribute("style", "color:#16C784 !important");
    }
  };
  // CURRENT PNL COLORS

  return (
    <div className="mod-dets-main">
      {/* MODEL DETAILS CENTER FOR WEB */}
      <div className="mod-det-web">
        <div className="model-details-center">
          <div className="model-details-center-top">
            <div className="model-details-center-top-forecasts current">
              <div className="for-tooltip">
                <p>Forecast</p>
                <Tooltip title="Price/Directional prediction for current time">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3
                id="for-long-short"
                onChange={
                  strategies[props.model_name]
                    ? forLSColor(strategies[props.model_name].current_position)
                    : null
                }
              >
                {strategies[props.model_name]
                  ? strategies[props.model_name].current_position
                  : null}
              </h3>
            </div>

            <div className="model-details-center-top-forecasts normal for-border">
              <div className="for-tooltip">
                <p>Forecast Time</p>
                <Tooltip title="Time in which the forecast is created">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3>
                {strategies[props.model_name]
                  ? strategies[props.model_name].forecast_time
                  : null}
              </h3>
            </div>

            <div className="model-details-center-top-forecasts next">
              <div className="for-tooltip">
                <p>Next Forecast</p>
                <Tooltip title="Countdown clock till time of next forecast">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3>
                {strategies[props.model_name] ? (
                  <TimerModelPage
                    time_horizon={[
                      "24h",
                      strategies[props.model_name].next_forecast,
                    ]}
                  />
                ) : null}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="model-details-center-body">
            <div className="model-details-center-body-content">
              <div className="for-tooltip">
                <p>Entry Price</p>
                <Tooltip title="Price in which Forecast was acted on">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3>
                {strategies[props.model_name]
                  ? strategies[props.model_name].entry_price
                  : null}
              </h3>
            </div>

            <div className="model-details-center-body-content for-border">
              <div className="for-tooltip">
                <p>Current Price</p>
                <Tooltip title="Price at the current time of review">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3>
                {strategies[props.model_name]
                  ? strategies[props.model_name].current_price
                  : null}
              </h3>
            </div>

            <div className="model-details-center-body-content">
              <div className="for-tooltip">
                <p>Current PNL</p>
                <Tooltip title="Current profit or loss (calculated as the difference between entry and current position) at the time of review">
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <h3
                id="curr-pnl"
                onChange={
                  strategies[props.model_name]
                    ? forPnlColor(
                        strategies[props.model_name].current_pnl,
                        "curr-pnl"
                      )
                    : null
                }
              >
                {strategies[props.model_name]
                  ? strategies[props.model_name].current_pnl
                  : null}
                {"%"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* MODEL DETAILS CENTER FOR MOBILE */}
      <div className="mod-det-mob">
        <div className="model-details-center">
          <div className="model-details-center-top">
            <div className="model-details-center-top-forecasts current">
              <div className="for-tooltip">
                <p>Forecast :</p>
                {/* <Tooltip title="Current Forecast">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip> */}
              </div>
              <h3
                id="for-long-short-mob"
                onChange={
                  strategies[props.model_name]
                    ? forLSMColor(strategies[props.model_name].current_position)
                    : null
                }
              >
                {strategies[props.model_name]
                  ? strategies[props.model_name].current_position
                  : null}
              </h3>
            </div>
          </div>

          <div className="model-details-center-top">
            <div className="model-details-center-top-forecasts">
              <div className="for-tooltip">
                <p>Next Forecast :</p>
                {/* <Tooltip title="Next Forecast">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip> */}
              </div>
              <h3>
                {strategies[props.model_name] ? (
                  <TimerModelPage
                    time_horizon={[
                      "24h",
                      strategies[props.model_name].next_forecast,
                    ]}
                  />
                ) : null}
              </h3>
            </div>

            <div className="model-details-center-top-forecasts">
              <div className="for-tooltip">
                <p>Current Price :</p>
                {/* <Tooltip title="Current Price">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip> */}
              </div>
              <h3>
                {strategies[props.model_name]
                  ? strategies[props.model_name].current_price
                  : null}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="model-details-center-body">
            <div className="model-details-center-body-content">
              <div className="for-tooltip">
                <p>Entry Price :</p>
                {/* <Tooltip title="Entry Price">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip> */}
              </div>
              <h3>
                {strategies[props.model_name]
                  ? strategies[props.model_name].entry_price
                  : null}
              </h3>
            </div>

            <div className="model-details-center-body-content">
              <div className="for-tooltip">
                <p>Current PNL :</p>
                {/* <Tooltip title="Current PNL">
                <IconButton>
                  <BsFillInfoCircleFill />
                </IconButton>
              </Tooltip> */}
              </div>
              <h3
                id="curr-pnl-m"
                onChange={
                  strategies[props.model_name]
                    ? forPnlMColor(
                        strategies[props.model_name].current_pnl,
                        "curr-pnl-m"
                      )
                    : null
                }
              >
                {strategies[props.model_name]
                  ? strategies[props.model_name].current_pnl
                  : null}
                {"%"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsCenter;
