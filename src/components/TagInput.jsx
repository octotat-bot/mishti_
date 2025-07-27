import React, { useState, useRef, useEffect } from 'react'

const TagInput = ({ tags, onChange, existingTags = [] }) => {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef(null)

  const suggestions = existingTags.filter(tag => 
    tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
    !tags.includes(tag.name)
  )

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setShowSuggestions(e.target.value.length > 0)
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue.trim())
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  const addTag = (tagName) => {
    if (tagName && !tags.includes(tagName)) {
      onChange([...tags, tagName])
    }
    setInputValue('')
    setShowSuggestions(false)
  }

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSuggestionClick = (tagName) => {
    addTag(tagName)
    inputRef.current?.focus()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="tag-input-container">
      <div className="tag-input-wrapper">
        <div className="selected-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag-chip">
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="tag-remove"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setShowSuggestions(inputValue.length > 0)}
          placeholder={tags.length === 0 ? "Add tags (press Enter or comma to add)" : ""}
          className="tag-input"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="tag-suggestions">
          {suggestions.slice(0, 5).map((tag, index) => (
            <button
              key={index}
              type="button"
              className="tag-suggestion"
              onClick={() => handleSuggestionClick(tag.name)}
              style={{ borderLeftColor: tag.color }}
            >
              <span className="tag-color" style={{ backgroundColor: tag.color }} />
              #{tag.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TagInput