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
import {
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";

function Documentation() {
  const [selectedHeadingIndex, setSelectedHeadingIndex] = useState(0);

  const handleClick = (index) => {
    setSelectedHeadingIndex(index);
    hamClickRes();
    handleiamClickRes();

  };


  const [toggleRes, setToggleRes] = useState(false);
  const hamClickRes = () => setToggleRes(!toggleRes);

  const [iamClickRes, setiamClickRes] = useState(false);
  const handleiamClickRes = () => setiamClickRes(!iamClickRes);

  function oneClickRes() {
    hamClickRes();
    handleiamClickRes();
  }

  const headings = [
    // "Installation guide",
    // "API authentication",
    // "Get forecast",
    // "Get statistics",
    // "Get ledger",
    // "Get historical forecasts",
  ];

  const contents = [
    <div>
      <h1 className="lineheight-docs">
        Installing the zerotheorem-python Package
      </h1>
      <p className="lineheight-docs">
        To install the zerotheorem-python package, you can use pip, which is a
        package manager for Python. If you don't have pip installed already, you
        can install it by following the instructions in the official
        documentation at
        <a href="https://pip.pypa.io/en/stable/installation/">
          https://pip.pypa.io/en/stable/installation/
        </a>
      </p>
      <p className="lineheight-docs">
        Once you have pip installed, you can install the zerotheorem-python
        package by running the following command in your terminal:
      </p>
      <pre className="lineheight-docs prism-style">
        pip install zerotheorem-python
      </pre>
      <p className="lineheight-docs">
        This will download and install the latest version of the
        zerotheorem-python package and its dependencies.
      </p>
      <p className="lineheight-docs">
        After installation, you can import the package into your Python script
        or interactive shell using the following command:
      </p>
      <pre className="lineheight-docs">import zerotheorem as zt</pre>
      <p className="lineheight-docs">
        This will allow you to use the functions and classes provided by the
        zerotheorem package in your code.
      </p>
    </div>,

    <div>
      <h1 className="lineheight-docs">
        Function Name: zt.authenticate(auth_token)
      </h1>
      <h2 className="lineheight-docs">Description:</h2>
      <p className="lineheight-docs">
        This function does not return anything, but it sets the authentication
        credentials for the user session.
      </p>
      <h2 className="lineheight-docs">Parameters:</h2>
      <ul className="lineheight-docs-list">
        <li>
          <code>auth_token</code> (string): The authentication token obtained
          from the API key or OAuth flow.
        </li>
      </ul>
      <h2 className="lineheight-docs">Return Value:</h2>
      <p className="lineheight-docs">
        This function does not return anything, but it sets the authentication
        credentials for the user session.{" "}
      </p>
    </div>,

    <div>
      <h1 className="lineheight-docs">Function Name: zt.get_ledger()</h1>
      <h2 className="lineheight-docs">Description:</h2>
      <p className="lineheight-docs">
        This function takes a model name as input and returns a dictionary with
        information on the ledger for that model. The ledger includes data such
        as the timestamp of the last transaction, the action taken (long or
        short), the buy and sell prices, the profit and loss (PNL), the current
        balance, the total PNL, the ledger key, and the drawdown.
      </p>
      <h2 className="lineheight-docs">Parameters:</h2>
      <p className="lineheight-docs">
        <strong>model_name</strong> (string): The name of the model for which
        the ledger information is requested. This is a required parameter.
      </p>
      <h2 className="lineheight-docs">Return Value:</h2>
      <p className="lineheight-docs">
        The function returns a dictionary with the following keys and values:
      </p>
      <ul className="lineheight-docs-list">
        <li>
          <strong>response</strong> (list): A list containing a dictionary with
          information on the model's ledger.
        </li>
        <li>
          <strong>ledger_timestamp</strong> (int): The timestamp of the last
          transaction in the ledger, in Unix time.
        </li>
        <li>
          <strong>action</strong> (string): The action taken in the last
          transaction, either "long" or "short".
        </li>
        <li>
          <strong>buy_price</strong> (int): The buy price of the last
          transaction.
        </li>
        <li>
          <strong>sell_price</strong> (int): The sell price of the last
          transaction. If no sell transaction has been made yet, this value will
          be 0.
        </li>
        <li>
          <strong>pnl</strong> (float): The profit or loss from the last
          transaction, as a percentage.
        </li>
        <li>
          <strong>balance</strong> (float): The current balance of the model.
        </li>
        <li>
          <strong>pnl_sum</strong> (float): The total profit or loss for all
          transactions made by the model, as a percentage.
        </li>
        <li>
          <strong>ledger_key</strong> (int): A unique identifier for the ledger
          entry.
        </li>
        <li>
          <strong>drawdown</strong> (float): The current drawdown for the model,
          as a percentage.
        </li>
      </ul>
      <h2 className="lineheight-docs">Example Usage:</h2>
      <p className="lineheight-docs">
        To get the ledger information for a model named "user_3AsdCcBYvs", you
        can call the function like this:
      </p>
      <pre className="lineheight-docs">zt.get_ledger("user_3AsdCcBYvs")</pre>
      <p className="lineheight-docs">
        This will return a dictionary with information on the ledger for the
        specified model.
      </p>
      {/* <pre>
        {
          "{'response': [{'ledger_timestamp': 1659657600, 'action': 'long', 'buy_price': 22598, 'sell_price': 0, 'pnl': -0.05, 'balance': 999.5, 'pnl_sum': -0.05, 'ledger_key': 0, 'drawdown': 0}]}"
        }
      </pre> */}
    </div>,
    <div>
      <h1 className="lineheight-docs">Function Name: zt.get_stats()</h1>
      <h2 className="lineheight-docs">Description:</h2>
      <p className="lineheight-docs">
        This function takes a model name as input and returns a dictionary with
        statistics for that model. <br />
        The statistics include data such as the current drawdown, average
        drawdown, maximum drawdown, <br /> R-squared score, Sharpe ratio,
        Sortino ratio, total profit and loss, win-loss ratio, win percentage,{" "}
        <br />
        loss percentage, consecutive wins and losses, and profit and loss sums
        over different time periods.
      </p>
      <h2 className="lineheight-docs">Parameters:</h2>
      <ul className="lineheight-docs-list">
        <li>
          <strong>model_name</strong> (string): The name of the model for which
          statistics are requested. This is a required parameter.
        </li>
      </ul>
      <h2 className="lineheight-docs">Return Value:</h2>
      <p className="lineheight-docs">
        The function returns a dictionary with the following keys and values:
      </p>
      <ul className="lineheight-docs-list">
        <li>
          <strong>response</strong> (list): A list containing a dictionary with
          statistics on the model.
        </li>
        <ul className="lineheight-docs-list">
          <li>
            <strong>rank</strong> (int): The rank of the model based on its
            performance.
          </li>
          <li>
            <strong>strategy_name</strong> (string): The name of the strategy
            used by the model.
          </li>
          <li>
            <strong>current_drawdown</strong> (float): The current drawdown for
            the model, as a percentage.
          </li>
          <li>
            <strong>curr_drawdown_duration</strong> (int): The duration of the
            current drawdown, in days.
          </li>
          <li>
            <strong>average_drawdown</strong> (float): The average drawdown for
            the model, as a percentage.
          </li>
          <li>
            <strong>average_drawdown_duration</strong> (float): The average
            duration of drawdowns, in days.
          </li>
          <li>
            <strong>max_drawdown</strong> (float): The maximum drawdown for the
            model, as a percentage.
          </li>
          <li>
            <strong>max_drawdown_duration</strong> (int): The duration of the
            maximum drawdown, in days.
          </li>
          <li>
            <strong>r2_score</strong> (float): The R-squared score for the
            model.
          </li>
          <li>
            <strong>sharpe</strong> (float): The Sharpe ratio for the model.
          </li>
          <li>
            <strong>sortino</strong> (float): The Sortino ratio for the model.
          </li>
          <li>
            <strong>total_pnl</strong> (float): The total profit or loss for the
            model, as a percentage.
          </li>
          <li>
            <strong>average_daily_pnl</strong> (float): The average daily profit
            or loss for the model, as a percentage.
          </li>
          <li>
            <strong>win_loss_ratio</strong> (float): The win-loss ratio for the
            model.
          </li>
          <li>
            <strong>total_positive_pnl</strong> (float): The total profit for
            the model, as a percentage.
          </li>
          <li>
            <strong>total_negative_pnl</strong> (float): The total loss for the
            model,as a percentage.
          </li>
          <li>
            <strong>total_wins</strong> (int): The total number of winning
            trades for the model.
          </li>
          <li>
            <strong>total_losses</strong> (int): The total number of losing
            trades for the model.
          </li>
          <li>
            <strong>consecutive_wins</strong> (int): The longest streak of
            consecutive winning trades for the model.
          </li>
          <li>
            <strong>consecutive_losses</strong> (int): The longest streak of
            consecutive losing trades for the model.
          </li>
          <li>
            <strong>win_percentage</strong> (float): The percentage of winning
            trades for the model.
          </li>
          <li>
            <strong>loss_percentage</strong> (float): The percentage of losing
            trades for the model.
          </li>
          <li>
            <strong>pnl_sum_1</strong> (float): The sum of the model's profit
            and loss over the last 1 day, as a percentage.
          </li>
          <li>
            <strong>pnl_sum_7</strong> (float): The sum of the model's profit
            and loss over the last 7 days, as a percentage.
          </li>
          <li>
            <strong>pnl_sum_15</strong> (float): The sum of the model's profit
            and loss over the last 15 days, as a percentage.
          </li>
          <li>
            <strong>pnl_sum_30</strong> (float): The sum of the model's profit
            and loss over the last 30 days, as a percentage.
          </li>
          <li>
            <strong>pnl_sum_45</strong> (float): The sum of the model's profit
            and loss over the last 45 days, as a percentage.
          </li>
          <li>
            <strong>pnl_sum_60</strong> (float): The sum of the model's profit
            and loss over the last 60 days, as a percentage.
          </li>
        </ul>
      </ul>
      <h2 className="lineheight-docs">Example Usage:</h2>
      <p className="lineheight-docs">
        To get statistics for a model named "Model Name", you can call the
        function like this:
      </p>
      <pre className="lineheight-docs">zt.get_stats("Model Name")</pre>
      <p className="lineheight-docs">
        This will return a dictionary with information on the model statistics.
      </p>
      {/* <pre>
        {
          '{"response": ["rank": 1,"strategy_name": "ZT1_0M24BTC26",\n"current_drawdown": -9.12,"curr_drawdown_duration": 19,\n"average_drawdown": -2.84,"average_drawdown_duration": 6.12,\n"max_drawdown": -24.75,"max_drawdown_duration": 22,\n"r2_score": 0.94,"sharpe": 33.52,\n"sortino": 44.78,"total_pnl": 148.45,\n"average_daily_pnl": 0.63,"win_loss_ratio": 1.88,\n"total_positive_pnl": 246.41,"total_negative_pnl": -97.96,\n"total_wins": 79,"total_losses": 42,"consective_wins": 9,\n"consective_losses": 4,"total_trades": 121,"total_long_trades": 69,\n"total_short_trades": 52,"average_trade_duration": "0 days 00:07:45.181818",\n"average_long_trade_duration": "0 days 00:08:22.260869","average_short_trade_duration": "0 days 00:06:47.346153"}]}'
        }
      </pre> */}
    </div>,

    <div>
      <h1 className="lineheight-docs">Function Name: zt.get_ledger()</h1>
      <h2 className="lineheight-docs">Description:</h2>
      <p className="lineheight-docs">
        This function takes a model name as input and returns a dictionary with
        information on the ledger for that model. The ledger includes data such
        as the timestamp of the last transaction, the action taken (long or
        short), the buy and sell prices, the profit and loss (PNL), the current
        balance, the total PNL, the ledger key, and the drawdown.
      </p>
      <h2 className="lineheight-docs">Parameters:</h2>
      <ul className="lineheight-docs-list">
        <li>
          <strong>model_name</strong> (string): The name of the model for which
          the ledger information is requested. This is a required parameter.
        </li>
      </ul>
      <h2 className="lineheight-docs">Return Value:</h2>
      <p className="lineheight-docs">
        The function returns a dictionary with the following keys and values:
      </p>
      <ul className="lineheight-docs-list">
        <li>
          <strong>response</strong> (list): A list containing a dictionary with
          information on the model's ledger.
        </li>
        <li>
          <strong>ledger_timestamp</strong> (int): The timestamp of the last
          transaction in the ledger, in Unix time.
        </li>
        <li>
          <strong>action</strong> (string): The action taken in the last
          transaction, either "long" or "short".
        </li>
        <li>
          <strong>buy_price</strong> (int): The buy price of the last
          transaction.
        </li>
        <li>
          <strong>sell_price</strong> (int): The sell price of the last
          transaction. If no sell transaction has been made yet, this value will
          be 0.
        </li>
        <li>
          <strong>pnl</strong> (float): The profit or loss from the last
          transaction, as a percentage.
        </li>
        <li>
          <strong>balance</strong> (float): The current balance of the model.
        </li>
        <li>
          <strong>pnl_sum</strong> (float): The total profit or loss for all
          transactions made by the model, as a percentage.
        </li>
        <li>
          <strong>ledger_key</strong> (int): A unique identifier for the ledger
          entry.
        </li>
        <li>
          <strong>drawdown</strong> (float): The current drawdown for the model,
          as a percentage.
        </li>
      </ul>
      <h2 className="lineheight-docs">Example Usage:</h2>
      <p className="lineheight-docs">
        To get the ledger information for a model named "user_3AsdCcBYvs", you
        can call the function like this:
      </p>
      <pre className="lineheight-docs">zt.get_ledger("user_3AsdCcBYvs")</pre>
      <p className="lineheight-docs">
        This will return a dictionary with information on the ledger for the
        specified model.
      </p>
    </div>,
    <div>
      <h1 className="lineheight-docs">
        Function Name: zt.get_historical_forecasts()
      </h1>
      <h2 className="lineheight-docs">Description:</h2>
      <p className="lineheight-docs">
        This function takes a model name as input and returns a dictionary with
        information on the historical forecasts for that model. The historical
        forecasts include data such as the timestamp of the forecast, and the
        prediction made by the model (long or short).
      </p>
      <h2 className="lineheight-docs">Parameters:</h2>
      <ul className="lineheight-docs-list">
        <li>
          <strong>model_name</strong> (string): The name of the model for which
          the historical forecasts are requested. This is a required parameter.
        </li>
      </ul>
      <h2 className="lineheight-docs">Return Value:</h2>
      <p className="lineheight-docs">
        The function returns a dictionary with the following keys and values:
      </p>
      <ul className="lineheight-docs-list">
        <li>
          <strong>response</strong> (list): A list containing a dictionary with
          information on the model's historical forecasts.
        </li>
        <li>
          <strong>forecast_timestamp</strong> (int): The timestamp of the
          forecast in Unix time.
        </li>
        <li>
          <strong>prediction</strong> (string): The prediction made by the model
          for this forecast, either "long" or "short".
        </li>
      </ul>
      <h2 className="lineheight-docs">Example Usage:</h2>
      <p className="lineheight-docs">
        To get the historical forecasts for a model named "user_3AsdCcBYvs", you
        can call the function like this:
      </p>
      <pre className="lineheight-docs">
        zt.get_historical_forecasts("user_3AsdCcBYvs")
      </pre>
      <p className="lineheight-docs">
        This will return a dictionary with information on the historical
        forecasts for the specified model, which will look something like this:
      </p>
      <pre>
        {
          "{'response': [{'forecast_timestamp': '1660262400', 'prediction': 'Long'}]}"
        }
      </pre>
    </div>,

    ,
  ];

  const pythonCode = [
    `pip install zerotheorem-python`,
    "import zerotheorem as zt \nauth_token = 230304034\nzt.authenticate(auth_token)\n",
    "import zerotheorem as zt \nauth_token = 230304034\nzt.authenticate(auth_token)\nzt.get_forecast('Model name')\n",
    "import zerotheorem as zt \nauth_token = 230304034\nzt.authenticate(auth_token)\nzt.get_stats('Model name')\n",
    "import zerotheorem as zt \nauth_token = 230304034\nzt.authenticate(auth_token)\nzt.get_ledger('Model name')\n",
    "import zerotheorem as zt \nauth_token = 230304034\nzt.authenticate(auth_token)\nzt.get_historical_forecasts('Model name')\n",
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
    <div className="documentation">
      <div className="container">

      {/* SIDEBAR FOR MOBILE VIEW */}
      <div className="heading-mob" onClick={oneClickRes}>
          <h1>Documentation</h1>
        <div>{iamClickRes ? <AiFillCaretUp /> : <AiFillCaretDown />}</div>
      </div>

      {toggleRes && (
        <div id="for-mob-sidebar" className="side-bar side-bar-api-mobile">

          <div className="for-hr sidebar-hr"></div>

          <div className="sidebar-navigator">

          <ul className="documentation-items">
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
        </div>
      )}


        {/* SIDEBAR FOR WEB */}
        <div className="side-bar-api">
          <div className="sidebar-head">
            <h1>Documentation</h1>
          </div>
          <div className="for-hr sidebar-documentation"></div>
          <ul className="documentation-items">
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

        <div className="content-wrapper">
          <div className="content">
            <h1 className="documentation-heading">
              {headings[selectedHeadingIndex]}
            </h1>
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
      </div>
    </div>
  );
}

export default Documentation;
