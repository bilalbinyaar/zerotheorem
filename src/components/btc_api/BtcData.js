import React, { useState, useEffect } from "react";

function BtcData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Bitcoin Stats</h1>
      <p>Current Price: {data.market_data.current_price.usd} USD</p>
      <p>
        1h Change: {data.market_data.price_change_percentage_1h_in_currency.usd}
        %
      </p>
      <p>
        24h Change:{" "}
        {data.market_data.price_change_percentage_24h_in_currency.usd}%
      </p>
      <p>
        7d Change: {data.market_data.price_change_percentage_7d_in_currency.usd}
        %
      </p>
      <p>
        30d Change:{" "}
        {data.market_data.price_change_percentage_30d_in_currency.usd}%
      </p>
      <p>Market Cap: {data.market_data.market_cap.usd} USD</p>
    </div>
  );
}

export default BtcData;
