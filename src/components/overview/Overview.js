import React, { useState, useEffect, useRef } from "react";
import "./Overview.css";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Hidden, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { RiCheckboxBlankFill } from "react-icons/ri";
import texture from "../../assets/transparent.jpg";
import { useStateContext } from "../../ContextProvider";

const Overview = () => {
  const { position_stats_cache, Set_position_stats_cache } = useStateContext();
  const [position_analysis_stats, set_position_analysis_stats] = useState([]);
  useEffect(() => {
    if (Object.keys(position_stats_cache).length == 0) {
      fetch(
        "https://zt-rest-api-3hwk7v5hda-uc.a.run.app/get/position_percentage",
        {
          method: "get",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data["msg"].length);
          var stats = {};
          for (var i = 0; i < data["response"].length; i++) {
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
            stats[data["response"][i].time_horizon] = {
              long_percentage: data["response"][i].long_percentage,
              short_percentage: data["response"][i].short_percentage,
              forecast_time: dt_str,
            };
          }
          if (JSON.stringify(stats) !== "{}") {
            // console.log("Stats -->", stats);
            set_position_analysis_stats(stats);
            Set_position_stats_cache({ position_stats: stats });
          }
        })
        .catch((err) => console.log(err));
    } else {
      set_position_analysis_stats(position_stats_cache["position_stats"]);
    }
  }, []);
  const windowWidth = useRef(window.innerWidth);

  return (
    <div>
      {windowWidth.current <= 568 ? (
        <div className="overview-mobile">
          <div className="container">
            <div className="overview-text-indicator">
              <h2>Long vs Short Overview</h2>
              <div className="overview-indicators">
                <div className="indicator">
                  <RiCheckboxBlankFill className="indicator-long" />
                  <p>Long</p>
                </div>
                <div className="indicator">
                  <RiCheckboxBlankFill className="indicator-short" />
                  <p>Short</p>
                </div>
              </div>
            </div>
            <div className="overview-wapper">
              <div className="overview-wapper-top">
                <div className="overview-card">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>24h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["24h"]
                          ? position_analysis_stats["24h"].forecast_time
                          : "0"}
                      </p>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["24h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["24h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["24h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["24h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["24h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["24h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["24h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["24h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>12h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["12h"]
                          ? position_analysis_stats["12h"].forecast_time
                          : "0"}
                      </p>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["12h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["12h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["12h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["12h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["12h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["12h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["12h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["12h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>8h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["8h"]
                          ? position_analysis_stats["8h"].forecast_time
                          : "0"}
                      </p>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["8h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["8h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["8h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["8h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["8h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["8h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["8h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["8h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>6h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["6h"]
                          ? position_analysis_stats["6h"].forecast_time
                          : "0"}
                      </p>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["6h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["6h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["6h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["6h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["6h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["6h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["6h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["6h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
              </div>

              <div className="overview-wapper-bottom">
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>4h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["4h"]
                          ? position_analysis_stats["4h"].forecast_time
                          : "0"}
                      </p>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["4h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["4h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["4h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["4h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["4h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["4h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["4h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["4h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>3h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["3h"]
                          ? position_analysis_stats["3h"].forecast_time
                          : "0"}
                      </p>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["3h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["3h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["3h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["3h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["3h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["3h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["3h"]
                            ? position_analysis_stats["3h"].short_percentage
                            : "0"}
                          {"%"}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>2h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {/* {position_analysis_stats["2h"]
                      ? position_analysis_stats["2h"].forecast_time
                      : "0"} */}
                        0000-00-00 00:00
                      </p>
                    </div>
                  </div>
                  <div className="percentage-wapper-disable">
                    {/* <div className='percentage-long'>
                                <p>Long</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Short</p>
                            </div> */}
                  </div>
                  {/* <div className="percentage-wapper">
                {position_analysis_stats["2h"] ? (
                  <div
                    className="percentage-long"
                    style={{
                      width: `${position_analysis_stats["2h"].long_percentage}%`,
                    }}
                  >
                    <p>
                      {position_analysis_stats["2h"]
                        ? position_analysis_stats["2h"].long_percentage
                        : "0"}
                    </p>
                  </div>
                ) : (
                  "0"
                )}
                {position_analysis_stats["2h"] ? (
                  <div
                    className="percentage-short"
                    style={{
                      width: `${position_analysis_stats["2h"].short_percentage}%`,
                    }}
                  >
                    <p>
                      {position_analysis_stats["2h"]
                        ? position_analysis_stats["2h"].short_percentage
                        : "0"}
                    </p>
                  </div>
                ) : (
                  "0"
                )}
              </div> */}
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>1h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {/* {position_analysis_stats["1h"]
                      ? position_analysis_stats["1h"].forecast_time
                      : "0"} */}
                        0000-00-00 00:00
                      </p>
                    </div>
                  </div>
                  <div className="percentage-wapper-disable">
                    {/* <div className='percentage-long'>
                                <p>Long</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Short</p>
                            </div> */}
                  </div>
                  {/* <div className="percentage-wapper">
                {position_analysis_stats["1h"] ? (
                  <div
                    className="percentage-long"
                    style={{
                      width: `${position_analysis_stats["1h"].long_percentage}%`,
                    }}
                  >
                    <p>
                      {position_analysis_stats["1h"]
                        ? position_analysis_stats["1h"].long_percentage
                        : "0"}
                    </p>
                  </div>
                ) : (
                  "0"
                )}
                {position_analysis_stats["1h"] ? (
                  <div
                    className="percentage-short"
                    style={{
                      width: `${position_analysis_stats["1h"].short_percentage}%`,
                    }}
                  >
                    <p>
                      {position_analysis_stats["1h"]
                        ? position_analysis_stats["1h"].short_percentage
                        : "0"}
                    </p>
                  </div>
                ) : (
                  "0"
                )}
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overview">
          <div className="container">
            <div className="overview-text-indicator">
              <h2>
                Long vs Short Overview
                <Tooltip
                  title="Percentage of models currently predicting long and short for each
              time horizon."
                >
                  <IconButton>
                    <BsFillInfoCircleFill />
                  </IconButton>
                </Tooltip>
              </h2>
              <div className="overview-indicators">
                <div className="indicator">
                  <RiCheckboxBlankFill className="indicator-long" />
                  <p>Long</p>
                </div>
                <div className="indicator">
                  <RiCheckboxBlankFill className="indicator-short" />
                  <p>Short</p>
                </div>
              </div>
            </div>
            <div className="overview-wapper">
              <div className="overview-wapper-top">
                <div className="overview-card">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>24h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["24h"]
                          ? position_analysis_stats["24h"].forecast_time
                          : "0"}
                      </p>
                      <Tooltip title="Forecast time">
                        <IconButton>
                          <BsFillInfoCircleFill />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["24h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["24h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["24h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["24h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["24h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["24h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["24h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["24h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>12h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["12h"]
                          ? position_analysis_stats["12h"].forecast_time
                          : "0"}
                      </p>
                      <Tooltip title="Forecast time">
                        <IconButton>
                          <BsFillInfoCircleFill />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["12h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["12h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["12h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["12h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["12h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["12h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["12h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["12h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>8h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["8h"]
                          ? position_analysis_stats["8h"].forecast_time
                          : "0"}
                      </p>
                      <Tooltip title="Forecast time">
                        <IconButton>
                          <BsFillInfoCircleFill />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["8h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["8h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["8h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["8h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["8h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["8h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["8h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["8h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>6h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["6h"]
                          ? position_analysis_stats["6h"].forecast_time
                          : "0"}
                      </p>
                      <Tooltip title="Forecast time">
                        <IconButton>
                          <BsFillInfoCircleFill />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["6h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["6h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["6h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["6h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["6h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["6h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["6h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["6h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
              </div>

              <div className="overview-wapper-bottom">
                <div className="overview-card">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>4h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["4h"]
                          ? position_analysis_stats["4h"].forecast_time
                          : "0"}
                      </p>
                      <Tooltip title="Forecast time">
                        <IconButton>
                          <BsFillInfoCircleFill />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["4h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["4h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["4h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["4h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["4h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["4h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["4h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["4h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>3h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {position_analysis_stats["3h"]
                          ? position_analysis_stats["3h"].forecast_time
                          : "0"}
                      </p>
                      <Tooltip title="Forecast time">
                        <IconButton>
                          <BsFillInfoCircleFill />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="percentage-wapper">
                    {position_analysis_stats["3h"] ? (
                      <div
                        className="percentage-long"
                        style={{
                          width: `${position_analysis_stats["3h"].long_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["3h"].long_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["3h"].long_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                    {position_analysis_stats["3h"] ? (
                      <div
                        className="percentage-short"
                        style={{
                          width: `${position_analysis_stats["3h"].short_percentage}%`,
                        }}
                      >
                        <p>
                          {position_analysis_stats["3h"].short_percentage <
                          20 ? (
                            <p
                              style={{
                                visibility: "hidden",
                              }}
                            >
                              0
                            </p>
                          ) : (
                            `${position_analysis_stats["3h"].short_percentage}%`
                          )}
                        </p>
                      </div>
                    ) : (
                      "0"
                    )}
                  </div>
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>2h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {/* {position_analysis_stats["2h"]
                      ? position_analysis_stats["2h"].forecast_time
                      : "0"} */}
                        0000-00-00 00:00
                      </p>
                      <Tooltip title="Forecast time">
                        <IconButton>
                          <BsFillInfoCircleFill />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="percentage-wapper-disable">
                    {/* <div className='percentage-long'>
                                <p>Long</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Short</p>
                            </div> */}
                  </div>
                  {/* <div className="percentage-wapper">
                {position_analysis_stats["2h"] ? (
                  <div
                    className="percentage-long"
                    style={{
                      width: `${position_analysis_stats["2h"].long_percentage}%`,
                    }}
                  >
                    <p>
                      {position_analysis_stats["2h"]
                        ? position_analysis_stats["2h"].long_percentage
                        : "0"}
                    </p>
                  </div>
                ) : (
                  "0"
                )}
                {position_analysis_stats["2h"] ? (
                  <div
                    className="percentage-short"
                    style={{
                      width: `${position_analysis_stats["2h"].short_percentage}%`,
                    }}
                  >
                    <p>
                      {position_analysis_stats["2h"]
                        ? position_analysis_stats["2h"].short_percentage
                        : "0"}
                    </p>
                  </div>
                ) : (
                  "0"
                )}
              </div> */}
                </div>
                <div className="overview-card overview-ml">
                  <div className="overview-details">
                    <div className="time-stamp">
                      <p>1h Models</p>
                    </div>
                    <div className="date-stamp">
                      <p>
                        {/* {position_analysis_stats["1h"]
                      ? position_analysis_stats["1h"].forecast_time
                      : "0"} */}
                        0000-00-00 00:00
                      </p>
                      <Tooltip title="Forecast time">
                        <IconButton>
                          <BsFillInfoCircleFill />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="percentage-wapper-disable">
                    {/* <div className='percentage-long'>
                                <p>Long</p>
                            </div>
                            <div className='percentage-short'>
                                <p>Short</p>
                            </div> */}
                  </div>
                  {/* <div className="percentage-wapper">
                {position_analysis_stats["1h"] ? (
                  <div
                    className="percentage-long"
                    style={{
                      width: `${position_analysis_stats["1h"].long_percentage}%`,
                    }}
                  >
                    <p>
                      {position_analysis_stats["1h"]
                        ? position_analysis_stats["1h"].long_percentage
                        : "0"}
                    </p>
                  </div>
                ) : (
                  "0"
                )}
                {position_analysis_stats["1h"] ? (
                  <div
                    className="percentage-short"
                    style={{
                      width: `${position_analysis_stats["1h"].short_percentage}%`,
                    }}
                  >
                    <p>
                      {position_analysis_stats["1h"]
                        ? position_analysis_stats["1h"].short_percentage
                        : "0"}
                    </p>
                  </div>
                ) : (
                  "0"
                )}
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
