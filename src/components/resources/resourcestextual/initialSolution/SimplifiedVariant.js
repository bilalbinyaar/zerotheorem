import React from "react";
import "../../ResourcesTextual.css";
import SideBar from "../../sidebar/SideBar";
import P2Day from "../../../../assets/resources/An initial solution/1-01.png";
import P2Night from "../../../../assets/resources/An initial solution/1-01-white.png";
import { useStateContext } from "../../../../ContextProvider";

const SimplifiedVariant = () => {
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

export default SimplifiedVariant;
