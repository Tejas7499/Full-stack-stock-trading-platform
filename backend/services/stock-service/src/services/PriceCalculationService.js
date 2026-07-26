class PriceCalculationService {

    
    static calculateNewPrice(currentPrice) {

        const movementPercent =
            (Math.random() * 2 - 1) * 0.01;

        const newPrice =
            currentPrice * (1 + movementPercent);

        return Number(newPrice.toFixed(2));
    }

}

module.exports = PriceCalculationService;