<template>
  <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
    <h3 class="text-2xl font-bold text-orange-900 mb-4">Learning Progress</h3>

    <!-- Overall Progress -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-orange-800">Overall Completion</span>
        <span class="text-sm font-bold text-orange-900">{{ completionPercentage }}%</span>
      </div>
      <div class="w-full bg-orange-200 rounded-full h-4 overflow-hidden">
        <div
          class="bg-orange-500 h-4 rounded-full transition-all duration-500"
          :style="{ width: completionPercentage + '%' }"
        ></div>
      </div>
    </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Total Lessons -->
      <div class="bg-white p-4 rounded-xl shadow-md">
        <div class="flex items-center gap-2 mb-2">
          <svg class="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span class="text-xs font-medium text-orange-700">Total</span>
        </div>
        <p class="text-2xl font-bold text-orange-900">{{ stats.total }}</p>
      </div>

      <!-- Completed Lessons -->
      <div class="bg-green-50 p-4 rounded-xl shadow-md">
        <div class="flex items-center gap-2 mb-2">
          <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs font-medium text-green-700">Completed</span>
        </div>
        <p class="text-2xl font-bold text-green-800">{{ stats.completed }}</p>
      </div>

      <!-- Active Lessons -->
      <div class="bg-yellow-50 p-4 rounded-xl shadow-md">
        <div class="flex items-center gap-2 mb-2">
          <svg class="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span class="text-xs font-medium text-yellow-700">Active</span>
        </div>
        <p class="text-2xl font-bold text-yellow-800">{{ stats.active }}</p>
      </div>

      <!-- Total Time -->
      <div class="bg-red-50 p-4 rounded-xl shadow-md">
        <div class="flex items-center gap-2 mb-2">
          <svg class="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs font-medium text-red-700">Total Time</span>
        </div>
        <p class="text-2xl font-bold text-red-800">{{ stats.totalTime }}h</p>
      </div>
    </div>

    <!-- Difficulty Breakdown -->
    <div class="mt-6" v-if="stats.total > 0">
      <h4 class="text-lg font-bold text-orange-900 mb-3">By Difficulty</h4>
      <div class="space-y-3">
        <div v-for="(count, difficulty) in difficultyBreakdown" :key="difficulty">
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-medium text-orange-800">{{ difficulty }}</span>
            <span class="text-sm text-orange-700">{{ count }} lessons</span>
          </div>
          <div class="w-full bg-orange-200 rounded-full h-2">
            <div
              :class="[
                'h-2 rounded-full transition-all duration-500',
                difficulty === 'Beginner' ? 'bg-green-500' :
                difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
              ]"
              :style="{ width: (count / stats.total * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lessons: {
    type: Array,
    default: () => []
  }
})

const stats = computed(() => {
  const total = props.lessons.length
  const completed = props.lessons.filter(l => l.completed).length
  const active = total - completed
  const totalTime = Math.round(props.lessons.reduce((sum, l) => sum + (l.duration || 0), 0) / 60)

  return { total, completed, active, totalTime }
})

const completionPercentage = computed(() => {
  if (stats.value.total === 0) return 0
  return Math.round((stats.value.completed / stats.value.total) * 100)
})

const difficultyBreakdown = computed(() => {
  const breakdown = {}
  props.lessons.forEach(lesson => {
    const diff = lesson.difficulty || 'Unknown'
    breakdown[diff] = (breakdown[diff] || 0) + 1
  })
  return breakdown
})
</script>

