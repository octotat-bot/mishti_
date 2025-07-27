import React from 'react'
import NotesGrid from './NotesGrid'

const TrashView = ({ trashNotes, notebooks = [], tags = [], onRestore, onDeletePermanent, onEmptyTrash }) => {
  return (
    <>
      <div className="content-header">
        <h1>Trash</h1>
        {trashNotes.length > 0 && (
          <button className="empty-trash-btn" onClick={onEmptyTrash}>
            Empty Trash
          </button>
        )}
      </div>

      <NotesGrid
        notes={trashNotes}
        viewMode="grid"
        notebooks={notebooks}
        tags={tags}
        onRestore={onRestore}
        onDelete={onDeletePermanent}
        type="trash"
        emptyMessage="No deleted notes"
      />
    </>
  )
}

export default TrashView