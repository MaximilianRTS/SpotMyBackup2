# 🎵 SpotMyBackup 2

Eine moderne, webbasierte Spotify Backup-Anwendung mit Vue.js und Firebase - basierend auf dem Original [SpotMyBackup](https://github.com/secuvera/SpotMyBackup) Projekt.

## 🌐 [➡️ Jetzt direkt nutzen - Live-Demo](https://spotify-backup-free.web.app/)
## 📘 [➡️ Schritt-für-Schritt Setup](https://spotify-backup-free.web.app/setup)

**Die App ist bereits live und einsatzbereit! Keine Installation erforderlich.**

## 📖 Über dieses Projekt

**SpotMyBackup 2** ist eine moderne Neuimplementierung des ursprünglichen [SpotMyBackup](https://github.com/secuvera/SpotMyBackup) Projekts von [secuvera](https://github.com/secuvera). Das Original-Projekt wurde archiviert und wird nicht mehr weiterentwickelt. Diese Version bringt das Konzept in die moderne Web-Entwicklung mit:

- **Vue.js 3** mit Composition API
- **TypeScript** für bessere Code-Qualität
- **Tailwind CSS** für modernes Design
- **Firebase** für Hosting und Analytics
- **Vite** für schnelle Entwicklung

## ✨ Features

- **100% kostenlos** - Keine versteckten Kosten oder Abonnements
- **Keine Datenspeicherung** - Alle Daten werden nur in deinem Browser verarbeitet
- **Einfache Bedienung** - Schritt-für-Schritt Anleitung für technisch unerfahrene Nutzer
- **Alle Playlists & Favoriten** - Exportiere alle deine Spotify-Daten
- **Mobile-optimiert** - Funktioniert perfekt auf allen Geräten
- **Sichere Authentifizierung** - PKCE OAuth Flow für maximale Sicherheit
- **Open Source** - Transparenter Quellcode auf GitHub
- **Moderne UI/UX** - Responsive Design mit Dark/Light Mode

## 🛠️ Für Entwickler

### Repository klonen

```bash
git clone https://github.com/your-username/spotmybackup-2.git
cd spotmybackup-2
```

### Dependencies installieren

```bash
npm install
```

### Umgebungsvariablen konfigurieren

Kopiere die Beispiel-Konfiguration und fülle sie aus:

```bash
cp env.example .env
```

Bearbeite die `.env` Datei mit deinen Firebase- und Spotify-Konfigurationen:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Spotify Configuration
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id

# App Configuration
VITE_APP_URL=https://your-domain.com
```

### Entwicklungsserver starten

```bash
npm run dev
```

Die Anwendung ist jetzt unter `http://localhost:3000` verfügbar.

## 🛠️ Entwicklung

### Verfügbare Scripts

```bash
# Entwicklungsserver starten
npm run dev

# Build für Production
npm run build

# Preview des Production Builds
npm run preview

# Linting
npm run lint

# Type Checking
npm run type-check

# Firebase Functions lokal testen
npm run firebase:serve

# Firebase deployen
npm run firebase:deploy
```

### Projektstruktur

```
spotmybackup-2/
├── src/                    # Vue.js Anwendung
│   ├── components/         # Vue Komponenten
│   ├── views/             # Seiten/Views
│   ├── stores/            # Pinia Stores
│   ├── composables/       # Vue Composables
│   ├── utils/             # Hilfsfunktionen
│   ├── types/             # TypeScript Typen
│   └── assets/            # Statische Assets
├── public/                # Öffentliche Dateien
└── dist/                  # Build Output
```

## 🔧 Konfiguration (für Entwickler)

### Spotify App Setup

1. Gehe zum [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Erstelle eine neue App
3. Setze die Redirect URI auf `{deine_domain}/callback`
4. Kopiere die Client ID in deine `.env` Datei

### Firebase Setup

1. Erstelle ein neues Firebase-Projekt unter [Firebase Console](https://console.firebase.google.com)
2. Aktiviere Firebase Hosting
3. Kopiere die Konfigurationsdaten in deine `.env` Datei

## 🚀 Deployment

### Firebase Hosting

```bash
# Build erstellen
npm run build

# Firebase deployen
firebase deploy
```

### Manuelles Hosting

```bash
# Build erstellen
npm run build

# dist/ Ordner auf deinen Webserver hochladen
```

## 🛡️ Sicherheit

- **PKCE OAuth Flow** - Sichere Authentifizierung ohne Client Secret
- **Client-seitige Verarbeitung** - Keine Server-Intermediäre
- **HTTPS Only** - Verschlüsselte Verbindungen
- **CSP Headers** - Content Security Policy
- **Keine Datenspeicherung** - Alle Daten bleiben beim Benutzer

## 🔍 Transparenz

- Reines Client-Frontend: Keine serverseitige Speicherung personenbezogener Daten. Details siehe [PRIVACY.md](PRIVACY.md).
- Authentifizierung via OAuth 2.0 mit PKCE; Tokens verbleiben im Browser (`localStorage`/`sessionStorage`). Relevanter Code: `src/composables/useSpotifyAuth.ts`, `src/stores/auth.ts`.
- Keine Tracking-Cookies, kein Analytics.
- Vollständiger Quellcode und Änderungen öffentlich einsehbar auf GitHub.

Mehr Hintergrund und Anleitung: [`Setup`](https://spotify-backup-free.web.app/setup)

## 📱 Browser-Unterstützung

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Beitragen

Wir freuen uns über Beiträge! Bitte:

1. Forke das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/amazing-feature`)
3. Committe deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Pushe zum Branch (`git push origin feature/amazing-feature`)
5. Öffne eine Merge Request

## 📄 Lizenz

Dieses Projekt steht unter der MIT Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 🆘 Support

Bei Problemen oder Fragen:

- Erstelle ein [GitHub Issue](https://github.com/your-username/spotmybackup-2/issues)
- Kontaktiere mich per E-Mail: maximilianrts@proton.me

## 🙏 Danksagungen

- **[secuvera/SpotMyBackup](https://github.com/secuvera/SpotMyBackup)** - Das ursprüngliche Projekt, das die Inspiration für diese moderne Neuimplementierung war
- [Vue.js](https://vuejs.org/) - Progressive JavaScript Framework
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - Musik-API

## ☕ Support

Wenn dir dieses Projekt gefällt, kannst du mir gerne einen Kaffee spenden:

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee--yellow.svg?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://buymeacoffee.com/maximilianrts)

---

**SpotMyBackup 2** - Sichere deine Spotify-Daten in 3 einfachen Schritten! 🎵

*Entwickelt von [Maximilian Reitsberger](mailto:maximilianrts@proton.me) - Eine moderne Neuimplementierung des ursprünglichen SpotMyBackup Projekts.*