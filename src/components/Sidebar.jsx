import React from 'react'
import UserProfile from './UserProfile'

const Sidebar = ({ 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  activeView, 
  setActiveView, 
  setShowForm, 
  notes, 
  archivedNotes, 
  trashNotes,
  notebooks = [],
  tags = [],
  selectedNotebook,
  setSelectedNotebook,
  selectedTags,
  setSelectedTags,
  sortBy, 
  setSortBy, 
  viewMode, 
  setViewMode 
}) => {
  return (
    <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="app-branding">
          <h2 className="app-name">{sidebarCollapsed ? '📝' : 'CreativeNotes'}</h2>
        </div>
        
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path d={sidebarCollapsed ? "M3 12l2-2m0 0l7 7 7-7M5 10l7 7 7-7" : "M6 18L18 6M6 6l12 12"} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="sidebar-stats">
        <div className="stat-item">
          <span className="stat-number">{notes.length}</span>
          {!sidebarCollapsed && <span className="stat-label">Total Notes</span>}
        </div>
        <div className="stat-item">
          <span className="stat-number">{archivedNotes.length}</span>
          {!sidebarCollapsed && <span className="stat-label">Archived</span>}
        </div>
        <div className="stat-item">
          <span className="stat-number">{trashNotes.length}</span>
          {!sidebarCollapsed && <span className="stat-label">In Trash</span>}
        </div>
      </div>
      
      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="section-title">{!sidebarCollapsed && 'Navigation'}</div>
          <button 
            className={`sidebar-btn ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('home')
              setShowForm(false)
            }}
            title="Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
              <path d="M11.03 2.59a1.501 1.501 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144l7.5-6.363z" fill="currentColor" />
            </svg>
            {!sidebarCollapsed && <span>Home</span>}
          </button>
          
          <button 
            className={`sidebar-btn ${activeView === 'notebooks' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('notebooks')
              setShowForm(false)
            }}
            title="Notebooks"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
              <path d="M0 3.75C0 2.784.784 2 1.75 2h20.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0122.25 22H1.75A1.75 1.75 0 010 20.25V3.75z" fill="currentColor" />
            </svg>
            {!sidebarCollapsed && <span>Notebooks</span>}
          </button>

          <button 
            className={`sidebar-btn ${activeView === 'tags' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('tags')
              setShowForm(false)
            }}
            title="Tags"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
              <path d="M7.75 6.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" fill="currentColor" />
              <path fillRule="evenodd" d="M2.5 1A1.5 1.5 0 001 2.5v8.44c0 .397.158.779.44 1.06l10.25 10.25a1.5 1.5 0 002.12 0l8.44-8.44a1.5 1.5 0 000-2.12L12 1.44A1.5 1.5 0 0010.94 1H2.5z" fill="currentColor" />
            </svg>
            {!sidebarCollapsed && <span>Tags</span>}
          </button>
          
          <button 
            className={`sidebar-btn ${activeView === 'archive' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('archive')
              setShowForm(false)
            }}
            title="Archive"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
              <path d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z" fill="currentColor" />
            </svg>
            {!sidebarCollapsed && <span>Archive</span>}
          </button>
        </div>

        <div className="sidebar-section">
          <div className="section-title">{!sidebarCollapsed && 'Quick Actions'}</div>
          
          <button 
            className={`sidebar-btn add-note-btn ${false ? 'active' : ''}`}
            onClick={() => {
              setShowForm(true)
              setActiveView('home')
            }}
            title="New Note"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
              <path d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" fill="currentColor" />
            </svg>
            {!sidebarCollapsed && <span>New Note</span>}
          </button>

          {!sidebarCollapsed && (
            <div className="sidebar-controls">
              <div className="control-group">
                <label>Notebook:</label>
                <select 
                  value={selectedNotebook} 
                  onChange={(e) => setSelectedNotebook(e.target.value)}
                  className="control-select"
                >
                  <option value="all">All Notebooks</option>
                  {notebooks.map(notebook => (
                    <option key={notebook.id} value={notebook.id}>
                      📚 {notebook.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="control-group">
                <label>Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="control-select"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title</option>
                </select>
              </div>

              <div className="control-group">
                <label>View:</label>
                <div className="view-toggle">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                      <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" fill="currentColor"/>
                    </svg>
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>

              {selectedTags.length > 0 && (
                <div className="control-group">
                  <label>Active Tags:</label>
                  <div className="active-tags">
                    {selectedTags.map((tagName, index) => {
                      const tag = tags.find(t => t.name === tagName)
                      return (
                        <span 
                          key={index}
                          className="active-tag"
                          style={{ backgroundColor: tag?.color || '#gray' }}
                        >
                          #{tagName}
                          <button
                            onClick={() => setSelectedTags(selectedTags.filter(t => t !== tagName))}
                            className="remove-tag"
                          >
                            ×
                          </button>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="sidebar-footer">
        <button 
          className={`sidebar-btn ${activeView === 'trash' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('trash')
            setShowForm(false)
          }}
          title="Trash"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
            <path d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75z" fill="currentColor" />
          </svg>
          {!sidebarCollapsed && <span>Trash</span>}
          {trashNotes.length > 0 && <span className="badge">{trashNotes.length}</span>}
        </button>
        
        <UserProfile sidebarCollapsed={sidebarCollapsed} />
      </div>
    </div>
  )
}

export default Sidebar