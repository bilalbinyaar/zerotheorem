import React, { memo } from "react";
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
import AdsensePlaceHolder from "../components/adsense/AdsensePlaceHolder";
import TradingViewWidgetGraph from "../components/models/graphs/TradingViewWidgetGraph";
import TradingViewSplineAreaChart from "../components/models/graphs/TradingViewSplineAreaChart";
const Models = () => {
  const location = useLocation();
  console.log("Pathname -->", location.pathname.replace("/", ""));
  const name = location.pathname.replace("/", "").replace("-", "_");

  // console.log("Name -->", name);
  // name = name.replace("-", "_");
  // console.log("This is name for cum pnl", location.state.model_name);
  return (
    <React.Fragment>
      <ModelDetails model_name={name} />
      {/* <TradingViewSplineAreaChart model_name={name} /> */}
      {/* <CurrentPosition /> */}
      {/* <CandleGraph /> */}
      <AdsensePlaceHolder />
      <CandleGraphCanvasjs model_name={name} />
      <TradingViewWidgetGraph />

      <CumulativePNL />
      <CanvasjsSplineAreaChartWithRangeSelecetor model_name={name} />

      {/* <CanvasjsSplineAreaChart model_name={name} /> */}
      {/* <CanvasSplineForcasteCard model_name={name} /> */}
      {/* <AreaLineChart model_name={name} /> */}
      {/* <LineRecharts model_name={name} /> */}
      {/* <NegativeChart model_name={name} /> */}
      <InDepth model_name={name} />
      <DrawDown />
      {/* <DrawdownCanvasjs model_name={name} /> */}
      <CanvasjsDrawdownWithSliderRange model_name={name} />
      <AdsensePlaceHolder />
      <GraphsTable model_name={name} />
      <RecentlyViewed model_name={name} />
    </React.Fragment>
  );
};

export default memo(Models);
