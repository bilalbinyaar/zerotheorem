import { light } from "@mui/material/styles/createPalette";
import TradingViewWidget, {
  Themes,
  IntervalTypes,
} from "react-tradingview-widget";
// import "../containers/App.css";
import "../../../index.css";
import { useStateContext } from "../../../ContextProvider";

const TradingViewWidgetGraph = () => {
  const { theme } = useStateContext();

  const chartOverrides = {
    "paneProperties.background": "#00FF00 !important", // Set the background color to green
  };

  // Create a new object for the horizontal line
  const hlineObject = {
    // ID of the object (must be unique)
    id: "my-hline",
    // Type of the object (in this case, a horizontal line)
    type: "horizontal-line",
    // Price value of the horizontal line
    price: 22440.0,
    // Color of the horizontal line
    color: "red",
    // Line width of the horizontal line
    lineWidth: 20,
    // Show the price label of the horizontal line
    showLabel: true,
    // Text color of the price label
    textColor: "red",
    // Font size of the price label
    fontSize: 14,
  };

  return (
    <div className="candle-chart"> 
      <div class="container">
      {theme === "dark-theme" ? (
        <div>
          <h2 className="current-position-heading">Current Position</h2>

          <TradingViewWidget
            // symbol="NASDAQ:AAPL"
            theme={Themes.DARK}
            locale="eng"
            width="100%"
            // height="400px"
            // autosize
            // overrides={chartOverrides}
            symbol="BINANCE:BTCPERP"
            hide_top_toolbar={true}
            hide_side_toolbar={true}
            // studies={true}
            // hide_volume={true}
            // hide_last_price={true}
            hide_bottom_toolbar={true}
            // hide_legend={true}
            interval={1}
            // timeframe={"1"}
            // timeframe_id={"1"}
            // hide_legend={true}
            timezone="UTC"
            style="1"
            containerId="tv_chart_container"
            // locale="in"
            // Add the horizontal line to the chart
            // libraryPath="/charting_library/"
            // chartsStorageUrl="/charts/"
            // chartsStorageApiVersion="1.1"
            // onChartReady={(widget) => {
            //   widget.chart().createObject(hlineObject);
            // }}
          />
        </div>
      ) : (
        <div>
          <h2 className="current-position-heading">Current Position</h2>

          <TradingViewWidget
            // symbol="NASDAQ:AAPL"
            // theme={Themes.DAY}
            locale="eng"
            width="100%"
            // height="400px"
            // autosize
            // overrides={chartOverrides}
            symbol="BINANCE:BTCPERP"
            hide_top_toolbar={true}
            hide_side_toolbar={true}
            // studies={true}
            // hide_volume={true}
            // hide_last_price={true}
            hide_bottom_toolbar={true}
            // hide_legend={true}
            interval={1}
            // timeframe={"1"}
            // timeframe_id={"1"}
            // hide_legend={true}
            timezone="UTC"
            style="1"
            containerId="tv_chart_container"
            // locale="in"
            // Add the horizontal line to the chart
            // libraryPath="/charting_library/"
            // chartsStorageUrl="/charts/"
            // chartsStorageApiVersion="1.1"
            // onChartReady={(widget) => {
            //   widget.chart().createObject(hlineObject);
            // }}
          />
        </div>
      )}
      </div>
    </div>
    
  );
};

export default TradingViewWidgetGraph;
