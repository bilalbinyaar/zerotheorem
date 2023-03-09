import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";

const CumulativePNL = () => {
  return (
    <div className="current-position">
      <div className="container">
        <div className="current-position-body">
          <h2 className="current-position-heading">Cumulative PNL</h2>
          {/* <div className="horizon-left">
            <div className="hours-list">
              <ul>
                <li className="active">1m</li>
                <li>1h</li>
                <li>2h</li>
                <li>4h</li>
                <li>6h</li>
                <li>24h</li>
                <li>
                  <AiOutlineCalendar />
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CumulativePNL;
