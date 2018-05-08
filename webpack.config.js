const path = require("path")

module.exports = (env, argv) => {
    return {
        mode: argv.mode || 'development',
        entry: {
            main: "./src/app/index"
        },
        output: {
            path: path.resolve(__dirname, "public/generated"),
            publicPath: "/generated",
            filename: "[name].[chunkhash].min.js"
        },
        resolve: {
            extensions: [".ts", ".js", ".json", ".scss"]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                }
            ]
        }
    }
}