import { extractData, getApiCaller } from 'utils/api';
import apiConfig from 'configs/api';

const getMovieList = ({ keyword, page}) => getApiCaller()
  .get(apiConfig.movie.list, {
    data: {
      params: {
        s: keyword,
        page
      }
    }
  })
  .then(extractData)

const getMovieDetail = ({ id }) => getApiCaller()
  .get(apiConfig.movie.detail, {
    data: {
      params: {
        i: id,
      }
    }
  })
  .then(extractData)

const movieService = {
  getMovieList,
  getMovieDetail
}

export default movieService;
