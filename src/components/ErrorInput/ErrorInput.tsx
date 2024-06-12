import React from 'react';

const ErrorInput = ({ error }) => {
  return (
    <div className="error">
      <span className="error-icon">⚠️</span> {error}
    </div>
  );
};

export default ErrorInput;
