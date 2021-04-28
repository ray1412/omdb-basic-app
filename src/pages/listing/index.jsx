import React from 'react'
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

const ListingPage = props => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/detail/123");
  }

  return (
    <div>
      <h2> listing page </h2>
      <button type="button" onClick={handleClick}>
        Go to Detail
      </button>
    </div>
  );
};

ListingPage.propTypes = {

};

export default ListingPage;
