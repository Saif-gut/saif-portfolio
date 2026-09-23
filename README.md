# Portfolio-Website von Saif Aldien

Statische, responsive Single-Page-Portfolio-Website für die Suche nach einem Ausbildungsplatz im IT-Bereich. Das Projekt verwendet ausschließlich HTML, CSS und Vanilla JavaScript. Es gibt kein Build-System und keine externen Laufzeitabhängigkeiten.

## Website lokal öffnen

Die Datei `index.html` per Doppelklick in einem aktuellen Browser öffnen. Die Website funktioniert direkt über das lokale `file://`-Protokoll.

Alternativ kann für lokale Tests ein einfacher statischer Server genutzt werden. Das ist optional und für die Veröffentlichung nicht notwendig.

## Inhalte anpassen

Die wichtigsten Angaben lassen sich an folgenden Stellen anpassen:

- `saifaldienabbud@gmail.com`: in `index.html`, `impressum.html` und `datenschutz.html`
- `https://github.com/Saif-gut`: in `index.html`
- `Ab 2027`: in der Ausbildungs-Section von `index.html`
- `Deutschland`: Standortangaben in `index.html`
- `[ADRESSE EINTRAGEN]` und ähnliche markierte Felder: in den rechtlichen Seiten

## Social-Media-Vorschaubild

Titel und Beschreibung stehen im `<head>` von `index.html`. Ein Vorschaubild und eine Canonical-URL können mit der tatsächlichen öffentlichen Domain ergänzt werden. Nicht vorhandene Bilder oder Platzhalter-Domains werden nicht verlinkt.

## Projekte

Der Bereich „Meine Projekte“ bündelt alle Projekte an einer Stelle, einschließlich Bot-Projekt und Jarvis Dashboard. Die Kategorien lassen sich direkt auf der Seite filtern. Die Seite verweist ausschließlich auf vorhandene GitHub-Repositories:

- [Jarvis Dashboard](https://github.com/Saif-gut/jarvis-dashboard)
- [Jarvis Assistant](https://github.com/Saif-gut/Jarvis-assistant)
- [Last Letter Club](https://github.com/Saif-gut/last-letter-club)
- [Bubble Pop Game](https://github.com/Saif-gut/bubble-pop-game)
- [KI-Ausbildungs-Assistent](https://github.com/Saif-gut/ki-ausbildungs-assistent)
- [Java-Lagerverwaltung](https://github.com/Saif-gut/java-lagerverwaltung)
- [Portfolio Website](https://github.com/Saif-gut/saif-portfolio)

Die Projektkarten verwenden kleine CSS-Illustrationen und verlinken den Quellcode direkt. Echte Screenshots können später ergänzt werden; Hinweise stehen in [`assets/projects/README.md`](assets/projects/README.md). Es werden keine nicht vorhandenen Bilder geladen.

## Gestaltung und Bedienung

- Dark Theme mit warmem Goldakzent und lokalen Systemschriften
- Großes Code-Fenster, kompakte Abschnitte und ein ruhiger Kenntnisbereich
- Acht Navigationspunkte; „Ausbildung“ bleibt erhalten, „Jarvis Dashboard“ ist kein Navigationspunkt
- Projektfilter, aufklappbare Details und Tastaturbedienung
- Ohne JavaScript bleiben alle Inhalte und die mobile Navigation zugänglich
- Keine Scroll-Einblendeanimationen; reduzierte Bewegung wird berücksichtigt

Die Darstellung wurde in Edge/Chromium bei 320, 390, 568, 768, 1024, 1440 und 1920 Pixeln Breite geprüft, einschließlich Navigation, Filtern, Projekt-Details und rechtlichen Seiten.

### Jarvis Dashboard

Ich habe ein lokales persönliches IT-Dashboard mit React, TypeScript, Python und FastAPI vollständig umgesetzt.

Das Projekt zeigt echte lokale Systeminformationen, enthält Funktionen für Aufgaben und Notizen, integriert Wetterdaten und ist mit Jarvis verbunden.

Dabei habe ich Frontend und Backend miteinander verbunden, lokale APIs genutzt, Systemdaten verarbeitet und verschiedene Funktionen zu einer vollständigen Anwendung zusammengeführt.

**Status: Fertiggestellt**

### Bot-Projekt

Ich habe meinen ersten eigenen Bot vollständig entwickelt.

Dabei habe ich unter anderem gelernt:

- Programmierlogik
- strukturiertes Arbeiten
- Problemlösung
- Testen und Verbessern
- den praktischen Einsatz von Codex

Das Projekt ist abgeschlossen.

**Status: Fertiggestellt**

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
