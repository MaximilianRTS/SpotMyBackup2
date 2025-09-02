import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import type { SpotifyUser } from '@/types'

export function useSpotifyAuth() {
  const authStore = useAuthStore()
  const appStore = useAppStore()
  
  const isAuthenticating = ref(false)
  const authError = ref<string | null>(null)

  // Spotify OAuth configuration
  const SPOTIFY_CLIENT_ID = localStorage.getItem('spotify_client_id')
  const REDIRECT_URI = `${import.meta.env.VITE_APP_URL || window.location.origin}/callback`
  const SCOPES = [
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-read',
    'user-read-email',
    'user-read-private'
  ].join(' ')

  // Generate PKCE code verifier and challenge
  const generateCodeVerifier = (): string => {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  const generateCodeChallenge = async (verifier: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(verifier)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  // Start OAuth flow
  const startAuth = async (): Promise<void> => {
    if (!SPOTIFY_CLIENT_ID) {
      throw new Error('Spotify Client ID ist nicht konfiguriert')
    }

    isAuthenticating.value = true
    authError.value = null

    try {
      const codeVerifier = generateCodeVerifier()
      const codeChallenge = await generateCodeChallenge(codeVerifier)

      // Store code verifier for later use
      sessionStorage.setItem('spotify_code_verifier', codeVerifier)

      // Build authorization URL
      const authUrl = new URL('https://accounts.spotify.com/authorize')
      authUrl.searchParams.set('response_type', 'code')
      authUrl.searchParams.set('client_id', SPOTIFY_CLIENT_ID)
      authUrl.searchParams.set('scope', SCOPES)
      authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
      authUrl.searchParams.set('code_challenge_method', 'S256')
      authUrl.searchParams.set('code_challenge', codeChallenge)

      // Redirect to Spotify
      window.location.href = authUrl.toString()
    } catch (error) {
      authError.value = error instanceof Error ? error.message : 'Authentifizierung fehlgeschlagen'
      isAuthenticating.value = false
      throw error
    }
  }

  // Handle OAuth callback
  const handleCallback = async (code: string): Promise<void> => {
    const codeVerifier = sessionStorage.getItem('spotify_code_verifier')
    
    if (!codeVerifier) {
      throw new Error('Code verifier nicht gefunden')
    }

    try {
      // Exchange code for tokens
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: SPOTIFY_CLIENT_ID || '',
          code_verifier: codeVerifier,
        }),
      })

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json()
        throw new Error(errorData.error_description || 'Token-Austausch fehlgeschlagen')
      }

      const tokenData = await tokenResponse.json()

      // Fetch user profile
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        },
      })

      if (!userResponse.ok) {
        throw new Error('Benutzerprofil konnte nicht geladen werden')
      }

      const user: SpotifyUser = await userResponse.json()

      // Store authentication data
      authStore.login(
        user,
        tokenData.access_token,
        tokenData.refresh_token,
        tokenData.expires_in
      )

      // Clean up
      sessionStorage.removeItem('spotify_code_verifier')
      
      appStore.showSuccess(
        'Anmeldung erfolgreich',
        `Willkommen, ${user.display_name}! Du kannst jetzt dein Backup erstellen.`
      )
    } catch (error) {
      authError.value = error instanceof Error ? error.message : 'Authentifizierung fehlgeschlagen'
      throw error
    } finally {
      isAuthenticating.value = false
    }
  }

  // Logout
  const logout = (): void => {
    authStore.logout()
    appStore.showInfo('Abgemeldet', 'Du wurdest erfolgreich abgemeldet.')
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)

  return {
    isAuthenticating,
    authError,
    isAuthenticated,
    user,
    startAuth,
    handleCallback,
    logout
  }
}

