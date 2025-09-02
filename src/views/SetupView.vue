<template>
  <div class="min-h-screen bg-background">
    <div class="container-custom section-padding">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl sm:text-4xl font-bold text-text mb-4">
            🎯 Setup-Assistent
          </h1>
          <p class="text-xl text-text-secondary">
            Erstelle deine Spotify App und starte mit dem Backup
          </p>
        </div>

        <!-- Progress Bar -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-text">Fortschritt</span>
            <span class="text-sm text-text-secondary">{{ currentStep }} von {{ totalSteps }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
          </div>
        </div>

        <!-- Step 1: Spotify App erstellen -->
        <div v-if="currentStep === 1" class="card animate-fade-in">
          <div class="card-header">
            <h2 class="card-title">Schritt 1: Spotify App erstellen</h2>
            <p class="card-description">
              Erstelle eine kostenlose Spotify App im Developer Portal. 
              Das dauert nur 2 Minuten!
            </p>
          </div>

          <div class="space-y-6">
            <!-- Instructions -->
            <div class="bg-accent-800/50 border border-accent-600 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-text mb-4">📋 Anleitung:</h3>
              <ol class="space-y-3 text-text-secondary">
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span>Gehe zu <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300 underline">Spotify Developer Dashboard</a></span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span>Klicke auf "Create App"</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span>Fülle die Felder aus:
                    <ul class="mt-2 ml-4 space-y-1">
                      <li>• <strong>App name:</strong> "Mein Backup Tool"</li>
                      <li>• <strong>App description:</strong> "Für Spotify Backups"</li>
                      <li>• <strong>Website:</strong> {{ appUrl }}</li>
                      <li>• <strong>Redirect URI:</strong> {{ redirectUri }}</li>
                    </ul>
                  </span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span>Klicke "Save" und kopiere die <strong>Client ID</strong></span>
                </li>
              </ol>
            </div>

            <!-- Quick Actions -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="https://developer.spotify.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn-primary flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Spotify Developer öffnen
              </a>
              <button 
                @click="copyRedirectUri"
                class="btn-secondary flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Redirect URI kopieren
              </button>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button @click="$router.push('/')" class="btn-ghost">
              ← Zurück
            </button>
            <button @click="nextStep" class="btn-primary">
              Weiter →
            </button>
          </div>
        </div>

        <!-- Step 2: Client ID eingeben -->
        <div v-if="currentStep === 2" class="card animate-fade-in">
          <div class="card-header">
            <h2 class="card-title">Schritt 2: Client ID eingeben</h2>
            <p class="card-description">
              Gib deine Spotify Client ID ein, die du im Developer Portal erstellt hast.
            </p>
          </div>

          <div class="space-y-6">
            <div class="form-group">
              <label for="clientId" class="form-label">Spotify Client ID</label>
              <input
                id="clientId"
                v-model="clientId"
                type="text"
                class="form-input"
                placeholder="z.B. 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p"
                @input="validateClientId"
              />
              <div v-if="clientIdError" class="form-error">
                {{ clientIdError }}
              </div>
              <div v-if="isClientIdValid" class="text-success text-sm mt-1">
                ✅ Client ID ist gültig
              </div>
            </div>

            <div class="status-info">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-text-secondary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                <div>
                  <p class="text-sm">
                    <strong>Wo finde ich meine Client ID?</strong><br>
                    In deiner Spotify App unter "App Details" → "Client ID"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button @click="previousStep" class="btn-ghost">
              ← Zurück
            </button>
            <button 
              @click="nextStep" 
              class="btn-primary"
              :disabled="!isClientIdValid"
            >
              Weiter →
            </button>
          </div>
        </div>

        <!-- Step 3: Setup abgeschlossen -->
        <div v-if="currentStep === 3" class="card animate-fade-in">
          <div class="card-header text-center">
            <div class="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <h2 class="card-title">🎉 Setup abgeschlossen!</h2>
            <p class="card-description">
              Perfekt! Du kannst jetzt mit deinem Spotify Backup beginnen.
            </p>
          </div>

          <div class="space-y-6">
            <div class="status-success">
              <h3 class="font-semibold text-text mb-2">✅ Was wurde konfiguriert:</h3>
              <ul class="space-y-1 text-sm">
                <li>• Spotify Client ID: {{ clientId }}</li>
                <li>• Redirect URI: {{ redirectUri }}</li>
                <li>• Berechtigungen: Playlists lesen, gespeicherte Tracks lesen</li>
                <li>• Sicherheit: PKCE OAuth Flow aktiviert</li>
              </ul>
            </div>

            <div class="bg-accent-800/50 border border-accent-600 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-text mb-4">🚀 Nächste Schritte:</h3>
              <ol class="space-y-2 text-text-secondary">
                <li>1. Melde dich bei Spotify an</li>
                <li>2. Erstelle dein Backup</li>
                <li>3. Lade die Datei herunter</li>
              </ol>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <button @click="previousStep" class="btn-ghost">
              ← Zurück
            </button>
            <router-link to="/backup" class="btn-primary">
              Backup erstellen →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// State
const currentStep = ref(1)
const totalSteps = ref(3)
const clientId = ref('')
const clientIdError = ref('')
const isClientIdValid = ref(false)

// Computed
const progress = computed(() => (currentStep.value / totalSteps.value) * 100)
const appUrl = computed(() => import.meta.env.VITE_APP_URL || window.location.origin)
const redirectUri = computed(() => `${appUrl.value}/callback`)

// Methods
const nextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++
    appStore.setCurrentStep(currentStep.value)
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    appStore.setCurrentStep(currentStep.value)
  }
}

const validateClientId = () => {
  clientIdError.value = ''
  
  if (!clientId.value) {
    isClientIdValid.value = false
    return
  }

  // Basic validation for Spotify Client ID format
  if (clientId.value.length < 20) {
    clientIdError.value = 'Client ID ist zu kurz'
    isClientIdValid.value = false
    return
  }

  if (!/^[a-zA-Z0-9]+$/.test(clientId.value)) {
    clientIdError.value = 'Client ID enthält ungültige Zeichen'
    isClientIdValid.value = false
    return
  }

  isClientIdValid.value = true
  
  // Store client ID for later use
  localStorage.setItem('spotify_client_id', clientId.value)
}

const copyRedirectUri = async () => {
  try {
    await navigator.clipboard.writeText(redirectUri.value)
    appStore.showSuccess('Kopiert!', 'Redirect URI wurde in die Zwischenablage kopiert.')
  } catch (error) {
    appStore.showError('Fehler', 'Redirect URI konnte nicht kopiert werden.')
  }
}

onMounted(() => {
  appStore.setCurrentStep(1)
  appStore.setTotalSteps(3)
  
  // Load saved client ID if exists
  const savedClientId = localStorage.getItem('spotify_client_id')
  if (savedClientId) {
    clientId.value = savedClientId
    validateClientId()
  }
})
</script>

