const request = require("request");

const proxyHandler = (proxyConfig) => (req, res) => {
  if (!!config) {
    const { func, host } = proxyConfig?.[req?.path] || {};
    if (func) {
      func(req, res);
      return;
    }
    if (host) {
      const reqUrl = req.url ?? "";
      req
        ?.pipe(request(reqUrl))
        ?.on("error", () =>
          res
            ?.status?.(500)
            ?.json?.({ msg: "Error occured @ proxy-webpack-dev-middleware" })
        );
    }
    return;
  }
};
const proxyMiddleware = (proxyRoutes) => (proxyPathMatch) => (app) => {
  app.all(proxyPathMatch, proxyHandler(proxyRoutes));
};

module.exports = proxyMiddleware;
