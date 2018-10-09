import * as mongoose from "mongoose"

import {config} from "./config"
import {logger} from "./logger"

mongoose.connect(config.mongoDb.connectionString, {useNewUrlParser: true})
    .then(() => {
        logger.info("connected to mongoDb")
    })
    .catch((error) => {
        logger.error("error connecting to mongoDb", error)
    })

export const mongoDb = mongoose.connection
