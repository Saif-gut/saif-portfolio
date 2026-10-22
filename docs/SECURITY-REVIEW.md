# Sicherheits- und Hostingprüfung · 22. Oktober 2026

## Ergebnis

Die bestehende öffentliche Website hat Vorrang. Die Repository-Sichtbarkeit wurde nicht geändert, weil der tatsächliche GitHub-Tarif und die privaten Pages-Einstellungen mit den verfügbaren Zugriffswegen nicht verifiziert werden können. Es wurden keine kostenpflichtigen Dienste gebucht und keine DNS-Einträge verändert.

## Beobachteter Ausgangszustand

- Repository: `Saif-gut/saif-portfolio`, öffentlich, Standardbranch `main`.
- Gesicherter Ausgangscommit: `0f99ffe3d7d013b6fc7a8b57f33477dce4539370`.
- Vollständige lokale Git-Sicherung sowie separater GitHub-Backupbranch `backup/before-2026-10-22`.
- `CNAME`: `abbud.de`; bleibt unverändert.
- Dynamischer GitHub-Pages-Build auf `main`, letzter bestehender Lauf erfolgreich.
- `_config.yml` und vorherige Dokumentation belegen Veröffentlichung aus dem Repository-Root. Die authentifizierte Pages-Einstellung selbst ist nicht zugänglich.
- Vor Änderung: `https://abbud.de` antwortet mit 200; `https://www.abbud.de` leitet mit 301 auf die Hauptdomain und endet mit 200.
- HTTPS-Aufrufe ohne Abschalten der Zertifikatsvalidierung erfolgreich. Keine gesonderte Origin-Zertifikatslaufzeit gemessen.
- `main` ist laut Branch-API nicht geschützt. Eine Schutzregel kann über die verfügbaren GitHub-Funktionen nicht eingerichtet werden.

## Grenzen des administrativen Zugriffs

Die GitHub-Verbindung kann Dateien, Branches und Commits bearbeiten. Tarif, Pages-Administration, Repository-Sichtbarkeit, Actions-Secrets, Push Protection und branchbezogene Admin-Regeln sind damit nicht verfügbar. Die Einstellungen im Browser benötigen eine separate Anmeldung. Das öffentliche Pages-API-Read ergibt 404 und ist kein Nachweis, dass Pages deaktiviert wäre.

## Prüfung auf sensible Inhalte

`npm run audit:secrets` prüft sämtliche erreichbaren Git-Commits sowie den aktuellen Arbeitsstand. Es werden nur Pfade, Fundarten, Zeilenpositionen und Commit-Kürzel ausgegeben, niemals Geheimniswerte.

Geprüfte Muster: GitHub- und Slack-Tokens, verbreitete KI-/Cloud-API-Keys, private Schlüssel, JWTs, Zugangsdaten in Datenbank-URLs und zugewiesene Passwort-/Tokenwerte. Dateinamenprüfung auf echte `.env`-Dateien, Schlüsseldateien, Datenbanken und Sicherungsarchive.

Ausgangshistorie: **20 Commits, 68 unterschiedliche historische Blobs**. Keine Zugangsdatenmuster in den lesbaren Textversionen gefunden. Das ist eine musterbasierte Prüfung, keine Garantie gegen beliebige, verschleierte oder nicht lesbare Geheimnisse.

### Offener Befund: altes Archiv

- Pfad: `saif-portfolio-latest-source.zip`.
- Historischer Commit: `6098b33f4d71`.
- Nicht im aktuellen Dateibaum, aber weiterhin über die öffentliche Git-Historie abrufbar.
- 15.009 Bytes; beginnt mit ZIP-Signatur, hat aber kein gültiges Endverzeichnis. Python `zipfile` kann es nicht öffnen.
- Eine zusätzliche Prüfung der lokalen ZIP-Header konnte README, Impressum, Datenschutz und Ignore-Datei mit gültigen CRC-Prüfsummen wiederherstellen und ohne Zugangsdatenmuster prüfen. Der komprimierte Index-Eintrag ist beschädigt; das Archiv konnte deshalb weiterhin nicht vollständig geprüft werden. Keine Bestätigung eines echten Secret-Leaks.
- Maßnahme: ursprüngliches intaktes Archiv beschaffen und prüfen. Falls Zugangsdaten enthalten waren: zuerst beim Anbieter widerrufen/rotieren. Eine spätere gezielte Historienbereinigung muss separat vorbereitet werden; keine ungeprüfte Force-Push-Aktion im Bewerbungsportfolio.

## Umgesetzte Absicherung

- Ignore-Regeln um lokale Konfiguration, Datenbanken, Schlüsselcontainer und Backup-/Archivformate ergänzt.
- Explizite Veröffentlichungsliste des statischen Builds beibehalten. Keine Dokumentation, Testausgaben, Sicherungen oder Konfigurationen im Website-Paket.
- Content Security Policy auf den drei öffentlichen HTML-Seiten: ausschließlich lokale Ressourcen, keine Objekte, keine Formübermittlung, keine externen Verbindungen im Portfolio.
- Referrer Policy ergänzt; keine externen Fonts, Analytics, CDNs oder eingebetteten Dienste.
- Jarvis-Assistent und Portfolio-Quellcode werden nicht mehr direkt aus den Projekttexten verlinkt.
- CI vorbereitet: `contents: read`, keine Secrets, kein privilegierter `pull_request_target`-Trigger, Checkout ohne gespeicherte Credentials, begrenzte Laufzeit, Actions auf verifizierte Commit-SHAs festgelegt.
- Dependabot-Konfiguration für npm und GitHub Actions, plus eine Sicherheitsmeldeanleitung.
- npm-Abhängigkeiten bei der lokalen Prüfung ohne bekannte Schwachstellen.

Die neuen Workflowdateien wurden auf dem Prüfbranch erfolgreich aktiviert. Lauf 39806242869 bestand Build, npm-Audit, Secret-Scan und alle 15 Browsertests. Auch der abschließende Prüfbranch-Lauf 39806775478, die Hauptbranch-Prüfung 39807265466 und das Pages-Deployment 39807265459 waren erfolgreich. Die Domainprüfung bestätigte beide HTTPS-Adressen und bytegenaue Übereinstimmung sämtlicher Website-Dateien.

## Sichere Wege zu privaten Quellen

GitHub Pages unterstützt private Quell-Repositories mit GitHub Pro/Team/Enterprise, unter GitHub Free nur öffentliche Quellen. Quelle: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

1. **Bestehender unterstützter Tarif:** Tarif und Pages-Konfiguration authentifiziert prüfen, dann Sichtbarkeit ändern und beide Domains erneut kontrollieren. Keine Tarifbuchung automatisch vornehmen.
2. **Kostenlose Trennung:** Privates Quell-Repository und separates öffentliches Repository ausschließlich für das geprüfte Veröffentlichungspaket. Vor dem Wechsel muss das neue Pages-Deployment funktionieren. Die Zuordnung der bestehenden Domain muss kontrolliert und mit Rückweg geändert werden; bestehende DNS-Einträge können bei gleichem GitHub-Account gegebenenfalls erhalten bleiben. Mit dem aktuellen Admin-Zugriff nicht umsetzbar.
3. **Anderes Hosting:** Nur nach Prüfung eines privaten Git-Zugriffs und eines klaren Domain-/Rollbackplans. Für diesen Auftrag weder notwendig noch eingerichtet.

An den Browser gelieferte HTML-, CSS- und JavaScript-Dateien sowie Bilder bleiben öffentlich einsehbar. Privatstellung schützt zusätzliche Quelldateien und Historie, macht aber die ausgelieferte Website nicht geheim.

## Wiederherstellung

Der alte Commit und der Backupbranch bleiben erhalten. Bei einem fehlgeschlagenen Deployment kann ein normaler Revert-Commit den vorherigen Website-Dateistand wiederherstellen. Sichtbarkeit, Domain und DNS wurden nicht verändert und benötigen daher keinen Rückbau.
