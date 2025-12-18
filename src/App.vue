<script setup>
import { ref } from 'vue'
import LessonList from './components/LessonList.vue'

// Sample lessons data
const lessons = ref([
  {
    id: 1,
    title: 'Introduction to JavaScript',
    description: 'Learn the basics of JavaScript programming',
    duration: 45,
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'Vue.js Fundamentals',
    description: 'Master the fundamentals of Vue.js framework',
    duration: 60,
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'Advanced TypeScript',
    description: 'Deep dive into TypeScript advanced features',
    duration: 90,
    difficulty: 'Advanced'
  }
])

const addLesson = () => {
  // Placeholder for add lesson functionality
  console.log('Add lesson clicked')
}

const selectLesson = (lesson) => {
  // Placeholder for select lesson functionality
  console.log('Selected lesson:', lesson)
}
</script>

<template>
  <div class="bg-gradient-to-b from-orange-200 via-orange-300 to-red-400 font-sans antialiased text-orange-900 min-h-screen">
    <LessonList
      :lessons="lessons"
      @add-lesson="addLesson"
      @select-lesson="selectLesson"
    />
  </div>
</template>

<style scoped>
</style>
