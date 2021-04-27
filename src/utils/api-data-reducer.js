/* eslint-disable no-param-reassign */
import { produce } from './immer';

/**
 * @typedef {Object} ApiData
 * @property {Boolean} isSuccess
 * @property {Boolean} isFetching
 * @property {any} errorMessage
 * @property {any} data
 *
 * @param {any} data initialData
 * @returns {ApiData}
 */
export const createApiData = (data = null) => ({
  isSuccess: false,
  isFetching: false,
  errorMessage: null,
  data,
});

/**
 * @param {ApiData} state
 */
const createApiDataStateOnStart = (state) => produce(state, (draftState) => {
  draftState.isSuccess = false;
  draftState.isFetching = true;
  draftState.errorMessage = null;
});

/**
 * @param {ApiData} state
 * @param {import('@reduxjs/toolkit').PayloadAction} action
 */
const createApiDataStateOnSuccess = (state, action) => produce(state, (draftState) => {
  draftState.isSuccess = true;
  draftState.isFetching = false;
  draftState.errorMessage = null;
  draftState.data = action.payload;
});

/**
 * @param {ApiData} state
 * @param {import('@reduxjs/toolkit').PayloadAction} action
 */
const createApiDataStateOnFailure = (state, action) => produce(state, (draftState) => {
  draftState.isSuccess = false;
  draftState.isFetching = false;
  draftState.errorMessage = action.payload;
});

/**
 * Extend slice's reducer to include API data reducers
 *
 * @param {Object} params
 * @param {import('@reduxjs/toolkit').AsyncThunkAction} params.asyncThunk
 * @returns {(reducerBuilder: import('@reduxjs/toolkit').ActionReducerMapBuilder) => import('@reduxjs/toolkit').ActionReducerMapBuilder)}
 */
export const withAPIDataReducers = ({ asyncThunk }) => (reducerBuilder) => {
  reducerBuilder.addCase(asyncThunk.pending, createApiDataStateOnStart);
  reducerBuilder.addCase(asyncThunk.fulfilled, createApiDataStateOnSuccess);
  reducerBuilder.addCase(asyncThunk.rejected, createApiDataStateOnFailure);

  return reducerBuilder;
};
