import * as cors from "cors"
import * as express from "express"

import {testController} from "../controllers/test"
import {CustomError} from "../CustomError"
import {logger} from "../logger"

export const apiRouter = express.Router({
    caseSensitive: true,
    strict: true,
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

// authentication
// e. g. using passport: apiRouter.use(passport.authenticate("localapikey", {session: false}))

// api routes
apiRouter.get("/test", testController)

// error handling
apiRouter.use((e, req, res, next) => {
    logger.warn(e)

    if (res.headersSent) {
        return next(e)
    }

    return res.status(e.statusCode || 500)
        .json({
            status: "error",
            message: e.message,
            data: null,
        })
})
