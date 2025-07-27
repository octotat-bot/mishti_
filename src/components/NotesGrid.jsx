import React from 'react'
import NoteCard from './NoteCard'

const NotesGrid = ({ 
  notes, 
  viewMode,
  notebooks = [],
  tags = [],
  onEdit, 
  onPin, 
  onArchive, 
  onUnarchive, 
  onDelete, 
  onRestore,
  type = 'regular',
  emptyMessage = "No notes found",
  onAddNote
}) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>{emptyMessage}</p>
        {onAddNote && (
          <button className="add-note-btn" onClick={onAddNote}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" fill="currentColor" />
            </svg>
            New Note
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`notes-container ${viewMode}`}>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          viewMode={viewMode}
          notebooks={notebooks}
          tags={tags}
          onEdit={onEdit}
          onPin={onPin}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
          onDelete={onDelete}
          onRestore={onRestore}
          type={type}
        />
      ))}
    </div>
  )
}

export default NotesGrid