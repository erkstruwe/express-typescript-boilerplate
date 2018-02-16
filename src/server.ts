import * as express from "express"

import {router} from "./router"

export const server = express()

server.use(router)
