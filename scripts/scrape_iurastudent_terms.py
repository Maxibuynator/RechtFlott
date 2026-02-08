"""Scrape nur die Definitionsnamen von iurastudent.de (keine Definitionen).

Die Seite nutzt Drupal Views mit AJAX-Paginierung.  Die eigentlichen
Buchstaben-Inhalte werden über POST an /views/ajax geladen.
"""
import csv
import json
import re
import time
import urllib.request
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# ── Area configs ─────────────────────────────────────────────────────
AREAS = {
    "Strafrecht": {
        "base_url": "https://www.iurastudent.de/definition-strafrecht",
        "view_name": "definition_strafrecht",
        "base_path": "definition-strafrecht",
    },
    "Zivilrecht": {
        "base_url": "https://www.iurastudent.de/definition-zivilrecht",
        "view_name": "definition_zivilrecht",
        "base_path": "definition-zivilrecht",
    },
    "Öffentliches Recht": {
        "base_url": "https://www.iurastudent.de/definition-oeffentliches-recht",
        "view_name": "definition_oeffrecht",
        "base_path": "definition-oeffentliches-recht",
    },
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
}

AJAX_URL = "https://www.iurastudent.de/views/ajax"

DEF_LINK_RE = re.compile(
    r'href="(/definition/[^"]*)"[^>]*>\s*([^<]+?)\s*</a>',
    re.IGNORECASE,
)

# Map URL-encoded umlaut path segments to the plain view_args letter
UMLAUT_MAP = {"%C3%A4": "a", "%C3%B6": "o", "%C3%BC": "u"}


def fetch_page(url: str) -> str:
    """Simple GET fetch."""
    req = urllib.request.Request(url, headers={"User-Agent": HEADERS["User-Agent"]})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  ⚠  {e}")
        return ""


def discover_letters(html: str, base_path: str) -> list[str]:
    """Extract available letter (view_args) values from the glossary nav."""
    pat = re.compile(r'href="/' + re.escape(base_path) + r'/([^"?]+)"')
    raw = pat.findall(html)
    seen: set[str] = set()
    letters: list[str] = []
    for seg in raw:
        # URL segment → view_args: decode percent-encoded umlauts
        arg = UMLAUT_MAP.get(seg, seg).strip()
        if arg and arg not in seen and len(arg) == 1 and arg.isalpha():
            seen.add(arg)
            letters.append(arg)
    return sorted(letters)


def ajax_fetch(view_name: str, base_path: str, dom_id: str,
               letter: str, page: int) -> str:
    """POST to Drupal views/ajax and return the inserted HTML fragment."""
    data = urllib.parse.urlencode({
        "view_name": view_name,
        "view_display_id": "block_1",
        "view_args": letter,
        "view_path": f"{base_path}/{letter}",
        "view_base_path": base_path,
        "view_dom_id": dom_id,
        "pager_element": "0",
        "page": str(page),
    }).encode("utf-8")
    req = urllib.request.Request(AJAX_URL, data=data, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read().decode("utf-8", errors="replace")
        for cmd in json.loads(raw):
            if cmd.get("command") == "insert" and cmd.get("data"):
                return cmd["data"]
    except Exception as e:
        print(f"  ⚠  AJAX error: {e}")
    return ""


def scrape_letter(view_name: str, base_path: str, dom_id: str,
                  letter: str) -> list[str]:
    """Scrape all pages for one letter via AJAX, return definition names."""
    terms: list[str] = []
    page = 0
    while True:
        html = ajax_fetch(view_name, base_path, dom_id, letter, page)
        if not html:
            break
        found = DEF_LINK_RE.findall(html)
        new_terms = [
            name.strip()
            for _href, name in found
            if name.strip()
            and name.strip().upper() != "ZUR DEFINITION"
            and not name.strip().startswith("DEFINITION")
            and len(name.strip()) > 1
        ]
        if not new_terms:
            break
        terms.extend(new_terms)
        if f"?page={page + 1}" in html:
            page += 1
            time.sleep(0.3)
        else:
            break
    return terms


def main():
    all_terms: list[tuple[str, str]] = []

    for area, cfg in AREAS.items():
        print(f"\n{'='*50}")
        print(f"  {area}")
        print(f"{'='*50}")

        # Fetch area landing page to discover letters + dom_id
        landing = fetch_page(cfg["base_url"])
        if not landing:
            print("  ⚠  Konnte Startseite nicht laden")
            continue

        # Extract view_dom_id (changes per session)
        dom_match = re.search(r'"view_dom_id":"([^"]+)"', landing)
        dom_id = dom_match.group(1) if dom_match else ""
        if not dom_id:
            print("  ⚠  view_dom_id nicht gefunden")
            continue

        letters = discover_letters(landing, cfg["base_path"])
        print(f"  Buchstaben: {', '.join(l.upper() for l in letters)}")

        area_count = 0
        for letter in letters:
            terms = scrape_letter(cfg["view_name"], cfg["base_path"],
                                  dom_id, letter)
            if terms:
                print(f"  {letter.upper()}: {len(terms)} Begriffe")
                for t in terms:
                    all_terms.append((area, t))
                area_count += len(terms)
            time.sleep(0.3)
        print(f"  -> {area_count} gesamt")

    # Deduplicate within each area
    seen: set[tuple[str, str]] = set()
    unique: list[tuple[str, str]] = []
    for area, term in all_terms:
        key = (area, term.lower())
        if key not in seen:
            seen.add(key)
            unique.append((area, term))

    # Write CSV
    out = ROOT / "iurastudent_terms.csv"
    with open(out, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["Rechtsgebiet", "Begriff"])
        for area, term in unique:
            w.writerow([area, term])

    print(f"\n✅ {len(unique)} Begriffe → {out.name}")


if __name__ == "__main__":
    main()
