# Portfolio-Website von Saif Aldien

Statische, responsive Single-Page-Portfolio-Website für die Suche nach einem Ausbildungsplatz im IT-Bereich. Das Projekt verwendet ausschließlich HTML, CSS und Vanilla JavaScript. Es gibt kein Build-System und keine externen Laufzeitabhängigkeiten.

## Website lokal öffnen

Die Datei `index.html` per Doppelklick in einem aktuellen Browser öffnen. Die Website funktioniert direkt über das lokale `file://`-Protokoll.

Alternativ kann für lokale Tests ein einfacher statischer Server genutzt werden. Das ist optional und für die Veröffentlichung nicht notwendig.

## Inhalte anpassen

Die wichtigsten Angaben lassen sich an folgenden Stellen anpassen:

- `saifaldienabbud@gmail.com`: in `index.html`, `impressum.html` und `datenschutz.html`
- `https://github.com/Saif-gut`: in `index.html`
- `YOUR_DOMAIN`: Canonical- und Social-Media-Metadaten im `<head>` von `index.html`
- `Ausbildungsstart: 2027`: in der Ausbildungs-Section von `index.html`
- `Deutschland`: Standortangaben in `index.html`
- `[ADRESSE EINTRAGEN]` und ähnliche markierte Felder: in den rechtlichen Seiten

## Social-Media-Vorschaubild

Optional eine Datei `assets/images/og-image.jpg` ergänzen. Danach in `index.html` die Platzhalter `https://YOUR_DOMAIN/...` durch die echte HTTPS-Domain ersetzen.

## Rechtliche Seiten

`impressum.html` und `datenschutz.html` enthalten klar markierte Platzhalter. Diese Inhalte vor der Veröffentlichung mit den korrekten persönlichen und Hosting-Angaben ausfüllen und rechtlich prüfen lassen. Es wurden keine Adressdaten erfunden.

## Auf IONOS hochladen

1. Alle Dateien und Ordner aus diesem Projekt in den gewünschten Webspace hochladen.
2. `index.html` muss im Root-Verzeichnis der Website liegen.
3. Die Ordnerstruktur (`css`, `js`, `assets`) unverändert beibehalten.
4. Prüfen, dass bei IONOS die Domain auf dieses Root-Verzeichnis zeigt.

Keine Node.js-Installation, kein Build und keine Datenbank sind erforderlich. Alle Pfade sind relativ und für klassisches IONOS-Webhosting geeignet.

## Dateistruktur

```text
/
├── index.html
├── impressum.html
├── datenschutz.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── favicon.svg
│   └── images/
│       ├── bad-segeberg.jpg
│       └── README.txt
└── README.md
```

## Datenschutz und Performance

- Keine Cookies oder Analytics
- Keine externen Fonts, CDNs oder Icon-Bibliotheken
- Keine Video- oder Bild-Downloads für das Hauptdesign
- Inline-SVG-Icons und reine CSS-Grafiken
- Respektiert `prefers-reduced-motion`
