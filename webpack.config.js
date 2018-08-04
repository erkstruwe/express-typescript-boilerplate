const path = require("path")

const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = (env, argv) => {
    return {
        mode: argv.mode,
        entry: {
            main: "./src/app/index",
            vue: "./src/app/vue",
        },
        output: {
            path: path.resolve(__dirname, "public/generated"),
            publicPath: "/generated/",
            filename: "[name].[contenthash].min.js",
            chunkFilename: '[name].[contenthash].min.js',
        },
        resolve: {
            extensions: [".ts", ".js", ".json", ".scss", ".vue"],
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
                {
                    test: /\.js$/,
                    exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"],
                    },
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.app.json",
                        appendTsSuffixTo: [/\.vue$/],
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                },
                {
                    test: /\.pug$/,
                    oneOf: [
                        // this applies to `<template lang="pug">` in Vue components
                        {
                            resourceQuery: /^\?vue/,
                            use: ["pug-plain-loader"],
                        },
                        // this applies to pug imports inside JavaScript
                        {
                            use: ["raw-loader", "pug-plain-loader"],
                        },
                    ],
                },
            ],
        },
        plugins: [
            new VueLoaderPlugin(),
        ],
    }
}