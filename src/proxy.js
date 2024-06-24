const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/user", {
            target: process.env.REACT_APP_API_URL,
            changeOrigin: true
        }),
        createProxyMiddleware("/project", {
            target: process.env.REACT_APP_API_URL,
            changeOrigin: true
        })
    );
};