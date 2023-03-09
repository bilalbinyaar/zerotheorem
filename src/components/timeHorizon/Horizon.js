import React, { useState } from "react";
import "./Horizon.css";
import CurrencySearchBar from "../searchSelection/CurrencySearchBar";
import ModelSearchBar from "../searchSelection/ModelSearchBar";
import DummyData from "../../assets/data/Data.json";

const Horizon = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (e) => {
    e.currentTarget.classList.remove("active");
    e.currentTarget.classList.add("active");
    setIsActive((current) => !current);
  };

  return (
    <div className="horizon">
      <div className="container">
        <div className="horizon-row">
          <div className="horizon-left">
            <h3>Time Horizon</h3>
            <p className="divider-icon"> | </p>
            <div className="hours-list">
              <ul className={isActive ? "active" : ""} onClick={handleClick}>
                <li id="hours-listings" className="active">
                  All
                </li>
                <li id="hours-listings">24h</li>
                <li id="hours-listings">12h</li>
                <li id="hours-listings">8h</li>
                <li id="hours-listings">3h</li>
                <li id="hours-listings">2h</li>
                <li id="hours-listings">1h</li>
              </ul>
            </div>
          </div>

          <div className="horizon-right">
            <div className="currency-search">
              <CurrencySearchBar placeholder="Currency" data={DummyData} />
            </div>
            <div className="model-search">
              <ModelSearchBar placeholder="Models" data={DummyData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horizon;
