<template>
  <div class="space-y-6">
    <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
      <h2 class="text-4xl font-bold text-orange-900 mb-2">Learning Statistics</h2>
      <p class="text-orange-700 font-medium">Visualize your progress and achievements</p>
    </div>

    <!-- Overall Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
        <div class="flex items-center gap-3 mb-3">
          <svg class="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-bold text-orange-900">Completion Rate</h3>
        </div>
        <p class="text-4xl font-extrabold text-orange-500">{{ completionRate }}%</p>
        <p class="text-sm text-orange-700 mt-2">{{ stats.completed }} of {{ stats.total }} lessons completed</p>
      </div>

      <div class="bg-green-50 p-6 rounded-2xl shadow-xl border border-green-200">
        <div class="flex items-center gap-3 mb-3">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-bold text-green-900">Time Invested</h3>
        </div>
        <p class="text-4xl font-extrabold text-green-600">{{ stats.totalTime }}h</p>
        <p class="text-sm text-green-700 mt-2">{{ completedTime }}h completed</p>
      </div>

      <div class="bg-yellow-50 p-6 rounded-2xl shadow-xl border border-yellow-200">
        <div class="flex items-center gap-3 mb-3">
          <svg class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <h3 class="text-lg font-bold text-yellow-900">Avg Duration</h3>
        </div>
        <p class="text-4xl font-extrabold text-yellow-600">{{ averageDuration }}m</p>
        <p class="text-sm text-yellow-700 mt-2">per lesson</p>
      </div>

      <div class="bg-red-50 p-6 rounded-2xl shadow-xl border border-red-200">
        <div class="flex items-center gap-3 mb-3">
          <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 class="text-lg font-bold text-red-900">Notes Created</h3>
        </div>
        <p class="text-4xl font-extrabold text-red-600">{{ totalNotes }}</p>
        <p class="text-sm text-red-700 mt-2">across {{ noteCategories.length }} categories</p>
      </div>
    </div>

    <!-- Charts Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Completion Progress Chart -->
      <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
        <h3 class="text-2xl font-bold text-orange-900 mb-4">Completion Status</h3>
        <div class="h-64">
          <Doughnut :data="completionChartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Difficulty Distribution Chart -->
      <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
        <h3 class="text-2xl font-bold text-orange-900 mb-4">Lessons by Difficulty</h3>
        <div class="h-64">
          <Bar :data="difficultyChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>

    <!-- Charts Row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Time Distribution Chart -->
      <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
        <h3 class="text-2xl font-bold text-orange-900 mb-4">Time by Difficulty</h3>
        <div class="h-64">
          <Pie :data="timeDistributionData" :options="chartOptions" />
        </div>
      </div>

      <!-- Recent Activity Timeline -->
      <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
        <h3 class="text-2xl font-bold text-orange-900 mb-4">Recent Completions</h3>
        <div class="space-y-3 max-h-64 overflow-y-auto">
          <div
            v-for="lesson in recentCompletions"
            :key="lesson.id"
            class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="font-bold text-orange-900">{{ lesson.title }}</h4>
                <p class="text-sm text-orange-700">{{ lesson.difficulty }} • {{ lesson.duration }}min</p>
              </div>
              <div class="text-xs text-orange-600 whitespace-nowrap ml-4">
                {{ formatDate(lesson.completedAt) }}
              </div>
            </div>
          </div>
          <div v-if="recentCompletions.length === 0" class="text-center text-orange-700 py-8">
            No completed lessons yet
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Over Time Chart (Line Chart) -->
    <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
      <h3 class="text-2xl font-bold text-orange-900 mb-4">Completion Timeline</h3>
      <div class="h-80">
        <Line :data="timelineChartData" :options="lineChartOptions" />
      </div>
    </div>

    <!-- Notes Statistics -->
    <div v-if="totalNotes > 0" class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
      <h3 class="text-2xl font-bold text-orange-900 mb-4">Notes Overview</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="category in noteCategories"
          :key="category.name"
          class="bg-white p-4 rounded-xl shadow-md"
        >
          <h4 class="font-bold text-orange-900 mb-2">{{ category.name }}</h4>
          <p class="text-3xl font-extrabold text-orange-500">{{ category.count }}</p>
          <p class="text-sm text-orange-700">notes</p>
        </div>
      </div>
    </div>

    <!-- Insights and Recommendations -->
    <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200">
      <h3 class="text-2xl font-bold text-orange-900 mb-4">Insights & Recommendations</h3>
      <div class="space-y-3">
        <div
          v-for="(insight, index) in insights"
          :key="index"
          class="flex items-start gap-3 bg-white p-4 rounded-xl shadow-md"
        >
          <svg class="h-6 w-6 text-orange-500 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-orange-900 font-medium">{{ insight }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'
import { Bar, Doughnut, Pie, Line } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
)

const props = defineProps({
  lessons: {
    type: Array,
    default: () => []
  },
  notes: {
    type: Array,
    default: () => []
  }
})

// Basic Stats
const stats = computed(() => {
  const total = props.lessons.length
  const completed = props.lessons.filter(l => l.completed).length
  const active = total - completed
  const totalTime = props.lessons.reduce((sum, l) => sum + (l.duration || 0), 0)
  return { total, completed, active, totalTime }
})

const completionRate = computed(() => {
  if (stats.value.total === 0) return 0
  return Math.round((stats.value.completed / stats.value.total) * 100)
})

const completedTime = computed(() => {
  return props.lessons
    .filter(l => l.completed)
    .reduce((sum, l) => sum + (l.duration || 0), 0)
})

const averageDuration = computed(() => {
  if (stats.value.total === 0) return 0
  return Math.round(stats.value.totalTime / stats.value.total)
})

const totalNotes = computed(() => props.notes.length)

const noteCategories = computed(() => {
  const categoryCount = {}
  props.notes.forEach(note => {
    const cat = note.category || 'Uncategorized'
    categoryCount[cat] = (categoryCount[cat] || 0) + 1
  })
  return Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

// Recent Completions
const recentCompletions = computed(() => {
  return props.lessons
    .filter(l => l.completed && l.completedAt)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 5)
})

// Chart Data
const completionChartData = computed(() => ({
  labels: ['Completed', 'Active'],
  datasets: [{
    data: [stats.value.completed, stats.value.active],
    backgroundColor: ['#22c55e', '#f59e0b'],
    borderColor: ['#16a34a', '#d97706'],
    borderWidth: 2
  }]
}))

const difficultyChartData = computed(() => {
  const difficulties = { Beginner: 0, Intermediate: 0, Advanced: 0 }
  props.lessons.forEach(lesson => {
    if (difficulties.hasOwnProperty(lesson.difficulty)) {
      difficulties[lesson.difficulty]++
    }
  })

  return {
    labels: Object.keys(difficulties),
    datasets: [{
      label: 'Lessons',
      data: Object.values(difficulties),
      backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
      borderColor: ['#16a34a', '#d97706', '#dc2626'],
      borderWidth: 2
    }]
  }
})

const timeDistributionData = computed(() => {
  const timeByDifficulty = { Beginner: 0, Intermediate: 0, Advanced: 0 }
  props.lessons.forEach(lesson => {
    if (timeByDifficulty.hasOwnProperty(lesson.difficulty)) {
      timeByDifficulty[lesson.difficulty] += lesson.duration || 0
    }
  })

  return {
    labels: Object.keys(timeByDifficulty),
    datasets: [{
      data: Object.values(timeByDifficulty),
      backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
      borderColor: ['#16a34a', '#d97706', '#dc2626'],
      borderWidth: 2
    }]
  }
})

const timelineChartData = computed(() => {
  const completedLessons = props.lessons
    .filter(l => l.completed && l.completedAt)
    .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))

  const cumulativeData = []
  let cumulative = 0
  const labels = []

  completedLessons.forEach(lesson => {
    cumulative++
    cumulativeData.push(cumulative)
    labels.push(formatDate(lesson.completedAt))
  })

  return {
    labels: labels.length > 0 ? labels : ['No data'],
    datasets: [{
      label: 'Completed Lessons',
      data: cumulativeData.length > 0 ? cumulativeData : [0],
      borderColor: '#f97316',
      backgroundColor: 'rgba(249, 115, 22, 0.1)',
      tension: 0.4,
      fill: true
    }]
  }
})

// Chart Options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { size: 12, weight: 'bold' },
        color: '#9a3412'
      }
    }
  }
}

const barChartOptions = {
  ...chartOptions,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: '#9a3412', stepSize: 1 }
    },
    x: {
      ticks: { color: '#9a3412' }
    }
  }
}

const lineChartOptions = {
  ...chartOptions,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: '#9a3412', stepSize: 1 }
    },
    x: {
      ticks: { color: '#9a3412', maxRotation: 45, minRotation: 45 }
    }
  }
}

// Insights
const insights = computed(() => {
  const results = []

  if (stats.value.completed === 0) {
    results.push("Start your learning journey by completing your first lesson!")
  } else if (completionRate.value < 30) {
    results.push("You're making progress! Try to complete a few more lessons to build momentum.")
  } else if (completionRate.value >= 30 && completionRate.value < 70) {
    results.push("Great progress! You're halfway there. Keep up the excellent work!")
  } else if (completionRate.value >= 70) {
    results.push("Outstanding! You're crushing your learning goals!")
  }

  const difficulties = {}
  props.lessons.forEach(l => {
    difficulties[l.difficulty] = (difficulties[l.difficulty] || 0) + 1
  })

  if (difficulties.Beginner > difficulties.Intermediate + difficulties.Advanced) {
    results.push("Consider challenging yourself with more intermediate or advanced lessons.")
  }

  if (stats.value.active > stats.value.completed && stats.value.active > 5) {
    results.push("You have many active lessons. Focus on completing a few before starting new ones.")
  }

  if (totalNotes.value === 0) {
    results.push("Start taking notes to enhance your learning and retention!")
  } else if (totalNotes.value > stats.value.completed) {
    results.push("Excellent! You're taking detailed notes. This will help with long-term retention.")
  }

  if (completedTime.value >= 100) {
    results.push(`Amazing dedication! You've invested ${completedTime.value} hours in learning.`)
  }

  return results
})

// Utility Functions
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
/* Custom scrollbar for recent activity */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #fed7aa;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}
</style>

