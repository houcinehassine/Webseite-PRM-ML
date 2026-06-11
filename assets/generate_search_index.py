#!/usr/bin/env python3
"""
generate_search_index.py
────────────────────────
Liest alle HTML-Seiten der PRM-Website und erstellt search-index.json
für die clientseitige Fuse.js-Suche in search.html.

Verwendung:
    pip3 install beautifulsoup4
    python3 generate_search_index.py

Ausgabe: search-index.json  (im selben Ordner)
"""

import json
import os
import re
from pathlib import Path

try:
    from bs4 import BeautifulSoup, Tag
except ImportError:
    raise SystemExit("❌ beautifulsoup4 fehlt. Bitte: pip3 install beautifulsoup4")

# ──────────────────────────────────────────────────────────────
#  KONFIGURATION
# ──────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent.parent  # Projektroot (nicht assets/)

KAPITEL_NAMEN = {
    "Kapitel1": "K1 · Einführung ML",
    "Kapitel2": "K2 · Neuronale Netze",
    "Kapitel3": "K3 · Support Vector Machines",
    "Kapitel4": "K4 · Entscheidungsbäume & Ensemble",
    "Kapitel5": "K5 · Random Forest & Boosting",
    "Kapitel6": "K6 · Modellbewertung & Workflow",
    "Kapitel7": "K7 · Evaluation",
    "Aufgaben": "✏️ Aufgaben",
    "Python":   "🐍 Python-Referenz",
}

# Ordner, die zusätzlich zu den Kapitel-Ordnern indiziert werden
EXTRA_DIRS = {"Aufgaben", "Python"}

# Seiten die übersprungen werden (reine Übersichtsseiten ohne Sections)
SKIP_FILES = {"Kapitel1.html", "Kapitel2.html", "Kapitel3.html",
              "Kapitel4.html", "Kapitel5.html", "Kapitel6.html", "Kapitel7.html"}

# Signalwörter → Typ-Erkennung
CODE_SIGNALS    = re.compile(
    r'\b(sklearn|import|def |class |fit\(|predict\(|\.py|python|'
    r'numpy|pandas|matplotlib|torch|keras|pipeline|GridSearchCV|'
    r'RandomForest|SVC|KMeans|accuracy_score)\b', re.I)

FORMEL_SIGNALS  = re.compile(
    r'(\\frac|\\sum|\\prod|\\int|\\sigma|\\mu|\\theta|\\nabla|'
    r'E\s*=|P\s*\(|f\(x\)|argmin|argmax|∑|∫|∂|∝|≈|≤|≥)', re.I)

# ──────────────────────────────────────────────────────────────
#  HILFSFUNKTIONEN
# ──────────────────────────────────────────────────────────────

def clean_text(text: str, max_chars: int = 300) -> str:
    """Whitespace normalisieren und auf max_chars kürzen."""
    text = re.sub(r'\s+', ' ', text).strip()
    if len(text) > max_chars:
        text = text[:max_chars].rsplit(' ', 1)[0] + '…'
    return text


def detect_type(section_el: Tag) -> str:
    """Erkennt ob ein Abschnitt Code, Formel oder Konzept ist."""
    html = str(section_el)
    if section_el.find(['pre', 'code']):
        return 'code'
    if FORMEL_SIGNALS.search(html):
        return 'formel'
    if CODE_SIGNALS.search(html):
        return 'code'
    return 'konzept'


def extract_snippet(section_el: Tag, section_type: str) -> str:
    """Extrahiert einen kurzen Vorschautext je nach Typ."""
    if section_type == 'code':
        code = section_el.find('code') or section_el.find('pre')
        if code:
            return clean_text(code.get_text(), 200)
    # Erstes <p> oder <li> als Beschreibung
    for tag in section_el.find_all(['p', 'li'], limit=5):
        text = clean_text(tag.get_text(), 200)
        if len(text) > 30:
            return text
    return ''


_PY_STOPWORDS = {
    'True','False','None','import','from','class','def','for','while',
    'if','else','elif','try','except','finally','with','return','print',
    'range','len','self','args','kwargs','pass','raise','yield','lambda',
    'assert','break','continue','global','nonlocal','and','not','or','in',
    'type','list','dict','tuple','set','str','int','float','bool',
}
_PY_IDENT = re.compile(r'\b([a-z][a-z0-9_]{3,35})\b')

def extract_tags(section_el: Tag, title: str) -> list[str]:
    """Extrahiert relevante Schlüsselwörter als Tags."""
    tags = set()
    # Aus .key, .pill, .badge, .ref-name-Elementen
    for el in section_el.find_all(class_=re.compile(r'key|pill|badge|tag|ref-name|ref-mod', re.I)):
        t = el.get_text(strip=True)
        if 2 < len(t) < 50:
            tags.add(t)
    # Aus inline <code>-Elementen (kurze Tokens, nicht <pre>-Kinder)
    for el in section_el.find_all('code'):
        if el.find_parent('pre'):
            continue   # Nur inline-code, nicht Codeblock-Token
        t = el.get_text(strip=True)
        if 2 < len(t) < 40:
            tags.add(t)
    # Python-Identifier aus <pre><code>-Blöcken (API-Namen wie train_test_split)
    for pre in section_el.find_all('pre'):
        code_text = pre.get_text()
        for ident in _PY_IDENT.findall(code_text):
            if ident not in _PY_STOPWORDS and '_' in ident:
                tags.add(ident)
    # Titelwörter (Wörter > 4 Buchstaben)
    for word in re.findall(r'\b\w{5,}\b', title):
        tags.add(word)
    return sorted(tags)[:20]


def page_label(filename: str) -> str:
    """Lesbare Seitenbezeichnung aus Dateiname."""
    name = Path(filename).stem
    mapping = {
        'Kapitel1': 'Übersicht', 'Kapitel2': 'Übersicht',
        'Kapitel3': 'Übersicht', 'Kapitel4': 'Übersicht',
        'Kapitel5': 'Übersicht', 'Kapitel6': 'Übersicht',
        'Kapitel7': 'Übersicht',
        'Aufgaben': 'Übersicht', 'Python': 'Übersicht',
        'PageCheatsheet': 'Cheatsheet',
        'PageQuiz': 'Quiz',
        'Pagebeispiel': 'Praxisbeispiel',
        'Einführung': 'Einführung',
    }
    if name in mapping:
        return mapping[name]
    m = re.match(r'Aufgabenblatt(\d+)$', name)
    if m:
        return f"Blatt {m.group(1)}"
    m = re.match(r'Page(\d+)(?:_(\d+))?$', name)
    if m:
        return f"Seite {m.group(1)}" + (f".{m.group(2)}" if m.group(2) else "")
    return name


# ──────────────────────────────────────────────────────────────
#  HAUPT-INDEXIERUNG
# ──────────────────────────────────────────────────────────────

def index_file(html_path: Path, kapitel: str, base_url: str) -> list[dict]:
    """Indiziert eine einzelne HTML-Datei → Liste von Einträgen."""
    entries = []

    try:
        soup = BeautifulSoup(html_path.read_text(encoding='utf-8'), 'html.parser')
    except Exception as e:
        print(f"  ⚠️  Fehler beim Lesen von {html_path}: {e}")
        return []

    chapter_name = KAPITEL_NAMEN.get(kapitel, kapitel)
    page_name    = page_label(html_path.name)

    # ── Gesamte Seite als Einstiegspunkt (ohne Anker) ──────────
    page_title_el = soup.find('h1')
    page_title = clean_text(page_title_el.get_text()) if page_title_el else page_name

    # Pills aus der Hero-Section als Tags des Seiteneintrags sammeln
    hero_tags = []
    hero = soup.find('section', class_='hero')
    if hero:
        for el in hero.find_all(class_=re.compile(r'pill|key|badge|ref-name', re.I)):
            t = el.get_text(strip=True)
            if 2 < len(t) < 50:
                hero_tags.append(t)

    entries.append({
        "id":          f"{kapitel}/{html_path.name}",
        "chapter":     chapter_name,
        "page":        page_name,
        "title":       page_title,
        "description": f"{chapter_name} · {page_name}",
        "type":        "konzept",
        "url":         base_url,
        "anchor":      "",
        "tags":        sorted(set(hero_tags))[:20],
    })

    # ── Alle Sektionen mit ID ───────────────────────────────────
    for section in soup.find_all('section', id=True):
        sec_id    = section.get('id', '')
        if not sec_id or sec_id == 'main-content':
            continue

        # Überschrift der Sektion
        h_el = section.find(re.compile(r'^h[1-6]$'))
        title = clean_text(h_el.get_text()) if h_el else sec_id.replace('-', ' ').title()

        sec_type    = detect_type(section)
        snippet     = extract_snippet(section, sec_type)
        tags        = extract_tags(section, title)
        full_text   = clean_text(section.get_text(), 220)

        entries.append({
            "id":          f"{kapitel}/{html_path.name}#{sec_id}",
            "chapter":     chapter_name,
            "page":        page_name,
            "title":       title,
            "description": snippet,
            "text":        full_text,
            "type":        sec_type,
            "url":         base_url,
            "anchor":      f"#{sec_id}",
            "tags":        tags,
            "snippet":     snippet if sec_type == 'code' else "",
        })

    return entries


def main():
    index = []
    total_files = 0

    for kapitel_dir in sorted(ROOT.iterdir()):
        if not kapitel_dir.is_dir():
            continue
        if not (kapitel_dir.name.startswith('Kapitel') or kapitel_dir.name in EXTRA_DIRS):
            continue
        kapitel = kapitel_dir.name

        for html_file in sorted(kapitel_dir.glob('*.html')):
            if html_file.name in SKIP_FILES:
                continue

            # Relative URL für die Website
            rel_url = f"{kapitel}/{html_file.name}"
            entries = index_file(html_file, kapitel, rel_url)

            if entries:
                index.extend(entries)
                total_files += 1
                print(f"  ✓ {rel_url:50} {len(entries):3} Einträge")

    # Ausgabe JSON
    json_str = json.dumps(index, ensure_ascii=False, indent=2)
    out_json = ROOT / 'search-index.json'
    out_json.write_text(json_str, encoding='utf-8')

    # Ausgabe JS (für file://-Protokoll, kein fetch() nötig)
    out_js = ROOT / 'search-index.js'
    out_js.write_text(f'window.SEARCH_DATA = {json_str};', encoding='utf-8')

    print(f"\n{'─'*60}")
    print(f"✅ {len(index)} Einträge aus {total_files} Seiten → {out_json.name} + {out_js.name}")
    print(f"   Dateigröße: {out_json.stat().st_size / 1024:.1f} KB")


if __name__ == '__main__':
    main()
