<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="section-padding bg-gradient-to-br from-background via-surface to-background">
      <div class="container-custom">
        <div class="text-center max-w-4xl mx-auto">
          <div class="animate-fade-in">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6">
              Sichere deine
              <span class="text-gradient">Spotify-Daten</span>
              in 3 einfachen Schritten
            </h1>
            
            <p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              100% kostenlos • Keine Datenspeicherung • Einfache Bedienung • 
              Alle Playlists & Favoriten • Mobile-optimiert
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <router-link to="/setup" class="btn-primary text-lg px-8 py-4 text-shadow-lg glow-primary">
                🚀 Jetzt starten
              </router-link>
              <router-link to="/guide" class="btn-secondary text-lg px-8 py-4">
                📖 Anleitung ansehen
              </router-link>
            </div>
          </div>

          <!-- Features Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div class="card animate-slide-up" style="animation-delay: 0.1s">
              <div class="text-3xl mb-4">✨</div>
              <h3 class="card-title">100% kostenlos</h3>
              <p class="card-description">
                Keine versteckten Kosten, keine Abonnements. 
                Für immer kostenlos nutzbar.
              </p>
            </div>

            <div class="card animate-slide-up" style="animation-delay: 0.2s">
              <div class="text-3xl mb-4">🛡️</div>
              <h3 class="card-title">Keine Datenspeicherung</h3>
              <p class="card-description">
                Deine Daten bleiben bei dir. Keine Server-Speicherung, 
                lokale Verarbeitung.
              </p>
            </div>

            <div class="card animate-slide-up" style="animation-delay: 0.3s">
              <div class="text-3xl mb-4">📱</div>
              <h3 class="card-title">Mobile-optimiert</h3>
              <p class="card-description">
                Funktioniert perfekt auf allen Geräten. 
                Touch-optimiert und responsive.
              </p>
            </div>

            <div class="card animate-slide-up" style="animation-delay: 0.4s">
              <div class="text-3xl mb-4">🎵</div>
              <h3 class="card-title">Alle Playlists & Favoriten</h3>
              <p class="card-description">
                Exportiere alle deine Playlists und gespeicherten Tracks 
                in einem Backup.
              </p>
            </div>

            <div class="card animate-slide-up" style="animation-delay: 0.5s">
              <div class="text-3xl mb-4">🔒</div>
              <h3 class="card-title">Sichere Authentifizierung</h3>
              <p class="card-description">
                PKCE OAuth Flow für maximale Sicherheit. 
                Direkte Spotify API Calls.
              </p>
            </div>

            <div class="card animate-slide-up" style="animation-delay: 0.6s">
              <div class="text-3xl mb-4">⚡</div>
              <h3 class="card-title">Schnell & Zuverlässig</h3>
              <p class="card-description">
                Moderne Web-Technologien für beste Performance 
                und Benutzererfahrung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works Section -->
    <section class="section-padding bg-surface">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-text mb-4">
            So einfach funktioniert's
          </h2>
          <p class="text-xl text-text-secondary max-w-2xl mx-auto">
            In nur 3 Schritten hast du dein Spotify-Backup erstellt
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 class="text-xl font-semibold text-text mb-4">
              Spotify App erstellen
            </h3>
            <p class="text-text-secondary">
              Erstelle eine kostenlose Spotify App im Developer Portal. 
              Wir führen dich Schritt für Schritt durch den Prozess.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 class="text-xl font-semibold text-text mb-4">
              Bei Spotify anmelden
            </h3>
            <p class="text-text-secondary">
              Melde dich sicher mit deinem Spotify-Account an. 
              Deine Anmeldedaten werden nie gespeichert.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 class="text-xl font-semibold text-text mb-4">
              Backup erstellen
            </h3>
            <p class="text-text-secondary">
              Lade alle deine Playlists und gespeicherten Tracks herunter. 
              Das Backup wird lokal auf deinem Gerät gespeichert.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy Section -->
    <section class="section-padding bg-background">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-text mb-8">
            🛡️ Deine Daten sind sicher
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="status-success">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="font-semibold">Keine Server-seitige Speicherung</span>
              </div>
              <p class="text-sm">Alle Daten werden nur in deinem Browser verarbeitet</p>
            </div>

            <div class="status-success">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="font-semibold">Keine Datenbank</span>
              </div>
              <p class="text-sm">Wir speichern keine deiner Daten auf unseren Servern</p>
            </div>

            <div class="status-success">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="font-semibold">Open Source Code</span>
              </div>
              <p class="text-sm">Der gesamte Quellcode ist öffentlich einsehbar</p>
            </div>

            <div class="status-success">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-success mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span class="font-semibold">PKCE OAuth Flow</span>
              </div>
              <p class="text-sm">Sichere Authentifizierung ohne Client Secret</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/setup" class="btn-primary text-lg px-8 py-4 text-shadow-lg glow-primary">
              🚀 Jetzt starten
            </router-link>
            <a 
              href="https://github.com/MaximilianRTS/SpotMyBackup2" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn-secondary text-lg px-8 py-4"
            >
              📖 Quellcode ansehen
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

onMounted(() => {
  appStore.setCurrentStep(1)
  appStore.setTotalSteps(3)
})
</script>

