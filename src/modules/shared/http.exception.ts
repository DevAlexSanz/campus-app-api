export class HttpException extends Error {
  message: string;
  status: number;
  success: boolean;

  constructor(status: number, message: string, success: boolean = false) {
    super(message);

    this.status = status;
    this.message = message;
    this.success = success;

    Error.captureStackTrace(this, this.constructor);
  }
}
