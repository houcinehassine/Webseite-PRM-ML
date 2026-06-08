# CLAUDE.md – Projektkonventionen

## Projekt
Statische HTML-Website zur PRM-Prüfungsvorbereitung (Maschinelles Lernen).
7 Kapitel, je mit Übersichtsseite, Lernseiten, Cheatsheet und Quiz.

## Git-Workflow

**Immer Feature-Branches verwenden** – nie direkt auf `main` committen.

```bash
# Zu Beginn jeder Session: neuen Branch erstellen
git checkout -b feature/beschreibung-der-aenderung

# Am Ende: push + PR öffnen
git push -u origin feature/beschreibung-der-aenderung
gh pr create --base main --title "..." --body "..."
```

Beispiel-Branch-Namen:
- `feature/footer-webcomponent`
- `refactor/quiz-css-cleanup`
- `fix/k4-quiz-accordion`

## Architektur

- **Web Components**: `header.js`, `sidebar.js`, `footer.js` (root-Ebene)
  - `<site-header active="pageX" title="...">` — Navigation + Sidebar
  - `<site-footer caption="...">` — Footer mit Seitentext
- **CSS-Struktur**:
  - `assets/style.css` — globale Basis (Design-Tokens, Layout, Komponenten)
  - `assets/quiz.css` — gemeinsame Quiz-Styles (K4, K7; K2 nutzt eigenes System)
  - `assets/kapitel-overview.css` — Kapitel-Übersichtsseiten
  - Seitenspezifische Styles → **inline `<style>`** in der jeweiligen HTML-Datei
  - Keine Kapitel-eigene `style.css` mehr (K1, K2, K6 gelöscht; K4 hat noch eine für `.examples-grid`)

## Quiz-Systeme (4 Varianten)

| Kapitel | System | Klassen |
|---------|--------|---------|
| K1 | Statisch (kein JS) | — |
| K2 | JS-Karteikarten | `.quiz-card`, `.correct`/`.wrong` |
| K4 | Details-Accordion + SVG-Pfeil | `details.frage`, `.badge`, `.quiz-q-num` |
| K7 | Details-Accordion + CSS-Dreieck | `details.frage`, `.badge` |

## iCloud Drive – Wichtig

Das Projekt liegt auf iCloud Drive. Kleine/leere Dateien können nach Commits
vom System entfernt werden. Bei `deleted`-Fehlern in `git status`:
```bash
git checkout -- <datei>  # oder Datei neu erstellen und nochmals committen
```

## Wichtige Befehle

```bash
# Status prüfen
git status && git log --oneline -5

# Python-Script für Bulk-HTML-Änderungen
python3 -c "
import os, re
# ...
"
```
