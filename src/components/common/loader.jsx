import React from 'react';
import PropTypes from 'prop-types';

const Spinner = () => {
  return (
    <div className='spinner'/>
  )
}

const Loader = (props) => {
  const {
    isLoading,
    children,
  } = props;

  if (!isLoading) {
    return children;
  }

  return (
    <div className="loader-wrapper">
      <Spinner />
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};


Loader.defaultProps = {
  isLoading: false,
  children: null,
};

export default Loader
