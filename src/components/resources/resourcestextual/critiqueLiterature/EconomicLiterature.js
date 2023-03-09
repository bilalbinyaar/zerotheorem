import React from "react";
import SideBar from "../../sidebar/SideBar";
// import P1Day from '../../../../assets/resources/1/Critique of Literature-1/1.1D.png';
// import P1Night from '../../../../assets/resources/1/Critique of Literature-1/1.1N.png';
import P1Day from "../../../../assets/pdf/1/1/1.png";
import P1Night from "../../../../assets/pdf/1/1/1-white.png";

import { useStateContext } from "../../../../ContextProvider";

const EconomicLiterature = () => {
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

export default EconomicLiterature;
