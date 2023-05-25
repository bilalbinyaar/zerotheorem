import React, { useEffect, useState } from "react";
import "./LivePNL.css";
import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";



const LivePNL = () => {
  const [stats, setStats] = useState([]);
  const [timer_for_current, set_timer_for_current_position] = useState(null);

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

  //   useEffect(() => {
  //     fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_strategies", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // console.log(data["response"].length);
  //         var data_for_strategies = {};
  //         var model_names = [];
  //         var coin_names = [];
  //         var unique_coins = {};
  //         var index = 0;
  //         for (var i = 0; i < data["response"].length; i++) {
  //           model_names.push({
  //             label: data["response"][i].strategy_name.replace("_", "-"),
  //             value: data["response"][i].time_horizon,
  //             currency: data["response"][i].currency,
  //           });
  //           if (!unique_coins[data["response"][i].currency]) {
  //             unique_coins[data["response"][i].currency] = 1;
  //             coin_names.push({
  //               label: data["response"][i].currency,
  //               // value: i,
  //             });
  //           }
  //           var dt = new Date(
  //             parseInt(data["response"][i].forecast_time) * 1000
  //           ).toLocaleString();
  //           var year = dt.split("/")[2].split(",")[0];
  //           var month = dt.split("/")[0];
  //           if (month.length == 1) {
  //             month = "0" + month;
  //           }
  //           var day = dt.split("/")[1];
  //           if (day.length == 1) {
  //             day = "0" + day;
  //           }
  //           var hours = dt.split(", ")[1].split(":")[0];
  //           if (hours.length == 1) {
  //             hours = "0" + hours;
  //           }
  //           var minutes = dt.split(":")[1];
  //           if (minutes.length == 1) {
  //             minutes = "0" + minutes;
  //           }
  //           var curr_time_version = dt.split(" ")[2];
  //           if (curr_time_version == "PM") {
  //             hours = parseInt(hours) + 12;
  //           }
  //           var dt_str =
  //             year + "-" + month + "-" + day + " " + hours + ":" + minutes;
  //           data_for_strategies["" + i] = {
  //             current_position: data["response"][i].current_position,
  //             time_horizon: data["response"][i].time_horizon,
  //             currency: data["response"][i].currency,
  //             date_started: data["response"][i].date_started,
  //             entry_price: data["response"][i].entry_price,
  //             forecast_time: dt_str,
  //             next_forecast: data["response"][i].next_forecast,
  //             current_price: data["response"][i].current_price,
  //             strategy_name: data["response"][i].strategy_name,
  //             current_pnl: data["response"][i].current_pnl,
  //             position_start_time: data["response"][i].position_start_time,
  //           };
  //         }
  //         if (JSON.stringify(data_for_strategies) !== "{}") {
  //           setStats(data_for_strategies);
  //           //  console.log("Strategies final -->", data_for_strategies);
  //           // console.log("Here are model names --->", model_names);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  useEffect(() => {
    try {
      if (timer_for_current == null) {
        fetch(
          "https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_strategies",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            },
          }
        )
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
              data_for_strategies["" + i] = {
                current_position: data["response"][i].current_position,
                time_horizon: data["response"][i].time_horizon,
                currency: data["response"][i].currency,
                date_started: data["response"][i].date_started,
                entry_price: data["response"][i].entry_price,
                forecast_time: dt_str,
                next_forecast: data["response"][i].next_forecast,
                current_price: data["response"][i].current_price,
                strategy_name: data["response"][i].strategy_name,
                current_pnl: data["response"][i].current_pnl,
                portfolio_live_pnl_percent:
                  data["response"][i].portfolio_live_pnl_percent,
                position_start_time: data["response"][i].position_start_time,
              };
            }
            if (JSON.stringify(data_for_strategies) !== "{}") {
              setStats(data_for_strategies);
              //  console.log("Strategies final -->", data_for_strategies);
              // console.log("Here are model names --->", model_names);
            }
          })
          .catch((err) => console.log(err));
      }
      setTimeout(() => {
        fetch(
          "https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_strategies",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
            },
          }
        )
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
              data_for_strategies["" + i] = {
                current_position: data["response"][i].current_position,
                time_horizon: data["response"][i].time_horizon,
                currency: data["response"][i].currency,
                date_started: data["response"][i].date_started,
                entry_price: data["response"][i].entry_price,
                forecast_time: dt_str,
                next_forecast: data["response"][i].next_forecast,
                current_price: data["response"][i].current_price,
                strategy_name: data["response"][i].strategy_name,
                current_pnl: data["response"][i].current_pnl,
                portfolio_live_pnl_percent:
                  data["response"][i].portfolio_live_pnl_percent,
                position_start_time: data["response"][i].position_start_time,
              };
            }
            if (JSON.stringify(data_for_strategies) !== "{}") {
              setStats(data_for_strategies);
              //  console.log("Strategies final -->", data_for_strategies);
              // console.log("Here are model names --->", model_names);
            }
          })
          .catch((err) => console.log(err));
        set_timer_for_current_position(new Date());
      }, 60000);
    } catch (error) {
      console.log("Error occured");
    }
  }, [timer_for_current]);
  return (
    <div className="live-pnl">
      <div className="container">
        <h2>Live PNLs</h2>

        <div className="live-pnl-stats-div">
          <div className="overall-live overall-live-stats">
            <h3>Overall</h3>
            <h3
              //   className="live-stats"
              id="pnl-color5"
              onChange={
                stats["4"]
                  ? forColor(
                      `${(
                        parseFloat(stats["0"].portfolio_live_pnl_percent) +
                        parseFloat(stats["1"].portfolio_live_pnl_percent) +
                        parseFloat(stats["2"].portfolio_live_pnl_percent) +
                        parseFloat(stats["3"].portfolio_live_pnl_percent) +
                        parseFloat(stats["4"].portfolio_live_pnl_percent)
                      ).toFixed(2)}`,
                      "pnl-color5"
                    )
                  : null
              }
            >
              {stats["4"]
                ? `${(
                    parseFloat(stats["0"].portfolio_live_pnl_percent) +
                    parseFloat(stats["1"].portfolio_live_pnl_percent) +
                    parseFloat(stats["2"].portfolio_live_pnl_percent) +
                    parseFloat(stats["3"].portfolio_live_pnl_percent) +
                    parseFloat(stats["4"].portfolio_live_pnl_percent)
                  ).toFixed(2)}%`
                : null}
            </h3>
          </div>

          <div className="divider-div-pnl-live"></div>

          <div className="strategies-live-stats">
              <div className="overall-live strategy-live-stats">
                <div className="link-icon-div">
                  <h3>{stats["0"] ? <Link to = {stats["0"].strategy_name}>{stats["0"].strategy_name} </Link>: "Loading"}</h3>
                  <BiLinkExternal className="model-link-icon" />
                </div>
                <h3
                  className="live-stats"
                  id="pnl-color1"
                  onChange={
                    stats["0"]
                      ? forColor(
                          `${parseFloat(stats["0"].portfolio_live_pnl_percent)}`,
                          "pnl-color1"
                        )
                      : null
                  }
                >
                  {stats["0"]
                    ? `${stats["0"].portfolio_live_pnl_percent}%`
                    : null}
                </h3>
              </div>
            <div className="overall-live strategy-live-stats live-state-ml">
                <div className="link-icon-div">
                  <h3>{stats["1"] ? <Link to = {stats["1"].strategy_name}>{stats["1"].strategy_name} </Link>: "Loading"}</h3>
                  <BiLinkExternal className="model-link-icon" />
                </div>
              <h3
                className="live-stats"
                id="pnl-color2"
                onChange={
                  stats["1"]
                    ? forColor(
                        `${parseFloat(stats["1"].portfolio_live_pnl_percent)}`,
                        "pnl-color2"
                      )
                    : null
                }
              >
                {stats["1"]
                  ? `${stats["1"].portfolio_live_pnl_percent}%`
                  : null}
              </h3>
            </div>

            <div className="overall-live strategy-live-stats">
              
                <div className="link-icon-div">
                  <h3>{stats["2"] ? <Link to = {stats["2"].strategy_name}>{stats["2"].strategy_name} </Link>: "Loading"}</h3>
                  <BiLinkExternal className="model-link-icon" />
                </div>
              <h3
                className="live-stats"
                id="pnl-color3"
                onChange={
                  stats["2"]
                    ? forColor(
                        `${parseFloat(stats["2"].portfolio_live_pnl_percent)}`,
                        "pnl-color3"
                      )
                    : null
                }
              >
                {stats["2"]
                  ? `${stats["2"].portfolio_live_pnl_percent}%`
                  : null}
              </h3>
            </div>

            <div className="overall-live strategy-live-stats live-state-ml">
              
              <div className="link-icon-div">
                  <h3>{stats["3"] ? <Link to = {stats["3"].strategy_name}>{stats["3"].strategy_name} </Link>: "Loading"}</h3>
                  <BiLinkExternal className="model-link-icon" />
                </div>
              <h3
                className="live-stats"
                id="pnl-color4"
                onChange={
                  stats["3"]
                    ? forColor(
                        `${parseFloat(stats["3"].portfolio_live_pnl_percent)}`,
                        "pnl-color4"
                      )
                    : null
                }
              >
                {stats["3"]
                  ? `${stats["3"].portfolio_live_pnl_percent}%`
                  : null}
              </h3>
            </div>

            <div className="overall-live strategy-live-stats">
              
                <div className="link-icon-div">
                  <h3>{stats["4"] ? <Link to = {stats["4"].strategy_name}>{stats["4"].strategy_name} </Link>: "Loading"}</h3>
                  <BiLinkExternal className="model-link-icon" />
                </div>
              <h3
                className="live-stats"
                id="pnl-color6"
                onChange={
                  stats["4"]
                    ? forColor(
                        `${parseFloat(stats["4"].portfolio_live_pnl_percent)}`,
                        "pnl-color6"
                      )
                    : null
                }
              >
                {stats["4"]
                  ? `${stats["4"].portfolio_live_pnl_percent}%`
                  : null}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePNL;
