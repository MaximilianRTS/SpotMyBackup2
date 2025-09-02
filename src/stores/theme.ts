import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref(false)
  const systemPreference = ref<'light' | 'dark' | 'auto'>('auto')

  // Initialize theme
  const initTheme = () => {
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme-preference')
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      systemPreference.value = savedTheme as 'light' | 'dark' | 'auto'
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Apply theme based on preference
    if (systemPreference.value === 'auto') {
      isDark.value = prefersDark
    } else {
      isDark.value = systemPreference.value === 'dark'
    }

    // Apply theme to document
    applyTheme()
  }

  // Apply theme to document
  const applyTheme = () => {
    const html = document.documentElement
    if (isDark.value) {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
    systemPreference.value = isDark.value ? 'dark' : 'light'
    localStorage.setItem('theme-preference', systemPreference.value)
    applyTheme()
  }

  // Set specific theme
  const setTheme = (theme: 'light' | 'dark' | 'auto') => {
    systemPreference.value = theme
    localStorage.setItem('theme-preference', theme)

    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
    } else {
      isDark.value = theme === 'dark'
    }

    applyTheme()
  }

  // Watch for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (systemPreference.value === 'auto') {
      isDark.value = e.matches
      applyTheme()
    }
  })

  return {
    isDark,
    systemPreference,
    initTheme,
    toggleTheme,
    setTheme
  }
})
