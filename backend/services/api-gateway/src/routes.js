const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {

    app.use(
        "/api/auth",
        createProxyMiddleware({
            target: process.env.AUTH_SERVICE,
            changeOrigin: true
        })
    );

    app.use(
        "/api/portfolio",
        createProxyMiddleware({
            target: process.env.PORTFOLIO_SERVICE,
            changeOrigin: true
        })
    );

    app.use(
        "/api/orders",
        createProxyMiddleware({
            target: process.env.ORDER_SERVICE,
            changeOrigin: true
        })
    );

    app.use(
        "/api/stocks",
        createProxyMiddleware({
            target: process.env.STOCK_SERVICE,
            changeOrigin: true
        })
    );

};