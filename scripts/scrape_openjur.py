"""
Scrape juristische Abkürzungen von openjur.de/s/abkuerzungen.html
and write them to jur_abkuerzungen_final.csv
"""
import urllib.request
import re
import csv
import os

URL = "https://openjur.de/s/abkuerzungen.html"
OUTPUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "jur_abkuerzungen_final.csv")

def fetch_page(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8")

def parse_abbreviations(html):
    """Parse <li><b>ABBR</b> Description</li> patterns from the HTML."""
    entries = []
    
    # Pattern: <li> with <b> or <strong> tag containing abbreviation, followed by description
    # openjur uses: <li><b>Abs.</b> Absatz</li>  or variations
    patterns = [
        # <li><b>abbr</b> description</li>
        r'<li[^>]*>\s*<b>([^<]+)</b>\s*([^<]+?)(?:</li>|<)',
        # <li><strong>abbr</strong> description</li>
        r'<li[^>]*>\s*<strong>([^<]+)</strong>\s*([^<]+?)(?:</li>|<)',
    ]
    
    for pattern in patterns:
        for match in re.finditer(pattern, html, re.DOTALL):
            abbr = match.group(1).strip()
            desc = match.group(2).strip()
            if abbr and desc and len(abbr) < 30 and len(desc) > 1:
                # Clean up
                abbr = re.sub(r'\s+', ' ', abbr).strip()
                desc = re.sub(r'\s+', ' ', desc).strip()
                # Remove trailing punctuation artifacts
                desc = desc.rstrip(',;.')
                if desc:
                    entries.append((desc, abbr))
    
    # If the above didn't work well, try a more general pattern
    if len(entries) < 20:
        # Try: ** abbr ** description (markdown-like from pre-rendered)
        for match in re.finditer(r'\*\*\s*([^*]+?)\s*\*\*\s*([^\n*]+)', html):
            abbr = match.group(1).strip()
            desc = match.group(2).strip()
            if abbr and desc and len(abbr) < 30 and len(desc) > 1:
                entries.append((desc, abbr))
    
    return entries

def deduplicate(entries):
    """Remove duplicates, prefer shorter abbreviation."""
    seen = {}
    for desc, abbr in entries:
        key = abbr.lower().replace(" ", "")
        if key not in seen:
            seen[key] = (desc, abbr)
    return list(seen.values())

def main():
    print(f"Fetching {URL}...")
    html = fetch_page(URL)
    print(f"Page size: {len(html)} bytes")
    
    entries = parse_abbreviations(html)
    entries = deduplicate(entries)
    
    # Sort by abbreviation
    entries.sort(key=lambda x: x[1].lower())
    
    print(f"Found {len(entries)} abbreviations")
    
    # Preview
    for desc, abbr in entries[:10]:
        print(f"  {abbr} = {desc}")
    print("  ...")
    
    # Write CSV
    with open(OUTPUT, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f, delimiter=";")
        writer.writerow(["Begriff", "Abkürzung"])
        for desc, abbr in entries:
            writer.writerow([desc, abbr])
    
    print(f"\nGeschrieben: {OUTPUT}")
    print(f"Gesamt: {len(entries)} Einträge")

if __name__ == "__main__":
    main()
