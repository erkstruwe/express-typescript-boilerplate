interface IConsoleMessage {
    message: string
    data: object
}

const consoleMessage: IConsoleMessage = {
    message: "Running",
    data: {},
}

console.log(consoleMessage.message, consoleMessage.data)
