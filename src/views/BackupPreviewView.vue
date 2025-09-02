<template>
  <div class="min-h-screen bg-background">
    <div class="container-custom section-padding">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-text mb-4">
            📊 Backup-Vorschau
          </h1>
          <p class="text-xl text-text-secondary">
            Wähle aus, was du exportieren möchtest
          </p>
        </div>

        <!-- User Info -->
        <div class="card mb-8 animate-fade-in">
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
              <h2 class="text-xl font-semibold text-text">{{ user?.display_name }}</h2>
              <p class="text-text-secondary">{{ user?.email }}</p>
            </div>
          </div>
        </div>



        <!-- Playlist Selection -->
        <div class="card mb-8">
          <div class="card-header">
            <h2 class="card-title">Playlist-Auswahl</h2>
            <p class="card-description">
              {{ allPlaylists.length }} Playlists gefunden • {{ ownPlaylistsCount }} eigene Playlists verfügbar für Export
            </p>
          </div>

          <!-- Search -->
          <div class="mb-6">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Playlists durchsuchen..."
              class="form-input w-full"
            />
          </div>

          <!-- Select All/None -->
          <div class="flex gap-4 mb-6">
            <button @click="selectAllPlaylists" class="btn-secondary text-sm">
              Alle auswählen
            </button>
            <button @click="deselectAllPlaylists" class="btn-secondary text-sm">
              Alle abwählen
            </button>
          </div>



          <!-- Playlist List -->
          <div class="space-y-3 max-h-96 overflow-y-auto">
            <div 
              v-for="playlist in filteredPlaylists" 
              :key="playlist.id"
              @click="togglePlaylistSelection(playlist.id)"
              class="flex items-center justify-between p-4 border rounded-lg transition-all duration-200 cursor-pointer group"
              :class="{
                'border-primary-500 bg-primary-500/10 hover:bg-primary-500/20 shadow-md': selectedPlaylists.includes(playlist.id),
                'border-accent-600 hover:border-primary-500 hover:bg-accent-800/10 hover:shadow-sm': !selectedPlaylists.includes(playlist.id)
              }"
            >
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <input
                    v-model="selectedPlaylists"
                    :value="playlist.id"
                    type="checkbox"
                    class="form-checkbox pointer-events-none"
                    @click.stop
                  />
                  <!-- Custom checkbox indicator -->
                  <div v-if="selectedPlaylists.includes(playlist.id)" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="font-medium text-text">{{ playlist.name }}</h3>
                  <p class="text-sm text-text-secondary">
                    {{ playlist.tracks?.total || 0 }} Tracks • 
                    {{ playlist.public ? 'Öffentlich' : 'Privat' }}
                    {{ playlist.collaborative ? ' • Kollaborativ' : '' }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm text-text-secondary">
                  {{ formatDuration(playlist.tracks?.total || 0) }}
                </p>
                <!-- Selection indicator -->
                <div v-if="selectedPlaylists.includes(playlist.id)" class="mt-1">
                  <svg class="w-4 h-4 text-primary-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Export Options -->
        <div class="card mb-8">
          <div class="card-header">
            <h2 class="card-title">Export-Format</h2>
            <p class="card-description">
              Wähle das Format für dein Backup
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label class="flex items-center p-4 border border-accent-600 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
              <input 
                v-model="exportFormat" 
                value="json" 
                type="radio" 
                class="form-radio"
              />
              <div class="ml-3">
                <h3 class="font-medium text-text">JSON</h3>
                <p class="text-sm text-text-secondary">Vollständige Daten</p>
              </div>
            </label>

            <label class="flex items-center p-4 border border-accent-600 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
              <input 
                v-model="exportFormat" 
                value="csv" 
                type="radio" 
                class="form-radio"
              />
              <div class="ml-3">
                <h3 class="font-medium text-text">CSV</h3>
                <p class="text-sm text-text-secondary">Excel-kompatibel</p>
              </div>
            </label>

            <label class="flex items-center p-4 border border-accent-600 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
              <input 
                v-model="exportFormat" 
                value="m3u" 
                type="radio" 
                class="form-radio"
              />
              <div class="ml-3">
                <h3 class="font-medium text-text">M3U</h3>
                <p class="text-sm text-text-secondary">Playlist-Dateien</p>
              </div>
            </label>
          </div>
        </div>



        <!-- Actions -->
        <div class="flex justify-between">
          <router-link to="/backup" class="btn-ghost">
            ← Zurück
          </router-link>
          <button 
            @click="startBackup"
            :disabled="selectedPlaylists.length === 0"
            class="btn-primary"
          >
            Backup erstellen ({{ selectedPlaylists.length }} Playlists)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSpotifyAuth } from '@/composables/useSpotifyAuth'
import { useBackupStore } from '@/stores/backup'
import { useAppStore } from '@/stores/app'
import type { SpotifyPlaylist } from '@/types'

const { user } = useSpotifyAuth()
const backupStore = useBackupStore()
const appStore = useAppStore()

// State
const allPlaylists = ref<SpotifyPlaylist[]>([])
const selectedPlaylists = ref<string[]>([])
const searchQuery = ref('')
const exportFormat = ref('json')

const filters = ref({
  includeSavedTracks: true,
  includeMetadata: true
})

// Computed
const filteredPlaylists = computed(() => {
  let playlists = allPlaylists.value

  // Always filter to only own playlists
  playlists = playlists.filter(playlist => playlist.owner.id === user.value?.id)

  // Apply search
  if (searchQuery.value) {
    playlists = playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return playlists
})

const ownPlaylistsCount = computed(() => {
  return allPlaylists.value.filter(playlist => playlist.owner.id === user.value?.id).length
})

const estimatedTracks = computed(() => {
  // Get unique tracks from selected playlists to avoid duplicates
  const uniqueTracks = new Set<string>()
  
  selectedPlaylists.value.forEach(playlistId => {
    const playlist = allPlaylists.value.find(p => p.id === playlistId)
    if (playlist?.tracks?.items) {
      playlist.tracks.items.forEach(track => {
        if (track.id) {
          uniqueTracks.add(track.id)
        }
      })
    }
  })
  
  // Add saved tracks if included
  if (filters.value.includeSavedTracks && backupStore.backupData?.savedTracks) {
    backupStore.backupData.savedTracks.forEach(savedTrack => {
      if (savedTrack.track?.id) {
        uniqueTracks.add(savedTrack.track.id)
      }
    })
  }
  
  return uniqueTracks.size
})

const estimatedSize = computed(() => {
  const tracks = estimatedTracks.value
  const sizeInMB = (tracks * 0.5) // Rough estimate: 0.5KB per track
  if (sizeInMB < 1) return `${Math.round(sizeInMB * 1024)} KB`
  return `${Math.round(sizeInMB)} MB`
})

// Methods
const formatDuration = (trackCount: number) => {
  const estimatedMinutes = trackCount * 3.5 // Average 3.5 minutes per track
  if (estimatedMinutes < 60) return `${Math.round(estimatedMinutes)}min`
  const hours = Math.floor(estimatedMinutes / 60)
  const minutes = Math.round(estimatedMinutes % 60)
  return `${hours}h ${minutes}min`
}

const selectAllPlaylists = () => {
  selectedPlaylists.value = filteredPlaylists.value.map(p => p.id)
}

const deselectAllPlaylists = () => {
  selectedPlaylists.value = []
}

const togglePlaylistSelection = (playlistId: string) => {
  const index = selectedPlaylists.value.indexOf(playlistId)
  if (index > -1) {
    selectedPlaylists.value.splice(index, 1)
  } else {
    selectedPlaylists.value.push(playlistId)
  }
}

const startBackup = async () => {
  try {
    // Store selected playlists and filters
    backupStore.setBackupOptions({
      selectedPlaylists: selectedPlaylists.value,
      filters: filters.value,
      exportFormat: exportFormat.value
    })
    
    // Export in selected format
    if (backupStore.backupData) {
      switch (exportFormat.value) {
        case 'json':
          backupStore.downloadBackup(backupStore.backupData)
          break
        case 'csv':
          backupStore.downloadBackupAsCSV(backupStore.backupData)
          break
        case 'm3u':
          backupStore.downloadBackupAsM3U(backupStore.backupData)
          break
      }
      appStore.showSuccess('Export erfolgreich', `Dein Backup wurde als ${exportFormat.value.toUpperCase()} exportiert!`)
    } else {
      appStore.showError('Fehler', 'Keine Backup-Daten verfügbar. Bitte erstelle zuerst ein vollständiges Backup.')
    }
  } catch (error) {
    console.error('Export failed:', error)
    appStore.showError('Export fehlgeschlagen', 'Der Export konnte nicht abgeschlossen werden.')
  }
}

onMounted(async () => {
  try {
    // Load playlists for preview
    if (backupStore.backupData?.playlists) {
      allPlaylists.value = backupStore.backupData.playlists
      // Select all by default
      selectedPlaylists.value = allPlaylists.value.map(p => p.id)
    } else {
      // If no backup data, we need to fetch playlists
      // This would require extending the backup store
      appStore.showError('Fehler', 'Keine Playlist-Daten verfügbar. Bitte erstelle zuerst ein vollständiges Backup.')
    }
  } catch (error) {
    console.error('Failed to load playlists:', error)
  }
})
</script>
