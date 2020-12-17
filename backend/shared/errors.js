// eslint-disable-next-line max-classes-per-file
class CustomError extends Error {
    constructor(message) {
      super(message);
      this.status = 500;
    }
  }
  
  class RecordNotFoundError extends CustomError {
    constructor(message) {
      super(message);
      this.status = 404;
    }
  }
  
  module.exports = {
    CustomError,
    RecordNotFoundError,
  };
  