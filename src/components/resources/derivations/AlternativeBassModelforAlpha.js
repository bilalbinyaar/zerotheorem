import React, { useState } from "react";
import "../ResourcesTextual.css";
import P1Day from "../../../assets/resources/10.png";
import P1Night from "../../../assets/resources/10-white.png";
import SideBar from "../sidebar/SideBar";
import { useStateContext } from "../../../ContextProvider";
import { MathComponent } from "mathjax-react";


const AlternativeBassModelforAlpha = () => {
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
            <h1 className='res-det-heading'>Bass Model for Alpha</h1>
            <p className="for-mt-secondary">For the absorption rate α<sub>k</sub> we consider the following model based on the well-known Bass Diffusion</p>
            <MathComponent tex={String.raw`\alpha_k=\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{1+\frac{p_k}{q_k} \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`} />
            <p className="for-mt-secondary">where p<sub>k</sub> and q<sub>k</sub> are time-dependent coefficients to be estimated.
            <br/>
            Then, Π<sub>BTC</sub> will obtain the following form:
            </p>
            <MathComponent tex={String.raw`\Pi_{\mathrm{BTC}}=\frac{\partial}{\partial t}\left[\ln \left(\sum_{k=1}^n P_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{1+\frac{p_k}{q_k} \cdot \exp \left[-\left(p_k+q_k\right) t\right]} \cdot R_k\right)+\ln \left(\frac{1}{m} \sum_{j=1}^m T_j^{\prime}\right)-\ln b-\ln h+\ln d\right]`} />


            <h2 className="for-mt-primary">Bass Derivatives</h2>
            <p className="for-mt-secondary">It is easy to see that</p>
            <MathComponent tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial p_k}=\frac{\partial}{\partial p_k}\left[\frac{X^{\prime}}{X}\right]=\frac{1}{X} \cdot \frac{\partial X^{\prime}}{\partial p_k}+X^{\prime} \cdot \frac{\partial}{\partial p_k}\left[\frac{1}{X}\right]=\frac{1}{X} \cdot \frac{\partial X^{\prime}}{\partial p_k}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial p_k},`} />
            <p className="for-mt-secondary">and, similarly,</p>
            <MathComponent tex={String.raw`\frac{\partial \Pi_{\mathrm{BTC}}}{\partial q_k}=\frac{1}{X} \cdot \frac{\partial X^{\prime}}{\partial q_k}-\frac{X^{\prime}}{X^2} \cdot \frac{\partial X}{\partial q_k}`} />
            <p className="for-mt-secondary">where</p>
            <MathComponent tex={String.raw`X=\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`} />
            <p className="for-mt-secondary">Therefore,</p>
            <MathComponent tex={String.raw`X^{\prime}=\frac{\partial X}{\partial t}=\sum_{k=1}^n\left(P_k \cdot R_k\right)^{\prime} \cdot q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+`} />
            <MathComponent tex={String.raw`\sum_{k=1}^n P_k \cdot R_k \cdot q_k^{\prime} \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}+`} />
            <MathComponent tex={String.raw`\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot\left(\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right)^{\prime}`} />
            <p className="for-mt-secondary">Since p<sub>k</sub> and q<sub>k</sub> depend on t, we compute</p>
            <MathComponent tex={String.raw`\left(\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right)^{\prime}=\frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right)^{\prime}}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}-`} />
            <MathComponent tex={String.raw`\frac{\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right)\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^{\prime}}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2} .`} />
            <p className="for-mt-secondary">Now, making use of the chain rule, it is easy to evaluate</p>
            <MathComponent tex={String.raw`\left(1-\exp \left[-\left(p_k+q_k\right) t\right]\right)^{\prime}=-\exp \left[-\left(p_k+q_k\right) t\right] \cdot\left[-\left(p_k+q_k\right) t\right]^{\prime}=`} />
            <MathComponent tex={String.raw`\left[p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^{\prime}=q_k^{\prime}+p_k^{\prime} \cdot \exp \left[-\left(p_k+q_k\right) t\right]+`} />
            <MathComponent tex={String.raw`p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot\left[-\left(p_k+q_k\right) \cdot t\right]^{\prime}=`} />
            <MathComponent tex={String.raw`q_k^{\prime}+p_k^{\prime} \cdot \exp \left[-\left(p_k+q_k\right) t\right]+`} />
            <MathComponent tex={String.raw`p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right] \cdot\left[p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right]=`} />
            <MathComponent tex={String.raw`q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]`} />
            <p className="for-mt-secondary">Hence,</p>
            <MathComponent tex={String.raw`\left(\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right)^{\prime}=\frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`} />
            <MathComponent tex={String.raw`-\frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right]\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}`} />
            <p className="for-mt-secondary">Thus,</p>
            <MathComponent tex={String.raw`X^{\prime}=\frac{\partial X}{\partial t}=\sum_{k=1}^n\left(P_k \cdot R_k\right)^{\prime} \cdot q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`} />
            <MathComponent tex={String.raw`+\sum_{k=1}^n P_k \cdot R_k \cdot q_k^{\prime} \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`} />
            <MathComponent tex={String.raw`+\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right) \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}`} />
            <MathComponent tex={String.raw`-\sum_{k=1}^n P_k \cdot R_k \cdot q_k \cdot \frac{q_k^{\prime}+\left[p_k^{\prime}-p_k \cdot\left(p_k+q_k+\left(p_k^{\prime}+q_k^{\prime}\right) \cdot t\right)\right] \cdot \exp \left[-\left(p_k+q_k\right) t\right]}{\left(q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]\right)^2}`} />
            <p className="for-mt-secondary">Now, in order to continue the sensitivity analysis of ΠBTC with respect to pk, we need to evaluate the derivatives ∂X/∂p<sub>k</sub> and ∂X′/∂p<sub>k</sub>. First,</p>
            <MathComponent tex={String.raw`\frac{\partial X}{\partial p_k}=\frac{\partial}{\partial p_k}\left[P_k \cdot R_k \cdot q_k \cdot \frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]=`} />
            <MathComponent tex={String.raw`P_k \cdot R_k \cdot q_k \cdot \frac{\partial}{\partial p_k}\left[\frac{1-\exp \left[-\left(p_k+q_k\right) t\right]}{q_k+p_k \cdot \exp \left[-\left(p_k+q_k\right) t\right]}\right]`} />
            <p className="for-mt-secondary">in which</p>
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
            <p className="for-mt-secondary">or</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">leading to</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Now, we evaluate the derivative ∂X′/∂p<sub>k</sub>:</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Next, we evaluate</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
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
            <p className="for-mt-secondary">Thus, eventually,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Similar steps as above will lead us to the following expressions:</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">in which</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">leading to</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Now, we evaluate the derivative ∂X′/∂q<sub>k</sub></p>
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
            <p className="for-mt-secondary">or</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Furthermore,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Thence,</p>
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
            <p className="for-mt-secondary">Apparently,</p>
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">and</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Therefore,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">Similarly,</p>
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <MathComponent tex={String.raw`dummy`} />
            <p className="for-mt-secondary">i.e.,</p>
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

export default AlternativeBassModelforAlpha;
