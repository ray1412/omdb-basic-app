import React from 'react';
import PropTypes from 'prop-types';

const MovieBox = props => {
  const { data } = props;
  return (
    <div>
      <img loading="lazy" decoding="async" src={data.Poster} alt={data.Title} />
      {data.Title}, {data.Year}
    </div>
  );
};

MovieBox.propTypes = {

};

export default MovieBox;
