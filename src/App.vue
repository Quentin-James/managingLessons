<script setup>
import { ref } from 'vue'
import LessonList from './components/LessonList.vue'
import LessonForm from './components/LessonForm.vue'
import { useLessons } from './composables/useLessons'

const { lessons, createLesson, updateLesson, deleteLesson } = useLessons()

const showForm = ref(false)
const editingLesson = ref(null)

const openAddForm = () => {
  editingLesson.value = null
  showForm.value = true
}

const openEditForm = (lesson) => {
  editingLesson.value = lesson
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingLesson.value = null
}

const handleSaveLesson = (lessonData) => {
  if (editingLesson.value) {
    // Update existing lesson
    updateLesson(editingLesson.value.id, lessonData)
  } else {
    // Create new lesson
    createLesson(lessonData)
  }
  closeForm()
}

const handleDeleteLesson = (lessonId) => {
  if (confirm('Are you sure you want to remove this lesson from your learning journey?')) {
    deleteLesson(lessonId)
  }
}
</script>

<template>
  <div class="bg-gradient-to-b from-orange-200 via-orange-300 to-red-400 font-sans antialiased text-orange-900 min-h-screen">
    <LessonList
      :lessons="lessons"
      @add-lesson="openAddForm"
      @edit-lesson="openEditForm"
      @delete-lesson="handleDeleteLesson"
    />

    <LessonForm
      v-if="showForm"
      :lesson="editingLesson"
      @close="closeForm"
      @save="handleSaveLesson"
    />
  </div>
</template>

<style scoped>
</style>
