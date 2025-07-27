import React, { useState } from 'react'

const TagsView = ({ 
  tags, 
  notes, 
  onCreateTag, 
  onUpdateTag, 
  onDeleteTag,
  onSelectTag 
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTag, setEditingTag] = useState(null)
  const [newTagName, setNewTagName] = useState('')
  const [newTagColor, setNewTagColor] = useState('#ff6b6b')

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', 
    '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#ee5a24', '#0984e3'
  ]

  const getTagStats = (tagName) => {
    return notes.filter(note => note.tags && note.tags.includes(tagName)).length
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTagName.trim()) return

    if (editingTag) {
      onUpdateTag(editingTag.id, {
        name: newTagName.trim(),
        color: newTagColor
      })
      setEditingTag(null)
    } else {
      onCreateTag(newTagName.trim(), newTagColor)
    }

    setNewTagName('')
    setNewTagColor('#ff6b6b')
    setShowCreateForm(false)
  }

  const handleEdit = (tag) => {
    setEditingTag(tag)
    setNewTagName(tag.name)
    setNewTagColor(tag.color)
    setShowCreateForm(true)
  }

  const handleCancel = () => {
    setShowCreateForm(false)
    setEditingTag(null)
    setNewTagName('')
    setNewTagColor('#ff6b6b')
  }

  return (
    <>
      <div className="content-header">
        <h1>🏷️ Tags</h1>
        <button 
          className="primary-btn"
          onClick={() => setShowCreateForm(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" fill="currentColor" />
          </svg>
          New Tag
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleSubmit} className="tag-form">
          <div className="form-group">
            <label>Tag Name</label>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Enter tag name"
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${newTagColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNewTagColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit">
              {editingTag ? 'Update Tag' : 'Create Tag'}
            </button>
          </div>
        </form>
      )}

      <div className="tags-container">
        <div className="tags-grid">
          {tags.map(tag => (
            <div key={tag.id} className="tag-card">
              <div className="tag-header">
                <div 
                  className="tag-color"
                  style={{ backgroundColor: tag.color }}
                />
                <div className="tag-actions">
                  <button
                    className="tag-action-btn"
                    onClick={() => handleEdit(tag)}
                    title="Edit Tag"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    className="tag-action-btn delete"
                    onClick={() => onDeleteTag(tag.id)}
                    title="Delete Tag"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                      <path d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="tag-content">
                <h3 className="tag-name">#{tag.name}</h3>
                <div className="tag-stats">
                  <span className="note-count">
                    {getTagStats(tag.name)} {getTagStats(tag.name) === 1 ? 'note' : 'notes'}
                  </span>
                  <span className="created-date">
                    Created {new Date(tag.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <button 
                  className="view-tag-btn"
                  onClick={() => onSelectTag(tag.name)}
                  style={{ borderColor: tag.color, color: tag.color }}
                >
                  View Notes
                </button>
              </div>
            </div>
          ))}
        </div>

        {tags.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🏷️</div>
            <h3>No Tags Yet</h3>
            <p>Create tags to categorize and organize your notes</p>
            <button 
              className="primary-btn"
              onClick={() => setShowCreateForm(true)}
            >
              Create Tag
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default TagsView