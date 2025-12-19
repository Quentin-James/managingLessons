<script setup>
import { ref, computed } from 'vue'
import LessonList from './components/LessonList.vue'
import LessonForm from './components/LessonForm.vue'
import NotesList from './components/NotesList.vue'
import NoteForm from './components/NoteForm.vue'
import NoteViewer from './components/NoteViewer.vue'
import ProgressTracker from './components/ProgressTracker.vue'
import StatisticsPage from './components/StatisticsPage.vue'
import LoginForm from './components/LoginForm.vue'
import { useLessons } from './composables/useLessons'
import { useNotes } from './composables/useNotes'
import { useAuth } from './composables/useAuth'

// Authentication
const { currentUser, isAuthenticated, register, login, logout } = useAuth()
const loginFormRef = ref(null)

// Initialize data with user ID or default
const userId = computed(() => currentUser.value?.id || 'default')
const { lessons, createLesson, updateLesson, deleteLesson, toggleCompleted } = useLessons(userId.value)
const { notes, createNote, updateNote, deleteNote, getCategories } = useNotes(userId.value)

const showLessonForm = ref(false)
const editingLesson = ref(null)
const showNoteForm = ref(false)
const editingNote = ref(null)
const viewingNote = ref(null)
const viewingNoteFullscreen = ref(false)
const activeTab = ref('lessons')

// Auth handlers
const handleLogin = (credentials) => {
  const result = login(credentials.usernameOrEmail, credentials.password)
  if (!result.success && loginFormRef.value) {
    loginFormRef.value.setError(result.error)
  }
}

const handleRegister = (userData) => {
  const result = register(userData.username, userData.email, userData.password)
  if (!result.success && loginFormRef.value) {
    loginFormRef.value.setError(result.error)
  } else {
    login(userData.username, userData.password)
  }
}

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    logout()
    activeTab.value = 'lessons'
    // Reload page to reinitialize with default data
    window.location.reload()
  }
}

// ...existing lesson handlers code...
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

const handleToggleCompleted = (lessonId) => {
  toggleCompleted(lessonId)
}

// ...existing note handlers code...
const openAddNoteForm = () => {
  editingNote.value = null
  showNoteForm.value = true
}

const openViewNoteFullscreen = (note) => {
  viewingNote.value = note
  viewingNoteFullscreen.value = true
}

const closeViewNote = () => {
  viewingNote.value = null
  viewingNoteFullscreen.value = false
}

const openEditNoteFromViewer = (note) => {
  viewingNote.value = null
  viewingNoteFullscreen.value = false
  editingNote.value = note
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
    <!-- Login Form (if not authenticated) -->
    <LoginForm
      v-if="!isAuthenticated"
      ref="loginFormRef"
      @login="handleLogin"
      @register="handleRegister"
    />

    <!-- Main App (if authenticated) -->
    <div v-else class="container mx-auto px-4 py-8">
      <!-- Header with User Info and Logout -->
      <div class="mb-8 text-center relative">
        <h1 class="text-5xl font-extrabold text-red-800 mb-4">My Learning Journey</h1>
        <p class="text-orange-700 font-medium">Track and organize your coding lessons and notes</p>

        <!-- User Badge and Logout -->
        <div class="absolute top-0 right-0 flex items-center gap-3">
          <div class="bg-orange-50 bg-opacity-90 px-4 py-2 rounded-xl shadow-md">
            <span class="text-sm font-medium text-orange-900">{{ currentUser?.username }}</span>
          </div>
          <button
            @click="handleLogout"
            class="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-all"
            title="Logout"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
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
        <button
          @click="activeTab = 'statistics'"
          :class="[
            'px-6 py-3 rounded-xl font-bold shadow-md transition-all',
            activeTab === 'statistics'
              ? 'bg-orange-500 text-orange-50 shadow-lg'
              : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
          ]"
        >
          Statistics
        </button>
      </div>

      <!-- Content -->
      <div v-show="activeTab === 'lessons'" class="space-y-6">
        <!-- Progress Tracker -->
        <ProgressTracker :lessons="lessons" />

        <!-- Lessons List -->
        <LessonList
          :lessons="lessons"
          @add-lesson="openAddLessonForm"
          @edit-lesson="openEditLessonForm"
          @delete-lesson="handleDeleteLesson"
          @toggle-completed="handleToggleCompleted"
        />
      </div>

      <div v-show="activeTab === 'notes'">
        <NotesList
          :notes="notes"
          @add-note="openAddNoteForm"
          @view-fullscreen="openViewNoteFullscreen"
          @edit-note="openEditNoteForm"
          @delete-note="handleDeleteNote"
        />
      </div>

      <div v-show="activeTab === 'statistics'">
        <StatisticsPage
          :lessons="lessons"
          :notes="notes"
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

    <NoteViewer
      v-if="viewingNote"
      :note="viewingNote"
      @close="closeViewNote"
      @edit="openEditNoteFromViewer"
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
