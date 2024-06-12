import React from 'react';

const ErrorInput: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="error">
      <span className="error-icon">⚠️</span> {error}
    </div>
  );
};

export default ErrorInput;
