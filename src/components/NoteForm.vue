<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" :class="isFullscreen ? 'p-0' : 'p-6'" @click.self="handleBackdropClick">
    <div
      class="bg-orange-50 bg-opacity-95 shadow-2xl p-8 w-full overflow-y-auto"
      :class="isFullscreen ? 'max-w-none h-full rounded-none' : 'max-w-3xl max-h-[90vh] rounded-2xl'"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-4xl font-bold text-orange-900">{{ isEditing ? 'Edit Note' : 'Create New Note' }}</h2>
          <p v-if="isFullscreen" class="text-xs text-orange-700 mt-1">
            Press <kbd class="px-2 py-1 bg-orange-200 rounded text-orange-900 font-mono text-xs">ESC</kbd> to exit fullscreen or
            <kbd class="px-2 py-1 bg-orange-200 rounded text-orange-900 font-mono text-xs">F11</kbd> to toggle
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="toggleFullscreen"
            class="text-orange-700 hover:text-orange-900 transition-colors p-2 hover:bg-orange-200 rounded-lg"
            :aria-label="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
            :title="isFullscreen ? 'Exit fullscreen (ESC)' : 'Enter fullscreen (F11)'"
          >
            <svg v-if="!isFullscreen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
            </svg>
          </button>
          <button
            @click="$emit('close')"
            class="text-orange-700 hover:text-orange-900 transition-colors p-2 hover:bg-orange-200 rounded-lg"
            aria-label="Close dialog"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-orange-800 mb-2">Title</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
            placeholder="e.g., JavaScript Array Methods Notes"
          />
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-orange-800 mb-2">Content</label>
          <textarea
            id="content"
            v-model="formData.content"
            required
            :rows="isFullscreen ? 20 : 8"
            class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
            placeholder="Write your notes here..."
          ></textarea>
        </div>

        <div>
          <CodeEditor
            v-model="formData.codeSnippet"
            v-model:language="formData.codeLanguage"
            :fullscreen="isFullscreen"
          />
          <p class="mt-1 text-xs text-orange-700">Optional: Add code examples to your notes</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="category" class="block text-sm font-medium text-orange-800 mb-2">Category (optional)</label>
            <input
              id="category"
              v-model="formData.category"
              type="text"
              list="categories"
              class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
              placeholder="e.g., JavaScript, Vue, TypeScript"
            />
            <datalist id="categories">
              <option v-for="cat in existingCategories" :key="cat" :value="cat" />
            </datalist>
          </div>

          <div>
            <label for="tags" class="block text-sm font-medium text-orange-800 mb-2">Tags (comma-separated, optional)</label>
            <input
              id="tags"
              v-model="tagsInput"
              type="text"
              class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
              placeholder="e.g., array, methods, filter"
            />
          </div>
        </div>

        <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2">
          <span class="text-sm font-medium text-orange-800">Tags preview:</span>
          <span
            v-for="tag in formData.tags"
            :key="tag"
            class="px-2 py-1 bg-orange-200 text-orange-800 rounded-lg text-xs font-medium"
          >
            #{{ tag }}
          </span>
        </div>

        <div class="flex gap-4 justify-end pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-orange-200 hover:bg-orange-300 text-orange-900 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-orange-500 hover:bg-orange-600 text-orange-50 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all"
          >
            {{ isEditing ? 'Update Note' : 'Create Note' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import CodeEditor from './CodeEditor.vue'

const props = defineProps({
  note: {
    type: Object,
    default: null
  },
  existingCategories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'save'])

const isEditing = ref(!!props.note)
const isFullscreen = ref(false)

const formData = ref({
  title: '',
  content: '',
  codeSnippet: '',
  codeLanguage: 'javascript',
  category: '',
  tags: []
})

const tagsInput = ref('')

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const handleBackdropClick = () => {
  if (!isFullscreen.value) {
    emit('close')
  }
}

const handleKeyDown = (event) => {
  // ESC key - exit fullscreen or close modal
  if (event.key === 'Escape') {
    if (isFullscreen.value) {
      event.preventDefault()
      isFullscreen.value = false
    } else {
      emit('close')
    }
  }
  // F11 key - toggle fullscreen
  if (event.key === 'F11') {
    event.preventDefault()
    toggleFullscreen()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Initialize form data if editing
watch(() => props.note, (newNote) => {
  if (newNote) {
    formData.value = {
      title: newNote.title,
      content: newNote.content,
      codeSnippet: newNote.codeSnippet || '',
      codeLanguage: newNote.codeLanguage || 'javascript',
      category: newNote.category || '',
      tags: newNote.tags || []
    }
    tagsInput.value = newNote.tags ? newNote.tags.join(', ') : ''
    isEditing.value = true
  } else {
    isEditing.value = false
  }
}, { immediate: true })

// Watch tags input and update formData.tags
watch(tagsInput, (newValue) => {
  if (newValue) {
    formData.value.tags = newValue
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
  } else {
    formData.value.tags = []
  }
})

const handleSubmit = () => {
  emit('save', { ...formData.value })
  emit('close')
}
</script>

