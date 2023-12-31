const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const rateLimit = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/flight-service",
  createProxyMiddleware({
    target: "http://localhost:3000/",
    changeOrigin: true,
    pathRewrite: { "^/flight-service": "/" },
  })
);

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  limit: 50, // Limit each IP to 3 requests per `window` (here, per 15 minutes).
});

app.use(limiter);
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
