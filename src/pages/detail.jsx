import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  selectMovieDetailReduxState,
  getMovieDetail,
  resetMovieDetail
} from 'store/slices/detail';
import Loader from 'components/common/loader';
import _ from 'utils/lodash-wrapper';

const DetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: movieDetailData,
    isFetching: movieDetailIsFetching
  } = useSelector(selectMovieDetailReduxState)

  useEffect(() => {
    dispatch(getMovieDetail({
      id
    }));

    return () => {
      dispatch(resetMovieDetail());
    }
  },[dispatch]);

  const renderMoviePoster = () => {
    const posterUrl = _.toUpper(_.get(movieDetailData, 'Poster', ''));

    if (_.isNil(posterUrl)) {
      return null
    }

    if (posterUrl === 'N/A') {
      return (
        <div className="no-img">
          No Poster Available :(
        </div>
      );
    }

    return (
      <img
        loading="lazy"
        decoding="async"
        src={_.get(movieDetailData, 'Poster', '')}
        alt={_.get(movieDetailData, 'Title', '')}
      />
    )
  }

  const renderMovieDescription = () => {
    if (_.isNil(movieDetailData)) {
      return null;
    }

    const arrayOfMovieDescriptionKey = Object
      .keys(movieDetailData)
      .filter(key => {
        // TODO handle how to show ratings
         return !(_.toLower(key) === 'poster'
           || _.toLower(key) === 'ratings');
      });

    return arrayOfMovieDescriptionKey.map(item => {
      return (
        <div className="tuple">
          <span className="key">{item}</span>
          <span className="value">{_.get(movieDetailData, item, '').toString()}</span>
        </div>
      )
    });
  };

  const handleBackToPrevPage = () => {
    history.goBack();
  };

  const isLoading = (
    movieDetailIsFetching
    || _.isNil(movieDetailData)
  )

  console.log('movieDetailData ==> ', movieDetailData);

  return (
    <div className="detail-page-container">
      <Loader isLoading={isLoading} />
      {
        !isLoading &&
        <div className="button-wrapper">
          <button onClick={handleBackToPrevPage} value="">&lt;&lt;</button>
        </div>
      }
      <div className="movie-container">
        <div className="image-wrapper">
          {renderMoviePoster()}
        </div>
        <div className="description-box">
          {renderMovieDescription()}
        </div>
      </div>
    </div>

  );
};

export default DetailPage;
