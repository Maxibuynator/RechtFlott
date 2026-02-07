#!/usr/bin/env python3
"""
Generiert jur_definitionen_final.csv mit kuratierten Definitionen
aus iurastudent.de + gescrapten Strafrecht-JSONs — organisiert nach Rechtsgebiet.

Quellen:
  - https://www.iurastudent.de/content/definitionen
  - strafrecht_*_raw.json (async-scraped)
"""

import csv, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
JSON_FILES = [
    ROOT / "strafrecht_bdefgh_raw.json",
    ROOT / "strafrecht_iklmno_raw.json",
    ROOT / "strafrecht_prstuvwz_raw.json",
]

DEFINITIONS = [
    # ═══════════════════════════════════════
    #  STRAFRECHT
    # ═══════════════════════════════════════
    ("Strafrecht", "Vorsatz", "Vorsatz ist das Wissen und Wollen der Verwirklichung eines Straftatbestandes."),
    ("Strafrecht", "Dolus directus 1. Grades", "Bei der Absicht kommt es dem Täter im Sinne zielgerichteten Wollens darauf an, den Tatbestand zu verwirklichen."),
    ("Strafrecht", "Dolus directus 2. Grades", "Direkter Vorsatz zweiten Grades liegt vor, wenn der Täter den Eintritt des tatbestandlichen Erfolgs als sicher voraussieht."),
    ("Strafrecht", "Dolus eventualis", "Bedingter Vorsatz liegt vor, wenn der Täter den Eintritt des tatbestandlichen Erfolgs als möglich und nicht ganz fernliegend erkennt und sich damit abfindet."),
    ("Strafrecht", "Fahrlässigkeit", "Fahrlässig handelt, wer die im Verkehr erforderliche Sorgfalt außer Acht lässt."),
    ("Strafrecht", "Bewusste Fahrlässigkeit", "Bewusste Fahrlässigkeit liegt vor, wenn der Täter die Möglichkeit der Tatbestandsverwirklichung erkennt, aber pflichtwidrig auf deren Ausbleiben vertraut."),
    ("Strafrecht", "Unbewusste Fahrlässigkeit", "Unbewusste Fahrlässigkeit liegt vor, wenn der Täter die Möglichkeit der Tatbestandsverwirklichung nicht erkennt, sie aber hätte erkennen können und müssen."),
    ("Strafrecht", "Notwehr", "Notwehr ist die Verteidigung, die erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder einem anderen abzuwenden."),
    ("Strafrecht", "Angriff", "Ein Angriff ist jede durch menschliches Verhalten drohende Verletzung rechtlich geschützter Güter oder Interessen."),
    ("Strafrecht", "Gegenwärtigkeit des Angriffs", "Gegenwärtig ist ein Angriff, der unmittelbar bevorsteht, gerade stattfindet oder noch fortdauert."),
    ("Strafrecht", "Erforderlichkeit der Verteidigung", "Die Verteidigung ist erforderlich, wenn sie geeignet ist und das mildeste Mittel darstellt, den Angriff sofort und endgültig abzuwehren."),
    ("Strafrecht", "Notwehrprovokation", "Eine Notwehrprovokation liegt vor, wenn der Angegriffene den Angriff durch ein vorwerfbares Verhalten selbst herausgefordert hat."),
    ("Strafrecht", "Absichtsprovokation", "Eine Absichtsprovokation begeht, wer zielstrebig im Sinne des dolus directus 1. Grades durch ein rechtswidriges Verhalten einen Angriff provoziert."),
    ("Strafrecht", "Schuld", "Schuld ist die persönliche Vorwerfbarkeit der Tat."),
    ("Strafrecht", "Kausalität", "Kausal ist jede Handlung, die nicht hinweggedacht werden kann, ohne dass der Erfolg in seiner konkreten Gestalt entfiele."),
    ("Strafrecht", "Äquivalenztheorie", "Nach der Äquivalenztheorie ist jede Bedingung ursächlich, ohne die der Erfolg in seiner konkreten Gestalt nicht eingetreten wäre."),
    ("Strafrecht", "Objektive Zurechnung", "Objektiv zurechenbar ist ein Erfolg, wenn der Täter eine rechtlich relevante Gefahr geschaffen hat, die sich im tatbestandsmäßigen Erfolg realisiert hat."),
    ("Strafrecht", "Adäquanztheorie", "Nach der Adäquanztheorie sind nur solche Bedingungen ursächlich, die nicht außerhalb aller Wahrscheinlichkeit liegen."),
    ("Strafrecht", "Rechtswidrigkeit", "Eine Handlung ist rechtswidrig, wenn sie gegen die Rechtsordnung verstößt und nicht durch einen Rechtfertigungsgrund gedeckt ist."),
    ("Strafrecht", "Versuch", "Der Versuch einer Straftat liegt vor, wenn der Täter nach seiner Vorstellung von der Tat zur Tatbestandsverwirklichung unmittelbar ansetzt."),
    ("Strafrecht", "Rücktritt vom Versuch", "Der Rücktritt erfordert, dass der Täter freiwillig die weitere Ausführung der Tat aufgibt oder deren Vollendung verhindert."),
    ("Strafrecht", "Aufgeben der weiteren Tatausführung", "Bei der Tataufgabe ist ein endgültiger und unbedingter Gegenentschluss erforderlich, die Tat nun nicht mehr begehen zu wollen."),
    ("Strafrecht", "Abergläubischer Versuch", "Die Herbeiführung des tatbestandlichen Erfolgs wird über Mittel angestrebt, die nicht den Naturgesetzen unterliegen."),
    ("Strafrecht", "Mittäterschaft", "Mittäter ist, wer gemeinschaftlich mit einem anderen eine Straftat begeht, wobei ein gemeinsamer Tatplan und ein wesentlicher Tatbeitrag erforderlich sind."),
    ("Strafrecht", "Täterschaft", "Täter ist, wer die Straftat selbst begeht, durch einen anderen begeht oder gemeinschaftlich mit einem anderen begeht."),
    ("Strafrecht", "Anstifter", "Anstifter ist, wer vorsätzlich einen anderen zu dessen vorsätzlich begangener rechtswidriger Tat bestimmt hat."),
    ("Strafrecht", "Beihilfe", "Beihilfe leistet, wer vorsätzlich einem anderen zu dessen vorsätzlich begangener rechtswidriger Tat Hilfe geleistet hat."),
    ("Strafrecht", "Unterlassen", "Ein Unterlassen ist die pflichtwidrige Nichtvornahme einer gebotenen Handlung."),
    ("Strafrecht", "Garantenstellung", "Die Garantenstellung ist die besondere Rechtspflicht, dafür einzustehen, dass ein bestimmter Erfolg nicht eintritt."),
    ("Strafrecht", "Heimtücke", "Heimtückisch handelt, wer die Arg- und Wehrlosigkeit des Opfers bewusst zur Tötung ausnutzt."),
    ("Strafrecht", "Arglosigkeit", "Arglos ist, wer sich bei Beginn des ersten mit Tötungsvorsatz geführten Angriffs keines erheblichen Angriffs auf sein Leben bewusst ist."),
    ("Strafrecht", "Habgier", "Habgier ist das ungezügelte, rücksichtslose Streben nach Vermögensvorteilen um jeden Preis."),
    ("Strafrecht", "Niedrige Beweggründe", "Niedrige Beweggründe liegen vor, wenn die Motive des Täters nach allgemeiner sittlicher Wertung auf tiefster Stufe stehen und besonders verachtenswert sind."),
    ("Strafrecht", "Grausamkeit", "Grausam tötet, wer dem Opfer in gefühlloser und unbarmherziger Gesinnung Schmerzen oder Qualen zufügt, die über das zur Tötung Erforderliche hinausgehen."),
    ("Strafrecht", "Totschlag", "Totschlag ist die vorsätzliche Tötung eines anderen Menschen ohne die besonderen Mordmerkmale."),
    ("Strafrecht", "Mord", "Mörder ist, wer aus Mordlust, zur Befriedigung des Geschlechtstriebs, aus Habgier oder sonst aus niedrigen Beweggründen einen Menschen tötet."),
    ("Strafrecht", "Körperverletzung", "Eine Körperverletzung ist jede üble, unangemessene Behandlung, die das körperliche Wohlbefinden mehr als nur unerheblich beeinträchtigt."),
    ("Strafrecht", "Gesundheitsschädigung", "Eine Gesundheitsschädigung ist das Hervorrufen oder Steigern eines vom Normalzustand der körperlichen Funktionen nachteilig abweichenden Zustands."),
    ("Strafrecht", "Diebstahl", "Wer eine fremde bewegliche Sache einem anderen in der Absicht wegnimmt, die Sache sich oder einem Dritten rechtswidrig zuzueignen."),
    ("Strafrecht", "Wegnahme", "Wegnahme ist der Bruch fremden und die Begründung neuen, nicht notwendig eigenen Gewahrsams."),
    ("Strafrecht", "Gewahrsam", "Gewahrsam ist die von einem Herrschaftswillen getragene tatsächliche Sachherrschaft."),
    ("Strafrecht", "Zueignungsabsicht", "Die Zueignungsabsicht setzt sich zusammen aus der Aneignungsabsicht und der Enteignungsabsicht hinsichtlich der Substanz der Sache."),
    ("Strafrecht", "Betrug", "Betrug ist die Erlangung eines rechtswidrigen Vermögensvorteils durch Täuschung, Irrtumserregung und Vermögensverfügung."),
    ("Strafrecht", "Täuschung", "Täuschung ist jede intellektuelle Einwirkung auf das Vorstellungsbild eines anderen mit dem Ziel der Irrtumserregung."),
    ("Strafrecht", "Vermögensschaden", "Ein Vermögensschaden liegt vor, wenn die Vermögensverfügung unmittelbar zu einer nicht durch Zuwachs ausgeglichenen Minderung des wirtschaftlichen Gesamtvermögens führt."),
    ("Strafrecht", "Nötigung", "Wer einen Menschen rechtswidrig mit Gewalt oder durch Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung nötigt."),
    ("Strafrecht", "Gewalt", "Gewalt ist jeder physisch vermittelte Zwang, der zur Überwindung eines geleisteten oder erwarteten Widerstands eingesetzt wird."),
    ("Strafrecht", "Drohung", "Drohung ist das Inaussichtstellen eines empfindlichen Übels, auf dessen Eintritt der Drohende Einfluss zu haben vorgibt."),
    ("Strafrecht", "Raub", "Raub liegt vor, wenn der Täter mit Gewalt gegen eine Person oder unter Anwendung von Drohungen eine fremde bewegliche Sache wegnimmt."),
    ("Strafrecht", "Erpressung", "Erpressung liegt vor, wenn jemand rechtswidrig mit Gewalt oder durch Drohung einen anderen zu einer Handlung nötigt, die dem Vermögen des Genötigten nachteilig ist."),
    ("Strafrecht", "Hehlerei", "Hehlerei begeht, wer eine Sache, die ein anderer gestohlen hat, ankauft, sich verschafft oder bei deren Absatz hilft."),
    ("Strafrecht", "Ankaufen", "Das Ankaufen ist ein Unterfall des Sichverschaffens, bei dem die schuldrechtliche Vereinbarung zwischen Vorbesitzer und Hehler entscheidend ist."),
    ("Strafrecht", "Absatzhilfe", "Unter der Absatzhilfe versteht man das weisungsgebundene, unselbstständige Unterstützen des Vortäters bei dessen Bemühungen um eine Verwertung."),
    ("Strafrecht", "Absetzen", "Das Absetzen meint die selbstständige, nicht an Weisungen gebundene aber im Einverständnis mit dem Vortäter stehende Unterstützung beim Absatz."),
    ("Strafrecht", "Urkundenfälschung", "Urkundenfälschung begeht, wer zur Täuschung im Rechtsverkehr eine unechte Urkunde herstellt, eine echte verfälscht oder eine unechte gebraucht."),
    ("Strafrecht", "Urkunde", "Eine Urkunde ist eine verkörperte Gedankenerklärung, die zum Beweis im Rechtsverkehr geeignet und bestimmt ist und ihren Aussteller erkennen lässt."),
    ("Strafrecht", "Aussteller einer Urkunde", "Aussteller einer Urkunde ist die Person, die sich nach außen hin als Urheber zu der Erklärung bekennt."),
    ("Strafrecht", "Ausweispapier", "Ausweispapiere sind amtliche Ausweise, also Urkunden, die dem Nachweis der Identität oder der persönlichen Verhältnisse dienen."),
    ("Strafrecht", "Sachbeschädigung", "Sachbeschädigung ist die Beschädigung oder Zerstörung einer fremden Sache, also jede nicht unerhebliche Substanzverletzung."),
    ("Strafrecht", "Brandstiftung", "Wer eine fremde Sache in Brand setzt oder durch eine Brandlegung ganz oder teilweise zerstört."),
    ("Strafrecht", "Freiheitsberaubung", "Freiheitsberaubung begeht, wer einen Menschen einsperrt oder auf andere Weise der Freiheit beraubt."),
    ("Strafrecht", "Untreue", "Untreue begeht, wer die ihm durch Gesetz oder Rechtsgeschäft eingeräumte Befugnis, über fremdes Vermögen zu verfügen, missbraucht."),
    ("Strafrecht", "Anstellungsbetrug", "Beim Anstellungsbetrug liegt der Schaden darin, dass die Qualität der versprochenen Dienstleistung der vereinbarten Vergütung nicht entspricht."),
    ("Strafrecht", "Arglistige Täuschung", "Die arglistige Täuschung ist bewusstes, also vorsätzliches Erregen oder Aufrechterhaltenwollen eines Irrtums durch Vorspiegeln falscher oder Unterdrücken wahrer Tatsachen."),
    ("Strafrecht", "Abwägungsklausel", "Bei dem rechtfertigenden Notstand muss eine Abwägung zwischen dem Erhaltungsgut und dem Eingriffsgut stattfinden."),
    ("Strafrecht", "Absolute Fahruntüchtigkeit", "Ein Kraftfahrzeugführer gilt als absolut fahruntüchtig, wenn er zur Tatzeit eine Blutalkoholkonzentration von mindestens 1,1 Promille aufweist."),
    ("Strafrecht", "Absichtslos-doloses Werkzeug", "Dabei geht es um einen bösgläubigen Vordermann, der im Auftrag eines Hintermanns eine fremde Sache ohne Zueignungsabsicht wegnimmt."),
    ("Strafrecht", "Abfall", "Abfälle sind alle Stoffe oder Gegenstände, deren sich der Besitzer entledigt hat, entledigen möchte oder entledigen muss."),
    ("Strafrecht", "Aberratio ictus", "Der Täter lenkt seinen Angriff auf ein bestimmtes Tatobjekt, dieser Angriff geht jedoch fehl und trifft ein anderes Objekt."),
    ("Strafrecht", "Abbruch der Schwangerschaft", "Abbrechen der Schwangerschaft ist ein Eingriff gleich welcher Art, der während der Schwangerschaft auf die Leibesfrucht einwirkt."),
    ("Strafrecht", "Aussagenotstand", "Zwangslage von Zeugen, die durch eine wahrheitsmäßige Aussage sich selbst oder einen Angehörigen belasten müssten."),
    ("Strafrecht", "Aussage", "Eine Aussage ist der Bericht des Vernommenen oder seine Antwort auf bestimmte Fragen."),
    ("Strafrecht", "Auf frischer Tat betroffen", "Auf frischer Tat betroffen ist der Dieb, wenn er noch am Tatort oder in dessen unmittelbarer Nähe wahrgenommen wird."),
    ("Strafrecht", "Atypischer Kausalverlauf", "Ein atypischer Kausalverlauf ist gegeben, wenn der eingetretene Erfolg völlig außerhalb dessen liegt, was nach dem gewöhnlichen Verlauf der Dinge zu erwarten war."),
    ("Strafrecht", "Anvertraut", "Eine Sache ist dem Täter anvertraut, wenn ihm der Besitz an ihr mit der Maßgabe eingeräumt wurde, die Herrschaft treuhänderisch auszuüben."),
    ("Strafrecht", "animus socii", "Teilnehmer sei, wer die Tat als fremde veranlassen oder fördern wolle, also mit Teilnehmerwillen tätig werde."),
    ("Strafrecht", "animus auctoris", "Täter ist, wer mit Täterwillen handelt und die Tat als eigene will."),
    ("Strafrecht", "Aneignung (StR)", "Aneignen ist die zumindest vorübergehende Inbesitznahme einer Sache zu ihrer beliebigen Nutzung."),
    ("Strafrecht", "Analogie", "Eine Analogie ist die Ausdehnung eines Rechtssatzes auf einen lediglich ähnlichen, vom Wortlaut aber an sich nicht erfassten Fall."),
    ("Strafrecht", "Alternativvorsatz", "Bei dem Alternativvorsatz weiß der Täter bei der Vornahme einer bestimmten Handlung nicht sicher, welchen von zwei Tatbeständen er verwirklicht."),
    ("Strafrecht", "Alternative Kausalität", "Diese Kausalität ist dadurch gekennzeichnet, dass zwei unabhängig voneinander gesetzte Bedingungen gleichzeitig den Erfolg verursachen."),
    ("Strafrecht", "Allgemeindelikt", "Ein Allgemeindelikt ist eine Straftat, die jedermann verwirklichen kann."),
    ("Strafrecht", "agent provocateur", "Der agent provocateur stiftet zu einer rechtswidrigen Tat an, um den Täter danach festnehmen lassen zu können."),
    ("Strafrecht", "actio libera in causa", "Diese Rechtsfigur besagt, dass eine Tatbestandsverwirklichung auch dann zur Schuld zurechenbar ist, wenn der Täter im Zeitpunkt der Tathandlung schuldunfähig war."),
    ("Strafrecht", "actio illicita in causa", "Bei dieser Rechtsfigur wirkt die an sich rechtmäßige Notwehrhandlung nicht rechtfertigend, da der Täter die Rechtfertigungsgrundlage selbst herbeigeführt hat."),
    ("Strafrecht", "Aggressivnotstand", "Bei dem Aggressivnotstand greift der Täter zur Abwendung einer Gefahr beliebiger Herkunft in die Rechtsgüter eines Unbeteiligten ein."),
    ("Strafrecht", "Defensivnotstand", "Beim Defensivnotstand richtet sich die Notstandshandlung gegen diejenige Sache, von der die Gefahr ausgeht."),
    ("Strafrecht", "Erlaubnistatbestandsirrtum", "Ein Erlaubnistatbestandsirrtum liegt vor, wenn der Täter irrig Umstände annimmt, die bei ihrem Vorliegen einen anerkannten Rechtfertigungsgrund begründen würden."),
    ("Strafrecht", "Angehörige", "Angehörige sind Verwandte und Verschwägerte gerader Linie, der Ehegatte, der Lebenspartner, der Verlobte und Geschwister."),
    ("Strafrecht", "Ausland", "Das strafrechtliche Ausland umfasst alle Gebiete, die nicht zum deutschen Hoheitsgebiet gehören."),
    ("Strafrecht", "Annehmen", "Annehmen ist das tatsächliche Empfangen des angebotenen Vorteils mit dem Willen der Ausnutzung im eigenen Interesse."),
    ("Strafrecht", "Tatherrschaft", "Tatherrschaft hat, wer den Geschehensablauf nach seinem Willen hemmen, ablaufen lassen und gestalten kann."),
    ("Strafrecht", "Verbotsirrtum", "Ein Verbotsirrtum liegt vor, wenn dem Täter bei Begehung der Tat die Einsicht fehlt, Unrecht zu tun."),
    ("Strafrecht", "Tatbestandsirrtum", "Ein Tatbestandsirrtum liegt vor, wenn der Täter bei der Begehung der Tat einen Umstand nicht kennt, der zum gesetzlichen Tatbestand gehört."),
    ("Strafrecht", "Strafmündigkeit", "Strafmündig ist, wer zur Zeit der Tat vierzehn Jahre alt ist."),
    ("Strafrecht", "Schuldunfähigkeit", "Schuldunfähig ist, wer bei Begehung der Tat wegen einer krankhaften seelischen Störung unfähig ist, das Unrecht der Tat einzusehen."),
    ("Strafrecht", "Pflichtwidrigkeit", "Pflichtwidrig handelt, wer gegen eine im Verkehr erforderliche Sorgfaltspflicht verstößt."),

    # ═══════════════════════════════════════
    #  ZIVILRECHT
    # ═══════════════════════════════════════
    ("Zivilrecht", "Willenserklärung", "Eine Willenserklärung ist eine private Willensäußerung, die auf die Herbeiführung eines bestimmten rechtlichen Erfolgs gerichtet ist."),
    ("Zivilrecht", "Abgabe einer Willenserklärung", "Die Willenserklärung ist abgegeben, wenn der Erklärende seinen rechtsgeschäftlichen Willen derart geäußert hat, dass an der Endgültigkeit kein Zweifel besteht."),
    ("Zivilrecht", "Vertrag", "Ein Vertrag kommt durch zwei übereinstimmende Willenserklärungen, Angebot und Annahme, zustande."),
    ("Zivilrecht", "Angebot", "Unter einem Angebot ist eine einseitige, empfangsbedürftige Willenserklärung zu verstehen, die alle vertragswesentlichen Bestandteile enthält."),
    ("Zivilrecht", "Annahme", "Einseitige empfangsbedürftige und vorbehaltlose Willenserklärung, aus der sich der Annahmewille des Angebots unzweifelhaft ergibt."),
    ("Zivilrecht", "Annahme einer Erbschaft", "Die Annahme ist ein formloses, nicht empfangsbedürftiges Rechtsgeschäft, welche zum Ausschluss der Ausschlagung führt."),
    ("Zivilrecht", "Stellvertretung", "Stellvertretung liegt vor, wenn jemand eine eigene Willenserklärung im Namen eines anderen innerhalb der ihm zustehenden Vertretungsmacht abgibt."),
    ("Zivilrecht", "Vollmacht", "Die Vollmacht ist die durch Rechtsgeschäft erteilte Vertretungsmacht."),
    ("Zivilrecht", "Anscheinsvollmacht", "Die Anscheinsvollmacht als Rechtsscheinvollmacht bedarf eines Rechtsscheintatbestands, der dem Vertretenen als Geschäftsherrn zurechenbar ist."),
    ("Zivilrecht", "Eigentum", "Eigentum ist das umfassende absolute Herrschaftsrecht über eine Sache."),
    ("Zivilrecht", "Besitz", "Besitz ist die tatsächliche Gewalt über eine Sache."),
    ("Zivilrecht", "Schuldverhältnis", "Ein Schuldverhältnis ist eine Sonderverbindung zwischen mindestens zwei Personen, kraft derer der Gläubiger vom Schuldner eine Leistung fordern kann."),
    ("Zivilrecht", "Anspruch", "Ein Anspruch beschreibt das Recht, von einem anderen ein Tun oder Unterlassen zu verlangen."),
    ("Zivilrecht", "Schadensersatz", "Schadensersatz ist der Ausgleich eines Schadens in Geld oder durch Naturalrestitution."),
    ("Zivilrecht", "Verzug", "Der Schuldner kommt in Verzug, wenn er auf eine Mahnung des Gläubigers nicht leistet, die nach dem Eintritt der Fälligkeit erfolgt."),
    ("Zivilrecht", "Annahmeverzug", "Der Gläubiger kommt in Verzug, wenn er die ihm angebotene Leistung nicht annimmt."),
    ("Zivilrecht", "Unmöglichkeit", "Unmöglichkeit liegt vor, wenn die Leistung weder vom Schuldner noch von einer anderen Person erbracht werden kann."),
    ("Zivilrecht", "Bereicherungsrecht", "Wer durch die Leistung eines anderen oder in sonstiger Weise auf dessen Kosten etwas ohne Rechtsgrund erlangt, ist zur Herausgabe verpflichtet."),
    ("Zivilrecht", "Geschäftsfähigkeit", "Geschäftsfähigkeit ist die Fähigkeit, Rechtsgeschäfte selbstständig wirksam vorzunehmen."),
    ("Zivilrecht", "Rechtsfähigkeit", "Rechtsfähigkeit ist die Fähigkeit, Träger von Rechten und Pflichten zu sein."),
    ("Zivilrecht", "Deliktsfähigkeit", "Deliktsfähigkeit ist die Fähigkeit, für eine unerlaubte Handlung verantwortlich gemacht zu werden."),
    ("Zivilrecht", "Sachmangel", "Die Sache ist frei von Sachmängeln, wenn sie bei Gefahrübergang die vereinbarte Beschaffenheit hat."),
    ("Zivilrecht", "Gewährleistung", "Gewährleistung umfasst die Rechte des Käufers bei Mängeln der Kaufsache, insbesondere Nacherfüllung, Rücktritt und Minderung."),
    ("Zivilrecht", "Verjährung", "Verjährung ist der durch Zeitablauf bewirkte Verlust der Durchsetzbarkeit eines Anspruchs."),
    ("Zivilrecht", "Ablaufhemmung der Verjährung", "Die Ablaufhemmung beschreibt, dass die Verjährung frühestens drei Monate nach dem Ende der Hemmung eintritt."),
    ("Zivilrecht", "Kaufvertrag", "Durch den Kaufvertrag wird der Verkäufer verpflichtet, dem Käufer die Sache zu übergeben und das Eigentum daran zu verschaffen."),
    ("Zivilrecht", "Werkvertrag", "Durch den Werkvertrag wird der Unternehmer zur Herstellung des versprochenen Werkes, der Besteller zur Entrichtung der vereinbarten Vergütung verpflichtet."),
    ("Zivilrecht", "Mietvertrag", "Durch den Mietvertrag wird der Vermieter verpflichtet, dem Mieter den Gebrauch der Mietsache während der Mietzeit zu gewähren."),
    ("Zivilrecht", "Deliktsrecht", "Wer vorsätzlich oder fahrlässig das Leben, den Körper, die Gesundheit, die Freiheit, das Eigentum oder ein sonstiges Recht eines anderen widerrechtlich verletzt, ist zum Schadensersatz verpflichtet."),
    ("Zivilrecht", "Ungerechtfertigte Bereicherung", "Wer durch die Leistung eines anderen etwas ohne rechtlichen Grund erlangt, ist zur Herausgabe verpflichtet."),
    ("Zivilrecht", "Geschäftsführung ohne Auftrag", "Wer ein Geschäft für einen anderen besorgt, ohne von ihm beauftragt zu sein, hat das Geschäft so zu führen, wie das Interesse des Geschäftsherrn es erfordert."),
    ("Zivilrecht", "Trennungsprinzip", "Nach dem Trennungsprinzip sind das Verpflichtungsgeschäft und das Verfügungsgeschäft voneinander zu unterscheiden."),
    ("Zivilrecht", "Abstraktionsprinzip", "Nach dem Abstraktionsprinzip wird das Verfügungsgeschäft von einer etwaigen Unwirksamkeit des Kausalgeschäfts grundsätzlich nicht erfasst."),
    ("Zivilrecht", "Gutgläubiger Erwerb", "Ein gutgläubiger Erwerb vom Nichtberechtigten ist möglich, wenn der Erwerber bei Vornahme des Rechtsgeschäfts gutgläubig war."),
    ("Zivilrecht", "Pfandrecht", "Das Pfandrecht ist ein beschränktes dingliches Recht zur Sicherung einer Forderung."),
    ("Zivilrecht", "Hypothek", "Die Hypothek ist ein Grundpfandrecht, das der Sicherung einer persönlichen Forderung dient und von deren Bestand abhängig ist."),
    ("Zivilrecht", "Grundschuld", "Die Grundschuld ist ein Grundpfandrecht, das im Gegensatz zur Hypothek nicht von dem Bestehen einer Forderung abhängig ist."),
    ("Zivilrecht", "Sicherungsübereignung", "Die Sicherungsübereignung ist die Übereignung einer Sache zur Sicherung einer Forderung."),
    ("Zivilrecht", "Eigentumsvorbehalt", "Der Eigentumsvorbehalt ist die aufschiebend bedingte Übereignung einer Sache unter der Bedingung vollständiger Kaufpreiszahlung."),
    ("Zivilrecht", "Absolutes Fixgeschäft", "Die genaue Einhaltung der Leistungszeit ist entscheidend für die Vertragserfüllung."),
    ("Zivilrecht", "Annahme der Leistung als Erfüllung", "Eine andere als die geschuldete Leistung kann die Erfüllung ersetzen, wenn sie vom Schuldner als Leistung an Erfüllung statt angeboten wird."),
    ("Zivilrecht", "Anhängigkeit einer Klage", "Die Anhängigkeit bedeutet, dass das Gericht mit der Klage befasst ist. Die Klage wird anhängig, sobald sie bei Gericht eingeht."),
    ("Zivilrecht", "Adäquanz der Schadensfolge", "Die Handlung muss den Erfolg nicht nur objektiv ermöglicht, sondern ihn darüber hinaus wahrscheinlich gemacht haben."),
    ("Zivilrecht", "Abkömmlinge", "Nach dem BGB sind Personen, deren eine von der anderen abstammt, in gerader Linie verwandt."),
    ("Zivilrecht", "Abhandenkommen einer Sache", "Eine Sache ist abhandengekommen, wenn der unmittelbare Besitzer ohne seinen Willen den Besitz verliert."),
    ("Zivilrecht", "Anfangsvermögen", "Anfangsvermögen ist das Vermögen, das einem Ehegatten nach Abzug der Verbindlichkeiten beim Eintritt des Güterstands gehört."),
    ("Zivilrecht", "Allgemeine Geschäftsbedingungen", "Allgemeine Geschäftsbedingungen sind alle für eine Vielzahl von Verträgen vorformulierten Vertragsbedingungen."),
    ("Zivilrecht", "Auflassung", "Die zur Übertragung des Eigentums an einem Grundstück erforderliche Einigung des Veräußerers und des Erwerbers."),
    ("Zivilrecht", "Arbeitnehmer", "Arbeitnehmer ist jeder, der auf der Grundlage eines privatrechtlichen Vertrages verpflichtet ist, im Dienste eines anderen weisungsgebundene Arbeit zu leisten."),
    ("Zivilrecht", "Arbeitsverhältnis", "Ein Arbeitsverhältnis wird durch den Arbeitsvertrag zwischen Arbeitgeber und Arbeitnehmer begründet."),
    ("Zivilrecht", "Anweisung", "Die Anweisung ist ein abstraktes Rechtsgeschäft mit dem Inhalt einer Doppelwirkung an dem drei Beteiligte involviert sind."),
    ("Zivilrecht", "Anwartschaftsrecht", "Das Anwartschaftsrecht liegt vor, wenn bei einem mehrstufigen Eigentumserwerb zwischen den Parteien ein Eigentumsvorbehalt besteht."),
    ("Zivilrecht", "Anstiftung (BGB)", "Anstifter ist, wer vorsätzlich einen anderen zur Begehung einer vorsätzlich unerlaubten Handlung bestimmt hat."),
    ("Zivilrecht", "Allgemeines Persönlichkeitsrecht", "Das allgemeine Persönlichkeitsrecht ist mit Art. 2 I in Verbindung mit Art. 1 I GG als sonstiges Recht geschützt."),
    ("Zivilrecht", "Akzessorietät", "Akzessorietät bedeutet die Abhängigkeit eines Rechts oder rechtlichen Umstands von einem anderen Recht oder Umstand."),
    ("Zivilrecht", "Aliudlieferung", "Die Lieferung einer anderen Sache steht dem Sachmangel gleich."),
    ("Zivilrecht", "actio pro socio", "Die actio pro socio bezeichnet eine Klagebefugnis, wonach ein Gesellschafter den Anspruch der Gesellschaft im eigenen Namen geltend machen kann."),
    ("Zivilrecht", "Abtretung", "Die Abtretung bezeichnet den Vertrag zwischen Altgläubiger und Neugläubiger, der unmittelbar die Übertragung der Forderung bewirkt."),
    ("Zivilrecht", "Absonderung", "Unter dem Recht der Absonderung versteht man einen Anspruch auf vorzugsweise Befriedigung des Gläubigeranspruchs aus einem bestimmten Gegenstand."),
    ("Zivilrecht", "Absolutes Recht", "Absolute Rechte wirken gegenüber jedermann, indem sie dem Einzelnen bestimmte Freiräume gewähren."),
    ("Zivilrecht", "Absolute Verfügungsverbote", "Absolute Verfügungsverbote dienen dem Schutz der Allgemeinheit und führen bei Verstoß zur Nichtigkeit des Geschäfts."),
    ("Zivilrecht", "Abnahme", "Unter der Abnahme ist die Entgegennahme des vom Unternehmer hergestellten Werkes sowie dessen Billigung als im Wesentlichen vertragsgemäß zu verstehen."),
    ("Zivilrecht", "Abmahnung", "Unter einer Abmahnung ist die ernsthafte Aufforderung des Gläubigers an den Schuldner zu verstehen, weitere Zuwiderhandlungen zu unterlassen."),
    ("Zivilrecht", "Aufrechnung", "Die Aufrechnung ist die wechselseitige Tilgung zweier sich gegenüberstehender, gleichartiger, fälliger und erfüllbarer Forderungen."),
    ("Zivilrecht", "Aufrechnungslage", "Eine Aufrechnungslage liegt vor, wenn zwei Personen einander wechselseitige Leistungen schulden."),
    ("Zivilrecht", "Aufrechnungserklärung", "Die Aufrechnungserklärung ist eine einseitig empfangsbedürftige Willenserklärung, aus der sich der Wille zur Aufrechnung ergibt."),
    ("Zivilrecht", "Aufwendung", "Aufwendung ist ein freiwilliges Vermögensopfer im Interesse eines anderen."),
    ("Zivilrecht", "Aufschiebende Bedingung", "Bei der aufschiebenden Bedingung treten die Rechtswirkungen erst mit dem Eintritt des zukünftigen Ereignisses ein."),
    ("Zivilrecht", "Auflösende Bedingung", "Bei der auflösenden Bedingung treten die Rechtswirkungen sofort ein, mit Bedingungseintritt entfallen diese aber wieder."),
    ("Zivilrecht", "Aufgedrängte Bereicherung", "Das Problem der aufgedrängten Bereicherung beschreibt einen Zustand, in dem der Bereicherungsschuldner kein Interesse an der Bereicherung hat."),
    ("Zivilrecht", "Aufgebot", "Aufgebot ist eine öffentliche gerichtliche Aufforderung zur Anmeldung von Rechten mit der Wirkung eines Rechtsnachteils bei Nichtanmeldung."),
    ("Zivilrecht", "Atypischer Vertrag", "Durch die Vertragsfreiheit ist es möglich, Vertragsgestaltungen zu kreieren, die von den im BGB geregelten Vertragstypen abweichen."),
    ("Zivilrecht", "Äquivalenzinteresse", "Beim Äquivalenzinteresse handelt es sich um das Interesse des Gläubigers, den Schaden ersetzt zu bekommen, der allein durch die Nichterfüllung entsteht."),
    ("Zivilrecht", "Antizipierte Übereignung", "Antizipierte Einigung und Abtretung liegen vor bei Übereignung einer Sache, an welcher der Veräußerer erst künftig Eigentum erwirbt."),
    ("Zivilrecht", "Anfechtungserklärung", "Hierunter ist eine formfreie, einseitige, empfangsbedürftige Willenserklärung zu verstehen, die innerhalb der Anfechtungsfrist abgegeben werden muss."),
    ("Zivilrecht", "Anerkenntnisurteil", "Das prozessuale Anerkenntnis ist die gegenüber dem Prozessgericht vom Beklagten abgegebene einseitige Erklärung."),
    ("Zivilrecht", "Aneignung (BGB)", "Die Aneignung ist ein Fall des gesetzlichen Eigentumserwerbs herrenloser Sachen."),
    ("Zivilrecht", "Alternativtäterschaft", "Unter der Alternativtäterschaft versteht man die Täterschaft mehrerer Beteiligter, bei denen nicht eindeutig feststeht, wer den Schaden verursacht hat."),
    ("Zivilrecht", "Ausschlagung", "Durch das Gestaltungsrecht der Ausschlagung erhält der potentielle Erbe die Möglichkeit, das Erbe auszuschlagen."),
    ("Zivilrecht", "Auslobung", "Bei der Auslobung wird für die Vornahme einer Handlung, insbesondere für die Herbeiführung eines Erfolgs, eine Belohnung ausgesetzt."),
    ("Zivilrecht", "Auftrag", "Durch die Annahme eines Auftrags verpflichtet sich der Beauftragte, ein ihm übertragenes Geschäft für den Auftraggeber unentgeltlich zu besorgen."),
    ("Zivilrecht", "Aussonderung", "Eine Aussonderung findet an Gegenständen statt, die aufgrund eines Rechts einem Dritten und nicht dem Schuldner gehören."),
    ("Zivilrecht", "Ausschluss der freien Willensbestimmung", "Ein Ausschluss liegt vor, wenn jemand nicht imstande ist, seinen Willen frei und unbeeinflusst zu bilden."),
    ("Zivilrecht", "Auflage im Erbrecht", "Der Erblasser kann durch Testament den Erben zu einer Leistung verpflichten, ohne einem anderen ein Recht auf die Leistung zu gewähren."),
    ("Zivilrecht", "Aktie", "Die Aktie ist der Inbegriff sämtlicher Rechte und Pflichten, die einem Aktionär auf Grund seiner Beteiligung an der Gesellschaft zustehen."),

    # ═══════════════════════════════════════
    #  ÖFFENTLICHES RECHT
    # ═══════════════════════════════════════
    ("Öffentliches Recht", "Verwaltungsakt", "Ein Verwaltungsakt ist jede Verfügung, Entscheidung oder andere hoheitliche Maßnahme, die eine Behörde zur Regelung eines Einzelfalls auf dem Gebiet des öffentlichen Rechts trifft."),
    ("Öffentliches Recht", "Allgemeinverfügung", "Eine Allgemeinverfügung ist ein Verwaltungsakt, der sich an einen nach allgemeinen Merkmalen bestimmten Personenkreis richtet."),
    ("Öffentliches Recht", "Ermessen", "Die Behörde handelt nach Ermessen, wenn das Gesetz ihr einen Entscheidungsspielraum hinsichtlich der Rechtsfolge eröffnet."),
    ("Öffentliches Recht", "Ermessensfehler", "Ein Ermessensfehler liegt vor bei Ermessensausfall, Ermessensüberschreitung oder Ermessensfehlgebrauch."),
    ("Öffentliches Recht", "Beurteilungsspielraum", "Ein Beurteilungsspielraum liegt vor, wenn die Verwaltung bei der Auslegung unbestimmter Rechtsbegriffe einen gewissen Spielraum hat."),
    ("Öffentliches Recht", "Verhältnismäßigkeit", "Der Grundsatz der Verhältnismäßigkeit verlangt, dass ein staatlicher Eingriff geeignet, erforderlich und angemessen sein muss."),
    ("Öffentliches Recht", "Angemessenheit eines Eingriffs", "Das Handeln ist angemessen, wenn bei einer Gesamtabwägung zwischen der Schwere des Eingriffs und dem Gewicht der Gründe die Grenze der Zumutbarkeit gewahrt bleibt."),
    ("Öffentliches Recht", "Grundrechte", "Grundrechte sind die in der Verfassung garantierten subjektiven Rechte des Einzelnen gegenüber dem Staat."),
    ("Öffentliches Recht", "Menschenwürde", "Die Würde des Menschen ist unantastbar. Sie zu achten und zu schützen ist Verpflichtung aller staatlichen Gewalt."),
    ("Öffentliches Recht", "Gleichheitssatz", "Alle Menschen sind vor dem Gesetz gleich. Wesentlich Gleiches ist gleich und wesentlich Ungleiches ist ungleich zu behandeln."),
    ("Öffentliches Recht", "Meinungsfreiheit", "Jeder hat das Recht, seine Meinung in Wort, Schrift und Bild frei zu äußern und zu verbreiten."),
    ("Öffentliches Recht", "Versammlungsfreiheit", "Alle Deutschen haben das Recht, sich ohne Anmeldung oder Erlaubnis friedlich und ohne Waffen zu versammeln."),
    ("Öffentliches Recht", "Berufsfreiheit", "Alle Deutschen haben das Recht, Beruf, Arbeitsplatz und Ausbildungsstätte frei zu wählen."),
    ("Öffentliches Recht", "Eigentumsgarantie", "Das Eigentum und das Erbrecht werden gewährleistet. Inhalt und Schranken werden durch die Gesetze bestimmt."),
    ("Öffentliches Recht", "Allgemeine Handlungsfreiheit", "Art. 2 I GG schützt nicht einen bestimmten Lebensbereich, sondern jegliches menschliches Verhalten."),
    ("Öffentliches Recht", "Allgemeine Gesetze", "Allgemeine Gesetze sind solche, die nicht eine Meinung als solche verbieten und sich nicht gegen eine bestimmte Äußerung richten."),
    ("Öffentliches Recht", "Aktive Wahlrechtsgleichheit", "Der Grundsatz der Wahlrechtsgleichheit bedeutet, dass die Stimme eines jeden Wahlberechtigten den gleichen Zählwert hat."),
    ("Öffentliches Recht", "Allgemeinheit der Wahl", "Der Grundsatz der Allgemeinheit der Wahl garantiert das Recht aller Staatsbürger, zu wählen und gewählt zu werden."),
    ("Öffentliches Recht", "Rechtsstaat", "Das Rechtsstaatsprinzip verlangt die Bindung der Staatsgewalt an Recht und Gesetz sowie die Gewährleistung von Rechtsschutz."),
    ("Öffentliches Recht", "Demokratieprinzip", "Das Demokratieprinzip verlangt, dass alle Staatsgewalt vom Volke ausgeht und in Wahlen und Abstimmungen ausgeübt wird."),
    ("Öffentliches Recht", "Bundesstaatsprinzip", "Das Bundesstaatsprinzip kennzeichnet die Gliederung des Bundes in Länder und die grundsätzliche Mitwirkung der Länder bei der Gesetzgebung."),
    ("Öffentliches Recht", "Sozialstaatsprinzip", "Das Sozialstaatsprinzip verpflichtet den Staat, für eine gerechte Sozialordnung zu sorgen."),
    ("Öffentliches Recht", "Gewaltenteilung", "Die Gewaltenteilung bezeichnet die Aufteilung der Staatsgewalt in Legislative, Exekutive und Judikative."),
    ("Öffentliches Recht", "Gesetzmäßigkeit der Verwaltung", "Die Verwaltung ist an Gesetz und Recht gebunden. Es gilt der Vorrang und der Vorbehalt des Gesetzes."),
    ("Öffentliches Recht", "Vorrang des Gesetzes", "Kein Verwaltungshandeln darf gegen ein bestehendes Gesetz verstoßen."),
    ("Öffentliches Recht", "Vorbehalt des Gesetzes", "Die Verwaltung darf in die Rechte des Bürgers nur auf der Grundlage eines Gesetzes eingreifen."),
    ("Öffentliches Recht", "Bestimmtheitsgrundsatz", "Ein Verwaltungsakt muss inhaltlich hinreichend bestimmt sein, sodass der Adressat erkennen kann, was von ihm verlangt wird."),
    ("Öffentliches Recht", "Bestandskraft", "Die Bestandskraft eines Verwaltungsaktes bedeutet, dass er nicht mehr angefochten werden kann."),
    ("Öffentliches Recht", "Widerspruch", "Der Widerspruch ist der förmliche Rechtsbehelf gegen einen Verwaltungsakt im Rahmen des Widerspruchsverfahrens."),
    ("Öffentliches Recht", "Anfechtungsklage", "Die Anfechtungsklage ist die statthafte Klageart, wenn die Aufhebung eines Verwaltungsaktes begehrt wird."),
    ("Öffentliches Recht", "Verpflichtungsklage", "Die Verpflichtungsklage ist die statthafte Klageart, wenn die Verurteilung zum Erlass eines abgelehnten Verwaltungsaktes begehrt wird."),
    ("Öffentliches Recht", "Klagebefugnis", "Die Klagebefugnis ist gegeben, wenn der Kläger geltend machen kann, durch den Verwaltungsakt in seinen Rechten verletzt zu sein."),
    ("Öffentliches Recht", "Polizeiliche Generalklausel", "Die Polizei kann die notwendigen Maßnahmen treffen, um eine im einzelnen Falle bestehende Gefahr für die öffentliche Sicherheit abzuwehren."),
    ("Öffentliches Recht", "Öffentliche Sicherheit", "Öffentliche Sicherheit umfasst die Unversehrtheit von Leben, Gesundheit, Freiheit, Ehre und Vermögen des Einzelnen sowie den Bestand des Staates."),
    ("Öffentliches Recht", "Öffentliche Ordnung", "Öffentliche Ordnung umfasst die Gesamtheit der ungeschriebenen Regeln für das Verhalten des Einzelnen in der Öffentlichkeit."),
    ("Öffentliches Recht", "Gefahr", "Eine Gefahr liegt vor, wenn bei ungehindertem Geschehensablauf in absehbarer Zeit mit hinreichender Wahrscheinlichkeit ein Schaden eintreten wird."),
    ("Öffentliches Recht", "Anscheinsgefahr", "Eine Anscheinsgefahr ist gegeben, wenn bei verständiger Würdigung objektive Anhaltspunkte für eine Gefahr vorliegen."),
    ("Öffentliches Recht", "Störer", "Störer ist, wer die Gefahr oder Störung unmittelbar verursacht hat."),
    ("Öffentliches Recht", "Bauplanungsrecht", "Das Bauplanungsrecht regelt die planerische Ordnung der Bodennutzung und bestimmt, wo und was gebaut werden darf."),
    ("Öffentliches Recht", "Actus Contrarius Theorie", "Ein aufhebender Rechtsakt muss auf derselben Normhöhe angesiedelt sein wie der aufzuhebende Rechtsakt."),
    ("Öffentliches Recht", "Adressatentheorie", "Nach der Adressatentheorie ist der Adressat eines belastenden Verwaltungsaktes zumindest in seiner allgemeinen Handlungsfreiheit betroffen."),
    ("Öffentliches Recht", "Administrativenteignung", "Bei der Administrativenteignung erfolgt die Enteignung durch die Exekutive aufgrund eines Gesetzes durch Verwaltungsakt."),
    ("Öffentliches Recht", "Absolute Mehrheit", "Die Mehrheit der Mitglieder des Bundestages im Sinne des Grundgesetzes ist die Mehrheit ihrer gesetzlichen Mitgliederzahl."),
    ("Öffentliches Recht", "Abwägungsdefizit", "Ein Abwägungsdefizit liegt vor, wenn nicht alle relevanten Belange in die Abwägung eingestellt wurden."),
    ("Öffentliches Recht", "Abhilfebescheid", "Der Abhilfebescheid ist ein Verwaltungsakt, der das Widerspruchsverfahren in der Reichweite seines Regelungsgehaltes beendet."),
    ("Öffentliches Recht", "Abdrängende Sonderzuweisung", "Öffentlich-rechtliche Streitigkeiten nichtverfassungsrechtlicher Art können durch Gesetz auch anderen Gerichten zugewiesen werden."),
    ("Öffentliches Recht", "Aufdrängende Sonderzuweisung", "Eine aufdrängende Sonderzuweisung liegt vor, wenn spezielle Vorschriften anordnen, dass bestimmte Rechtsstreitigkeiten den Verwaltungsgerichten zugewiesen sind."),
    ("Öffentliches Recht", "Auflösende Bedingung (VwR)", "Eine auflösende Bedingung liegt vor, wenn die innere Wirksamkeit des Verwaltungsaktes entfallen soll, wenn die Bedingung eintritt."),
    ("Öffentliches Recht", "Aufschiebende Bedingung (VwR)", "Eine aufschiebende Bedingung liegt vor, wenn die innere Wirksamkeit des Verwaltungsaktes vom Eintritt der Bedingung abhängt."),
    ("Öffentliches Recht", "Auswahlermessen", "Die Behörde besitzt Auswahlermessen, wenn sie die Möglichkeit besitzt, aus mehreren denkbaren Maßnahmen zu wählen."),
    ("Öffentliches Recht", "Außenbereich", "Unter Außenbereich werden diejenigen Gebiete verstanden, die weder innerhalb der bebauten Ortsteile noch im Geltungsbereich eines Bebauungsplans liegen."),
    ("Öffentliches Recht", "Auslieferung", "Unter einer Auslieferung versteht man, dass eine Person auf Ersuchen zwangsweise aus dem Bereich der inländischen Hoheitsgewalt entfernt wird."),
    ("Öffentliches Recht", "Außenwirkung eines Verwaltungsaktes", "Eine hoheitliche Maßnahme ist auf unmittelbare Rechtswirkung nach außen gerichtet, wenn sie nach ihrem objektiven Sinngehalt darauf zielt."),
    ("Öffentliches Recht", "Auflagenvorbehalt", "Der Auflagenvorbehalt ist die einem begünstigenden Verwaltungsakt beigefügte Ankündigung, später könne eine Auflage ergehen."),
    ("Öffentliches Recht", "Auflage (VwR)", "Die Auflage ergänzt den Verwaltungsakt durch eine eigene Sachregelung und verpflichtet den Begünstigten zu einem bestimmten Tun oder Unterlassen."),
    ("Öffentliches Recht", "Asyl", "Asyl bedeutet einen Zufluchtsort, der Schutz vor Verfolgung bietet."),
    ("Öffentliches Recht", "Arbeitszwang", "Arbeitszwang ist jede einseitige Heranziehung zu einer Arbeit, welche der Erfüllung rechtlicher Pflichten des Staates dient."),
    ("Öffentliches Recht", "Anstalt des Öffentlichen Rechts", "Anstalten des öffentlichen Rechts sind mit Personal- und Sachmitteln ausgestattete Organisationen."),
    ("Öffentliches Recht", "Annexkompetenz", "Bei der Annexkompetenz greift der Bund nicht in einen anderen Sachbereich über, sondern bleibt in seinem Zuständigkeitsbereich."),
    ("Öffentliches Recht", "Anhörung", "Eine Anhörung bedeutet, dass die Behörde dem Betroffenen Gelegenheit gibt, sich zu den entscheidungserheblichen Tatsachen zu äußern."),
    ("Öffentliches Recht", "Allgemeinwohl", "Die Enteignung muss einem bestimmten, im öffentlichen Nutzen liegenden Zweck dienen."),
    ("Öffentliches Recht", "Amtspflichtverletzung", "Eine Amtspflichtverletzung liegt vor, wenn ein Beamter vorsätzlich oder fahrlässig die ihm obliegende Amtspflicht verletzt."),
    ("Öffentliches Recht", "Amtswalter", "Amtswalter ist die Person, die ihres Amtes waltet, also öffentlich-rechtlich tätig ist."),
    ("Öffentliches Recht", "Anwendungsvorrang", "Anwendungsvorrang bedeutet, dass entgegenstehende innerstaatliche Rechtsvorschriften bei Kollision mit Unionsrecht unangewendet bleiben."),
    ("Öffentliches Recht", "Ausschließliche Gesetzgebungskompetenz", "Im Bereich der ausschließlichen Gesetzgebung des Bundes haben die Länder die Befugnis zur Gesetzgebung nur, wenn sie hierzu ermächtigt werden."),
    ("Öffentliches Recht", "Konkurrierende Gesetzgebungskompetenz", "Im Bereich der konkurrierenden Gesetzgebung haben die Länder die Befugnis zur Gesetzgebung, solange und soweit der Bund nicht tätig geworden ist."),
    ("Öffentliches Recht", "Wesentlichkeitstheorie", "Die Wesentlichkeitstheorie verlangt, dass alle wesentlichen Entscheidungen vom Gesetzgeber selbst getroffen werden müssen."),
    ("Öffentliches Recht", "Subsidiaritätsprinzip", "Das Subsidiaritätsprinzip besagt, dass übergeordnete Einheiten nur tätig werden sollen, wenn untergeordnete Einheiten die Aufgabe nicht ausreichend erfüllen können."),
    ("Öffentliches Recht", "Normenkontrolle", "Die Normenkontrolle ist ein Verfahren zur Überprüfung der Verfassungsmäßigkeit von Gesetzen."),
    ("Öffentliches Recht", "Verfassungsbeschwerde", "Die Verfassungsbeschwerde ist ein außerordentlicher Rechtsbehelf, mit dem jedermann die Verletzung seiner Grundrechte durch die öffentliche Gewalt rügen kann."),
    ("Öffentliches Recht", "Zitiergebot", "Das Zitiergebot verlangt, dass ein Gesetz, welches ein Grundrecht einschränkt, dieses Grundrecht unter Angabe des Artikels nennen muss."),
    ("Öffentliches Recht", "Wesensgehaltsgarantie", "In keinem Fall darf ein Grundrecht in seinem Wesensgehalt angetastet werden."),
    ("Öffentliches Recht", "Praktische Konkordanz", "Der Grundsatz der praktischen Konkordanz verlangt, dass bei Kollision von Grundrechten beide Rechtsgüter in einen schonenden Ausgleich gebracht werden."),
    ("Öffentliches Recht", "Übermaßverbot", "Das Übermaßverbot verlangt, dass staatliche Maßnahmen nicht über das zur Zielerreichung Erforderliche hinausgehen dürfen."),
]


def clean(text: str) -> str:
    """Bereinigt Definitionstext aggressiv."""
    # Ellipsis → Punkt
    text = text.replace("\u2026", ".")
    # Smart quotes entfernen: „ " » « → nichts
    for ch in "\u201e\u201c\u201d\u201f\u00ab\u00bb":
        text = text.replace(ch, "")
    # Semikolons im Fließtext → Komma (würde CSV kaputt machen)
    text = text.replace(";", ",")
    # Whitespace normalisieren
    text = " ".join(text.split())
    # Abgeschnittene Sätze abrunden (z.B. endet mit "oder.")
    if text.endswith(" oder."):
        text = text[:-6].rstrip(",; ") + "."
    # Satz muss mit Satzzeichen enden
    if text and text[-1] not in ".!?)\"'":
        text = text.rstrip(",; ") + "."
    return text.strip()


def main():
    # 1. Kuratierte Definitionen sammeln  (term → (rechtsgebiet, term, definition))
    seen: dict[str, tuple[str, str, str]] = {}
    for rechtsgebiet, term, definition in DEFINITIONS:
        key = term.strip().lower()
        if key not in seen:
            seen[key] = (rechtsgebiet, term.strip(), clean(definition))

    # 2. JSON-Dateien einlesen und mergen (alle = Strafrecht)
    json_count = 0
    for jf in JSON_FILES:
        if not jf.exists():
            print(f"⚠️  {jf.name} nicht gefunden, übersprungen.")
            continue
        with open(jf, encoding="utf-8") as f:
            entries = json.load(f)
        for entry in entries:
            term = entry.get("term", "").strip()
            definition = entry.get("definition", "").strip()
            if not term or not definition:
                continue
            key = term.lower()
            if key not in seen:
                seen[key] = ("Strafrecht", term, clean(definition))
                json_count += 1

    # 3. CSV schreiben (3-spaltig: Rechtsgebiet;Begriff;Definition)
    out = ROOT / "jur_definitionen_final.csv"
    ordered: list[tuple[str, str, str]] = []
    added_keys: set[str] = set()
    for rechtsgebiet, term, definition in DEFINITIONS:
        key = term.strip().lower()
        if key not in added_keys:
            ordered.append(seen[key])
            added_keys.add(key)
    # Restliche aus JSONs (alphabetisch)
    remaining = [(r, t, d) for k, (r, t, d) in sorted(seen.items()) if k not in added_keys]
    ordered.extend(remaining)

    with open(out, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f, delimiter=";", quoting=csv.QUOTE_MINIMAL)
        w.writerow(["Rechtsgebiet", "Begriff", "Definition"])
        for rechtsgebiet, term, definition in ordered:
            w.writerow([rechtsgebiet, term, definition])

    print(f"✅ {len(ordered)} Definitionen → {out.name}")
    print(f"   ({len(DEFINITIONS)} kuratiert + {json_count} aus JSONs)")
    # Stats pro Rechtsgebiet
    from collections import Counter
    counts = Counter(r for r, _, _ in ordered)
    for area, cnt in counts.most_common():
        print(f"   {area}: {cnt}")


if __name__ == "__main__":
    main()
