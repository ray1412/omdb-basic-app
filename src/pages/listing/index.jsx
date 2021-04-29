import React, { useEffect, useRef, lazy} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import _ from 'utils/lodash-wrapper';
import {MOVIE_LISTING_THRESHOLD_TO_TRIGGER_INFINITE_SCROLL} from 'constants/pagination'
import {
  // resetMovieList,
  selectMovieListReduxState,
  getMovieList
} from 'store/slices/listing';
import useIntersectionObserver from 'utils/hooks/use-intersection-observer';
import SearchBarComponent from 'pages/listing/components/search-bar';
import Loader from 'components/common/loader';

const MovieBoxComponent = lazy(() => import('pages/listing/components/movie-box'));
const MessageComponent = lazy(()=> import('components/common/message'))

const ListingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  const isBottomVisible = useIntersectionObserver({
    ref: bottomRef,
    options: {
      threshold: 0 //trigger event as soon as the element is in the viewport.
    },
  forward: false // don't remove the observer after intersected.
  });

  const {
    data: movieListData,
    // totalData: movieListTotalData,
    page: currentPage,
    keyword,
    isFetching: isFetchingMovieList,
    errorMessage: movieListErrorMessage
  } = useSelector(selectMovieListReduxState)

  const renderCollectionOfMovieBox = () => {
    if(movieListData.length === 0) {
      return null
    }

    return movieListData.map(item => {
      return <MovieBoxComponent
        data={item}
        key={_.uniqueId()}
        onClick={handleClick}
      />
    });
  };

  const handleClick = (movieId) => {
    history.push(`/detail/${movieId}`);
  }

  useEffect(() => () => {
    // dispatch(resetMovieList());
  }, [dispatch]);

  useEffect(() => {
    if(
      isBottomVisible
      && !isFetchingMovieList
      && _.isEmpty(movieListErrorMessage)
    ) {
      // TODO add interval so spam will not works
      dispatch(getMovieList({
        keyword,
        page: currentPage
      }))
    }
  }, [
    dispatch,
    isBottomVisible,
    isFetchingMovieList,
    movieListErrorMessage,
    keyword,
    currentPage
  ])

  const isNeedToShowErrorMessage = (
    !_.isEmpty(movieListErrorMessage)
    && movieListData.length === 0
  );

  const isNeedToShowBottomRef = (
    // requirement from the task ~
    movieListData.length > MOVIE_LISTING_THRESHOLD_TO_TRIGGER_INFINITE_SCROLL
    && _.isEmpty(movieListErrorMessage)
  );

  return (
    <div className="listing-page-container">
      <SearchBarComponent />
      <div className="listing-box">
        {
          isNeedToShowErrorMessage
          && <MessageComponent status='error' message={movieListErrorMessage} />
        }
        {renderCollectionOfMovieBox()}
        <Loader isLoading={isFetchingMovieList} />
      </div>
      <div
        className="bottom-page-wrapper"
        ref={bottomRef}
        style={{
          width: "100%",
          height: "20px",
          display: isNeedToShowBottomRef? 'block': 'none'
        }}
      />
    </div>
  );
};

export default ListingPage;
