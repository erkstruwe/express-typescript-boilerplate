require("bootstrap/scss/bootstrap")

interface IConsoleMessage {
    message: string
    data: object
}

const consoleMessage: IConsoleMessage = {
    message: "Running",
    data: {},
}

console.log(consoleMessage.message, consoleMessage.data)

import(/* webpackChunkName: "lodash" */ "lodash")
    .then((lodash) => {
        console.log(lodash.join(["Dynamic", "imports"], " "))
    })
    .catch(console.error)
