import React from 'react';

const ErrorInput: React.FC<{ error: string; className?: string }> = ({
  error,
  className = '',
}) => {
  return (
    <div className={`error ${className}`}>
      <span className="error-icon">⚠️</span> {error}
    </div>
  );
};

export default ErrorInput;
