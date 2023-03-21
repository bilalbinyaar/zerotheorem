import React, { useState } from "react";
import "../ResourcesTextual.css";
import P1Day from "../../../assets/resources/3.png";
import P1Night from "../../../assets/resources/3-white.png";
import SideBar from "../sidebar/SideBar";
import { useStateContext } from "../../../ContextProvider";
import { MathComponent } from "mathjax-react";


const TheGoverningEquation = () => {
  const { theme } = useStateContext();

  return (
    <div className="container resources-container">
    <div className="resources">
      <div className="res-sidebar">
        <SideBar />
      </div>
      <div className="res-textual">
        <div className="res-textual-section">
          <div className="container">
            <h1 className='res-det-heading'>The Governing Equation</h1>
            <p className="for-mt-primary">We start with the equation of exchange below:</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">where P<sub>BTC</sub> is the price of asset, Q<sub>BTC</sub> is the output power, M<sub>BTC</sub> is the market capitalization,
            and V<sub>BTC</sub> is the velocity of the asset class.
            <br/>
            We consider the general case when Q<sub>BTC</sub>, M<sub>BTC</sub> and V<sub>BTC</sub> are functions of time variable t,
            i.e., in what follows, Q<sub>BTC</sub> = Q<sub>BTC</sub>(t), M<sub>BTC</sub> = M<sub>BTC</sub>(t) and V<sub>BTC</sub> = V<sub>BTC</sub>(t).
            <br/>
            Evidently, taking natural logarithm in both sides of the previous equality, we derive
            </p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Differentiating both sides of this expression with respect to t, we obtain</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">or</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">For the sake of simplicity, we denote</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Therefore:</p>
            <MathComponent tex={String.raw`dummy`} />


            <h2 className="for-mt-primary">A Particular Model for Capitalization</h2>
            <p className="for-mt-secondary">We now assume that</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">where P<sub>k</sub> is the price and U<sub>k</sub> is the unit of the kth asset.
            <br/>
            Then,
            </p>
            <MathComponent tex={String.raw`dummy`} />
            

            <h2 className="for-mt-primary">A Particular Model for Substitution</h2>
            <p className="for-mt-secondary">In this section, we consider a specific model for the absorption rate ω<sub>k</sub> as follows</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">for k = 1, 2, . . . , n and where Usk is the substitution unit of the kth asset. Substituting it into we derive</p>
            <MathComponent tex={String.raw`dummy`} />


            <h2 className="for-mt-primary">A Particular Model for Velocity</h2>
            <p className="for-mt-secondary">Consider the following model for V<sub>BTC</sub></p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">where T<sub>j</sub> represents the transactions. Substituting it into the final expression of ΠBTC leads us to</p>
            <MathComponent tex={String.raw`dummy`} />


            <h2 className="for-mt-primary">A Particular Model for Output</h2>
            <p className="for-mt-secondary">Now, we assume that</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">where b, h and d are time-dependent production parameters. Therefore, for Π<sub>BTC</sub>, we will have</p>
            <MathComponent tex={String.raw`dummy`} />


            <h2 className="for-mt-primary">The Absorption Consideration</h2>
            <p className="for-mt-secondary">Assume that</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">where α<sub>k</sub> is the absorption rate of the market k, R<sub>k</sub>, k = 1, 2, ·n, are time-dependent.
            <br/>
            Then, Π<sub>BTC</sub> will obtain the following form:</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Hence the Zero Theorem governing equation is:</p>
            <MathComponent tex={String.raw`dummy`} />




            {/* <div className="document">
              {theme === "dark-theme" ? (
                <div className="img-doc">
                  <img src={P1Night} alt="p1" />
                </div>
              ) : (
                <div className="img-doc">
                  <img src={P1Day} alt="p1" />
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TheGoverningEquation;
