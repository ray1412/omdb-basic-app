import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApiData, withAPIDataReducers } from 'utils/api-data-reducer';
import movieService from 'services/movie';
import _ from 'utils/lodash-wrapper';

const initialState = createApiData();

export const getMovieDetail = createAsyncThunk(
  'FETCH_MOVIE_DETAIL',
  ({ id }, { rejectWithValue }) => movieService
    .getMovieDetail({ id })
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

const movieDetailSlice = createSlice({
  name: 'MOVIE_DETAIL',
  initialState,
  reducers: {
    reset: () =>  {
      return initialState
    },
  },
  extraReducers: withAPIDataReducers({
    asyncThunk: getMovieDetail,
  }),
});

export const selectMovieDetailReduxState = (rootState) => {
  return {
    isSuccess: rootState.detail.isSuccess,
    isFetching: rootState.detail.isFetching,
    errorMessage: rootState.detail.errorMessage,
    data: rootState.detail.data
  }
}

export const {
  reset: resetMovieDetail,
} = movieDetailSlice.actions;

export const movieDetailReducer = movieDetailSlice.reducer;
