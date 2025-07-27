import React from 'react'
import { useAuth, SignIn, SignUp } from '@clerk/clerk-react'
import { useState } from 'react'

const AuthWrapper = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth()
  const [showSignUp, setShowSignUp] = useState(false)

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Show authentication forms if user is not signed in
  if (!isSignedIn) {
    return (
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-header">
            <h1>📝 CreativeNotes</h1>
            <p>Your personal note-taking companion with rich formatting</p>
          </div>
          
          <div className="auth-content">
            {showSignUp ? (
              <div className="auth-form">
                <SignUp 
                  appearance={{
                    elements: {
                      formButtonPrimary: 'auth-button-primary',
                      card: 'auth-card',
                      headerTitle: 'auth-title',
                      headerSubtitle: 'auth-subtitle'
                    }
                  }}
                />
                <div className="auth-switch">
                  <p>Already have an account?</p>
                  <button 
                    onClick={() => setShowSignUp(false)}
                    className="auth-switch-btn"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-form">
                <SignIn 
                  appearance={{
                    elements: {
                      formButtonPrimary: 'auth-button-primary',
                      card: 'auth-card',
                      headerTitle: 'auth-title',
                      headerSubtitle: 'auth-subtitle'
                    }
                  }}
                />
                <div className="auth-switch">
                  <p>Don't have an account?</p>
                  <button 
                    onClick={() => setShowSignUp(true)}
                    className="auth-switch-btn"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="auth-features">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>Rich text formatting</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📁</span>
              <span>Organize with archives</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔍</span>
              <span>Powerful search</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📌</span>
              <span>Pin important notes</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // User is signed in, show the main app
  return children
}

export default AuthWrapper