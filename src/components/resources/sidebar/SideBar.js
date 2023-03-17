import React, { useState } from "react";
import "./SideBar.css";
import {
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillCaretRight,
} from "react-icons/ai";
import { useStateContext } from "../../../ContextProvider";
import { Link } from "react-router-dom";
import Gads from '../../../assets/gads.png';

const SideBar = () => {
  const {
    showOne,
    setShowOne,
    showTwo,
    setShowTwo,
    showThree,
    showThreeTwo,
    setShowThree,
    setShowThreeTwo,
    showFour,
    setShowFour,
    showFive,
    setShowFive,
    showSix,
    setShowSix,
    showSubOne,
    setShowSubOne,
    showSubTwo,
    setShowSubTwo,
    showSubThree,
    setShowSubThree,
    showSeven,
    setShowSeven,
    showSubFour,
    setShowSubFour,
  } = useStateContext();

  const [toggleRes, setToggleRes] = useState(false);
  const hamClickRes = () => setToggleRes(!toggleRes);

  const [iamClickRes, setiamClickRes] = useState(false);
  const handleiamClickRes = () => setiamClickRes(!iamClickRes);

  const [clickRes, setClickRes] = useState(false);
  const handleClick = () => setClickRes(!clickRes);

  function oneClickRes() {
    hamClickRes();
    handleiamClickRes();
  }

  return (
    <div className="res-main-for-height">

      
      {/* FOR MOBILE */}
      <div className="heading-mob" onClick={oneClickRes}>
        <h1>Derivations</h1>
        <div>{iamClickRes ? <AiFillCaretUp /> : <AiFillCaretDown />}</div>
      </div>

      {toggleRes && (
        <div id="for-mob-sidebar" className="side-bar">
          <div className="sidebar-head">
            <h1>Derivations</h1>
          </div>

          <div className="for-hr sidebar-hr"></div>

          <div className="sidebar-navigator">
          {/* MENU ITEM 9 */}
          {/* <div className="main-item">
            <div className="for-icon-div-main-item-sep">
              <AiFillCaretRight
                className="main-item-icon"
                visibility="hidden"
              />
            </div>
            <Link to="/resources/dedication">
              <h3>Dedication</h3>
            </Link>
          </div> */}
          {/* MENU ITEM 1 */}
          <div className="main-item display-none-resources" onClick={() => setShowOne(!showOne)}>
            <div className="main-item-icon-div">
              {showOne ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <Link>
                <h3>Literature Review</h3>
              </Link>
            </div>
          </div>
          {showOne && (
            <div className="sub-items">
              {/* SUB MENU ITEM 1.1 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/economic-literature">
                  <p>Economic Literature</p>
                </Link>
              </div>
              {/* SUB MENU ITEM 1.2 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/reinforcement-learning">
                  <p>
                    Reinforcement Learning (RL) and Machine Learning Methods
                  </p>
                </Link>
              </div>
            </div>
          )}

          {/* MENU ITEM 3 */}
          <div className="main-item" onClick={() => setShowThree(!showThree)}>
            <div className="main-item-icon-div">
              {showThree ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <h3>Zero Theorem Hypothesis</h3>
            </div>
          </div>
           {showThree && (
            
            <div className="sub-items">
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/assets">
                  <p>
                    Representation of a New Asset in Terms of Existing Assets
                    and Respective Adoptions
                  </p>
                </Link>
              </div>
            </div>
          )}

          {/* MENU ITEM 2 */}
          <div className="main-item" onClick={() => setShowTwo(!showTwo)}>
            <div className="main-item-icon-div">
              {showTwo ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <Link>
                <h3>The Generalised Model</h3>
              </Link>
            </div>
          </div>
          {showTwo && (
            <div className="sub-items">
              {/* MENU ITEM 2.1 */}
              {/* <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/purchase-power">
                  <p>Purchasing Power</p>
                </Link>
              </div> */}
              {/* MENU ITEM 2.2 */}
              {/* <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/market-substitution">
                  <p>Market Substitution</p>
                </Link>
              </div> */}
              {/* MENU ITEM 2.3 */}

              {/* MENU ITEM 3.1 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/particular-model">
                  <p>A Particular Model for Capitalization</p>
                </Link>
              </div>
              {/* MENU ITEM 3.2 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/wk">
                  <p>A Particular Model for ωk</p>
                </Link>
              </div>
              {/* MENU ITEM 3.3 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/velocity-consideration">
                  <p>The Velocity Consideration</p>
                </Link>
              </div>
              {/* MENU ITEM 3.4 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/output-consideration">
                  <p>The Output Consideration</p>
                </Link>
              </div>
              {/* MENU ITEM 3.5 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/absorption-consideration">
                  <p>The Absorption Consideration</p>
                </Link>
              </div>
              {/* MENU ITEM 3.6 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/bass-model">
                  <p>A Particular Model for Absorption (Bass Model)</p>
                </Link>
              </div>
            </div>
          )}

          {/* MENU ITEM 4 */}
          <div className="main-item" onClick={() => setShowFour(!showFour)}>
            <div className="main-item-icon-div">
              {showFour ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <h3>Sensitivity Analysis - General Framework</h3>
            </div>
          </div>
          {showFour && (
            <div className="sub-items">
              {/* SUB MENU ITEM 4.1 */}
              <div
                className="sub-breakdown-menu"
                onClick={() => setShowSubOne(!showSubOne)}
              >
                {!showSubOne ? (
                  <div className="cart-icons-div">
                    <AiOutlinePlusSquare className="submenu-carts" />
                  </div>
                ) : (
                  <div className="cart-icons-div">
                    <AiOutlineMinusSquare className="submenu-carts" />
                  </div>
                )}
                <Link>
                  <p>The Case of the Generalised Model</p>
                </Link>
              </div>

              {showSubOne && (
                <div>
                  {/* SUB BROKEN ITEMS 4.1.1 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-framework/sensitivity-wrt-velocity">
                      <p>Sensitivity with Respect to Velocity</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.2 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-framework/sensitivity-wrt-output">
                      <p>Sensitivity with Respect to Output</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.3 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-framework/sensitivity-wrt-asset-price">
                      <p>Sensitivity with Respect to Asset Prices</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.4 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-framework/sensitivity-wrt-usk">
                      <p>Sensitivity with Respect to Absorption (Usk)</p>
                    </Link>
                  </div>
                </div>
              )}

              {/* SUB MENU ITEM 4.2 */}
              <div
                className="sub-breakdown-menu"
                onClick={() => setShowSubTwo(!showSubTwo)}
              >
                {!showSubTwo ? (
                  <div className="cart-icons-div">
                    <AiOutlinePlusSquare className="submenu-carts" />
                  </div>
                ) : (
                  <div className="cart-icons-div">
                    <AiOutlineMinusSquare className="submenu-carts" />
                  </div>
                )}
                <Link>
                  <p>The Case of Particular Models</p>
                </Link>
              </div>
              {showSubTwo && (
                <div>
                  {/* SUB BROKEN ITEMS 4.2.1 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-models/bass-model-parameters">
                      <p>Sensitivity with Respect to Bass Model Parameters</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.2.2 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-models/volume-analysis">
                      <p>Sensitivity Analysis with Respect to Volume</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.3 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-models/with-respect-to-velocity">
                      <p>Sensitivity with Respect to Velocity</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.4 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-models/output-parameters">
                      <p>Sensitivity with Respect to Output Parameters</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* MENU ITEM 5 */}
          <div className="main-item display-none-resources" onClick={() => setShowFive(!showFive)}>
            <div className="main-item-icon-div">
              {showFive ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <h3>Sensitivity Analysis - Single Asset Case</h3>
            </div>
          </div>
          {showFive && (
            <div className="sub-items display-none-resources">
              {/* SUB MENU ITEM 5.1 */}
              <div
                className="sub-breakdown-menu"
                onClick={() => setShowSubThree(!showSubThree)}
              >
                {!showSubThree ? (
                  <div className="cart-icons-div">
                    <AiOutlinePlusSquare className="submenu-carts" />
                  </div>
                ) : (
                  <div className="cart-icons-div">
                    <AiOutlineMinusSquare className="submenu-carts" />
                  </div>
                )}
                <Link>
                  <p>General Case</p>
                </Link>
              </div>

              {showSubThree && (
                <div>
                  {/* SUB BROKEN ITEMS 5.1.1 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-case/wrt-asset-price">
                      <p>Sensitivity with respect to Asset Price</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 5.1.2 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-case/wrt-us1">
                      <p>Sensitivity with Respect to the Absorption (Us1)</p>
                    </Link>
                  </div>
                </div>
              )}

              {/* SUB MENU ITEM 5.2 */}
              <div
                className="sub-breakdown-menu"
                onClick={() => setShowSubFour(!showSubFour)}
              >
                {!showSubFour ? (
                  <div className="cart-icons-div">
                    <AiOutlinePlusSquare className="submenu-carts" />
                  </div>
                ) : (
                  <div className="cart-icons-div">
                    <AiOutlineMinusSquare className="submenu-carts" />
                  </div>
                )}
                <Link>
                  <p>The Case of Particular Models</p>
                </Link>
              </div>

              {showSubFour && (
                <div>
                  {/* SUB BROKEN ITEMS 5.1.1 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-model-case/wrt-asset-volume">
                      <p>Sensitivity with Respect to Asset Volume</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 5.1.2 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-model-case/wrt-transactions">
                      <p>Sensitivity with Respect to the Transactions</p>
                    </Link>
                  </div>
                </div>
              )}

              {/* SUB MENU ITEM 5.3 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/wrt-bass-model-parameters">
                  <p>Sensitivity with Respect to Bass Model Parameters</p>
                </Link>
              </div>
            </div>
          )}


          {/* MENU ITEM 10 */}
          <div className="main-item" onClick={() => setShowSeven(!showSeven)}>
            <div className="main-item-icon-div">
              {showSeven ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <Link>
                <h3>An Example Solution</h3>
              </Link>
            </div>
          </div>
          {showSeven && (
            <div className="sub-items">
              {/* MENU ITEM 10.1 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/simplified-variant">
                  <p>Simplified Variant</p>
                </Link>
              </div>
              {/* MENU ITEM 10.2 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/rl-solution">
                  <p>Reinforcement Learning as a Solution</p>
                </Link>
              </div>
              {/* MENU ITEM 10.3 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/problem-formulation">
                  <p>Problem Formulation</p>
                </Link>
              </div>
              {/* MENU ITEM 10.4 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/drl-algorithms">
                  <p>Deep Reinforcement Learning Algorithms</p>
                </Link>
              </div>
              {/* MENU ITEM 10.5 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/experimental-results">
                  <p>Experimental Results</p>
                </Link>
              </div>
            </div>
          )}

          {/* MENU ITEM 3-2 */}
          <div
            className="main-item"
            onClick={() => setShowThreeTwo(!showThreeTwo)}
          >
            <div className="main-item-icon-div">
              {showThreeTwo ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <h3>Alternative Variations</h3>
            </div>
          </div>
          {showThreeTwo && (
            <div className="sub-items">
              {/* MENU ITEM 3-2.1 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/frechet-derivation">
                  <p>Frechet Derivation</p>
                </Link>
              </div>
              {/* MENU ITEM 3-2.2 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/gumbel-derivation">
                  <p>Gumbel Derivation</p>
                </Link>
              </div>
              {/* MENU ITEM 3-2.3 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/gompertz-derivation">
                  <p>Shifted Gompertz Derivation</p>
                </Link>
              </div>
              {/* MENU ITEM 3-2.4 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/weibull-derivation">
                  <p>Weibull Derivation</p>
                </Link>
              </div>
            </div>
          )}


          

          {/* MENU ITEM 8 */}
          <div className="main-item">
            <div className="for-icon-div-main-item-sep">
              <AiFillCaretRight
                className="main-item-icon"
                visibility="hidden"
              />
            </div>
            <Link to="/resources/references-1">
              <h3>References</h3>
            </Link>
          </div>
        </div>
        </div>
      )}

      {/* FOR WEB */}
      <div id="for-web-sidebar" className="side-bar">
        <div className="sidebar-head">
          <h1>Derivations</h1>
        </div>

        <div className="for-hr sidebar-hr"></div>

        <div className="sidebar-navigator">
          {/* MENU ITEM 9 */}
          {/* <div className="main-item">
            <div className="for-icon-div-main-item-sep">
              <AiFillCaretRight
                className="main-item-icon"
                visibility="hidden"
              />
            </div>
            <Link to="/resources/dedication">
              <h3>Dedication</h3>
            </Link>
          </div> */}
          {/* MENU ITEM 1 */}
          <div className="main-item display-none-resources" onClick={() => setShowOne(!showOne)}>
            <div className="main-item-icon-div">
              {showOne ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <Link>
                <h3>Literature Review</h3>
              </Link>
            </div>
          </div>
          {showOne && (
            <div className="sub-items">
              {/* SUB MENU ITEM 1.1 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/economic-literature">
                  <p>Economic Literature</p>
                </Link>
              </div>
              {/* SUB MENU ITEM 1.2 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/reinforcement-learning">
                  <p>
                    Reinforcement Learning (RL) and Machine Learning Methods
                  </p>
                </Link>
              </div>
            </div>
          )}

          {/* MENU ITEM 3 */}
          <div className="main-item" onClick={() => setShowThree(!showThree)}>
            <div className="main-item-icon-div">
              {showThree ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <h3>Zero Theorem Hypothesis</h3>
            </div>
          </div>
           {showThree && (
            
            <div className="sub-items">
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/assets">
                  <p>
                    Representation of a New Asset in Terms of Existing Assets
                    and Respective Adoptions
                  </p>
                </Link>
              </div>
            </div>
          )}

          {/* MENU ITEM 2 */}
          <div className="main-item" onClick={() => setShowTwo(!showTwo)}>
            <div className="main-item-icon-div">
              {showTwo ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <Link>
                <h3>The Generalised Model</h3>
              </Link>
            </div>
          </div>
          {showTwo && (
            <div className="sub-items">
              {/* MENU ITEM 2.1 */}
              {/* <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/purchase-power">
                  <p>Purchasing Power</p>
                </Link>
              </div> */}
              {/* MENU ITEM 2.2 */}
              {/* <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/market-substitution">
                  <p>Market Substitution</p>
                </Link>
              </div> */}
              {/* MENU ITEM 2.3 */}

              {/* MENU ITEM 3.1 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/particular-model">
                  <p>A Particular Model for Capitalization</p>
                </Link>
              </div>
              {/* MENU ITEM 3.2 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/wk">
                  <p>A Particular Model for ωk</p>
                </Link>
              </div>
              {/* MENU ITEM 3.3 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/velocity-consideration">
                  <p>The Velocity Consideration</p>
                </Link>
              </div>
              {/* MENU ITEM 3.4 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/output-consideration">
                  <p>The Output Consideration</p>
                </Link>
              </div>
              {/* MENU ITEM 3.5 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/absorption-consideration">
                  <p>The Absorption Consideration</p>
                </Link>
              </div>
              {/* MENU ITEM 3.6 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/bass-model">
                  <p>A Particular Model for Absorption (Bass Model)</p>
                </Link>
              </div>
            </div>
          )}

          {/* MENU ITEM 4 */}
          <div className="main-item" onClick={() => setShowFour(!showFour)}>
            <div className="main-item-icon-div">
              {showFour ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <h3>Sensitivity Analysis - General Framework</h3>
            </div>
          </div>
          {showFour && (
            <div className="sub-items">
              {/* SUB MENU ITEM 4.1 */}
              <div
                className="sub-breakdown-menu"
                onClick={() => setShowSubOne(!showSubOne)}
              >
                {!showSubOne ? (
                  <div className="cart-icons-div">
                    <AiOutlinePlusSquare className="submenu-carts" />
                  </div>
                ) : (
                  <div className="cart-icons-div">
                    <AiOutlineMinusSquare className="submenu-carts" />
                  </div>
                )}
                <Link>
                  <p>The Case of the Generalised Model</p>
                </Link>
              </div>

              {showSubOne && (
                <div>
                  {/* SUB BROKEN ITEMS 4.1.1 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-framework/sensitivity-wrt-velocity">
                      <p>Sensitivity with Respect to Velocity</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.2 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-framework/sensitivity-wrt-output">
                      <p>Sensitivity with Respect to Output</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.3 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-framework/sensitivity-wrt-asset-price">
                      <p>Sensitivity with Respect to Asset Prices</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.4 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-framework/sensitivity-wrt-usk">
                      <p>Sensitivity with Respect to Absorption (Usk)</p>
                    </Link>
                  </div>
                </div>
              )}

              {/* SUB MENU ITEM 4.2 */}
              <div
                className="sub-breakdown-menu"
                onClick={() => setShowSubTwo(!showSubTwo)}
              >
                {!showSubTwo ? (
                  <div className="cart-icons-div">
                    <AiOutlinePlusSquare className="submenu-carts" />
                  </div>
                ) : (
                  <div className="cart-icons-div">
                    <AiOutlineMinusSquare className="submenu-carts" />
                  </div>
                )}
                <Link>
                  <p>The Case of Particular Models</p>
                </Link>
              </div>
              {showSubTwo && (
                <div>
                  {/* SUB BROKEN ITEMS 4.2.1 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-models/bass-model-parameters">
                      <p>Sensitivity with Respect to Bass Model Parameters</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.2.2 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-models/volume-analysis">
                      <p>Sensitivity Analysis with Respect to Volume</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.3 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-models/with-respect-to-velocity">
                      <p>Sensitivity with Respect to Velocity</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 4.1.4 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-models/output-parameters">
                      <p>Sensitivity with Respect to Output Parameters</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* MENU ITEM 5 */}
          <div className="main-item display-none-resources" onClick={() => setShowFive(!showFive)}>
            <div className="main-item-icon-div">
              {showFive ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <h3>Sensitivity Analysis - Single Asset Case</h3>
            </div>
          </div>
          {showFive && (
            <div className="sub-items display-none-resources">
              {/* SUB MENU ITEM 5.1 */}
              <div
                className="sub-breakdown-menu"
                onClick={() => setShowSubThree(!showSubThree)}
              >
                {!showSubThree ? (
                  <div className="cart-icons-div">
                    <AiOutlinePlusSquare className="submenu-carts" />
                  </div>
                ) : (
                  <div className="cart-icons-div">
                    <AiOutlineMinusSquare className="submenu-carts" />
                  </div>
                )}
                <Link>
                  <p>General Case</p>
                </Link>
              </div>

              {showSubThree && (
                <div>
                  {/* SUB BROKEN ITEMS 5.1.1 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-case/wrt-asset-price">
                      <p>Sensitivity with respect to Asset Price</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 5.1.2 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/general-case/wrt-us1">
                      <p>Sensitivity with Respect to the Absorption (Us1)</p>
                    </Link>
                  </div>
                </div>
              )}

              {/* SUB MENU ITEM 5.2 */}
              <div
                className="sub-breakdown-menu"
                onClick={() => setShowSubFour(!showSubFour)}
              >
                {!showSubFour ? (
                  <div className="cart-icons-div">
                    <AiOutlinePlusSquare className="submenu-carts" />
                  </div>
                ) : (
                  <div className="cart-icons-div">
                    <AiOutlineMinusSquare className="submenu-carts" />
                  </div>
                )}
                <Link>
                  <p>The Case of Particular Models</p>
                </Link>
              </div>

              {showSubFour && (
                <div>
                  {/* SUB BROKEN ITEMS 5.1.1 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-model-case/wrt-asset-volume">
                      <p>Sensitivity with Respect to Asset Volume</p>
                    </Link>
                  </div>
                  {/* SUB BROKEN ITEMS 5.1.2 */}
                  <div className="sub-brokendown-item">
                    <Link to="/resources/particular-model-case/wrt-transactions">
                      <p>Sensitivity with Respect to the Transactions</p>
                    </Link>
                  </div>
                </div>
              )}

              {/* SUB MENU ITEM 5.3 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/wrt-bass-model-parameters">
                  <p>Sensitivity with Respect to Bass Model Parameters</p>
                </Link>
              </div>
            </div>
          )}


          {/* MENU ITEM 10 */}
          <div className="main-item" onClick={() => setShowSeven(!showSeven)}>
            <div className="main-item-icon-div">
              {showSeven ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <Link>
                <h3>An Example Solution</h3>
              </Link>
            </div>
          </div>
          {showSeven && (
            <div className="sub-items">
              {/* MENU ITEM 10.1 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/simplified-variant">
                  <p>Simplified Variant</p>
                </Link>
              </div>
              {/* MENU ITEM 10.2 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/rl-solution">
                  <p>Reinforcement Learning as a Solution</p>
                </Link>
              </div>
              {/* MENU ITEM 10.3 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/problem-formulation">
                  <p>Problem Formulation</p>
                </Link>
              </div>
              {/* MENU ITEM 10.4 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/drl-algorithms">
                  <p>Deep Reinforcement Learning Algorithms</p>
                </Link>
              </div>
              {/* MENU ITEM 10.5 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/experimental-results">
                  <p>Experimental Results</p>
                </Link>
              </div>
            </div>
          )}

          {/* MENU ITEM 3-2 */}
          <div
            className="main-item"
            onClick={() => setShowThreeTwo(!showThreeTwo)}
          >
            <div className="main-item-icon-div">
              {showThreeTwo ? (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlineMinusSquare className="main-item-icon" />
                </div>
              ) : (
                <div className="for-icon-div-main-item-sep">
                  <AiOutlinePlusSquare className="main-item-icon" />
                </div>
              )}
            </div>
            <div>
              <h3>Alternative Variations</h3>
            </div>
          </div>
          {showThreeTwo && (
            <div className="sub-items">
              {/* MENU ITEM 3-2.1 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/frechet-derivation">
                  <p>Frechet Derivation</p>
                </Link>
              </div>
              {/* MENU ITEM 3-2.2 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/gumbel-derivation">
                  <p>Gumbel Derivation</p>
                </Link>
              </div>
              {/* MENU ITEM 3-2.3 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/gompertz-derivation">
                  <p>Shifted Gompertz Derivation</p>
                </Link>
              </div>
              {/* MENU ITEM 3-2.4 */}
              <div className="sub-breakdown-menu">
                <div className="cart-icons-div">
                  <AiFillCaretRight
                    className="submenu-carts"
                    visibility="hidden"
                  />
                </div>
                <Link to="/resources/weibull-derivation">
                  <p>Weibull Derivation</p>
                </Link>
              </div>
            </div>
          )}       

          {/* MENU ITEM 8 */}
          <div className="main-item">
            <div className="for-icon-div-main-item-sep">
              <AiFillCaretRight
                className="main-item-icon"
                visibility="hidden"
              />
            </div>
            <Link to="/resources/references-1">
              <h3>References</h3>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SideBar;
