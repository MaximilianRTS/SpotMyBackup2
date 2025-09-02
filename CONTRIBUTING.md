# Beitragen (Contributing)

Danke für dein Interesse! So kannst du beitragen:

## Setup
1. Forke das Repository und klone deinen Fork.
2. `npm ci` installieren (Node >= 18).
3. Beispiel-Umgebung kopieren: `cp env.example .env` und Werte setzen.
4. Entwicklungsserver: `npm run dev`.

## Qualitätschecks
- Lint: `npm run lint`
- Type-Check: `npm run type-check`
- Build: `npm run build`

Bitte stelle sicher, dass alle drei vor dem PR grün sind.

## PR-Richtlinien
- Kleine, fokussierte Änderungen mit klarer Beschreibung.
- Keine Secrets/Access-Tokens in Commits.
- Verweise bei sicherheitsrelevanten Änderungen auf `SECURITY.md`.

## Verhaltenskodex
Sei respektvoll und konstruktiv. Wir schätzen sachliche, nachvollziehbare Reviews.
