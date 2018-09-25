export class CustomError extends Error {
    public statusCode: number
    public data: any

    constructor(statusCode: number, message: string, data: any = null) {
        super(message)
        this.statusCode = statusCode
        this.data = data
    }
}
