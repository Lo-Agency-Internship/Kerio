export class NotExistException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class MaliciousUserRequestException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthEmailAlreadyExistsException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
export class AuthOrganizationAlreadyExistsException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
