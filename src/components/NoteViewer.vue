<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    :class="isFullscreen ? 'p-0' : 'p-6'"
    @click.self="handleBackdropClick"
  >
    <div
      class="bg-orange-50 bg-opacity-95 shadow-2xl p-8 w-full overflow-y-auto"
      :class="isFullscreen ? 'max-w-none h-full rounded-none' : 'max-w-4xl max-h-[90vh] rounded-2xl'"
      role="dialog"
      aria-modal="true"
    >
      <!-- Header -->
      <div class="flex justify-between items-start mb-6">
        <div class="flex-1">
          <h2 class="text-4xl font-bold text-orange-900 mb-2">{{ note.title }}</h2>
          <div class="flex items-center gap-4 text-sm">
            <span class="text-orange-600">{{ formattedDate }}</span>
            <span v-if="note.category" class="px-3 py-1 bg-red-200 text-red-800 rounded-lg font-medium">
              {{ note.category }}
            </span>
          </div>
          <p v-if="isFullscreen" class="text-xs text-orange-700 mt-2">
            Press <kbd class="px-2 py-1 bg-orange-200 rounded text-orange-900 font-mono text-xs">ESC</kbd> to exit fullscreen or
            <kbd class="px-2 py-1 bg-orange-200 rounded text-orange-900 font-mono text-xs">F11</kbd> to toggle
          </p>
        </div>
        <div class="flex items-center gap-2 ml-4">
          <button
            @click="$emit('edit', note)"
            class="text-orange-700 hover:text-orange-900 transition-colors p-2 hover:bg-orange-200 rounded-lg"
            aria-label="Edit note"
            title="Edit note"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
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
            aria-label="Close"
            title="Close"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <!-- Main Content -->
        <div class="bg-white p-6 rounded-xl shadow-md border border-orange-200">
          <h3 class="text-xl font-bold text-orange-900 mb-3">Content</h3>
          <div class="prose prose-orange max-w-none">
            <p class="text-orange-800 whitespace-pre-wrap leading-relaxed">{{ note.content }}</p>
          </div>
        </div>

        <!-- Code Snippet -->
        <div v-if="note.codeSnippet" class="bg-white p-6 rounded-xl shadow-md border border-orange-200">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-xl font-bold text-orange-900">Code Snippet</h3>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-orange-200 text-orange-800 rounded-lg text-sm font-medium">
                {{ note.codeLanguage || 'code' }}
              </span>
              <button
                @click="copyCode"
                class="p-2 text-orange-700 hover:text-orange-900 hover:bg-orange-200 rounded-lg transition-all"
                :title="copied ? 'Copied!' : 'Copy code'"
              >
                <svg v-if="!copied" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-300 overflow-x-auto">
            <pre class="text-sm text-gray-800 font-mono"><code>{{ note.codeSnippet }}</code></pre>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="note.tags && note.tags.length > 0" class="bg-white p-6 rounded-xl shadow-md border border-orange-200">
          <h3 class="text-xl font-bold text-orange-900 mb-3">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in note.tags"
              :key="tag"
              class="px-3 py-2 bg-orange-200 text-orange-800 rounded-lg text-sm font-medium"
            >
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Metadata -->
        <div class="bg-white p-6 rounded-xl shadow-md border border-orange-200">
          <h3 class="text-xl font-bold text-orange-900 mb-3">Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span class="text-sm font-medium text-orange-700">Created:</span>
              <p class="text-orange-900">{{ formattedDate }}</p>
            </div>
            <div v-if="note.category">
              <span class="text-sm font-medium text-orange-700">Category:</span>
              <p class="text-orange-900">{{ note.category }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="flex gap-4 justify-end pt-6 mt-6 border-t border-orange-200">
        <button
          @click="$emit('edit', note)"
          class="bg-orange-500 hover:bg-orange-600 text-orange-50 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all"
        >
          Edit Note
        </button>
        <button
          @click="$emit('close')"
          class="bg-orange-200 hover:bg-orange-300 text-orange-900 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  },
  initialFullscreen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'edit'])

const isFullscreen = ref(props.initialFullscreen)
const copied = ref(false)

const formattedDate = computed(() => {
  const date = new Date(props.note.timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const handleBackdropClick = () => {
  if (!isFullscreen.value) {
    emit('close')
  }
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.note.codeSnippet)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
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
</script>

<style scoped>
.prose {
  max-width: none;
}
</style>

