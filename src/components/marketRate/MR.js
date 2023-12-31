import React, { useEffect, useState } from "react";
import ScatterPlotApexCharts from "../models/graphs/ScatterPlotApexCharts";

const MR = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    try {
      fetch(`https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get/live_pnls`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const temp_data = [];

          // for (let i = 0; i < data["response"].length; i++) {
          temp_data.push([
            data["response"][0].intercept,
            data["response"][0].gradient,
          ]);

          if (temp_data.length != 0) {
            setStats(temp_data);
            console.log(temp_data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="market-dr">
      <h2 className="for-mb-returns">Market Comparison Rate</h2>
      <div className="inter-grad for-mb-returns">
        <div className="inter-grad-sep">
          <h3>Intercept : </h3>
          <h3 className="fw-inter-grad ml-inner-inter-grad">
            {stats[0] ? stats[0][0] : null}
          </h3>
        </div>
        <div className="inter-grad-sep ml-inter-grad">
          <h3>Gradient : </h3>
          <h3 className="fw-inter-grad ml-inner-inter-grad">
            {stats[0] ? stats[0][1] : null}
          </h3>
        </div>
      </div>
      <ScatterPlotApexCharts />
    </div>
  );
};

export default MR;
