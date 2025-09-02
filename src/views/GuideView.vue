<template>
  <div class="min-h-screen bg-background">
    <div class="container-custom section-padding">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-3xl sm:text-4xl font-bold text-text mb-4">
            📖 Anleitung
          </h1>
          <p class="text-xl text-text-secondary">
            Schritt-für-Schritt Anleitung für MySpotBackup
          </p>
        </div>

        <!-- Quick Start -->
        <div class="card mb-8 animate-fade-in">
          <div class="card-header">
            <h2 class="card-title">🚀 Schnellstart</h2>
            <p class="card-description">
              In nur 3 Schritten zu deinem ersten Backup
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
              <h3 class="font-semibold text-text mb-2">Spotify App erstellen</h3>
              <p class="text-sm text-text-secondary">Erstelle eine kostenlose App im Spotify Developer Portal</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
              <h3 class="font-semibold text-text mb-2">Client ID eingeben</h3>
              <p class="text-sm text-text-secondary">Gib deine Client ID in MySpotBackup ein</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
              <h3 class="font-semibold text-text mb-2">Backup erstellen</h3>
              <p class="text-sm text-text-secondary">Melde dich an und erstelle dein Backup</p>
            </div>
          </div>

          <div class="text-center mt-6">
            <router-link to="/setup" class="btn-primary">
              Setup starten
            </router-link>
          </div>
        </div>

        <!-- Detailed Guide -->
        <div class="space-y-8">
          <!-- Step 1: Spotify App -->
          <div class="card animate-slide-up">
            <div class="card-header">
              <h2 class="card-title">Schritt 1: Spotify App erstellen</h2>
              <p class="card-description">
                Erstelle eine kostenlose Spotify App für die Authentifizierung
              </p>
            </div>

            <div class="space-y-6">
              <div class="bg-accent-800/50 border border-accent-600 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-text mb-4">📋 Detaillierte Anleitung:</h3>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p class="font-medium text-text">Gehe zum Spotify Developer Dashboard</p>
                      <p class="text-sm text-text-secondary">Besuche <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300 underline">developer.spotify.com/dashboard</a></p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p class="font-medium text-text">Melde dich mit deinem Spotify-Account an</p>
                      <p class="text-sm text-text-secondary">Verwende denselben Account, für den du das Backup erstellen möchtest</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p class="font-medium text-text">Klicke auf "Create App"</p>
                      <p class="text-sm text-text-secondary">Du findest den Button oben rechts im Dashboard</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p class="font-medium text-text">Fülle das Formular aus:</p>
                      <div class="mt-2 space-y-2 text-sm text-text-secondary">
                        <p><strong>App name:</strong> "Mein Backup Tool" (oder ein anderer Name)</p>
                        <p><strong>App description:</strong> "Für Spotify Backups"</p>
                        <p><strong>Website:</strong> {{ appUrl }}</p>
                        <p><strong>Redirect URI:</strong> {{ redirectUri }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                    <div>
                      <p class="font-medium text-text">Klicke "Save" und kopiere die Client ID</p>
                      <p class="text-sm text-text-secondary">Die Client ID findest du unter "App Details"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="status-info">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-text-secondary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="text-sm">
                      <strong>Tipp:</strong> Die Spotify App ist kostenlos und du kannst sie für immer behalten. 
                      Du brauchst keine Kreditkarte oder Zahlungsinformationen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Client ID -->
          <div class="card animate-slide-up">
            <div class="card-header">
              <h2 class="card-title">Schritt 2: Client ID in MySpotBackup eingeben</h2>
              <p class="card-description">
                Gib deine Client ID in MySpotBackup ein
              </p>
            </div>

            <div class="space-y-6">
              <div class="bg-accent-800/50 border border-accent-600 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-text mb-4">📋 Was du brauchst:</h3>
                
                <ul class="space-y-2 text-text-secondary">
                  <li>• Deine Spotify Client ID (aus Schritt 1)</li>
                  <li>• MySpotBackup geöffnet</li>
                </ul>
              </div>

              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p class="font-medium text-text">Gehe zum Setup-Assistenten</p>
                    <p class="text-sm text-text-secondary">Klicke auf "Jetzt starten" auf der Startseite</p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p class="font-medium text-text">Gib deine Client ID ein</p>
                    <p class="text-sm text-text-secondary">Kopiere die Client ID aus dem Spotify Developer Dashboard</p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p class="font-medium text-text">Klicke "Weiter"</p>
                    <p class="text-sm text-text-secondary">MySpotBackup validiert deine Client ID automatisch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Backup erstellen -->
          <div class="card animate-slide-up">
            <div class="card-header">
              <h2 class="card-title">Schritt 3: Backup erstellen</h2>
              <p class="card-description">
                Erstelle dein erstes Spotify Backup
              </p>
            </div>

            <div class="space-y-6">
              <div class="bg-accent-800/50 border border-accent-600 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-text mb-4">📋 Backup-Prozess:</h3>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p class="font-medium text-text">Melde dich bei Spotify an</p>
                      <p class="text-sm text-text-secondary">Klicke auf "Bei Spotify anmelden" und folge dem OAuth-Flow</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p class="font-medium text-text">Klicke "Backup erstellen"</p>
                      <p class="text-sm text-text-secondary">MySpotBackup lädt alle deine Daten von Spotify</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p class="font-medium text-text">Lade das Backup herunter</p>
                      <p class="text-sm text-text-secondary">Die .json Datei wird automatisch heruntergeladen</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="status-success">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-success mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <p class="text-sm">
                      <strong>Fertig!</strong> Du hast erfolgreich dein erstes Spotify Backup erstellt. 
                      Die Datei enthält alle deine Playlists und gespeicherten Tracks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div class="card animate-slide-up">
            <div class="card-header">
              <h2 class="card-title">❓ Häufige Fragen</h2>
              <p class="card-description">
                Antworten auf die häufigsten Fragen
              </p>
            </div>

            <div class="space-y-6">
              <div class="border-b border-accent-800 pb-4">
                <h3 class="font-semibold text-text mb-2">Ist MySpotBackup wirklich kostenlos?</h3>
                <p class="text-text-secondary text-sm">
                  Ja, MySpotBackup ist 100% kostenlos. Es gibt keine versteckten Kosten, 
                  keine Abonnements und keine Premium-Features.
                </p>
              </div>

              <div class="border-b border-accent-800 pb-4">
                <h3 class="font-semibold text-text mb-2">Werden meine Daten gespeichert?</h3>
                <p class="text-text-secondary text-sm">
                  Nein, deine Daten werden nirgendwo gespeichert. Alles läuft in deinem Browser 
                  und die Backup-Datei wird nur auf deinem Gerät gespeichert.
                </p>
              </div>

              <div class="border-b border-accent-800 pb-4">
                <h3 class="font-semibold text-text mb-2">Was passiert mit meinem Spotify-Account?</h3>
                <p class="text-text-secondary text-sm">
                  Nichts! MySpotBackup liest nur deine Daten aus. Es werden keine Änderungen 
                  an deinem Account vorgenommen.
                </p>
              </div>

              <div class="border-b border-accent-800 pb-4">
                <h3 class="font-semibold text-text mb-2">Kann ich das Backup in einen anderen Account importieren?</h3>
                <p class="text-text-secondary text-sm">
                  Ja, du kannst dein Backup in jeden anderen Spotify-Account importieren. 
                  Verwende dafür die Import-Funktion.
                </p>
              </div>

              <div>
                <h3 class="font-semibold text-text mb-2">Was ist, wenn ich Probleme habe?</h3>
                <p class="text-text-secondary text-sm">
                  Bei Problemen kannst du uns auf GitHub kontaktieren oder eine Issue erstellen. 
                  Wir helfen gerne weiter!
                </p>
              </div>
            </div>
          </div>

          <!-- Troubleshooting -->
          <div class="card animate-slide-up">
            <div class="card-header">
              <h2 class="card-title">🔧 Fehlerbehebung</h2>
              <p class="card-description">
                Lösungen für häufige Probleme
              </p>
            </div>

            <div class="space-y-6">
              <div class="status-error">
                <h3 class="font-semibold text-text mb-2">"Client ID ist ungültig"</h3>
                <p class="text-sm text-text-secondary mb-2">
                  <strong>Lösung:</strong> Überprüfe, ob du die Client ID korrekt kopiert hast. 
                  Sie sollte etwa 32 Zeichen lang sein und nur Buchstaben und Zahlen enthalten.
                </p>
                <ul class="text-sm text-text-secondary space-y-1">
                  <li>• Kopiere die Client ID erneut aus dem Spotify Developer Dashboard</li>
                  <li>• Stelle sicher, dass keine Leerzeichen am Anfang oder Ende stehen</li>
                  <li>• Überprüfe, ob die Redirect URI korrekt gesetzt ist</li>
                </ul>
              </div>

              <div class="status-warning">
                <h3 class="font-semibold text-text mb-2">"Anmeldung fehlgeschlagen"</h3>
                <p class="text-sm text-text-secondary mb-2">
                  <strong>Lösung:</strong> Überprüfe deine Spotify App Konfiguration.
                </p>
                <ul class="text-sm text-text-secondary space-y-1">
                  <li>• Stelle sicher, dass die Redirect URI exakt übereinstimmt</li>
                  <li>• Überprüfe, ob deine Spotify App aktiv ist</li>
                  <li>• Versuche es mit einem anderen Browser oder im Inkognito-Modus</li>
                </ul>
              </div>

              <div class="status-info">
                <h3 class="font-semibold text-text mb-2">"Backup lädt sehr langsam"</h3>
                <p class="text-sm text-text-secondary mb-2">
                  <strong>Lösung:</strong> Das ist normal bei großen Playlist-Sammlungen.
                </p>
                <ul class="text-sm text-text-secondary space-y-1">
                  <li>• Lass das Backup im Hintergrund laufen</li>
                  <li>• Schließe andere Tabs, um Bandbreite zu sparen</li>
                  <li>• Bei sehr großen Sammlungen kann es 10-15 Minuten dauern</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="text-center mt-12">
          <router-link to="/" class="btn-primary">
            Zurück zur Startseite
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const appUrl = computed(() => import.meta.env.VITE_APP_URL || window.location.origin)
const redirectUri = computed(() => `${appUrl.value}/callback`)
</script>

