import './Loader.scss';
interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  skeleton?: boolean;
  cards?: number;
}

export default function Loader({
  message = 'Loading...',
  fullScreen = false,
  skeleton = false,
  cards = 4,
}: LoadingProps = {}) {
  if (skeleton) {
    const skeletonCards = Array.from({ length: cards }, (_, i) => i);

    return (
      <div className={`loading-container skeleton ${fullScreen ? 'full-screen' : ''}`}>
        <div className="skeleton-grid">
          {skeletonCards.map((index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-image" />
              <div className="skeleton-line title" />
              <div className="skeleton-line text" />
              <div className="skeleton-line text short" />
            </div>
          ))}
        </div>
        {message && <p className="loading-message">{message}</p>}
      </div>
    );
  }

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