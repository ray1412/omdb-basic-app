function ResourceNotFoundError(message, options) {
  const { method, url } = options.response.config;

  this.message = message;
  this.name = 'ResourceNotFoundError';
  this.status = 404;
  this.response = {
    type: 'ResourceNotFoundError',
    message: `${message}\nTarget: [${method}] ${url}`,
  };

  if (options.stack) {
    this.stack = options.stack;
  } else {
    Error.captureStackTrace(this, ResourceNotFoundError);
  }
}

ResourceNotFoundError.prototype = Object.create(Error.prototype);
ResourceNotFoundError.prototype.constructor = ResourceNotFoundError;

module.exports = ResourceNotFoundError;
