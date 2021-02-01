const webpackCompiller = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const proxyMiddleware = require("./proxyMiddleware");

// const onServerListening = (server) => {
//   console.log(
//     "Proxy-DevServer Listening on " + server.listeningApp.address?.().port
//   );
// };
const startProxyServerFn = (routesConfig) => (pathMatch) => (webpackConfig) => {
  const devServerOptions = {
    // onListening: onServerListening,
    ...webpackConfig?.devServer,
    hot: true,
    before: proxyMiddleware(routesConfig)(pathMatch),
  };
  const compiller = webpackCompiller({
    ...webpackConfig,
    devServer: devServerOptions,
  });

  const server = new WebpackDevServer(compiller, devServerOptions);
  return (port) => {
    const PORT = port || process.env.PORT || 3000;
    server.listen(PORT);
  };
};

module.exports = startProxyServerFn;
