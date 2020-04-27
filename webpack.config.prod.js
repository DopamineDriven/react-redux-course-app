const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// (a)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// (b)
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');
process.env.NODE_ENV = "production";

module.exports = {
    mode: "production",
    target: "web",
    // (c)
    devtool: "source-map",
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "bundle.js"
    },
    plugins: [
        // (d)
        new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyze: "static" }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        // (e)
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {   
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};

/*
(a)
MiniCssExtractPlugin 
    minfies CSS and extracts to separate file
*/

/*
(b)
webpackBundleAnalyzer
    creates a bundle report
*/

/*
(c)
use source-map instead of cheap-module-source-map
    slower to create than dev setting
    higher quality for production built 
*/

/*
(d)
eliminate devServer
add webpackBundleAnalyzer
    configurated to automatically display report of bundle contents upon completion 
add MiniCssExtractPlugin
    minify CSS and extract to separate file
    webpack picks name and adds a hash to it
        name only changes when css changes
    handles supporting far expires headers on web serve
        users only have to reload file when it changes
*/

/*
(e)
modify defined plugins (new webpack.DefinePlugin)
    plugins enhance webpacks power
    define variables made available to libraries built
production mode
    eliminates dev-specific features for performance to deliver smaller bundle size
        property types for example 
HtmlWebpackPlugin
    performs a number of functions
        generates index.html
        adds references to JS/CSS bundles into the html
            useful since JS and CSS filenames change over time since they contain hashes
                can cache them for a long time on web server
    additional prod settings 
        minifies html, removes comments, collapses white spaces, removes redundant attributes,
        uses short doc types, removes style link type attributes, retains closhing slash,
        minifies JS, minifies CSS, and minifies URLs 
*/

/*
(f)
*/