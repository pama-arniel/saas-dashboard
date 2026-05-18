import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  return (
    <div className="not-found-screen">
      <div className="not-found-card">
        <div className="not-found-badge">404</div>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <div className="not-found-actions">
          <Link to="/overview" className="solid-button">
            Go to Dashboard
          </Link>
          <Link to="/login" className="ghost-button">
            Go to Login
          </Link>
          {canGoBack && (
            <button type="button" onClick={() => window.history.back()} className="ghost-button">
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
