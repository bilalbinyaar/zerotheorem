import React, { useRef, memo } from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Models from "./pages/Models";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginPrompt/LoginForm";
import { useStateContext } from "./ContextProvider";
import Footer from "./components/footer/Footer";
import About from "./pages/About";
import Introduction from "./components/resources/resourcestextual/Introduction";
import EconomicLiterature from "./components/resources/resourcestextual/critiqueLiterature/EconomicLiterature";
import PP from "./components/resources/resourcestextual/theZT/PP";
import Test from "./pages/Test";
import RL from "./components/resources/resourcestextual/critiqueLiterature/RL";
import MarketSubstitution from "./components/resources/resourcestextual/theZT/MarketSubstitution";
import Assets from "./components/resources/resourcestextual/theZT/Assets";
import ParticularModel from "./components/resources/resourcestextual/generalisedModel/ParticularModel";
import Wk from "./components/resources/resourcestextual/generalisedModel/Wk";
import VelocityConsideration from "./components/resources/resourcestextual/generalisedModel/VelocityConsideration";
import OutputConsideration from "./components/resources/resourcestextual/generalisedModel/OutputConsideration";
import AbsorptionConsideration from "./components/resources/resourcestextual/generalisedModel/AbsorptionConsideration";
import BassModel from "./components/resources/resourcestextual/generalisedModel/BassModel";
import SwrtVelocity from "./components/resources/resourcestextual/sa-generalFramework/generalised/SwrtVelocity";
import SwrtOutput from "./components/resources/resourcestextual/sa-generalFramework/generalised/SwrtOutput";
import SwrtAP from "./components/resources/resourcestextual/sa-generalFramework/generalised/SwrtAP";
import SwrtUsk from "./components/resources/resourcestextual/sa-generalFramework/generalised/SwrtUsk";
import SwrtBassModel from "./components/resources/resourcestextual/sa-generalFramework/particular/SwrtBassModel";
import SwrtVolume from "./components/resources/resourcestextual/sa-generalFramework/particular/SwrtVolume";
import WrtVelocity from "./components/resources/resourcestextual/sa-generalFramework/particular/WrtVelocity";
import SwrtOtParameters from "./components/resources/resourcestextual/sa-generalFramework/particular/SwrtOtParameters";
import SensitivityWrtTransactions from "./components/resources/resourcestextual/singleAssetCase/caseParticular/SensitivityWrtTransactions";
import SensitivityWrtAssetVolume from "./components/resources/resourcestextual/singleAssetCase/caseParticular/SensitivityWrtAssetVolume";
import SensitivityWrtAbsorption from "./components/resources/resourcestextual/singleAssetCase/general/SensitivityWrtAbsorption";
import SensitivityWrtAssetPrice from "./components/resources/resourcestextual/singleAssetCase/general/SensitivityWrtAssetPrice";
import SensitivityWrtBassModelParameters from "./components/resources/resourcestextual/singleAssetCase/SensitivityWrtBassModelParameters";
import RandD from "./components/resources/resourcestextual/initZT/RandD";
import TestingSplit from "./components/resources/resourcestextual/initZT/TestingSplit";
import LearningAlgo from "./components/resources/resourcestextual/initZT/LearningAlgo";
import RewardFunction from "./components/resources/resourcestextual/initZT/RewardFunction";
import ActionSpace from "./components/resources/resourcestextual/initZT/ActionSpace";
import SV from "./components/resources/resourcestextual/initZT/SV";
import FrechetDerivation from "./components/resources/derivations/FrechetDerivation";
import GompertzDerivation from "./components/resources/derivations/GompertzDerivation";
import WeibullDerivation from "./components/resources/derivations/WeibullDerivation";
import GumbelDerivation from "./components/resources/derivations/GumbelDerivation";
import References1 from "./components/resources/resourcestextual/References1";
import Dedication from "./components/resources/resourcestextual/Dedication";
import FAQ from "./pages/FAQ";
import SimplifiedVariant from "./components/resources/resourcestextual/initialSolution/SimplifiedVariant";
import Reinforcement from "./components/resources/resourcestextual/initialSolution/Reinforcement";
import ProblemFormulataion from "./components/resources/resourcestextual/initialSolution/ProblemFormulataion";
import DRL from "./components/resources/resourcestextual/initialSolution/DRL";
import ExperimentalResults from "./components/resources/resourcestextual/initialSolution/ExperimentalResults";

function App() {
  const { Login, user, error, loading } = useStateContext();

  return (
    !loading && (
      <React.Fragment>
        {user.password !== "" ? (
          <div>
            <Navbar />
            <Routes basename="/zero-theorem">
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Introduction />} />
              <Route path="/:name" element={<Models />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />

              {/* RESOURCES ROUTING FOR MAIN ITEMS */}
              <Route path="/resources" element={<Introduction />} />
              {/* RESOURCES ROUTING FOR SUB ITEMS */}
              <Route
                path="/resources/economic-literature"
                element={<EconomicLiterature />}
              />
              <Route
                path="/resources/reinforcement-learning"
                element={<RL />}
              />
              <Route path="/resources/purchase-power" element={<PP />} />
              <Route
                path="/resources/market-substitution"
                element={<MarketSubstitution />}
              />
              <Route path="/resources/assets" element={<Assets />} />
              <Route
                path="/resources/particular-model"
                element={<ParticularModel />}
              />
              <Route path="/resources/wk" element={<Wk />} />
              <Route
                path="/resources/velocity-consideration"
                element={<VelocityConsideration />}
              />
              <Route
                path="/resources/frechet-derivation"
                element={<FrechetDerivation />}
              />
              <Route
                path="/resources/gumbel-derivation"
                element={<GumbelDerivation />}
              />
              <Route
                path="/resources/gompertz-derivation"
                element={<GompertzDerivation />}
              />
              <Route
                path="/resources/weibull-derivation"
                element={<WeibullDerivation />}
              />
              <Route path="/resources/references-1" element={<References1 />} />
              <Route
                path="/resources/output-consideration"
                element={<OutputConsideration />}
              />
              <Route
                path="/resources/absorption-consideration"
                element={<AbsorptionConsideration />}
              />
              <Route path="/resources/bass-model" element={<BassModel />} />
              <Route
                path="/resources/general-framework/sensitivity-wrt-velocity"
                element={<SwrtVelocity />}
              />
              <Route
                path="/resources/general-framework/sensitivity-wrt-output"
                element={<SwrtOutput />}
              />
              <Route
                path="/resources/general-framework/sensitivity-wrt-asset-price"
                element={<SwrtAP />}
              />
              <Route
                path="/resources/general-framework/sensitivity-wrt-usk"
                element={<SwrtUsk />}
              />
              <Route
                path="/resources/particular-models/bass-model-parameters"
                element={<SwrtBassModel />}
              />
              <Route
                path="/resources/particular-models/with-respect-to-velocity"
                element={<WrtVelocity />}
              />
              <Route
                path="/resources/particular-models/volume-analysis"
                element={<SwrtVolume />}
              />
              <Route
                path="/resources/particular-models/output-parameters"
                element={<SwrtOtParameters />}
              />
              <Route
                path="/resources/general-case/wrt-asset-price"
                element={<SensitivityWrtAssetPrice />}
              />
              <Route
                path="/resources/general-case/wrt-us1"
                element={<SensitivityWrtAbsorption />}
              />
              <Route
                path="/resources/particular-model-case/wrt-asset-volume"
                element={<SensitivityWrtAssetVolume />}
              />
              <Route
                path="/resources/particular-model-case/wrt-transactions"
                element={<SensitivityWrtTransactions />}
              />
              <Route
                path="/resources/wrt-bass-model-parameters"
                element={<SensitivityWrtBassModelParameters />}
              />
              <Route path="/resources/sv" element={<SV />} />
              <Route path="/resources/action-space" element={<ActionSpace />} />
              <Route
                path="/resources/reward-function"
                element={<RewardFunction />}
              />
              <Route
                path="/resources/learning-algorithms"
                element={<LearningAlgo />}
              />
              <Route
                path="/resources/testing-split"
                element={<TestingSplit />}
              />
              <Route path="/resources/r-and-d" element={<RandD />} />
              <Route path="/resources/dedication" element={<Dedication />} />

              {/* An Initial Solution */}
              <Route
                path="/resources/simplified-variant"
                element={<SimplifiedVariant />}
              />
              <Route
                path="/resources/rl-solution"
                element={<Reinforcement />}
              />
              <Route
                path="/resources/problem-formulation"
                element={<ProblemFormulataion />}
              />
              <Route path="/resources/drl-algorithms" element={<DRL />} />
              <Route
                path="/resources/experimental-results"
                element={<ExperimentalResults />}
              />
            </Routes>
            <Footer />
          </div>
        ) : (
          <LoginForm Login={Login} error={error} />
        )}
      </React.Fragment>
    )
  );
}

export default memo(App);
