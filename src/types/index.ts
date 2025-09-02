// Spotify API Types
export interface SpotifyUser {
  id: string
  display_name: string
  email: string
  country: string
  followers: {
    total: number
  }
  images: SpotifyImage[]
}

export interface SpotifyImage {
  url: string
  height: number
  width: number
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  public: boolean
  collaborative: boolean
  owner: {
    id: string
    display_name: string
  }
  tracks: {
    total: number
  }
  images: SpotifyImage[]
  external_urls: {
    spotify: string
  }
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  duration_ms: number
  explicit: boolean
  external_urls: {
    spotify: string
  }
  preview_url: string | null
}

export interface SpotifyArtist {
  id: string
  name: string
  external_urls: {
    spotify: string
  }
}

export interface SpotifyAlbum {
  id: string
  name: string
  artists: SpotifyArtist[]
  images: SpotifyImage[]
  release_date: string
  external_urls: {
    spotify: string
  }
}

export interface SpotifySavedTrack {
  added_at: string
  track: SpotifyTrack
}

// Backup Data Types
export interface BackupData {
  version: string
  exportDate: string
  user: SpotifyUser
  playlists: SpotifyPlaylist[]
  savedTracks: SpotifySavedTrack[]
  metadata: {
    totalPlaylists: number
    totalTracks: number
    totalSavedTracks: number
  }
}

// App State Types
export interface AppState {
  isLoading: boolean
  error: string | null
  currentStep: number
  totalSteps: number
}

export interface AuthState {
  isAuthenticated: boolean
  user: SpotifyUser | null
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null
}

export interface BackupState {
  isBackingUp: boolean
  backupProgress: number
  currentOperation: string
  backupData: BackupData | null
  lastBackupDate: string | null
}

export interface ImportState {
  isImporting: boolean
  importProgress: number
  currentOperation: string
  importData: BackupData | null
  conflicts: ImportConflict[]
}

export interface ImportConflict {
  type: 'playlist' | 'track'
  name: string
  existingId: string
  newId: string
  action: 'skip' | 'replace' | 'rename'
}

// Setup Types
export interface SetupState {
  clientId: string
  isClientIdValid: boolean
  setupComplete: boolean
  currentStep: SetupStep
}

export type SetupStep = 'client-id' | 'validation' | 'complete'

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

export interface SpotifyApiError {
  error: {
    status: number
    message: string
  }
}

// UI Types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

export interface Modal {
  id: string
  component: string
  props?: Record<string, any>
  closable?: boolean
}

// Configuration Types
export interface AppConfig {
  spotify: {
    clientId: string
    redirectUri: string
    scopes: string[]
  }
  app: {
    name: string
    version: string
    url: string
  }
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface ProgressInfo {
  current: number
  total: number
  percentage: number
  message: string
}

// Event Types
export interface BackupEvent {
  type: 'start' | 'progress' | 'complete' | 'error'
  data?: any
}

export interface ImportEvent {
  type: 'start' | 'progress' | 'complete' | 'error'
  data?: any
}

