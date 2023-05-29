import React, { useEffect, memo, useState } from "react";
import { useLocation } from "react-router-dom";
import CumulativePNL from "../components/models/cumulativePNL/CumulativePNL";
import CurrentPosition from "../components/models/currentPosition/CurrentPosition";
import DrawDown from "../components/models/drawDown/DrawDown";
import CandleGraph from "../components/models/graphs/CandleGraph";
// import DrawDownChart from "../components/models/graphs/DrawDownChart";
import DrawdownCanvasjs from "../components/models/graphs/DrawdownCanvasjs";
import NegativeChart from "../components/models/graphs/NegativeChart";
import GraphsTable from "../components/models/graphsTable/GraphsTable";
import InDepth from "../components/models/inDepth/InDepth";
import ModelDetails from "../components/models/modelsDetails/ModelDetails";
import RecentlyViewed from "../components/recentlyViewed/RecentlyViewed";
import LineRecharts from "../components/models/graphs/LineRecharts";
import CanvasjsSplineAreaChart from "../components/models/graphs/CanvasjsSplineAreaChart";
// import AreaLineChart from "../components/models/graphs/AreaLineChart";
import CanvasSplineForcasteCard from "../components/models/graphs/CanvasSplineForcasteCard";
import CandleGraphCanvasjs from "../components/models/graphs/CandleGraphCanvasjs";
import IndividualPnlCanvasjs from "../components/models/graphs/IndividualPnlCanvasjs";
// import DrawdownCanvasjsSliderRange from "../components/models/graphs/DrawdownCanvasjsSliderRange";
import CanvasjsSplineAreaChartWithRangeSelecetor from "../components/models/graphs/CanvasjsSplineAreaChartWithRangeSelecetor";
import CanvasjsDrawdownWithSliderRange from "../components/models/graphs/CanvasjsDrawdownWithSliderRange";
import TradingViewSplineAreaChart from "../components/models/graphs/TvSplineAreaChart";
import TradingViewWidgetGraph from "../components/models/graphs/TradingViewWidgetGraph";
import { Helmet } from "react-helmet";
import Backtest from "./Backtest";
const Models = () => {
  const location = useLocation();
  // console.log("Pathname -->", location.pathname.replace("/", ""));
  const name = location.pathname.replace("/", "").replace("-", "_");
  // console.log("Here is model name -->", name);
  // if (name.includes("all-models")) {
  //   name = name.replace("all-models", "");
  //   set_model_name(name);
  // }
  const [model_name, set_model_name] = useState(name);
  if (name != model_name) {
    set_model_name(name);
  }
  // console.log("name is ", name);
  // console.log("Name -->", name);
  // name = name.replace("-", "_");
  // console.log("This is name for cum pnl", location.state.model_name);

  // SCROLL TO TOP
  const locationToTop = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationToTop.pathname]);
  // SCROLL TO TOP
  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | Forecast Model Details</title>
        <meta
          name="description"
          content="Detailed information about this AI-based Bitcoin prediction model's current position and historical performance including several metrics like sharpe, r2, sortino, win/loss etc."
        />
      </Helmet>
      <ModelDetails model_name={model_name} />
      {/* <CurrentPosition /> */}
      {/* <CandleGraph /> */}
      {/* <TradingViewWidgetGraph /> */}
      <CandleGraphCanvasjs model_name={model_name} />
      <Backtest model_name={model_name} />
      {/* <TradingViewSplineAreaChart model_name={name} /> */}
      {/* <TradingViewWidgetGraph /> */}

      {/* <CumulativePNL />
      <CanvasjsSplineAreaChartWithRangeSelecetor model_name={name} />
      <InDepth model_name={name} />
      <DrawDown />
      <CanvasjsDrawdownWithSliderRange model_name={name} />
      <GraphsTable model_name={name} />
      <RecentlyViewed model_name={name} /> */}
    </React.Fragment>
  );
};

export default memo(Models);
