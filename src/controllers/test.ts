import {CustomError} from "../CustomError"

export function testController(req, res, next) {
    if (typeof req.query.error !== "undefined") {
        return next(new Error("The error parameter was used."))
    }
    if (typeof req.query.customError !== "undefined") {
        return next(new CustomError(400, "The customError parameter was used."))
    }
    return res.json({
        something: true,
    })
}
