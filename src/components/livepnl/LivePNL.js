import React, { useEffect, useState } from "react";
import "./LivePNL.css";

const LivePNL = () => {
  const [stats, setStats] = useState([]);
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
  }, []);
  return (
    <div className="live-pnl">
      <div className="container">
        <h2>Live PNLS</h2>

        <div className="live-pnl-stats-div">
          <div className="overall-live overall-live-stats">
            <h3>Overall</h3>
            <h3 className="live-stats">
              {stats["4"]
                ? `${(
                    parseFloat(stats["0"].current_pnl) +
                    parseFloat(stats["1"].current_pnl) +
                    parseFloat(stats["2"].current_pnl) +
                    parseFloat(stats["3"].current_pnl) +
                    parseFloat(stats["4"].current_pnl)
                  ).toFixed(1)}%`
                : null}
            </h3>
          </div>

          <div className="divider-div-pnl-live"></div>

          <div className="strategies-live-stats">
            <div className="overall-live strategy-live-stats">
              <h3>{stats["0"] ? stats["0"].strategy_name : "Loading"}</h3>
              <h3 className="live-stats">
                {stats["0"] ? `${stats["0"].current_pnl}%` : null}
              </h3>
            </div>

            <div className="overall-live strategy-live-stats">
              <h3>{stats["1"] ? stats["1"].strategy_name : "Loading"}</h3>
              <h3 className="live-stats">
                {stats["1"] ? `${stats["1"].current_pnl}%` : null}
              </h3>
            </div>

            <div className="overall-live strategy-live-stats">
              <h3>{stats["2"] ? stats["2"].strategy_name : "Loading"}</h3>
              <h3 className="live-stats">
                {stats["2"] ? `${stats["2"].current_pnl}%` : null}
              </h3>
            </div>

            <div className="overall-live strategy-live-stats">
              <h3>{stats["3"] ? stats["3"].strategy_name : "Loading"}</h3>
              <h3 className="live-stats">
                {stats["3"] ? `${stats["3"].current_pnl}%` : null}
              </h3>
            </div>

            <div className="overall-live strategy-live-stats">
              <h3>{stats["4"] ? stats["4"].strategy_name : "Loading"}</h3>
              <h3 className="live-stats">
                {stats["4"] ? `${stats["4"].current_pnl}%` : null}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePNL;
