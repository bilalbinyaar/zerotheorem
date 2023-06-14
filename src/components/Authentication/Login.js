import React, { useState, useEffect } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { AiFillGoogleCircle } from "react-icons/ai";
import "./Login.css";
// import videoBg from "../assets/hero-bg.mp4";
// import "./Hero.css";
import { Link } from "react-router-dom";
import { auth, provider } from "../../firebase_config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ Login, error }) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  // const [error, setError] = useState("");

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
        // console.log(user);
        // alert("Successfully login with email " + user);
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
    <div className="login">
      {/* <video loop autoPlay muted src={videoBg} /> */}
      <div className="container">
        <form className="login-form" onSubmit={submitHandler}>
          <div className="form-inner">
            {error !== "" ? <div className="error"> {error} </div> : ""}

            <div className="form-group">
              <label htmlFor="email"></label>
              <span className="iconSpace">
                <MdEmail />
              </span>
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
            <div className="form-group">
              <label htmlFor="password"></label>
              <span className="iconSpace">
                <RiLockPasswordFill />
              </span>
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
            <input
              className="login-form-btn"
              type="auth"
              value="LOGIN"
              onClick={() => {
                // console.log("Submit button is clicked");
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
              <span className="hr-div">
                <hr />
              </span>
              <span>
                <p>or</p>
              </span>
              <span className="hr-div">
                <hr />
              </span>
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
          </div>
        </form>
        <div className="register-text">
          <p>
            <Link to="/signup">New to Zero Theorem? Join now!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
