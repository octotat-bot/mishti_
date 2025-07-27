import React from 'react'

const PlaceholderView = ({ onReturnHome }) => {
  return (
    <div className="feature-placeholder">
      <div className="placeholder-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor" />
        </svg>
      </div>
      <h2>Feature Coming Soon</h2>
      <p>We're working hard to bring you this exciting new feature. Stay tuned for updates!</p>
      <button className="primary-btn" onClick={onReturnHome}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
          <path d="M11.03 2.59a1.501 1.501 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363z" fill="currentColor" />
        </svg>
        Return to Notes
      </button>
    </div>
  )
}

export default PlaceholderView