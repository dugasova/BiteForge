import React from 'react';
import './Loading.scss';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({ message = "Loading...", fullScreen = false }: LoadingProps = {}) {
  return (
    <div className={`loading-container ${fullScreen ? 'full-screen' : ''}`}>
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-core"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}