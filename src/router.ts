import {Router} from "express"

import {config} from "./config"

export const router = Router({
    caseSensitive: true,
    strict: true,
})

router.get("/name", (req, res) => res.send(config.name))
router.get("/version", (req, res) => res.send(config.version))
router.get("/health", (req, res) => res.send(""))
