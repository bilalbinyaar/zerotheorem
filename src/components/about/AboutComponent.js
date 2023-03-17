import React, { useRef } from "react";
import "./AboutComponent.css";
import separator from '../../assets/separator.png';
import zeroUncertainityDay from '../../assets/zero-uncertainity.svg';
import zeroUncertainityNight from '../../assets/zero-uncertainity-night.svg';
import zeroCost from '../../assets/zero-cost-day.svg';
import zeroCostNight from '../../assets/zero-cost.svg';
import zeroProof from '../../assets/zero-proof.svg';
import zeroProofNight from '../../assets/zero-proof-night.svg';
import SorezImg from "../../assets/sorez.png";
import { useStateContext } from "../../ContextProvider";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import EquationBlack from '../../assets/equation-black.png';
import EquationWhite from '../../assets/equation-white.png';


const AboutComponent = () => {
  // FOR RESPONSIVENESS
  const windowWidth = useRef(window.innerWidth);
  // FOR RESPONSIVENESS

  const { theme } = useStateContext();

  var link = <Link to='/faqs'>zero proof protocol</Link>;
  var link1 = <Link to='/derivations'>derivations</Link>;

  return (

    <div className="about">
      <div className="container">

        {/* MISSION SECTION */}
        <div className="about-head for-mt">
          <h1>
            Our <span className="color-yellow">Mission</span>
          </h1>
        </div>
        <div className="mission-section for-mb">
          <div className="sorez-mission for-mt">
            <div className="about-head for-mb for-margin sorez-text">

              {theme === "dark-theme" ? (
                <div className="mission-img">
                  <img src={zeroUncertainityNight} alt='zero-un'/>
                </div>
              ) : (
                <div className="mission-img">
                  <img src={zeroUncertainityDay} alt='zero-un'/>
                </div>
              )}

              <div className="about-text text-align-left justify-text">
                <p className="mission-text for-line-height">
                  We provide a data driven valuation approach that is based on economics, statistics and advances in machine learning.
                  <br/>
                  <br/>
                  We make all of our models transparent for public critique with all the corresponding theory, historical and live performance metrics.
                  <br/>
                  <br/>
                  Our aim is to provide pricing certainty for those utilising Proof of Work digital assets for transaction in day to day business activities, whether that may be the commodity producer all the way to the point of service provider. Having a valuation model helps manage risk and inventory especially in times of high volatility, black swan events or unfavourable market sentiment.
                </p>
              </div>
            </div>
          </div>
          <div className="sorez-mission for-mt about-margin">
            <div className="about-head for-mb for-margin sorez-text">
              {theme === "dark-theme" ? (
                <div className="mission-img">
                  <img src={zeroCostNight} alt='zero-un'/>
                </div>
              ) : (
                <div className="mission-img">
                  <img src={zeroCost} alt='zero-un'/>
                </div>
              )}
              <div className="about-text text-align-left justify-text">
                <p className="mission-text for-line-height">
                  Our aim to provide pricing technology and valuation solutions for Proof of Work digital currencies at no financial cost to the public user.
                  <br/>
                  <br/>
                  The models presented on the website are part of the empirical proof for zero theorem governing equations. They are not intended to be traded for capital appreciation or revenue generation.
                  <br/>
                  <br/>
                  In order to pay for costs associated with the website, data collection services, backend, GPU calculations, and ongoing development we utilise onsite advertising.
                </p>
              </div>
            </div>
          </div>
          <div className="sorez-mission for-mt">
            <div className="about-head for-mb about-margin sorez-text">
              {theme === "dark-theme" ? (
                <div className="mission-img">
                  <img src={zeroProofNight} alt='zero-un'/>
                </div>
              ) : (
                <div className="mission-img">
                  <img src={zeroProof} alt='zero-un'/>
                </div>
              )}
              <div className="about-text text-align-left justify-text">
                <p className="mission-text for-line-height">
                  For us any pricing proof should be validated based on the output of its primary use case, trading (or {link}). If a model/theory was to have future insight and undeniable explanatory power its hypothetical trading outputs based on its directional forecasts should demonstrate the following characteristics:
                  <br/>
                  <br/>
                  1) A consistent and positive yield structure
                  <br/>
                  <br/>
                  2) A yield structure that outperforms the underlying market itself
                  <br/>
                  <br/>
                  3) A yield structure that is statistically uncorrelated with the market itself
                  <br/>
                  <br/>
                  4) A yield structure that outperforms any other competing pricing theories
                </p>
                
              </div>
            </div>
          </div>
        </div>

        {/* EQUATION SECTION */}
        <div className="about-head mt-extra">
          <h1>
            Our <span className="color-yellow">Equation</span>
          </h1>
        </div>
        {theme === "dark-theme" ? (
          <div className="equation-img equation-img-about">
            <img src={EquationWhite} alt="p1" />
          </div>
        ) : (
          <div className="equation-img equation-img-about">
            <img src={EquationBlack} alt="p1" />
          </div>
        )}

        <div className="about-text text-align-left for-mb justify-text">
              <p className="equatinon-description for-line-height">
                Our equation is derived from the ZERO sum game assumption which infers that monetary value is finite and in short time horizons changes aggregate value in the total asset universe must equate to ZERO. Hence for Proof of Work digital asset to have any kind of value they must be absorbing this value from multiple alternative asset classes (P<sub>k</sub> = price of k asset, R<sub>k</sub> = volume traded of k asset) via a substitutional phenomena a<sub>k</sub>. In addition our equation includes the transactional utility (T<sub>j</sub><sup>'</sup>= velocity of transactions) of the network itself and the cost of network maintenance via the mining variables (b = block reward, h = hash rate, d = difficulty) of proof of work digital currencies. A full derivation including more information can be located in our {link1} page.
              </p>
            </div>

        



        {/* <div className="about-separator">
          <img src={separator} alt='about-sep'/>
        </div> */}


          {/* MANIFESTO SECTION */}
        <div className="about-head for-mb for-mt">
          <h1>
            Our <span className="color-yellow">Manifesto</span>
          </h1>
        </div>

        {/* <div className="about-text for-mb about-top">
          <p>
            “…Inspired by the Modelers’ Hippocratic Oath - Dr. Emanuel Derman and Dr. Paul Wilmott"
          </p>
        </div> */}

        <div className="about-listings for-mb">
          <div className="about-spans">
            <span>
              <p className="for-weight">&#x2022; </p>
            </span>
            <span>
              <p>
                   Even though we use a combination of statistical, econometric and machine learning methods to estimate value, we will never overlook the stochastic properties of reality for the pristine beauty of mathematical formulation. 
              </p>
            </span>
          </div>
          <div className="about-spans">
            <span>
              <p className="for-weight">&#x2022; </p>
            </span>
            <span>
              <p>
                We will make clear the assumptions, oversights and accuracy of our models to those who intent to use them and never claim that they have the full explanatory insights into real world market dynamics. 
              </p>
            </span>
          </div>
          <div className="about-spans">
            <span>
              <p className="for-weight">&#x2022; </p>
            </span>
            <span>
              <p>
                We understand that our models can provoke past, current and future economic theory and accept that our work may result in consequences on society that can be far beyond our own comprehension. 
              </p>
            </span>
          </div>
          <div className="about-spans">
            <span>
              <p className="for-weight">&#x2022; </p>
            </span>
            <span>
              <p>
                We commit to continuously improving and evolving our models and will never claim that they are complete in explanatory power. 
              </p>
            </span>
          </div>
          <div className="about-spans">
            <span>
              <p className="for-weight">&#x2022; </p>
            </span>
            <span>
              <p>
                We dedicate ourselves to expanding the current body of knowledge by releasing our own research to the public at zero cost. 
              </p>
            </span>
          </div>
          <div className="about-spans">
            <span>
              <p className="for-weight">&#x2022; </p>
            </span>
            <span>
              <p>
                We express specifically that our models or their outputs are not intended to be used as financial advice. 
              </p>
            </span>
          </div>
        </div>


        


        


        {/* <div className="about-separator">
          <img src={separator} alt='about-sep'/>
        </div> */}


        <div className="sorez for-mt">
          <div className="about-head for-mb for-margin sorez-text">
            <h1 className="sorez-head for-mb">
              Our<span className="color-yellow"> Why</span>
            </h1>

            <div className="sorez-img">
              <img src={SorezImg} alt='about-sep'/>
            </div>
            <div className="about-text text-align-left for-mb justify-text">
              <p className="mission-text for-line-height for-br-removal">
                “ We suffered... a great loss... and we struggled for a long time to understand the reason for it... 
                  <br/>
                  the reason we were chosen, if chosen we were, to go on living with this misfortune.
                  <br/>
                  We came back to our childhood place... it seem to suit us... and in isolation... from the ashes... and from zero... a theory was conceived.
                  <br/>
                  For us it was something therapeutic to occupy our mind... something to cultivate... something to hold on to.
                  <br/>
                  So we decided to be become obsessed with this concept... seemingly hidden in plain sight... this unprovable theorem.
                  <br/>
                  Then one day the phone rang... we answered... and a familiar voice spoke... 
                  <br/>
                  Suddenly we felt a flash of light... we felt...a current of pure energy... connecting us back to something... something greater. 
                  <br/>
                  We suddenly knew clearly that we only had to answer, "Yes", and the true purpose behind our loss would be revealed.
                  <br/>
                  This would give us a purpose to go on... the courage to publish Zero Theorem... and the faith that it could be used for the greater good; 
                  <br/>
                  ... to improve pricing certainty and market efficiency.”<br/><br/><strong>- SOREZ</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
