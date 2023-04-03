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

  const headings = [
    "Installation guide",
    "Public API access",
    "Advanced Techniques",
  ];

  const contents = [
    "Zerotheorem is a package that exists on PyPI \nand can be installed using pip cammand in python",
    <div>
      This function is used to authenticate with the Zero Theorem API using an
      auth token. <br />
      The auth token is a string that you obtain from Zero Theorem when you sign
      up for their service. <br />
      The function takes the auth token as a parameter and sets it as the
      default auth token for all subsequent API requests.
    </div>,
    "Duis aute irure dolor in reprehenderit in \nvoluptate velit esse cillum dolore eu fugiat\n nulla pariatur.",
  ];

  const pythonCode = [
    `pip install zerotheorem-python`,
    "import zerotheorem as zt \n# Set the auth token for subsequent API requests\nauth_token = 230304034\nzt.authenticate(auth_token)\n# Get the forecast for a particular model\nforecast = zt.get_forecast('ZT1_0M24BTC39')",
    "x = 2\ny = 'Hello, world!'\nprint(y)",
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
            Public API Access
          </li>
          <li
            className={selectedHeadingIndex === 2 ? "active" : ""}
            onClick={() => handleClick(2)}
          >
            Advanced Techniques
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
