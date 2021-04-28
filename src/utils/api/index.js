import _ from 'utils/lodash-wrapper';
import axios from 'axios';
import ApiCaller from 'utils/api/api-caller';
import errorHandler from 'utils/api/error-handler';

/**
 * Get general API caller
 * @returns {ApiCaller}
 */
export const getApiCaller = () => new ApiCaller({
  httpClient: axios.create(),
  errorHandler,
});

export const extractData = (data) => {return _.get(data, 'data');}
