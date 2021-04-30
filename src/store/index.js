import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { movieListingReducer } from 'store/slices/listing'
import { movieDetailReducer } from 'store/slices/detail'
import { autoCompleteReducer } from 'store/slices/auto-complete'


const reducer = combineReducers({
  listing: movieListingReducer,
  detail: movieDetailReducer,
  autoComplete: autoCompleteReducer
});

const store = configureStore({
  reducer,
})
export default store;
