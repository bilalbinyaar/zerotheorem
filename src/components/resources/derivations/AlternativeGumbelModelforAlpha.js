import React, { useState } from "react";
import "../ResourcesTextual.css";
import P1Day from "../../../assets/resources/13.png";
import P1Night from "../../../assets/resources/13-white.png";
import SideBar from "../sidebar/SideBar";
import { useStateContext } from "../../../ContextProvider";
import { MathComponent } from "mathjax-react";


const AlternativeGumbelModelforAlpha = () => {
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
            <h1 className='res-det-heading'>Gumbel Model for Alpha</h1>
            <p className="for-mt-secondary">For the absorption rate α<sub>k</sub> we consider the following model based on the well-known Gumbel distribution:</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">where p<sub>k</sub> and q<sub>k</sub> are to be estimated
            <br/>
            Then, Π<sub>BTC</sub> and ln P<sub>BTC</sub> will obtain the following form:
            </p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />


            <h2 className="for-mt-primary">Gumbel Derivations</h2>
            <p className="for-mt-secondary">Here we calculate the sensitivity derivatives of</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">with respect to p<sub>k</sub> and q<sub>k</sub>.
            <br/>
            Apparently,
            </p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">since other terms do not depend on p<sub>k</sub> and q<sub>k</sub>.
            <br/>
            Taking into account that
            </p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">where</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">we have</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Thus, finally</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Coming back to the sensitivity problem, let us now calculate the sensitivity derivative</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Evidently,</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Applying the multiplication derivative rule, we get</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">or</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Thus, combining all separate derivatives, we will obtain</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Now, compute the following derivative:</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Substituting the above expressions into the sensitivity derivative, we finally obtain</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Let us now proceed with calculating the derivative of ΠBTC with respect to qk. To that aim, let us first compute the analogous derivatives</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Similarly, in the case of q<sub>k</sub>, we have</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Let us now proceed to the sensitivity derivatives calculations for ln P<sub>BTC</sub>. Apparently,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Similarly</p>
            <MathComponent tex={String.raw`dummy`} />
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

export default AlternativeGumbelModelforAlpha;
