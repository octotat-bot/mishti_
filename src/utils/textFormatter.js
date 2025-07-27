// Function to render formatted text
export const renderFormattedText = (text) => {
  if (!text) return text

  // Convert markdown-like formatting to HTML
  let formattedText = text
    // First handle line breaks and preserve them
    .replace(/\n/g, '<br>')
    // Bold - make sure to handle properly
    .replace(/\*\*(.*?)\*\*/gs, '<strong>$1</strong>')
    // Italic - avoid conflict with bold
    .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>')
    // Underline
    .replace(/__(.*?)__/gs, '<u>$1</u>')
    // Strikethrough
    .replace(/~~(.*?)~~/gs, '<del>$1</del>')
    // Code
    .replace(/`([^`]+?)`/g, '<code>$1</code>')
    // Quote - handle multiline
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Heading
    .replace(/^# (.+)$/gm, '<h3>$1</h3>')
    // List items
    .replace(/^• (.+)$/gm, '<li>$1</li>')
    // Separator
    .replace(/^---$/gm, '<hr>')
    // Checkbox
    .replace(/☐/g, '<span class="checkbox">☐</span>')
    // Checked checkbox
    .replace(/☑/g, '<span class="checkbox checked">☑</span>')

  return formattedText
}

// Formatting functions
export const applyFormatting = (formatType, text, selectionStart, selectionEnd) => {
  const selectedText = text.substring(selectionStart, selectionEnd)
  
  if (!selectedText) return { newText: text, cursorPosition: selectionStart }

  let formattedText = ''
  
  switch (formatType) {
    case 'bold':
      formattedText = `**${selectedText}**`
      break
    case 'italic':
      formattedText = `*${selectedText}*`
      break
    case 'underline':
      formattedText = `__${selectedText}__`
      break
    case 'strikethrough':
      formattedText = `~~${selectedText}~~`
      break
    case 'code':
      formattedText = `\`${selectedText}\``
      break
    case 'quote':
      formattedText = `> ${selectedText}`
      break
    case 'heading':
      formattedText = `# ${selectedText}`
      break
    case 'list':
      formattedText = `• ${selectedText}`
      break
    default:
      formattedText = selectedText
  }
  
  const newText = text.substring(0, selectionStart) + formattedText + text.substring(selectionEnd)
  const cursorPosition = selectionStart + formattedText.length
  
  return { newText, cursorPosition }
}

export const insertSpecialText = (type, text, cursorPosition) => {
  let insertText = ''
  
  switch (type) {
    case 'date':
      insertText = new Date().toLocaleDateString()
      break
    case 'time':
      insertText = new Date().toLocaleTimeString()
      break
    case 'datetime':
      insertText = new Date().toLocaleString()
      break
    case 'separator':
      insertText = '\n---\n'
      break
    case 'checkbox':
      insertText = '☐ '
      break
    case 'star':
      insertText = '⭐ '
      break
    default:
      return { newText: text, cursorPosition }
  }
  
  const newText = text.substring(0, cursorPosition) + insertText + text.substring(cursorPosition)
  const newCursorPosition = cursorPosition + insertText.length
  
  return { newText, cursorPosition: newCursorPosition }
}