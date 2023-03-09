import React from "react";
import "./CurrentPosition.css";
import { AiOutlineCalendar } from "react-icons/ai";

const CurrentPosition = () => {
  return (
    <div className="current-position">
      <div className="container">
        <h2 className="current-position-heading">Current Position</h2>

        <div className="current-position-body">
          <div className="current-position-body-spans">
            <div className="current-position-spans no-padding">
              <span>Open : </span>
              <span className="for-green"> 1689.0</span>
            </div>
            <div className="current-position-spans">
              <span>High : </span>
              <span className="for-green"> 1689.0</span>
            </div>
            <div className="current-position-spans">
              <span>Close : </span>
              <span className="for-red"> 1689.0</span>
            </div>
            <div className="current-position-spans">
              <span>Low : </span>
              <span className="for-red"> 1689.0</span>
            </div>
            <div className="current-position-spans">
              <span>Volume : </span>
              <span className="for-green"> 1.345%</span>
            </div>
          </div>

          {/* <div className='horizon-left'>
                    <div className='hours-list'>
                        <ul>
                            <li className='active'>1m</li>
                            <li>1h</li>
                            <li>2h</li>
                            <li>4h</li>
                            <li>6h</li>
                            <li>24h</li>
                            <li><AiOutlineCalendar /></li>
                        </ul>
                    </div>
                </div> */}

          <div className="ep-cp">
            <div className="ep">
              <p className="for-ep-color">- - - -</p>
              <p>Entry Price</p>
            </div>
            <div className="cp">
              <p className="for-cp-color">- - - -</p>
              <p>Current Price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPosition;
