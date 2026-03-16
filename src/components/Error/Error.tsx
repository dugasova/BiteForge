import React from 'react';
import './Error.scss';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function Error({ 
  title = "Oops! Something went wrong", 
  message = "We're sorry, but an unexpected error has occurred. Please try again later.",
  onRetry
}: ErrorProps) {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="error-title">{title}</h1>
        <p className="error-message">{message}</p>
        <button 
          className="error-action-button"
          onClick={onRetry || (() => window.location.reload())}
        >
          {onRetry ? 'Try Again' : 'Reload Page'}
        </button>
      </div>
    </div>
  );
}