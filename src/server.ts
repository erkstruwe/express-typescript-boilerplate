import * as express from "express"
import * as path from "path"

import {router} from "./router"

export const server = express()

server.set("views", path.resolve(__dirname, "views"))

server.use(router)
