<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <div v-if="isProcessing" class="space-y-6">
        <div class="loading-spinner w-12 h-12 mx-auto"></div>
        <h1 class="text-2xl font-bold text-text">Anmeldung wird verarbeitet...</h1>
        <p class="text-text-secondary">Bitte warten, während wir deine Anmeldung bei Spotify verarbeiten.</p>
      </div>
      
      <div v-else-if="error" class="space-y-6">
        <div class="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-text">Anmeldung fehlgeschlagen</h1>
        <p class="text-text-secondary">{{ error }}</p>
        <div class="space-y-4">
          <button @click="retryAuth" class="btn-primary">
            Erneut versuchen
          </button>
          <router-link to="/setup" class="btn-secondary block">
            Zurück zum Setup
          </router-link>
        </div>
      </div>
      
      <div v-else class="space-y-6">
        <div class="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-text">Anmeldung erfolgreich!</h1>
        <p class="text-text-secondary">Du wirst automatisch weitergeleitet...</p>
        <div class="loading-spinner w-6 h-6 mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSpotifyAuth } from '@/composables/useSpotifyAuth'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const router = useRouter()
const { handleCallback } = useSpotifyAuth()
const appStore = useAppStore()

const isProcessing = ref(true)
const error = ref<string | null>(null)

const retryAuth = () => {
  router.push('/backup')
}

onMounted(async () => {
  try {
    // Get authorization code from URL parameters
    const code = route.query.code as string
    const errorParam = route.query.error as string
    
    if (errorParam) {
      throw new Error(`Spotify OAuth Error: ${errorParam}`)
    }
    
    if (!code) {
      throw new Error('Kein Autorisierungscode erhalten')
    }
    
    // Handle the OAuth callback
    await handleCallback(code)
    
    // Success - redirect to backup page
    setTimeout(() => {
      router.push('/backup')
    }, 2000)
    
  } catch (err) {
    console.error('Callback error:', err)
    error.value = err instanceof Error ? err.message : 'Unbekannter Fehler'
    isProcessing.value = false
  }
})
</script>
