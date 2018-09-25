import * as express from "express"

import {config} from "../config"
import {apiRouter} from "./api"

export const router = express.Router({
    caseSensitive: true,
    strict: true,
})

// general routes
router.get("/", (req, res, next) => res.render("index.pug"))
router.get("/name", (req, res) => res.send(config.name))
router.get("/version", (req, res) => res.send(config.version))
router.get("/health", (req, res) => res.send(""))

// api routes
router.use(config.apiPath, apiRouter)
