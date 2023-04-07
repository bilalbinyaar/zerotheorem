import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import logoBlack from "../../assets/logo-black.svg";
import logoWhite from "../../assets/logo-white.svg";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useStateContext } from "../../ContextProvider";
// import UserOptions from './components/UserOptions';
import { AiFillCaretDown, AiOutlineCloseCircle } from "react-icons/ai";
import { width } from "@mui/system";
import NavMobile from "../../mobile-components/nav/NavMobile";
import { useSelector, useDispatch } from "react-redux";
import { set_day_mode, set_night_mode } from "../../store";
import LoginPopup from "../login-popup/LoginPopup";
import { auth, provider } from "../../firebase_config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();
  // Login State
  const { authCheck, userEmail, setAuthCheck, theme, setTheme } =
    useStateContext();
  // Login State
  // const [theme, setTheme] = useState("light-theme");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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

  // FOR RESPONSIVENESS
  const windowWidth = useRef(window.innerWidth);
  // FOR RESPONSIVENESS

  function toCloseNav() {
    setToggle(false);
    setClick(false);
  }

  // const [showPopup, setShowPopup] = useState(false);

  // const handleShowPopup = () => {
  //   setShowPopup(true);
  // };

  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user.email;
        console.log(user);
        alert("Successfully login with email " + user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        console.log("Error occured");

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);
  return (
    <div className="header">
      {windowWidth.current <= 1240 ? (
        <NavMobile />
      ) : (
        <div className="container">
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

          <ul
            id="mobile-nav"
            className={click ? "nav-menu active" : "nav-menu"}
          >
            <CustomLink to="/" onClick={toCloseNav}>
              Forecasts
            </CustomLink>
            <CustomLink to="/backtest" onClick={toCloseNav}>
              Backtest
            </CustomLink>
            <CustomLink to="/compare" onClick={toCloseNav}>
              Compare
            </CustomLink>
            <CustomLink to="/derivations" onClick={toCloseNav}>
              Derivations
            </CustomLink>
            {/* <CustomLink to="/api" onClick={toCloseNav}>
              API
            </CustomLink> */}
            <CustomLink to="/api-registraion" onClick={toCloseNav}>
              API Registration
            </CustomLink>
            {/* <CustomLink to="/login" onClick={toCloseNav}>
            {/* <CustomLink className="menu-item">
              API
              <div className="sub-menu-items">
                <CustomLink className="sub-menu-item" to="/api" onClick={toCloseNav}>
                  Registration
                </CustomLink>
                <CustomLink className="sub-menu-item" to="/api" onClick={toCloseNav}>
                  Documentation
                </CustomLink>
              </div> 
            </CustomLink>*/}
            {/* <CustomLink to="/api" onClick={toCloseNav}>
              API
            </CustomLink> */}
            {/* <CustomLink to="/login" onClick={toCloseNav}>
              Login
            </CustomLink> */}
            <CustomLink to="/about" onClick={toCloseNav}>
              About
            </CustomLink>
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
                Forecasts
              </CustomLink>
              <CustomLink to="/backtest" onClick={toCloseNav}>
                Backtest
              </CustomLink>
              <CustomLink to="/compare" onClick={toCloseNav}>
                Compare
              </CustomLink>
              <CustomLink to="/derivations" onClick={toCloseNav}>
                Derivations
              </CustomLink>
              <CustomLink to="/documentation" onClick={toCloseNav}>
                API
              </CustomLink>
              <CustomLink to="/about" onClick={toCloseNav}>
                About
              </CustomLink>
              <CustomLink to="/faqs" onClick={toCloseNav}>
                FAQs
              </CustomLink>

              {authCheck === true ? (
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
              )}
            </ul>
          )}

          <div className="dark-lite">
            {(iamClick && theme === "dark-theme") || theme == "dark-theme" ? (
              <BsFillSunFill
                className="dark-lite-icon"
                onClick={() => toggleTheme()}
                size={20}
                style={{ color: "#fff" }}
              />
            ) : (
              <BsFillMoonFill
                className="dark-lite-icon"
                onClick={() => toggleTheme()}
                size={20}
                style={{ color: "#000" }}
              />
            )}
          </div>

          {authCheck === true ? (
            <div>
              <div className="welcome-user-div">
                <p className="welcome-user">Welcome, {userEmail}</p>
                <AiFillCaretDown className="hoverThis" onClick={dropDown} />
              </div>
              {/* <div>
                {
                  drop && <UserOptions className='showThis' />
                } 
              </div>  */}
            </div>
          ) : (
            <div className="btn-group nav-btn">
              {/* LOGIN POPUP FOR WEB */}
                <button className="btn btn-nav" onClick={handleShowPopup}>Login</button>
                {showPopup && (
                  <div className="popup">
                    <div className="popup__content">
                      
                      <div className="login">
                        <div className="containers">
                          
                          <form className="login-form" onSubmit={submitHandler}>
                            <button className="popup__close" onClick={handleClosePopup}>
                              <AiOutlineCloseCircle />
                            </button>
                            <div className="form-inner">
                              {error !== "" ? <div className="error"> {error} </div> : ""}
                              <h2>Login</h2>
                              <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                  type="email"
                                  placeholder="Email"
                                  name="email"
                                  id="email"
                                  onChange={(e) =>
                                    setDetails({ ...details, email: e.target.value })
                                  }
                                  value={details.email}
                                />
                              </div>
                              <div className="form-group no-margin-bottom">
                                <label htmlFor="password">Password</label>
                                <input
                                  type="password"
                                  placeholder="Password"
                                  name="password"
                                  id="password"
                                  onChange={(e) =>
                                    setDetails({ ...details, password: e.target.value })
                                  }
                                  value={details.password}
                                />
                              </div>
                              <div className="forget-pwd">
                                <p>Forget password?</p>
                              </div>
                              <input
                                className="login-form-btn"
                                type="auth"
                                value="LOGIN"
                                onClick={() => {
                                  console.log("Submit button is clicked");
                                  const email = document.getElementById("email").value;
                                  const password = document.getElementById("password").value;
                                  if (!email || !password) {
                                    alert("Kindly enter input details for signup");
                                  } else {
                                    console.log(email, password);
                                    signInWithEmailAndPassword(auth, email, password)
                                      .then((userCredential) => {
                                        // Signed in
                                        const user = userCredential.user;
                                        alert("User is successfully login :)");
                                        // ...
                                      })
                                      .catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        alert("Email or password is incorrect");
                                      });
                                  }
                                }}
                              />

                              

                              <div className="or-div">
                                {/* <span className="hr-div">
                                  <hr />
                                </span> */}
                                <span>
                                  <p>OR</p>
                                </span>
                                {/* <span className="hr-div">
                                  <hr />
                                </span> */}
                              </div>

                              <div className="google-login-div">
                                <button
                                  className="google-login-btn"
                                  onClick={() => {
                                    signInWithRedirect(auth, provider);
                                  }}
                                >
                                  <AiFillGoogleCircle className="google-login-icon" />
                                  Sign in with Google
                                </button>
                              </div>

                              <div className="register-text">
                                {/* <p>
                                  <Link to="/signup">New to Zero Theorem? Join now!</Link>
                                </p> */}
                                <p>
                                  Don’t have account? <strong>Sign up</strong>
                                </p>
                              </div>
                            </div>
                          </form>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}

          <div className="hamburger" onClick={oneClick}>
            {click ? (
              <FaTimes size={20} style={{ color: "#333" }} />
            ) : (
              <FaBars size={20} style={{ color: "#333" }} />
            )}
          </div>
        </div>
      )}
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
