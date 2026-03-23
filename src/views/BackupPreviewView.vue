<template>
  <div class="min-h-screen bg-background">
    <div class="container-custom section-padding">
      <div class="max-w-6xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-8 animate-fade-in">
          <h1 class="text-3xl sm:text-4xl font-bold text-text mb-3">
            📊 Backup-Vorschau
          </h1>
          <p class="text-lg text-text-secondary">
            Wähle aus, was du exportieren möchtest
          </p>
        </div>

        <!-- User Info -->
        <div class="card mb-6 animate-fade-in">
          <div class="flex items-center space-x-4">
            <img
              v-if="user?.images && user.images.length > 0"
              :src="user.images[0].url"
              :alt="user.display_name"
              class="w-14 h-14 rounded-full ring-2 ring-primary-500/30"
            />
            <div v-else class="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center ring-2 ring-primary-500/30">
              <span class="text-xl text-white font-bold">{{ user?.display_name?.charAt(0).toUpperCase() }}</span>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-text">{{ user?.display_name }}</h2>
              <p class="text-sm text-text-secondary">{{ user?.email }}</p>
            </div>
          </div>
        </div>

        <!-- Stats Bar -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="card text-center py-4">
            <p class="text-2xl font-bold text-primary-500">{{ allPlaylists.length }}</p>
            <p class="text-xs text-text-secondary mt-1">Playlists gesamt</p>
          </div>
          <div class="card text-center py-4">
            <p class="text-2xl font-bold text-primary-500">{{ selectedPlaylists.length }}</p>
            <p class="text-xs text-text-secondary mt-1">Ausgewählt</p>
          </div>
          <div class="card text-center py-4">
            <p class="text-2xl font-bold text-primary-500">{{ selectedTracksCount }}</p>
            <p class="text-xs text-text-secondary mt-1">Tracks</p>
          </div>
        </div>

        <!-- Playlist Selection -->
        <div class="card mb-6">
          <div class="card-header">
            <h2 class="card-title">Playlist-Auswahl</h2>
            <p class="card-description">
              {{ ownPlaylistsCount }} eigene Playlists verfügbar für Export
            </p>
          </div>

          <!-- Search -->
          <div class="relative mb-4">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Playlists durchsuchen..."
              class="form-input pl-10 pr-10"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Select All/None -->
          <div class="flex gap-3 mb-4">
            <button @click="selectAllPlaylists" class="btn-secondary text-sm">
              Alle auswählen
            </button>
            <button @click="deselectAllPlaylists" class="btn-secondary text-sm">
              Alle abwählen
            </button>
          </div>

          <!-- Playlist List -->
          <div class="relative">
            <div class="space-y-2 max-h-[28rem] overflow-y-auto pr-1">

              <!-- Empty state -->
              <div v-if="filteredPlaylists.length === 0" class="text-center py-12 text-text-secondary">
                <svg class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p class="font-medium">Keine Playlists gefunden</p>
                <p class="text-sm mt-1">Versuche einen anderen Suchbegriff</p>
              </div>

              <!-- Playlist Row -->
              <div
                v-for="playlist in filteredPlaylists"
                :key="playlist.id"
                class="rounded-xl border transition-all duration-200"
                :class="{
                  'border-primary-500 bg-primary-500/10': selectedPlaylists.includes(playlist.id),
                  'border-accent-700 hover:border-primary-500/50 hover:bg-accent-800/30': !selectedPlaylists.includes(playlist.id)
                }"
              >
                <!-- Main Row -->
                <div
                  @click="togglePlaylistSelection(playlist.id)"
                  class="flex items-center gap-3 p-3 cursor-pointer"
                >
                  <!-- Playlist Cover -->
                  <div class="relative flex-shrink-0">
                    <img
                      v-if="playlist.images && playlist.images.length > 0"
                      :src="playlist.images[0].url"
                      :alt="playlist.name"
                      class="w-14 h-14 rounded-lg object-cover shadow-md"
                    />
                    <div v-else class="w-14 h-14 rounded-lg bg-accent-700 flex items-center justify-center shadow-md">
                      <svg class="w-6 h-6 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                      </svg>
                    </div>
                    <!-- Selected Checkmark Overlay -->
                    <div
                      v-if="selectedPlaylists.includes(playlist.id)"
                      class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow"
                    >
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <!-- Playlist Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-text truncate">{{ playlist.name }}</h3>
                    <p class="text-sm text-text-secondary">
                      {{ playlist.tracks?.total || 0 }} Tracks ·
                      <span>{{ playlist.public ? 'Öffentlich' : 'Privat' }}</span>
                      <span v-if="playlist.collaborative"> · Kollaborativ</span>
                    </p>
                    <p v-if="playlist.description" class="text-xs text-text-secondary truncate mt-0.5 opacity-70">
                      {{ playlist.description }}
                    </p>
                  </div>

                  <!-- Duration & Expand -->
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <span class="text-xs text-text-secondary">{{ formatDuration(playlist.tracks?.total || 0) }}</span>
                    <button
                      v-if="playlist.tracks?.items && playlist.tracks.items.length > 0"
                      @click.stop="toggleExpanded(playlist.id)"
                      class="p-1 rounded-md text-text-secondary hover:text-text hover:bg-accent-700/50 transition-all"
                      :title="expandedPlaylists.includes(playlist.id) ? 'Tracks ausblenden' : 'Tracks anzeigen'"
                    >
                      <svg
                        class="w-4 h-4 transition-transform duration-200"
                        :class="{ 'rotate-180': expandedPlaylists.includes(playlist.id) }"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Track Preview Panel -->
                <div
                  v-if="expandedPlaylists.includes(playlist.id) && playlist.tracks?.items"
                  class="border-t border-accent-700 px-3 pb-3 animate-slide-up"
                >
                  <div class="space-y-1 mt-2">
                    <div
                      v-for="(track, index) in playlist.tracks.items.slice(0, 5)"
                      :key="track.id"
                      class="flex items-center gap-3 rounded-lg p-2 hover:bg-accent-700/30 transition-colors"
                    >
                      <!-- Track Number -->
                      <span class="text-xs text-text-secondary w-4 text-center flex-shrink-0">{{ index + 1 }}</span>

                      <!-- Album Cover -->
                      <img
                        v-if="track.album?.images && track.album.images.length > 0"
                        :src="track.album.images[track.album.images.length - 1].url"
                        :alt="track.album.name"
                        class="w-9 h-9 rounded-md object-cover flex-shrink-0 shadow-sm"
                      />
                      <div v-else class="w-9 h-9 rounded-md bg-accent-700 flex items-center justify-center flex-shrink-0">
                        <svg class="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                        </svg>
                      </div>

                      <!-- Track Info -->
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-text truncate">{{ track.name }}</p>
                        <p class="text-xs text-text-secondary truncate">{{ track.artists.map(a => a.name).join(', ') }}</p>
                      </div>

                      <!-- Duration -->
                      <span class="text-xs text-text-secondary flex-shrink-0">{{ formatMs(track.duration_ms) }}</span>
                    </div>

                    <!-- More tracks indicator -->
                    <div v-if="(playlist.tracks?.total || 0) > 5" class="text-center pt-1">
                      <p class="text-xs text-text-secondary opacity-60">
                        + {{ (playlist.tracks.total) - 5 }} weitere Tracks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Bottom gradient fade -->
            <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface/80 to-transparent rounded-b-xl"></div>
          </div>
        </div>

        <!-- Export Format -->
        <div class="card mb-6">
          <div class="card-header">
            <h2 class="card-title">Export-Format</h2>
            <p class="card-description">Wähle das Format für dein Backup</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <!-- JSON -->
            <label
              class="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200"
              :class="exportFormat === 'json'
                ? 'border-primary-500 bg-primary-500/10 shadow-md'
                : 'border-accent-700 hover:border-primary-500/50 hover:bg-accent-800/20'"
            >
              <input v-model="exportFormat" value="json" type="radio" class="form-radio mt-0.5" />
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-lg">📄</span>
                  <h3 class="font-semibold text-text">JSON</h3>
                  <span v-if="exportFormat === 'json'" class="text-xs bg-primary-500 text-white px-1.5 py-0.5 rounded-full">Aktiv</span>
                </div>
                <p class="text-sm text-text-secondary mt-1">Vollständige Daten, maschinenlesbar</p>
              </div>
            </label>

            <!-- CSV -->
            <label
              class="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200"
              :class="exportFormat === 'csv'
                ? 'border-primary-500 bg-primary-500/10 shadow-md'
                : 'border-accent-700 hover:border-primary-500/50 hover:bg-accent-800/20'"
            >
              <input v-model="exportFormat" value="csv" type="radio" class="form-radio mt-0.5" />
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-lg">📊</span>
                  <h3 class="font-semibold text-text">CSV</h3>
                  <span v-if="exportFormat === 'csv'" class="text-xs bg-primary-500 text-white px-1.5 py-0.5 rounded-full">Aktiv</span>
                </div>
                <p class="text-sm text-text-secondary mt-1">Für Excel & Tabellen</p>
              </div>
            </label>

            <!-- M3U -->
            <label
              class="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200"
              :class="exportFormat === 'm3u'
                ? 'border-primary-500 bg-primary-500/10 shadow-md'
                : 'border-accent-700 hover:border-primary-500/50 hover:bg-accent-800/20'"
            >
              <input v-model="exportFormat" value="m3u" type="radio" class="form-radio mt-0.5" />
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-lg">🎵</span>
                  <h3 class="font-semibold text-text">M3U</h3>
                  <span v-if="exportFormat === 'm3u'" class="text-xs bg-primary-500 text-white px-1.5 py-0.5 rounded-full">Aktiv</span>
                </div>
                <p class="text-sm text-text-secondary mt-1">Playlist-Dateien für Player</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-between items-center">
          <router-link to="/backup" class="btn-ghost">
            ← Zurück
          </router-link>
          <button
            @click="startBackup"
            :disabled="selectedPlaylists.length === 0"
            class="btn-primary px-6"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportieren ({{ selectedPlaylists.length }} Playlists)
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
const expandedPlaylists = ref<string[]>([])
const searchQuery = ref('')
const exportFormat = ref<'json' | 'csv' | 'm3u'>('json')

const filters = ref({
  onlyOwnPlaylists: true,
  includePublicPlaylists: true,
  includePrivatePlaylists: true,
  includeCollaborativePlaylists: true,
  includeSavedTracks: true,
  includeMetadata: true
})

// Computed
const filteredPlaylists = computed(() => {
  let playlists = allPlaylists.value.filter(
    playlist => playlist.owner.id === user.value?.id
  )

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    playlists = playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(q)
    )
  }

  return playlists
})

const ownPlaylistsCount = computed(() =>
  allPlaylists.value.filter(p => p.owner.id === user.value?.id).length
)

const selectedTracksCount = computed(() => {
  return selectedPlaylists.value.reduce((sum, id) => {
    const playlist = allPlaylists.value.find(p => p.id === id)
    return sum + (playlist?.tracks?.total || 0)
  }, 0)
})

// Methods
const formatDuration = (trackCount: number) => {
  const estimatedMinutes = trackCount * 3.5
  if (estimatedMinutes < 60) return `~${Math.round(estimatedMinutes)} min`
  const hours = Math.floor(estimatedMinutes / 60)
  const minutes = Math.round(estimatedMinutes % 60)
  return `~${hours}h ${minutes}min`
}

const formatMs = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
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

const toggleExpanded = (playlistId: string) => {
  const index = expandedPlaylists.value.indexOf(playlistId)
  if (index > -1) {
    expandedPlaylists.value.splice(index, 1)
  } else {
    expandedPlaylists.value.push(playlistId)
  }
}

const startBackup = async () => {
  try {
    backupStore.setBackupOptions({
      selectedPlaylists: selectedPlaylists.value,
      filters: filters.value,
      exportFormat: exportFormat.value as 'json' | 'csv' | 'm3u'
    })

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
      appStore.showSuccess(
        'Export erfolgreich',
        `Dein Backup wurde als ${exportFormat.value.toUpperCase()} exportiert!`
      )
    } else {
      appStore.showError(
        'Fehler',
        'Keine Backup-Daten verfügbar. Bitte erstelle zuerst ein vollständiges Backup.'
      )
    }
  } catch (error) {
    console.error('Export failed:', error)
    appStore.showError('Export fehlgeschlagen', 'Der Export konnte nicht abgeschlossen werden.')
  }
}

onMounted(async () => {
  try {
    if (backupStore.backupData?.playlists) {
      allPlaylists.value = backupStore.backupData.playlists
      // Select all own playlists by default
      selectedPlaylists.value = allPlaylists.value
        .filter(p => p.owner.id === user.value?.id)
        .map(p => p.id)
    } else {
      appStore.showError(
        'Fehler',
        'Keine Playlist-Daten verfügbar. Bitte erstelle zuerst ein vollständiges Backup.'
      )
    }
  } catch (error) {
    console.error('Failed to load playlists:', error)
  }
})
</script>
