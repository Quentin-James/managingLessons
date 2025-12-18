<template>
  <div
    :class="[
      'bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border transition-shadow duration-300 hover:shadow-2xl hover:brightness-105',
      lesson.completed ? 'border-green-400 bg-green-50' : 'border-orange-200'
    ]"
  >
    <!-- Completed Badge -->
    <div v-if="lesson.completed" class="flex items-center gap-2 mb-3">
      <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="text-sm font-medium text-green-700">Completed on {{ formattedCompletedDate }}</span>
    </div>

    <div class="flex justify-between items-start mb-2">
      <h3 :class="['text-2xl font-bold flex-1', lesson.completed ? 'text-green-900 line-through' : 'text-orange-900']">
        {{ lesson.title }}
      </h3>
      <div class="flex gap-2 ml-4">
        <button
          @click.stop="$emit('edit', lesson)"
          class="p-2 text-orange-700 hover:text-orange-900 hover:bg-orange-200 rounded-lg transition-all"
          aria-label="Edit lesson"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          @click.stop="$emit('delete', lesson.id)"
          class="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all"
          aria-label="Delete lesson"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <p :class="['mb-4', lesson.completed ? 'text-green-700' : 'text-orange-700']">
      {{ lesson.description }}
    </p>

    <div class="flex justify-between items-center mb-4">
      <span :class="['text-sm', lesson.completed ? 'text-green-600' : 'text-orange-600']">
        {{ lesson.duration }} min
      </span>
      <span :class="['px-3 py-1 rounded-lg text-sm font-medium', lesson.completed ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800']">
        {{ lesson.difficulty }}
      </span>
    </div>

    <!-- Mark as Done Button -->
    <button
      @click.stop="$emit('toggle-completed', lesson.id)"
      :class="[
        'w-full font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all',
        lesson.completed
          ? 'bg-orange-200 hover:bg-orange-300 text-orange-900'
          : 'bg-orange-500 hover:bg-orange-600 text-orange-50'
      ]"
    >
      <span class="flex items-center justify-center gap-2">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!lesson.completed"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {{ lesson.completed ? 'Mark as Undone' : 'Mark as Done' }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lesson: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete', 'toggle-completed'])

const formattedCompletedDate = computed(() => {
  if (!props.lesson.completedAt) return ''
  const date = new Date(props.lesson.completedAt)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
})
</script>
