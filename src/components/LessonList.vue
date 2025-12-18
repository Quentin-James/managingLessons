<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-bold text-orange-900">My Lessons</h2>
        <p class="text-orange-700 font-medium">Track and organize your coding lessons</p>
      </div>
      <button
        @click="$emit('add-lesson')"
        class="bg-orange-500 hover:bg-orange-600 text-orange-50 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all"
      >
        + Add New Lesson
      </button>
    </div>

    <div v-if="lessons.length === 0" class="text-center py-12 bg-orange-50 bg-opacity-50 rounded-2xl">
      <p class="text-orange-700 text-lg">No lessons yet. Add your first lesson to start learning!</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <LessonCard
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
        @edit="$emit('edit-lesson', $event)"
        @delete="$emit('delete-lesson', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import LessonCard from './LessonCard.vue'

defineProps({
  lessons: {
    type: Array,
    default: () => []
  }
})

defineEmits(['add-lesson', 'edit-lesson', 'delete-lesson'])
</script>

