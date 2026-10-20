/* Weeks 10–11 of the plan: 20–31 December 2026 (the "finish strong" stretch) */
var CONTENT = (typeof CONTENT !== "undefined") ? CONTENT : {};

/* Run tables for plan weeks 10 (21–27 Dec) and 11 (28–31 Dec). Same shape as CONTENT.run. */
CONTENT.run.A[10] = [["30 min straight run",40],["30 min straight run",40],["5K run — repeat or beat your 19 Dec time",40]];
CONTENT.run.A[11] = [["25 min easy",35],["25 min easy",35],["—",0]];
CONTENT.run.B[10] = [["30 min easy",40],["30 min easy",40],["55 min (≈7.5 km) long run · exception",65]];
CONTENT.run.B[11] = [["30 min easy",40],["25 min easy",35],["—",0]];
CONTENT.run.C[10] = [["35 min easy",45],["35 min easy",45],["10K steady — repeat or beat 19 Dec · exception",85]];
CONTENT.run.C[11] = [["30 min easy",40],["25 min easy",35],["—",0]];
CONTENT.strengthMin[10] = 25; CONTENT.strengthMin[11] = 20;
CONTENT.yearEndRun = { A: "Year-end run: 30 min, run/walk as needed — finish smiling", B: "Year-end run: 40 min easy (≈5.5 km) — finish smiling", C: "Year-end run: 50 min easy (≈7 km) — finish smiling" };

/* Weekday blocks for 21–31 Dec: A = 08:45 (Joveo), M = 14:30 (tech/AI), B1 = 18:00 (Germany lane / German / review) */
CONTENT.yearend = {
"2026-12-21": {
  A:  { t: "Joveo · re-read 3 scorecards + 2 timed cases", d: "Read your last three scorecards, name the 2 recurring faults, then 2 timed cases (diagnosis + partner evaluation) aiming at exactly those faults. If a GD/PI date has arrived, rehearse for that instead." },
  M:  { t: "AI capstone 1 · scope and plan (75 min)", d: "Pick the ONE project that will be your public proof (best FastAPI/Postgres/LLM project or the Joveo-flavoured agent/simulator idea). Write what it does in 3 lines, the metric, a 1-page README skeleton, and the 3 build tasks for the week. The SWE JD says ‘shipped something real… your name on the commits’." },
  B1: { t: "Germany lane · IELTS / APS / SOP (60 min)", d: "Open the Career OS Deadlines page: do the next item due (IELTS booking/prep, APS documents, SOP bullets). One item only — finish it." }
},
"2026-12-22": {
  A:  { t: "Joveo · stories recorded + PI question set", d: "Record 4 stories (90 s each), replay at 1.5×, cut fillers; then answer 10 PI questions aloud (file 10 §2). Re-check that the commitment answer is unchanged." },
  M:  { t: "DSA hard-mode + error-log re-solves", d: C_dsa8() },
  B1: { t: "German A2 start or result check (45 min)", d: "Check MeinGoethe for the A1 result date. If you want: Nicos Weg A2 (learngerman.dw.com/en/nicos-weg/c-36519797) one lesson + 10 min Anki. Rest is fine too." }
},
"2026-12-23": {
  A:  { t: "Joveo · observed mock (PI-2 style)", d: "A person on camera: one case, one guesstimate, 5 quant questions; 10-min debrief on the scorecard." },
  M:  { t: "AI capstone 2 · build (75 min)", d: "Build task 1 from Monday’s list. End by running it once end to end and noting what broke." },
  B1: { t: "Germany lane · IELTS / APS / SOP (60 min)", d: "Next item from the Deadlines page. One item only." }
},
"2026-12-24": {
  A:  { t: "Joveo · 2 cases + GD maintenance", d: "Two timed cases, then 20 min of GD maintenance (one topic card, 2 openers, 1 AI round)." },
  M:  { t: "LLD + HLD mock (60 min)", d: "One 30-min LLD (e.g. Job Scheduler or Elevator) and one 30-min HLD (ad-click aggregation or AI-interviewer backend): requirements → design → trade-offs → failure modes. Say it aloud." },
  B1: { t: "Light evening (optional 30 min Anki + a walk)", d: "A lighter day before Christmas. Anki reviews, a walk, family time.", opt: true }
},
"2026-12-28": {
  A:  { t: "Joveo · full open mock", d: "One full-length mock of your choice (PI-1/2/3) with a human if possible; 15-min debrief; update the keyword strip." },
  M:  { t: "AI capstone 3 · build + tests (75 min)", d: "Build task 2 and 3; add 5 tests or a golden set with 2 metrics so you can quote numbers." },
  B1: { t: "Germany lane · IELTS / APS / SOP (60 min)", d: "Next item from the Deadlines page. One item only." }
},
"2026-12-29": {
  A:  { t: "Joveo · weak-spot drill", d: "Lowest score on your last two scorecards, drilled for 70 minutes." },
  M:  { t: "DSA + CS rapid-fire (75 min)", d: "2 problems from the error log (25-min timers) + 20 min rapid-fire OS/DBMS/CN: each answer in 2 minutes aloud." },
  B1: { t: "German A2 / MeinGoethe check (45 min)", d: "If the A1 result is out, log it. One A2 lesson (optional)." }
},
"2026-12-30": {
  A:  { t: "Joveo · wrap-up + keyword strip", d: "One-page keyword strip (facts, metrics, values, your 4 best stories, the commitment answer) printed; logistics test (camera, mic, hotspot, charger)." },
  M:  { t: "AI capstone 4 · README + demo (75 min)", d: "Finish the README (problem, metric, screenshot, what you’d change), record a 2-minute demo, update your LinkedIn headline and GitHub pins." },
  B1: { t: "Germany lane · IELTS / APS / SOP (60 min)", d: "Next item from the Deadlines page. One item only." }
}
};
function C_dsa8() { return "Re-solve 2 problems from your error log under 25-min timers + 1 new hard (e.g. 41 First Missing Positive or 218 The Skyline Problem). Plain doc, dry-run aloud."; }

CONTENT.events.push(
  { d: "2026-12-25", t: "Christmas — light day if you want one" },
  { d: "2026-12-31", t: "YEAR-END REVIEW day" }
);
