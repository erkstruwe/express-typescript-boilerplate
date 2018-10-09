import {model, Schema} from "mongoose"

const UserSchema = new Schema(
    {
        name: String,
    },
    {},
)

export const UserModel = model("User", UserSchema)
