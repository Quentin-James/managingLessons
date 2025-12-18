<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-orange-50 bg-opacity-95 rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-5xl font-extrabold text-red-800 mb-2">My Learning Journey</h1>
        <p class="text-orange-700 font-medium">{{ isLoginMode ? 'Welcome back!' : 'Start your learning journey' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Username (Register only or Login) -->
        <div>
          <label for="username" class="block text-sm font-medium text-orange-800 mb-2">
            {{ isLoginMode ? 'Username or Email' : 'Username' }}
          </label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            required
            class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
            :placeholder="isLoginMode ? 'Enter username or email' : 'Choose a username'"
          />
        </div>

        <!-- Email (Register only) -->
        <div v-if="!isLoginMode">
          <label for="email" class="block text-sm font-medium text-orange-800 mb-2">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
            placeholder="your.email@example.com"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-orange-800 mb-2">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
            placeholder="Enter your password"
          />
        </div>

        <!-- Confirm Password (Register only) -->
        <div v-if="!isLoginMode">
          <label for="confirmPassword" class="block text-sm font-medium text-orange-800 mb-2">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            required
            class="mt-1 block w-full px-4 py-2 border border-orange-200 rounded-xl shadow-sm focus:ring-orange-400 focus:border-orange-500 bg-white"
            placeholder="Confirm your password"
          />
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-xl">
          {{ errorMessage }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-orange-500 hover:bg-orange-600 text-orange-50 font-bold rounded-xl px-6 py-3 shadow-md hover:shadow-lg transition-all"
        >
          {{ isLoginMode ? 'Login' : 'Register' }}
        </button>

        <!-- Toggle Mode -->
        <div class="text-center">
          <button
            type="button"
            @click="toggleMode"
            class="text-orange-700 hover:text-orange-900 font-medium"
          >
            {{ isLoginMode ? "Don't have an account? Register" : 'Already have an account? Login' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login', 'register'])

const isLoginMode = ref(true)
const errorMessage = ref('')
const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  errorMessage.value = ''
  formData.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
}

const handleSubmit = () => {
  errorMessage.value = ''

  if (!isLoginMode.value) {
    // Register validation
    if (formData.value.password !== formData.value.confirmPassword) {
      errorMessage.value = 'Passwords do not match'
      return
    }
    if (formData.value.password.length < 6) {
      errorMessage.value = 'Password must be at least 6 characters'
      return
    }
    emit('register', {
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password
    })
  } else {
    // Login
    emit('login', {
      usernameOrEmail: formData.value.username,
      password: formData.value.password
    })
  }
}

defineExpose({
  setError: (message) => {
    errorMessage.value = message
  }
})
</script>

