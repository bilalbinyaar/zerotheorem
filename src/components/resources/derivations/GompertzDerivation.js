import React, { useState } from "react";
import "../ResourcesTextual.css";
import P1Day from "../../../assets/pdf/1/3-2/3-2-3.png";
import P1Night from "../../../assets/pdf/1/3-2/3-2-3White.png";
import SideBar from "../sidebar/SideBar";
import { useStateContext } from "../../../ContextProvider";

const GompertzDerivation = () => {
  const { theme } = useStateContext();

  return (
    <div className="resources">
      <div className="res-sidebar">
        <SideBar />
      </div>
      <div className="res-textual">
        <div className="res-textual-section">
          <div className="container">
            {/* <h1 className='res-det-heading'>Introduction</h1> */}
            <div className="document">
              {theme === "dark-theme" ? (
                <div className="img-doc">
                  <img src={P1Night} alt="p1" />
                </div>
              ) : (
                <div className="img-doc">
                  <img src={P1Day} alt="p1" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GompertzDerivation;
