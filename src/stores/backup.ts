import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BackupState, BackupData, SpotifyPlaylist, SpotifySavedTrack, SpotifyUser, SpotifyTrack } from '@/types'
import { useAuthStore } from './auth'
import { useAppStore } from './app'

export const useBackupStore = defineStore('backup', () => {
  // State
  const state = ref<BackupState>({
    isBackingUp: false,
    backupProgress: 0,
    currentOperation: '',
    backupData: null,
    lastBackupDate: null
  })

  // Backup options for preview
  const backupOptions = ref({
    selectedPlaylists: [] as string[],
    filters: {
      onlyOwnPlaylists: true,
      includePublicPlaylists: true,
      includePrivatePlaylists: true,
      includeCollaborativePlaylists: true,
      includeSavedTracks: true,
      includeMetadata: true
    },
    exportFormat: 'json' as 'json' | 'csv' | 'm3u'
  })

  const authStore = useAuthStore()
  const appStore = useAppStore()

  // Getters
  const isBackingUp = computed(() => state.value.isBackingUp)
  const backupProgress = computed(() => state.value.backupProgress)
  const currentOperation = computed(() => state.value.currentOperation)
  const backupData = computed(() => state.value.backupData)
  const lastBackupDate = computed(() => state.value.lastBackupDate)

  // Actions
  const setBackingUp = (backingUp: boolean) => {
    state.value.isBackingUp = backingUp
  }

  const setBackupProgress = (progress: number) => {
    state.value.backupProgress = progress
  }

  const setCurrentOperation = (operation: string) => {
    state.value.currentOperation = operation
  }

  const setBackupData = (data: BackupData | null) => {
    state.value.backupData = data
  }

  const setLastBackupDate = (date: string | null) => {
    state.value.lastBackupDate = date
  }

  // Spotify API calls
  const fetchUserProfile = async (accessToken: string): Promise<SpotifyUser> => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user profile')
    }

    return response.json()
  }

  const fetchUserPlaylists = async (accessToken: string, userId: string): Promise<SpotifyPlaylist[]> => {
    const playlists: SpotifyPlaylist[] = []
    let url = `https://api.spotify.com/v1/users/${userId}/playlists?limit=50`

    while (url) {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch playlists')
      }

      const data = await response.json()
      playlists.push(...data.items)
      url = data.next
    }

    return playlists
  }

  const fetchPlaylistTracks = async (accessToken: string, playlistId: string): Promise<SpotifyTrack[]> => {
    const tracks: SpotifyTrack[] = []
    let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`

    while (url) {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch tracks for playlist ${playlistId}`)
      }

      const data = await response.json()
      const validTracks = data.items
        .filter((item: any) => item.track && item.track.id)
        .map((item: any) => item.track)
      
      tracks.push(...validTracks)
      url = data.next
    }

    return tracks
  }

  const fetchSavedTracks = async (accessToken: string): Promise<SpotifySavedTrack[]> => {
    const savedTracks: SpotifySavedTrack[] = []
    let url = 'https://api.spotify.com/v1/me/tracks?limit=50'

    while (url) {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch saved tracks')
      }

      const data = await response.json()
      savedTracks.push(...data.items)
      url = data.next
    }

    return savedTracks
  }

  // Main backup function
  const createBackup = async (): Promise<BackupData> => {
    if (!authStore.isAuthenticated) {
      throw new Error('User not authenticated')
    }

    const accessToken = await authStore.getValidAccessToken()
    if (!accessToken) {
      throw new Error('No valid access token')
    }

    setBackingUp(true)
    setBackupProgress(0)
    setCurrentOperation('Lade Benutzerprofil...')

    try {
      // Fetch user profile
      const user = await fetchUserProfile(accessToken)
      setBackupProgress(10)
      setCurrentOperation('Lade Playlists...')

      // Fetch user playlists
      const playlists = await fetchUserPlaylists(accessToken, user.id)
      setBackupProgress(30)

      // Fetch tracks for each playlist
      const playlistsWithTracks = []
      const totalPlaylists = playlists.length

      for (let i = 0; i < playlists.length; i++) {
        const playlist = playlists[i]
        setCurrentOperation(`Lade Tracks für "${playlist.name}"...`)
        
        try {
          const tracks = await fetchPlaylistTracks(accessToken, playlist.id)
          playlistsWithTracks.push({
            ...playlist,
            tracks: { items: tracks, total: tracks.length }
          })
        } catch (error) {
          console.warn(`Failed to fetch tracks for playlist ${playlist.name}:`, error)
          // Continue with other playlists
          playlistsWithTracks.push(playlist)
        }

        const progress = 30 + (i / totalPlaylists) * 50
        setBackupProgress(progress)
      }

      setBackupProgress(80)
      setCurrentOperation('Lade gespeicherte Tracks...')

      // Fetch saved tracks
      const savedTracks = await fetchSavedTracks(accessToken)
      setBackupProgress(90)

      // Create backup data
      const backupData: BackupData = {
        version: '2.0.0',
        exportDate: new Date().toISOString(),
        user,
        playlists: playlistsWithTracks,
        savedTracks,
        metadata: {
          totalPlaylists: playlistsWithTracks.length,
          totalTracks: playlistsWithTracks.reduce((sum, p) => sum + (p.tracks?.total || 0), 0),
          totalSavedTracks: savedTracks.length
        }
      }

      setBackupData(backupData)
      setLastBackupDate(new Date().toISOString())
      setBackupProgress(100)
      setCurrentOperation('Backup abgeschlossen!')

      appStore.showSuccess('Backup erfolgreich', `Dein Backup wurde erfolgreich erstellt. ${backupData.metadata.totalPlaylists} Playlists und ${backupData.metadata.totalSavedTracks} gespeicherte Tracks wurden exportiert.`)

      return backupData
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler'
      appStore.showError('Backup fehlgeschlagen', errorMessage)
      throw error
    } finally {
      setBackingUp(false)
    }
  }

  const downloadBackup = (backupData: BackupData) => {
    try {
      const dataStr = JSON.stringify(backupData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `spotify-backup-${new Date().toISOString().split('T')[0]}.json`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
      
      appStore.showSuccess('Download gestartet', 'Dein Backup wird heruntergeladen.')
    } catch (error) {
      appStore.showError('Download fehlgeschlagen', 'Der Download konnte nicht gestartet werden.')
    }
  }

  const reset = () => {
    state.value = {
      isBackingUp: false,
      backupProgress: 0,
      currentOperation: '',
      backupData: null,
      lastBackupDate: null
    }
  }

  // New methods for backup options
  const setBackupOptions = (options: typeof backupOptions.value) => {
    backupOptions.value = options
  }

  const getBackupOptions = () => backupOptions.value

  // Export in different formats
  const downloadBackupAsCSV = (backupData: BackupData) => {
    try {
      let csvContent = 'Playlist Name,Track Name,Artist,Album,Duration,Added Date\n'
      
      backupData.playlists.forEach(playlist => {
        if (playlist.tracks?.items) {
          playlist.tracks.items.forEach(track => {
            csvContent += `"${playlist.name}","${track.name}","${track.artists.map(a => a.name).join(', ')}","${track.album.name}","${Math.floor(track.duration_ms / 1000)}s","${new Date(track.added_at || '').toLocaleDateString()}"\n`
          })
        }
      })
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `spotify-backup-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
      
      appStore.showSuccess('Download gestartet', 'CSV-Backup wird heruntergeladen.')
    } catch (error) {
      appStore.showError('Download fehlgeschlagen', 'CSV-Export konnte nicht erstellt werden.')
    }
  }

  const downloadBackupAsM3U = (backupData: BackupData) => {
    try {
      backupData.playlists.forEach(playlist => {
        if (playlist.tracks?.items && playlist.tracks.items.length > 0) {
          let m3uContent = '#EXTM3U\n'
          m3uContent += `#EXTINF:-1,${playlist.name}\n`
          
          playlist.tracks.items.forEach(track => {
            m3uContent += `#EXTINF:${Math.floor(track.duration_ms / 1000)},${track.artists.map(a => a.name).join(', ')} - ${track.name}\n`
            m3uContent += `${track.external_urls.spotify}\n`
          })
          
          const blob = new Blob([m3uContent], { type: 'audio/mpegurl' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `${playlist.name.replace(/[^a-z0-9]/gi, '_')}.m3u`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(link.href)
        }
      })
      
      appStore.showSuccess('Download gestartet', 'M3U-Playlists werden heruntergeladen.')
    } catch (error) {
      appStore.showError('Download fehlgeschlagen', 'M3U-Export konnte nicht erstellt werden.')
    }
  }

  return {
    // State
    state,
    backupOptions,
    
    // Getters
    isBackingUp,
    backupProgress,
    currentOperation,
    backupData,
    lastBackupDate,
    
    // Actions
    setBackingUp,
    setBackupProgress,
    setCurrentOperation,
    setBackupData,
    setLastBackupDate,
    createBackup,
    downloadBackup,
    reset,
    
    // New methods
    setBackupOptions,
    getBackupOptions,
    downloadBackupAsCSV,
    downloadBackupAsM3U
  }
})
