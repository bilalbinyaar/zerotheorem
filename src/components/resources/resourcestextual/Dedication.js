import React, { useState, useRef } from "react";
import "../ResourcesTextual.css";
import P1Day from "../../../assets/resources/Dedication-01.png";
import P1Night from "../../../assets/resources/Dedication-white.png";
import SideBar from "../sidebar/SideBar";
import { useStateContext } from "../../../ContextProvider";

const Dedication = () => {
  const { theme } = useStateContext();
  // FOR RESPONSIVENESS
  const windowWidth = useRef(window.innerWidth);
  // FOR RESPONSIVENESS

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

export default Dedication;
