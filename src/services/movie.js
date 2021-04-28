import { extractData, getApiCaller } from 'utils/api';
import _ from 'utils/lodash-wrapper';
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

const getMovieDetail = () => {}

const movieService = {
  getMovieList,
  getMovieDetail
}

export default movieService;
