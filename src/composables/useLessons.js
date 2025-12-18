import { ref } from 'vue'

export function useLessons() {
  const lessons = ref([
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
  ])

  const nextId = ref(4)

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

  return {
    lessons,
    createLesson,
    getLessonById,
    updateLesson,
    deleteLesson
  }
}

