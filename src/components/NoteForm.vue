<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50" @click.self="$emit('close')">
    <div class="bg-orange-50 bg-opacity-95 rounded-2xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-4xl font-bold text-orange-900">{{ isEditing ? 'Edit Note' : 'Create New Note' }}</h2>
        <button
          @click="$emit('close')"
          class="text-orange-700 hover:text-orange-900 transition-colors"
          aria-label="Close dialog"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
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
            rows="8"
            class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
            placeholder="Write your notes here..."
          ></textarea>
        </div>

        <div>
          <CodeEditor
            v-model="formData.codeSnippet"
            v-model:language="formData.codeLanguage"
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
import { ref, watch } from 'vue'
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

const formData = ref({
  title: '',
  content: '',
  codeSnippet: '',
  codeLanguage: 'javascript',
  category: '',
  tags: []
})

const tagsInput = ref('')

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

