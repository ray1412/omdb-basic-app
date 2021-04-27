import Bluebird from 'bluebird';
import _ from 'utils/lodash-wrapper';

export default class ApiCaller {
  constructor({ httpClient, errorHandler }) {
    this.httpClient = httpClient;
    this.errorHandler = errorHandler;
  }

  get(url, options = {}) {
    return Bluebird.resolve()
      .then(() => {
        const { data, ...otherConfig } = options;
        const params = _.get(data, 'params', {});
        const body = _.omit(data, 'params');

        const apiCallerConfig = {
          ...otherConfig,
          method: 'GET',
          params,
          url,
        };

        if (!_.isEmpty(body)) {
          apiCallerConfig.data = body;
        }

        return this.httpClient(apiCallerConfig);
      })
      .catch(this.errorHandler);
  }

  post(url, options = {}) {
    return Bluebird.resolve()
      .then(() => this.httpClient.post(url, options.data, options.config))
      .catch(this.errorHandler);
  }

  patch(url, options = {}) {
    return Bluebird.resolve()
      .then(() => this.httpClient.patch(url, options.data, options.config))
      .catch(this.errorHandler);
  }

  delete(url, options = {}) {
    return Bluebird.resolve()
      .then(() => this.httpClient.delete(url, { data: options.data }))
      .catch(this.errorHandler);
  }

  put(url, options = {}) {
    return Bluebird.resolve()
      .then(() => this.httpClient.put(url, options.data, options.config))
      .catch(this.errorHandler);
  }
}
