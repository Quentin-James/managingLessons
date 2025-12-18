<template>
  <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200 hover:shadow-2xl transition-shadow duration-300 hover:brightness-105">
    <div class="flex justify-between items-start mb-3">
      <h3 class="text-2xl font-bold text-orange-900 flex-1">{{ note.title }}</h3>
      <div class="flex gap-2 ml-4">
        <button
          @click.stop="$emit('edit', note)"
          class="p-2 text-orange-700 hover:text-orange-900 hover:bg-orange-200 rounded-lg transition-all"
          aria-label="Edit note"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          @click.stop="$emit('delete', note.id)"
          class="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all"
          aria-label="Delete note"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <div class="mb-3">
      <p class="text-orange-700 line-clamp-3">{{ note.content }}</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-3" v-if="note.tags && note.tags.length > 0">
      <span
        v-for="tag in note.tags"
        :key="tag"
        class="px-2 py-1 bg-orange-200 text-orange-800 rounded-lg text-xs font-medium"
      >
        #{{ tag }}
      </span>
    </div>

    <div class="flex justify-between items-center text-sm">
      <span class="text-orange-600">{{ formattedDate }}</span>
      <span v-if="note.category" class="px-3 py-1 bg-red-200 text-red-800 rounded-lg font-medium">
        {{ note.category }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const formattedDate = computed(() => {
  const date = new Date(props.note.timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

