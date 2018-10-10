import * as cors from "cors"
import * as express from "express"

import {testController} from "../controllers/test"
import {getUserController} from "../controllers/user"
import {CustomError} from "../CustomError"
import {logger} from "../logger"

export const apiRouter = express.Router({
    caseSensitive: true,
    strict: true,
})

// logging
apiRouter.use((req, res, next) => {
    res.locals.time = new Date()

    // overwrite res.json function with wrapper
    const originalJson = res.json.bind(res)
    res.json = (data: any, message: string | null = null, status: string = "ok") => {
        const now = new Date()
        const duration = now.valueOf() - res.locals.time.valueOf()
        logger.info("request", {statusCode: res.statusCode, url: req.url, duration})

        return originalJson({
            status,
            message,
            data,
        })
    }

    return next()
})

// content type
apiRouter.use((req, res, next) => {
    if (!req.accepts("application/json")) {
        return next(new CustomError(400, "This is a JSON-only API. Please set the 'Accepts' HTTP header accordingly."))
    }

    return next()
})

// cors
const corsOptions = {}
apiRouter.options("*", cors(corsOptions))
apiRouter.use(cors(corsOptions))

// api routes
apiRouter.get("/test", testController)
apiRouter.get("/user/:name", getUserController)

// error handling
apiRouter.use((error, req, res, next) => {
    if (res.headersSent) {
        logger.warn("Headers sent before apiRouter error handler")
        return next(error)
    }

    const statusCode = error.statusCode || 500
    res.status(statusCode)
        .json(error.data, error.message, "error")
    logger.warn("apiRouter Error handler", {
        statusCode,
        msg: error.toString(),
        data: error.data || null,
        stack: error.stack,
    })
    return next()
})
