const RealtimeService = require("./RealtimeService");
const { StockModel } = require("../models/StockModel");
const PriceCalculationService = require("./PriceCalculationService");

class MarketSimulationService {
  static async updateMarket() {
    try {
      const stocks = await StockModel.find({
        isActive: true,
      });

      for (const stock of stocks) {
        const newPrice =
          PriceCalculationService.calculateNewPrice(stock.currentPrice);

        stock.currentPrice = newPrice;

        stock.change = Number(
          (newPrice - stock.previousClose).toFixed(2)
        );

        stock.changePercent =
          stock.previousClose > 0
            ? Number(
                ((stock.change / stock.previousClose) * 100).toFixed(2)
              )
            : 0;

        stock.dayHigh = Math.max(
          stock.dayHigh ?? newPrice,
          newPrice
        );

        stock.dayLow = Math.min(
          stock.dayLow ?? newPrice,
          newPrice
        );

        stock.volume =
          Number(stock.volume || 0) +
          Math.floor(Math.random() * 200);

        stock.lastPriceUpdate = new Date();

        await stock.save();
      }

      const updatedStocks = stocks.map((stock) => ({
        symbol: stock.symbol,
        currentPrice: stock.currentPrice,
        change: stock.change,
        changePercent: stock.changePercent,
        volume: stock.volume,
        dayHigh: stock.dayHigh,
        dayLow: stock.dayLow,
        lastPriceUpdate: stock.lastPriceUpdate,
      }));

      RealtimeService.broadcast("market-update", updatedStocks);

      console.log(`Market Updated (${stocks.length} stocks)`);
    } catch (error) {
      console.error(
        "Market Simulation Error:",
        error.message
      );
    }
  }

  static start() {
    console.log("Market Simulation Started...");

    setInterval(() => {
      this.updateMarket();
    }, 3000);
  }
}

module.exports = MarketSimulationService;