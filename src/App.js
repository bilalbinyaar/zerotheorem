import React, { useRef, memo, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Models from "./pages/Models";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginForm from "./components/loginPrompt/LoginForm";
import { useStateContext } from "./ContextProvider";
import Footer from "./components/footer/Footer";
import About from "./pages/About";
import Introduction from "./components/resources/resourcestextual/Introduction";
import FAQ from "./pages/FAQ";
import Compare from "./pages/Compare";
import AlternativeBassModelforAlpha from "../src/components/resources/derivations/AlternativeBassModelforAlpha";
import AlternativeFrechetModelforAlpha from "../src/components/resources/derivations/AlternativeFrechetModelforAlpha";
import AlternativeGumbelModelforAlpha from "../src/components/resources/derivations/AlternativeGumbelModelforAlpha";
import AlternativeShiftedGompertzModelforAlpha from "../src/components/resources/derivations/AlternativeShiftedGompertzModelforAlpha";
import AlternativeWeibulModelforAlpha from "../src/components/resources/derivations/AlternativeWeibulModelforAlpha";
import Derivations from "../src/components/resources/derivations/Derivations";
import FurtherDerivations from "../src/components/resources/derivations/FurtherDerivations";
import InvestigatingAlpha from "../src/components/resources/derivations/InvestigatingAlpha";
import RepresentationofaNewAssetClassviaSubstitution from "../src/components/resources/derivations/RepresentationofaNewAssetClassviaSubstitution";
import SensitivityAnalysisGeneralCase from "../src/components/resources/derivations/SensitivityAnalysisGeneralCase";
import SenstitivityAnalysisMarketSpecificAlpha from "../src/components/resources/derivations/SenstitivityAnalysisMarketSpecificAlpha";
import SenstitivityAnalysisSingleAlphaCas from "../src/components/resources/derivations/SenstitivityAnalysisSingleAlphaCas";
import TheGoverningEquation from "../src/components/resources/derivations/TheGoverningEquation";
import TheUnderlyingAssumptions from "../src/components/resources/derivations/TheUnderlyingAssumptions";
import { Helmet } from "react-helmet";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";

// import sitemap from "./sitemap.xml";
function Sitemap() {
  return (
    <div>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://zerotheorem.com/</loc>
          <lastmod>2023-03-13</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>https://zerotheorem.com/about</loc>
          <lastmod>2023-03-13</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>https://zerotheorem.com/resources</loc>
          <lastmod>2023-03-13</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>https://zerotheorem.com/faq</loc>
          <lastmod>2023-03-13</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>
      </urlset>{" "}
    </div>
  );
}
export const mySlice = createSlice({
  name: "mySlice",
  initialState: {
    myValue: "",
  },
  reducers: {
    setValue: (state, action) => {
      state.myValue = action.payload;
    },
  },
});
export const store = configureStore({
  reducer: mySlice.reducer,
});
function App() {
  const { Login, user, error, loading } = useStateContext();

  // SCROLL TO TOP
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  // SCROLL TO TOP

  return (
    // !loading && (
    //   <React.Fragment>
    //     {user.password !== "" ? (
    //       <div>
    //         <Navbar />
    //         <Routes basename="/zero-theorem">
    //           <Route path="/" element={<Home />} />
    //           <Route path="/derivations" element={<Introduction />} />
    //           <Route path="/:name" element={<Models />} />
    //           <Route path="/about" element={<About />} />
    //           <Route path="/faqs" element={<FAQ />} />
    //           <Route path="/compare" element={<Compare />} />

    //           {/* RESOURCES ROUTING FOR SUB ITEMS */}
    //           <Route path="/the-underlying-assumptions" element={<TheUnderlyingAssumptions />} />
    //           <Route path="/representation-of-a-new-asset-class-via-substitution" element={<RepresentationofaNewAssetClassviaSubstitution />} />
    //           <Route path="/the-governing-equation" element={<TheGoverningEquation />} />
    //           <Route path="/investigating-alpha" element={<InvestigatingAlpha />} />
    //           <Route path="/sensitivity-analysis-general-case" element={<SensitivityAnalysisGeneralCase />} />
    //           <Route path="/senstitivity-analysis-market-specific-alpha" element={<SenstitivityAnalysisMarketSpecificAlpha />} />
    //           <Route path="/senstitivity-analysis-single-alpha-case" element={<SenstitivityAnalysisSingleAlphaCas />} />
    //           <Route path="/derivations-details" element={<Derivations />} />
    //           <Route path="/further-derivations" element={<FurtherDerivations />} />
    //           <Route path="/alternative-bass-model-for-alpha" element={<AlternativeBassModelforAlpha />} />
    //           <Route path="/alternative-frechet-model-for-alpha" element={< AlternativeFrechetModelforAlpha/>} />
    //           <Route path="/alternative-weibul-model-for-alpha" element={<AlternativeWeibulModelforAlpha />} />
    //           <Route path="/alternative-gumbel-model-for-alpha" element={<AlternativeGumbelModelforAlpha />} />
    //           <Route path="/alternative-shifted-gompertz-model-for-alpha" element={<AlternativeShiftedGompertzModelforAlpha />} />

    //         </Routes>
    //         <Footer />
    //       </div>
    //     ) : (
    //       <div>
    //         <LoginForm Login={Login} error={error} />
    //         <Routes basename="/zero-theorem">
    //           <Route path="/sitemap.xml" component={Sitemap} />
    //         </Routes>
    //       </div>
    //     )}
    //   </React.Fragment>
    // )

    !loading && (
      <React.Fragment>
        <div>
          <Navbar />
          <Routes basename="/zero-theorem">
            <Route path="/" element={<Home />} />
            <Route path="/derivations" element={<Introduction />} />
            <Route path="/:name" element={<Models />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/compare" element={<Compare />} />

            {/* RESOURCES ROUTING FOR SUB ITEMS */}
            <Route
              path="/the-underlying-assumptions"
              element={<TheUnderlyingAssumptions />}
            />
            <Route
              path="/representation-of-a-new-asset-class-via-substitution"
              element={<RepresentationofaNewAssetClassviaSubstitution />}
            />
            <Route
              path="/the-governing-equation"
              element={<TheGoverningEquation />}
            />
            <Route
              path="/investigating-alpha"
              element={<InvestigatingAlpha />}
            />
            <Route
              path="/sensitivity-analysis-general-case"
              element={<SensitivityAnalysisGeneralCase />}
            />
            <Route
              path="/senstitivity-analysis-market-specific-alpha"
              element={<SenstitivityAnalysisMarketSpecificAlpha />}
            />
            <Route
              path="/senstitivity-analysis-single-alpha-case"
              element={<SenstitivityAnalysisSingleAlphaCas />}
            />
            <Route path="/derivations-details" element={<Derivations />} />
            <Route
              path="/further-derivations"
              element={<FurtherDerivations />}
            />
            <Route
              path="/alternative-bass-model-for-alpha"
              element={<AlternativeBassModelforAlpha />}
            />
            <Route
              path="/alternative-frechet-model-for-alpha"
              element={<AlternativeFrechetModelforAlpha />}
            />
            <Route
              path="/alternative-weibul-model-for-alpha"
              element={<AlternativeWeibulModelforAlpha />}
            />
            <Route
              path="/alternative-gumbel-model-for-alpha"
              element={<AlternativeGumbelModelforAlpha />}
            />
            <Route
              path="/alternative-shifted-gompertz-model-for-alpha"
              element={<AlternativeShiftedGompertzModelforAlpha />}
            />
          </Routes>
          <Footer />
        </div>

        {/* <div>
            <LoginForm Login={Login} error={error} />
            <Routes basename="/zero-theorem">
              <Route path="/sitemap.xml" component={Sitemap} />
            </Routes>
          </div> */}
      </React.Fragment>
    )
  );
}

export default memo(App);
