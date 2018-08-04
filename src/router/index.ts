import * as express from "express"
import * as st from "st"
import * as webpack from "webpack"
import * as webpackDevMiddleware from "webpack-dev-middleware"

import * as webpackConfigFactory from "../../webpack.config"
import {config} from "../config"
import {apiRouter} from "./api"

export const router = express.Router({
    caseSensitive: true,
    strict: true,
})

// provide assets built by webpack to template engine
if (config.mode === "development") {
    const webpackConfig = webpackConfigFactory({}, {mode: config.mode})
    const compiler = webpack(webpackConfig)
    router.use(
        webpackDevMiddleware(
            compiler,
            {
                serverSideRender: true,
                publicPath: webpackConfig.output.publicPath,
                stats: {
                    builtAt: false,
                    colors: true,
                    entrypoints: false,
                    hash: false,
                    modules: false,
                    version: false,
                },
            },
        ),
    )
    router.use((req, res, next) => {
        res.locals.webpackStatsJson = res.locals.webpackStats.toJson()
        return next()
    })
} else {
    const webpackStatsJson = require("../../webpackStats")
    router.use((req, res, next) => {
        res.locals.webpackStatsJson = webpackStatsJson
        return next()
    })
}

// routes
router.get("/", (req, res) => res.render("index.pug"))
router.get("/name", (req, res) => res.send(config.name))
router.get("/version", (req, res) => res.send(config.version))
router.get("/health", (req, res) => res.send(""))

router.use(config.apiPath, apiRouter)

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
