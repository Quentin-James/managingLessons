import { ref, watch } from 'vue'

const STORAGE_KEY = 'learning-journey-notes'

export function useNotes() {
  const notes = ref([])
  const nextId = ref(1)

  // Load notes from localStorage on initialization
  const loadNotes = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        notes.value = data.notes || []
        nextId.value = data.nextId || 1
      }
    } catch (error) {
      console.error('Error loading notes from localStorage:', error)
    }
  }

  // Save notes to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        notes: notes.value,
        nextId: nextId.value
      }))
    } catch (error) {
      console.error('Error saving notes to localStorage:', error)
    }
  }

  // Watch for changes and auto-save
  watch(notes, () => {
    saveToStorage()
  }, { deep: true })

  watch(nextId, () => {
    saveToStorage()
  })

  // Create
  const createNote = (noteData) => {
    const newNote = {
      id: nextId.value++,
      title: noteData.title,
      content: noteData.content,
      tags: noteData.tags || [],
      category: noteData.category || '',
      timestamp: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    notes.value.push(newNote)
    return newNote
  }

  // Read
  const getNoteById = (id) => {
    return notes.value.find(note => note.id === id)
  }

  const getNotesByCategory = (category) => {
    return notes.value.filter(note => note.category === category)
  }

  const getNotesByTag = (tag) => {
    return notes.value.filter(note => note.tags.includes(tag))
  }

  // Update
  const updateNote = (id, updatedData) => {
    const index = notes.value.findIndex(note => note.id === id)
    if (index !== -1) {
      notes.value[index] = {
        ...notes.value[index],
        ...updatedData,
        updatedAt: new Date().toISOString()
      }
      return notes.value[index]
    }
    return null
  }

  // Delete
  const deleteNote = (id) => {
    const index = notes.value.findIndex(note => note.id === id)
    if (index !== -1) {
      notes.value.splice(index, 1)
      return true
    }
    return false
  }

  // Get all unique categories
  const getCategories = () => {
    const categories = new Set()
    notes.value.forEach(note => {
      if (note.category) {
        categories.add(note.category)
      }
    })
    return Array.from(categories).sort()
  }

  // Get all unique tags
  const getTags = () => {
    const tags = new Set()
    notes.value.forEach(note => {
      note.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }

  // Initialize
  loadNotes()

  return {
    notes,
    createNote,
    getNoteById,
    getNotesByCategory,
    getNotesByTag,
    updateNote,
    deleteNote,
    getCategories,
    getTags
  }
}

