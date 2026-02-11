/* ──────────────────────────────────────────── */
/*  RechtFlott — 10-Finger Typing for Lawyers  */
/* ──────────────────────────────────────────── */

// ── Modes & lesson data ──────────────────────
// ── Chapter Metadata ──
const chapterData = {
  "Kapitel 1": { title: "Akklimatisierung: A", desc: "Gewöhne den linken kleinen Finger an das 'A'." },
  "Kapitel 2": { title: "Akklimatisierung: S", desc: "Der linke Ringfinger auf dem 'S'." },
  "Kapitel 3": { title: "Akklimatisierung: D", desc: "Der linke Mittelfinger auf dem 'D'." },
  "Kapitel 4": { title: "Akklimatisierung: F", desc: "Der linke Zeigefinger auf dem 'F'." },
  "Kapitel 5": { title: "Akklimatisierung: J", desc: "Der rechte Zeigefinger auf dem 'J'." },
  "Kapitel 6": { title: "Akklimatisierung: K", desc: "Der rechte Mittelfinger auf dem 'K'." },
  "Kapitel 7": { title: "Akklimatisierung: L", desc: "Der rechte Ringfinger auf dem 'L'." },
  "Kapitel 8": { title: "Akklimatisierung: Ö", desc: "Der rechte kleine Finger auf dem 'Ö'." },
  "Kapitel 9": { title: "Grundstellung: Basis", desc: "Die Home-Row (ASDF JKLÖ) blind finden." },
  "Kapitel 10": { title: "Grundstellung: Reihenfolge", desc: "Koordination der Finger in der Grundreihe." },
  "Kapitel 11": { title: "Grundstellung: Wechsel", desc: "Rhythmischer Wechsel zwischen links und rechts." },
  "Kapitel 12": { title: "Alternation", desc: "Schnelle Wechsel für hohen Speed." },
  "Kapitel 13": { title: "Obere Reihe: Basis", desc: "Der Weg nach oben (QWER UIOP)." },
  "Kapitel 14": { title: "Obere Reihe: Kombi", desc: "Wechsel zwischen Grund- und Oberreihe." },
  "Kapitel 15": { title: "Untere Reihe: Basis", desc: "Der Weg nach unten (ZXCV NM)." },
  "Kapitel 16": { title: "Untere Reihe: Kombi", desc: "Alle drei Reihen verbinden." },
  "Kapitel 17": { title: "Zahlenreihe", desc: "Die weitesten Wege (1-0)." },
  "Kapitel 18": { title: "Zahlen: Praxis", desc: "PLZ, Datum und Telefonnummern." },
  "Kapitel 19": { title: "Sonderzeichen", desc: "Punkt, Komma und Bindestrich." },
  "Kapitel 20": { title: "Großschreibung (Shift)", desc: "Einsatz der Umschalttaste (Shift)." },
  "Kapitel 21": { title: "Großschreibung: Wörter", desc: "Nomen und Satzanfänge." },
  "Kapitel 22": { title: "Kurze Wörter", desc: "Häufige Artikel und Konjunktionen." },
  "Kapitel 23": { title: "Silben & Endungen", desc: "Wichtige Bausteine (-ung, -eit, -sch)." },
  "Kapitel 24": { title: "Sätze & Rhythmus", desc: "Ganze Sätze im Fluss tippen." },
  "Kapitel 25": { title: "Lange Wörter", desc: "Konzentration für viele Zeichen." },
  "Kapitel 26": { title: "Strafrecht Begriffe", desc: "Grundwortschatz StGB." },
  "Kapitel 27": { title: "Zivilrecht Begriffe", desc: "Grundwortschatz BGB." },
  "Kapitel 28": { title: "Öffentliches Recht", desc: "Verwaltung und Verfassung." },
  "Kapitel 29": { title: "Prozessrecht", desc: "ZPO, StPO und VwGO Vokabular." },
  "Kapitel 30": { title: "Der Paragraph (§)", desc: "Das wichtigste Zeichen für Juristen." },
};

const modes = {
  learning: {
    id: "learning",
    name: "Lernmodus",
    chip: "Lernmodus",
    lessons: [
      /* ── Akklimatisierung ── */
      { id: "ch-1", chapter: "Kapitel 1", title: "Übung 1", description: "Basis", text: "aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa" },
      { id: "ch-2", chapter: "Kapitel 2", title: "Übung 1", description: "Basis", text: "sssss sssss sssss sssss sssss sssss sssss sssss" },
      { id: "ch-3", chapter: "Kapitel 3", title: "Übung 1", description: "Basis", text: "ddddd ddddd ddddd ddddd ddddd ddddd ddddd ddddd" },
      { id: "ch-4", chapter: "Kapitel 4", title: "Übung 1", description: "Basis", text: "fffff fffff fffff fffff fffff fffff fffff fffff" },
      { id: "ch-5", chapter: "Kapitel 5", title: "Übung 1", description: "Basis", text: "jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj jjjjj" },
      { id: "ch-6", chapter: "Kapitel 6", title: "Übung 1", description: "Basis", text: "kkkkk kkkkk kkkkk kkkkk kkkkk kkkkk kkkkk kkkkk" },
      { id: "ch-7", chapter: "Kapitel 7", title: "Übung 1", description: "Basis", text: "lllll lllll lllll lllll lllll lllll lllll lllll" },
      { id: "ch-8", chapter: "Kapitel 8", title: "Übung 1", description: "Basis", text: "ööööö ööööö ööööö ööööö ööööö ööööö ööööö ööööö" },

      /* ── Kapitel 9: Grundstellung ── */
      { id: "ch-9-1", chapter: "Kapitel 9", title: "Die Basis", description: "ASDF und JKLÖ im Block.", text: "asdf jklö asdf jklö asdf jklö asdf jklö asdf jklö asdf jklö asdf jklö" },
      { id: "ch-9-2", chapter: "Kapitel 9", title: "Finger-Fühlen", description: "Jeden Finger einzeln ansteuern.", text: "a s d f j k l ö a s d f j k l ö a s d f j k l ö a s d f j k l ö" },
      { id: "ch-9-3", chapter: "Kapitel 9", title: "Dauerlauf", description: "Konstantes Tempo halten.", text: "asdf jklö fjdksl aö asdf jklö fjdksl aö asdf jklö fjdksl aö" },
      { id: "ch-9-4", chapter: "Kapitel 9", title: "Spiegelbild", description: "Symmetrische Bewegungen.", text: "aj sk dl fö aj sk dl fö aj sk dl fö aj sk dl fö aj sk dl fö" },
      { id: "ch-9-5", chapter: "Kapitel 9", title: "Chaos", description: "Kleine Variationen.", text: "asad fafa jojo klkl asad fafa jojo klkl asad fafa jojo klkl" },

      /* ── Kapitel 10: Reihenfolge ── */
      { id: "ch-10-1", chapter: "Kapitel 10", title: "Linear", description: "Die Reihe durch.", text: "a s d f g h j k l ö ä a s d f g h j k l ö ä" },
      { id: "ch-10-2", chapter: "Kapitel 10", title: "Rückwärts", description: "Von Aussen nach Innen.", text: "f d s a ö l k j f d s a ö l k j f d s a ö l k j" },
      { id: "ch-10-3", chapter: "Kapitel 10", title: "Ping Pong", description: "Links Rechts Wechsel.", text: "a j s k d l f ö a j s k d l f ö a j s k d l f ö" },
      { id: "ch-10-4", chapter: "Kapitel 10", title: "Doppel", description: "Jeden Buchstaben zweimal.", text: "aa ss dd ff jj kk ll öö aa ss dd ff jj kk ll öö" },
      { id: "ch-10-5", chapter: "Kapitel 10", title: "Mix", description: "Bunt gemischt.", text: "asdf asdf jklö jklö fdsa fdsa jklö jklö asdf asdf" },

      /* ── Kapitel 11: Wechsel ── */
      { id: "ch-11-1", chapter: "Kapitel 11", title: "Links ↔ Rechts", description: "Der klassische Wechsel.", text: "as df jk lö as df jk lö as df jk lö as df jk lö as df jk lö" },
      { id: "ch-11-2", chapter: "Kapitel 11", title: "Paarweise", description: "Immer zwei Anschläge.", text: "as jk df lö as jk df lö as jk df lö as jk df lö" },
      { id: "ch-11-3", chapter: "Kapitel 11", title: "Überkreuz", description: "Gehirn-Training.", text: "aj sk dl fö aj sk dl fö aj sk dl fö aj sk dl fö" },
      { id: "ch-11-4", chapter: "Kapitel 11", title: "Innen/Außen", description: "Zeigefinger und kleine Finger.", text: "f j a ö f j a ö f j a ö f j a ö f j a ö f j a ö" },
      { id: "ch-11-5", chapter: "Kapitel 11", title: "Schnell", description: "Tempo aufbauen.", text: "ad sf jl ök ad sf jl ök ad sf jl ök ad sf jl ök" },

      /* ── Kapitel 12: Alternation ── */
      { id: "ch-12-1", chapter: "Kapitel 12", title: "Basis-Alternation", description: "Rhythmus finden.", text: "fd jk fd jk fd jk fd jk fd jk fd jk fd jk fd jk" },
      { id: "ch-12-2", chapter: "Kapitel 12", title: "Erweitert", description: "Mittelfinger dazu.", text: "sd kl sd kl sd kl sd kl sd kl sd kl sd kl sd kl" },
      { id: "ch-12-3", chapter: "Kapitel 12", title: "Ringfinger", description: "Ringfinger isoliert.", text: "as lö as lö as lö as lö as lö as lö as lö as lö" },
      { id: "ch-12-4", chapter: "Kapitel 12", title: "Die Treppe", description: "Auf und ab.", text: "asdf jklö fdsa ölkj asdf jklö fdsa ölkj asdf jklö" },
      { id: "ch-12-5", chapter: "Kapitel 12", title: "Speed-Bursts", description: "Explosiv tippen.", text: "fj fj fj dk dk dk sl sl sl aö aö aö fj fj fj dk dk dk" },

      /* ── Kapitel 13: Obere Reihe ── */
      { id: "ch-13-1", chapter: "Kapitel 13", title: "Oben Basis", description: "QWER und UIOP.", text: "qwer uiop qwer uiop qwer uiop qwer uiop qwer uiop" },
      { id: "ch-13-2", chapter: "Kapitel 13", title: "Einzeln", description: "Streckung fühlen.", text: "q w e r t z u i o p ü q w e r t z u i o p ü" },
      { id: "ch-13-3", chapter: "Kapitel 13", title: "Paare Oben", description: "Nachbarn.", text: "qw er tz ui op qw er tz ui op qw er tz ui op" },
      { id: "ch-13-4", chapter: "Kapitel 13", title: "Wechsel Oben", description: "Links und Rechts.", text: "qwer uiop qwer uiop popo qiqi popo qiqi qwer uiop" },
      { id: "ch-13-5", chapter: "Kapitel 13", title: "Pseudowörter", description: "Erste Lautgebilde.", text: "quer pour oper requ iouo wero zuiop trewq qwertzu" },

      /* ── Kapitel 14: Obere Kombi ── */
      { id: "ch-14-1", chapter: "Kapitel 14", title: "Kurzfolgen", description: "Verbindung zur Mitte.", text: "aqa sws ded frf juj kik lol öpö aqa sws ded frf juj" },
      { id: "ch-14-2", chapter: "Kapitel 14", title: "Vertikal", description: "In der Spalte bleiben.", text: "aq sw de fr gt hz ju ki lo öp aq sw de fr gt hz" },
      { id: "ch-14-3", chapter: "Kapitel 14", title: "Kreuz und Quer", description: "Über die Reihen.", text: "af qr sl wo dk ep fj ru ag ht zh af qr sl wo" },
      { id: "ch-14-4", chapter: "Kapitel 14", title: "Kleine Wörter", description: "Echte Wörter.", text: "wo wer wie wir rot tor ort pot hut gut mut rot tor" },
      { id: "ch-14-5", chapter: "Kapitel 14", title: "Sätze", description: "Erste Sätze.", text: "wir essen suppe aus der dose gut und lecker ist das essen" },

      /* ── Kapitel 15: Untere Reihe ── */
      { id: "ch-15-1", chapter: "Kapitel 15", title: "Unten Basis", description: "ZXCV und NM.", text: "yxcv bnm yxcv bnm yxcv bnm yxcv bnm yxcv bnm" },
      { id: "ch-15-2", chapter: "Kapitel 15", title: "Einzeln Unten", description: "Greif nach unten.", text: "y x c v b n m , . - y x c v b n m , . -" },
      { id: "ch-15-3", chapter: "Kapitel 15", title: "Paare Unten", description: "Nachbarn.", text: "yx cv bn m, yx cv bn m, yx cv bn m, yx cv" },
      { id: "ch-15-4", chapter: "Kapitel 15", title: "Wechsel Mix", description: "Oben Unten.", text: "ya xs cd vf bg nh mj ya xs cd vf bg nh mj" },
      { id: "ch-15-5", chapter: "Kapitel 15", title: "Kryptisch", description: "Schwierige Griffe.", text: "cvm bnm yxn xcb mnb vcx yyy mmm bbb nnn" },

      /* ── Kapitel 16: Untere Kombi ── */
      { id: "ch-16-1", chapter: "Kapitel 16", title: "Kombi: Vertikal Komplett", description: "Alle drei Reihen.", text: "aqy swx dec frv gtb hnz jum ki, lo. öp-" },
      { id: "ch-16-2", chapter: "Kapitel 16", title: "Kombi: Silben", description: "Häufige Endungen.", text: "ung ion kait eit sch ung ion kait eit sch ung ion" },
      { id: "ch-16-3", chapter: "Kapitel 16", title: "Kombi: Wörter", description: "Vokabular.", text: "ganz viel zeit haben wir nun aber auch nicht mehr" },
      { id: "ch-16-4", chapter: "Kapitel 16", title: "Kombi: Satzbau", description: "Ganze Sätze.", text: "der schnelle fuchs springt über den faulen hund" },
      { id: "ch-16-5", chapter: "Kapitel 16", title: "Kombi: Fluss", description: "Längerer Text.", text: "es war einmal vor langer zeit in einem fernen land" },

      /* ── Kapitel 17: Zahlenreihe ── */
      { id: "ch-17-1", chapter: "Kapitel 17", title: "Zahlen: Links 1-5", description: "Linke Hand Zahl.", text: "1 2 3 4 5 1 2 3 4 5 12 34 51 23 45 12 34 51" },
      { id: "ch-17-2", chapter: "Kapitel 17", title: "Zahlen: Rechts 6-0", description: "Rechte Hand Zahl.", text: "6 7 8 9 0 6 7 8 9 0 67 89 06 78 90 67 89 06" },
      { id: "ch-17-3", chapter: "Kapitel 17", title: "Zahlen: Alle", description: "Von 1 bis 0.", text: "1234567890 0987654321 1234567890 10 20 30 40 50" },
      { id: "ch-17-4", chapter: "Kapitel 17", title: "Zahlen: Spreizung", description: "Aus der Grundstellung.", text: "f4 f5 j6 j7 d3 k8 s2 l9 a1 ö0 f4 f5 j6 j7" },
      { id: "ch-17-5", chapter: "Kapitel 17", title: "Zahlen: Datum", description: "Punkte und Zahlen.", text: "12.03.2024 01.01.1990 31.12.2025 24.12.2023" },

      /* ── Kapitel 18: Zahlen Praxis ── */
      { id: "ch-18-1", chapter: "Kapitel 18", title: "Praxis: PLZ", description: "Postleitzahlen.", text: "10115 Berlin 80331 München 20457 Hamburg 50667 Köln" },
      { id: "ch-18-2", chapter: "Kapitel 18", title: "Praxis: Preise", description: "Euro Beträge.", text: "10,50 99,99 150,00 3,95 12,00 1.250,00 49,90" },
      { id: "ch-18-3", chapter: "Kapitel 18", title: "Praxis: Telefon", description: "Rufnummern.", text: "0170 1234567 030 9876543 110 112 0800 123456" },
      { id: "ch-18-4", chapter: "Kapitel 18", title: "Praxis: Mix", description: "Im Kontext.", text: "im jahr 2000 war alles anders als 1999 oder 2024" },
      { id: "ch-18-5", chapter: "Kapitel 18", title: "Praxis: § (Sim)", description: "Vorbereitung.", text: "123 bgb 242 bgb 823 abs. 1 bgb 211 stgb 263 stgb" },

      /* ── Kapitel 19: Sonderzeichen ── */
      { id: "ch-19-1", chapter: "Kapitel 19", title: "Sonder: Punkt", description: "Satzende.", text: "ende. schluss. punkt. aus. vorbei. das war es. punkt." },
      { id: "ch-19-2", chapter: "Kapitel 19", title: "Sonder: Komma", description: "Aufzählung.", text: "eins, zwei, drei, vier, fünf, äpfel, birnen, nüsse, obst" },
      { id: "ch-19-3", chapter: "Kapitel 19", title: "Sonder: Strich", description: "Kopplung.", text: "e-mail u-bahn s-bahn x-ray a-b c-d n-tv check-in" },
      { id: "ch-19-4", chapter: "Kapitel 19", title: "Sonder: Mix", description: "Alles zusammen.", text: "ja, nein. doch, oder. so, ist, es. eins-zwei-drei." },
      { id: "ch-19-5", chapter: "Kapitel 19", title: "Sonder: Satz", description: "Reale Anwendung.", text: "hallo, wie geht es dir? mir geht es gut, danke der nachfrage." },

      /* ── Kapitel 20: Großschreibung (Shift) ── */
      { id: "ch-20-1", chapter: "Kapitel 20", title: "Linke Hand Groß", description: "Rechte Shift-Taste benutzen.", text: "F F F A A A S S S D D D A S D F A S D F" },
      { id: "ch-20-2", chapter: "Kapitel 20", title: "Rechte Hand Groß", description: "Linke Shift-Taste benutzen.", text: "J J J K K K L L L Ö Ö Ö J K L Ö J K L Ö" },
      { id: "ch-20-3", chapter: "Kapitel 20", title: "Wechsel Shift", description: "Beide Hände koordinieren.", text: "Al So Da Ja Ka La Fa Sa Ja Nein Doch Oder" },
      { id: "ch-20-4", chapter: "Kapitel 20", title: "Nomen", description: "Substantive tippen.", text: "Haus Baum Auto Tisch Stuhl Fenster Tür Dach Wand" },
      { id: "ch-20-5", chapter: "Kapitel 20", title: "Satzanfänge", description: "Immer am Anfang.", text: "Wir gehen. Sie laufen. Er steht. Es regnet. Ich bin." },

      /* ── Kapitel 21: Großschreibung Wörter ── */
      { id: "ch-21-1", chapter: "Kapitel 21", title: "Städte", description: "Eigennamen.", text: "Berlin Hamburg München Köln Frankfurt Stuttgart Leipzig" },
      { id: "ch-21-2", chapter: "Kapitel 21", title: "Namen", description: "Personen.", text: "Müller Schmidt Schneider Fischer Weber Meyer Wagner" },
      { id: "ch-21-3", chapter: "Kapitel 21", title: "Länder", description: "Geografie.", text: "Deutschland Frankreich Italien Spanien Polen Dänemark" },
      { id: "ch-21-4", chapter: "Kapitel 21", title: "Marken", description: "Firmen.", text: "Apple Microsoft Google Amazon Tesla Mercedes BMW Audi" },
      { id: "ch-21-5", chapter: "Kapitel 21", title: "Gemischt", description: "Gross und Klein.", text: "Das Haus ist groß. Die Maus ist klein. Der Baum ist grün." },

      /* ── Kapitel 22: Kurze Wörter ── */
      { id: "ch-22-1", chapter: "Kapitel 22", title: "Artikel", description: "Begleiter.", text: "Der Die Das Des Dem Den Ein Eine Einer Einem Einen" },
      { id: "ch-22-2", chapter: "Kapitel 22", title: "Bindewörter", description: "Verbindung.", text: "Und Oder Aber Denn Doch Weil Als Wenn Dass Ob" },
      { id: "ch-22-3", chapter: "Kapitel 22", title: "Präpositionen", description: "Verhältnis.", text: "Auf An Bei In Mit Von Zu Vor Nach Über Unter" },
      { id: "ch-22-4", chapter: "Kapitel 22", title: "Pronomen", description: "Fürwörter.", text: "Ich Du Er Sie Es Wir Ihr Sie Mich Dich Sich Uns Euch" },
      { id: "ch-22-5", chapter: "Kapitel 22", title: "Verben", description: "Tunwörter.", text: "Ist Hat War Sind Wird Kann Soll Muss Darf Will Mag" },

      /* ── Kapitel 23: Silben & Endungen ── */
      { id: "ch-23-1", chapter: "Kapitel 23", title: "Endung -en/er", description: "Sehr häufig.", text: "Kommen Gehen Sehen Machen Laufen Vater Mutter Kinder" },
      { id: "ch-23-2", chapter: "Kapitel 23", title: "Endung -ung", description: "Nomen-Endung.", text: "Heizung Leitung Zeitung Übung Warnung Rechnung Achtung" },
      { id: "ch-23-3", chapter: "Kapitel 23", title: "Endung -keit", description: "Eigenschaft.", text: "Ewigkeit Heiterkeit Einsamkeit Möglichkeit Fähigkeit" },
      { id: "ch-23-4", chapter: "Kapitel 23", title: "Laute ch/sch", description: "Zischen.", text: "Schule Tisch Fisch Dach Buch Loch Licht Sicht Nacht" },
      { id: "ch-23-5", chapter: "Kapitel 23", title: "Vokale ei/ie", description: "Klang.", text: "Mein Dein Sein Hier Viel Spiel Lied Sieg Krieg Frieden" },

      /* ── Kapitel 24: Sätze & Rhythmus ── */
      { id: "ch-24-1", chapter: "Kapitel 24", title: "Einfache Sätze", description: "Subjekt Prädikat Objekt.", text: "Der Hund bellt laut. Die Katze schläft fest. Das Kind spielt." },
      { id: "ch-24-2", chapter: "Kapitel 24", title: "Fragen", description: "Satzzeichen ?", text: "Wie geht es dir? Was machst du heute? Wo wohnst du?" },
      { id: "ch-24-3", chapter: "Kapitel 24", title: "Kommasetzung", description: "Nebensätze.", text: "Ich glaube, dass es heute regnet. Er sagte, er habe keine Zeit." },
      { id: "ch-24-4", chapter: "Kapitel 24", title: "Direkte Rede", description: "Anführungszeichen.", text: "\"Hallo\", sagte er. \"Wie geht's?\", fragte sie." },
      { id: "ch-24-5", chapter: "Kapitel 24", title: "Langer Fluss", description: "Konzentration.", text: "Am Ende des Tages zählt nur, was wir wirklich getan haben und nicht was wir wollten." },

      /* ── Kapitel 25: Lange Wörter ── */
      { id: "ch-25-1", chapter: "Kapitel 25", title: "Zusammengesetzt", description: "Wortmonster.", text: "Donaudampfschifffahrt Kapitänsmütze Schreibtischlampe" },
      { id: "ch-25-2", chapter: "Kapitel 25", title: "Rechtssprache", description: "Juristendeutsch.", text: "Schadenersatzanspruch Beweislastumkehr Rechtsschutzversicherung" },
      { id: "ch-25-3", chapter: "Kapitel 25", title: "Verwaltung", description: "Amtsdeutsch.", text: "Baugenehmigungsverfahren Straßenverkehrsordnung Steuererklärung" },
      { id: "ch-25-4", chapter: "Kapitel 25", title: "Abstrakt", description: "Kompliziert.", text: "Unabhängigkeitserklärung Wahrscheinlichkeitsrechnung" },
      { id: "ch-25-5", chapter: "Kapitel 25", title: "Mix Lang", description: "Ausdauer.", text: "Kühlschrankmagnet Fußballweltmeisterschaft Weihnachtsbaum" },

      /* ── Kapitel 26: Strafrecht Begriffe ── */
      { id: "ch-26-1", chapter: "Kapitel 26", title: "Grundlagen", description: "Basisvokabeln.", text: "Tat Täter Opfer Schuld Vorsatz Fahrlässigkeit Unterlassung" },
      { id: "ch-26-2", chapter: "Kapitel 26", title: "Delikte I", description: "Körper & Leben.", text: "Körperverletzung Totschlag Mord Nötigung Freiheitsberaubung" },
      { id: "ch-26-3", chapter: "Kapitel 26", title: "Delikte II", description: "Vermögen.", text: "Diebstahl Betrug Raub Erpressung Untreue Hehlerei Sachbeschädigung" },
      { id: "ch-26-4", chapter: "Kapitel 26", title: "Prozess", description: "Vor Gericht.", text: "Anklage Staatsanwalt Verteidiger Hauptverhandlung Freispruch" },
      { id: "ch-26-5", chapter: "Kapitel 26", title: "Sanktionen", description: "Strafe.", text: "Freiheitsstrafe Geldstrafe Bewährung Maßregelvollzug Haftbefehl" },

      /* ── Kapitel 27: Zivilrecht Begriffe ── */
      { id: "ch-27-1", chapter: "Kapitel 27", title: "BGB AT", description: "Allgemeiner Teil.", text: "Willenserklärung Vertrag Angebot Annahme Anfechtung Stellvertretung" },
      { id: "ch-27-2", chapter: "Kapitel 27", title: "Schuldrecht", description: "Verträge.", text: "Kaufvertrag Mietvertrag Werkvertrag Dienstvertrag Schenkung Leihe" },
      { id: "ch-27-3", chapter: "Kapitel 27", title: "Sachenrecht", description: "Eigentum & Besitz.", text: "Eigentum Besitz Übereignung Grundbuch Hypothek Grundschuld Pfand" },
      { id: "ch-27-4", chapter: "Kapitel 27", title: "Familienrecht", description: "Verwandtschaft.", text: "Ehe Scheidung Unterhalt Sorgerecht Vormundschaft Zugewinn" },
      { id: "ch-27-5", chapter: "Kapitel 27", title: "Personen", description: "Akteure.", text: "Verbraucher Unternehmer Gläubiger Schuldner Dritter Erbe Pflichtteil" },

      /* ── Kapitel 28: Öffentliches Recht ── */
      { id: "ch-28-1", chapter: "Kapitel 28", title: "Verfassung", description: "Grundgesetz.", text: "Grundrechte Demokratie Rechtsstaat Sozialstaat Bundesstaat Gewaltenteilung" },
      { id: "ch-28-2", chapter: "Kapitel 28", title: "Verwaltung", description: "Behörden.", text: "Verwaltungsakt Bescheid Widerspruch Genehmigung Ermessen Auflage" },
      { id: "ch-28-3", chapter: "Kapitel 28", title: "Baurecht", description: "Bauen.", text: "Baugenehmigung Bebauungsplan Flächennutzungsplan Abstandsfläche" },
      { id: "ch-28-4", chapter: "Kapitel 28", title: "Polizeirecht", description: "Sicherheit.", text: "Gefahr Öffentliche Sicherheit Ordnung Polizei Maßnahmen Platzverweis" },
      { id: "ch-28-5", chapter: "Kapitel 28", title: "Europa", description: "EU.", text: "Richtlinie Verordnung Europäischer Gerichtshof Binnenmarkt Zoll" },

      /* ── Kapitel 29: Prozessrecht ── */
      { id: "ch-29-1", chapter: "Kapitel 29", title: "ZPO", description: "Zivilprozess.", text: "Klage Klageerwiderung Versäumnisurteil Beweisaufnahme Urteil Berufung" },
      { id: "ch-29-2", chapter: "Kapitel 29", title: "StPO", description: "Strafprozess.", text: "Ermittlungsverfahren Haftbefehl Durchsuchung Beschlagnahme Untersuchungshaft" },
      { id: "ch-29-3", chapter: "Kapitel 29", title: "VwGO", description: "Verwaltungsprozess.", text: "Anfechtungsklage Verpflichtungsklage Feststellungsklage Widerspruchsbescheid" },
      { id: "ch-29-4", chapter: "Kapitel 29", title: "Instanzen", description: "Gerichte.", text: "Amtsgericht Landgericht Oberlandesgericht Bundesgerichtshof Verfassungsgericht" },
      { id: "ch-29-5", chapter: "Kapitel 29", title: "Beweis", description: "Wahrheit.", text: "Zeuge Sachverständiger Augenschein Urkunde Parteienvernehmung Eid" },

      /* ── Kapitel 30: Der Paragraph (§) ── */
      { id: "ch-30-1", chapter: "Kapitel 30", title: "Grundlagen", description: "Shift + 3.", text: "§ § § § § 1 § 2 § 3 § 1 § 2 § 3 § 123 § 456 § 789" },
      { id: "ch-30-2", chapter: "Kapitel 30", title: "BGB Normen", description: "Zivilrecht.", text: "§ 433 BGB § 823 BGB § 280 BGB § 311 BGB § 985 BGB § 142 BGB" },
      { id: "ch-30-3", chapter: "Kapitel 30", title: "StGB Normen", description: "Strafrecht.", text: "§ 211 StGB § 212 StGB § 223 StGB § 242 StGB § 263 StGB § 20 StGB" },
      { id: "ch-30-4", chapter: "Kapitel 30", title: "GG Normen", description: "Verfassung.", text: "Art. 1 GG Art. 2 GG Art. 3 GG (Artikel statt Paragraph) § 33 BauGB" },
      { id: "ch-30-5", chapter: "Kapitel 30", title: "Absätze", description: "Zitierweise.", text: "§ 823 Abs. 1 BGB § 280 Abs. 1 S. 1 BGB § 123 Abs. 2 StGB" },
    ],
  },
  legal: {
    id: "legal",
    name: "Juristische Begriffe",
    chip: "Jura",
    variants: {
      terms: { name: "Begriffe", lessons: [] },
      abbrev: { name: "Abkürzungen", lessons: [] },
      definitions: { name: "Definitionen", lessons: [] },
      mix: { name: "Examens-Mix", lessons: [] },
      daily: { name: "Daily Drill", lessons: [] },
      timed: { name: "Zeitmodus", lessons: [] },
    },
  },
};
// ── DOM references ───────────────────────────
const $ = (id) => document.getElementById(id);
const lessonList = $("lessonList");
const typingArea = $("typingArea");
const typingInput = $("typingInput");
const progressBar = $("progressBar");
const wpmEl = $("wpm");
const accuracyEl = $("accuracy");
const errorsEl = $("errors");
const timeEl = $("time");
const bestWpmEl = $("bestWpm");
const bestStat = $("bestStat");
const modeScreen = $("modeScreen");
const app = $("app");
const modeChip = $("modeChip");
const legalToggle = $("legalToggle");
const chapterSelect = $("chapterSelect");
const lessonSearch = $("lessonSearch");
const loadMoreBtn = $("loadMore");
const randomizeChapterBtn = $("randomizeChapterBtn");
const keyboard = $("keyboard");
const fingerLegend = $("fingerLegend");
const keyboardWrap = $("keyboardWrap");
const completion = $("completion");
const completionIcon = $("completionIcon");
const completionTitle = $("completionTitle");
const completionSub = $("completionSub");
const cWpm = $("cWpm");
const cAcc = $("cAcc");
const cTime = $("cTime");
const completionBadge = $("completionBadge");
const defPanel = $("definitionPanel");
const defTerm = $("definitionTerm");
const defText = $("definitionText");
const sidebar = $("sidebar");
const streakText = $("streakText");
const streakGoal = $("streakGoal");
const confettiCanvas = $("confetti");
const wpmGauge = $("wpmGauge");
const wpmGaugeValue = $("wpmGaugeValue");
const wpmGaugeFill = $("wpmGaugeFill");

// ── State ────────────────────────────────────
let activeMode = modes.learning;
let activeVariantId = "mix";
let allLessons = [];
let filteredLessons = [];
let currentLessons = [];
let activeLesson = null;
let activeChapter = null;
let startTime = null;
let errors = 0;
let completed = false;
let defVisible = false;
let visibleCount = 40;
const PAGE_SIZE = 40;
let datasets = { terms: null, abbrev: null, definitions: null };
let keyboardVisible = true;
let sidebarOpen = true;

// ── Timed mode state ─────────────────────────
let timedModeActive = false;
const TIMED_DURATION = 60; // seconds
let timedInterval = null;

// ── Pools (no-repeat, auto-generating) ───────
let pools = { terms: [], abbrevs: [], defs: [] };
let rechtsgebietFilter = "all";
let counters = { terms: 0, abbrevs: 0, defs: 0, mix: 0 };

// ── LocalStorage helpers ─────────────────────
const STORE_KEY = "rechtflott";

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch { return {}; }
}

function saveStore(data) {
  const store = loadStore();
  Object.assign(store, data);
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getHistory() {
  const store = loadStore();
  return store.history || {};
}

function recordCompletion(wpm, acc) {
  const store = loadStore();
  const key = todayKey();
  if (!store.history) store.history = {};
  if (!store.history[key]) store.history[key] = { count: 0, bestWpm: 0 };
  store.history[key].count += 1;
  store.history[key].bestWpm = Math.max(store.history[key].bestWpm, wpm);
  if (!store.bestWpm || wpm > store.bestWpm) store.bestWpm = wpm;
  saveStore(store);
}

function getStreak() {
  const history = getHistory();
  let streak = 0;
  const d = new Date();
  // Start from yesterday (today might not be done yet, but if today has activity, count it)
  const todayStr = todayKey();
  if (history[todayStr]) streak = 1;
  let checkDate = new Date(d);
  checkDate.setDate(checkDate.getDate() - 1);
  while (true) {
    const key = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
    if (history[key]) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else break;
  }
  return streak;
}

function getTodayCount() {
  const history = getHistory();
  const entry = history[todayKey()];
  return entry ? entry.count : 0;
}

function updateStreakUI() {
  const streak = getStreak();
  const today = getTodayCount();
  const goal = 5;
  streakText.textContent = streak > 0 ? `🔥 ${streak} Tag${streak > 1 ? "e" : ""} Streak` : "🔥 Starte deinen Streak!";
  streakGoal.textContent = `Ziel: ${goal} Lektionen heute (${Math.min(today, goal)}/${goal})`;
  if (today >= goal) streakGoal.textContent = `✅ Tagesziel erreicht! (${today} Lektionen)`;
}

function updateBestWpmUI() {
  const store = loadStore();
  if (store.bestWpm) {
    bestStat.classList.remove("hidden");
    bestWpmEl.textContent = store.bestWpm;
  }
}

// ── Dark Mode ────────────────────────────────
function initDarkMode() {
  const store = loadStore();
  if (store.dark) document.body.classList.add("dark");
  updateDarkIcon();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  saveStore({ dark: document.body.classList.contains("dark") });
  updateDarkIcon();
  try { if (typingInput) typingInput.focus(); } catch (e) { console.warn('focus error', e); }
}

function updateDarkIcon() {
  $("toggleDark").textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// ── Keyboard layout ──────────────────────────
// ── Keyboard layout ──────────────────────────
const keyboardRows = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "ß"],
  ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
  ["shift_l", "y", "x", "c", "v", "b", "n", "m", ",", ".", "-", "shift_r"],
  ["space"],
];

const fingerMap = {
  "1": "lp", "2": "lr", "3": "lm", "4": "li", "5": "li", "6": "ri", "7": "ri", "8": "rm", "9": "rr", "0": "rp",
  q: "lp", w: "lr", e: "lm", r: "li", t: "li", z: "ri", u: "ri", i: "rm", o: "rr", p: "rp",
  a: "lp", s: "lr", d: "lm", f: "li", g: "li", h: "ri", j: "ri", k: "rm", l: "rr",
  y: "lp", x: "lr", c: "lm", v: "li", b: "li", n: "ri", m: "ri", ",": "rm", ".": "rr",
  "-": "rr", "ß": "rp", "ü": "rp", "ö": "rp", "ä": "rp", space: "thumb",
  shift_l: "lp", shift_r: "rp"
};

const fingers = [
  { id: "lp", label: "Li. klein" },
  { id: "lr", label: "Li. ring" },
  { id: "lm", label: "Li. mittel" },
  { id: "li", label: "Li. zeige" },
  { id: "ri", label: "Re. zeige" },
  { id: "rm", label: "Re. mittel" },
  { id: "rr", label: "Re. ring" },
  { id: "rp", label: "Re. klein" },
  { id: "thumb", label: "Daumen" },
];

function renderKeyboard() {
  keyboard.innerHTML = "";
  const homeKeys = new Set(["a", "s", "d", "f", "j", "k", "l", "ö"]);
  keyboardRows.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "keyboard-row";
    if (row.length === 1 && row[0] === "space") rowEl.classList.add("keyboard-row-space");
    row.forEach((key) => {
      const el = document.createElement("div");
      el.className = "key";
      el.dataset.key = key;
      const f = fingerMap[key];
      if (f) {
        el.classList.add(`finger-${f}`);
        el.dataset.finger = f;
      }
      if (key === "space") { el.textContent = "Leertaste"; el.classList.add("wide"); }
      else if (key === "shift_l" || key === "shift_r") {
        el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18v-6H5l7-7 7 7h-4v6H9z"/></svg>';
        el.classList.add("shift");
      }
      else if (key === "ß") { el.textContent = "\u00df"; el.style.textTransform = "none"; }
      else { el.textContent = key; }

      if (homeKeys.has(key)) el.classList.add("home");
      if (key === "f" || key === "j") el.classList.add("bump");
      rowEl.appendChild(el);
    });
    keyboard.appendChild(rowEl);
  });
}

function renderLegend() {
  fingerLegend.innerHTML = "";
  fingers.forEach((f) => {
    const pill = document.createElement("div");
    pill.className = `finger-pill finger-${f.id}`;
    pill.dataset.finger = f.id;
    pill.textContent = f.label;
    fingerLegend.appendChild(pill);
  });
}

const shiftPairs = {
  "!": "1", "\"": "2", "§": "3", "$": "4", "%": "5", "&": "6", "/": "7", "(": "8", ")": "9", "=": "0", "?": "ß",
  ";": ",", ":": ".", "_": "-",
  "A": "a", "B": "b", "C": "c", "D": "d", "E": "e", "F": "f", "G": "g", "H": "h", "I": "i", "J": "j", "K": "k", "L": "l", "M": "m",
  "N": "n", "O": "o", "P": "p", "Q": "q", "R": "r", "S": "s", "T": "t", "U": "u", "V": "v", "W": "w", "X": "x", "Y": "y", "Z": "z",
  "Ä": "ä", "Ö": "ö", "Ü": "ü"
};

function highlightKey(key) {
  keyboard.querySelectorAll(".key").forEach((el) => el.classList.remove("active", "active-shift"));
  if (!key) { highlightFinger(""); updateFingerHint(""); return; }

  // Check for Shift
  let targetKey = key;
  let useShift = false;
  if (shiftPairs[key]) {
    targetKey = shiftPairs[key];
    useShift = true;
  } else if (/[A-Z]/.test(key)) {
    targetKey = key.toLowerCase();
    useShift = true;
  }

  // Highlight Target
  const targetEl = keyboard.querySelector(`[data-key="${targetKey}"]`);
  if (targetEl) targetEl.classList.add("active");

  // Highlight Finger
  const fid = fingerMap[targetKey] || "";
  highlightFinger(fid);

  // Handle Shift
  if (useShift) {
    // Opposite Shift Logic
    // Left hand fingers start with 'l', Right with 'r'
    // Thumb is special (space), no shift usually
    let shiftKey = "shift_l"; // Default to Left Shift (for Right hand keys)
    if (fid.startsWith("l")) {
      shiftKey = "shift_r"; // Left hand key -> Right Shift
    }
    const shiftEl = keyboard.querySelector(`[data-key="${shiftKey}"]`);
    if (shiftEl) shiftEl.classList.add("active-shift");
  }

  updateFingerHint(fid, key, useShift);
}

function updateFingerHint(fingerId, key, shift) {
  const hint = $("fingerHint");
  if (!hint) return;
  if (!fingerId) { hint.textContent = ""; return; }
  const f = fingers.find((x) => x.id === fingerId);
  const k = key === " " ? "Leertaste" : key;
  const shiftText = shift ? " + Shift" : "";
  hint.innerHTML = f ? `<span class="hint-finger">${f.label}</span> <span class="hint-key">${k}${shiftText}</span>` : "";
}

function highlightFinger(id) {
  fingerLegend.querySelectorAll(".finger-pill").forEach((p) => p.classList.remove("active"));
  if (!id) return;
  const t = fingerLegend.querySelector(`[data-finger="${id}"]`);
  if (t) t.classList.add("active");
}

// ── Variant metadata for sidebar ─────────────
const variantMeta = {
  mix: { title: "Examens-Mix", desc: "Begriffe, Abkürzungen und Definitionen gemischt." },
  terms: { title: "Begriffe", desc: "Juristische Fachbegriffe tippen." },
  abbrev: { title: "Abkürzungen", desc: "Gängige juristische Abkürzungen." },
  definitions: { title: "Definitionen", desc: "Rechtsdefinitionen ausschreiben." },
  daily: { title: "Daily Drill", desc: "Dein täglicher Mix für die Routine." },
  timed: { title: "Zeitmodus", desc: "60 Sekunden — tippe so viel wie möglich!" },
};

// ── Lesson rendering ─────────────────────────
function renderLessons() {
  lessonList.innerHTML = "";

  // Helper: Create single card
  const createCard = (lesson) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "lesson-card";
    card.dataset.lesson = lesson.id;
    if (activeLesson && lesson.id === activeLesson.id) card.classList.add("active");

    // Only show chapter meta if we are NOT in the structured chapter view
    const showMeta = activeMode.id !== "learning" || lessonSearch.value;
    const metaStr = (showMeta && lesson.chapter) ? `<div class="lesson-meta">${lesson.chapter}</div>` : "";

    card.innerHTML = `${metaStr}<div class="lesson-title">${lesson.title}</div><div class="lesson-desc">${lesson.description || ""}</div>`;
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      selectLesson(lesson);
    });
    return card;
  };

  // Mode 1: Legal Mode -> Variant list as vertical items
  if (activeMode.id === "legal") {
    loadMoreBtn.classList.add("hidden");
    const variantIds = Object.keys(activeMode.variants);
    variantIds.forEach(vid => {
      const meta = variantMeta[vid] || { title: vid, desc: "" };
      const isActive = (activeVariantId === vid);

      const item = document.createElement("button");
      item.type = "button";
      item.className = `chapter-header variant-item ${isActive ? "expanded" : ""}`;
      item.dataset.variant = vid;
      item.innerHTML = `
        <div class="chap-info">
          <div class="chap-title">${meta.title}</div>
          <div class="chap-desc">${meta.desc}</div>
        </div>
      `;
      item.addEventListener("click", () => {
        setVariant(vid);
        typingInput.focus();
      });
      lessonList.appendChild(item);
    });
    return;
  }

  // Mode 2: Search active -> Flat List
  if (lessonSearch.value) {
    const slice = filteredLessons.slice(0, visibleCount);
    slice.forEach((lesson) => {
      lessonList.appendChild(createCard(lesson));
    });
    loadMoreBtn.classList.toggle("hidden", visibleCount >= filteredLessons.length);
    return;
  }

  // Mode 3: Learning Mode (Structured Accordion)
  loadMoreBtn.classList.add("hidden"); // Hide load more in accordion mode

  // Group by chapter
  const chapters = {};
  activeMode.lessons.forEach(l => {
    const c = l.chapter || "Sonstige";
    if (!chapters[c]) chapters[c] = [];
    chapters[c].push(l);
  });

  Object.keys(chapters).forEach(chapName => {
    const isExpanded = (activeChapter === chapName);
    const meta = chapterData[chapName] || { title: chapName, desc: "" };

    // Chapter Header
    const header = document.createElement("button");
    header.className = `chapter-header ${isExpanded ? "expanded" : ""}`;

    // Lucide Icons
    const chevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>`;
    const chevronDown = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>`;

    header.innerHTML = `
      <div class="chap-icon-state">${isExpanded ? chevronDown : chevronRight}</div>
      <div class="chap-info">
        <div class="chap-title">${meta.title}</div>
        <div class="chap-desc">${meta.desc}</div>
      </div>
      <div class="chap-count">${chapters[chapName].length}</div>
    `;
    header.onclick = () => toggleChapter(chapName);
    lessonList.appendChild(header);

    // Chapter Lessons Container
    if (isExpanded) {
      const container = document.createElement("div");
      container.className = "chapter-container expanded";
      chapters[chapName].forEach(lesson => {
        container.appendChild(createCard(lesson));
      });
      lessonList.appendChild(container);
    }
  });
}

function toggleChapter(chapName) {
  if (activeChapter === chapName) {
    activeChapter = null; // Collapse
  } else {
    activeChapter = chapName; // Expand
    // Auto-select first lesson of this chapter
    const first = activeMode.lessons.find(l => l.chapter === chapName);
    if (first) selectLesson(first);
  }
  renderLessons();
}

function selectLesson(lesson) {
  activeLesson = lesson;
  lessonList.querySelectorAll(".lesson-card").forEach((c) =>
    c.classList.toggle("active", c.dataset.lesson === lesson.id)
  );
  resetSession();
  updateDefPanel();
  typingInput.focus();
}

// ── Mode / Variant switching ─────────────────
function setMode(modeId) {
  activeMode = modes[modeId];
  modeChip.textContent = activeMode.chip || activeMode.name;

  if (activeMode.variants) {
    activeVariantId = "mix";
    rechtsgebietFilter = "all";
    legalToggle.classList.add("hidden"); // no longer using horizontal tabs
    setVariant(activeVariantId);
  } else {
    legalToggle.classList.add("hidden");
    const rgToggle = $("rechtsgebietToggle");
    if (rgToggle) rgToggle.classList.add("hidden");
    defPanel.classList.add("hidden");
    lessonSearch.closest(".sidebar-filters").classList.remove("hidden");
    loadMoreBtn.parentElement.classList.remove("hidden");
    allLessons = [...activeMode.lessons];
    currentLessons = [...activeMode.lessons];
    buildChapterOptions();
    applyFilters();
  }
}

function setVariant(id) {
  activeVariantId = id;
  // Clean up timed mode when switching away
  stopTimedMode();
  timedModeActive = (id === "timed");
  document.body.classList.toggle("timed-active", timedModeActive);
  // Show/hide WPM gauge — visible in all legal variants
  if (wpmGauge) wpmGauge.classList.toggle("hidden", activeMode.id !== "legal");
  const v = activeMode.variants[id];
  allLessons = [...v.lessons];
  currentLessons = [...v.lessons];
  defPanel.classList.toggle("hidden", id !== "definitions");
  // Highlight active variant in sidebar
  document.querySelectorAll(".variant-item").forEach(b =>
    b.classList.toggle("expanded", b.dataset.variant === id)
  );
  // Show Rechtsgebiet sub-filter for all legal variants
  const rgToggle = $("rechtsgebietToggle");
  if (rgToggle) rgToggle.classList.remove("hidden");
  // Hide search/filters — legal modes are all auto-generated
  lessonSearch.closest(".sidebar-filters").classList.add("hidden");
  loadMoreBtn.parentElement.classList.add("hidden");
  filteredLessons = [...currentLessons];
  renderLessons();
  if (currentLessons.length > 0) selectLesson(currentLessons[0]);
}

function setRechtsgebiet(area) {
  rechtsgebietFilter = area;
  document.querySelectorAll("[data-rg]").forEach((b) =>
    b.classList.toggle("active", b.dataset.rg === area)
  );
  // Refill defs pool with new filter
  refillPool("defs");
  // Re-generate current lesson
  if (activeVariantId === "definitions") {
    const v = activeMode.variants.definitions;
    v.lessons = [generateSingleDef()];
    allLessons = [...v.lessons];
    currentLessons = [...v.lessons];
    applyFilters();
  } else if (activeVariantId === "mix") {
    const v = activeMode.variants.mix;
    v.lessons = [generateSingleMix()];
    allLessons = [...v.lessons];
    currentLessons = [...v.lessons];
    applyFilters();
  } else if (activeVariantId === "timed") {
    const v = activeMode.variants.timed;
    v.lessons = [generateTimedText()];
    allLessons = [...v.lessons];
    currentLessons = [...v.lessons];
    applyFilters();
  }
}

// ── Definition panel ─────────────────────────
function updateDefPanel() {
  if (activeVariantId !== "definitions" || !activeLesson) return;
  defVisible = false;
  defTerm.textContent = activeLesson.term || activeLesson.title;
  defText.textContent = activeLesson.definition || activeLesson.text;
  defText.classList.add("hidden");
  $("toggleDefinition").textContent = "Anzeigen";
  const badge = $("rgBadge");
  if (badge) badge.textContent = activeLesson.rechtsgebiet || "";
}

// ── Typing logic ─────────────────────────────
function renderText() {
  typingArea.innerHTML = "";
  if (!activeLesson) return;
  // Prepare renderable text (normalize ellipsis etc.) and group characters into word wrappers
  const text = normalizeText(activeLesson.text || "");
  // store current render text length for progress/completion calculations
  currentRenderText = text;
  let wordWrapper = null;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isSpace = /\s/.test(char);
    if (!isSpace) {
      if (!wordWrapper) {
        wordWrapper = document.createElement('span');
        wordWrapper.className = 'word';
        typingArea.appendChild(wordWrapper);
      }
      const cspan = document.createElement('span');
      cspan.textContent = char;
      cspan.dataset.char = char;
      if (typingArea.childElementCount === 0 || (typingArea.firstChild === wordWrapper && wordWrapper.childElementCount === 0 && i === 0)) cspan.classList.add('active');
      wordWrapper.appendChild(cspan);
    } else {
      // close current word wrapper
      wordWrapper = null;
      const sspan = document.createElement('span');
      sspan.className = 'space';
      sspan.dataset.char = ' ';
      // Use a non-breaking space so the span always produces visible width
      sspan.textContent = '\u00A0';
      typingArea.appendChild(sspan);
    }
  }
}

// Hold the normalized text currently rendered (used for progress/completion)
let currentRenderText = "";

function normalizeText(t) {
  if (!t) return "";
  // Replace single unicode ellipsis with three dots to match typing behavior
  return t.replace(/\u2026/g, "...");
}

function resetSession() {
  typingInput.value = "";
  startTime = null;
  errors = 0;
  completed = false;
  completion.classList.remove("show");
  stopTimedMode();
  if (timedModeActive) {
    timeEl.textContent = "1:00";
    progressBar.style.width = "100%";
    progressBar.classList.remove("progress-urgent");
    if (wpmGaugeFill) { wpmGaugeFill.style.width = "0%"; wpmGaugeFill.classList.remove("wpm-gauge-reached"); }
    if (wpmGaugeValue) wpmGaugeValue.textContent = "0 / 80 WPM";
  }
  updateStats();
  renderText();
  updateProgress();
  if (activeLesson) highlightKey(getNextChar());
}

function getNextChar() {
  if (!activeLesson) return "";
  return (currentRenderText[typingInput.value.length] || "");
}

function updateProgress() {
  if (!activeLesson) return;
  const total = currentRenderText.length || (activeLesson.text || "").length;
  const pct = (typingInput.value.length / total) * 100;
  progressBar.style.width = `${Math.min(pct, 100)}%`;
}

function updateStats() {
  const typed = typingInput.value.length;
  const correct = typed - errors;
  const acc = typed === 0 ? 100 : Math.max(0, Math.round((correct / typed) * 100));
  const elapsed = startTime ? (Date.now() - startTime) / 60000 : 0;
  const wpm = elapsed > 0 ? Math.round((correct / 5) / elapsed) : 0;

  wpmEl.textContent = wpm;
  accuracyEl.textContent = `${acc}%`;
  errorsEl.textContent = errors;

  if (timedModeActive && startTime) {
    const elapsedSec = (Date.now() - startTime) / 1000;
    const remaining = Math.max(0, TIMED_DURATION - elapsedSec);
    const rm = Math.floor(remaining / 60);
    const rs = String(Math.ceil(remaining % 60)).padStart(2, "0");
    timeEl.textContent = `${rm}:${rs}`;
    // Update progress bar (shrinks from 100% to 0%)
    const pct = (remaining / TIMED_DURATION) * 100;
    progressBar.style.width = `${pct}%`;
    progressBar.classList.toggle("progress-urgent", remaining <= 10);
    // Update WPM gauge
    if (wpmGauge && wpmGaugeValue && wpmGaugeFill) {
      const gaugePct = Math.min(100, (wpm / 80) * 100);
      wpmGaugeFill.style.width = `${gaugePct}%`;
      wpmGaugeValue.textContent = `${wpm} / 80 WPM`;
      wpmGaugeFill.classList.toggle("wpm-gauge-reached", wpm >= 80);
    }
    return { wpm, acc, time: `${rm}:${rs}` };
  }

  const sec = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, "0");
  timeEl.textContent = `${m}:${s}`;

  return { wpm, acc, time: `${m}:${s}` };
}

function updateTypingFeedback() {
  const typed = typingInput.value.split("");
  const spans = typingArea.querySelectorAll("[data-char]");
  errors = 0;
  let hadError = false;

  spans.forEach((span, i) => {
    const ch = typed[i];
    span.classList.remove("correct", "incorrect", "active");
    if (ch == null) {
      if (i === typed.length) span.classList.add("active");
      return;
    }
    if (ch === span.dataset.char) {
      span.classList.add("correct");
    } else {
      span.classList.add("incorrect");
      errors += 1;
      hadError = true;
    }
  });

  // Shake on error
  if (hadError && typed.length > 0) {
    const lastIdx = typed.length - 1;
    const lastSpan = spans[lastIdx];
    if (lastSpan && lastSpan.classList.contains("incorrect")) {
      typingArea.classList.add("shake");
      setTimeout(() => typingArea.classList.remove("shake"), 400);
    }
  }

  updateProgress();
  const stats = updateStats();

  if (typed.length >= currentRenderText.length && !timedModeActive) {
    completed = true;
    highlightKey("");
    showCompletion(stats);
  } else {
    highlightKey(getNextChar());
  }
}

function handleInput(e) {
  if (completed) {
    e.target.value = e.target.value.slice(0, currentRenderText.length || activeLesson.text.length);
    return;
  }
  if (!startTime) {
    startTime = Date.now();
    if (timedModeActive) startTimedCountdown();
  }
  if (e.target.value.length > (currentRenderText.length || activeLesson.text.length)) {
    e.target.value = e.target.value.slice(0, currentRenderText.length || activeLesson.text.length);
  }
  updateTypingFeedback();
}

// ── Completion & Rewards ─────────────────────
function showCompletion(stats) {
  cWpm.textContent = stats.wpm;
  cAcc.textContent = `${stats.acc}%`;
  cTime.textContent = stats.time;

  const store = loadStore();
  const isNewRecord = stats.wpm > (store.bestWpm || 0);

  // Timed mode: special completion flow
  if (timedModeActive) {
    const typed = typingInput.value.length;
    if (stats.wpm >= 80) {
      completionIcon.textContent = "⚖️";
      completionTitle.textContent = "Examensready!";
      completionSub.textContent = `${stats.wpm} WPM · ${stats.acc}% Genauigkeit · ${typed} Zeichen`;
      completionBadge.textContent = "⚖️ Examensbereit!";
      completionBadge.classList.remove("hidden");
      triggerConfetti();
    } else if (isNewRecord && stats.wpm > 10) {
      completionIcon.textContent = "🏆";
      completionTitle.textContent = "Neuer Rekord!";
      completionSub.textContent = `${stats.wpm} WPM · ${stats.acc}% · ${typed} Zeichen — neue Bestleistung!`;
      completionBadge.textContent = "🏆 Neuer Rekord!";
      completionBadge.classList.remove("hidden");
      triggerConfetti();
    } else {
      completionIcon.textContent = "⏱️";
      completionTitle.textContent = "Zeit vorbei!";
      completionSub.textContent = `${stats.wpm} WPM · ${stats.acc}% Genauigkeit · ${typed} Zeichen`;
      completionBadge.classList.add("hidden");
      if (stats.wpm < 80) {
        completionSub.textContent += " — 80 WPM für Examensready!";
      }
    }
  } else if (isNewRecord && stats.wpm > 10) {
    completionIcon.textContent = "🏆";
    completionTitle.textContent = "Neuer Rekord!";
    completionSub.textContent = `${stats.wpm} WPM — deine neue Bestleistung.`;
    completionBadge.textContent = "🏆 Neuer Rekord!";
    completionBadge.classList.remove("hidden");
    triggerConfetti();
  } else if (stats.acc >= 95 && stats.wpm > 20) {
    completionIcon.textContent = "🔥";
    completionTitle.textContent = "Stark!";
    completionSub.textContent = `${stats.acc}% Genauigkeit bei ${stats.wpm} WPM.`;
    completionBadge.classList.add("hidden");
  } else {
    completionIcon.textContent = "✅";
    completionTitle.textContent = "Geschafft!";
    completionSub.textContent = "Weiter so. Jede Lektion zählt.";
    completionBadge.classList.add("hidden");
  }

  recordCompletion(stats.wpm, stats.acc);
  updateStreakUI();
  updateBestWpmUI();
  completion.classList.add("show");

  // Timed mode: update button text
  const nextBtn = $("nextLesson");
  nextBtn.textContent = timedModeActive ? "Nächste Runde →" : "Nächste Lektion →";
}

// ── Confetti 🎉 ─────────────────────────────
function triggerConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  const colors = ["#f59e0b", "#ef4444", "#3b82f6", "#22c55e", "#8b5cf6", "#ec4899"];
  const particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      rv: (Math.random() - 0.5) * 8,
      life: 1,
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;
    particles.forEach((p) => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.rot += p.rv;
      p.life -= 0.006;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (alive && frame < 300) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
  requestAnimationFrame(draw);
}

// ── Navigation ───────────────────────────────
function selectNextLesson() {
  // All legal variants: auto-generate next random lesson
  if (activeMode.id === "legal") {
    const gen = { mix: generateSingleMix, terms: generateSingleTerms, abbrev: generateSingleAbbrevs, definitions: generateSingleDef, timed: generateTimedText }[activeVariantId];
    if (gen) {
      const lesson = gen();
      const v = activeMode.variants[activeVariantId];
      v.lessons = [lesson];
      allLessons = [lesson];
      currentLessons = [lesson];
      filteredLessons = [lesson];
      renderLessons();
      selectLesson(lesson);
      return;
    }
  }
  // Learning / Daily: cycle through list
  const idx = currentLessons.findIndex((l) => l.id === activeLesson?.id);
  const next = (idx >= 0 ? idx + 1 : 0) % currentLessons.length;
  selectLesson(currentLessons[next]);
}

function shuffleLessons() {
  // In legal mode: generate fresh random session
  if (activeMode.id === "legal") { selectNextLesson(); return; }
  filteredLessons = shuffleArray(filteredLessons);
  visibleCount = PAGE_SIZE;
  renderLessons();
  if (filteredLessons.length) selectLesson(filteredLessons[0]);
}

// ── Filters ──────────────────────────────────
function buildChapterOptions() {
  const chapters = new Set();
  allLessons.forEach((l) => chapters.add(l.chapter || "Alle"));

  if (chapters.size <= 1) {
    chapterSelect.classList.add("hidden");
    return;
  }
  chapterSelect.classList.remove("hidden");
  chapterSelect.innerHTML = "";
  const allOpt = document.createElement("option");
  allOpt.value = "Alle"; allOpt.textContent = "Alle";
  chapterSelect.appendChild(allOpt);
  Array.from(chapters).filter((c) => c !== "Alle").sort().forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    chapterSelect.appendChild(opt);
  });
}

function generateRandomLessonForChapter(chapter) {
  const pool = allLessons.filter((l) => l.chapter === chapter);
  if (!pool.length) return null;
  // collect words from all lessons in the chapter
  let words = [];
  pool.forEach((p) => {
    const w = (p.text || "").split(/\s+/).filter(Boolean);
    words = words.concat(w);
  });
  if (!words.length) return null;
  // shuffle words
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  const sample = words.slice(0, Math.min(40, words.length)).join(" ");
  const lesson = {
    id: `rand-${chapter.replace(/\s+/g, '-')}-${Date.now()}`,
    chapter,
    title: `Zufallsübung — ${chapter}`,
    description: `Randomisierte Übung für ${chapter}`,
    text: sample,
  };
  return lesson;
}

function applyFilters() {
  const chapter = chapterSelect.value || "Alle";
  const q = lessonSearch.value.trim().toLowerCase();

  filteredLessons = allLessons.filter((l) => {
    const matchCh = chapter === "Alle" || l.chapter === chapter;
    const hay = `${l.title} ${l.description} ${l.term || ""}`.toLowerCase();
    const matchQ = !q || hay.includes(q);
    return matchCh && matchQ;
  });

  if (!filteredLessons.length) {
    lessonList.innerHTML = `<p style="color:var(--muted);font-size:13px;padding:12px">Keine Treffer.</p>`;
    loadMoreBtn.classList.add("hidden");
    return;
  }
  renderLessons();
  selectLesson(filteredLessons[0]);
}

// ── Sidebar toggle ───────────────────────────
function openSidebar() {
  sidebar.classList.remove("closed");
  sidebarOpen = true;
}

function closeSidebar() {
  sidebar.classList.add("closed");
  sidebarOpen = false;
}

// ── Keyboard toggle ──────────────────────────
function toggleKeyboardPanel() {
  keyboardVisible = !keyboardVisible;
  keyboardWrap.classList.toggle("collapsed", !keyboardVisible);
  document.body.classList.toggle("keyboard-open", keyboardVisible);
  $("toggleKeyboard").textContent = keyboardVisible ? "⌨" : "⌨";
}

// ── Utility ──────────────────────────────────
function shuffleArray(list) {
  const c = [...list];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function seededRandom(seed) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed(list, seed) {
  const rand = seededRandom(seed);
  const c = [...list];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function getDateSeed() {
  const n = new Date();
  const key = `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) { h = (h << 5) - h + key.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function pickRandom(list, count) {
  const picks = [];
  for (let i = 0; i < count; i++) {
    const item = list[Math.floor(Math.random() * list.length)];
    if (item) picks.push(item);
  }
  return picks;
}

function shortenDef(text) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const s = cleaned.split(/[.!?]/)[0].trim();
  if (!s) return cleaned.slice(0, 120);
  return s.length > 140 ? `${s.slice(0, 140).trim()}…` : `${s}.`;
}

// ── CSV Parsing (robust, RFC4180) ───────────
function parseCSV(text, delim = ";") {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') { field += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === delim && !inQuotes) {
      row.push(field); field = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i++; // handle \r\n
      row.push(field); rows.push(row); row = []; field = '';
    } else {
      field += ch;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function toTermData(rows) {
  return rows.slice(1).map((r) => ({ term: (r[1] || r[0] || "").trim() })).filter((d) => d.term);
}

function toAbbrevData(rows) {
  return rows.slice(1).map((r) => ({ term: (r[0] || "").trim(), abbr: (r[1] || "").trim() })).filter((d) => d.abbr);
}

function toDefData(rows) {
  return rows.slice(1).map((r) => ({ rechtsgebiet: (r[0] || "").trim(), term: (r[1] || "").trim(), definition: (r[2] || "").trim() })).filter((d) => d.term && d.definition);
}

async function loadCSV(path) {
  const resp = await fetch(path);
  if (!resp.ok) throw new Error(`CSV load failed: ${path}`);
  const text = await resp.text();
  return parseCSV(text.replace(/^\uFEFF/, ""), ";");
}

// ── Lesson builders (all auto-generating) ────
function refillPool(key) {
  const dsMap = { terms: "terms", abbrevs: "abbrev", defs: "definitions" };
  if (!datasets[dsMap[key]]) return;
  let data = [...datasets[dsMap[key]]];
  if (key === "defs" && rechtsgebietFilter !== "all") {
    data = data.filter((d) => d.rechtsgebiet === rechtsgebietFilter);
    if (data.length === 0) data = [...datasets[dsMap[key]]]; // fallback
  }
  pools[key] = shuffleArray(data);
}

function generateSingleTerms() {
  counters.terms++;
  if (pools.terms.length < 24) refillPool("terms");
  const chunk = pools.terms.splice(0, 24);
  return {
    id: `terms-${counters.terms}`,
    title: "Begriffe",
    description: `${chunk.length} zufällige juristische Begriffe`,
    text: chunk.map((t) => t.term).join(" "),
  };
}

function generateSingleAbbrevs() {
  counters.abbrevs++;
  if (pools.abbrevs.length < 20) refillPool("abbrevs");
  const chunk = pools.abbrevs.splice(0, 20);
  return {
    id: `abbr-${counters.abbrevs}`,
    title: "Abkürzungen",
    description: `${chunk.length} zufällige Abkürzungen`,
    text: chunk.map((a) => a.abbr).join(" "),
  };
}

function generateSingleDef() {
  counters.defs++;
  if (pools.defs.length < 1) refillPool("defs");
  const d = pools.defs.splice(0, 1)[0];
  return {
    id: `def-${counters.defs}`,
    title: d.term,
    description: d.rechtsgebiet || "Definition tippen",
    term: d.term, definition: d.definition, rechtsgebiet: d.rechtsgebiet, text: d.definition,
  };
}

function generateSingleMix() {
  counters.mix++;
  if (pools.terms.length < 14) refillPool("terms");
  if (pools.abbrevs.length < 8) refillPool("abbrevs");
  if (pools.defs.length < 2) refillPool("defs");
  const t = pools.terms.splice(0, 14).map((x) => x.term);
  const a = pools.abbrevs.splice(0, 8).map((x) => x.abbr);
  const d = pools.defs.splice(0, 2).map((x) => shortenDef(x.definition));
  return {
    id: `mix-${counters.mix}`,
    title: "Examens-Mix",
    description: "Begriffe · Abkürzungen · Definitionen",
    text: shuffleArray([...t, ...a, ...d]).join(" "),
  };
}

function buildTermLessons() { return [generateSingleTerms()]; }
function buildAbbrevLessons() { return [generateSingleAbbrevs()]; }
function buildDefLessons() { return [generateSingleDef()]; }
function buildMixLessons() { return [generateSingleMix()]; }

function buildDailyLessons(terms, abbrevs, defs) {
  const seed = getDateSeed();
  const t = shuffleWithSeed(terms, seed + 11).slice(0, 20).map((x) => x.term);
  const a = shuffleWithSeed(abbrevs, seed + 29).slice(0, 12).map((x) => x.abbr);
  const d = shuffleWithSeed(defs, seed + 47).slice(0, 3).map((x) => shortenDef(x.definition));
  const dateLabel = new Date().toLocaleDateString("de-DE");
  return [{
    id: "daily-1", chapter: "Daily Drill",
    title: `Daily Drill ${dateLabel}`, description: "Tages-Mix für deine Routine",
    text: [...t, ...a, ...d].join(" "),
  }];
}

// ── Timed mode ───────────────────────────────
function generateTimedText() {
  if (pools.defs.length < 15) refillPool("defs");
  const chunk = pools.defs.splice(0, 15);
  const text = chunk.map(d => d.definition).join(" ");
  return {
    id: `timed-${Date.now()}`,
    title: "⏱ Zeitmodus",
    description: "60 Sekunden — tippe so viel wie möglich!",
    text: text,
  };
}

function buildTimedLessons() { return [generateTimedText()]; }

function startTimedCountdown() {
  stopTimedMode(); // clear any previous
  timedInterval = setInterval(() => {
    if (!startTime || completed) { stopTimedMode(); return; }
    const elapsedSec = (Date.now() - startTime) / 1000;
    const remaining = TIMED_DURATION - elapsedSec;
    updateStats();
    if (remaining <= 0) {
      // Time's up!
      stopTimedMode();
      completed = true;
      timeEl.textContent = "0:00";
      progressBar.style.width = "0%";
      highlightKey("");
      const typed = typingInput.value.length;
      const correct = typed - errors;
      const acc = typed === 0 ? 100 : Math.max(0, Math.round((correct / typed) * 100));
      const wpm = Math.round((correct / 5) / (TIMED_DURATION / 60));
      showCompletion({ wpm, acc, time: "1:00" });
    }
  }, 200);
}

function stopTimedMode() {
  if (timedInterval) {
    clearInterval(timedInterval);
    timedInterval = null;
  }
  progressBar.classList.remove("progress-urgent");
}

// ── Data loading ─────────────────────────────
async function loadDatasets() {
  try {
    const [tRows, aRows, dRows] = await Promise.all([
      loadCSV("./alle_begriffe.csv"),
      loadCSV("./jur_abkuerzungen_final.csv"),
      loadCSV("./alle_begriffe_mit_definitionen.csv"),
    ]);

    datasets.terms = toTermData(tRows);
    datasets.abbrev = toAbbrevData(aRows);
    datasets.definitions = toDefData(dRows);

    modes.legal.variants.terms.lessons = buildTermLessons();
    modes.legal.variants.abbrev.lessons = buildAbbrevLessons();
    modes.legal.variants.definitions.lessons = buildDefLessons();
    modes.legal.variants.mix.lessons = buildMixLessons();
    modes.legal.variants.daily.lessons = buildDailyLessons(datasets.terms, datasets.abbrev, datasets.definitions);
    modes.legal.variants.timed.lessons = buildTimedLessons();
  } catch (err) {
    console.error("CSV load error:", err);
  }
}

// ── Init ─────────────────────────────────────
function init() {
  initDarkMode();
  renderKeyboard();
  renderLegend();
  updateStreakUI();
  updateBestWpmUI();

  // Default: show keyboard in learning mode, hide in legal
  // (will toggle per mode later)

  // Events
  typingArea.addEventListener("click", () => typingInput.focus());
  typingInput.addEventListener("input", handleInput);

  // Ensure typing input receives focus when user starts typing (helps if focus is lost, e.g., after theme toggle)
  document.addEventListener('keydown', (e) => {
    try {
      const pwGate = document.getElementById('pwGate');
      if (pwGate && !pwGate.classList.contains('hidden')) return; // gate visible
      if (!typingInput) return;
      const active = document.activeElement;
      if (active === typingInput) return;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;
      // Ignore modifier-only keys
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      typingInput.focus();
    } catch (err) { /* ignore */ }
  });

  $("restart").addEventListener("click", () => { resetSession(); typingInput.focus(); });
  $("skipLesson").addEventListener("click", () => { selectNextLesson(); typingInput.focus(); });

  $("openSidebar").addEventListener("click", openSidebar);
  $("closeSidebar").addEventListener("click", closeSidebar);

  $("toggleDark").addEventListener("click", toggleDarkMode);
  $("toggleKeyboard").addEventListener("click", toggleKeyboardPanel);

  $("changeMode").addEventListener("click", () => {
    app.classList.add("hidden");
    modeScreen.classList.remove("hidden");
  });

  document.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.mode);
      modeScreen.classList.add("hidden");
      app.classList.remove("hidden");
      // Always show keyboard by default
      keyboardVisible = true;
      keyboardWrap.classList.remove("collapsed");
      document.body.classList.add("keyboard-open");
      typingInput.focus();
    });
  });


  document.querySelectorAll("[data-rg]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setRechtsgebiet(btn.dataset.rg);
      typingInput.focus();
    });
  });

  $("nextLesson").addEventListener("click", selectNextLesson);
  $("repeatLesson").addEventListener("click", () => { resetSession(); typingInput.focus(); });

  $("toggleDefinition").addEventListener("click", () => {
    if (activeVariantId !== "definitions") return;
    defVisible = !defVisible;
    defText.classList.toggle("hidden", !defVisible);
    $("toggleDefinition").textContent = defVisible ? "Verbergen" : "Anzeigen";
  });

  lessonSearch.addEventListener("input", () => { visibleCount = PAGE_SIZE; applyFilters(); });
  chapterSelect.addEventListener("change", () => { visibleCount = PAGE_SIZE; applyFilters(); });
  if (randomizeChapterBtn) randomizeChapterBtn.addEventListener('click', () => {
    // determine chapter: prefer chapterSelect if visible, else current active lesson's chapter
    const chap = (chapterSelect && !chapterSelect.classList.contains('hidden')) ? chapterSelect.value : (activeLesson ? activeLesson.chapter : null);
    if (!chap) { alert('Wähle zuerst ein Kapitel aus (oder öffne eine Lektion).'); return; }
    const rnd = generateRandomLessonForChapter(chap);
    if (!rnd) { alert('Keine Lektionen für dieses Kapitel gefunden.'); return; }
    // set as current lessons and select (keep full lesson set intact)
    filteredLessons = [rnd];
    currentLessons = [rnd];
    renderLessons();
    selectLesson(rnd);
  });
  loadMoreBtn.addEventListener("click", () => { visibleCount += PAGE_SIZE; renderLessons(); });

  // Stats timer
  setInterval(() => { if (startTime && !completed) updateStats(); }, 1000);

  // Load data and start
  loadDatasets().then(() => setMode("learning"));
}

init();
