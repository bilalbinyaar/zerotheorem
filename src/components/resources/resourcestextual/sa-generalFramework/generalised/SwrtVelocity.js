import React from "react";
import SideBar from "../../../sidebar/SideBar";
import "../../../ResourcesTextual.css";
import P2Day from "../../../../../assets/pdf/1/4/1-i.png";
import P2Night from "../../../../../assets/pdf/1/4/1-i-white.png";

import { useStateContext } from "../../../../../ContextProvider";

const SwrtVelocity = () => {
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
            {/* <h1 className='res-det-heading'>Introduction</h1> */}
            <div className="document">
              {theme === "dark-theme" ? (
                <div className="img-doc">
                  <img src={P2Night} alt="p1" />
                </div>
              ) : (
                <div className="img-doc">
                  <img src={P2Day} alt="p1" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SwrtVelocity;
