import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsFillMoonFill, BsFillSunFill, BsGraphUp } from "react-icons/bs";
import logoBlack from "../../assets/logo-black.svg";
import logoWhite from "../../assets/logo-white.svg";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useStateContext } from "../../ContextProvider";
// import UserOptions from './components/UserOptions';
import { AiFillCaretDown, AiFillHome, AiFillInfoCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { set_day_mode, set_night_mode } from "../../store";

import {
  BsFillLayersFill,
  BsInfoSquareFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";
import { BiColumns } from "react-icons/bi";
import { FaQuestionCircle } from "react-icons/fa";
import "../../components/navbar/Navbar.css";

export default function NavMobile(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();

  // Login State
  const { authCheck, userEmail, setAuthCheck, theme, setTheme } =
    useStateContext();
  // Login State

  // mobile nav state
  const [toggle, setToggle] = useState(false);
  const hamClick = () => setToggle(!toggle);

  function oneClick() {
    hamClick();
    handleClick();
  }
  // mobile nav state end

  // Drop Down
  const [drop, setDrop] = useState(false);
  const dropDown = () => setDrop(!drop);
  // Drop Down End

  // Dark Light Mode
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
      handleDayModeTheme();
      handleiamClick();
    } else {
      setTheme("dark-theme");
      handleNightModeTheme();
      handleiamClick();
    }
  };
  const handleNightModeTheme = () => {
    dispatch(set_night_mode());
  };
  const handleDayModeTheme = () => {
    dispatch(set_day_mode());
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const [iamClick, setiamClick] = useState(false);
  const handleiamClick = () => setiamClick(!iamClick);
  // Dark Light Mode

  function toCloseNav() {
    setToggle(false);
    setClick(false);
  }

  return (
    <div className="header">
      <div className="container">
        <div className="hamburger" onClick={oneClick}>
          {click ? (
            <FaTimes className="ham-icon" size={16} />
          ) : (
            <FaBars className="ham-icon" size={16} />
          )}
        </div>

        <div className="nav-logo-div">
          {theme === "dark-theme" ? (
            <Link to="/">
              <img className="nav-logo-img" src={logoWhite} alt="logo" />
            </Link>
          ) : (
            <Link to="/">
              <img className="nav-logo-img" src={logoBlack} alt="logo" />
            </Link>
          )}
        </div>

        <ul id="mobile-nav" className={click ? "nav-menu active" : "nav-menu"}>
          <CustomLink to="/">Forecasts</CustomLink>
          <CustomLink
            to="/compare"
            onClick={toCloseNav}
            state={{ model_name: `${props.model_name}` }}
          >
            Compare
          </CustomLink>
          <CustomLink to="/derivations">Derivations</CustomLink>
          <CustomLink to="/about">About</CustomLink>
          <CustomLink to="/faqs" onClick={toCloseNav}>
            FAQs
          </CustomLink>
        </ul>

        {toggle && (
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {authCheck === true ? (
              <div>
                <p className="welcome-user welcome-user-mobile">
                  Welcome, {userEmail}
                </p>
              </div>
            ) : (
              <div className="display-none"></div>
            )}

            <CustomLink to="/" onClick={toCloseNav}>
              <AiFillHome className="nav-icons" />
              Forecasts
            </CustomLink>
            <CustomLink to="/backtest" onClick={toCloseNav}>
              <BsGraphUp className="nav-icons" />
              Backtest
            </CustomLink>
            <CustomLink to="/compare" onClick={toCloseNav}>
              <BiColumns className="nav-icons" />
              Compare
            </CustomLink>
            <CustomLink to="/derivations" onClick={toCloseNav}>
              <BsFillLayersFill className="nav-icons" />
              Derivations
            </CustomLink>
            <CustomLink to="/about" onClick={toCloseNav}>
              <BsFillInfoCircleFill className="nav-icons" />
              About
            </CustomLink>
            <CustomLink to="/faqs" onClick={toCloseNav}>
              <FaQuestionCircle className="nav-icons" />
              FAQs
            </CustomLink>

            {/* {authCheck === true ? (
              <CustomLink
                to="/"
                onClick={() => {
                  setAuthCheck(false);
                }}
              >
                Logout
              </CustomLink>
            ) : (
              <CustomLink to="/login">Login</CustomLink>
            )} */}
          </ul>
        )}

        <div className="dark-lite" onClick={() => toggleTheme()}>
          {(iamClick && theme === "dark-theme") || theme == "dark-theme" ? (
            <BsFillSunFill size={16} style={{ color: "#fff" }} />
          ) : (
            <BsFillMoonFill size={16} style={{ color: "#000" }} />
          )}
        </div>

        {/* {
              authCheck === true ? (
                <div>
                  <div className='welcome-user-div'>
                    <p className='welcome-user'>Welcome, {userEmail}</p>
                    <AiFillCaretDown className='hoverThis' onClick={ dropDown }/>
                  </div>
                  {/* <div>
                    {
                      drop && <UserOptions className='showThis' />
                    } 
                  </div> 

                </div>  
                
                ) : (
                <div className='btn-group nav-btn'>
                  <Link to='/login'><button className='btn btn-nav'>Login</button></Link>
                </div>
                )
            } 
            */}
      </div>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
