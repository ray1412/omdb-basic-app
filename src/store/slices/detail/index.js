import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApiData, withAPIDataReducers } from 'utils/api-data-reducer';
import movieService from 'services/movie';
import _ from 'utils/lodash-wrapper';

const initialState = createApiData();

export const getMovieList = createAsyncThunk(
  'FETCH_MOVIE_DETAIL',
  ({ email, password }) => movieService
    .getMovieDetail({ email, password })
  // .catch(_.flowRight(rejectWithValue, extractErrorMessageFromError)),
);

const movieDetailSlice = createSlice({
  name: 'MOVIE_DETAIL',
  initialState,
  reducers: {
    reset: (state, action) =>  {},
  },
  extraReducers: withAPIDataReducers({
    asyncThunk: getMovieList,
  }),
});

export const {
  reset: resetMovieDetail,
} = movieDetailSlice.actions;

export const movieDetailReducer = movieDetailSlice.reducer;
