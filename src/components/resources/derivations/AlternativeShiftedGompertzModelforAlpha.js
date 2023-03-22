import React, { useState } from "react";
import "../ResourcesTextual.css";
import P1Day from "../../../assets/resources/14.png";
import P1Night from "../../../assets/resources/14-white.png";
import SideBar from "../sidebar/SideBar";
import { useStateContext } from "../../../ContextProvider";
import { MathComponent } from "mathjax-react";


const AlternativeShiftedGompertzModelforAlpha = () => {
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
            <h1 className='res-det-heading'>Shifted Gompertz Model for Alpha</h1>
            <p className="for-mt-secondary">Consider now the following particular model for the absorption rate α<sub>k</sub> corresponding to the well-known shifted Gompertz distribution:</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">where p<sub>k</sub> and q<sub>k</sub> are to be estimated
            <br/>
            Then, Π<sub>BTC</sub> and ln P<sub>BTC</sub> will obtain the following form:
            </p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />


            <h2 className="for-mt-primary">Shifted Gompertz Derivations</h2>
            <p className="for-mt-secondary">In this appendix, we will consider the sensitivity of</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">with respect to p<sub>k</sub> and q<sub>k</sub>.
            <br/>
            Let us start with the sensitivity with respect to p<sub>k</sub>. Apparently, only the first term in both expressions above depends on p<sub>k</sub>. Therefore, we may dismiss other terms when calculating the partial derivatives. In other words,
            </p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Taking into account that</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">where</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">we have</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">On the other hand,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Simplifying the expression in the last bracket, we derive</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Therefore, finally</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Coming back to the sensitivity problem, let us now calculate the sensitivity derivative</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Apparently,</p>
            <MathComponent tex={String.raw`dummy`} />
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
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Thus,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Now, compute the following derivative:</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Substituting the above expressions into the sensitivity derivative, we finally obtain</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Similarly, in the case of q<sub>k</sub>, we have</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Here,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">On the other hand,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Therefore,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Let us now proceed to the sensitivity derivatives calculations for ln P<sub>BTC</sub>. Apparently,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Similarly,</p>
            <MathComponent tex={String.raw`dummy`} />
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

export default AlternativeShiftedGompertzModelforAlpha;
