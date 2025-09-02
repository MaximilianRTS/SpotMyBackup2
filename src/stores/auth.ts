import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthState, SpotifyUser } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // User-configurable settings
  const clientId = ref<string>('')
  const redirectUri = ref<string>(`${window.location.origin}/callback`)
  
  // State
  const state = ref<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    expiresAt: null
  })

  // Getters
  const isAuthenticated = computed(() => state.value.isAuthenticated)
  const user = computed(() => state.value.user)
  const accessToken = computed(() => state.value.accessToken)
  const refreshToken = computed(() => state.value.refreshToken)
  const expiresAt = computed(() => state.value.expiresAt)
  const isTokenExpired = computed(() => {
    if (!state.value.expiresAt) return true
    return Date.now() >= state.value.expiresAt
  })

  // Actions
  const setAuthenticated = (authenticated: boolean) => {
    state.value.isAuthenticated = authenticated
  }

  const setUser = (user: SpotifyUser | null) => {
    state.value.user = user
  }

  const setTokens = (accessToken: string, refreshToken: string, expiresIn: number) => {
    state.value.accessToken = accessToken
    state.value.refreshToken = refreshToken
    state.value.expiresAt = Date.now() + (expiresIn * 1000)
  }

  const clearTokens = () => {
    state.value.accessToken = null
    state.value.refreshToken = null
    state.value.expiresAt = null
  }

  const logout = () => {
    state.value.isAuthenticated = false
    state.value.user = null
    clearTokens()
    
    // Clear localStorage
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_refresh_token')
    localStorage.removeItem('spotify_expires_at')
    localStorage.removeItem('spotify_user')
  }

  const login = (user: SpotifyUser, accessToken: string, refreshToken: string, expiresIn: number) => {
    state.value.isAuthenticated = true
    state.value.user = user
    setTokens(accessToken, refreshToken, expiresIn)
    
    // Save to localStorage
    localStorage.setItem('spotify_access_token', accessToken)
    localStorage.setItem('spotify_refresh_token', refreshToken)
    localStorage.setItem('spotify_expires_at', state.value.expiresAt!.toString())
    localStorage.setItem('spotify_user', JSON.stringify(user))
  }

  const loadFromStorage = () => {
    try {
      const accessToken = localStorage.getItem('spotify_access_token')
      const refreshToken = localStorage.getItem('spotify_refresh_token')
      const expiresAt = localStorage.getItem('spotify_expires_at')
      const userStr = localStorage.getItem('spotify_user')

      if (accessToken && refreshToken && expiresAt && userStr) {
        const user = JSON.parse(userStr)
        const expiresAtNum = parseInt(expiresAt)

        // Check if token is still valid
        if (Date.now() < expiresAtNum) {
          state.value.isAuthenticated = true
          state.value.user = user
          state.value.accessToken = accessToken
          state.value.refreshToken = refreshToken
          state.value.expiresAt = expiresAtNum
        } else {
          // Token expired, clear storage
          logout()
        }
      }
    } catch (error) {
      console.error('Error loading auth from storage:', error)
      logout()
    }
  }

  const refreshAccessToken = async (): Promise<boolean> => {
    if (!state.value.refreshToken || !clientId.value) {
      return false
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${clientId.value}:`)}`
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: state.value.refreshToken
        })
      })

      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }

      const data = await response.json()
      setTokens(data.access_token, state.value.refreshToken, data.expires_in)
      
      // Update localStorage
      localStorage.setItem('spotify_access_token', data.access_token)
      localStorage.setItem('spotify_expires_at', state.value.expiresAt!.toString())

      return true
    } catch (error) {
      console.error('Error refreshing token:', error)
      logout()
      return false
    }
  }

  const getValidAccessToken = async (): Promise<string | null> => {
    if (!state.value.accessToken) {
      return null
    }

    if (isTokenExpired.value) {
      const refreshed = await refreshAccessToken()
      if (!refreshed) {
        return null
      }
    }

    return state.value.accessToken
  }

  // Initialize auth state from storage
  loadFromStorage()

  // Methods for user settings
  const setClientId = (id: string) => {
    clientId.value = id
    // Save to localStorage
    localStorage.setItem('spotify_client_id', id)
  }

  const setRedirectUri = (uri: string) => {
    redirectUri.value = uri
    // Save to localStorage
    localStorage.setItem('spotify_redirect_uri', uri)
  }

  const loadUserSettings = () => {
    const savedClientId = localStorage.getItem('spotify_client_id')
    const savedRedirectUri = localStorage.getItem('spotify_redirect_uri')
    
    if (savedClientId) clientId.value = savedClientId
    if (savedRedirectUri) redirectUri.value = savedRedirectUri
  }

  // Load user settings on initialization
  loadUserSettings()

  return {
    // State
    state,
    clientId,
    redirectUri,
    
    // Getters
    isAuthenticated,
    user,
    accessToken,
    refreshToken,
    expiresAt,
    isTokenExpired,
    
    // Actions
    setAuthenticated,
    setUser,
    setTokens,
    clearTokens,
    login,
    logout,
    loadFromStorage,
    refreshAccessToken,
    getValidAccessToken,
    setClientId,
    setRedirectUri,
    loadUserSettings
  }
})
