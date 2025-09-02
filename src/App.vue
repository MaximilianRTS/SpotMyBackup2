<template>
  <div id="app" class="min-h-screen bg-background">
    <!-- Navigation -->
    <nav class="bg-surface/80 backdrop-blur-sm border-b border-accent-800 sticky top-0 z-50">
      <div class="container-custom">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-2 group">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span class="text-xl font-bold text-text">SpotMyBackup 2</span>
          </router-link>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link 
              to="/" 
              class="text-text-secondary hover:text-text transition-colors"
              :class="{ 'text-text': $route.name === 'landing' }"
            >
              Home
            </router-link>
            <router-link 
              to="/guide" 
              class="text-text-secondary hover:text-text transition-colors"
              :class="{ 'text-text': $route.name === 'guide' }"
            >
              Anleitung
            </router-link>
            <router-link 
              to="/setup" 
              class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors font-medium text-shadow-lg glow-primary"
            >
              🚀 Jetzt starten
            </router-link>
            <a 
              href="https://github.com/MaximilianRTS/SpotMyBackup2" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-text-secondary hover:text-text transition-colors"
            >
              GitHub Projekt
            </a>
            
            
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-text-secondary hover:text-text transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-accent-800">
          <div class="flex flex-col space-y-4">
            <router-link 
              to="/" 
              @click="mobileMenuOpen = false"
              class="text-text-secondary hover:text-text transition-colors"
              :class="{ 'text-text': $route.name === 'landing' }"
            >
              Home
            </router-link>
            <router-link 
              to="/guide" 
              @click="mobileMenuOpen = false"
              class="text-text-secondary hover:text-text transition-colors"
              :class="{ 'text-text': $route.name === 'guide' }"
            >
              Anleitung
            </router-link>
            <router-link 
              to="/setup" 
              @click="mobileMenuOpen = false"
              class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors font-medium text-shadow-lg glow-primary"
            >
              🚀 Jetzt starten
            </router-link>
            <a 
              href="https://github.com/MaximilianRTS/SpotMyBackup2" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-text-secondary hover:text-text transition-colors"
            >
              GitHub Projekt
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-surface border-t border-accent-800 mt-20">
      <div class="container-custom section-padding">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- About -->
          <div>
            <h3 class="text-lg font-semibold text-text mb-4">Über SpotMyBackup 2</h3>
            <p class="text-text-secondary text-sm mb-4">
              Sichere deine Spotify-Daten in 3 einfachen Schritten. 
              100% kostenlos, keine Datenspeicherung, moderne Web-App.
            </p>
            <div class="flex space-x-4">
              <a href="https://github.com/MaximilianRTS/SpotMyBackup2" target="_blank" rel="noopener noreferrer" class="text-text-secondary hover:text-text transition-colors" title="GitHub Repository">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.395 7.86 10.914.575.106.786-.249.786-.554 0-.274-.01-1.001-.015-1.965-3.197.695-3.873-1.541-3.873-1.541-.523-1.329-1.277-1.682-1.277-1.682-1.043-.713.079-.699.079-.699 1.154.081 1.762 1.185 1.762 1.185 1.026 1.76 2.692 1.251 3.349.956.104-.743.402-1.251.73-1.538-2.552-.29-5.236-1.276-5.236-5.68 0-1.255.449-2.281 1.185-3.086-.119-.29-.513-1.458.112-3.04 0 0 .965-.309 3.164 1.178.918-.255 1.903-.383 2.884-.387.98.004 1.966.132 2.885.387 2.197-1.487 3.161-1.178 3.161-1.178.626 1.582.232 2.75.114 3.04.738.805 1.184 1.83 1.184 3.086 0 4.414-2.688 5.387-5.251 5.673.414.357.782 1.062.782 2.141 0 1.544-.014 2.786-.014 3.165 0 .307.207.667.792.553C20.213 21.39 23.5 17.083 23.5 12c0-6.352-5.148-11.5-11.5-11.5z" clip-rule="evenodd"/>
                </svg>
              </a>
              <a href="mailto:maximilianrts@proton.me" class="text-text-secondary hover:text-text transition-colors" title="E-Mail Kontakt">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold text-text mb-4">Features</h3>
            <ul class="space-y-2 text-sm text-text-secondary">
              <li>✅ 100% kostenlos</li>
              <li>✅ Keine Datenspeicherung</li>
              <li>✅ Einfache Bedienung</li>
              <li>✅ Alle Playlists & Favoriten</li>
              <li>✅ Mobile-optimiert</li>
              <li>✅ Open Source</li>
            </ul>
          </div>

          <!-- Privacy -->
          <div>
            <h3 class="text-lg font-semibold text-text mb-4">Datenschutz</h3>
            <ul class="space-y-2 text-sm text-text-secondary">
              <li>🛡️ Keine Server-Speicherung</li>
              <li>🛡️ Lokale Verarbeitung</li>
              <li>🛡️ Direkte Spotify API Calls</li>
              <li>🛡️ PKCE OAuth Flow</li>
              <li>🛡️ HTTPS Only</li>
              <li>🛡️ Keine Tracking-Cookies</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-accent-800 mt-8 pt-8 text-center">
          <!-- Buy me a Coffee Button -->
          <div class="mb-6">
            <BuyMeACoffee size="medium" text="Buy me a Coffee" />
          </div>
          
          <p class="text-text-secondary text-sm mb-2">
            © 2024 SpotMyBackup 2. Open Source unter MIT Lizenz.
          </p>
          <p class="text-text-secondary text-xs">
            Entwickelt von <a href="mailto:maximilianrts@proton.me" class="text-primary-500 hover:text-primary-400 transition-colors">Maximilian Reitsberger</a> | 
            Basierend auf <a href="https://github.com/secuvera/SpotMyBackup" target="_blank" rel="noopener noreferrer" class="text-primary-500 hover:text-primary-400 transition-colors">SpotMyBackup</a>
          </p>
        </div>
      </div>
    </footer>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="loading-spinner w-8 h-8 mx-auto mb-4"></div>
        <p class="text-text-secondary">Lädt...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useThemeStore } from '@/stores/theme'
import BuyMeACoffee from '@/components/BuyMeACoffee.vue'

const appStore = useAppStore()
const themeStore = useThemeStore()
const route = useRoute()
const mobileMenuOpen = ref(false)

const isLoading = computed(() => appStore.isLoading)

onMounted(() => {
  themeStore.initTheme()
})

// Close mobile menu on route change
watch(route, () => {
  mobileMenuOpen.value = false
})
</script>

