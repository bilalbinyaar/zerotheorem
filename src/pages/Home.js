import React, { useState, useEffect, memo } from "react";
import AdsensePlaceHolder from "../components/adsense/AdsensePlaceHolder";
import Forecasts from "../components/forecasts/Forecasts";
import ModelDataGrid from "../components/modelDataGrid/ModelDataGrid";
import Horizon from "../components/timeHorizon/Horizon";
import { useStateContext } from "../ContextProvider";
// import { Line_chart_recharts } from "../components/models/graphs/Line_chart_recharts";
// import { CircleLoader } from "react-spinners/CircleLoader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  // console.log("Home in dark mode");
  return (
    <React.Fragment>
      {/* <Line_chart_recharts /> */}
      <Forecasts />
      <AdsensePlaceHolder />
      {/* <Horizon /> */}
      <ModelDataGrid />
    </React.Fragment>
  );
};

export default memo(Home);
