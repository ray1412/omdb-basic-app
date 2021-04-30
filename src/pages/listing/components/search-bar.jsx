import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMovieList,
  setKeyword,
  resetMovieList
} from 'store/slices/listing';
import {
  getAutocompleteMovieList,
  resetAutoComplete,
  selectAutoCompleteReduxState
} from 'store/slices/auto-complete'

import _ from 'utils/lodash-wrapper';

const ListingSearchBarComponent = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('')
  const { data: autoCompleteData } = useSelector(selectAutoCompleteReduxState)

  const handleInputValueOnChange = (e) => {
    const { target } = e;
    const { value } = target;

    return setInputValue(value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(resetMovieList());
    dispatch(setKeyword(_.toLower(inputValue)))

    return dispatch(getMovieList({
      keyword: _.toLower(inputValue),
      page: 1
    }))
  }

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(resetAutoComplete());
    dispatch(resetMovieList())

    return setInputValue('');
  }

  const debouncedQuery = useCallback(
    _.debounce((val) => {
      dispatch(getAutocompleteMovieList({
        keyword: val,
        page: 1
      }))
    }, 500), []);

  useEffect(() => {
    if (
      !_.isEmpty(inputValue)
      && !_.includes(autoCompleteData, inputValue)
    ) {
      debouncedQuery(_.toLower(inputValue));
    }
  }, [inputValue]);

  const renderAutoCompleteOption = () => {
    if (_.isNil(autoCompleteData)) {
      return null;
    }

    return autoCompleteData.map((item, idx) => {
      return (
        <option value={item} key={`${item}-${idx}`} />
      )
    })
  }

  return (
    <form onSubmit={handleSearch} className="listing-search-bar-container">
      <div className="search-box">
        <input
          type="text"
          list="keyword"
          value={inputValue}
          onChange={handleInputValueOnChange}
          placeholder="Search any movie!"
        />
        <datalist id="keyword">
          {renderAutoCompleteOption()}
        </datalist>
      </div>
      <div>
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default ListingSearchBarComponent;
