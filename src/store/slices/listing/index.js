import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApiData, withAPIDataReducers } from 'utils/api-data-reducer';
import movieService from 'services/movie';
import _ from 'utils/lodash-wrapper';

const initialState = createApiData();

export const getMovieList = createAsyncThunk(
  'FETCH_MOVIE_LIST',
  ({ keyword, page }, { rejectWithValue }) => movieService
    .getMovieList({ keyword, page })
    .then(data => {
        const responseBool = _.chain(data)
          .get('Response')
          .toLower()
          .value();

        if(responseBool === 'false') {
          return rejectWithValue(_.get(data, 'Error'))
        }

        return data
    })
    .catch(rejectWithValue)
);

const movieListingSlice = createSlice({
  name: 'MOVIE_LISTING',
  initialState,
  reducers: {
    reset: (state, action) =>  {
      return initialState
    },  },
  extraReducers: withAPIDataReducers({
    asyncThunk: getMovieList,
  }),
});

export const selectMovieListReduxState = (rootState) => {
  return {
    isSuccess: rootState.listing.isSuccess,
    isFetching: rootState.listing.isFetching,
    errorMessage: rootState.listing.errorMessage,
    data: _.get(rootState.listing.data, 'Search', []),
    totalData: _.get(rootState.listing.data, 'totalResults', 0),
  }
}

export const {
  reset: resetMovieList,
} = movieListingSlice.actions;

export const movieListingReducer = movieListingSlice.reducer;
