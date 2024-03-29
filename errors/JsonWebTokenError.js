const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class JsonWebTokenError extends CustomAPIError {
  constructor(message, status) {
    super(message);
    this.name = "JsonWebTokenError";
    this.status = status;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = JsonWebTokenError;
