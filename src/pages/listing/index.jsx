import React from 'react'
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import SearchBarComponent from 'pages/listing/components/search-bar';

const ListingPage = props => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/detail/123");
  }

  return (
    <div className="listing-page-container">
      <SearchBarComponent />
      <button type="button" onClick={handleClick}>
        Go to Detail
      </button>
    </div>
  );
};

ListingPage.propTypes = {

};

export default ListingPage;
