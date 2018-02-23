import * as express from "express"
import * as st from "st"
import * as webpack from "webpack"
import * as webpackDevMiddleware from "webpack-dev-middleware"

import * as webpackConfigFactory from "../webpack.config"
import {config} from "./config"

export const router = express.Router({
    caseSensitive: true,
    strict: true,
})

router.get("/name", (req, res) => res.send(config.name))
router.get("/version", (req, res) => res.send(config.version))
router.get("/health", (req, res) => res.send(""))

if (config.environment === "development") {
    const webpackConfig = webpackConfigFactory()
    const compiler = webpack(webpackConfig)
    router.use(
        webpackDevMiddleware(
            compiler,
            {
                serverSideRender: true,
                publicPath: webpackConfig.output.publicPath,
            },
        ),
    )
    router.use((req, res, next) => {
        res.locals.webpackStatsJson = res.locals.webpackStats.toJson()
        return next()
    })
} else {
    const webpackStatsJson = require("../webpackStats")
    router.use((req, res, next) => {
        res.locals.webpackStatsJson = webpackStatsJson
        return next()
    })
}

router.get("/", (req, res) => res.render("index.pug"))

// Express' built-in static middleware
// router.use(express.static("public"))

// Advanced static middleware
router.use(st({
    path: "public",
    gzip: false, // compression is already applied by compression middleware
    cache: {
        content: {
            maxAge: 1000 * 60 * 60 * 24 * 10,
        },
    },
}))
