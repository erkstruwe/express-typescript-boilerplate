import * as express from "express"
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
            },
        ),
    )
    router.use((req, res, next) => {
        res.locals.webpackStatsJson = res.locals.webpackStats.toJson()
        return next()
    })
} else {
    router.use(express.static("public"))
    const webpackStatsJson = require("../webpackStats")
    router.use((req, res, next) => {
        res.locals.webpackStatsJson = webpackStatsJson
        return next()
    })
}

router.get("/", (req, res) => res.render("index.pug"))
