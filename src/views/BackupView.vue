<template>
  <div class="min-h-screen bg-background">
    <div class="container-custom section-padding">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl sm:text-4xl font-bold text-text mb-4">
            🎵 Backup erstellen
          </h1>
          <p class="text-xl text-text-secondary">
            Sichere alle deine Spotify-Daten in einer Datei
          </p>
        </div>

        <!-- User Info -->
        <div v-if="isAuthenticated && user" class="card mb-8 animate-fade-in">
          <div class="flex items-center space-x-4">
            <img 
              v-if="user.images && user.images.length > 0"
              :src="user.images[0].url" 
              :alt="user.display_name"
              class="w-16 h-16 rounded-full"
            />
            <div v-else class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
              <span class="text-2xl text-white">{{ user.display_name.charAt(0).toUpperCase() }}</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-text">{{ user.display_name }}</h2>
              <p class="text-text-secondary">{{ user.email }}</p>
              <p class="text-sm text-text-secondary">{{ user.followers.total }} Follower</p>
            </div>
          </div>
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
              Melde dich bei Spotify an, um dein Backup zu erstellen.
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

        <!-- Authenticated - Backup Interface -->
        <div v-else class="space-y-8">
          <!-- Backup Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="card text-center">
              <div class="text-3xl mb-2">📊</div>
              <h3 class="text-lg font-semibold text-text mb-1">Eigene Playlists</h3>
              <p class="text-2xl font-bold text-primary-500">{{ ownPlaylistsCount }}</p>
              <p v-if="backupData" class="text-sm text-text-secondary">Exportierbar</p>
            </div>
            
            <div class="card text-center">
              <div class="text-3xl mb-2">🎵</div>
              <h3 class="text-lg font-semibold text-text mb-1">Exportierbare Tracks</h3>
              <p class="text-2xl font-bold text-primary-500">{{ totalExportableTracksCount }}</p>
              <div v-if="backupData" class="text-sm text-text-secondary">
                <p>{{ ownPlaylistTracksCount }} in eigenen Playlists</p>
                <p>+ {{ backupData?.metadata.totalSavedTracks || 0 }} <span class="text-red-500">❤️</span> Favoriten</p>
              </div>
            </div>
            
            <div class="card text-center">
              <div class="text-3xl mb-2">📅</div>
              <h3 class="text-lg font-semibold text-text mb-1">Letztes Backup</h3>
              <p class="text-sm text-text-secondary">
                {{ lastBackupDate ? new Date(lastBackupDate).toLocaleDateString('de-DE') : 'Nie' }}
              </p>
            </div>
          </div>

          <!-- Backup Actions -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Backup erstellen</h2>
              <p class="card-description">
                Erstelle ein vollständiges Backup aller deiner Spotify-Daten.
              </p>
            </div>

            <!-- Backup Progress -->
            <div v-if="isBackingUp" class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-text">{{ currentOperation }}</span>
                <span class="text-sm text-text-secondary">{{ Math.round(backupProgress) }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${backupProgress}%` }"></div>
              </div>
            </div>

            <!-- Backup Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                @click="createBackup"
                :disabled="isBackingUp"
                class="btn-primary flex-1 flex items-center justify-center"
              >
                <div v-if="isBackingUp" class="loading-spinner w-5 h-5 mr-2"></div>
                <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {{ isBackingUp ? 'Backup wird erstellt...' : 'Backup erstellen' }}
              </button>

              <button 
                v-if="backupData"
                @click="goToPreview"
                class="btn-secondary flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Vorschau & Export
              </button>

              <!-- Export Format Buttons -->
              <div v-if="backupData" class="flex flex-col sm:flex-row gap-2">
                <button 
                  @click="downloadBackup"
                  class="btn-secondary flex items-center justify-center text-sm"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  JSON
                </button>
                
                <button 
                  @click="downloadCSV"
                  class="btn-secondary flex items-center justify-center text-sm"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  CSV
                </button>
                
                <button 
                  @click="downloadM3U"
                  class="btn-secondary flex items-center justify-center text-sm"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  M3U
                </button>
              </div>
            </div>
          </div>

          <!-- Import Section -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Backup importieren</h2>
              <p class="card-description">
                Importiere ein vorhandenes Backup in einen anderen Account.
              </p>
            </div>

            <router-link to="/import" class="btn-secondary w-full flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Backup importieren
            </router-link>
          </div>

          <!-- Logout -->
          <div class="text-center">
            <button @click="logout" class="btn-ghost">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Abmelden
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSpotifyAuth } from '@/composables/useSpotifyAuth'
import { useBackupStore } from '@/stores/backup'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const { isAuthenticated, user, isAuthenticating, startAuth, logout } = useSpotifyAuth()
const backupStore = useBackupStore()
const appStore = useAppStore()

// Computed properties
const isBackingUp = computed(() => backupStore.isBackingUp)
const backupProgress = computed(() => backupStore.backupProgress)
const currentOperation = computed(() => backupStore.currentOperation)
const backupData = computed(() => backupStore.backupData)
const lastBackupDate = computed(() => backupStore.lastBackupDate)

// Calculate own playlists count
const ownPlaylistsCount = computed(() => {
  if (!backupData.value?.playlists) return 0
  return backupData.value.playlists.filter(playlist => 
    playlist.owner.id === backupData.value?.user?.id
  ).length
})

// Calculate tracks from own playlists only
const ownPlaylistTracksCount = computed(() => {
  if (!backupData.value?.playlists) return 0
  
  return backupData.value.playlists
    .filter(playlist => playlist.owner.id === backupData.value?.user?.id)
    .reduce((total, playlist) => total + (playlist.tracks?.total || 0), 0)
})

// Calculate total exportable tracks (own playlist tracks + saved tracks)
const totalExportableTracksCount = computed(() => {
  if (!backupData.value) return 0
  
  const ownPlaylistTracks = ownPlaylistTracksCount.value
  const savedTracks = backupData.value.metadata.totalSavedTracks || 0
  
  return ownPlaylistTracks + savedTracks
})

// Methods
const createBackup = async () => {
  try {
    await backupStore.createBackup()
    appStore.showSuccess('Backup erfolgreich', 'Dein Backup wurde erfolgreich erstellt!')
  } catch (error) {
    console.error('Backup failed:', error)
  }
}

const downloadBackup = () => {
  if (backupData.value) {
    backupStore.downloadBackup(backupData.value)
  }
}

const goToPreview = () => {
  router.push('/backup/preview')
}

const downloadCSV = () => {
  if (backupData.value) {
    backupStore.downloadBackupAsCSV(backupData.value)
  }
}

const downloadM3U = () => {
  if (backupData.value) {
    backupStore.downloadBackupAsM3U(backupData.value)
  }
}

onMounted(() => {
  appStore.setCurrentStep(3)
  appStore.setTotalSteps(3)
})
</script>
