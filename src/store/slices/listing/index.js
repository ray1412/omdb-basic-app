import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {createApiData, withAPIDataMergeReducers} from 'utils/api-data-reducer';
import movieService from 'services/movie';
import _ from 'utils/lodash-wrapper';

const initialState = createApiData({
  keyword: '',
  list: [],
  totalCount: 0
});

export const getMovieList = createAsyncThunk(
  'FETCH_MOVIE_LIST',
  ({ keyword, page }, { dispatch, rejectWithValue }) => movieService
    .getMovieList({ keyword, page })
    .then(data => {
      const responseBool = _.chain(data)
        .get('Response')
        .toLower()
        .value();

      if (responseBool === 'false') {
        return rejectWithValue(_.get(data, 'Error'))
      }

      dispatch(increasePagination());

      return {
        list: _.get(data, 'Search', []),
        totalCount: _.get(data, 'totalResults', []),
      }
    })
    .catch(rejectWithValue)
);

const movieListingSlice = createSlice({
  name: 'MOVIE_LISTING',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      _.set(state, 'data.keyword', action.payload);
    },
    increasePagination: (state) => {
      _.set(state, 'page', state.page += 1);
    },
    reset: () =>  {
      return initialState
    },
  },
  extraReducers: _.flowRight(
    withAPIDataMergeReducers({
      asyncThunk: getMovieList,
    }),
  )
});

export const selectMovieListReduxState = (rootState) => {
  return {
    isSuccess: rootState.listing.isSuccess,
    isFetching: rootState.listing.isFetching,
    errorMessage: rootState.listing.errorMessage,
    page: rootState.listing.page,
    data: _.get(rootState.listing.data, 'list', []),
    keyword: _.get(rootState.listing.data, 'keyword', ''),
    totalData: _.get(rootState.listing.data, 'totalCount', 0),
  }
}

export const {
  reset: resetMovieList,
  increasePagination,
  setKeyword,
} = movieListingSlice.actions;

export const movieListingReducer = movieListingSlice.reducer;
