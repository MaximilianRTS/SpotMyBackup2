# GitLab Repository Setup - SpotMyBackup 2

## 🌐 Live-Demo

**➡️ [SpotMyBackup 2 direkt nutzen](https://spotify-backup-free.web.app/)**

Die App ist bereits live und einsatzbereit! Diese Anleitung ist für Entwickler, die das Projekt selbst hosten oder weiterentwickeln möchten.

## Schritt-für-Schritt Anleitung

### 1. GitLab Repository erstellen

1. Gehe zu [GitLab.com](https://gitlab.com) und melde dich an
2. Klicke auf "New Project" → "Create blank project"
3. Fülle die Details aus:
   - **Project name**: `spotmybackup-2`
   - **Project slug**: `spotmybackup-2`
   - **Project description**: `SpotMyBackup 2 - Moderne Spotify Backup Web-App basierend auf dem Original SpotMyBackup Projekt`
   - **Visibility Level**: Public (oder Private, je nach Wunsch)
   - **Initialize repository with a README**: ❌ (nicht aktivieren, da wir bereits ein README haben)

### 2. Lokales Git Repository konfigurieren

Führe die folgenden Befehle in deinem Projektverzeichnis aus:

```bash
# Git Repository initialisieren (falls noch nicht geschehen)
git init

# Alle Dateien zum Staging hinzufügen
git add .

# Ersten Commit erstellen
git commit -m "Initial commit: SpotMyBackup 2 - Moderne Neuimplementierung"

# GitLab Remote hinzufügen (ersetze YOUR_USERNAME mit deinem GitLab Username)
git remote add origin https://gitlab.com/YOUR_USERNAME/spotmybackup-2.git

# Main Branch setzen
git branch -M main

# Code zu GitLab pushen
git push -u origin main
```

### 3. GitLab-spezifische Konfiguration

Nach dem Upload solltest du folgende Einstellungen in GitLab vornehmen:

#### 3.1 Repository-Beschreibung aktualisieren
- Gehe zu Settings → General → Project description
- Füge eine detaillierte Beschreibung hinzu

#### 3.2 Topics/Tags hinzufügen
- Gehe zu Settings → General → Topics
- Füge relevante Tags hinzu: `spotify`, `backup`, `vue`, `typescript`, `firebase`, `music`

#### 3.3 Badges hinzufügen (optional)
- Gehe zu Settings → General → Badges
- Füge Badges für Build Status, License, etc. hinzu

### 4. GitLab CI/CD Pipeline (optional)

Erstelle eine `.gitlab-ci.yml` Datei für automatische Builds:

```yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

variables:
  NODE_VERSION: "18"

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  only:
    - main
    - develop

pages:
  stage: deploy
  script:
    - echo "Deploying to GitLab Pages"
  artifacts:
    paths:
      - dist/
  only:
    - main
```

### 5. GitLab Pages Setup (optional)

Falls du GitLab Pages für das Hosting nutzen möchtest:

1. Gehe zu Settings → Pages
2. Konfiguriere die Build-Einstellungen
3. Die App wird unter `https://YOUR_USERNAME.gitlab.io/spotmybackup-2` verfügbar sein

### 6. README.md aktualisieren

Nach dem Upload solltest du die GitLab-URLs in der README.md aktualisieren:

```bash
# Ersetze alle Platzhalter-URLs mit deiner echten GitLab-URL
sed -i 's/your-username/YOUR_ACTUAL_USERNAME/g' README.md
sed -i 's/gitlab.com\/your-username\/spotmybackup-2/gitlab.com\/YOUR_ACTUAL_USERNAME\/spotmybackup-2/g' README.md
```

### 7. Weitere Anpassungen

#### 7.1 App.vue URLs aktualisieren
```bash
# Ersetze Platzhalter-URLs in der App.vue
sed -i 's/your-username/YOUR_ACTUAL_USERNAME/g' src/App.vue
```

#### 7.2 Package.json Repository-URL aktualisieren
```json
{
  "repository": {
    "type": "git",
    "url": "https://gitlab.com/YOUR_USERNAME/spotmybackup-2.git"
  },
  "homepage": "https://gitlab.com/YOUR_USERNAME/spotmybackup-2"
}
```

## Nützliche GitLab-Features

### Issues & Merge Requests
- Nutze GitLab Issues für Bug-Reports und Feature-Requests
- Merge Requests für Code-Reviews und Zusammenarbeit

### Wiki
- Erstelle eine Wiki für detaillierte Dokumentation
- Füge Screenshots und Anleitungen hinzu

### Releases
- Erstelle Releases für neue Versionen
- Füge Release Notes hinzu

## Support & Community

Nach dem Upload kannst du:
- Issues für Bug-Reports erstellen
- Merge Requests für Beiträge einreichen
- Wiki für Dokumentation nutzen
- GitLab Pages für Live-Demo verwenden

---

**Hinweis**: Ersetze alle `YOUR_USERNAME` Platzhalter mit deinem tatsächlichen GitLab-Benutzernamen.
