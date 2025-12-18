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

    <!-- Search Bar -->
    <SearchBar
      v-model="searchQuery"
      placeholder="Search lessons by title, description, or difficulty..."
    />

    <div v-if="lessons.length === 0" class="text-center py-12 bg-orange-50 bg-opacity-50 rounded-2xl">
      <p class="text-orange-700 text-lg">No lessons yet. Add your first lesson to start learning!</p>
    </div>

    <div v-else-if="filteredActiveLessons.length === 0 && filteredCompletedLessons.length === 0" class="text-center py-12 bg-orange-50 bg-opacity-50 rounded-2xl">
      <p class="text-orange-700 text-lg">No lessons found matching "{{ searchQuery }}"</p>
    </div>

    <div v-else class="space-y-8">
      <!-- Active Lessons Section -->
      <div v-if="filteredActiveLessons.length > 0">
        <h3 class="text-2xl font-bold text-orange-900 mb-4">
          Active Lessons ({{ filteredActiveLessons.length }})
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LessonCard
            v-for="lesson in filteredActiveLessons"
            :key="lesson.id"
            :lesson="lesson"
            @edit="$emit('edit-lesson', $event)"
            @delete="$emit('delete-lesson', $event)"
            @toggle-completed="$emit('toggle-completed', $event)"
          />
        </div>
      </div>

      <!-- Completed Lessons Section -->
      <div v-if="filteredCompletedLessons.length > 0">
        <h3 class="text-2xl font-bold text-green-800 mb-4">
          Completed Lessons ({{ filteredCompletedLessons.length }})
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LessonCard
            v-for="lesson in filteredCompletedLessons"
            :key="lesson.id"
            :lesson="lesson"
            @edit="$emit('edit-lesson', $event)"
            @delete="$emit('delete-lesson', $event)"
            @toggle-completed="$emit('toggle-completed', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LessonCard from './LessonCard.vue'
import SearchBar from './SearchBar.vue'

const props = defineProps({
  lessons: {
    type: Array,
    default: () => []
  }
})

defineEmits(['add-lesson', 'edit-lesson', 'delete-lesson', 'toggle-completed'])

const searchQuery = ref('')

const filteredActiveLessons = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return props.lessons
    .filter(lesson => !lesson.completed)
    .filter(lesson => {
      if (!query) return true
      return (
        lesson.title.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query) ||
        lesson.difficulty.toLowerCase().includes(query)
      )
    })
})

const filteredCompletedLessons = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return props.lessons
    .filter(lesson => lesson.completed)
    .filter(lesson => {
      if (!query) return true
      return (
        lesson.title.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query) ||
        lesson.difficulty.toLowerCase().includes(query)
      )
    })
})
</script>

