import React, { useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-python";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  darcula,
  monokai,
  github,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Highlight from "react-highlight";
import "highlight.js/styles/default.css";
import { PrismCode } from "react-prism";
import "prismjs/themes/prism.css";
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
    "Zerotheorem is a package that exists on PyPI and can be installed using pip cammand in python",
    "This function is used to authenticate with the Zero Theorem API using an auth token. The auth token is a string that you obtain from Zero Theorem when you sign up for their service. The function takes the auth token as a parameter and sets it as the default auth token for all subsequent API requests.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  ];

  const pythonCode = [
    `pip install zerotheorem-python`,
    "import zerotheorem as zt \n# Set the auth token for subsequent API requests\nauth_token = 230304034\nzt.authenticate(auth_token)\n# Get the forecast for a particular model\nforecast = zt.get_forecast('ZT1_0M24BTC39')",
    "x = 2\ny = 'Hello, world!'\nprint(y)",
  ];
  //   const highlightedCode = Prism.highlight(
  //     pythonCode,
  //     Prism.languages.python,
  //     "python"
  //   );

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
        {/* <h4 className="code-title">python3</h4> */}
        <pre className="language-python">
          <PrismCode>{pythonCode[selectedHeadingIndex]}</PrismCode>
        </pre>
      </div>
    </div>
  );
}

export default Documentation;
