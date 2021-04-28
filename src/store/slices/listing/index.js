import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApiData, withAPIDataReducers } from 'utils/api-data-reducer';
import movieService from 'services/movie';
import _ from 'utils/lodash-wrapper';

const initialState = createApiData();

export const getMovieList = createAsyncThunk(
  'FETCH_MOVIE_LIST',
  ({ keyword, page }) => movieService
    .getMovieList({ keyword, page })
    // .catch(_.flowRight(rejectWithValue, extractErrorMessageFromError)),
);

const movieListingSlice = createSlice({
  name: 'MOVIE_LISTING',
  initialState,
  reducers: {
    reset: (state, action) =>  {},
  },
  extraReducers: withAPIDataReducers({
    asyncThunk: getMovieList,
  }),
  });

export const {
  reset: resetMovieList,
} = movieListingSlice.actions;

export const movieListingReducer = movieListingSlice.reducer;
