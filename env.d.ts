/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Optional: override the app URL used for the Spotify redirect URI
  readonly VITE_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

