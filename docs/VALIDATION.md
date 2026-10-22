# Portfolio-Prüfung · 22. Oktober 2026

## Bereits ausgeführt

- `npm ci --ignore-scripts`: erfolgreich.
- `npm run build`: drei HTML-Dokumente, 40 lokale Verweise, eindeutige IDs und JavaScript-Syntax erfolgreich geprüft. Zehn Veröffentlichungsdateien, insgesamt ungefähr 242 KiB, plus Veröffentlichungsmanifest.
- `npm audit --audit-level=high`: keine bekannten Schwachstellen gemeldet, einschließlich Entwicklungsabhängigkeiten.
- `npm run audit:secrets`: komplette Ausgangshistorie mit 20 Commits und 68 unterschiedlichen historischen Blobs sowie aktueller Arbeitsstand. Keine Zugangsdatenmuster in lesbaren Quellen; ein beschädigtes historisches ZIP bleibt ein offener Prüffund.
- Cloud-Browser: Desktop-Hero visuell kontrolliert. Keine Portfolio-JavaScript-Fehler beobachtet; eine Browser-Erweiterungsmeldung stammt außerhalb der Website.
- Responsive Prüfung in einem lokalen Browser-Prüfrahmen bei 320, 390, 430, 768, 1024, 1366, 1440 und 1920 Pixeln, einschließlich geöffneter Projektdetails. Ein Überlauf bei 320 Pixeln wurde gefunden und korrigiert; erneute Prüfung dort ohne Überlauf.
- Mobile Menübedienung: Enter öffnet; Escape schließt und gibt Fokus zurück. Kontakt-Navigation schließt das Menü und setzt Fokus auf den Zielabschnitt.
- Projektfilter: Anwendungen 3, Games 2, Lernprojekte/Archiv 2, Alle 7. Zähler und sichtbare Einträge stimmen überein.
- Codegarten-Galerie: Editor wird sichtbar, Dashboard ausgeblendet. Die Bilder sind unverändert echte Projektaufnahmen.

## Erfolgreicher GitHub-Prüflauf

Der separate GitHub-Runner hat für Commit `decad141a00ba035b632aff9003a0b190f4e9395` **15/15 Playwright-Tests bestanden**, Lauf [39806242869](https://github.com/Saif-gut/saif-portfolio/actions/runs/39806242869). Tatsächliche Testdauer: 19,8 Sekunden.

Enthalten: Layout, Bilder, JavaScript-/HTTP-Fehler und Axe (WCAG 2 A/AA, WCAG 2.1 AA) bei acht Breiten; mobile Tastaturbedienung und Navigation; Inhalte und Kurszahlen ohne JavaScript; Skip-Link und reduzierte Bewegung; beide rechtlichen Seiten; Projektfilter, Screenshot-Wechsel, Rückkehr zu einem ausgefilterten Projekt; lokale Ressourcen und fehlender Quellcode-Link zum persönlichen Assistenten. Keine automatisiert erkannten Axe-Verstöße.

Der ursprüngliche lokale Aufruf von `npm test` konnte keinen Testbrowser starten. Die 13 damaligen Tests scheiterten vor der Ausführung am fehlenden Playwright-Browserpaket. Der erfolgreiche Nachweis stammt ausdrücklich vom GitHub-Runner mit installiertem Chromium.

Der CI-Secret-Scan umfasste zu diesem Zeitpunkt 21 Commits und 89 historische Blobs. Der bekannte historische Archivpfad wird weiterhin als Prüfhinweis ausgewiesen. npm-Audit und Build waren erfolgreich. Auch der abschließende Prüfbranch-Lauf [39806775478](https://github.com/Saif-gut/saif-portfolio/actions/runs/39806775478) und der Lauf auf `main` [39807265466](https://github.com/Saif-gut/saif-portfolio/actions/runs/39807265466) waren erfolgreich. Beide prüfen zusätzlich die Navigation ohne JavaScript nach einer kleinen Header-Korrektur. Veröffentlichter Website-Commit: `e0ae98ec541bf59cc52db2f7ec3651fb78fa2748`.

## Veröffentlichung und Prüfung der echten Domain

GitHub-Pages-Lauf [39807265459](https://github.com/Saif-gut/saif-portfolio/actions/runs/39807265459): Jekyll-Build und Deployment erfolgreich.

- `https://abbud.de/`: HTTP 200, neues Design sichtbar.
- `https://www.abbud.de`: Weiterleitung auf `https://abbud.de/`, abschließend HTTP 200, neues Design sichtbar.
- HTTPS mit aktiver Zertifikatsvalidierung erfolgreich; keine Zertifikatswarnung umgangen.
- Alle drei HTML-Seiten, Stylesheet, JavaScript, Favicon und drei Projektbilder: HTTP 200, **bytegenau identisch** mit dem geprüften Quellstand.
- Alle sechs öffentlichen GitHub-Links der Startseite: HTTP 200.
- Veröffentlichtes Portfolio im Cloud-Browser geöffnet; Games-Filter zeigt zwei Projekte. Galerie-Schalter reagiert. Keine Website-Fehler in der Konsole beobachtet.
- Repository nach der Veröffentlichung erneut als öffentlich bestätigt. Keine DNS-, Domain- oder Sichtbarkeitsänderung vorgenommen.

## Geänderte Dateien

`index.html`, `css/style.css`, `js/main.js`, `assets/favicon.svg`, `impressum.html`, `datenschutz.html`, `package.json`, `package-lock.json`, `_config.yml`, `.gitignore`, `README.md`, `scripts/check.mjs`, `scripts/serve.mjs`, `scripts/audit-history.mjs`, `tests/portfolio.spec.js`, `.github/workflows/verify.yml`, `.github/dependabot.yml`, `.github/SECURITY.md`, `docs/CONTENT-SOURCES.md`, `docs/SECURITY-REVIEW.md`, `docs/VALIDATION.md`.

Die drei bestehenden WebP-Projektbilder und `CNAME` wurden unverändert erhalten. Interne Browser-Prüfrahmen und Testausgaben sind nicht Teil des veröffentlichten Repositories oder Website-Pakets.

## Grenzen

Keine erneute Codegarten-Testausführung, kein Lauf seiner Backend-/Runtime-Anwendung, kein Safari-/Firefox-Gerätetest und keine gemessenen realen Core Web Vitals. Automatisierte Accessibility-Prüfungen sind keine vollständige manuelle Zertifizierung. Rechtliche Adressplatzhalter bleiben offen.
