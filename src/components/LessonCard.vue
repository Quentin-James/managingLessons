<template>
  <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200 hover:shadow-2xl transition-shadow duration-300 hover:brightness-105">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-2xl font-bold text-orange-900 flex-1">{{ lesson.title }}</h3>
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
    <p class="text-orange-700 mb-4">{{ lesson.description }}</p>
    <div class="flex justify-between items-center">
      <span class="text-sm text-orange-600">{{ lesson.duration }} min</span>
      <span class="px-3 py-1 bg-orange-200 text-orange-800 rounded-lg text-sm font-medium">
        {{ lesson.difficulty }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  lesson: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>
