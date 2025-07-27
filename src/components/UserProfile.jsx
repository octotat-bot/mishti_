import React, { useState } from 'react'
import { useUser, useClerk } from '@clerk/clerk-react'

const UserProfile = ({ sidebarCollapsed }) => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [showDropdown, setShowDropdown] = useState(false)

  if (!user) return null

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className="user-profile">
      <div 
        className="user-info"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="user-avatar">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              {user.firstName?.[0] || user.emailAddresses[0]?.emailAddress[0] || '?'}
            </div>
          )}
        </div>
        
        {!sidebarCollapsed && (
          <div className="user-details">
            <div className="user-name">
              {user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0]}
            </div>
            <div className="user-email">
              {user.emailAddresses[0]?.emailAddress}
            </div>
          </div>
        )}
        
        {!sidebarCollapsed && (
          <div className="dropdown-arrow">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="16" 
              height="16"
              style={{ 
                transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            >
              <path d="M7 10l5 5 5-5z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>

      {showDropdown && (
        <div className="user-dropdown">
          <div className="dropdown-item" onClick={() => setShowDropdown(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
            </svg>
            <span>Profile Settings</span>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <div className="dropdown-item" onClick={handleSignOut}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor" />
            </svg>
            <span>Sign Out</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile