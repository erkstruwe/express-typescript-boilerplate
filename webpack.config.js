const path = require("path")

module.exports = (env) => ({
    entry: {
        main: "./src/app/index"
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].min.js"
    },
    resolve: {
        extensions: [".ts", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
})