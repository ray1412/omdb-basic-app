function BadGatewayError(message, options) {
  const { method, url } = options.response.config;

  this.message = message;
  this.name = 'Bad Gateway';
  this.status = 502;
  this.response = {
    type: 'Bad Gateway',
    message: `${message}\nTarget: [${method}] ${url}`,
  };

  if (options.stack) {
    this.stack = options.stack;
  } else {
    Error.captureStackTrace(this, BadGatewayError);
  }
}

BadGatewayError.prototype = Object.create(Error.prototype);
BadGatewayError.prototype.constructor = BadGatewayError;

module.exports = BadGatewayError;
