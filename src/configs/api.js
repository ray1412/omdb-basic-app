import _ from 'utils/lodash-wrapper';

// const urlBuilder = (baseUrl, path) => (paramObj) => {
//   const fullPath = `${baseUrl}${path}`;
//
//   if (!_.isObject(paramObj)) {
//     return fullPath;
//   }
//
//   return _.keys(paramObj)
//     .reduce(
//       (acc, paramKey) => acc.replace(`:${paramKey}`, paramObj[paramKey]),
//       fullPath,
//     );
// };

const urlBuilder = () => {
  return `${process.env.REACT_APP_OMDB_API_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}`
};

const apiConfig = {
  movie: {
    list: urlBuilder(),
    detail: urlBuilder(),
  }
};

export default apiConfig;
