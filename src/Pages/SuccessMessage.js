import React from 'react';
import './SuccessMessage.css';

const SuccessMessage = ({ message }) => {
  return (
    <div className="success-message">
      <p className="success-message-text">{message}</p>
    </div>
  );
};

export default SuccessMessage;
