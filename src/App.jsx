import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import './App.css'

// Components
import AuthWrapper from './components/AuthWrapper'
import Sidebar from './components/Sidebar'
import NoteForm from './components/NoteForm'
import HomeView from './components/HomeView'
import TrashView from './components/TrashView'
import ArchiveView from './components/ArchiveView'
import NotebooksView from './components/NotebooksView'
import TagsView from './components/TagsView'
import PlaceholderView from './components/PlaceholderView'

// Hooks
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const { user, isLoaded } = useUser()
  
  // Use user-specific localStorage keys
  const userKey = user?.id || 'anonymous'
  const [notes, setNotes] = useLocalStorage(`notes-notes-${userKey}`, [])
  const [trashNotes, setTrashNotes] = useLocalStorage(`notes-trash-${userKey}`, [])
  const [archivedNotes, setArchivedNotes] = useLocalStorage(`notes-archived-${userKey}`, [])
  const [notebooks, setNotebooks] = useLocalStorage(`notes-notebooks-${userKey}`, [
    { id: 'default', name: 'General', color: '#667eea', createdAt: new Date().toLocaleString() }
  ])
  const [tags, setTags] = useLocalStorage(`notes-tags-${userKey}`, [])
  
  const [newNote, setNewNote] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [activeView, setActiveView] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [editingNote, setEditingNote] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // Notebook and Tag states
  const [selectedNotebook, setSelectedNotebook] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [newNoteTags, setNewNoteTags] = useState([])
  const [newNoteNotebook, setNewNoteNotebook] = useState('default')
  
  // Don't render until user is loaded
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  // Helper function to get random tag color
  const getRandomTagColor = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Notebook management functions
  const handleCreateNotebook = (name, color) => {
    const newNotebook = {
      id: Date.now().toString(),
      name: name.trim(),
      color: color || '#667eea',
      createdAt: new Date().toLocaleString()
    }
    setNotebooks([...notebooks, newNotebook])
    return newNotebook.id
  }

  const handleUpdateNotebook = (id, updates) => {
    setNotebooks(notebooks.map(notebook => 
      notebook.id === id ? { ...notebook, ...updates } : notebook
    ))
  }

  const handleDeleteNotebook = (id) => {
    if (id === 'default') return // Can't delete default notebook
    
    // Move all notes from this notebook to default
    setNotes(notes.map(note => 
      note.notebookId === id ? { ...note, notebookId: 'default' } : note
    ))
    
    setNotebooks(notebooks.filter(notebook => notebook.id !== id))
    
    if (selectedNotebook === id) {
      setSelectedNotebook('all')
    }
  }

  // Tag management functions
  const handleCreateTag = (name, color) => {
    const newTag = {
      id: Date.now().toString(),
      name: name.trim(),
      color: color || getRandomTagColor(),
      createdAt: new Date().toLocaleString()
    }
    setTags([...tags, newTag])
    return newTag
  }

  const handleUpdateTag = (id, updates) => {
    setTags(tags.map(tag => 
      tag.id === id ? { ...tag, ...updates } : tag
    ))
  }

  const handleDeleteTag = (id) => {
    const tagToDelete = tags.find(tag => tag.id === id)
    if (!tagToDelete) return
    
    // Remove tag from all notes
    setNotes(notes.map(note => ({
      ...note,
      tags: note.tags?.filter(tagName => tagName !== tagToDelete.name) || []
    })))
    
    setTags(tags.filter(tag => tag.id !== id))
    setSelectedTags(selectedTags.filter(tagName => tagName !== tagToDelete.name))
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (newNote.trim() === '') return
    
    if (isEditing && editingNote) {
      // Update existing note
      handleUpdateNote(e)
    } else {
      // Create new note
      const newNoteObj = {
        id: Date.now(),
        title: newTitle.trim() || 'Untitled Note',
        text: newNote,
        createdAt: new Date().toLocaleString(),
        isPinned: false,
        isArchived: false,
        notebookId: newNoteNotebook,
        tags: newNoteTags
      }
      setNotes([...notes, newNoteObj])
      
      // Add new tags to tags list if they don't exist
      const existingTagNames = tags.map(tag => tag.name.toLowerCase())
      const newTagsToAdd = newNoteTags
        .filter(tagName => !existingTagNames.includes(tagName.toLowerCase()))
        .map(tagName => ({
          id: Date.now() + Math.random(),
          name: tagName,
          color: getRandomTagColor(),
          createdAt: new Date().toLocaleString()
        }))
      
      if (newTagsToAdd.length > 0) {
        setTags([...tags, ...newTagsToAdd])
      }
      
      setNewNote('')
      setNewTitle('')
      setNewNoteTags([])
      setNewNoteNotebook('default')
      setShowForm(false)
    }
  }

  const handleDeleteNote = (id) => {
    // Check if note is in main notes
    let noteToDelete = notes.find(note => note.id === id)
    if (noteToDelete) {
      const updatedNotes = notes.filter(note => note.id !== id)
      setTrashNotes([...trashNotes, {
        ...noteToDelete,
        deletedAt: new Date().toLocaleString()
      }])
      setNotes(updatedNotes)
    } else {
      // Check if note is in archived notes
      noteToDelete = archivedNotes.find(note => note.id === id)
      if (noteToDelete) {
        const updatedArchived = archivedNotes.filter(note => note.id !== id)
        setTrashNotes([...trashNotes, {
          ...noteToDelete,
          deletedAt: new Date().toLocaleString()
        }])
        setArchivedNotes(updatedArchived)
      }
    }
  }

  const handleRestoreNote = (id) => {
    const noteToRestore = trashNotes.find(note => note.id === id)
    const updatedTrash = trashNotes.filter(note => note.id !== id)
    
    const { deletedAt, ...restoredNote } = noteToRestore
    
    setNotes([...notes, restoredNote])
    setTrashNotes(updatedTrash)
  }

  const handleDeletePermanent = (id) => {
    const updatedTrash = trashNotes.filter(note => note.id !== id)
    setTrashNotes(updatedTrash)
  }

  const handleEmptyTrash = () => {
    setTrashNotes([])
  }

  // Archive and Pin functions
  const handleArchiveNote = (id) => {
    const noteToArchive = notes.find(note => note.id === id)
    const updatedNotes = notes.filter(note => note.id !== id)
    
    setArchivedNotes([...archivedNotes, {
      ...noteToArchive,
      archivedAt: new Date().toLocaleString(),
      isArchived: true
    }])
    
    setNotes(updatedNotes)
  }

  const handleUnarchiveNote = (id) => {
    const noteToUnarchive = archivedNotes.find(note => note.id === id)
    const updatedArchived = archivedNotes.filter(note => note.id !== id)
    
    const { archivedAt, ...unarchivedNote } = noteToUnarchive
    
    setNotes([...notes, {
      ...unarchivedNote,
      isArchived: false
    }])
    setArchivedNotes(updatedArchived)
  }

  const handlePinNote = (id) => {
    const updatedNotes = notes.map(note => 
      note.id === id 
        ? { ...note, isPinned: !note.isPinned, pinnedAt: !note.isPinned ? new Date().toLocaleString() : null }
        : note
    )
    setNotes(updatedNotes)
  }

  // Edit note functions
  const handleEditNote = (note, isArchived = false) => {
    if (isArchived) {
      // First unarchive the note, then edit it
      handleUnarchiveNote(note.id)
      // Small delay to ensure state is updated
      setTimeout(() => {
        setEditingNote({...note, isArchived: false})
        setNewTitle(note.title)
        setNewNote(note.text)
        setNewNoteTags(note.tags || [])
        setNewNoteNotebook(note.notebookId || 'default')
        setIsEditing(true)
        setShowForm(true)
        setActiveView('home')
      }, 100)
    } else {
      setEditingNote(note)
      setNewTitle(note.title)
      setNewNote(note.text)
      setNewNoteTags(note.tags || [])
      setNewNoteNotebook(note.notebookId || 'default')
      setIsEditing(true)
      setShowForm(true)
      setActiveView('home')
    }
  }

  const handleUpdateNote = (e) => {
    e.preventDefault()
    if (newNote.trim() === '' || !editingNote) return
    
    const updatedNotes = notes.map(note => 
      note.id === editingNote.id 
        ? { 
            ...note, 
            title: newTitle.trim() || 'Untitled Note',
            text: newNote,
            notebookId: newNoteNotebook,
            tags: newNoteTags,
            updatedAt: new Date().toLocaleString()
          }
        : note
    )
    
    // Add new tags to tags list if they don't exist
    const existingTagNames = tags.map(tag => tag.name.toLowerCase())
    const newTagsToAdd = newNoteTags
      .filter(tagName => !existingTagNames.includes(tagName.toLowerCase()))
      .map(tagName => ({
        id: Date.now() + Math.random(),
        name: tagName,
        color: getRandomTagColor(),
        createdAt: new Date().toLocaleString()
      }))
    
    if (newTagsToAdd.length > 0) {
      setTags([...tags, ...newTagsToAdd])
    }
    
    setNotes(updatedNotes)
    setNewNote('')
    setNewTitle('')
    setNewNoteTags([])
    setNewNoteNotebook('default')
    setShowForm(false)
    setIsEditing(false)
    setEditingNote(null)
  }

  const handleCancelEdit = () => {
    setNewNote('')
    setNewTitle('')
    setNewNoteTags([])
    setNewNoteNotebook('default')
    setShowForm(false)
    setIsEditing(false)
    setEditingNote(null)
  }

  const filteredNotes = notes.filter(note => {
    const searchLower = searchQuery.toLowerCase()
    
    // Search filter
    const matchesSearch = (
      note.title.toLowerCase().includes(searchLower) ||
      note.text.toLowerCase().includes(searchLower) ||
      (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    )
    
    // Notebook filter
    const matchesNotebook = selectedNotebook === 'all' || note.notebookId === selectedNotebook
    
    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
      (note.tags && selectedTags.every(selectedTag => 
        note.tags.some(noteTag => noteTag.toLowerCase() === selectedTag.toLowerCase())
      ))
    
    return matchesSearch && matchesNotebook && matchesTags
  }).sort((a, b) => {
    // First sort by pinned status (pinned notes first)
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    
    // Then sort by the selected criteria
    switch(sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  return (
    <AuthWrapper>
      <div className="app">
        <div className="app-container">
          <Sidebar
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            activeView={activeView}
            setActiveView={setActiveView}
            setShowForm={setShowForm}
            notes={notes}
            archivedNotes={archivedNotes}
            trashNotes={trashNotes}
            notebooks={notebooks}
            tags={tags}
            selectedNotebook={selectedNotebook}
            setSelectedNotebook={setSelectedNotebook}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          <div className="main-content">
            {showForm && (
              <NoteForm
                newNote={newNote}
                setNewNote={setNewNote}
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                newNoteTags={newNoteTags}
                setNewNoteTags={setNewNoteTags}
                newNoteNotebook={newNoteNotebook}
                setNewNoteNotebook={setNewNoteNotebook}
                notebooks={notebooks}
                tags={tags}
                isEditing={isEditing}
                onSubmit={handleAddNote}
                onCancel={handleCancelEdit}
              />
            )}

            {activeView === 'home' && !showForm && (
              <HomeView
                filteredNotes={filteredNotes}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                viewMode={viewMode}
                notebooks={notebooks}
                tags={tags}
                onEdit={handleEditNote}
                onPin={handlePinNote}
                onArchive={handleArchiveNote}
                onDelete={handleDeleteNote}
                setShowForm={setShowForm}
              />
            )}

            {activeView === 'notebooks' && (
              <NotebooksView
                notebooks={notebooks}
                notes={notes}
                onCreateNotebook={handleCreateNotebook}
                onUpdateNotebook={handleUpdateNotebook}
                onDeleteNotebook={handleDeleteNotebook}
                onSelectNotebook={(notebookId) => {
                  setSelectedNotebook(notebookId)
                  setActiveView('home')
                }}
              />
            )}

            {activeView === 'tags' && (
              <TagsView
                tags={tags}
                notes={notes}
                onCreateTag={handleCreateTag}
                onUpdateTag={handleUpdateTag}
                onDeleteTag={handleDeleteTag}
                onSelectTag={(tagName) => {
                  setSelectedTags([tagName])
                  setActiveView('home')
                }}
              />
            )}

            {activeView === 'trash' && (
              <TrashView
                trashNotes={trashNotes}
                notebooks={notebooks}
                tags={tags}
                onRestore={handleRestoreNote}
                onDeletePermanent={handleDeletePermanent}
                onEmptyTrash={handleEmptyTrash}
              />
            )}

            {activeView === 'archive' && (
              <ArchiveView
                archivedNotes={archivedNotes}
                viewMode={viewMode}
                notebooks={notebooks}
                tags={tags}
                onEdit={handleEditNote}
                onUnarchive={handleUnarchiveNote}
                onDelete={handleDeleteNote}
              />
            )}

            {!['home', 'notebooks', 'tags', 'trash', 'archive'].includes(activeView) && (
              <PlaceholderView onReturnHome={() => setActiveView('home')} />
            )}
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}

export default App