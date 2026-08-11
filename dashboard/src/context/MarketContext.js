import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import socket from "../services/socket";

const MarketContext = createContext(null);

export const MarketProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialStocks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "http://localhost:3004/api/stocks"
        );

        setStocks(response.data.data || []);
      } catch (error) {
        console.error(
          "Failed to fetch initial stocks:",
          error.message
        );

        setError("Unable to load market data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialStocks();

    const handleConnect = () => {
      console.log("Market socket connected:", socket.id);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Market socket disconnected");
      setIsConnected(false);
    };

    const handleMarketUpdate = (updatedStocks) => {
      setStocks((previousStocks) => {
        const updatedStockMap = new Map(
          updatedStocks.map((stock) => [
            stock.symbol,
            stock,
          ])
        );

        return previousStocks.map((stock) => {
          const update = updatedStockMap.get(stock.symbol);

          if (!update) {
            return stock;
          }

          return {
            ...stock,
            ...update,
          };
        });
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("market-update", handleMarketUpdate);

    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("market-update", handleMarketUpdate);

      socket.disconnect();
    };
  }, []);

  return (
    <MarketContext.Provider
      value={{
        stocks,
        loading,
        error,
        isConnected,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);

  if (!context) {
    throw new Error(
      "useMarket must be used inside MarketProvider"
    );
  }

  return context;
};