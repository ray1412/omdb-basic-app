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
  data: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
  }),
};

MovieBox.defaultProps = {
  data: {}
};

export default MovieBox;
