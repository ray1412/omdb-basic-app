import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { movieListingReducer } from 'store/slices/listing'
import { movieDetailReducer } from 'store/slices/detail'


const reducer = combineReducers({
  listing: movieListingReducer,
  detail: movieDetailReducer
})
const store = configureStore({
  reducer,
})
export default store;
