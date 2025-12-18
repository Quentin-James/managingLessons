import { ref, watch } from 'vue'

const STORAGE_KEY = 'learning-journey-lessons'

export function useLessons() {
  const lessons = ref([])
  const nextId = ref(1)

  // Load lessons from localStorage on initialization
  const loadLessons = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        lessons.value = data.lessons || []
        nextId.value = data.nextId || 1
      } else {
        // Initialize with default lessons if nothing in storage
        lessons.value = [
          {
            id: 1,
            title: 'Getting Started with JavaScript',
            description: 'Learn the fundamentals of JavaScript programming - variables, functions, and basic syntax',
            duration: 45,
            difficulty: 'Beginner'
          },
          {
            id: 2,
            title: 'Building My First Vue App',
            description: 'Create an interactive web application using Vue.js framework',
            duration: 60,
            difficulty: 'Intermediate'
          },
          {
            id: 3,
            title: 'TypeScript Deep Dive',
            description: 'Master TypeScript type system and advanced features to write better code',
            duration: 90,
            difficulty: 'Advanced'
          }
        ]
        nextId.value = 4
        saveToStorage() // Save default lessons
      }
    } catch (error) {
      console.error('Error loading lessons from localStorage:', error)
    }
  }

  // Save lessons to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        lessons: lessons.value,
        nextId: nextId.value
      }))
    } catch (error) {
      console.error('Error saving lessons to localStorage:', error)
    }
  }

  // Watch for changes and auto-save
  watch(lessons, () => {
    saveToStorage()
  }, { deep: true })

  watch(nextId, () => {
    saveToStorage()
  })

  // Create
  const createLesson = (lessonData) => {
    const newLesson = {
      id: nextId.value++,
      ...lessonData
    }
    lessons.value.push(newLesson)
    return newLesson
  }

  // Read (already available via lessons ref)
  const getLessonById = (id) => {
    return lessons.value.find(lesson => lesson.id === id)
  }

  // Update
  const updateLesson = (id, updatedData) => {
    const index = lessons.value.findIndex(lesson => lesson.id === id)
    if (index !== -1) {
      lessons.value[index] = {
        ...lessons.value[index],
        ...updatedData
      }
      return lessons.value[index]
    }
    return null
  }

  // Delete
  const deleteLesson = (id) => {
    const index = lessons.value.findIndex(lesson => lesson.id === id)
    if (index !== -1) {
      lessons.value.splice(index, 1)
      return true
    }
    return false
  }

  // Toggle completed status
  const toggleCompleted = (id) => {
    const index = lessons.value.findIndex(lesson => lesson.id === id)
    if (index !== -1) {
      lessons.value[index].completed = !lessons.value[index].completed
      lessons.value[index].completedAt = lessons.value[index].completed
        ? new Date().toISOString()
        : null
      return lessons.value[index]
    }
    return null
  }

  // Initialize
  loadLessons()

  return {
    lessons,
    createLesson,
    getLessonById,
    updateLesson,
    deleteLesson,
    toggleCompleted
  }
}

