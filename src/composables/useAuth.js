import { ref } from 'vue'

const STORAGE_KEY = 'learning-journey-users'
const CURRENT_USER_KEY = 'learning-journey-current-user'

export function useAuth() {
  const currentUser = ref(null)
  const isAuthenticated = ref(false)

  // Load current user from localStorage
  const loadCurrentUser = () => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY)
      if (stored) {
        currentUser.value = JSON.parse(stored)
        isAuthenticated.value = true
      }
    } catch (error) {
      console.error('Error loading current user:', error)
    }
  }

  // Save current user to localStorage
  const saveCurrentUser = () => {
    try {
      if (currentUser.value) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser.value))
      } else {
        localStorage.removeItem(CURRENT_USER_KEY)
      }
    } catch (error) {
      console.error('Error saving current user:', error)
    }
  }

  // Get all users from localStorage
  const getUsers = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading users:', error)
      return []
    }
  }

  // Save users to localStorage
  const saveUsers = (users) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    } catch (error) {
      console.error('Error saving users:', error)
    }
  }

  // Register a new user
  const register = (username, email, password) => {
    const users = getUsers()

    // Check if username or email already exists
    if (users.some(u => u.username === username)) {
      return { success: false, error: 'Username already exists' }
    }
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already exists' }
    }

    // Create new user (in production, password should be hashed)
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // WARNING: Never store plain passwords in production!
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    saveUsers(users)

    return { success: true, user: newUser }
  }

  // Login
  const login = (usernameOrEmail, password) => {
    const users = getUsers()
    const user = users.find(u =>
      (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
      u.password === password
    )

    if (!user) {
      return { success: false, error: 'Invalid credentials' }
    }

    currentUser.value = {
      id: user.id,
      username: user.username,
      email: user.email
    }
    isAuthenticated.value = true
    saveCurrentUser()

    return { success: true, user: currentUser.value }
  }

  // Logout
  const logout = () => {
    currentUser.value = null
    isAuthenticated.value = false
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  // Update user profile
  const updateProfile = (updates) => {
    if (!currentUser.value) return { success: false, error: 'Not authenticated' }

    const users = getUsers()
    const index = users.findIndex(u => u.id === currentUser.value.id)

    if (index === -1) {
      return { success: false, error: 'User not found' }
    }

    // Update user in storage
    users[index] = { ...users[index], ...updates }
    saveUsers(users)

    // Update current user
    currentUser.value = { ...currentUser.value, ...updates }
    saveCurrentUser()

    return { success: true, user: currentUser.value }
  }

  // Change password
  const changePassword = (oldPassword, newPassword) => {
    if (!currentUser.value) return { success: false, error: 'Not authenticated' }

    const users = getUsers()
    const user = users.find(u => u.id === currentUser.value.id)

    if (!user || user.password !== oldPassword) {
      return { success: false, error: 'Invalid old password' }
    }

    user.password = newPassword
    saveUsers(users)

    return { success: true }
  }

  // Initialize
  loadCurrentUser()

  return {
    currentUser,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
    changePassword
  }
}

