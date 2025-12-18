<template>
  <div class="bg-orange-50 bg-opacity-80 p-6 rounded-2xl shadow-xl border border-orange-200 hover:shadow-2xl transition-shadow duration-300 hover:brightness-105 active:scale-95 cursor-pointer">
    <h3 class="text-2xl font-bold text-orange-900 mb-2">{{ lesson.title }}</h3>
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
</script>
