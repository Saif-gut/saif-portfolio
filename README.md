# Saif Aldien · Entwicklerportfolio

Statische Portfolio-Website für den Einstieg in die Softwareentwicklung und die Suche nach einer Ausbildung zum Fachinformatiker für Anwendungsentwicklung ab 2027. Öffentliche Adresse: https://abbud.de.

## Lokal ansehen

`index.html` funktioniert direkt im Browser, auch ohne JavaScript. Für eine HTTP-Vorschau (Node.js 20 oder neuer):

```powershell
npm run dev
```

Vorschau: http://127.0.0.1:4173. Mit Strg+C beenden.

## Prüfen und Veröffentlichungspaket bauen

```powershell
npm ci
npm run build
npm test
```

Die Entwicklungsabhängigkeiten sind ausschließlich Playwright und Axe. Unter Windows verwenden die Tests installiertes Microsoft Edge. Für Chromium auf anderen Systemen: `npx playwright install chromium`. Mit `PW_CHANNEL` kann ein anderer installierter Chromium-Browser ausgewählt werden. Die Seite selbst benötigt keine Node.js-Laufzeit oder Datenbank.

`npm run build` prüft lokale Verweise, IDs und JavaScript und erstellt `dist/`. Dieser Ordner enthält alle zusammengehörigen HTML-, CSS-, JavaScript- und Bilddateien. `dist/publication-manifest.json` nennt den vollständigen Veröffentlichungsumfang. Bei klassischem Webhosting den **gesamten Inhalt von dist/** mit unveränderter Ordnerstruktur hochladen.

Das bestehende GitHub Pages veröffentlicht aus dem Repository-Root. `_config.yml` schließt Entwicklungsdateien aus. Deshalb für ein Update alle geänderten Quelldateien und Assets gemeinsam committen und pushen; `dist/` bleibt unversioniert. `CNAME` enthält weiterhin `abbud.de`.

## Neue Seitenstruktur

1. Start: Name, praktische Projektarbeit, Ausbildungsziel und Codegarten als Einstieg.
2. Projekte: Codegarten als ausführliches Hauptprojekt; Jarvis Dashboard und Last Letter Club mit eigenen Layouts; weitere Arbeiten als kompakte Liste.
3. Über mich: Lernweise, Interessen und bisherige Zusammenarbeit.
4. Kenntnisse: fünf Gruppen mit konkretem Projekteinsatz und klar benannten Lernbereichen.
5. Mein Weg: drei Lernschritte und Ausbildungsziel.
6. Kontakt: E-Mail, GitHub und öffentliche Portfolio-Adresse.

Alle bisherigen Projekte bleiben erhalten. Codegarten wird neu hinzugefügt. Motivation und Berufserfahrung sind in „Über mich“ integriert; bisherige Fragmentziele `#warum-it`, `#erfahrung` und `#ausbildung` bleiben erreichbar. Die frühere Filterleiste und die gleichförmigen Karten entfallen zugunsten einer klaren Projekthierarchie.

## Gestaltung und Inhalte

Helles Papier, dunkle Schrift, Gartengrün; große Typografie und ruhige, unterschiedliche Projektkompositionen. Eine gemeinsame Navigation für Desktop und Mobilgeräte. Native aufklappbare Kurs-/Runtime-Details, sichtbarer Tastaturfokus, Reduced Motion und zugängliche Inhalte ohne JavaScript.

Codegarten: stabile Version 1.0.1, neun Lernbereiche, 324 Lektionen, 39 Projekte. Echte Dashboard- und Editorbilder; visualisiertes siebenstufiges Lernmodell; Architektur, Offline/Sync, statische Prüfer und Lernerfahrungen. Kein erfundener Live-Link oder Wirkungsnachweis. KI-Unterstützung wird offen beschrieben.

Inhaltsquellen und Bildherkunft: [docs/CONTENT-SOURCES.md](docs/CONTENT-SOURCES.md).
Prüfergebnisse: [docs/VALIDATION.md](docs/VALIDATION.md).

## Inhalte anpassen

- `index.html`: öffentliche Texte, Projektdaten, Kontakt und Ausbildungsziel.
- `css/style.css`: vollständiges Farbsystem und Responsive-Layouts.
- `js/main.js`: Navigation und Fokussteuerung.
- `assets/projects/`: optimierte echte Screenshots.
- `impressum.html` / `datenschutz.html`: rechtliche Angaben.

Öffentlicher Kontakt: `saifaldienabbud@gmail.com`, [GitHub](https://github.com/Saif-gut).

**Noch offen:** Anschrift und konkrete Angaben in Impressum/Datenschutz. Die bestehenden Platzhalter wurden nicht durch erfundene persönliche Daten ersetzt. Hosting ist nachweislich GitHub Pages; der alte IONOS-Hinweis wurde angepasst.

Keine Cookies, Analytics, externen Fonts, CDNs oder eingebetteten Drittanbieter-Dienste. Alle Produktbilder liegen lokal. Abhängigkeiten werden ausschließlich für Entwicklung und Tests gebraucht.
