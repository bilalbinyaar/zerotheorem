import React, { useEffect, useState, useRef } from "react";
import "./Forecasts.css";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import {
  AiOutlineDown,
  AiOutlineFieldTime,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { useStateContext } from "../../ContextProvider";
// import ForecastsSpline from "../models/graphs/ForecastsSpline";
import ForecastsSplineCanvasjs from "../models/graphs/ForecastsSplineCanvasjs";
// import CanvasSplineForcasteCard from "../models/graphs/CanvasSplineForcasteCard";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import NativeSelect from "@mui/material/NativeSelect";
import Select from "@mui/material/Select";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EquationBlack from "../../assets/equation-black.png";
import TvSplineAreaChartTopPerformer from "../models/graphs/TvSplineAreaChartTopPerformer";
import EquationWhite from "../../assets/equation-white.png";
import { Link } from "react-router-dom";
import AdsensePlaceHolder from "../adsense/AdsensePlaceHolder";

// import ForecastCards from "../../mobile-components/forecast-cards/ForecastCards";

const 
Forecasts = () => {
  // console.log("Hello");
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
              // value: i,
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
  // To Link Grid Rows to Models Component
  const linkModels = useNavigate();
  // To Link Grid Rows to Models Component

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
  // MUI DROP DOWN

  // FOR RESPONSIVENESS
  const windowWidth = useRef(window.innerWidth);
  // FOR RESPONSIVENESS
  // Highlights ON/OFF
  const [checked, setChecked] = useState(true);
  const toggleChecked = () => setChecked((value) => !value);
  const label = "Best Models";

  const containerRef = useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollLeft > 0) {
      document.getElementById("toHide").style.display = "none";
    }
  };

  return (
    <div id="forecasts" className="forecasts">
      <div className="container">
        <div className="top-div">
          <h1>Forecasts</h1>
          {/* <ToggleSwitch label="Best Models" /> */}
          {/* <div className="toggle-div">
            {label}{" "}
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="checkbox"
                name={label}
                id={label}
                defaultChecked={true}
                checked={checked}
                onChange={toggleChecked}
              />
              <label className="label" htmlFor={label}>
                <span className="inner" />
                <span className="switch" />
              </label>
            </div>
          </div> */}
        </div>

        <div className="forecasts-details">
          <p className="forcasts-description">
            Zero Theorem is an economic framework for valuing Proof of Work
            digital assets like Bitcoin. On the forecast page you will find a
            variety of machine learning solutions to the Zero Theorem governing
            equation. Each model attempts to estimate substitution parameter α
            to solve the market sizing dilemma. Hence each model also produces a
            forward valuation and pricing direction​.
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
              <img src={EquationWhite} alt="p1" />
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
                  <IconButton
                  // sx={{
                  //   width: '25px',
                  // }}
                  >
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </div>
              <img src={EquationBlack} alt="p1" />
              <p className="equation-caption">
                Zero Theorem Governing Equation ​
              </p>
            </div>
          )}
        </div>

        <div className="forecasts-cards-main">
          <div className="bar-for-best">
            <div className="all-time-div-main">
              {checked === true ? (
                <div className="all-time-div">
                  <h2 className="best-peformer-heading">
                    Best performing models in last
                  </h2>

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 65 }}>
                    {/* <InputLabel id="demo-simple-select-standard-label"></InputLabel> */}
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={days}
                      select
                      onChange={handleChange}
                      label="age"
                      sx={{
                        backgroundColor: "var(--color-forecasts-card)",
                        borderRadius: "3px",
                        paddingLeft: "5px",
                        fontSize: "12px",
                      }}
                    >
                      <MenuItem value="All">All time</MenuItem>
                      <MenuItem value={60}>60d</MenuItem>
                      <MenuItem value={45}>45d</MenuItem>
                      <MenuItem value={30}>30d</MenuItem>
                      <MenuItem value={15}>15d</MenuItem>
                      <MenuItem value={7}>7d</MenuItem>
                      <MenuItem value={1}>1d</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              ) : (
                <div className="all-time-div" id="toggle-none">
                  <h2 className="best-peformer-heading">
                    Best performing models in last
                  </h2>

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 65 }}>
                    {/* <InputLabel id="demo-simple-select-standard-label"></InputLabel> */}
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={days}
                      select
                      onChange={handleChange}
                      label="age"
                      sx={{
                        backgroundColor: "var(--color-forecasts-card)",
                        borderRadius: "3px",
                        paddingLeft: "5px",
                        fontSize: "12px",
                      }}
                    >
                      <MenuItem value="All">All time</MenuItem>
                      <MenuItem value={60}>60d</MenuItem>
                      <MenuItem value={45}>45d</MenuItem>
                      <MenuItem value={30}>30d</MenuItem>
                      <MenuItem value={15}>15d</MenuItem>
                      <MenuItem value={7}>7d</MenuItem>
                      <MenuItem value={1}>1d</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
              <div className="toggle-div">
                {label}{" "}
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    className="checkbox"
                    name={label}
                    id={label}
                    defaultChecked={true}
                    checked={checked}
                    onChange={toggleChecked}
                  />
                  <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                  </label>
                </div>
              </div>
            </div>

            {/* Filter Drop Down */}
            {drop && (
              <div className="filter-drop-down">
                <div className="filter-drop-down-list">
                  <div className="drop-down-list">
                    <p>30d</p>
                  </div>
                  <div className="drop-down-list">
                    <p>7d</p>
                  </div>
                  <div className="drop-down-list">
                    <p>1d</p>
                  </div>
                </div>
              </div>
            )}

            {/* Filter Drop Down */}
          </div>

          {/* FOR WEB VIEW */}
          {checked === true ? (
            <div className="forecast-web">
              <div className="forecasts-cards tablet-view-card">
                <div className="forecasts-card card-margin">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>01</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[0].strategy_name.replace("_", "-")}`
                              );
                            }}
                          >
                            {Object.keys(topPerformerModels).length > 0
                              ? Object.values(
                                  topPerformerModels
                                )[0].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>

                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[0] &&
                                strategies[
                                  Object.values(topPerformerModels)[0]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[0]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[0] &&
                                strategies[
                                  Object.values(topPerformerModels)[0]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[0]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color"
                          onChange={
                            Object.values(topPerformerModels)[1] &&
                            strategies[
                              Object.values(topPerformerModels)[0].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[0]
                                      .total_pnl
                                  ),
                                  "pnl-color"
                                )
                              : null
                          }
                        >
                          <Tooltip
                            className="performance-table-tooltip"
                            title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)"
                          >
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[0] &&
                          strategies[
                            Object.values(topPerformerModels)[0].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[0].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[0] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[0].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forecasts-card card-margin">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>02</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[1].strategy_name.replace("_", "-")}`,
                                {
                                  state: {
                                    model_name:
                                      Object.values(topPerformerModels)[1]
                                        .strategy_name,
                                  },
                                }
                              );
                            }}
                          >
                            {Object.values(topPerformerModels)[1]
                              ? Object.values(
                                  topPerformerModels
                                )[1].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>
                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[1] &&
                                strategies[
                                  Object.values(topPerformerModels)[1]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[1]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[1] &&
                                strategies[
                                  Object.values(topPerformerModels)[1]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[1]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color2"
                          onChange={
                            Object.values(topPerformerModels)[1] &&
                            strategies[
                              Object.values(topPerformerModels)[1].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[1]
                                      .total_pnl
                                  ),
                                  "pnl-color2"
                                )
                              : null
                          }
                        >
                          <Tooltip
                            className="performance-table-tooltip"
                            title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)"
                          >
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[1] &&
                          strategies[
                            Object.values(topPerformerModels)[1].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[1].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[1] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[1].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forecasts-card card-margin">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>03</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[2].strategy_name.replace("_", "-")}`,
                                {
                                  state: {
                                    model_name:
                                      Object.values(topPerformerModels)[2]
                                        .strategy_name,
                                  },
                                }
                              );
                            }}
                          >
                            {Object.values(topPerformerModels)[2]
                              ? Object.values(
                                  topPerformerModels
                                )[2].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>
                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[2] &&
                                strategies[
                                  Object.values(topPerformerModels)[2]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[2]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[2] &&
                                strategies[
                                  Object.values(topPerformerModels)[2]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[2]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color3"
                          onChange={
                            Object.values(topPerformerModels)[2] &&
                            strategies[
                              Object.values(topPerformerModels)[2].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[2]
                                      .total_pnl
                                  ),
                                  "pnl-color3"
                                )
                              : null
                          }
                        >
                          <Tooltip title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)">
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[2] &&
                          strategies[
                            Object.values(topPerformerModels)[2].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[2].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[2] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[2].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forecasts-card card-margin">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>04</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[3].strategy_name.replace("_", "-")}`,
                                {
                                  state: {
                                    model_name:
                                      Object.values(topPerformerModels)[3]
                                        .strategy_name,
                                  },
                                }
                              );
                            }}
                          >
                            {Object.values(topPerformerModels)[3]
                              ? Object.values(
                                  topPerformerModels
                                )[3].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>
                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[3] &&
                                strategies[
                                  Object.values(topPerformerModels)[3]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[3]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[3] &&
                                strategies[
                                  Object.values(topPerformerModels)[3]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[3]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color4"
                          onChange={
                            Object.values(topPerformerModels)[3] &&
                            strategies[
                              Object.values(topPerformerModels)[3].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[3]
                                      .total_pnl
                                  ),
                                  "pnl-color4"
                                )
                              : null
                          }
                        >
                          <Tooltip title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)">
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[3] &&
                          strategies[
                            Object.values(topPerformerModels)[3].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[3].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[3] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[3].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forecasts-card">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>05</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[4].strategy_name.replace("_", "-")}`,
                                {
                                  state: {
                                    model_name:
                                      Object.values(topPerformerModels)[4]
                                        .strategy_name,
                                  },
                                }
                              );
                            }}
                          >
                            {Object.values(topPerformerModels)[4]
                              ? Object.values(
                                  topPerformerModels
                                )[4].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>
                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[4] &&
                                strategies[
                                  Object.values(topPerformerModels)[4]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[4]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[4] &&
                                strategies[
                                  Object.values(topPerformerModels)[4]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[4]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color5"
                          onChange={
                            Object.values(topPerformerModels)[4] &&
                            strategies[
                              Object.values(topPerformerModels)[4].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[4]
                                      .total_pnl
                                  ),
                                  "pnl-color5"
                                )
                              : null
                          }
                        >
                          <Tooltip title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)">
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[4] &&
                          strategies[
                            Object.values(topPerformerModels)[4].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[4].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[4] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[4].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="forecasts-cards">
                <div className="forecasts-card card-margin">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>06</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[5].strategy_name.replace("_", "-")}`,
                                {
                                  state: {
                                    model_name:
                                      Object.values(topPerformerModels)[5]
                                        .strategy_name,
                                  },
                                }
                              );
                            }}
                          >
                            {Object.values(topPerformerModels)[5]
                              ? Object.values(
                                  topPerformerModels
                                )[5].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>
                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[5] &&
                                strategies[
                                  Object.values(topPerformerModels)[5]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[5]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[5] &&
                                strategies[
                                  Object.values(topPerformerModels)[5]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[5]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color6"
                          onChange={
                            Object.values(topPerformerModels)[5] &&
                            strategies[
                              Object.values(topPerformerModels)[5].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[4]
                                      .total_pnl
                                  ),
                                  "pnl-color6"
                                )
                              : null
                          }
                        >
                          <Tooltip title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)">
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[5] &&
                          strategies[
                            Object.values(topPerformerModels)[5].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[5].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[5] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[5].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forecasts-card card-margin">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>07</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[6].strategy_name.replace("_", "-")}`,
                                {
                                  state: {
                                    model_name:
                                      Object.values(topPerformerModels)[6]
                                        .strategy_name,
                                  },
                                }
                              );
                            }}
                          >
                            {Object.values(topPerformerModels)[6]
                              ? Object.values(
                                  topPerformerModels
                                )[6].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>
                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[6] &&
                                strategies[
                                  Object.values(topPerformerModels)[6]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[6]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[6] &&
                                strategies[
                                  Object.values(topPerformerModels)[6]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[6]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color7"
                          onChange={
                            Object.values(topPerformerModels)[6] &&
                            strategies[
                              Object.values(topPerformerModels)[6].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[6]
                                      .total_pnl
                                  ),
                                  "pnl-color7"
                                )
                              : null
                          }
                        >
                          <Tooltip title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)">
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[6] &&
                          strategies[
                            Object.values(topPerformerModels)[6].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[6].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[6] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[6].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forecasts-card card-margin">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>08</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[7].strategy_name.replace("_", "-")}`,
                                {
                                  state: {
                                    model_name:
                                      Object.values(topPerformerModels)[7]
                                        .strategy_name,
                                  },
                                }
                              );
                            }}
                          >
                            {Object.values(topPerformerModels)[7]
                              ? Object.values(
                                  topPerformerModels
                                )[7].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>
                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[7] &&
                                strategies[
                                  Object.values(topPerformerModels)[7]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[7]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[7] &&
                                strategies[
                                  Object.values(topPerformerModels)[7]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[7]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color8"
                          onChange={
                            Object.values(topPerformerModels)[7] &&
                            strategies[
                              Object.values(topPerformerModels)[7].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[4]
                                      .total_pnl
                                  ),
                                  "pnl-color8"
                                )
                              : null
                          }
                        >
                          <Tooltip title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)">
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[7] &&
                          strategies[
                            Object.values(topPerformerModels)[7].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[7].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[7] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[7].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forecasts-card card-margin">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>09</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[8].strategy_name.replace("_", "-")}`,
                                {
                                  state: {
                                    model_name:
                                      Object.values(topPerformerModels)[8]
                                        .strategy_name,
                                  },
                                }
                              );
                            }}
                          >
                            {Object.values(topPerformerModels)[8]
                              ? Object.values(
                                  topPerformerModels
                                )[8].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>
                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[8] &&
                                strategies[
                                  Object.values(topPerformerModels)[8]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[8]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[8] &&
                                strategies[
                                  Object.values(topPerformerModels)[8]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[8]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color9"
                          onChange={
                            Object.values(topPerformerModels)[8] &&
                            strategies[
                              Object.values(topPerformerModels)[8].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[4]
                                      .total_pnl
                                  ),
                                  "pnl-color9"
                                )
                              : null
                          }
                        >
                          <Tooltip title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)">
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[8] &&
                          strategies[
                            Object.values(topPerformerModels)[8].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[8].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[8] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[8].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="forecasts-card">
                  <div className="announcement-card">
                    <div className="announcement-row">
                      <div className="title-div">
                        <h2>10</h2>
                        <div className="forecasts-model-name">
                          <h3
                            onClick={() => {
                              linkModels(
                                `/${Object.values(
                                  topPerformerModels
                                )[9].strategy_name.replace("_", "-")}`,
                                {
                                  state: {
                                    model_name:
                                      Object.values(topPerformerModels)[9]
                                        .strategy_name,
                                  },
                                }
                              );
                            }}
                          >
                            {Object.values(topPerformerModels)[9]
                              ? Object.values(
                                  topPerformerModels
                                )[9].strategy_name.replace("_", "-")
                              : "Model Name"}
                          </h3>
                          <div className="model-details-left-body for-forecasts-card">
                            <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                              <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                              <p>
                                {Object.values(topPerformerModels)[9] &&
                                strategies[
                                  Object.values(topPerformerModels)[9]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[9]
                                          .strategy_name
                                      ].time_horizon
                                    }`
                                  : null}
                              </p>
                            </div>
                            <div className="model-details-left-body-stats date for-forecast-card-details">
                              <p className="para-margin">
                                {Object.values(topPerformerModels)[9] &&
                                strategies[
                                  Object.values(topPerformerModels)[9]
                                    .strategy_name
                                ]
                                  ? `${
                                      strategies[
                                        Object.values(topPerformerModels)[9]
                                          .strategy_name
                                      ].currency
                                    }`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="forecasts-more">
                        <h3
                          id="pnl-color10"
                          onChange={
                            Object.values(topPerformerModels)[9] &&
                            strategies[
                              Object.values(topPerformerModels)[9].strategy_name
                            ]
                              ? forColor(
                                  parseInt(
                                    Object.values(topPerformerModels)[4]
                                      .total_pnl
                                  ),
                                  "pnl-color10"
                                )
                              : null
                          }
                        >
                          <Tooltip title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)">
                            <IconButton>
                              <BsFillInfoCircleFill />
                            </IconButton>
                          </Tooltip>
                          {Object.values(topPerformerModels)[9] &&
                          strategies[
                            Object.values(topPerformerModels)[9].strategy_name
                          ]
                            ? `${
                                Object.values(topPerformerModels)[9].total_pnl
                              }`
                            : null}
                          {"%"}
                        </h3>
                      </div>
                    </div>

                    <div className="announcement-news">
                      <div className="news-inner">
                        {Object.values(topPerformerModels)[9] ? (
                          <TvSplineAreaChartTopPerformer
                            model_name={
                              Object.values(topPerformerModels)[9].strategy_name
                            }
                          />
                        ) : null}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* FOR MOBILE VIEW  */}
          {checked === true ? (
          <div className="forecast-mob">
            {/* <div className="swipe-right" id='toHide'>
                <BsArrowRightShort className="swipe-right-icon" />
              </div>  */}

            <div
              className="forecasts-cards"
              ref={containerRef}
              style={{ overflowX: "scroll" }}
              onScroll={handleScroll}
            >
              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>01</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[0].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[0]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[0]
                            ? Object.values(
                                topPerformerModels
                              )[0].strategy_name.replace("_", "-")
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[0] &&
                              strategies[
                                Object.values(topPerformerModels)[0]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[0]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[0] &&
                              strategies[
                                Object.values(topPerformerModels)[0]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[0]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color"
                        onChange={
                          Object.values(topPerformerModels)[1] &&
                          strategies[
                            Object.values(topPerformerModels)[0].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[0].total_pnl
                                ),
                                "pnl-color"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[0] &&
                        strategies[
                          Object.values(topPerformerModels)[0].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[0].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[0] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[0].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>02</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[1].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[1]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[1]
                            ? Object.values(topPerformerModels)[1].strategy_name
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[1] &&
                              strategies[
                                Object.values(topPerformerModels)[1]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[1]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[1] &&
                              strategies[
                                Object.values(topPerformerModels)[1]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[1]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color2"
                        onChange={
                          Object.values(topPerformerModels)[1] &&
                          strategies[
                            Object.values(topPerformerModels)[1].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[1].total_pnl
                                ),
                                "pnl-color2"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[1] &&
                        strategies[
                          Object.values(topPerformerModels)[1].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[1].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[1] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[1].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>03</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[2].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[2]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[2]
                            ? Object.values(topPerformerModels)[2].strategy_name
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[2] &&
                              strategies[
                                Object.values(topPerformerModels)[2]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[2]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[2] &&
                              strategies[
                                Object.values(topPerformerModels)[2]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[2]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color3"
                        onChange={
                          Object.values(topPerformerModels)[2] &&
                          strategies[
                            Object.values(topPerformerModels)[2].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[2].total_pnl
                                ),
                                "pnl-color3"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[2] &&
                        strategies[
                          Object.values(topPerformerModels)[2].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[2].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[2] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[2].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>04</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[3].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[3]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[3]
                            ? Object.values(
                                topPerformerModels
                              )[3].strategy_name.replace("_", "-")
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[3] &&
                              strategies[
                                Object.values(topPerformerModels)[3]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[3]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[3] &&
                              strategies[
                                Object.values(topPerformerModels)[3]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[3]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color4"
                        onChange={
                          Object.values(topPerformerModels)[3] &&
                          strategies[
                            Object.values(topPerformerModels)[3].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[3].total_pnl
                                ),
                                "pnl-color4"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[3] &&
                        strategies[
                          Object.values(topPerformerModels)[3].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[3].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[3] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[3].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>05</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[4].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[4]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[4]
                            ? Object.values(topPerformerModels)[4].strategy_name
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[4] &&
                              strategies[
                                Object.values(topPerformerModels)[4]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[4]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[4] &&
                              strategies[
                                Object.values(topPerformerModels)[4]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[4]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color5"
                        onChange={
                          Object.values(topPerformerModels)[4] &&
                          strategies[
                            Object.values(topPerformerModels)[4].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[4].total_pnl
                                ),
                                "pnl-color5"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[4] &&
                        strategies[
                          Object.values(topPerformerModels)[4].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[4].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[4] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[4].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>06</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[5].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[5]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[5]
                            ? Object.values(topPerformerModels)[5].strategy_name
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[5] &&
                              strategies[
                                Object.values(topPerformerModels)[5]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[5]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[5] &&
                              strategies[
                                Object.values(topPerformerModels)[5]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[5]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color6"
                        onChange={
                          Object.values(topPerformerModels)[5] &&
                          strategies[
                            Object.values(topPerformerModels)[5].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[4].total_pnl
                                ),
                                "pnl-color6"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[5] &&
                        strategies[
                          Object.values(topPerformerModels)[5].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[5].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[5] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[5].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>07</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[6].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[6]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[6]
                            ? Object.values(topPerformerModels)[6].strategy_name
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[6] &&
                              strategies[
                                Object.values(topPerformerModels)[6]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[6]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[6] &&
                              strategies[
                                Object.values(topPerformerModels)[6]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[6]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color7"
                        onChange={
                          Object.values(topPerformerModels)[6] &&
                          strategies[
                            Object.values(topPerformerModels)[6].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[4].total_pnl
                                ),
                                "pnl-color7"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[6] &&
                        strategies[
                          Object.values(topPerformerModels)[6].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[6].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[6] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[6].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>08</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[7].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[7]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[7]
                            ? Object.values(topPerformerModels)[7].strategy_name
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[7] &&
                              strategies[
                                Object.values(topPerformerModels)[7]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[7]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[7] &&
                              strategies[
                                Object.values(topPerformerModels)[7]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[7]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color8"
                        onChange={
                          Object.values(topPerformerModels)[7] &&
                          strategies[
                            Object.values(topPerformerModels)[7].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[4].total_pnl
                                ),
                                "pnl-color8"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[7] &&
                        strategies[
                          Object.values(topPerformerModels)[7].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[7].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[7] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[7].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>09</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[8].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[8]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[8]
                            ? Object.values(topPerformerModels)[8].strategy_name
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[8] &&
                              strategies[
                                Object.values(topPerformerModels)[8]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[8]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[8] &&
                              strategies[
                                Object.values(topPerformerModels)[8]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[8]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color9"
                        onChange={
                          Object.values(topPerformerModels)[8] &&
                          strategies[
                            Object.values(topPerformerModels)[8].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[4].total_pnl
                                ),
                                "pnl-color9"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[8] &&
                        strategies[
                          Object.values(topPerformerModels)[8].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[8].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[8] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[8].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecasts-card card-margin">
                <div className="announcement-card">
                  <div className="announcement-row">
                    <div className="title-div">
                      <h2>10</h2>
                      <div className="forecasts-model-name">
                        <h3
                          onClick={() => {
                            linkModels(
                              `/${Object.values(
                                topPerformerModels
                              )[9].strategy_name.replace("_", "-")}`,
                              {
                                state: {
                                  model_name:
                                    Object.values(topPerformerModels)[9]
                                      .strategy_name,
                                },
                              }
                            );
                          }}
                        >
                          {Object.values(topPerformerModels)[9]
                            ? Object.values(topPerformerModels)[9].strategy_name
                            : "Model Name"}
                        </h3>
                        <div className="model-details-left-body for-forecasts-card">
                          <div className="model-details-left-body-stats hours for-forecast-card-details forecasts-details-margin">
                            <AiOutlineFieldTime className="model-details-left-body-stats-icon para-margin" />
                            <p>
                              {Object.values(topPerformerModels)[9] &&
                              strategies[
                                Object.values(topPerformerModels)[9]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[9]
                                        .strategy_name
                                    ].time_horizon
                                  }`
                                : null}
                            </p>
                          </div>
                          <div className="model-details-left-body-stats date for-forecast-card-details">
                            <p className="para-margin">
                              {Object.values(topPerformerModels)[9] &&
                              strategies[
                                Object.values(topPerformerModels)[9]
                                  .strategy_name
                              ]
                                ? `${
                                    strategies[
                                      Object.values(topPerformerModels)[9]
                                        .strategy_name
                                    ].currency
                                  }`
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="forecasts-more">
                      <h3
                        id="pnl-color10"
                        onChange={
                          Object.values(topPerformerModels)[9] &&
                          strategies[
                            Object.values(topPerformerModels)[9].strategy_name
                          ]
                            ? forColor(
                                parseInt(
                                  Object.values(topPerformerModels)[4].total_pnl
                                ),
                                "pnl-color10"
                              )
                            : null
                        }
                      >
                        {Object.values(topPerformerModels)[9] &&
                        strategies[
                          Object.values(topPerformerModels)[9].strategy_name
                        ]
                          ? `${Object.values(topPerformerModels)[9].total_pnl}`
                          : null}
                        {"%"}
                      </h3>
                    </div>
                  </div>

                  <div className="announcement-news">
                    <div className="news-inner">
                      {Object.values(topPerformerModels)[9] ? (
                        <TvSplineAreaChartTopPerformer
                          model_name={
                            Object.values(topPerformerModels)[9].strategy_name
                          }
                        />
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> ) : null }

          {/* <div>
              <AdsensePlaceHolder />
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Forecasts;
