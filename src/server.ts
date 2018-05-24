import * as compression from "compression"
import * as express from "express"
import * as helmet from "helmet"
import * as path from "path"

import {config} from "./config"
import {router} from "./router"

export const server = express()

server.set("views", path.resolve(__dirname, "views"))
server.set("trust proxy", true)
server.set("case sensitive routing", true)
server.set("strict routing", true)

server.locals.packageJson = require("../package.json")
server.locals.config = config

server.use(compression())
server.use(helmet())

server.use(router)
