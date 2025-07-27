import React from 'react'
import NotesGrid from './NotesGrid'

const ArchiveView = ({ archivedNotes, viewMode, notebooks = [], tags = [], onEdit, onUnarchive, onDelete }) => {
  return (
    <>
      <div className="content-header">
        <h1>Archive</h1>
        <div className="archive-info">
          <span style={{fontSize: '0.9rem', color: '#666'}}>
            {archivedNotes.length} archived {archivedNotes.length === 1 ? 'note' : 'notes'}
          </span>
        </div>
      </div>

      <NotesGrid
        notes={archivedNotes}
        viewMode={viewMode}
        notebooks={notebooks}
        tags={tags}
        onEdit={onEdit}
        onUnarchive={onUnarchive}
        onDelete={onDelete}
        type="archived"
        emptyMessage="No archived notes"
      />
    </>
  )
}

export default ArchiveView