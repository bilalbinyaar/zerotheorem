// import { light } from "@mui/material/styles/createPalette";
// import TradingViewWidget, {
//   Themes,
//   IntervalTypes,
// } from "react-tradingview-widget";
// // import "../containers/App.css";
// import "../../../index.css";
// import { useStateContext } from "../../../ContextProvider";

// const TradingViewWidgetGraph = () => {
//   const { theme } = useStateContext();

//   const chartOverrides = {
//     "paneProperties.background": "rgba(10, 0, 0, 0)",
//     "paneProperties.vertGridProperties.color": "rgba(10, 0, 0, 0)",
//     "paneProperties.horzGridProperties.color": "rgba(10, 0, 0, 0)",
//     "symbolWatermarkProperties.transparency": 100,
//   };

//   // Create a new object for the horizontal line
//   const hlineObject = {
//     // ID of the object (must be unique)
//     id: "my-hline",
//     // Type of the object (in this case, a horizontal line)
//     type: "horizontal-line",
//     // Price value of the horizontal line
//     price: 22300.0,
//     // Color of the horizontal line
//     color: "#FFFFFF",
//     // Line width of the horizontal line
//     lineWidth: 2,
//     // Show the price label of the horizontal line
//     showLabel: true,
//     // Text color of the price label
//     textColor: "#FFFFFF",
//     // Font size of the price label
//     fontSize: 14,
//   };

//   return (
//     <div class="container">
//       {theme === "dark-theme" ? (
//         <TradingViewWidget
//           // symbol="NASDAQ:AAPL"
//           theme={Themes.DARK}
//           locale="fr"
//           width="100%"
//           // autosize
//           overrides={chartOverrides}
//           symbol="BINANCE:BTCPERP"
//           hide_top_toolbar={true}
//           hide_side_toolbar={true}
//           studies={true}
//           hide_bottom_toolbar={true}
//           hide_legend={true}
//           interval={1}
//           // timeframe={"1"}
//           // timeframe_id={"1"}
//           // hide_legend={true}
//           timezone="Etc/UTC+5"
//           style="1"
//           containerId="tv_chart_container"
//           // locale="in"
//           // Add the horizontal line to the chart
//           libraryPath="/charting_library/"
//           chartsStorageUrl="/charts/"
//           chartsStorageApiVersion="1.1"
//           onReady={(widget) => {
//             widget.chart().createObject(hlineObject);
//           }}
//         />
//       ) : (
//         <TradingViewWidget
//           // symbol="NASDAQ:AAPL"
//           // theme={light}
//           locale="fr"
//           width="100%"
//           // height="100%"
//           // autosize
//           overrides={chartOverrides}
//           symbol="BINANCE:BTCPERP"
//           hide_top_toolbar={true}
//           // hide_side_toolbar={true}
//           studies={true}
//           hide_bottom_toolbar={true}
//           hide_legend={true}
//           interval={1}
//           // timeframe={"1"}
//           // timeframe_id={"1"}
//           // hide_legend={true}
//           timezone="Etc/UTC+5"
//           style="1"
//           containerId="tv_chart_container"
//           // locale="in"
//           // Add the horizontal line to the chart
//           libraryPath="/charting_library/"
//           chartsStorageUrl="/charts/"
//           chartsStorageApiVersion="1.1"
//           onReady={(widget) => {
//             widget.chart().createObject(hlineObject);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default TradingViewWidgetGraph;
