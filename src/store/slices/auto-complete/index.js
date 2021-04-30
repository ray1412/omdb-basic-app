import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import movieService from "services/movie";
import _ from "utils/lodash-wrapper";
import {createApiData, withAPIDataReducers} from "utils/api-data-reducer";

const initialState = createApiData();

export const getAutocompleteMovieList = createAsyncThunk(
  'FETCH_MOVIE_LIST_FOR_AUTOCOMPLETE',
  ({ keyword, page }, { rejectWithValue }) => movieService
    .getMovieList({ keyword, page })
    .then(data => {
      const responseBool = _.chain(data)
        .get('Response')
        .toLower()
        .value();

      if (responseBool === 'false') {
        return rejectWithValue(_.get(data, 'Error'))
      }

      // Only display top 5
      return _.chain(data)
        .get('Search', [])
        .slice(0, 5)
        .map(movie => {return movie.Title})
        .value();

    })
    .catch(rejectWithValue)
);


const autoCompleteSlice = createSlice({
  name: 'AUTO_COMPLETE',
  initialState,
  reducers: {
    reset: () =>  {
      return initialState
    },
  },
  extraReducers: _.flowRight(
    withAPIDataReducers({
      asyncThunk: getAutocompleteMovieList,
    }),
  )
});

export const selectAutoCompleteReduxState = (rootState) => {
  return {
    isSuccess: rootState.autoComplete.isSuccess,
    isFetching: rootState.autoComplete.isFetching,
    errorMessage: rootState.autoComplete.errorMessage,
    data: rootState.autoComplete.data
  }
}

export const {
  reset: resetAutoComplete
} = autoCompleteSlice.actions;

export const autoCompleteReducer = autoCompleteSlice.reducer;
