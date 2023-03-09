import React, { useState, useEffect, memo } from "react";
import Forecasts from "../components/forecasts/Forecasts";
import ModelDataGrid from "../components/modelDataGrid/ModelDataGrid";
import Overview from "../components/overview/Overview";
import Horizon from "../components/timeHorizon/Horizon";
import { useStateContext } from "../ContextProvider";

const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      <Forecasts />
      <ModelDataGrid />
      <Overview />
    </React.Fragment>
  );
};

export default memo(Home);
