<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50" @click.self="$emit('close')">
    <div class="bg-orange-50 bg-opacity-95 rounded-2xl shadow-2xl p-8 w-full max-w-2xl" role="dialog" aria-modal="true">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-4xl font-bold text-orange-900">{{ isEditing ? 'Edit Lesson' : 'Add New Lesson' }}</h2>
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
            placeholder="e.g., Introduction to React"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-orange-800 mb-2">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            required
            rows="4"
            class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
            placeholder="Describe what students will learn..."
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="duration" class="block text-sm font-medium text-orange-800 mb-2">Duration (minutes)</label>
            <input
              id="duration"
              v-model.number="formData.duration"
              type="number"
              required
              min="1"
              class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
              placeholder="45"
            />
          </div>

          <div>
            <label for="difficulty" class="block text-sm font-medium text-orange-800 mb-2">Difficulty</label>
            <select
              id="difficulty"
              v-model="formData.difficulty"
              required
              class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
            >
              <option value="">Select difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
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
            {{ isEditing ? 'Update Lesson' : 'Add Lesson' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  lesson: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const isEditing = ref(!!props.lesson)

const formData = ref({
  title: '',
  description: '',
  duration: 30,
  difficulty: ''
})

// Initialize form data if editing
watch(() => props.lesson, (newLesson) => {
  if (newLesson) {
    formData.value = {
      title: newLesson.title,
      description: newLesson.description,
      duration: newLesson.duration,
      difficulty: newLesson.difficulty
    }
    isEditing.value = true
  } else {
    isEditing.value = false
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('save', { ...formData.value })
  emit('close')
}
</script>

