const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
process.env.NODE_ENV = "development";

module.exports = {
    mode: "development",
    // could set target to node if app running in node instead of react
    target: "web",
    // recommended for dev -> source map for debugging
    devtool: "cheap-module-source-map",
    // index.jsx default for webpack
    entry: "./src/index.jsx",
    output: {
        // webpack serves app from memory via paths
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        // html references bundle being served from memory
        filename: "bundle.js"
    },
    devServer: {
        // reduces info output to CLI
        stats: "minimal",
        // overlay browser errors
        overlay: true,
        // all reqs sent to index.html
        historyApiFallback: true,
        // following three due to issue with webpack using latest version of chrome
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify("http://localhost:3001")
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            favicon: "src/favicon.ico"
        })
    ],
    module: {
        rules: [
            {   
                // js or jsx files
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // "babel-loader" -> run babel on all JS/JSX -> webpack bundles
                // rules processed from bottom up; eslint first then babel 
                use: ["babel-loader", "eslint-loader"]
            },
            {   
                test: /(\.css)$/,
                // import css just like js-> webpack bundles
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};