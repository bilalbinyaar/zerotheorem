import React, { useState, useRef } from "react";
import "../ResourcesTextual.css";
import P1Day from "../../../assets/resources/0.png";
import P1Night from "../../../assets/resources/0-white.png";
import SideBar from "../sidebar/SideBar";
import { useStateContext } from "../../../ContextProvider";
import AboutVideoMobile from "../../../assets/animation-mobile.mp4";
import AboutVideoDesktop from "../../../assets/animation-desktop.mp4";
import AnimationVideoMobileDay from "../../../assets/animationDarkMob.mp4";
import AnimationVideoDesktopDay from "../../../assets/animationDarkWeb.mp4";
import { Helmet } from "react-helmet";

const Introduction = () => {
  const { theme } = useStateContext();

  // FOR RESPONSIVENESS
  const windowWidth = useRef(window.innerWidth);
  // FOR RESPONSIVENESS

  return (
    <div className="container resources-container">
      <Helmet>
        <title>Zero Theorem | Derivations</title>
        <meta
          name="description"
          content="A comprehensive set of informational documents detailing how our economic framework is derived and proven with the help of AI and ML to provide the best crypto signals and forecastbitcoin prices."
        />
        {/* Add other meta tags here */}
      </Helmet>
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
              <div className="about-video for-mb for-resources-page">
                {windowWidth.current <= 568 ? (
                  <div>
                    {theme == "dark-theme" ? (
                      <video src={AnimationVideoMobileDay} autoPlay loop />
                    ) : (
                      <video src={AboutVideoMobile} autoPlay loop />
                    )}
                  </div>
                ) : (
                  <div>
                    {theme === "dark-theme" ? (
                      <video src={AnimationVideoDesktopDay} autoPlay loop />
                    ) : (
                      <video src={AboutVideoDesktop} autoPlay loop />
                    )}
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

export default Introduction;
