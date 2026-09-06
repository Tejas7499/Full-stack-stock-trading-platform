const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("Auth Target:", process.env.AUTH_SERVICE);
  console.log(
    "Portfolio Target:",
    process.env.PORTFOLIO_SERVICE
  );
  console.log("Order Target:", process.env.ORDER_SERVICE);
  console.log("Stock Target:", process.env.STOCK_SERVICE);

  app.use(
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE,
      changeOrigin: true,
      pathFilter: "/api/auth",
      on: {
        proxyReq: fixRequestBody,
      },
    })
  );

  app.use(
    createProxyMiddleware({
      target: process.env.PORTFOLIO_SERVICE,
      changeOrigin: true,
      pathFilter: "/api/portfolio",
      on: {
        proxyReq: fixRequestBody,
      },
    })
  );

  app.use(
    createProxyMiddleware({
      target: process.env.ORDER_SERVICE,
      changeOrigin: true,
      pathFilter: "/api/orders",
      on: {
        proxyReq: fixRequestBody,
      },
    })
  );

  app.use(
    createProxyMiddleware({
      target: process.env.STOCK_SERVICE,
      changeOrigin: true,
      pathFilter: "/api/stocks",
      on: {
        proxyReq: fixRequestBody,
      },
    })
  );
};