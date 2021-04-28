import { produce } from './immer';

export const createApiData = (data = null) => ({
  isSuccess: false,
  isFetching: false,
  errorMessage: null,
  page: 1,
  data,
});

const createApiDataStateOnStart = (state) => produce(state, (draftState) => {
  draftState.isSuccess = false;
  draftState.isFetching = true;
  draftState.errorMessage = null;
});

const createApiDataStateOnSuccess = (state, action) => produce(state, (draftState) => {
  draftState.isSuccess = true;
  draftState.isFetching = false;
  draftState.errorMessage = null;
  draftState.data = action.payload;
});

const createApiDataMergeStateOnSuccess = (state, action) => produce(state, (draftState) => {
  draftState.isSuccess = true;
  draftState.isFetching = false;
  draftState.errorMessage = null;
  draftState.data.list = [
    ...draftState.data.list,
    ...action.payload.list
  ];
  draftState.data.totalCount = action.payload.totalCount;
});

const createApiDataStateOnFailure = (state, action) => produce(state, (draftState) => {
  draftState.isSuccess = false;
  draftState.isFetching = false;
  draftState.errorMessage = action.payload;
});

export const withAPIDataReducers = ({ asyncThunk }) => (reducerBuilder) => {
  reducerBuilder.addCase(asyncThunk.pending, createApiDataStateOnStart);
  reducerBuilder.addCase(asyncThunk.fulfilled, createApiDataStateOnSuccess);
  reducerBuilder.addCase(asyncThunk.rejected, createApiDataStateOnFailure);

  return reducerBuilder;
};

export const withAPIDataMergeReducers = ({ asyncThunk }) => (reducerBuilder) => {
  reducerBuilder.addCase(asyncThunk.pending, createApiDataStateOnStart);
  reducerBuilder.addCase(asyncThunk.fulfilled, createApiDataMergeStateOnSuccess);
  reducerBuilder.addCase(asyncThunk.rejected, createApiDataStateOnFailure);

  return reducerBuilder;
};
