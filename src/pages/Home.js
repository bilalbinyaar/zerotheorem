import React, { useState, useEffect, memo } from "react";
import Forecasts from "../components/forecasts/Forecasts";
import ModelDataGrid from "../components/modelDataGrid/ModelDataGrid";
import Overview from "../components/overview/Overview";
import Horizon from "../components/timeHorizon/Horizon";
import { useStateContext } from "../ContextProvider";
import { Helmet } from "react-helmet";
import BtcData from "../components/btc_api/BtcData";
import Documentation from "./Documentation";

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
      <Helmet>
        <title>
          Zero Theorem | An Economic Framework for Valuing (Forecasting) Bitcoin
          Price
        </title>
        <meta
          name="description"
          content="An economic framework for the prediction/forecast of Bitcoin and other cryptocurrencies using AI and ML models with a comprehensive evaluation of back and forward tests."
        />
        {/* CANONICAL TAG */}
        <link rel="canonical" href="https://zerotheorem.com/"/>
      </Helmet>
      {/* <BtcData /> */}
      {/* <Documentation /> */}
      <Forecasts />
      <ModelDataGrid />
      <Overview />
    </React.Fragment>
  );
};

export default memo(Home);
