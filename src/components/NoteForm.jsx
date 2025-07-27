import React, { useRef, useEffect } from 'react'
import FormattingToolbar from './FormattingToolbar'
import TagInput from './TagInput'
import { renderFormattedText, applyFormatting, insertSpecialText } from '../utils/textFormatter'

const NoteForm = ({ 
  newNote, 
  setNewNote, 
  newTitle, 
  setNewTitle, 
  newNoteTags,
  setNewNoteTags,
  newNoteNotebook,
  setNewNoteNotebook,
  notebooks,
  tags,
  isEditing, 
  onSubmit, 
  onCancel 
}) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleFormat = (formatType) => {
    if (!textareaRef.current) return

    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd
    
    const result = applyFormatting(formatType, newNote, start, end)
    setNewNote(result.newText)
    
    // Restore cursor position
    setTimeout(() => {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(result.cursorPosition, result.cursorPosition)
    }, 0)
  }

  const handleInsertSpecial = (type) => {
    if (!textareaRef.current) return

    const start = textareaRef.current.selectionStart
    const result = insertSpecialText(type, newNote, start)
    setNewNote(result.newText)
    
    setTimeout(() => {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(result.cursorPosition, result.cursorPosition)
    }, 0)
  }

  const handleKeyDown = (e) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          handleFormat('bold')
          break
        case 'i':
          e.preventDefault()
          handleFormat('italic')
          break
        case 'u':
          e.preventDefault()
          handleFormat('underline')
          break
        default:
          break
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className={`note-form ${isEditing ? 'editing' : ''}`}>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Note title"
        className="note-title-input"
        autoFocus
      />

      <div className="note-metadata">
        <div className="form-group">
          <label>Notebook</label>
          <select
            value={newNoteNotebook}
            onChange={(e) => setNewNoteNotebook(e.target.value)}
            className="notebook-select"
          >
            {notebooks.map(notebook => (
              <option key={notebook.id} value={notebook.id}>
                📚 {notebook.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <TagInput
            tags={newNoteTags}
            onChange={setNewNoteTags}
            existingTags={tags}
          />
        </div>
      </div>
      
      <FormattingToolbar 
        onFormat={handleFormat}
        onInsertSpecial={handleInsertSpecial}
      />
      
      <div className="editor-container">
        <textarea
          ref={textareaRef}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your note here... Use the toolbar above for formatting!

Keyboard shortcuts:
• Ctrl+B for Bold
• Ctrl+I for Italic  
• Ctrl+U for Underline"
          rows="6"
          required
          className="note-textarea"
        />
        
        {newNote && (
          <div className="preview-container">
            <div className="preview-header">
              <span>Preview:</span>
            </div>
            <div 
              className="preview-content formatted-content"
              dangerouslySetInnerHTML={{ __html: renderFormattedText(newNote) }}
            />
          </div>
        )}
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit">
          {isEditing ? 'Update Note' : 'Save Note'}
        </button>
      </div>
    </form>
  )
}

export default NoteForm