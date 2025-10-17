import React from 'react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{message}</span>
      </div>
      {onDismiss && (
        <button className="error-dismiss" onClick={onDismiss}>
          ✕
        </button>
      )}
    </div>
  );
};
