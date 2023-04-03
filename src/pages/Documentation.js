import React, { useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-python";
import "highlight.js/styles/default.css";
import { PrismCode } from "react-prism";
import "prismjs/themes/prism.css";
import Swal from "sweetalert2";
import { FiCopy } from "react-icons/fi";
import { IconContext } from "react-icons";

function Documentation() {
  const [selectedHeadingIndex, setSelectedHeadingIndex] = useState(0);

  const handleClick = (index) => {
    setSelectedHeadingIndex(index);
  };

  const headings = ["Installation guide", "API authentication", "Get forecast"];

  const contents = [
    "Zerotheorem is a package that exists on PyPI \nand can be installed using pip cammand in python",
    <div>
      For api authentication, user should import zerotheorem module in python.
      <br />
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Function:</b> authenticate()
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Input parameters:</b> authenticate() require authurization token in
        string
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Output:</b> authenticate() will return nothing
      </p>
    </div>,
    <div>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Function:</b> get_forecast()
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Input parameters:</b> get_forecast() you can pass model name no
        arguments
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Output:</b> get_forecast() will return forecasts for all models if
        you make
        <br />
        input parameter empty or will return forecast of specific model if input
        model name. <br />
        Output format will be in dictionary.
      </p>
    </div>,
    <div>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Function:</b> get_stats()
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Input parameters:</b> get_stats() you can pass model name or no
        arguments
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Output:</b> get_stats() will return stats for all models if you make{" "}
        <br />
        input parameter empty or will return stats of specific model if input
        model name. <br /> Output format will dictionary.
      </p>
    </div>,

    <div>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Function:</b> get_ledger()
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Input parameters:</b> get_ledger() you should pass model name in
        string
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Output:</b> get_ledger() will return leger of specific input model
        name.
        <br />
        Output format will be in dictionary.
      </p>
    </div>,

    <div>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Function:</b> get_historical_forecasts()
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Input parameters:</b> get_historical_forecasts() you can pass model
        name or no arguments
      </p>
      <p
        style={{
          color: "--color-day-white",
        }}
      >
        <b>Output:</b> get_historical_forecasts() will return historical
        forecasts for all models if you pass. <br /> Output format will
        dictionary
        <br />
        no arguments or will return historical forecast of specific model if
        input model name
      </p>
    </div>,
  ];

  const pythonCode = [
    `pip install zerotheorem-python`,
    "import zerotheorem as zt \nauth_token = 230304034\nzt.authenticate(auth_token)\n",
    "import zerotheorem as zt \nzt.get_forecast('Model name')\n",
    "import zerotheorem as zt \nzt.get_stats('Model name')\n",
    "import zerotheorem as zt \nzt.get_ledger('Model name')\n",
    "import zerotheorem as zt \nzt.get_historical_forecasts('Model name')\n",
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonCode[selectedHeadingIndex]).then(() => {
      Swal.fire({
        title: "Code copied!",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: "top-right",
        showConfirmButton: false,
      });
    });
  };

  return (
    <div className="documentation-container">
      <div className="documentation-sidebar">
        <ul>
          <li
            className={selectedHeadingIndex === 0 ? "active" : ""}
            onClick={() => handleClick(0)}
          >
            Installation
          </li>
          <li
            className={selectedHeadingIndex === 1 ? "active" : ""}
            onClick={() => handleClick(1)}
          >
            API authentication
          </li>
          <li
            className={selectedHeadingIndex === 2 ? "active" : ""}
            onClick={() => handleClick(2)}
          >
            Get forecasts
          </li>
          <li
            className={selectedHeadingIndex === 3 ? "active" : ""}
            onClick={() => handleClick(3)}
          >
            Get statistics
          </li>

          <li
            className={selectedHeadingIndex === 4 ? "active" : ""}
            onClick={() => handleClick(4)}
          >
            Get ledger
          </li>
          <li
            className={selectedHeadingIndex === 5 ? "active" : ""}
            onClick={() => handleClick(5)}
          >
            Get historical forecasts
          </li>
        </ul>
      </div>
      <div className="content">
        <h1>{headings[selectedHeadingIndex]}</h1>
        <p>{contents[selectedHeadingIndex]}</p>
      </div>
      <div className="code-container">
        <div className="copy">
          <IconContext.Provider value={{ className: "copy-icon" }}>
            <FiCopy onClick={handleCopy} />
          </IconContext.Provider>
        </div>
        <pre className="language-python">
          <PrismCode>{pythonCode[selectedHeadingIndex]}</PrismCode>
        </pre>
      </div>
    </div>
  );
}

export default Documentation;
