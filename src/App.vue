<script setup>
import { ref } from 'vue'
import LessonList from './components/LessonList.vue'
import LessonForm from './components/LessonForm.vue'
import NotesList from './components/NotesList.vue'
import NoteForm from './components/NoteForm.vue'
import { useLessons } from './composables/useLessons'
import { useNotes } from './composables/useNotes'

// Lessons
const { lessons, createLesson, updateLesson, deleteLesson } = useLessons()
const showLessonForm = ref(false)
const editingLesson = ref(null)

// Notes
const { notes, createNote, updateNote, deleteNote, getCategories } = useNotes()
const showNoteForm = ref(false)
const editingNote = ref(null)

// Tab management
const activeTab = ref('lessons')

// Lesson handlers
const openAddLessonForm = () => {
  editingLesson.value = null
  showLessonForm.value = true
}

const openEditLessonForm = (lesson) => {
  editingLesson.value = lesson
  showLessonForm.value = true
}

const closeLessonForm = () => {
  showLessonForm.value = false
  editingLesson.value = null
}

const handleSaveLesson = (lessonData) => {
  if (editingLesson.value) {
    updateLesson(editingLesson.value.id, lessonData)
  } else {
    createLesson(lessonData)
  }
  closeLessonForm()
}

const handleDeleteLesson = (lessonId) => {
  if (confirm('Are you sure you want to remove this lesson from your learning journey?')) {
    deleteLesson(lessonId)
  }
}

// Note handlers
const openAddNoteForm = () => {
  editingNote.value = null
  showNoteForm.value = true
}

const openEditNoteForm = (note) => {
  editingNote.value = note
  showNoteForm.value = true
}

const closeNoteForm = () => {
  showNoteForm.value = false
  editingNote.value = null
}

const handleSaveNote = (noteData) => {
  if (editingNote.value) {
    updateNote(editingNote.value.id, noteData)
  } else {
    createNote(noteData)
  }
  closeNoteForm()
}

const handleDeleteNote = (noteId) => {
  if (confirm('Are you sure you want to delete this note?')) {
    deleteNote(noteId)
  }
}
</script>

<template>
  <div class="bg-gradient-to-b from-orange-200 via-orange-300 to-red-400 font-sans antialiased text-orange-900 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-5xl font-extrabold text-red-800 mb-4">My Learning Journey</h1>
        <p class="text-orange-700 font-medium">Track and organize your coding lessons and notes</p>
      </div>

      <!-- Tabs -->
      <div class="mb-8 flex justify-center gap-4">
        <button
          @click="activeTab = 'lessons'"
          :class="[
            'px-6 py-3 rounded-xl font-bold shadow-md transition-all',
            activeTab === 'lessons'
              ? 'bg-orange-500 text-orange-50 shadow-lg'
              : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
          ]"
        >
          Lessons
        </button>
        <button
          @click="activeTab = 'notes'"
          :class="[
            'px-6 py-3 rounded-xl font-bold shadow-md transition-all',
            activeTab === 'notes'
              ? 'bg-orange-500 text-orange-50 shadow-lg'
              : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
          ]"
        >
          Notes
        </button>
      </div>

      <!-- Content -->
      <div v-show="activeTab === 'lessons'">
        <LessonList
          :lessons="lessons"
          @add-lesson="openAddLessonForm"
          @edit-lesson="openEditLessonForm"
          @delete-lesson="handleDeleteLesson"
        />
      </div>

      <div v-show="activeTab === 'notes'">
        <NotesList
          :notes="notes"
          @add-note="openAddNoteForm"
          @edit-note="openEditNoteForm"
          @delete-note="handleDeleteNote"
        />
      </div>
    </div>

    <!-- Modals -->
    <LessonForm
      v-if="showLessonForm"
      :lesson="editingLesson"
      @close="closeLessonForm"
      @save="handleSaveLesson"
    />

    <NoteForm
      v-if="showNoteForm"
      :note="editingNote"
      :existing-categories="getCategories()"
      @close="closeNoteForm"
      @save="handleSaveNote"
    />
  </div>
</template>

<style scoped>
</style>
