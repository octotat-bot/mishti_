import React from 'react'
import { renderFormattedText } from '../utils/textFormatter'

const NoteCard = ({ 
  note, 
  viewMode, 
  notebooks = [],
  tags = [],
  onEdit, 
  onPin, 
  onArchive, 
  onUnarchive, 
  onDelete, 
  onRestore,
  type = 'regular' // 'regular', 'pinned', 'archived', 'trash'
}) => {
  const handleClick = () => {
    if (type === 'archived') {
      // For archived notes, we need special handling
      onEdit && onEdit(note, true) // Pass true to indicate it's archived
    } else if (type !== 'trash') {
      onEdit && onEdit(note)
    }
  }

  const renderActions = () => {
    switch (type) {
      case 'trash':
        return (
          <div className="note-actions">
            <button
              className="note-btn"
              onClick={() => onRestore(note.id)}
              title="Restore Note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" fill="currentColor" />
              </svg>
            </button>
            <button
              className="note-btn"
              onClick={() => onDelete(note.id)}
              title="Delete Permanently"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0V3h5V1.75a.25.25 0 00-.25-.25h-4.5a.25.25 0 00-.25.25zM4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z" fill="currentColor" />
              </svg>
            </button>
          </div>
        )
      
      case 'archived':
        return (
          <div className="note-actions">
            <button
              className="note-btn unarchive-btn"
              onClick={(e) => {
                e.stopPropagation()
                onUnarchive(note.id)
              }}
              title="Unarchive Note"
            >
              <span style={{fontSize: '16px'}}>📤</span>
            </button>
            
            <button
              className="note-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(note.id)
              }}
              title="Delete Note"
            >
              <span style={{fontSize: '16px'}}>🗑️</span>
            </button>
          </div>
        )
      
      default:
        return (
          <div className="note-actions">
            <button
              className={`note-btn pin-btn ${note.isPinned ? 'pinned' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                onPin(note.id)
              }}
              title={note.isPinned ? "Unpin Note" : "Pin Note"}
            >
              <span style={{fontSize: '16px'}}>
                {note.isPinned ? '📌' : '📍'}
              </span>
            </button>
            
            <button
              className="note-btn archive-btn"
              onClick={(e) => {
                e.stopPropagation()
                onArchive(note.id)
              }}
              title="Archive Note"
            >
              <span style={{fontSize: '16px'}}>📁</span>
            </button>
            
            <button
              className="note-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(note.id)
              }}
              title="Delete Note"
            >
              <span style={{fontSize: '16px'}}>🗑️</span>
            </button>
          </div>
        )
    }
  }

  const getDateText = () => {
    switch (type) {
      case 'trash':
        return `Deleted ${note.deletedAt}`
      case 'archived':
        return `Archived ${note.archivedAt}`
      default:
        return note.updatedAt || note.createdAt
    }
  }

  const getClassName = () => {
    let className = `note ${type}-note`
    if (viewMode === 'list') className += ' list-view'
    if (type === 'regular' && note.isPinned) className += ' pinned'
    return className
  }

  const getNotebook = () => {
    return notebooks.find(nb => nb.id === note.notebookId)
  }

  const getNoteTags = () => {
    if (!note.tags) return []
    return note.tags.map(tagName => {
      const tagObj = tags.find(t => t.name === tagName)
      return tagObj || { name: tagName, color: '#gray' }
    })
  }

  return (
    <div className={getClassName()}>
      {type !== 'trash' ? (
        <div className="note-clickable-area" onClick={handleClick}>
          <div className="note-header">
            <h3 className="note-title">{note.title}</h3>
            {getNotebook() && (
              <div 
                className="note-notebook"
                style={{ backgroundColor: getNotebook().color }}
              >
                📚 {getNotebook().name}
              </div>
            )}
          </div>
          
          <div 
            className="note-content formatted-content" 
            dangerouslySetInnerHTML={{ __html: renderFormattedText(note.text) }}
          />
          
          {getNoteTags().length > 0 && (
            <div className="note-tags">
              {getNoteTags().map((tag, index) => (
                <span 
                  key={index}
                  className="note-tag"
                  style={{ backgroundColor: tag.color }}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="note-header">
            <h3 className="note-title">{note.title}</h3>
            {getNotebook() && (
              <div 
                className="note-notebook"
                style={{ backgroundColor: getNotebook().color }}
              >
                📚 {getNotebook().name}
              </div>
            )}
          </div>
          
          <div 
            className="note-content formatted-content" 
            dangerouslySetInnerHTML={{ __html: renderFormattedText(note.text) }}
          />
          
          {getNoteTags().length > 0 && (
            <div className="note-tags">
              {getNoteTags().map((tag, index) => (
                <span 
                  key={index}
                  className="note-tag"
                  style={{ backgroundColor: tag.color }}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="note-footer">
        <span className="note-date">{getDateText()}</span>
        {renderActions()}
      </div>
    </div>
  )
}

export default NoteCard