export class NotExistException extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class MaliciousUserRequestException extends Error {
    constructor(message: string) {
        super(message)
    }
}