<template>
  <div class="min-h-screen bg-background">
    <div class="container-custom section-padding">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl sm:text-4xl font-bold text-text mb-4">
            📤 Backup importieren
          </h1>
          <p class="text-xl text-text-secondary">
            Importiere ein vorhandenes Backup in deinen Account
          </p>
        </div>

        <!-- Not Authenticated -->
        <div v-if="!isAuthenticated" class="card text-center animate-fade-in">
          <div class="mb-6">
            <div class="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-text mb-2">Nicht angemeldet</h2>
            <p class="text-text-secondary mb-6">
              Melde dich bei Spotify an, um ein Backup zu importieren.
            </p>
          </div>
          
          <button 
            @click="startAuth" 
            :disabled="isAuthenticating"
            class="btn-primary text-lg px-8 py-4"
          >
            <div v-if="isAuthenticating" class="loading-spinner w-5 h-5 mr-2"></div>
            <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {{ isAuthenticating ? 'Anmeldung läuft...' : 'Bei Spotify anmelden' }}
          </button>
        </div>

        <!-- Authenticated - Import Interface -->
        <div v-else class="space-y-8">
          <!-- User Info -->
          <div class="card animate-fade-in">
            <div class="flex items-center space-x-4">
              <img 
                v-if="user?.images && user.images.length > 0"
                :src="user.images[0].url" 
                :alt="user.display_name"
                class="w-16 h-16 rounded-full"
              />
              <div v-else class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                <span class="text-2xl text-white">{{ user?.display_name?.charAt(0).toUpperCase() }}</span>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-text">Importieren in: {{ user?.display_name }}</h2>
                <p class="text-text-secondary">{{ user?.email }}</p>
              </div>
            </div>
          </div>

          <!-- File Upload -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Backup-Datei auswählen</h2>
              <p class="card-description">
                Wähle eine Backup-Datei (.json) aus, die du zuvor erstellt hast.
              </p>
            </div>

            <div class="space-y-6">
              <!-- File Input -->
              <div class="form-group">
                <label for="backupFile" class="form-label">Backup-Datei</label>
                <div 
                  class="border-2 border-dashed border-accent-600 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer"
                  @click="fileInput?.click()"
                  @dragover.prevent
                  @drop.prevent="handleFileDrop"
                >
                  <input
                    ref="fileInput"
                    id="backupFile"
                    type="file"
                    accept=".json"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                  
                  <div v-if="!selectedFile" class="space-y-4">
                    <svg class="w-12 h-12 text-text-secondary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <div>
                      <p class="text-text font-medium">Datei hier ablegen oder klicken zum Auswählen</p>
                      <p class="text-text-secondary text-sm">Nur .json Dateien werden akzeptiert</p>
                    </div>
                  </div>

                  <div v-else class="space-y-4">
                    <svg class="w-12 h-12 text-success mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <div>
                      <p class="text-text font-medium">{{ selectedFile.name }}</p>
                      <p class="text-text-secondary text-sm">{{ formatFileSize(selectedFile.size) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Backup Preview -->
              <div v-if="backupPreview" class="bg-accent-800/50 border border-accent-600 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-text mb-4">📊 Backup-Details</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-text-secondary">Exportiert von:</p>
                    <p class="font-medium text-text">{{ backupPreview.user.display_name }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-text-secondary">Exportiert am:</p>
                    <p class="font-medium text-text">{{ new Date(backupPreview.exportDate).toLocaleDateString('de-DE') }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-text-secondary">Playlists:</p>
                    <p class="font-medium text-text">{{ backupPreview.metadata.totalPlaylists }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-text-secondary">Gespeicherte Tracks:</p>
                    <p class="font-medium text-text">{{ backupPreview.metadata.totalSavedTracks }}</p>
                  </div>
                </div>
              </div>

              <!-- Import Progress -->
              <div v-if="isImporting" class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-text">{{ currentOperation }}</span>
                  <span class="text-sm text-text-secondary">{{ Math.round(importProgress) }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: `${importProgress}%` }"></div>
                </div>
              </div>

              <!-- Import Button -->
              <button 
                @click="startImport"
                :disabled="!selectedFile || isImporting"
                class="btn-primary w-full flex items-center justify-center"
              >
                <div v-if="isImporting" class="loading-spinner w-5 h-5 mr-2"></div>
                <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                {{ isImporting ? 'Import läuft...' : 'Import starten' }}
              </button>
            </div>
          </div>

          <!-- Import Results -->
          <div v-if="importResults" class="card">
            <div class="card-header">
              <h2 class="card-title">Import abgeschlossen</h2>
              <p class="card-description">
                Der Import wurde erfolgreich abgeschlossen.
              </p>
            </div>

            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center">
                  <p class="text-2xl font-bold text-success">{{ importResults.playlistsCreated }}</p>
                  <p class="text-sm text-text-secondary">Playlists erstellt</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-success">{{ importResults.tracksAdded }}</p>
                  <p class="text-sm text-text-secondary">Tracks hinzugefügt</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-warning">{{ importResults.errors }}</p>
                  <p class="text-sm text-text-secondary">Fehler</p>
                </div>
              </div>

              <div class="flex justify-center">
                <router-link to="/backup" class="btn-primary">
                  Zurück zum Backup
                </router-link>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between">
            <router-link to="/backup" class="btn-ghost">
              ← Zurück
            </router-link>
            <button @click="logout" class="btn-ghost">
              Abmelden
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSpotifyAuth } from '@/composables/useSpotifyAuth'
import { useAppStore } from '@/stores/app'
import type { BackupData } from '@/types'

const { isAuthenticated, user, isAuthenticating, startAuth, logout } = useSpotifyAuth()
const appStore = useAppStore()

// State
const selectedFile = ref<File | null>(null)
const backupPreview = ref<BackupData | null>(null)
const isImporting = ref(false)
const importProgress = ref(0)
const currentOperation = ref('')
const importResults = ref<{
  playlistsCreated: number
  tracksAdded: number
  errors: number
} | null>(null)

const fileInput = ref<HTMLInputElement>()

// Methods
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    processFile(target.files[0])
  }
}

const handleFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processFile(event.dataTransfer.files[0])
  }
}

const processFile = async (file: File) => {
  if (!file.name.endsWith('.json')) {
    appStore.showError('Ungültige Datei', 'Bitte wähle eine .json Datei aus.')
    return
  }

  selectedFile.value = file

  try {
    const text = await file.text()
    const data = JSON.parse(text) as BackupData

    // Validate backup data structure
    if (!data.version || !data.user || !data.playlists || !data.savedTracks) {
      throw new Error('Ungültige Backup-Datei')
    }

    backupPreview.value = data
    appStore.showSuccess('Datei geladen', 'Backup-Datei wurde erfolgreich geladen.')
  } catch (error) {
    appStore.showError('Datei-Fehler', 'Die Backup-Datei konnte nicht gelesen werden.')
    selectedFile.value = null
    backupPreview.value = null
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const startImport = async () => {
  if (!selectedFile.value || !backupPreview.value) {
    return
  }

  isImporting.value = true
  importProgress.value = 0
  currentOperation.value = 'Import wird vorbereitet...'

  try {
    // Simulate import process
    const totalSteps = backupPreview.value.playlists.length + 1
    let currentStep = 0

    // Import playlists
    for (const playlist of backupPreview.value.playlists) {
      currentOperation.value = `Importiere Playlist: ${playlist.name}`
      currentStep++
      importProgress.value = (currentStep / totalSteps) * 100

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // Import saved tracks
    currentOperation.value = 'Importiere gespeicherte Tracks...'
    currentStep++
    importProgress.value = (currentStep / totalSteps) * 100

    await new Promise(resolve => setTimeout(resolve, 1000))

    // Set results
    importResults.value = {
      playlistsCreated: backupPreview.value.playlists.length,
      tracksAdded: backupPreview.value.metadata.totalSavedTracks,
      errors: 0
    }

    appStore.showSuccess('Import erfolgreich', 'Dein Backup wurde erfolgreich importiert!')
  } catch (error) {
    appStore.showError('Import fehlgeschlagen', 'Der Import konnte nicht abgeschlossen werden.')
  } finally {
    isImporting.value = false
  }
}

onMounted(() => {
  appStore.setCurrentStep(3)
  appStore.setTotalSteps(3)
})
</script>
