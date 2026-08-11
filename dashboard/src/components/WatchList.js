import { useMarket } from "../context/MarketContext";
import React, { useState, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import {BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz} from "@mui/icons-material";
import GeneralContext from "./GeneralContext"; 
import DoughnutChart from "./DoughnutChart";

const WatchList = () => {

  const {
    stocks,
    loading,
    error,
    isConnected,
  } = useMarket();



  const labels = stocks.map((stock) => stock.symbol);
  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: stocks.map((stock) => stock.currentPrice),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  if (loading) {
    return (
      <div className="watchlist-container">
        <p>Loading market data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="watchlist-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
      <div className= "watchlist-container">
        <div className="search-container">
          <input type="text" placeholder= "Search eg:infy, bse, nifty, fut weekly, gold mcx" className = "search" name="search" id="search" />
          <span className="counts"> {stocks.length} / 50</span>
          <span className={isConnected ? "up" : "down"}>
            {isConnected ? "● Live" : "● Reconnecting"}
          </span>
        </div>

        <ul className="list">
          {stocks.map((stock, index) => (
            <WatchlistItem stock={stock} key={stock.symbol || index} />
          ))}
        </ul>

        <DoughnutChart data = {data} />
      </div>
  );
};

export default WatchList;

const WatchlistItem = ({stock}) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  }

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  }

  return(
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.change < 0 ? "down" : "up"}>
          {stock.symbol}
        </p>

        <div className="itemInfo">
          <span className="percent">
            {Number(stock.changePercent).toFixed(2)}%
          </span>

          {stock.change < 0 ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">
            {Number(stock.currentPrice).toFixed(2)}
          </span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.symbol}/>}
    </li>
  )
}

const WatchListActions = ({uid}) => {

  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return(
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow} onClick={handleBuyClick}>
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon"/>
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon"/>
          </button>
        </Tooltip>
      </span>
    </span>
  )
}