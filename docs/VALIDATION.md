# Portfolio-Prüfung · 22. Oktober 2026

## Bereits ausgeführt

- `npm ci --ignore-scripts`: erfolgreich.
- `npm run build`: drei HTML-Dokumente, 40 lokale Verweise, eindeutige IDs und JavaScript-Syntax erfolgreich geprüft. Zehn Veröffentlichungsdateien, insgesamt ungefähr 241 KiB, plus Veröffentlichungsmanifest.
- `npm audit --audit-level=high`: keine bekannten Schwachstellen gemeldet, einschließlich Entwicklungsabhängigkeiten.
- `npm run audit:secrets`: komplette Ausgangshistorie mit 20 Commits und 68 unterschiedlichen historischen Blobs sowie aktueller Arbeitsstand. Keine Zugangsdatenmuster in lesbaren Quellen; ein beschädigtes historisches ZIP bleibt ein offener Prüffund.
- Cloud-Browser: Desktop-Hero visuell kontrolliert. Keine Portfolio-JavaScript-Fehler beobachtet; eine Browser-Erweiterungsmeldung stammt außerhalb der Website.
- Responsive Prüfung in einem lokalen Browser-Prüfrahmen bei 320, 390, 430, 768, 1024, 1366, 1440 und 1920 Pixeln, einschließlich geöffneter Projektdetails. Ein Überlauf bei 320 Pixeln wurde gefunden und korrigiert; erneute Prüfung dort ohne Überlauf.
- Mobile Menübedienung: Enter öffnet; Escape schließt und gibt Fokus zurück. Kontakt-Navigation schließt das Menü und setzt Fokus auf den Zielabschnitt.
- Projektfilter: Anwendungen 3, Games 2, Lernprojekte/Archiv 2, Alle 7. Zähler und sichtbare Einträge stimmen überein.
- Codegarten-Galerie: Editor wird sichtbar, Dashboard ausgeblendet. Die Bilder sind unverändert echte Projektaufnahmen.

## Noch laufende Abschlussprüfung

Der ursprüngliche lokale Aufruf von `npm test` konnte keinen Testbrowser starten. Alle 13 damaligen Tests scheiterten vor der eigentlichen Ausführung am fehlenden Playwright-Browserpaket. Es wird daraus kein bestandener Browser- oder Axe-Test abgeleitet.

Die Suite wurde auf das neue Design angepasst und um Filter-/Galerie- sowie Ressourcen-/Privatlink-Prüfungen ergänzt. Sie wird auf einem separaten GitHub-Runner mit installiertem Chromium ausgeführt, bevor dieser Stand auf `main` veröffentlicht wird. Der tatsächliche Laufstatus wird hier anschließend ergänzt.

## Grenzen

Keine erneute Codegarten-Testausführung, kein Lauf seiner Backend-/Runtime-Anwendung, kein Safari-/Firefox-Gerätetest und keine gemessenen realen Core Web Vitals. Automatisierte Accessibility-Prüfungen sind keine vollständige manuelle Zertifizierung. Rechtliche Adressplatzhalter bleiben offen.
