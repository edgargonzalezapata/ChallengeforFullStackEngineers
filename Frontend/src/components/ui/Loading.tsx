import React from 'react';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Loading: React.FC<LoadingProps> = ({
  message = 'Cargando...',
  size = 'medium'
}) => {
  return (
    <div className="loading-container">
      <div className={`spinner spinner-${size}`}></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};
