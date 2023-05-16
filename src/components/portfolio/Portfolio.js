import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import { useStateContext } from "../../ContextProvider";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { MathComponent } from "mathjax-react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
const Portfolio = () => {
  const [timer_for_current, set_timer_for_current_position] = useState(null);
  const [stats, setStats] = useState(null);
  const { theme, authCheckLoginInvestor } = useStateContext();
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
  useEffect(() => {
    if (timer_for_current == null) {
      fetch(`https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_returns`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const temp_data = {};
          // console.log(
          //   "Finally btc data -->",
          //   new Date(parseInt(data["response"][0].timestamp) * 1000)
          // );

          for (let i = 0; i < data["response"].length; i++) {
            temp_data["live_pnls"] = {
              pnl_all: data["response"][i].pnl_all,
              pnl_1: data["response"][i].pnl_1,
              pnl_7: data["response"][i].pnl_7,
              pnl_30: data["response"][i].pnl_30,
              pnl_60: data["response"][i].pnl_60,
            };
          }

          if (temp_data.length != 0) {
            setStats(temp_data);
            console.log("Here is stats -->", temp_data);
            // console.log("Here is the data for current position", temp_data);
          }
        });
    }
    setTimeout(() => {
      fetch(`https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_returns`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const temp_data = {};
          // console.log(
          //   "Finally btc data -->",
          //   new Date(parseInt(data["response"][0].timestamp) * 1000)
          // );

          for (let i = 0; i < data["response"].length; i++) {
            temp_data["live_pnls"] = {
              pnl_all: data["response"][i].pnl_all,
              pnl_1: data["response"][i].pnl_1,
              pnl_7: data["response"][i].pnl_7,
              pnl_30: data["response"][i].pnl_30,
              pnl_60: data["response"][i].pnl_60,
            };
          }

          if (temp_data.length != 0) {
            setStats(temp_data);
            // console.log("Here is the data for current position", temp_data);
          }
        });
      set_timer_for_current_position(new Date());
    }, 60000);
  }, [timer_for_current]);
  return (
    <div id="forecasts" className="forecasts">
      <div className="container">
        {/* {authCheckLoginInvestor == true ? (null) : ()} */}
          <div className="top-div">
            <h1>Performance</h1>
          </div>
        
        

        {authCheckLoginInvestor == true ? (null) : (
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
        )}
        

            {authCheckLoginInvestor == true ? (
              <div className="portfolio-stats pt-0">
          <div className="today-stats for-flex-col">
            <h2>Overall Return</h2>
            <div className="portfolio-stats-percentage" id="pnl-bg">
              {stats ? (
                stats["live_pnls"].pnl_all >= 0 ? (
                  <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                ) : (
                  <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                )
              ) : null}
              <p
                id="pnl-color10"
                onChange={
                  stats
                    ? forColor(
                        parseInt(stats["live_pnls"].pnl_all),
                        "pnl-color10"
                      )
                    : null
                }
              >
                {stats ? `${stats["live_pnls"].pnl_all}%` : null}
              </p>
            </div>
          </div>

          {/* <div className="today-stats for-space-between"> */}
          {/* <div className="overall-stats for-space-between portfolio-ml">
                <h3>Today</h3>
                <div className="portfolio-stats-percentage" id="pnl-bg">
                  <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  <p>
                    2.12%
                  </p>
                </div>
            </div> */}

          <div className="pnl-stats-bar for-space-between portfolio-ml">
            <div className="pnl-day-stats for-flex-col">
              <h3>Today</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats ? (
                  stats["live_pnls"].pnl_1 >= 0 ? (
                    <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  ) : (
                    <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                  )
                ) : null}
                <p
                  id="pnl-color10"
                  onChange={
                    stats
                      ? forColor(
                          parseInt(stats["live_pnls"].pnl_1),
                          "pnl-color10"
                        )
                      : null
                  }
                >
                  {stats ? `${stats["live_pnls"].pnl_1}%` : null}
                </p>
              </div>
            </div>

            <div className="divider-div-pnl-stats"></div>

            <div className="pnl-day-stats for-flex-col">
              <h3>7-Day</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats ? (
                  stats["live_pnls"].pnl_7 >= 0 ? (
                    <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  ) : (
                    <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                  )
                ) : null}
                <p
                  id="pnl-color10"
                  onChange={
                    stats
                      ? forColor(
                          parseInt(stats["live_pnls"].pnl_7),
                          "pnl-color10"
                        )
                      : null
                  }
                >
                  {stats ? `${stats["live_pnls"].pnl_7}%` : null}
                </p>
              </div>
            </div>

            <div className="divider-div-pnl-stats"></div>

            <div className="pnl-day-stats for-flex-col">
              <h3>30-Day</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats ? (
                  stats["live_pnls"].pnl_30 >= 0 ? (
                    <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  ) : (
                    <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                  )
                ) : null}
                <p
                  id="pnl-color10"
                  onChange={
                    stats
                      ? forColor(
                          parseInt(stats["live_pnls"].pnl_30),
                          "pnl-color10"
                        )
                      : null
                  }
                >
                  {stats ? `${stats["live_pnls"].pnl_30}%` : null}
                </p>
              </div>
            </div>

            <div className="divider-div-pnl-stats"></div>

            <div className="pnl-day-stats for-flex-col">
              <h3>60-Day</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats ? (
                  stats["live_pnls"].pnl_60 >= 0 ? (
                    <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  ) : (
                    <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                  )
                ) : null}
                <p
                  id="pnl-color10"
                  onChange={
                    stats
                      ? forColor(
                          parseInt(stats["live_pnls"].pnl_60),
                          "pnl-color10"
                        )
                      : null
                  }
                >
                  {stats ? `${stats["live_pnls"].pnl_60}%` : null}
                </p>
              </div>
            </div>
          </div>
        </div>
            ) : ( 
              <div className="portfolio-stats">
          <div className="today-stats for-flex-col">
            <h2>Overall Return</h2>
            <div className="portfolio-stats-percentage" id="pnl-bg">
              {stats ? (
                stats["live_pnls"].pnl_all >= 0 ? (
                  <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                ) : (
                  <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                )
              ) : null}
              <p
                id="pnl-color10"
                onChange={
                  stats
                    ? forColor(
                        parseInt(stats["live_pnls"].pnl_all),
                        "pnl-color10"
                      )
                    : null
                }
              >
                {stats ? `${stats["live_pnls"].pnl_all}%` : null}
              </p>
            </div>
          </div>

          {/* <div className="today-stats for-space-between"> */}
          {/* <div className="overall-stats for-space-between portfolio-ml">
                <h3>Today</h3>
                <div className="portfolio-stats-percentage" id="pnl-bg">
                  <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  <p>
                    2.12%
                  </p>
                </div>
            </div> */}

          <div className="pnl-stats-bar for-space-between portfolio-ml">
            <div className="pnl-day-stats for-flex-col">
              <h3>Today</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats ? (
                  stats["live_pnls"].pnl_1 >= 0 ? (
                    <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  ) : (
                    <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                  )
                ) : null}
                <p
                  id="pnl-color10"
                  onChange={
                    stats
                      ? forColor(
                          parseInt(stats["live_pnls"].pnl_1),
                          "pnl-color10"
                        )
                      : null
                  }
                >
                  {stats ? `${stats["live_pnls"].pnl_1}%` : null}
                </p>
              </div>
            </div>

            <div className="divider-div-pnl-stats"></div>

            <div className="pnl-day-stats for-flex-col">
              <h3>7-Day</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats ? (
                  stats["live_pnls"].pnl_7 >= 0 ? (
                    <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  ) : (
                    <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                  )
                ) : null}
                <p
                  id="pnl-color10"
                  onChange={
                    stats
                      ? forColor(
                          parseInt(stats["live_pnls"].pnl_7),
                          "pnl-color10"
                        )
                      : null
                  }
                >
                  {stats ? `${stats["live_pnls"].pnl_7}%` : null}
                </p>
              </div>
            </div>

            <div className="divider-div-pnl-stats"></div>

            <div className="pnl-day-stats for-flex-col">
              <h3>30-Day</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats ? (
                  stats["live_pnls"].pnl_30 >= 0 ? (
                    <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  ) : (
                    <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                  )
                ) : null}
                <p
                  id="pnl-color10"
                  onChange={
                    stats
                      ? forColor(
                          parseInt(stats["live_pnls"].pnl_30),
                          "pnl-color10"
                        )
                      : null
                  }
                >
                  {stats ? `${stats["live_pnls"].pnl_30}%` : null}
                </p>
              </div>
            </div>

            <div className="divider-div-pnl-stats"></div>

            <div className="pnl-day-stats for-flex-col">
              <h3>60-Day</h3>
              <div className="portfolio-stats-percentage" id="pnl-bg">
                {stats ? (
                  stats["live_pnls"].pnl_60 >= 0 ? (
                    <AiFillCaretUp className="model-details-left-top-percentage-icon " />
                  ) : (
                    <AiFillCaretDown className="model-details-left-top-percentage-icon " />
                  )
                ) : null}
                <p
                  id="pnl-color10"
                  onChange={
                    stats
                      ? forColor(
                          parseInt(stats["live_pnls"].pnl_60),
                          "pnl-color10"
                        )
                      : null
                  }
                >
                  {stats ? `${stats["live_pnls"].pnl_60}%` : null}
                </p>
              </div>
            </div>
          </div>
        </div>
            )}
        
      </div>
    </div>
  );
};

export default Portfolio;
