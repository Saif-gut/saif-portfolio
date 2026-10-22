# Saif Aldien Abbud · Entwicklerportfolio

Persönliches Portfolio unter **https://abbud.de**. Eigene Anwendungen, Game-Prototypen und die Suche nach einer Ausbildung zum Fachinformatiker für Anwendungsentwicklung ab 2027.

## Lokal starten

Node.js 22 oder neuer:

```sh
npm ci --ignore-scripts
npm run dev
```

Die Vorschau läuft standardmäßig nur auf `http://127.0.0.1:4173`. Ein explizites `--host`/`--port` ist für beaufsichtigte Vorschauen möglich. Die fertige Website hat keine Laufzeitabhängigkeiten.

## Prüfen und bauen

```sh
npm run check
npm run audit:secrets
npm run build
npm test
```

Playwright benötigt ein installiertes Chromium; unter Windows ist Edge voreingestellt. In einer geeigneten Entwicklungsumgebung kann `npx playwright install chromium` genutzt werden. GitHub CI installiert den Testbrowser in einem separaten Runner. Fehlende Browser sind kein bestandener Testlauf.

`dist/` enthält ausschließlich die zehn erlaubten HTML-, CSS-, JavaScript-, Domain- und Bilddateien plus Veröffentlichungsmanifest. GitHub Pages veröffentlicht weiterhin aus `main` / Root; `_config.yml` schließt Entwicklungsdateien aus. Für Updates alle zusammengehörigen Dateien gemeinsam veröffentlichen. `CNAME` bleibt `abbud.de`.

## Gestaltung und Bedienung

Dunkler Typografie-Hero mit echtem Codegarten-Einblick, helle Projektstrecke, Gartengrün und heller Limettenakzent. Unterschiedliche Layouts für große Projekte und kleine Lernarbeiten. Systemschriften, lokale WebP-Bilder, leichte Animationen und Reduced-Motion-Regeln halten die Seite kompakt.

Codegarten erhält eine eigene Screenshot-Galerie, sieben Lernstufen, Kursumfang und technische Grenzen. Die Zahlen sind als dokumentierter Stand vom 13.10.2026 eingeordnet. Jarvis Dashboard und Last Letter Club erhalten ausführliche Projektbereiche. Jarvis Sprachassistent, Bubble Pop, Java und das pausierte AusbildungsKompass-MVP stehen in kompakter Form daneben.

Projektfilter und mobile Navigation funktionieren per Tastatur. Ohne JavaScript bleiben alle Projekte, beide Codegarten-Bilder, die Navigation und native Details zugänglich. Alte Abschnittsziele `#warum-it`, `#erfahrung`, `#ausbildung` bleiben erhalten.

## Dateien

- `index.html`: Inhalte, Projekte und Kontakt.
- `css/style.css`: Design, responsive Ansichten und rechtliche Seiten.
- `js/main.js`: Menü, aktive Navigation, Projektfilter und Screenshot-Wechsel.
- `assets/projects/`: vorhandene echte Screenshots.
- `scripts/`: Entwicklungsserver, Build, Quellen- und Secretprüfung.
- `tests/portfolio.spec.js`: Browser-, Bedienungs- und Accessibility-Prüfungen.
- `.github/`: CI mit minimalen Berechtigungen, Dependabot und Sicherheitsmeldungen.

## Nachweise und offene Punkte

- [Inhaltsquellen](docs/CONTENT-SOURCES.md)
- [Prüfung und Grenzen](docs/VALIDATION.md)
- [Sicherheit, Hosting und Privatstellung](docs/SECURITY-REVIEW.md)

Die Sichtbarkeit bleibt öffentlich, bis Tarif und Pages-Kompatibilität authentifiziert geprüft sind. Keine DNS- oder Hostingumstellung auf Verdacht. Ein historisches beschädigtes ZIP bleibt ein offener Prüffund; keine bestätigten Zugangsdaten in lesbaren Quellen gefunden.

**Noch zu ergänzen:** postalische Anschrift in Impressum und Datenschutz. Die vorhandenen Platzhalter wurden nicht durch erfundene Angaben ersetzt. Kein Anspruch auf rechtlich vollständige Texte.

Öffentlicher Kontakt: `saifaldienabbud@gmail.com` · https://github.com/Saif-gut
