import React from "react";
import "./Footer.css";
import logoBlack from "../../assets/logo-black.svg";
import logoWhite from "../../assets/logo-white.svg";
import { useStateContext } from "../../ContextProvider";
import { AiFillEye, AiFillHeart, AiOutlineTwitter } from "react-icons/ai";
import newsImg from "../../assets/announce.jpg";
import Announcements_Light_Mode from "../../assets/Announcements_Light mode.jpg";
import Announcements_Dark_Mode from "../../assets/Announcements_darkmode.jpg";
import { BsDot } from "react-icons/bs";
import ztFav from "../../assets/favicon.ico";
import vetLogo from "../../assets/vet-logo.png";
import { FaDiscord } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useStateContext();
  return (
    <div className="footer">
      <div className="footer-main-div">
        <div className="container">
          <div className="footer-inner-left">
            <div className="footer-logo-div">
              {theme === "dark-theme" ? (
                <Link to="/">
                  <img className="footer-logo-img" src={logoWhite} alt="logo" />
                </Link>
              ) : (
                <Link to="/">
                  <img className="footer-logo-img" src={logoBlack} alt="logo" />
                </Link>
              )}
            </div>
            <h2>Disclaimer</h2>
            <p className="disclaimer-text">
              The information provided on this website does not constitute
              investment advice, financial advice, trading advice, or any other
              sort of advice and you should not treat any of the website's
              content as such. Zero Theorem Pty Ltd does not recommend that any
              cryptocurrency should be bought, sold, or held by you. Do conduct
              your own due diligence and consult your financial advisor before
              making any investment decisions.
            </p>
            {/* <p className='footer-copyright-text'>
                    &#169; 2022 Zero Theorem. All rights reserved.
                </p> */}
          </div>
          <div className="footer-inner-right">
            {/* <div className='footer-btn'>
                    <Link to='/login'><button className='btn btn-nav'>About Us</button></Link>
                </div>
                <div className='footer-icons-div'>
                    <FaDiscord className='footer-icons dis'/>
                    <AiOutlineTwitter className='footer-icons twi'/>
                    <FaTelegramPlane className='footer-icons tele'/>
                </div> */}

            <div className="forecasts-card footer-card">
              <div className="announcement-card">
                <div className="announcement-row">
                  <div className="title-div footer-ann-h">
                    <h2>Announcements</h2>
                  </div>

                  {/* <div className='forecasts-more footer-more'>
                                <h3>More</h3>
                                <AiFillCaretRight className='more-icon'/>
                            </div> */}
                </div>

                <div className="announcement-news">
                  <div className="news-inner footer-news-inner">
                    {theme === "dark-theme" ? (
                      <img
                        className="news-img"
                        src={Announcements_Dark_Mode}
                        alt="news"
                      />
                    ) : (
                      <img
                        className="news-img"
                        src={Announcements_Light_Mode}
                        alt="news"
                      />
                    )}
                    <div className="news-textual">
                      <div className="news-head">
                        <span>
                          {theme === "dark-theme" ? (
                            <img
                              src={logoWhite}
                              alt="vehcain logo"
                              width="160px"
                            />
                          ) : (
                            <img
                              src={logoBlack}
                              alt="vehcain logo"
                              width="160px"
                            />
                          )}
                        </span>
                        {/* <span className="news-heading">Zero Theorem</span> */}
                      </div>
                      <div className="news-body">
                        <p>
                           Take Off &#128640; — We're live.
                          <br />
                          ZeroTheorem Beta is now Live for intraday BTC forecasts!
                        </p>
                      </div>
                      <div className="news-footer">
                        <span>March 19, 2023</span>
                        {/* <BsDot />
                        <span>
                          <AiFillEye className="news-footer-icon" /> 1.7K
                        </span>
                        <BsDot />
                        <span>
                          <AiFillHeart className="news-footer-icon" />2
                        </span>
                        <BsDot />
                        <span>
                          <img src={vetLogo} alt="vehcain logo" width="12px" />
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bar-container container">
          <div className="footer-inner-left">
            <p className="footer-copyright-text">
              &#169; 2023 Zero Theorem. All rights reserved.
            </p>
          </div>
          <div className="footer-inner-right for-footer-bar">
            <div className="forecasts-card footer-card">
              <div className="announcement-card">
                <div className="announcement-news">
                  <div className="news-inner footer-news-inner inner-footer-bar">
                    <p className="footer-follow-text">Find us</p>
                    <div className="footer-icons-div">
                      {/* <FaDiscord className="footer-icons dis" /> */}
                      <Link to='https://twitter.com/zer0theorem' target='_blank'>
                        <AiOutlineTwitter className="footer-icons twi" />
                      </Link>
                      {/* <FaTelegramPlane className="footer-icons tele" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
