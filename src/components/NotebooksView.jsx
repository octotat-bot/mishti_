import React, { useState } from 'react'

const NotebooksView = ({ 
  notebooks, 
  notes, 
  onCreateNotebook, 
  onUpdateNotebook, 
  onDeleteNotebook,
  onSelectNotebook 
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingNotebook, setEditingNotebook] = useState(null)
  const [newNotebookName, setNewNotebookName] = useState('')
  const [newNotebookColor, setNewNotebookColor] = useState('#667eea')

  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe',
    '#43e97b', '#38f9d7', '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
  ]

  const getNotebookStats = (notebookId) => {
    return notes.filter(note => note.notebookId === notebookId).length
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newNotebookName.trim()) return

    if (editingNotebook) {
      onUpdateNotebook(editingNotebook.id, {
        name: newNotebookName.trim(),
        color: newNotebookColor
      })
      setEditingNotebook(null)
    } else {
      onCreateNotebook(newNotebookName.trim(), newNotebookColor)
    }

    setNewNotebookName('')
    setNewNotebookColor('#667eea')
    setShowCreateForm(false)
  }

  const handleEdit = (notebook) => {
    setEditingNotebook(notebook)
    setNewNotebookName(notebook.name)
    setNewNotebookColor(notebook.color)
    setShowCreateForm(true)
  }

  const handleCancel = () => {
    setShowCreateForm(false)
    setEditingNotebook(null)
    setNewNotebookName('')
    setNewNotebookColor('#667eea')
  }

  return (
    <>
      <div className="content-header">
        <h1>📚 Notebooks</h1>
        <button 
          className="primary-btn"
          onClick={() => setShowCreateForm(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" fill="currentColor" />
          </svg>
          New Notebook
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleSubmit} className="notebook-form">
          <div className="form-group">
            <label>Notebook Name</label>
            <input
              type="text"
              value={newNotebookName}
              onChange={(e) => setNewNotebookName(e.target.value)}
              placeholder="Enter notebook name"
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
                  className={`color-option ${newNotebookColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNewNotebookColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit">
              {editingNotebook ? 'Update Notebook' : 'Create Notebook'}
            </button>
          </div>
        </form>
      )}

      <div className="notebooks-grid">
        {notebooks.map(notebook => (
          <div key={notebook.id} className="notebook-card">
            <div 
              className="notebook-header"
              style={{ backgroundColor: notebook.color }}
            >
              <div className="notebook-icon">📚</div>
              <div className="notebook-actions">
                {notebook.id !== 'default' && (
                  <>
                    <button
                      className="notebook-action-btn"
                      onClick={() => handleEdit(notebook)}
                      title="Edit Notebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" />
                      </svg>
                    </button>
                    <button
                      className="notebook-action-btn delete"
                      onClick={() => onDeleteNotebook(notebook.id)}
                      title="Delete Notebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75z" fill="currentColor" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="notebook-content">
              <h3 className="notebook-name">{notebook.name}</h3>
              <div className="notebook-stats">
                <span className="note-count">
                  {getNotebookStats(notebook.id)} {getNotebookStats(notebook.id) === 1 ? 'note' : 'notes'}
                </span>
                <span className="created-date">
                  Created {new Date(notebook.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <button 
                className="view-notebook-btn"
                onClick={() => onSelectNotebook(notebook.id)}
              >
                View Notes
              </button>
            </div>
          </div>
        ))}
      </div>

      {notebooks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No Notebooks Yet</h3>
          <p>Create your first notebook to organize your notes</p>
          <button 
            className="primary-btn"
            onClick={() => setShowCreateForm(true)}
          >
            Create Notebook
          </button>
        </div>
      )}
    </>
  )
}

export default NotebooksView