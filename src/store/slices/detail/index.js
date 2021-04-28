import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApiData, withAPIDataReducers } from 'utils/api-data-reducer';
import movieService from 'services/movie';
import _ from 'utils/lodash-wrapper';

const initialState = createApiData();

export const getMovieList = createAsyncThunk(
  'FETCH_MOVIE_DETAIL',
  ({ keyword, page }, { rejectWithValue }) => movieService
    .getMovieDetail({ keyword, page })
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
    reset: (state, action) =>  {
      return initialState
    },
  },
  extraReducers: withAPIDataReducers({
    asyncThunk: getMovieList,
  }),
});

export const {
  reset: resetMovieDetail,
} = movieDetailSlice.actions;

export const movieDetailReducer = movieDetailSlice.reducer;
