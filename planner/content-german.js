/* German A1 content tables — sourced from research_notes/A1 sprint 2026 files 01, 02, 05, 06.
   Dates: plan runs 2026-10-20 .. 2026-12-19. Exam default Tue 2026-12-08 (Delhi, computer-based). */
var CONTENT = (typeof CONTENT !== "undefined") ? CONTENT : {};

/* workout: "eve" = 19:00 run/strength, "am" = 05:15. diet: veg | egg | nonveg. theme: sun | night. off: comma-separated days with no plan. */
CONTENT.defaults = { tier: "C", exam: "2026-12-08", gd: "", books: false, workout: "eve", diet: "nonveg", theme: "sun", off: "2026-10-21" };

/* Nicos Weg A1 lesson list (DW). N1..N77 as numbered in file 01 §2.1. Titles + one grammar tag. */
CONTENT.nw = {
  1:"Hallo!",2:"Kein Problem!",3:"Tschüss!",4:"Von A bis Z (alphabet)",5:"Ich heiße Emma",6:"Das ist Nico",7:"Woher kommst du?",8:"Nico hat ein Problem",
  9:"Zahlen von 1 bis 100",10:"Wichtige Nummern",11:"Adressen",12:"Auf dem Amt",13:"Was machst du hier?",14:"Was trinkst du?",15:"Eine Pizza bitte!",16:"Zahlen bitte!",
  17:"Ich war schon in Berlin",18:"Wo liegt das?",19:"In Europa",20:"Andere Länder",21:"Was ist das?",22:"Wem gehört das?",23:"Ich habe kein …",24:"Das Auto ist rot",
  25:"So wohne ich",26:"Meine Wohnung",27:"Sofa, Sessel und Tisch",28:"Unser Haus",29:"Emmas Tag",30:"Tageszeiten",31:"Am Sonntag koche ich",32:"Emmas Wochenende",
  33:"Wie spät ist es?",34:"Hast du morgen Zeit?",35:"Wann spielen wir?",36:"Zu spät!?",37:"Ich bin Lehrerin",38:"Mein Beruf",39:"Wo ist der Aufzug?",40:"Traumberufe",
  41:"Wo ist der Bahnhof?",42:"An der Ampel links",43:"Mit Bus und Bahn",44:"Im Büro",45:"Lebensmittel",46:"Ich mag (nicht)!",47:"Haushaltsarbeit",48:"Was macht dir Spaß?",
  49:"Mengen und Preise",53:"Wie war dein Urlaub?",55:"Der Ausflug",64:"Mein Bruder",50:"Was darf es sein?",51:"Sonst noch etwas?",52:"Wie viel Mehl?",56:"Wie wird das Wetter?",59:"Das passt gut!",61:"Meine Familie",62:"Meine Eltern",
  65:"Von Kopf bis Fuß",68:"Ist das gesund?",70:"Beim Arzt",77:"Final Test A1"
};
/* Order in which lessons are used (file 01 §7): N1-N52, then 7 picked lessons, then the Final Test on 22 Nov. */
CONTENT.nwOrder = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,64,41,42,43,44,45,46,47,48,49,50,51,52,53,55,56,59,61,62,68,70];
/* How many lessons on a given date (weekday 2, with exceptions). Sum over 20 Oct-21 Nov = 59 = len(nwOrder). */
CONTENT.nwCount = function (iso, dow) {
  if (iso === "2026-10-20") return 4;                       // Welcome lessons are short
  if (iso === "2026-10-21") return 0;                       // day off
  if (iso === "2026-10-24") return 1;                       // NPTEL final day
  if (iso === "2026-10-31" || iso === "2026-11-07" || iso === "2026-11-14") return 1; // mock Saturdays
  if (["2026-10-26","2026-10-27","2026-10-28"].indexOf(iso) >= 0) return 3;           // catch-up for the NPTEL week
  if (["2026-11-10","2026-11-11","2026-11-12","2026-11-13"].indexOf(iso) >= 0) return 3; // catch-up after the Joveo-heavy weeks
  if (["2026-11-16","2026-11-17"].indexOf(iso) >= 0) return 3;                         // Perfekt lessons N53 + N55 (audit fix)
  if (iso >= "2026-10-20" && iso <= "2026-11-20" && dow >= 1 && dow <= 5) return 2;
  return 0;
};

/* Listening ramp (file 06 §8): [core (≤20 min, at breakfast), mini (≤10 min, early afternoon)]. */
CONTENT.listen = {
"2026-10-20":["DT 1–3 (Deutschtrainer, Hindi interface)","DW ABC: O, M, H, L"],
"2026-10-21":["Coffee Break German (CBG) 01 + 02","DW ABC: F, Pf, V, W"],
"2026-10-22":["Replay NW Welcome (4 lessons) with eyes closed","DW ABC: G, K, ck, C"],
"2026-10-23":["Easy German: ‘Introduce Yourself in Slow German’ — once plain, once with subtitles, once shadowing","DW ABC: Ch, Sch, St, Sp"],
"2026-10-24":["Replay NW Chapter 1 (4 lessons)","DW ABC: B, P, R, Z"],
"2026-10-25":["Easy German: ‘German Alphabet & Pronunciation – Full Guide’","DW ABC: Au, Eu, Ei, ie"],
"2026-10-26":["DW ABC: 0–12, Y/ss/Qu/X, J/Ae/Oe/Ue + ABC Final Test","DT 4–5 + DT 14 (numbers 0–20 incl. 13–19)"],
"2026-10-27":["CBG 06 (numbers)","NW ‘Zahlen von 1 bis 100’ replay"],
"2026-10-28":["Replay NW Chapter 2 (Zahlen, Wichtige Nummern, Adressen, Auf dem Amt)","DT 13 + 70 (phone, spelling)"],
"2026-10-29":["CBG 03 + 04","DT 6–7 + DT 9 (requests: ‘Können Sie mir helfen?’, Wie bitte?, langsamer sprechen)"],
"2026-10-30":["CBG 15 (counting)","Easy German: ‘Top 50 Everyday Objects in Slow German’"],
"2026-10-31":["MOCK 0: official Modellsatz Hören (17:08) at 15:00 with the written mock — nothing at breakfast","—"],
"2026-11-01":["Error review: replay the Modellsatz Hören items you missed with the transcript; shadow 5 sentences","DT 25 (colours) + CBG 05 (family)"],
"2026-11-02":["DT 15–17 (months, days, time)","DT 26 (meal times) + DT 27 (buying and paying)"],
"2026-11-03":["Replay N21–N24 (Chapter 5: Things)","DT 18 (daily routine)"],
"2026-11-04":["Replay N25–N27 (Chapter 6: Living)","CBG 21 (weather, time)"],
"2026-11-05":["Replay NW Chapter 3 (Eine Pizza bitte, Zahlen bitte)","DT 31 (drinks) + DT 53 (zum/zur)"],
"2026-11-06":["CBG 11 + 12 (ordering)","DT 84 (Formular, Familienstand, Unterschrift) + DT 79 (Einzel-/Doppelzimmer)"],
"2026-11-07":["Mini-mock: Hören Teil 2 (announcements, heard ONCE) from a third-party/telc A1 sample","CBG 13"],
"2026-11-08":["CBG 16 (shopping)","DT 97 + DT 96 (birthday invitation and congratulations — Schreiben 2)"],
"2026-11-09":["DT 20–22 (transport, tickets)","DT 23 (places in town)"],
"2026-11-10":["Replay N29–N36 (Chapters 7–8: days, times, appointments)","CBG 08 (directions)"],
"2026-11-11":["CBG 17 + 18","DT 24 (directions)"],
"2026-11-12":["CBG 19 + 35","DT 83 (Ausweis) + DT 46 (Wetter)"],
"2026-11-13":["CBG 30 + 32","DT 21"],
"2026-11-14":["MOCK 1: official Übungssatz 01 Hören (18:59) as part of the full mock","—"],
"2026-11-15":["Error review + shadowing","DT 59 (W-questions) + DT 71–72 (school — the Sprechen Teil-2 theme)"],
"2026-11-16":["DT 19 + 69 (cancel appointment, phone) + CBG 24","NW ‘Hast du morgen Zeit?’ replay"],
"2026-11-17":["CBG 25 (emergencies)","Easy German: ‘Learn German at the Post Office’"],
"2026-11-18":["Replay NW Chapter 9 (Working life)","DT 35 + DT 37 (doctor/Fieber, body)"],
"2026-11-19":["CBG 26 + 27","DT 76–77 (work, pay)"],
"2026-11-20":["Numbers drill: have Google TTS or an AI read you 10 prices, 10 phone numbers, 10 times — you write them (Hören Teil 3 style)","CBG 28"],
"2026-11-21":["MOCK 2: third-party Hören with headphones, part of the typed full mock","—"],
"2026-11-22":["Harry A1, episodes 1–3 (story, light)","—"],
"2026-11-23":["DT 71–72 (school) + CBG 29","DT 7"],
"2026-11-24":["Replay NW Chapter 15 (Family)","DT 33–34 (clothes)"],
"2026-11-25":["Replay NW Chapter 16 (Sports) — good while you work out","DT 47 (free time, sport)"],
"2026-11-26":["Replay NW Chapter 12 (Mengen und Preise, Was darf es sein?)","CBG 36"],
"2026-11-27":["Hören Teil 2 × 3 short sets (heard once), third-party","Easy German: ‘Learn to Talk About Food’"],
"2026-11-28":["MOCK 3: second third-party Hören, part of the typed full mock","—"],
"2026-11-29":["Error review: replay your hardest 5 items","CBG 38"],
"2026-11-30":["Sectional re-listen: Modellsatz Hören Teil 2, once each (≥5 days since you last heard it)","Shadow your own Teil 1 recording"],
"2026-12-01":["Übungssatz 01 Hören Teil 1 items again (sectional)","Numbers/prices dictation"],
"2026-12-02":["15-min phone-message dictation (numbers, days, places)","CBG 06 + 15 refresher"],
"2026-12-03":["Hören Teil 3 style from a third-party set","DT 59"],
"2026-12-04":["Light: one Harry A1 episode","—"],
"2026-12-05":["MOCK 4 / DRESS REHEARSAL: official Übungssatz 02 Hören (19:04) inside the full typed mock","—"],
"2026-12-06":["Light replay of your favourite audio; nothing new","—"],
"2026-12-07":["Rest; 10 min easy audio (CBG 01–03)","—"]
};

/* Grammar / workbook topic for German deep blocks, by plan week (Mon-based, W1 = 19 Oct). Order matches file 01 §7. */
CONTENT.grammar = {
  1: ["Personal pronouns + present-tense endings (ich/du/er/sie/wir/ihr/Sie)", "sein + haben; W-questions (verb in position 2) vs yes/no questions (verb first)", "Formal Sie vs du; numbers 1–100 dictation"],
  2: ["Personal pronouns, present tense, sein/haben (Grammatik aktiv: Präsens, sein/haben)", "W-questions + ja/nein-Fragen + formal Sie; numbers dictation", "Noun gender + plural (der/die/das — learn every noun WITH article); kein/nicht intro"],
  3: ["Vowel-change verbs (essen → isst, sprechen, nehmen); kein vs nicht", "Possessives (mein/dein/sein/ihr/unser); separable verbs (aufstehen → ich stehe … auf)", "Clock time 12-h/24-h, am/um/von–bis; dates + ordinals"],
  4: ["Modal verbs (können, müssen, wollen, möchten, dürfen) — infinitive goes to the END", "Prepositions with place: bei, mit, von, zu, nach; in/an/auf (recognition only)", "Comparing: gern / lieber / am liebsten; ‘gehen + infinitive’; directions vocabulary"],
  5: ["Quantities and prices: wie viel / wie viele; imperative (du/Sie/ihr)", "Accusative pronouns (mich/dich/ihn/sie/es …); recognise Perfekt (habe … gemacht)", "Mixed review of your error log (all tags)"],
  6: ["Repair day: redo every item you missed in Übungssatz 01", "Writing: 1 form + 1 message today (Schreiben Teil 1 + 2), typed on a German layout", "Error log → Anki cards + Grammatik aktiv exercises for your 3 weakest tags"],
  7: ["Full-section drill: Lesen Teil 1–3 timed (25 min) + review", "Writing: 2 messages typed + self-check against the Goethe criteria", "Weakest-Teil drill (whichever Teil scored lowest in Mock 3)"]
};

/* Writing tasks (Schreiben) — prompts for the 45-min deep block: [form task, message task] by theme. */
CONTENT.writing = {
  2: "Form task: fill a registration form (name, address, phone, nationality, language) from memory — 5 items. Message: 3-sentence introduction to a new teacher.",
  3: "Form task: gym/library membership form. Message (~30 words): invite a friend for Saturday — greeting, time, place, closing.",
  4: "Form task: hotel/train booking form. Message (~30 words): cancel an appointment and ask for a new one.",
  5: "Form task: doctor/appointment form. Message (~30 words): ask a colleague about directions + say thanks.",
  6: "Exam format: one form (5 blanks) + one message (≈30 words, 3 content points) — typed on QWERTZ, 20 min total.",
  7: "Exam format again, from the Goethe model sets; mark yourself with the official scoring sheet (3 / 1.5 / 0 per content point)."
};

/* Live speaking sessions (file 06 §1.7) — date → label. */
CONTENT.live = {
  "2026-10-22": "LS-A · Book TRIAL lessons now: Verbling free 30-min trial + 2 paid exam-prep trials (italki Professional / Preply), 3 different teachers, this week and next. Quality matters more than price: pick your MAIN tutor by Fri 30 Oct.",
  "2026-10-28": "LS-B · Trial #2 (an exam-prep tutor): Teil 1 intro, spelling, numbers, pronunciation check. Ask for their top 3 fixes for you.",
  "2026-10-30": "Decide your MAIN tutor today. From 4 Nov you have 2 live sessions a week (Wed 18:00 + Sat afternoon) — that is also two human conversations a week.",
  "2026-11-04": "LS-C · Live session #1 (Wed ~18:00): Sprechen 1 + spelling + numbers + repair phrases (Wie bitte? / Noch einmal, bitte / Langsamer, bitte). Do not start Teil 2 yet.",
  "2026-11-07": "LS-D · Sat session: SPRECHEN 2 with the Essen & Trinken + Wochenende word cards — ask the tutor: is each of your questions a REAL question? (a question scores 2, an answer 1).",
  "2026-11-11": "LS · Wed session: SPRECHEN 3 requests (Glas, Besteck, Apfel, Tasche, Stift …) + pronunciation (ü, ch, st/sp).",
  "2026-11-14": "LS-E · MOCK 1 Sprechen with the tutor — full 15-min exam after the written Übungssatz 01. Ask for a raw score out of 15 (≥11: drop optional sessions; ≤8: add extra sessions).",
  "2026-11-18": "LS · Wed session: SCHREIBEN 2 — bring 3 messages (invitation, delay/apology, information request); the tutor scores 3 / 1.5 / 0 per content point + greeting and closing.",
  "2026-11-21": "LS-F · MOCK 2 Sprechen with a NEW examiner (different accent, no warning of the cards).",
  "2026-11-25": "LS · Wed session: second Schreiben-2 marking + Sprechen 2 cards on Schule, Beruf, Sport.",
  "2026-11-28": "LS-G · MOCK 3 Sprechen — full 15 min, target 11+/15.",
  "2026-12-02": "LS-H · Wed session: your weakest Teil (and the prohibition cards for Sprechen 3).",
  "2026-12-03": "LS · Optional extra 30-min session on your weakest Teil.",
  "2026-12-05": "LS-I · Dress rehearsal: group Sprechen (tutor + 1–2 peers) after the typed written mock."
};

/* AI-voice speaking loop (file 06 §3.3 prompts P1–P4, §9 rhythm). */
CONTENT.speakByDow = {
  1: "P1 · Teil 1 (introduce yourself + spell a word + say a number)",
  2: "P2 · Teil 2 (ask and answer with the official word cards)",
  3: "P3 · Teil 3 (requests and reactions with picture cards)",
  4: "P1 · Teil 1 again — faster, no notes",
  5: "P2 · Teil 2 again — new card theme",
  6: "P3 · Teil 3 again",
  0: "P4 · full 15-min mock (voice)"
};

/* Anki new-card rule (file 01 §4.2): 20/day Mon–Sat to 28 Nov, 10/day to 5 Dec, none after. */
CONTENT.ankiNew = function (iso, dow) {
  if (dow === 0) return 0;
  if (iso <= "2026-11-28") return 20;
  if (iso <= "2026-12-05") return 10;
  return 0;
};

/* Short extra items from the A1 syllabus audit (file 12), shown inside the German retrieval / Sunday Anki slots */
CONTENT.germanExtra = {
  "2026-11-01": "10-min drill (after Mock 0): underline every ‘Bitte … Sie’ and every ‘sollen’ sentence in the Hören Teil 2/3 transcripts of the Modellsatz, say each aloud, rewrite 5 as ‘X soll …’.",
  "2026-11-05": "Chunks to learn today (they appear in 3 of 3 official sets): ‘Ich freue mich (sehr) auf dich/euch/…’ and ‘Darf ich …?’.",
  "2026-11-09": "10-min drill: ‘Darf ich hier …?’ and ‘Hier ist … verboten’ with the 4 prohibition pictograms from the Teil-3 cards.",
  "2026-11-12": "5-min grammar page: Nicos Weg N72 (vor/nach + Dativ: vor dem Konzert, nach der Mittagspause). Then the Sie-Imperativ + sollen drill again (10 min).",
  "2026-11-13": "5-min grammar page: Nicos Weg N69 (müssen or sollen) — read it after N64."
};

CONTENT.mocks = {
  "2026-10-31": { n: "MOCK 0 — diagnostic", what: "Official Modellsatz, written block timed (Hören ≈20 + Lesen 25 + Schreiben 20 = 65 min, paper) + record Sprechen Teil 1 solo. Purpose: find the weak Teile, not pass (expect 50–65 %). Pass line = 36 of 60 raw (60/100)." },
  "2026-11-07": { n: "MINI-MOCK (sectional)", m: 75, what: "Hören Teil 2 × 2 sets (heard once) + Schreiben Teil 2 × 3 notes + Sprechen Teil 1–3 with the tutor (LS-D)." },
  "2026-11-14": { n: "MOCK 1 — full (paper)", what: "Official Übungssatz 01: written 65 min + full Sprechen with the tutor (LS-E). Log raw /60 and the gap to 36." },
  "2026-11-21": { n: "MOCK 2 — full, typed on QWERTZ", what: "Third-party full test (e.g. the Goyal ‘Fit fürs Goethe-Zertifikat A1’ ₹310 or a telc Start Deutsch 1 sample): Hören with headphones, Lesen/Schreiben typed on a German keyboard layout, Sprechen with a NEW examiner (LS-F)." },
  "2026-11-28": { n: "MOCK 3 — full, typed", what: "Second third-party test, or your weakest sets sectionally. Target ≥ 40/60 raw. Sprechen with LS-G." },
  "2026-12-05": { n: "MOCK 4 — dress rehearsal", what: "Official Übungssatz 02 kept unseen until now. Same start time as the real exam, 65 min typed with headphones, no breaks, then group Sprechen (LS-I). Target ≥ 42/60 raw." }
};
