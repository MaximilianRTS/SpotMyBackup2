# 🎵 SpotMyBackup 2

Eine moderne, webbasierte Spotify Backup-Anwendung mit Vue.js – basierend auf dem Original [SpotMyBackup](https://github.com/secuvera/SpotMyBackup) Projekt.

<a href="https://spotify-backup-free.web.app/" style="display:inline-block;background:#1DB954;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">➡️ Live Webseite</a>

**Die App ist bereits live und einsatzbereit! Keine Installation erforderlich.**

## 📖 Über dieses Projekt

**SpotMyBackup 2** ist eine moderne Neuimplementierung des ursprünglichen [SpotMyBackup](https://github.com/secuvera/SpotMyBackup) Projekts von [secuvera](https://github.com/secuvera). Das Original-Projekt wurde archiviert und wird nicht mehr weiterentwickelt. Diese Version bringt das Konzept in die moderne Web-Entwicklung mit:

- **Vue.js 3** mit Composition API
- **TypeScript** für bessere Code-Qualität
- **Tailwind CSS** für modernes Design
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
git clone https://github.com/MaximilianRTS/SpotMyBackup2.git
cd SpotMyBackup2
```

### Dependencies installieren

```bash
npm install
```

### Konfiguration

Für die Nutzung der App ist keine `.env` erforderlich.

- Die Spotify Client ID wird direkt in der Anwendung auf der Seite „Setup“ eingegeben und lokal im Browser gespeichert (z. B. `localStorage`).
- Es werden keine geheimen Schlüssel benötigt, da die Authorisierung über OAuth 2.0 mit PKCE erfolgt.
- Optional für lokale Entwicklung: Du kannst eine `VITE_APP_URL` setzen, ist jedoch nicht zwingend notwendig.

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
```

### Projektstruktur

```
SpotMyBackup2/
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
4. Öffne in der Anwendung die Seite „Setup“ und trage dort deine Client ID ein (sie wird lokal im Browser gespeichert)

## 🚀 Deployment

### Statisches Hosting (beliebiger Host)

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

- Erstelle ein [GitHub Issue](https://github.com/MaximilianRTS/SpotMyBackup2/issues)
- Kontaktiere mich per E-Mail: maximilianrts@proton.me

## 🙏 Danksagungen

- **[secuvera/SpotMyBackup](https://github.com/secuvera/SpotMyBackup)** - Das ursprüngliche Projekt, das die Inspiration für diese moderne Neuimplementierung war
- [Vue.js](https://vuejs.org/) - Progressive JavaScript Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - Musik-API

## ☕ Support

Wenn dir dieses Projekt gefällt, kannst du mir gerne einen Kaffee spenden:

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee--yellow.svg?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://buymeacoffee.com/maximilianrts)

---

**SpotMyBackup 2** - Sichere deine Spotify-Daten in 3 einfachen Schritten! 🎵

*Entwickelt von [Maximilian Reitsberger](mailto:maximilianrts@proton.me) - Eine moderne Neuimplementierung des ursprünglichen SpotMyBackup Projekts.*