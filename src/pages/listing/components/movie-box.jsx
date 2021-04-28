import React from 'react';
import PropTypes from 'prop-types';

const MovieBox = props => {
  const { data } = props;
  return (
    <div className="movie-box-container">
      <img
        loading="lazy"
        decoding="async"
        src={data.Poster}
        alt={data.Title}
      />
      <div className="title">{data.Title}</div>
      <div className="desc">{data.Year}</div>
    </div>
  );
};

MovieBox.propTypes = {

};

export default MovieBox;
