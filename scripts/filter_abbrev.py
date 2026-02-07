"""
Smart abbreviation filter for jur_abkuerzungen_final.csv.
Keeps only entries where the abbreviation is actually derived from the term.
"""
import csv, re, sys, os

INPUT = os.path.join(os.path.dirname(__file__), "..", "jur_abkuerzungen_final.csv")
OUTPUT = os.path.join(os.path.dirname(__file__), "..", "jur_abkuerzungen_clean.csv")
REJECTED = os.path.join(os.path.dirname(__file__), "..", "jur_abkuerzungen_rejected.csv")

STOP_WORDS = {
    "der", "die", "das", "des", "dem", "den", "ein", "eine", "eines", "einem",
    "einen", "einer", "und", "oder", "für", "von", "vom", "zum", "zur", "am",
    "an", "auf", "aus", "bei", "bis", "durch", "gegen", "in", "im", "mit",
    "nach", "über", "um", "unter", "vor", "zu", "zwischen", "sowie",
    "the", "of", "for", "and", "on", "at", "by", "to", "a", "an",
}

# Well-known correct abbreviations (whitelist)
WHITELIST = {
    "AktG", "AO", "ArbGG", "ATDG", "AsylbLG", "AuslG", "AZO",
    "BAG", "BauGB", "BayBO", "BBG", "BBiG", "BDSG", "BeamtVG", "BetrAVG",
    "BGB", "BGH", "BGG", "BImSchG", "BKA", "BKAG", "BKGG",
    "BNotO", "BPolG", "BPolBG", "BRKG", "BUrlG", "BUKG",
    "BVerfG", "BVerfGG", "BVerwG", "BTHG", "BtM", "BZR", "BZSt",
    "DDG", "DNA-IFG", "DSGVO",
    "EGStPO", "EnEG", "EnEV", "ErbStG", "EStG",
    "FamFG", "FamRZ", "FGO", "FGB",
    "GBO", "GEG", "GewO", "GewStG", "GG", "GmbH", "GOI", "GrEStG", "GrdstVG",
    "GVG", "GWB",
    "HGB", "HRV",
    "IFG", "IfSG", "InsO", "InsVV", "InvG", "IRG",
    "JGG", "JGH", "JVEG", "JZ",
    "KapMuG", "KG", "KHG", "KHEntgG", "KO", "KonTraG", "KSchG", "KStG", "KUG", "KWG",
    "LBG", "LBO", "LEPro", "LPartG",
    "MiLoG", "MoMiG",
    "NBauO", "NetzDG", "NJW",
    "OEG", "OWiG",
    "PAG", "PartGG", "PfandBG", "PKH", "PQsG",
    "RBEG", "ROG", "RPflG", "RVO",
    "SGB", "SGG", "SpruchG", "StBerG", "StGB", "StPO", "StUG", "StVG", "StVO",
    "TKG", "TPG", "TzBfG",
    "UKlaG", "UmwG", "UrhG", "UWG", "UZwG",
    "VGG", "VStGB", "VVG", "VwGO", "VwVfG", "VwVG",
    "WoGG", "WoFlV", "WpHG",
    "ZPO", "ZVG", "ZerlG",
    # Entscheidungssammlungen
    "BAGE", "BFHE", "BGHZ", "BSGE", "BVerwGE", "BGHSt",
    # Zeitschriften
    "NZA", "NZG", "NZM", "NZS", "NZI", "NStZ-RR", "ZFA", "ZHR", "ZInsO",
    "ZMR", "ZZP", "JA", "JuS", "AuA", "AuR", "AiB",
    # Institutionen
    "BAMF", "BfV", "DPMA",
    "FG", "SG", "OLG", "OFD",
    "DRV", "GKV", "PKV",
    # Sonstige geläufige
    "AFG", "AVAVG", "AVD", "BDA", "BDO",
    "BMV", "BPflV", "BRRG", "BVFG",
    "CCC", "EBI", "EHUG",
    "EPO", "ESUG", "EW",
    "FlugDaG", "FPersV", "FZulG",
    "GAD", "GBV", "GKSt", "GLZ",
    "GVO", "HGO",
    "IRWAZ", "IFD",
    "KBR", "KVB", "KVdR", "KVdS",
    "LiqV", "LRA", "LWV",
    "MBE", "MEPolG", "MESTA", "MfS",
    "NGO", "NLO",
    "PAngV", "ParlBG", "PDV",
    "RAO", "RED-G", "RNOG", "ROHG", "RSV",
    "SEStEG", "SGBM", "SPV", "StHBG",
    "TGV", "UKS", "UVMG",
    "VBI", "VKNR", "VZ",
    "WahlPrG", "WfbM", "WoBindG", "WoP", "WVO",
    "ZAR", "ZSchG", "ZfA", "ZfF", "ZfRSoz",
}

def initials_match(term: str, abbr: str) -> bool:
    """Check if abbreviation can be derived from first letters of significant words."""
    words = term.replace("-", " ").replace("(", " ").replace(")", " ").split()
    significant = [w for w in words if w.lower() not in STOP_WORDS and len(w) > 1]
    if not significant:
        return False
    
    # Strategy 1: First letters of significant words
    first_letters = "".join(w[0] for w in significant)
    clean_abbr = re.sub(r'[^A-Za-zÄÖÜäöüß]', '', abbr)
    if clean_abbr.upper() == first_letters.upper():
        return True
    
    # Strategy 2: Partial prefix match (at least 60% of abbr letters match)
    fl_upper = first_letters.upper()
    ca_upper = clean_abbr.upper()
    if len(ca_upper) >= 2 and len(fl_upper) >= 2:
        # Check if abbr is a subsequence of first_letters
        i, j = 0, 0
        while i < len(ca_upper) and j < len(fl_upper):
            if ca_upper[i] == fl_upper[j]:
                i += 1
            j += 1
        if i >= len(ca_upper) * 0.6:
            return True
    
    # Strategy 3: Abbreviation is a clear prefix/suffix of the term
    term_no_spaces = term.replace(" ", "").replace("-", "")
    if len(clean_abbr) >= 3 and clean_abbr in term_no_spaces:
        return True
    
    # Strategy 4: German compound word abbreviations (e.g. Grundgesetz -> GG)
    if len(significant) == 1 and len(clean_abbr) >= 2:
        word = significant[0]
        # Check syllable-based: GG from Grundgesetz
        uppers = [c for c in word if c.isupper()]
        if len(uppers) >= 2 and "".join(uppers) == clean_abbr:
            return True
        # Check repeated first letter for compound words
        parts = re.findall(r'[A-ZÄÖÜ][a-zäöüß]+', word)
        if parts:
            compound_initials = "".join(p[0] for p in parts)
            if compound_initials.upper() == clean_abbr.upper():
                return True
    
    return False

def is_bad_pattern(term: str, abbr: str) -> bool:
    """Detect obviously wrong entries."""
    # Person names
    if re.match(r'^[A-Z][a-z]+ [A-Z][a-z]+$', term):
        return True
    # Abbreviation is clearly an unrelated well-known acronym used as "source"
    source_tags = {"SPD", "CDU", "CSU", "FDP", "UN", "UNO", "EU", "USA", "NATO", "WHO", "IMO", "ICC", "WTO"}
    if abbr.strip() in source_tags and not initials_match(term, abbr):
        return True
    # Court decisions / Urteile (these map to the court, not abbreviation)
    if re.search(r'(Urteil|Entscheidung|Beschluss|Doktrin|Fall|Affäre)\b', term) and not initials_match(term, abbr):
        return True
    # Geographic entries
    if re.match(r'^(Baden-Württemberg|Nordrhein-Westfalen|Südafrika|Bayern)$', term):
        return True
    return False

def main():
    rows = []
    with open(INPUT, encoding="utf-8-sig") as f:
        reader = csv.reader(f, delimiter=";")
        header = next(reader)
        for row in reader:
            if len(row) >= 2:
                rows.append((row[0].strip(), row[1].strip()))

    clean = []
    rejected = []

    for term, abbr in rows:
        if not term or not abbr:
            rejected.append((term, abbr, "leer"))
            continue
        
        if abbr in WHITELIST:
            clean.append((term, abbr))
            continue
        
        if is_bad_pattern(term, abbr):
            rejected.append((term, abbr, "bad_pattern"))
            continue
        
        if initials_match(term, abbr):
            clean.append((term, abbr))
            continue
        
        # If we can't verify it, reject it (conservative approach)
        rejected.append((term, abbr, "no_match"))

    # Write clean CSV
    with open(OUTPUT, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f, delimiter=";")
        writer.writerow(["Begriff", "Abkürzung"])
        for term, abbr in clean:
            writer.writerow([term, abbr])

    # Write rejected CSV for review
    with open(REJECTED, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f, delimiter=";")
        writer.writerow(["Begriff", "Abkürzung", "Grund"])
        for term, abbr, reason in rejected:
            writer.writerow([term, abbr, reason])

    print(f"Ergebnis: {len(clean)} behalten, {len(rejected)} aussortiert")
    print(f"Clean: {OUTPUT}")
    print(f"Rejected: {REJECTED}")

if __name__ == "__main__":
    main()
