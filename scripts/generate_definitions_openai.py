"""Generiert juristische Definitionen via OpenAI API.

Liest alle_begriffe.csv und erzeugt alle_begriffe_mit_definitionen.csv.
Bereits definierte Begriffe werden übersprungen (Resume-fähig).

Nutzung:
    python scripts/generate_definitions_openai.py              # normal
    python scripts/generate_definitions_openai.py --dry-run    # Test ohne API
    python scripts/generate_definitions_openai.py --batch 50   # nur 50 Begriffe
    python scripts/generate_definitions_openai.py --limit 2.00 # max 2 € Kosten
"""
import csv
import os
import sys
import time
import argparse
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI, RateLimitError, APITimeoutError, APIConnectionError

# ── Pfade ────────────────────────────────────────────────────────────
ROOT = Path(__file__).resolve().parent.parent
INPUT_CSV = ROOT / "alle_begriffe.csv"
OUTPUT_CSV = ROOT / "alle_begriffe_mit_definitionen.csv"
ENV_FILE = ROOT / ".env"

# ── Konfiguration ────────────────────────────────────────────────────
MODEL = "gpt-5-nano"
MAX_RETRIES = 3
RETRY_DELAY = 5        # Sekunden zwischen Retries
REQUEST_DELAY = 0.15   # Sekunden zwischen Anfragen (Rate-Limit-Schutz)

# Preise pro 1M Tokens (USD) – anpassen falls nötig
# https://platform.openai.com/docs/pricing
PRICE_INPUT_PER_M = 0.10    # gpt-5-nano input
PRICE_OUTPUT_PER_M = 0.40   # gpt-5-nano output

SYSTEM_PROMPT = """\
Du bist ein juristischer Fachlexikon-Autor für deutsche Jurastudierende.

Aufgabe: Formuliere eine präzise Definition des gegebenen juristischen Begriffs \
auf Deutsch, wie sie in einem Jura-Lehrbuch oder einer Falllösung im \
Gutachtenstil stehen würde.

Regeln:
- Verwende präzise juristische Fachsprache wie in Standardlehrbüchern \
(Medicus, Wessels/Beulke, Maurer)
- Die Definition muss gutachtenstil-tauglich sein, also als Obersatz \
in einer Klausur verwendbar
- Schreibe ausschließlich in reinem Fließtext, keine Aufzählungen, \
keine Spiegelstriche, keine Nummerierungen, keine Überschriften, \
kein Markdown
- Vermeide Semikolons, Doppelpunkte als Trennzeichen und Klammerzusätze \
wo möglich
- 1 bis 3 Sätze, maximal 350 Zeichen
- Beginne direkt mit der Definition, ohne den Begriff zu wiederholen \
und ohne einleitende Floskeln wie "Unter ... versteht man"
- Der Text muss sich flüssig am Stück tippen lassen\
"""


def parse_args():
    p = argparse.ArgumentParser(description="Definitionen via OpenAI generieren")
    p.add_argument("--dry-run", action="store_true",
                   help="Testlauf ohne API-Aufrufe (fügt Platzhalter ein)")
    p.add_argument("--batch", type=int, default=0,
                   help="Nur N Begriffe verarbeiten (0 = alle)")
    p.add_argument("--model", type=str, default=MODEL,
                   help=f"OpenAI-Modell (Standard: {MODEL})")
    p.add_argument("--limit", type=float, default=5.0,
                   help="Kosten-Limit in USD (Standard: 5.00$)")
    return p.parse_args()


# ── Token-/Kosten-Tracker ────────────────────────────────────────────
class CostTracker:
    def __init__(self, price_in: float, price_out: float, limit: float):
        self.price_in = price_in
        self.price_out = price_out
        self.limit = limit
        self.total_input = 0
        self.total_output = 0    # output text tokens
        self.total_reasoning = 0  # reasoning tokens (intern)

    def add_responses(self, usage) -> None:
        """Token-Tracking für die Responses-API (ResponseUsage)."""
        self.total_input += usage.input_tokens
        od = getattr(usage, "output_tokens_details", None)
        reasoning = getattr(od, "reasoning_tokens", 0) if od else 0
        self.total_reasoning += reasoning
        self.total_output += usage.output_tokens - reasoning

    @property
    def cost_usd(self) -> float:
        # Reasoning tokens count as output tokens for billing
        out_total = self.total_output + self.total_reasoning
        return (self.total_input * self.price_in +
                out_total * self.price_out) / 1_000_000

    @property
    def over_limit(self) -> bool:
        return self.cost_usd >= self.limit

    def summary(self) -> str:
        lines = [
            f"  💰 Kosten: ${self.cost_usd:.4f} / ${self.limit:.2f} Limit",
            f"     Input:     {self.total_input:>8,} Tokens",
            f"     Reasoning: {self.total_reasoning:>8,} Tokens",
            f"     Output:    {self.total_output:>8,} Tokens",
        ]
        return "\n".join(lines)


def load_input() -> list[tuple[str, str]]:
    """Liest (Rechtsgebiet, Begriff) aus der Eingabe-CSV."""
    rows = []
    with open(INPUT_CSV, encoding="utf-8-sig") as f:
        reader = csv.reader(f, delimiter=";")
        next(reader)  # Header
        for row in reader:
            if len(row) >= 2:
                rows.append((row[0].strip(), row[1].strip()))
    return rows


def load_existing() -> dict[str, str]:
    """Lädt bereits generierte Definitionen (Key = Begriff lowercase)."""
    done: dict[str, str] = {}
    if OUTPUT_CSV.exists():
        with open(OUTPUT_CSV, encoding="utf-8-sig") as f:
            reader = csv.reader(f, delimiter=";")
            next(reader)  # Header
            for row in reader:
                if len(row) >= 3 and row[2].strip():
                    done[row[1].strip().lower()] = row[2].strip()
    return done


def generate_definition(client: OpenAI, term: str, rechtsgebiet: str,
                        model: str, tracker: "CostTracker") -> str:
    """Ruft die OpenAI Responses-API auf und gibt die Definition zurück.

    Die Responses-API funktioniert zuverlässiger mit Reasoning-Modellen
    wie gpt-5-nano, da diese intern viele Tokens für das Reasoning benötigen.
    """
    user_msg = f"Begriff: {term}"
    if rechtsgebiet and rechtsgebiet != "Allgemein":
        user_msg += f"\nRechtsgebiet: {rechtsgebiet}"

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = client.responses.create(
                model=model,
                instructions=SYSTEM_PROMPT,
                input=user_msg,
                max_output_tokens=8192,
            )
            if resp.usage:
                tracker.add_responses(resp.usage)

            text = (resp.output_text or "").strip()
            if not text:
                print(f"\n    ⚠  Leere Antwort (usage={resp.usage})")
                continue
            # Semikolons entfernen (CSV-Trennzeichen)
            text = text.replace(";", ",")
            return text

        except (RateLimitError, APITimeoutError, APIConnectionError) as e:
            wait = RETRY_DELAY * attempt
            print(f"\n    ⚠  {type(e).__name__} – warte {wait}s (Versuch {attempt}/{MAX_RETRIES})")
            time.sleep(wait)
        except Exception as e:
            print(f"\n    ❌ {type(e).__name__}: {e}")
            return ""

    return ""


def main():
    args = parse_args()

    # .env laden
    load_dotenv(ENV_FILE)
    api_key = os.getenv("OPENAI_API_KEY", "")

    if not args.dry_run and (not api_key or api_key.startswith("sk-DEIN")):
        print("❌ Bitte trage deinen OpenAI API Key in .env ein:")
        print(f"   {ENV_FILE}")
        sys.exit(1)

    # Eingabe laden
    terms = load_input()
    print(f"📖 {len(terms)} Begriffe in {INPUT_CSV.name}")

    # Bereits erledigte laden
    done = load_existing()
    print(f"✅ {len(done)} bereits definiert in {OUTPUT_CSV.name}")

    # Zu verarbeitende filtern
    todo = [(rg, t) for rg, t in terms if t.lower() not in done]
    if args.batch > 0:
        todo = todo[:args.batch]
    print(f"🔄 {len(todo)} Begriffe zu verarbeiten\n")

    if not todo:
        print("Nichts zu tun – alle Begriffe sind bereits definiert.")
        return

    # Client & Kosten-Tracker erstellen
    client = None if args.dry_run else OpenAI(api_key=api_key)
    tracker = CostTracker(PRICE_INPUT_PER_M, PRICE_OUTPUT_PER_M, args.limit)

    print(f"💰 Kostenlimit: ${args.limit:.2f}")
    print(f"   Modell: {args.model}")
    print(f"   Preise: Input ${PRICE_INPUT_PER_M}/M  Output ${PRICE_OUTPUT_PER_M}/M\n")

    # Output-Datei vorbereiten (Header schreiben falls neu)
    write_header = not OUTPUT_CSV.exists() or OUTPUT_CSV.stat().st_size == 0
    out_file = open(OUTPUT_CSV, "a", encoding="utf-8-sig", newline="")
    writer = csv.writer(out_file, delimiter=";")
    if write_header:
        writer.writerow(["Rechtsgebiet", "Begriff", "Definition"])

    success = 0
    failed = 0
    start_time = time.time()

    try:
        for i, (rg, term) in enumerate(todo, 1):
            # Kostenlimit prüfen
            if not args.dry_run and tracker.over_limit:
                print(f"\n\n🛑 Kostenlimit erreicht! ({tracker.summary()})")
                print("   Starte das Skript erneut mit --limit <höherer Wert> um fortzufahren.")
                break

            # Fortschritt
            elapsed = time.time() - start_time
            rate = success / elapsed * 60 if elapsed > 0 and success > 0 else 0
            cost_str = f"  ${tracker.cost_usd:.4f}" if not args.dry_run else ""
            print(f"  [{i}/{len(todo)}] {term[:50]:<50} ", end="", flush=True)

            if args.dry_run:
                definition = f"[Platzhalter-Definition für: {term}]"
            else:
                definition = generate_definition(client, term, rg, args.model, tracker)

            if definition:
                writer.writerow([rg, term, definition])
                out_file.flush()
                done[term.lower()] = definition
                success += 1
                print(f"✓ ({len(definition)} Z.){cost_str}")
            else:
                failed += 1
                print(f"✗ (fehlgeschlagen){cost_str}")

            if not args.dry_run:
                time.sleep(REQUEST_DELAY)

    except KeyboardInterrupt:
        print("\n\n⚡ Abgebrochen – Fortschritt wurde gespeichert.")

    finally:
        out_file.close()

    elapsed = time.time() - start_time
    print(f"\n{'='*50}")
    print(f"  ✅ {success} Definitionen generiert")
    if failed:
        print(f"  ❌ {failed} fehlgeschlagen")
    print(f"  ⏱  {elapsed:.0f}s ({success/elapsed*60:.0f} Begriffe/min)" if elapsed > 0 else "")
    print(f"  📄 {OUTPUT_CSV.name} ({len(done)} gesamt)")
    if not args.dry_run:
        print(f"  {tracker.summary()}")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
