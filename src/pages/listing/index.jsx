import React, { useEffect, lazy} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import _ from 'utils/lodash-wrapper';
import {
  resetMovieList,
  selectMovieListReduxState
} from 'store/slices/listing';
import SearchBarComponent from 'pages/listing/components/search-bar';
import Loader from 'components/common/loader';

const MovieBoxComponent = lazy(() => import('pages/listing/components/movie-box'));
const MessageComponent = lazy(()=> import('components/common/message'))

const ListingPage = props => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    data: movieListData,
    totalData: movieListTotalData,
    isFetching: isFetchingMovieList,
    errorMessage: movieListErrorMessage
  } = useSelector(selectMovieListReduxState)

  const renderCollectionOfMovieBox = () => {
    if(movieListData.length === 0) {
      return null
    }

    return movieListData.map(item => {
      return <MovieBoxComponent data={item} key={item.Title}/>
    });
  };

  const handleClick = () => {
    history.push("/detail/123");
  }

  useEffect(() => () => {
    dispatch(resetMovieList())
  }, []);

  return (
    <div className="listing-page-container">
      <SearchBarComponent />
      <div className="listing-box">
        {
          !_.isEmpty(movieListErrorMessage)
          && <MessageComponent status='error' message={movieListErrorMessage} />
        }
        <Loader isLoading={isFetchingMovieList}>
          {renderCollectionOfMovieBox()}
        </Loader>
      </div>
    </div>
  );
};

ListingPage.propTypes = {

};

export default ListingPage;
