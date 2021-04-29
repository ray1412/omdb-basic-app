import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';

import _ from 'utils/lodash-wrapper';

const ControlledPopup = ({
  isOpen, image, title, onClosePopup
}) => {

  return (
    <Popup open={isOpen} onClose={onClosePopup}>
      <div className="modal">
        <a className="close" onClick={onClosePopup}>
          &times;
        </a>
        <img
          loading="lazy"
          decoding="async"
          src={image}
          alt={title}
        />
      </div>
    </Popup>
  )
}

const MovieBox = props => {
  const { data, onClick } = props;
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const isContainPoster = _.toUpper(data.Poster) !== 'N/A';

  const togglePopup = () => {
    setIsPopupOpened(prevState => !prevState)
  }

  return (
    <div className="movie-box-container">
      {
        isContainPoster &&
        <ControlledPopup
          isOpen={isPopupOpened}
          image={data.Poster}
          title={data.Title}
          onClosePopup={() => setIsPopupOpened(false)}
        />
      }
      {
        !isContainPoster ?
          <div className="no-img">
            No Poster Available :(
          </div>
          : <img
            loading="lazy"
            decoding="async"
            src={data.Poster}
            alt={data.Title}
            onClick={() => togglePopup()}
          />
      }
      <div onClick={() => onClick(data.imdbID)}>
        <div className="title">{data.Title}</div>
        <div className="desc">{data.Year}</div>
      </div>
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
