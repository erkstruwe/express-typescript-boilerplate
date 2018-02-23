import * as express from "express"
import * as path from "path"
import * as compression from "compression"
import * as helmet from "helmet"

import {router} from "./router"

export const server = express()

server.set("views", path.resolve(__dirname, "views"))

server.use(compression())
server.use(helmet())

server.use(router)
