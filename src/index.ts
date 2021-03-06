import * as dotenv from "dotenv"

dotenv.config({
    silent: true,
})

import {config} from "./config"
import {logger} from "./logger"
import {server} from "./server"

server.listen(config.port, () => {
    logger.info(`listening on http://localhost:${config.port}/`)
})
