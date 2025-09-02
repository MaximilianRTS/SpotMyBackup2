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
              href="https://gitlab.com/your-username/spotmybackup-2" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-text-secondary hover:text-text transition-colors"
            >
              GitLab
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
              href="https://gitlab.com/your-username/spotmybackup-2" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-text-secondary hover:text-text transition-colors"
            >
              GitLab
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
              <a href="https://gitlab.com/your-username/spotmybackup-2" target="_blank" rel="noopener noreferrer" class="text-text-secondary hover:text-text transition-colors" title="GitLab Repository">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.866 0L16.387 9.45H7.613L5.917 1.263c-.135-.423-.73-.423-.866 0L2.387 9.45 1.045 13.587c-.121.375.014.789.331 1.023L12 23.054l10.624-8.443c.318-.235.453-.647.331-1.024"/>
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

