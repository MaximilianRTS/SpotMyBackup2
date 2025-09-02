# Security Policy

## Supported versions
- Node.js >= 18
- Aktuelle Browser-Versionen entsprechend der Angaben in der README

## Reporting a vulnerability
Wenn du eine Schwachstelle findest, melde sie bitte verantwortungsvoll:
- Erstelle ein GitHub Issue (Typ: Security) mit einer minimalen Beschreibung ODER
- Kontaktiere mich direkt: maximilianrts@proton.me

Bitte keine sensiblen Details öffentlich posten, bevor ein Fix bereitsteht.

## Projekt-Charakteristik
- Reines Frontend ohne eigenes Backend.
- OAuth 2.0 mit PKCE (ohne Client Secret im Frontend).
- Tokens werden nur im Browser gespeichert (localStorage); PKCE Code Verifier temporär in sessionStorage.

## Empfehlungen für Beiträge
- Keine Secrets in Commits oder in der README.
- `npm run type-check && npm run lint && npm run build` lokal ausführen, bevor PRs erstellt werden.
