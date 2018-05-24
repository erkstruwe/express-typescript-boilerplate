import {CustomError} from "../CustomError"

export function testController(req, res, next) {
    if (req.query.error) {
        return next(new CustomError(500, "The error parameter was used."))
    }

    return res.json({
        status: "ok",
        data: {
            some: "thing",
        },
    })
}
