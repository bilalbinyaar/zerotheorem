import React from "react";
// import CompareComponent from "../components/compare/CompareComponent";
import { Helmet } from "react-helmet";
import CompareComponentStrategies from "../components/compare/CompareComponentStrategies";
const CompareStrategies = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Zero Theorem | Comparison between Models</title>
        <meta
          name="description"
          content="Compare the information and performance metrics of different AI and ML models used in forecasting by applying different filters on time horizons, cryptocurrencies, and model names."
        />
        {/* Add other meta tags here */}
      </Helmet>
      <CompareComponentStrategies />
    </React.Fragment>
  );
};

export default CompareStrategies;
