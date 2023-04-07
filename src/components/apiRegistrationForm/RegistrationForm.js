import React, { useState } from "react";
import "./RegistraionForm.css";
import api_img from "../../assets/api-soon.png";
import { useStateContext } from "../../ContextProvider";
import TextField from "@mui/material/TextField";

function RegistrationForm() {
  const { theme } = useStateContext();
  const [firstName, setFirstName] = useState(null);
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  return (
    // <div className="container">
    <div className="registraion-container">
      <div className="left">
        <p className="api-heading">
          Registration Interest For Early Access To Our Wholesale /
          Institutional API
        </p>
        <p className="api-heading2">*For Sophisticated investors only*</p>

        {theme === "dark-theme" ? (
          <img src={api_img} alt="vehcain logo" className="api-img" />
        ) : (
          <img src={api_img} alt="vehcain logo" className="api-img" />
        )}
        {/* <span className="news-heading">Zero Theorem</span> */}
      </div>
      <div className="right">
        <h3 className="api-heading3">Api Features Include:</h3>
        <p className="api-paragraph3">
          Historical Forecast for over 500 models including all performance
          metrics strategy Development infrastructure with automated back
          testing Portfolio Optimization & Much more Quant Stuff
        </p>
        <h1 className="api-info">Enter your Information</h1>
        <TextField
          id="firstName"
          placeholder="First Name*"
          variant="outlined"
          value={firstName}
          onChange={handleFirstNameChange}
          sx={{
            width: 300,
            marginLeft: "25%",
            background: "#FFFFFF",
          }}
        />
      </div>
    </div>
    // </div>
  );
}

export default RegistrationForm;
