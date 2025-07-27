import React from 'react'

const FormattingToolbar = ({ onFormat, onInsertSpecial }) => {
  return (
    <div className="formatting-toolbar">
      <div className="toolbar-info">
        <span style={{fontSize: '0.8rem', color: '#666', marginRight: '1rem'}}>
          Select text and use formatting tools:
        </span>
      </div>
      
      <div className="toolbar-section">
        <button
          type="button"
          className="format-btn"
          onClick={() => onFormat('bold')}
          title="Bold (Ctrl+B)"
        >
          <strong style={{fontSize: '16px', fontWeight: '900'}}>B</strong>
        </button>
        
        <button
          type="button"
          className="format-btn"
          onClick={() => onFormat('italic')}
          title="Italic (Ctrl+I)"
        >
          <em style={{fontSize: '16px', fontStyle: 'italic', fontWeight: '600'}}>I</em>
        </button>
        
        <button
          type="button"
          className="format-btn"
          onClick={() => onFormat('underline')}
          title="Underline (Ctrl+U)"
        >
          <span style={{fontSize: '16px', textDecoration: 'underline', fontWeight: '600'}}>U</span>
        </button>
        
        <button
          type="button"
          className="format-btn"
          onClick={() => onFormat('strikethrough')}
          title="Strikethrough"
        >
          <span style={{fontSize: '16px', textDecoration: 'line-through', fontWeight: '600'}}>S</span>
        </button>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-section">
        <button
          type="button"
          className="format-btn"
          onClick={() => onFormat('heading')}
          title="Heading"
        >
          <span style={{fontSize: '18px', fontWeight: '900'}}>H1</span>
        </button>
        
        <button
          type="button"
          className="format-btn"
          onClick={() => onFormat('quote')}
          title="Quote"
        >
          <span style={{fontSize: '18px', fontWeight: '700'}}>"</span>
        </button>
        
        <button
          type="button"
          className="format-btn"
          onClick={() => onFormat('code')}
          title="Code"
        >
          <span style={{fontSize: '14px', fontFamily: 'monospace', fontWeight: '700'}}>&lt;/&gt;</span>
        </button>
        
        <button
          type="button"
          className="format-btn"
          onClick={() => onFormat('list')}
          title="List"
        >
          <span style={{fontSize: '16px', fontWeight: '700'}}>• •</span>
        </button>
      </div>

      <div className="toolbar-divider"></div>

      <div className="toolbar-section">
        <button
          type="button"
          className="format-btn"
          onClick={() => onInsertSpecial('date')}
          title="Insert Date"
        >
          <span style={{fontSize: '16px'}}>📅</span>
        </button>
        
        <button
          type="button"
          className="format-btn"
          onClick={() => onInsertSpecial('time')}
          title="Insert Time"
        >
          <span style={{fontSize: '16px'}}>🕐</span>
        </button>
        
        <button
          type="button"
          className="format-btn"
          onClick={() => onInsertSpecial('checkbox')}
          title="Insert Checkbox"
        >
          <span style={{fontSize: '16px'}}>☐</span>
        </button>
        
        <button
          type="button"
          className="format-btn"
          onClick={() => onInsertSpecial('separator')}
          title="Insert Separator"
        >
          <span style={{fontSize: '16px', fontWeight: '700'}}>---</span>
        </button>

        <button
          type="button"
          className="format-btn"
          onClick={() => onInsertSpecial('star')}
          title="Insert Star"
        >
          <span style={{fontSize: '16px'}}>⭐</span>
        </button>
      </div>
    </div>
  )
}

export default FormattingToolbar