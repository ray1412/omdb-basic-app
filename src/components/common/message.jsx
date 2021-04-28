import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
  const { message, status} = props;
  return (
    <div className="message-container" data-status={status}>
      {message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string
};

Message.defaultProps = {
  message: '',
  status: ''
};

export default Message;
