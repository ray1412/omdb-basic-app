export const errorMessage = 'Invalid Token';

function ForbiddenError(message, options) {
  const { method, url } = options.response.config;

  this.message = message;
  this.name = 'ForbiddenError';
  this.status = 403;
  this.response = {
    type: 'ForbiddenError',
    message: `${message}\nTarget: [${method}] ${url}`,
  };

  if (options.stack) {
    this.stack = options.stack;
  } else {
    Error.captureStackTrace(this, ForbiddenError);
  }
}

ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

export default ForbiddenError;
