<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8 text-center">
      <h1 class="text-5xl font-extrabold text-red-800 mb-4">Lesson Manager</h1>
      <p class="text-orange-700 font-medium">Manage your coding lessons efficiently</p>
    </div>

    <div class="mb-6">
      <button
        @click="$emit('add-lesson')"
        class="bg-orange-500 hover:bg-orange-600 text-orange-50 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all"
      >
        + Add New Lesson
      </button>
    </div>

    <div v-if="lessons.length === 0" class="text-center py-12">
      <p class="text-orange-700 text-lg">No lessons yet. Create your first lesson!</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <LessonCard
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
        @click="$emit('select-lesson', lesson)"
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

defineEmits(['add-lesson', 'select-lesson'])
</script>

