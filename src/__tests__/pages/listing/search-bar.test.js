import { render, cleanup, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux'
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';

import ListingSearchBarComponent from 'pages/listing/components/search-bar';
import {movieListingReducer} from 'store/slices/listing';
import {movieDetailReducer} from 'store/slices/detail';
import {autoCompleteReducer} from 'store/slices/auto-complete';

const reducer = combineReducers({
  listing: movieListingReducer,
  detail: movieDetailReducer,
  autoComplete: autoCompleteReducer
});

const store = configureStore({
  reducer,
})

const Wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

afterEach(cleanup)

describe("Test Listing Page Search Bar", () => {
  it('reset input value', () => {

    const { getByText, container } = render(<ListingSearchBarComponent />, { wrapper: Wrapper });

    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: '123' } })
    fireEvent.click(getByText('Reset'))

    expect(input.value).toBe('')
  });
})
