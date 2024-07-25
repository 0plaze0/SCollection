import { CustomError, CustomErrorContent } from "../errors/CustomError";

export class ConfigError extends CustomError {
  readonly statusCode = 500;
  readonly errors: CustomErrorContent[];
  readonly logging = true;

  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
    this.errors = [{ message: this.message }];

    Object.setPrototypeOf(this, ConfigError.prototype);
  }
}
