import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {getMovieList, resetMovieList} from 'store/slices/listing';
import PropTypes from 'prop-types';

import _ from 'utils/lodash-wrapper';

const ListingSearchBarComponent = props => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('')

  const handleInputValueOnChange = (e) => {
    const { target } = e;
    const { value } = target;
    setInputValue(value);
  }

  const handleSearch = () => {
    dispatch(getMovieList({
      keyword: _.toLower(inputValue),
      page: 1
    }))
  }

  const handleReset = () => {
    dispatch(resetMovieList())
  }

  const renderAutoCompleteOption = () => {
    // TODO implement autocomplete

    return (
      <>
      {/*<option value="Internet Explorer" />*/}
      {/*<option value="Firefox" />*/}
      {/*<option value="Chrome" />*/}
      {/*<option value="Opera" />*/}
      {/*<option value="Safari" />*/}
      </>
    )
  }

  return (
    <div className="listing-search-bar-container">
      <div className="search-box">
        <input type="text" list="keyword" value={inputValue} onChange={handleInputValueOnChange}/>
        <datalist id="keyword">
          {renderAutoCompleteOption()}
        </datalist>
      </div>
      <div>
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
        <button className="search-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

    </div>
  );
};

ListingSearchBarComponent.propTypes = {

};

export default ListingSearchBarComponent;
