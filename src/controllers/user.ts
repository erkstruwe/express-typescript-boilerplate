import {UserModel} from "../models/User"

export const getUserController = [
    (req, res, next) => {
        return UserModel.findOne({name: req.params.name})
            .then((user) => {
                if (user) {
                    return res.json(user)
                }
                return res.status(404).json(null)
            })
            .catch(next)
    },
]
