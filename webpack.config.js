/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const PerspectivePlugin = require("@finos/perspective-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.js",
    output: {
        filename: "index.js",
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: "NYPD CCRB Stats",
        }),
        new PerspectivePlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{loader: "style-loader"}, {loader: "css-loader"}],
            },
        ],
    },
    stats: {
        modules: false,
        hash: false,
        version: false,
        builtAt: false,
        entrypoints: false,
    },
    devServer: {
        contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "./node_modules/superstore-arrow")],
    },
    devtool: "source-map",
    experiments: {
        syncWebAssembly: true,
    },
};
