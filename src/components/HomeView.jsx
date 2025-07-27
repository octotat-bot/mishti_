import React from 'react'
import SearchBar from './SearchBar'
import NotesGrid from './NotesGrid'

const HomeView = ({ 
  filteredNotes, 
  searchQuery, 
  setSearchQuery, 
  viewMode,
  notebooks = [],
  tags = [],
  onEdit, 
  onPin, 
  onArchive, 
  onDelete, 
  setShowForm 
}) => {
  const pinnedNotes = filteredNotes.filter(note => note.isPinned)
  const regularNotes = filteredNotes.filter(note => !note.isPinned)

  return (
    <>
      <div className="content-header">
        <h1>My Notes</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {searchQuery && (
        <div className="search-results">
          Found {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
        </div>
      )}

      {/* Pinned Notes Section */}
      {pinnedNotes.length > 0 && (
        <div className="pinned-section">
          <div className="section-header">
            <h2 className="section-title">
              📌 Pinned Notes
              <span className="section-count">({pinnedNotes.length})</span>
            </h2>
          </div>
          <NotesGrid
            notes={pinnedNotes}
            viewMode={viewMode}
            notebooks={notebooks}
            tags={tags}
            onEdit={onEdit}
            onPin={onPin}
            onArchive={onArchive}
            onDelete={onDelete}
            type="pinned"
          />
        </div>
      )}

      {/* Regular Notes Section */}
      <div className="regular-section">
        {pinnedNotes.length > 0 && (
          <div className="section-header">
            <h2 className="section-title">
              📝 All Notes
              <span className="section-count">({regularNotes.length})</span>
            </h2>
          </div>
        )}
        
        <NotesGrid
          notes={regularNotes}
          viewMode={viewMode}
          notebooks={notebooks}
          tags={tags}
          onEdit={onEdit}
          onPin={onPin}
          onArchive={onArchive}
          onDelete={onDelete}
          type="regular"
          emptyMessage="No notes found. Create your first note!"
          onAddNote={() => setShowForm(true)}
        />
      </div>
    </>
  )
}

export default HomeView