const path = require("path")

module.exports = env => {
  return {
    mode: "development",
    target: "node",
    entry: path.resolve("src/index.ts"),
    output: {
      path: path.resolve("dist"),
      filename: "index.js"
    },
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".json"],
      modules: ["node_modules", path.join(__dirname, "./src")]
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }
        }
      ]
    }
  }
}
