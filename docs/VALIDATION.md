# Prüfung des Portfolio-Redesigns

Lokale Prüfung am 13. Oktober 2026. Browser: installiertes Microsoft Edge in isolierten Playwright-Kontexten.

## Erfolgreich

- `npm run build`: JavaScript-Syntax, drei HTML-Dokumente, eindeutige IDs und 40 lokale Verweise geprüft; vollständiges statisches Paket erzeugt.
- `npm test`: **13/13 bestanden** auf dem gebauten Paket, nicht nur auf Quelldateien.
- Acht Breiten: **320, 390, 430, 768, 1024, 1366, 1440 und 1920 px**. Kein horizontaler Überlauf, keine außerhalb des Viewports liegenden Inhalte; auch mit geöffneten Projekt-Details.
- Alle Bilder einschließlich Lazy Loading erfolgreich geladen; keine Console-/JavaScript-Fehler und keine HTTP-Fehler im lokalen Portfolio.
- Mobile Navigation: Enter, Escape mit Fokusrückgabe, alle sechs Navigationsziele, aktive Markierung und Wechsel auf Desktop geprüft.
- Skip-Link, Fokusübergabe an Zielabschnitte und `prefers-reduced-motion` geprüft.
- Ohne JavaScript: mobile Navigation sichtbar, native Details bedienbar, alle neun Kurszeilen zugänglich; Summen 324 Lektionen und 39 Projekte bestätigt.
- Axe-Prüfung für WCAG 2 A/AA und WCAG 2.1 AA: **keine automatisiert erkannten Verstöße** in allen acht Breiten und auf beiden rechtlichen Seiten. Dies ersetzt keine vollständige manuelle Accessibility-Zertifizierung.
- Visuelle Kontrolle der Desktop- und Smartphone-Aufnahmen, echten Projektbilder, Hauptprojekt-Präsentation und übrigen Abschnitte.
- Alle acht öffentlichen GitHub-Ziele antworteten mit HTTP 200.

Die ersten Prüfläufe fanden einen unzureichend markierten Textlink und einen doppelten Scroll-Abstand, der die aktive Navigation verfälschte. Beides wurde korrigiert und im vollständigen erfolgreichen Lauf geprüft. Eine Testauswahl nach verstecktem Menübutton wurde ebenfalls berichtigt.

## Umfang und Grenzen

Die Veröffentlichung umfasst zehn Dateien plus das generierte Veröffentlichungsmanifest in `dist/`. Das Paket liegt bei ungefähr 257 KiB. Keine Laufzeitpakete, externen Fonts, Analytics oder Tracking-Skripte. Bilder haben feste Abmessungen, `decoding="async"` und Lazy Loading. Es werden keine Lighthouse-Punktzahl oder gemessenen realen Core Web Vitals behauptet.

Die Browserprüfungen dieses Portfolios wurden mit Edge durchgeführt; Safari und Firefox wurden nicht zusätzlich getestet. Die Aussagen zu Codegartens Tests sind durch dessen Projektberichte belegt, nicht durch neue Ausführung seiner Test-Suite.

Impressum und Datenschutz sind technisch erreichbar und lesbar, aber inhaltlich noch nicht vollständig: persönliche Anschrift und konkrete Hosting-Angaben sind weiterhin offen.
