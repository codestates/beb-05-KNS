class CustomError extends Error {
    constructor(msg, statusCode) {
      super(msg);
      this.status = statusCode;
      this.statusCode = statusCode;
    }
  }
  
  module.exports = CustomError