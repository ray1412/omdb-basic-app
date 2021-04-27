function ServiceUnavailableError(message, options) {
  const { method, url } = options.response.config;

  this.message = message;
  this.name = 'Service Unavailable';
  this.status = 503;
  this.response = {
    type: 'Service Unavailable',
    message: `${message}\nTarget: [${method}] ${url}`,
  };

  if (options.stack) {
    this.stack = options.stack;
  } else {
    Error.captureStackTrace(this, ServiceUnavailableError);
  }
}

ServiceUnavailableError.prototype = Object.create(Error.prototype);
ServiceUnavailableError.prototype.constructor = ServiceUnavailableError;

module.exports = ServiceUnavailableError;
