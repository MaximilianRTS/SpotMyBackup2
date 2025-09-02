# Datenschutz / Privacy

Diese Anwendung ist bewusst so gebaut, dass keine personenbezogenen Daten auf Servern von uns gespeichert werden. Die App ist ein statisches Frontend (Firebase Hosting) und kommuniziert direkt mit der Spotify Web API.

## Was wird gespeichert?
- Access- und Refresh-Tokens werden ausschließlich in deinem Browser (localStorage) gehalten, um die Sitzung aufrechtzuerhalten.
- Während des OAuth-Flows wird ein Code Verifier temporär in `sessionStorage` abgelegt und nach Abschluss entfernt.
- Optional speichern wir die Theme-Präferenz (`light`/`dark`) sowie deine lokal eingegebene Spotify Client-ID im `localStorage`.

Siehe Implementierung im Code:
- `src/composables/useSpotifyAuth.ts` (PKCE, `sessionStorage` für `spotify_code_verifier`)
- `src/stores/auth.ts` (Tokens und Nutzer im `localStorage`)
- `src/stores/theme.ts` (Theme-Präferenz im `localStorage`)

## Was wird nicht gespeichert?
- Es gibt keinen eigenen Backend-Server für Nutzerdaten.
- Es gibt keine Tracking-Cookies, kein Analytics und keine serverseitigen Nutzerprofile.
- Wir loggen keine personenbezogenen Anfragen auf dem Server.

## Datenflüsse
- Dein Browser kommuniziert direkt mit den Spotify-Endpunkten:
  - `https://accounts.spotify.com/api/token` (Token-Austausch/Refresh)
  - `https://api.spotify.com/v1/*` (Lesen deiner Daten, z. B. Playlists)
- Das Frontend selbst wird von Firebase Hosting ausgeliefert und verarbeitet Daten nur clientseitig.

## Wie kann ich meine Daten löschen?
- In der App über „Abmelden“ werden Tokens im Browser entfernt.
- Du kannst jederzeit den Browser-Storage (localStorage/sessionStorage) manuell leeren.
- Du kannst im Spotify Dashboard den App-Zugriff widerrufen, um Tokens ungültig zu machen.

## Verantwortliche Stelle
- Projekt: SpotMyBackup 2 (Open Source)
- Maintainer: Maximilian Reitsberger (<maximilianrts@proton.me>)

## Transparenz
Der vollständige Quellcode ist öffentlich einsehbar (GitHub). Bitte prüfe bei Bedarf die oben genannten Dateien, um das Verhalten der App zu verifizieren.
