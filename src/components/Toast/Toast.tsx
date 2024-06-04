import React from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="toast">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Toast;
