/* =========================================================================
   data.js — Default seed data for the Career OS dashboard.
   This is the REAL output of an ongoing career strategy engagement. It is
   only used to initialize localStorage the FIRST time the app runs — after
   that, everything the user edits lives in localStorage and this file is
   never read again except for the version-gated content migration in
   app.js's loadState()/migrateContent().

   PIVOT LOG:
   - 2026-08-30: AI-Engineer-primary -> Quant/Algorithmic-Trading-primary
     (CONTENT_VERSION 2 -> 3).
   - 2026-10-01: Quant-primary -> Germany MS (CS/AI, Winter 2027/28) as the
     single primary lane (CONTENT_VERSION 3 -> 4). The quant plan is parked,
     not deleted — app.js's v4 migration moves the quant skills, courses,
     projects and progress into STATE.archive.quant.

   Unlike earlier versions, this plan is CALENDAR-ANCHORED: admission and
   exam deadlines are fixed dates, so Day 1 is always 2026-10-01 and
   Day N always maps to the same date (see PLAN_START_DATE).
   ========================================================================= */

const PLAN_START_DATE = "2026-10-01";

/* Weekly template helper. Index = JS Date.getDay() (0 = Sun ... 6 = Sat).
   `overrides` lets a specific weekday differ from the standard weekday
   (e.g. { 2: { deep2: "AWA essay" } } changes Tuesday's deep2 only). */
function weekTemplate(weekday, sat, sun, overrides) {
  const arr = [sun, weekday, weekday, weekday, weekday, weekday, sat];
  Object.entries(overrides || {}).forEach(([k, v]) => { arr[k] = { ...weekday, ...v }; });
  return arr;
}

const BUFFER_SUNDAY = {
  morning: "—",
  daytime: "CATCH-UP & BUFFER — no new material, finish what slipped",
  deep1: "Weekly review in Career OS — re-rate skills honestly, tick roadmap tasks",
  deep2: "Plan next week + check d-mat.de (dMAT date), DAAD/Erasmus/uni pages for changes",
  deep3: "—",
  night: "Rest"
};

const DEFAULT_STATE = {
  meta: {
    startDate: PLAN_START_DATE,
    createdAt: "2026-08-15",
    lastUpdated: PLAN_START_DATE,
    schemaVersion: 1
  },

  /* -----------------------------------------------------------------
     STRATEGY — read-only reference, shown on Dashboard / Roadmap
     ----------------------------------------------------------------- */
  strategy: {
    primary: "Germany MS in CS/AI, Winter 2027/28 — public universities. Reach: TUM Informatics, Saarland CS/DSAI. Target: KIT CS, TU Darmstadt CS, RWTH SSE/Data Science (only if APS is ready by 1 Mar), Tübingen ML (only if converted grade ≤ 2.0). Target–safe: Passau AI Engineering, FAU AI (GATE route). Safe-ish: TU Berlin CS. Apply to 7–9.",
    secondary: "Funding layered onto the same goal, not a second lane: DAAD Study Scholarship (deadline mid-Oct 2026), Erasmus Mundus scholarship round — max 2–3 AI/data programs (EMAI, CYBERSURE, CoDaS with TU Braunschweig, EDISS, DEAI), accept only if fully funded — and Deutschlandstipendium after enrolment.",
    aggressiveParallel: "None. German A1 → B1 runs inside this plan (it's part of the Germany lane, not a separate one). Werkstudent readiness (portfolio project, DSA, LinkedIn) only gets real hours from Phase 4, after the application crunch.",
    option: "Quant / algo-trading plan — PARKED on 2026-10-01 (archived in Settings data, nothing deleted). Zero hours allocated. Reopen only by an explicit decision, never by drift. No-admit contingency: Summer 2028 intake with the same scores (GRE valid 5 yrs, GATE 3 yrs, dMAT indefinitely).",
    deprioritized: "GRE Mathematics Subject Test (GATE CS replaces it at FAU). Goethe A2 exam (₹10,600, no legal value — sit A1 and B1 only). US programs. telc German certificates (not on the German Missions' student-visa list — use Goethe or ÖSD).",
    notes: "Pivoted 2026-10-01 from Quant-primary to Germany-MS-primary after a full research cycle (global university comparison, scholarships, tests/prep, applications, Werkstudent market). Day 1 = 1 Oct 2026, Day 355 = 20 Sept 2027 (arrival) — calendar-anchored because the deadlines don't move. The real constraint is not the 8.08 CGPA, it's the dMAT → APS → uni-assist VPD chain: a dMAT by ~20 Feb keeps the 31 May deadlines (TUM/FAU/Passau) safe; later than that, KIT (15 Jun), TU Darmstadt (15 Jul) and TU Berlin (~31 Aug) carry the cycle. GRE General is the primary test (book 1–10 Dec); GATE CS is a ₹2,000 hedge that also replaces FAU's GRE requirement. German B1 by Sept 2027 shortens Blue Card settlement from 27 to 21 months and fixes the #1 hiring complaint German IT employers report (Bitkom 2026: 47% cite weak German). TUM excludes applications written with AI tools — every statement and essay is your own writing. Sleep: the 5h floor stays your call, but the research (AASM: ≤6h is inadequate; sleep consolidates new vocabulary) says drop the 23:30 light block, at minimum in the 7 days before each exam."
  },

  /* -----------------------------------------------------------------
     SKILLS — 0-6 scale. 0 none · 1 aware · 2 basics with help ·
     3 independent on standard problems · 4 at the exam/admission
     threshold · 5 consistently above threshold · 6 could teach it.
     Levels marked PROVISIONAL are estimates until the Day 1-21
     diagnostics (IELTS mock, POWERPREP Test 1 cold, NPTEL quiz)
     replace them with real numbers.
     ----------------------------------------------------------------- */
  skills: [
    { id: "german", name: "German (CEFR)", category: "German", level: 0, target: 4,
      note: "4/6 = Goethe B1 passed, all 4 modules (Modellsatz ≥60% per module before booking). True zero baseline on 1 Oct 2026. ~350–450 hours to B1 → 8–10 h/week average.",
      history: [{ date: PLAN_START_DATE, level: 0, note: "Starting from zero" }] },
    { id: "gre_quant", name: "GRE Quant", category: "Exams", level: 3, target: 5,
      note: "5/6 = Q ≥165 (TU Darmstadt's bar; TUM/KIT need 164). PROVISIONAL — mental math is a diagnosed strength (5/6), so the gap is likely format + speed. Replace with your POWERPREP Test 1 (cold) result on Day 10.",
      history: [{ date: PLAN_START_DATE, level: 3, note: "Provisional estimate" }] },
    { id: "gre_verbal", name: "GRE Verbal + AWA", category: "Exams", level: 2.5, target: 4,
      note: "4/6 = V ≥155 and AWA ≥4.0 (clears TUD 155, KIT 151, TUM/KIT AWA 4.0). PROVISIONAL until POWERPREP Test 1.",
      history: [{ date: PLAN_START_DATE, level: 2.5, note: "Provisional estimate" }] },
    { id: "english_test", name: "IELTS Academic", category: "Exams", level: 3.5, target: 5,
      note: "5/6 = 7.0 overall, no band below 6.5 (Tübingen, Saarland, TU Darmstadt ask for 7.0). PROVISIONAL until the Day 2 full mock.",
      history: [{ date: PLAN_START_DATE, level: 3.5, note: "Provisional estimate" }] },
    { id: "dmat", name: "dMAT Core speed", category: "Exams", level: 2.5, target: 4,
      note: "Core Module = figure sequences, mathematical equations, Latin squares — 20 items / 25 min each, NO note-taking. That's a working-memory load: practise exactly that format, and consider requesting ADHD accommodations (≥10 weeks before the test).",
      history: [{ date: PLAN_START_DATE, level: 2.5, note: "Provisional estimate" }] },
    { id: "toc", name: "Theory of Computation", category: "CS Foundations", level: 1, target: 4,
      note: "Feeds the TUM written test (area c), GATE CS and TU Darmstadt's exam. Check = NPTEL weekly assignments ≥70%. MOOCs do NOT add ECTS — this is for tests/interviews, not credit matching.",
      history: [{ date: PLAN_START_DATE, level: 1, note: "Provisional estimate" }] },
    { id: "probstat", name: "Discrete Maths & Probability", category: "CS Foundations", level: 1.7, target: 4,
      note: "TUM test area (b) + GATE. MIT 6.042J problem sets as the check.",
      history: [{ date: "2026-08-15", level: 1.7, note: "Initial diagnostic (Batch 3 — Probability & Statistics)" }] },
    { id: "linalg", name: "Linear Algebra & Analysis", category: "CS Foundations", level: 3.7, target: 4,
      note: "Already close — maintain via GATE practice, no dedicated block.",
      history: [{ date: "2026-08-15", level: 3.7, note: "Initial diagnostic (Batch 4, corrected)" }] },
    { id: "db_arch", name: "Databases & Computer Architecture", category: "CS Foundations", level: 2.5, target: 4,
      note: "TUM test area (d) + GATE DBMS/COA sections. Databases are a real-project strength (Postgres EXCLUDE constraints, locking); architecture is the gap.",
      history: [{ date: PLAN_START_DATE, level: 2.5, note: "Provisional estimate" }] },
    { id: "dsa", name: "DSA Fundamentals", category: "Career", level: 1.6, target: 4,
      note: "Werkstudent online assessments are LeetCode easy–medium (SAP, Zalando). NeetCode 150 from Phase 4. Diagnostic score kept as the honest baseline even though LeetCode rating is 1655 — re-test before claiming more.",
      history: [{ date: "2026-08-15", level: 1.6, note: "Initial diagnostic (Batch 2)" }] },
    { id: "dlai", name: "Applied AI / MLOps", category: "Career", level: 2, target: 5,
      note: "5/6 = one deployed project with CI, tests and monitoring that you can defend end to end in a German Werkstudent interview. Made With ML is the spine.",
      history: [{ date: "2026-08-15", level: 2, note: "Initial diagnostic (Batch 6 — Deep Learning / AI Engineering)" }] },
    { id: "app_docs", name: "Application documents", category: "Applications", level: 1, target: 5,
      note: "5/6 = motivation letter + TUM statement/essay + tabular CV reviewed by two humans (not AI) and mapped to each program's modules. TUM excludes AI-written applications.",
      history: [{ date: PLAN_START_DATE, level: 1, note: "Starting point" }] },
    { id: "interview", name: "Admission interview readiness", category: "Applications", level: 1.5, target: 4,
      note: "4/6 = would score ≥30/60 on KIT's interview (motivation + technical depth on your own projects). Two recorded mock orals before June.",
      history: [{ date: PLAN_START_DATE, level: 1.5, note: "Provisional estimate" }] }
  ],

  /* -----------------------------------------------------------------
     ROADMAP — 6 phases, Day 1 = 1 Oct 2026 → Day 355 = 20 Sep 2027.
     Explicit day-by-day plans for Days 1–21; every other day falls back
     to its phase's weekly template (dayTemplate, indexed by weekday).
     ----------------------------------------------------------------- */
  roadmap: [
    { phase: "Phase 0 — Lock-in (1–14 Oct 2026)", range: [1, 14], weeks: [
      { title: "Week 1 (1–7 Oct): Register GATE, book IELTS + GRE, DAAD draft", days: "1-7", tasks: [
        "Open the DAAD portal, select India, write down the exact deadline; email DAAD New Delhi to confirm (working deadline: 15 Oct)",
        "Register for GATE 2027 — paper CS, DigiLocker, ₹2,000 — before 5 Oct (late fee window to 12 Oct)",
        "Book IELTS Academic (computer-delivered) for ~8–10 Oct and the GRE General for 1–10 Dec",
        "Email 2 professors for recommendation letters; email Bennett for the module handbook, CGPA→% rule, minimum pass grade and a class-rank letter",
        "DAAD motivation letter v1 + tabular CV (≤3 pages) — your own words, no AI"
      ], resources: ["daad-scholarship", "gate2027", "ielts-idp", "daad-letter-guide"],
      dailyPlan: [
        { d: 1, morning: "Open DAAD portal → select India → note the exact deadline; email DAAD New Delhi", daytime: "Emails: 2 professors (LORs) + Bennett registrar (module handbook, CGPA→% rule, min pass grade, rank letter)", deep1: "GATE 2027 registration — CS paper, DigiLocker, ₹2,000 (deadline 5 Oct)", deep2: "Book IELTS Academic (computer) for ~8–10 Oct + GRE General for 1–10 Dec", deep3: "Install Anki, add the Goethe A1 deck", night: "Recap today in 2 sentences + log hours" },
        { d: 2, morning: "DW Nicos Weg A1 — episode 1", daytime: "Read the DAAD letter-of-motivation guide; outline your letter in bullets", deep1: "IELTS full practice test, timed — this is your diagnostic", deep2: "DAAD motivation letter draft v1 (your own words — no AI)", deep3: "Anki 10 min", night: "Score the IELTS mock → update the IELTS skill level" },
        { d: 3, morning: "—", daytime: "IELTS Writing Task 1 + Task 2 practice, then Speaking (record yourself, 3 parts)", deep1: "DAAD CV — tabular, ≤3 pages, month/year dates", deep2: "German: Nicos Weg episodes 2–3", deep3: "—", night: "Rest" },
        { d: 4, morning: "—", daytime: "CATCH-UP & BUFFER — finish anything from Days 1–3", deep1: "Confirm GATE registration is fully submitted (fee paid, PDF saved)", deep2: "Weekly review: self-rate every skill 0–6 in Skill Trackers", deep3: "—", night: "Rest" },
        { d: 5, morning: "Nicos Weg ep 4 + Anki", daytime: "GATE regular deadline TODAY — last check; IELTS Reading set (timed) in 25-min chunks", deep1: "IELTS Listening + weakest-band drill", deep2: "DAAD motivation letter v2", deep3: "Anki", night: "Recap + log" },
        { d: 6, morning: "Nicos Weg ep 5 + Anki", daytime: "Collect DAAD documents: transcripts, passport scan, certificates", deep1: "IELTS full mock #2, timed", deep2: "Review mock #2 mistakes; Writing Task 2 rewrite", deep3: "Anki", night: "Recap + log" },
        { d: 7, morning: "Nicos Weg ep 6 + Anki", daytime: "Send DAAD letter v2 to one human reviewer (professor/sister) — not an AI tool", deep1: "IELTS Speaking: full mock with a friend or recorded", deep2: "Goethe online discount GDW4D26 (valid to 14 Oct): check if any A1 batch fits evenings/weekends — book or consciously skip", deep3: "Anki", night: "Recap + log" }
      ]},
      { title: "Week 2 (8–14 Oct): Sit IELTS, submit DAAD, Gate 0", days: "8-14", tasks: [
        "Sit IELTS Academic (target 7.0, no band below 6.5)",
        "Take POWERPREP Test 1 cold as your GRE diagnostic — replace the provisional GRE skill levels",
        "Submit the DAAD application by ~13 Oct (motivation letter, CV, LOR, transcripts, IELTS score)",
        "GATE late-fee deadline 12 Oct — only matters if Day 1 slipped",
        "Gate 0 review on Day 14"
      ], resources: ["ielts-idp", "powerprep", "daad-scholarship"],
      dailyPlan: [
        { d: 8, morning: "Anki only", daytime: "IELTS light review — no new material", deep1: "DAAD: chase the LOR if not received", deep2: "IELTS: one Writing Task 2 timed, then stop", deep3: "—", night: "Sleep early before the IELTS" },
        { d: 9, morning: "—", daytime: "IELTS EXAM (your booked date ~8–10 Oct)", deep1: "Rest — no study after the exam", deep2: "DAAD letter: integrate the reviewer's comments → v3", deep3: "—", night: "Rest" },
        { d: 10, morning: "—", daytime: "POWERPREP Test 1 — cold, timed, full test (GRE diagnostic)", deep1: "Review every POWERPREP mistake; start an error log", deep2: "German long session: Nicos Weg ×3", deep3: "—", night: "Update GRE Quant + Verbal skill levels from the real score" },
        { d: 11, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "DAAD: final read-through of every document", deep2: "Weekly review in Career OS", deep3: "—", night: "Rest" },
        { d: 12, morning: "Anki", daytime: "GATE late-fee deadline TODAY (only if not registered); IELTS result → add to DAAD", deep1: "DAAD: upload all documents in the portal", deep2: "Goethe GDW4D26 — final decision (code expires 14 Oct)", deep3: "Anki", night: "Recap + log" },
        { d: 13, morning: "Anki", daytime: "SUBMIT DAAD (2 days of slack before the 15 Oct working deadline)", deep1: "GRE: sign up for GregMat+, pick the study plan, set up the error log", deep2: "Nicos Weg ep 7–8", deep3: "Anki", night: "Recap + log" },
        { d: 14, morning: "—", daytime: "GATE 0 — check every criterion in Milestones", deep1: "Go/No-Go review", deep2: "Plan Phase 1 week 1", deep3: "—", night: "—" }
      ]}
    ]},

    { phase: "Phase 1 — Scores & audit (15 Oct – 1 Dec 2026)", range: [15, 62],
      dayTemplate: weekTemplate(
        { morning: "German: 1 Nicos Weg episode + Anki A1 (10 min)", daytime: "Work-window micro-slots (25-min Quick timer): Anki GRE vocab ×2 + 1 GRE Quant mini-set", deep1: "GRE Quant — this week's GregMat topic + error log", deep2: "GRE Verbal: Text Completion / Sentence Equivalence + 1 RC set", deep3: "Light: Anki (German + GRE) + plan tomorrow — first block to cut", night: "2-sentence recap + log hours" },
        { morning: "—", daytime: "GRE: full timed section set or a mock (3h) + review", deep1: "NPTEL Theory of Computation — 1 week of lectures", deep2: "German long session: Nicos Weg ×3 + 1 Lingoni grammar video", deep3: "—", night: "Rest" },
        BUFFER_SUNDAY,
        { 2: { deep2: "AWA: 1 Issue essay (30 min) + self-score with the ETS rubric" },
          4: { deep2: "Applications: credit-mapping table / APS dossier / Bennett document chase" } }
      ),
      weeks: [
      { title: "Days 15–21 (15–21 Oct): GRE plan live + credit audit starts", days: "15-21", tasks: [
        "GRE: GregMat plan running, error log in use every session",
        "Start the credit-mapping table: required area → Bennett course → credits → syllabus page, for TUM, KIT, TU Darmstadt, RWTH, TU Berlin, Passau",
        "Email APS India: which checklist applies to a final-year student without a provisional degree?",
        "Chase Bennett documents on 21 Oct if nothing has arrived"
      ], resources: ["gregmat", "aps-india", "nptel-toc"],
      dailyPlan: [
        { d: 15, morning: "Nicos Weg + Anki", daytime: "Read the APS checklist; email APS about the final-year checklist", deep1: "GRE Quant: GregMat plan day 1 — arithmetic & number properties", deep2: "Credit audit: list the required areas for TUM (CS fundamentals, theory, FP & verification, maths)", deep3: "Anki", night: "Recap + log" },
        { d: 16, morning: "Nicos Weg + Anki", daytime: "Micro-slots: GRE vocab + Quant mini-set", deep1: "GRE Quant: number properties practice + error log", deep2: "Credit audit: map Bennett courses to TUM's areas", deep3: "Anki", night: "Recap + log" },
        { d: 17, morning: "—", daytime: "GRE: timed Quant section ×2 + review", deep1: "NPTEL Theory of Computation — week 1", deep2: "German long session", deep3: "—", night: "Rest" },
        { d: 18, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Weekly review + skill re-rating", deep2: "Check d-mat.de for the Q1 2027 date", deep3: "—", night: "Rest" },
        { d: 19, morning: "Nicos Weg + Anki", daytime: "Micro-slots: GRE vocab + Quant mini-set", deep1: "GRE Quant: algebra", deep2: "GRE Verbal: TC/SE + 1 RC set", deep3: "Anki", night: "Recap + log" },
        { d: 20, morning: "Nicos Weg + Anki", daytime: "Micro-slots: GRE vocab + Quant mini-set", deep1: "GRE Quant: algebra practice", deep2: "AWA Issue essay #1 (30 min) + self-score", deep3: "Anki", night: "Recap + log" },
        { d: 21, morning: "Nicos Weg + Anki", daytime: "Chase Bennett documents if not received", deep1: "GRE Quant: word problems", deep2: "APS dossier: start collecting attested copies", deep3: "Anki", night: "Recap + log" }
      ]},
      { title: "Days 22–35 (22 Oct – 4 Nov): GRE Quant core + APS couriered", days: "22-35", tasks: [
        "GRE Quant: algebra, geometry, data interpretation done in the GregMat plan",
        "Register with APS India and courier the dossier by 31 Oct (₹18,000) — APS allows filing before the dMAT result",
        "Contact g.a.s.t. about dMAT ADHD accommodations (needs ≥10 weeks before the test)",
        "German: Nicos Weg A1 units 1–6"
      ], resources: ["gregmat", "aps-india", "dmat-faq", "dw-nicos"] },
      { title: "Days 36–49 (5–18 Nov): Verbal/AWA push + Erasmus shortlist", days: "36-49", tasks: [
        "GRE Verbal + AWA: 2 essays/week, RC daily",
        "Erasmus Mundus shortlist of at most 3 (AI/data only) with a requirements matrix — EMAI opens ~15 Nov",
        "Credit-mapping table finished for all 6 programs; drop any program whose hard minimum you fail",
        "German: Nicos Weg A1 units 7–12, Anki streak ≥80% of days"
      ], resources: ["gregmat", "erasmus-catalogue", "dw-nicos"] },
      { title: "Days 50–62 (19 Nov – 1 Dec): GRE mocks + Gate 1", days: "50-62", tasks: [
        "POWERPREP Test 2 timed (save it for now) — target Q ≥163 + AWA around 4",
        "2 more full mocks (POWERPREP PLUS or GregMat) with full review",
        "Deloitte internship ends 1 Dec — the day block opens up from Day 63",
        "Gate 1 review on Day 62"
      ], resources: ["powerprep", "gregmat"] }
    ]},

    { phase: "Phase 2 — Wave-1 applications & German A1 (2 Dec 2026 – 15 Jan 2027)", range: [63, 107],
      dayTemplate: weekTemplate(
        { morning: "German: Anki A1 + Nicos Weg", daytime: "Day block (no Deloitte): Erasmus Mundus documents (2h) + German A1 sprint (1.5h)", deep1: "GATE CS: Theory of Computation / DBMS / COA (NPTEL + previous-year papers)", deep2: "GRE retake prep if under target, otherwise applied-AI portfolio project", deep3: "Light: Anki + plan tomorrow", night: "Recap + log" },
        { morning: "—", daytime: "Goethe A1 Modellsatz / Practice Set — timed, full", deep1: "italki speaking session (1h)", deep2: "GATE previous-year paper section (timed)", deep3: "—", night: "Rest" },
        BUFFER_SUNDAY
      ),
      weeks: [
      { title: "Days 63–72 (2–11 Dec): GRE test window + A1 sprint", days: "63-72", tasks: [
        "Sit the GRE General (booked 1–10 Dec) — scores arrive in 8–10 days",
        "Finish Nicos Weg A1 and take its free certificate test",
        "Book the Goethe A1 exam (₹9,400) for late Jan/Feb and the Goethe New Delhi A2 course (starts 9 or 11 Jan, ₹28,500)",
        "Register for the Q1 2027 dMAT the day g.a.s.t. opens it"
      ], resources: ["dw-nicos", "goethe-a1-practice", "goethe-delhi-courses", "dmat-faq"] },
      { title: "Days 73–92 (12–31 Dec): Erasmus Mundus submissions + GATE starts", days: "73-92", tasks: [
        "EMAI scholarship round (last cycle closed ~20 Dec) — submit if shortlisted (1-min video, 600–800-word letter, 2 LORs)",
        "GATE CS prep: Theory of Computation, DBMS, Computer Organization",
        "GRE retake booked if the first score is below Q164 / AWA 4.0 (21-day gap)",
        "German: 2 italki sessions/week, timed A1 practice sets"
      ], resources: ["erasmus-catalogue", "gate2027", "nptel-toc", "italki"] },
      { title: "Days 93–107 (1–15 Jan): CYBERSURE / CoDaS / EDISS + Gate 2", days: "93-107", tasks: [
        "Erasmus submissions as shortlisted: CYBERSURE 4 Jan, CoDaS 5 Jan (docs by 12 Jan), EDISS 12 Jan, DEAI ~13 Jan",
        "Download the GATE admit card (released ~4 Jan)",
        "Start the Goethe A2 course (9 or 11 Jan)",
        "Apply the GRE-vs-GATE decision rule on 15 Jan; Gate 2 review on Day 107"
      ], resources: ["erasmus-catalogue", "gate2027", "goethe-delhi-courses"] }
    ]},

    { phase: "Phase 3 — Gate tests & APS (16 Jan – 31 Mar 2027, final semester)", range: [108, 182],
      dayTemplate: weekTemplate(
        { morning: "German: Anki A2 + DW Deutschtrainer", daytime: "College + micro-slots: dMAT Core drill (Latin squares / figure sequences — 25-min timed, NO notes)", deep1: "GATE CS until the exam (Feb) → then TUM essay + statement drafting", deep2: "dMAT General Academic reading set (timed) / application documents", deep3: "Light: Anki + plan tomorrow — cut entirely in exam weeks", night: "Recap + log" },
        { morning: "—", daytime: "Goethe A2 class (08:00–13:30, weekend batch) — or Nicos Weg A2 if on the weekday batch", deep1: "GATE / dMAT full timed mock", deep2: "Review the mock", deep3: "—", night: "Rest" },
        { morning: "—", daytime: "Goethe A2 class (08:00–13:30) — then CATCH-UP & BUFFER", deep1: "Weekly review in Career OS", deep2: "Check d-mat.de / APS status / uni pages", deep3: "—", night: "Rest" }
      ),
      weeks: [
      { title: "Days 108–143 (16 Jan – 20 Feb): GATE sprint & exam + A1 exam", days: "108-143", tasks: [
        "Sit GATE CS (exam days 6–7, 13–14, 20–21 Feb — check your admit card)",
        "Sit the Goethe A1 exam (late Jan/Feb)",
        "dMAT drills from the official prep PDF — 3h/week, 6h/week in the final 3 weeks",
        "Follow the A2 course without skipping — it's the ADHD scaffold through the crunch"
      ], resources: ["gate2027", "dmat-prep", "goethe-delhi-courses"] },
      { title: "Days 144–162 (21 Feb – 11 Mar): dMAT → APS + TUM essay topics", days: "144-162", tasks: [
        "Sit the dMAT (New Delhi) — ideally by ~20 Feb; forward the certificate to APS the day it arrives",
        "RWTH (1 Mar) — submit only if APS is already issued",
        "TUM essay topics published by 1 Mar — pick one, outline it",
        "Draft the TUM statement of reasons (≤2 pages) — your own writing, no AI"
      ], resources: ["dmat-prep", "aps-india", "tum-style-guide"] },
      { title: "Days 163–182 (12–31 Mar): APS certificate → TUM VPD + Gate 3", days: "163-182", tasks: [
        "APS certificate issued (or written APS confirmation it will issue before ~5 Apr)",
        "File the TUM VPD through uni-assist (€75 + €30 per extra program) — ≥8 weeks before 31 May",
        "GATE result 19 Mar — record it; freeze the final list at 7–9 programs",
        "TUM essay (~1,000 words) + statement finished and reviewed by two humans; Gate 3 review on Day 182"
      ], resources: ["uni-assist-checklist", "tum-style-guide"] }
    ]},

    { phase: "Phase 4 — Wave-2 applications & German B1 (1 Apr – 15 Jul 2027)", range: [183, 288],
      dayTemplate: weekTemplate(
        { morning: "German: Anki B1 + DW slow news", daytime: "College (until May) → then portfolio project: deployed applied-AI/MLOps build", deep1: "Applications: one program per week end to end (documents, portal, uni-assist)", deep2: "German B1: course / Nicos Weg B1 + one written text for tutor correction", deep3: "Light: Anki + plan tomorrow", night: "Recap + log" },
        { morning: "—", daytime: "Interview / test prep: CS theory mock + Java OOP drills (TUM test, KIT interview)", deep1: "German speaking practice (B1 speaking is in pairs)", deep2: "NeetCode 150 — 3 problems", deep3: "—", night: "Rest" },
        BUFFER_SUNDAY
      ),
      weeks: [
      { title: "Days 183–212 (1–30 Apr): Tübingen + TUM/FAU/Passau files", days: "183-212", tasks: [
        "Tübingen ML deadline 30 Apr (only if converted grade ≤ 2.0)",
        "Prepare the TUM, FAU and Passau applications in full (deadlines 31 May)",
        "A2 course ends ~1 May — skip the A2 exam (no legal value)",
        "2 recorded mock admission interviews (motivation + project deep-dive)"
      ], resources: ["tum-style-guide", "uni-assist-checklist"] },
      { title: "Days 213–243 (1–31 May): Saarland, TUM, FAU, Passau + graduation", days: "213-243", tasks: [
        "Saarland deadline 15 May (2 LORs, GRE/GATE)",
        "TUM, FAU, Passau deadlines 31 May",
        "Graduate from Bennett (May) — request final transcripts + degree certificate immediately",
        "Start B1 (Goethe Online Live 11-week course or Nicos Weg B1 + italki)"
      ], resources: ["goethe-delhi-courses", "dw-nicos", "italki"] },
      { title: "Days 244–273 (1–30 Jun): KIT + TU Berlin + portfolio project", days: "244-273", tasks: [
        "KIT deadline 15 Jun — prepare for a possible KIT interview (June–July, scored 0–60, pass 30)",
        "TU Berlin application (open-admission window ~1 Jun – 31 Aug)",
        "Portfolio project: CI + tests + deployment (Made With ML)",
        "Book Goethe B1 dates as soon as they're released (~2–2.5 months ahead)"
      ], resources: ["made-with-ml", "neetcode", "goethe-b1-practice"] },
      { title: "Days 274–288 (1–15 Jul): TU Darmstadt + blocked account + Gate 4", days: "274-288", tasks: [
        "TU Darmstadt deadline 15 Jul — paper documents by post/courier (direct via TUCaN)",
        "Blocked account money ready (€11,904 in 2026 — check the 2027 figure)",
        "B1 course running; B1 exam dates booked",
        "Gate 4 review on Day 288"
      ], resources: ["goethe-b1-practice"] }
    ]},

    { phase: "Phase 5 — Departure (16 Jul – 20 Sep 2027)", range: [289, 355],
      dayTemplate: weekTemplate(
        { morning: "German: Anki B1 + DW news", daytime: "Logistics block — one task a day: visa / blocked account / insurance / housing / Anmeldung booking", deep1: "German B1 exam prep — timed module practice", deep2: "Werkstudent prep: NeetCode ×2 + CV + 5 LinkedIn connections", deep3: "Light: Anki + plan tomorrow", night: "Recap + log" },
        { morning: "—", daytime: "TUM written-test prep if invited (logic, maths, theory, DB/architecture/Java)", deep1: "German speaking practice", deep2: "Portfolio project polish", deep3: "—", night: "Rest" },
        BUFFER_SUNDAY
      ),
      weeks: [
      { title: "Days 289–304 (16–31 Jul): Admit → visa appointment the same week", days: "289-304", tasks: [
        "The week you get an admit: book the VFS visa appointment (appointments can't be moved earlier)",
        "Open the blocked account and buy health insurance (visa start follows insurance start)",
        "Apply to the Studierendenwerk dorm immediately (Munich waits 1–7 semesters); scam-check every WG-Gesucht offer",
        "Sit B1 Reading + Listening modules"
      ], resources: ["visa-faq", "daad-registering"] },
      { title: "Days 305–335 (1–31 Aug): B1 + TUM test + Werkstudent CV + Gate 5", days: "305-335", tasks: [
        "Sit B1 Writing + Speaking modules (₹4,700 each)",
        "TUM written test (~mid/late Aug, on site) if invited",
        "Werkstudent CV (1–2 pages, tabular, English) + saved searches on LinkedIn, StepStone, Arbeitnow, GermanTechJobs",
        "Gate 5 review on Day 335"
      ], resources: ["arbeitnow", "germantechjobs", "neetcode"] },
      { title: "Days 336–355 (1–20 Sep): Fly, land, register", days: "336-355", tasks: [
        "TU Darmstadt entrance exam (~1 Sep) if you didn't clear the GRE/GATE exemption",
        "Retake any failed B1 module (or book it in Germany)",
        "Fly; book the Anmeldung appointment for within 2 weeks of moving in",
        "FINAL: on campus, enrolled, registered — Day 355"
      ], resources: ["daad-registering"] }
    ]}
  ],

  /* -----------------------------------------------------------------
     COURSES / RESOURCE LIBRARY — verified 1 Oct 2026 (free first)
     ----------------------------------------------------------------- */
  courses: [
    { id: "powerprep", name: "ETS POWERPREP tests 1 & 2 (+ PLUS, $44.95 each)", url: "https://www.ets.org/gre/test-takers/general-test/prepare/powerprep.html", category: "Exams — GRE", cost: "Free (2 tests)", status: "not-started", notes: "Test 1 cold = diagnostic (Day 10). Save Test 2 for the final 3 weeks. Buy 1–2 PLUS tests." },
    { id: "gregmat", name: "GregMat+", url: "https://www.gregmat.com/", category: "Exams — GRE", cost: "$11.99/month", status: "not-started", notes: "The most-recommended course on r/GRE (community consensus). Follow one study plan, don't hop." },
    { id: "gate2027", name: "GATE 2027 official portal (IIT Madras)", url: "https://gate2027.iitm.ac.in/", category: "Exams — GATE", cost: "₹2,000 (₹2,500 late)", status: "not-started", notes: "Register by 5 Oct (late 12 Oct). Exam 6–7 / 13–14 / 20–21 Feb, result 19 Mar. Accepted by TUM, KIT, TU Darmstadt (≥750 exempts the entrance exam), Saarland, FAU." },
    { id: "ielts-idp", name: "IELTS Academic — IDP India booking", url: "https://ieltsidpindia.com/information/ielts-test-fee", category: "Exams — English", cost: "₹19,000", status: "not-started", notes: "Computer-delivered: results in 1–2 days. Target 7.0, no band below 6.5." },
    { id: "toefl-practice", name: "TOEFL iBT full-length practice test (2026 format)", url: "https://www.in.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-full-length-practice-test-1.pdf", category: "Exams — English", cost: "Free", status: "not-started", notes: "Only if you switch to TOEFL (₹15,729, scored 1–6 since Jan 2026)." },
    { id: "dmat-faq", name: "dMAT India FAQ (check weekly for the Q1 2027 date)", url: "https://www.d-mat.de/en/faq-graduate-students-india/", category: "Exams — dMAT", cost: "€150 test", status: "not-started", notes: "Register via g.a.s.t. the day it opens. Accommodation requests ≥10 weeks before the test." },
    { id: "dmat-prep", name: "dMAT official prep PDF (Core + General Academic)", url: "https://www.d-mat.de/wp-content/uploads/2026/09/260902_dMAT_General-Academic-Module_Preparatoy-Materials_EN.pdf", category: "Exams — dMAT", cost: "Free", status: "not-started", notes: "Plus 5 official tutorial videos and a portal demo on d-mat.de. Practise without notes — the real test allows none." },
    { id: "aps-india", name: "APS India — registration & checklist", url: "https://aps-india.de/", category: "Applications", cost: "₹18,000", status: "not-started", notes: "Courier the dossier by 31 Oct. Certificate issues only after the dMAT certificate is checked." },
    { id: "tum-sample-test", name: "TUM MSc Informatics sample written test", url: "https://www.cit.tum.de/fileadmin/w00byx/cit/Studium/Studiengaenge/Master_Informatik/sample-test_Master_application1.pdf", category: "Exams — University tests", cost: "Free", status: "not-started", notes: "2023 sample, 3 problems. Real test: 90 min, logic / maths / theory / DB-architecture-Java." },
    { id: "tud-examples", name: "TU Darmstadt entrance-exam example questions", url: "https://www.informatik.tu-darmstadt.de/media/informatik/fb20_studium/studiengaenge/sonstige_pdfs/Examples.pdf", category: "Exams — University tests", cost: "Free", status: "not-started", notes: "Dijkstra, LL(1) parsing, neural-network forward pass. Exempt with GRE V155/Q165/AWA3.5 or GATE ≥750." },
    { id: "nptel-toc", name: "NPTEL Theory of Computation (Prof. Tewari, IIT Kanpur)", url: "https://nptel.ac.in/courses/106104148", category: "CS Foundations", cost: "Free", status: "not-started", notes: "8 weeks, automata → decidability. Check = weekly assignments ≥70%." },
    { id: "mit-6042", name: "MIT 6.042J Mathematics for Computer Science", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/", category: "CS Foundations", cost: "Free", status: "not-started", notes: "Discrete maths + probability (TUM test area b, GATE)." },
    { id: "mit-1806", name: "MIT 18.06 Linear Algebra (Strang)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", category: "CS Foundations", cost: "Free", status: "not-started", notes: "Maintenance only — already 3.7/6." },
    { id: "dw-nicos", name: "DW Nicos Weg (A1–B1, free certificate per level)", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789", category: "German", cost: "Free", status: "not-started", notes: "The core spine. ~2-min episodes suit ADHD short sessions." },
    { id: "dw-hub", name: "DW Learn German hub (Deutschtrainer, Artikeltrainer, Kurz und leicht)", url: "https://learngerman.dw.com/en/learn-german/s-9528", category: "German", cost: "Free", status: "not-started", notes: "" },
    { id: "anki-a1", name: "Anki deck — Goethe A1 word list", url: "https://ankiweb.net/shared/info/293204297", category: "German", cost: "Free", status: "not-started", notes: "Use instead of generic frequency decks." },
    { id: "anki-b1", name: "Anki deck — Goethe B1 Wortliste", url: "https://ankiweb.net/shared/info/1586166030", category: "German", cost: "Free", status: "not-started", notes: "From May 2027." },
    { id: "goethe-a1-practice", name: "Goethe A1 model & practice exams", url: "https://www.goethe.de/en/spr/prf/ueb/pa1.html", category: "German", cost: "Free", status: "not-started", notes: "Timed practice from December." },
    { id: "goethe-b1-practice", name: "Goethe B1 model & practice exams", url: "https://www.goethe.de/ins/mm/en/m/spr/prf/gzb1/ueb.html", category: "German", cost: "Free", status: "not-started", notes: "≥60% per module before booking." },
    { id: "goethe-delhi-courses", name: "Goethe-Institut New Delhi — course dates (Intensive 160)", url: "https://www.goethe.de/ins/in/en/sta/del/kur/tup.cfm", category: "German", cost: "₹28,500 per level", status: "not-started", notes: "A2: weekend 9 Jan–1 May (Sat/Sun 08:00–13:30) or weekday 11 Jan–7 Apr (17:30). Fixed class times = the ADHD scaffold. Book only on goethe.de." },
    { id: "easy-german", name: "Easy German / Super Easy German", url: "https://www.easygerman.org/", category: "German", cost: "Free", status: "not-started", notes: "Listening; good for the commute slot." },
    { id: "schubert", name: "Schubert Verlag online grammar exercises", url: "https://www.schubert-verlag.de/aufgaben/uebungen_a1/a1_uebungen_index.htm", category: "German", cost: "Free", status: "not-started", notes: "" },
    { id: "italki", name: "italki community tutors", url: "https://www.italki.com/", category: "German", cost: "~$5–15/hour", status: "not-started", notes: "Speaking + writing correction, 2×/week from December." },
    { id: "tum-style-guide", name: "TUM application style guide", url: "https://www.tum.de/en/studies/application/application-info-portal/document-requirements/tum-style-guide", category: "Applications", cost: "Free", status: "not-started", notes: "Use as the universal template: PDF, A4, 12pt, 1.5 spacing. AI-written applications are excluded." },
    { id: "daad-letter-guide", name: "DAAD letter-of-motivation guide", url: "https://www2.daad.de/medien/letter_of_motivation_nawam.pdf", category: "Applications", cost: "Free", status: "not-started", notes: "" },
    { id: "daad-scholarship", name: "DAAD Study Scholarship — Master's, all disciplines", url: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50026200", category: "Applications", cost: "Free (€992/month if awarded)", status: "not-started", notes: "Select India for the exact deadline. 1 LOR from a professor, CV ≤3 pages, letter 1–3 pages." },
    { id: "uni-assist-checklist", name: "uni-assist checklist (VPD)", url: "https://www.uni-assist.de/fileadmin/Downloads/Tools/Checklisten/EN/UA-Checkliste-Standard-Verfahren-EN.pdf", category: "Applications", cost: "€75 + €30 per extra program", status: "not-started", notes: "6–7 weeks for Asia; file ≥8 weeks before the deadline." },
    { id: "erasmus-catalogue", name: "Erasmus Mundus catalogue", url: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en", category: "Applications", cost: "Free", status: "not-started", notes: "Max 2–3 AI/data programs. See scholarships.md for each program's link and deadline." },
    { id: "neetcode", name: "NeetCode 150", url: "https://neetcode.io/practice", category: "Career", cost: "Free", status: "not-started", notes: "Werkstudent online-assessment baseline (LeetCode easy–medium). From Phase 4." },
    { id: "made-with-ml", name: "Made With ML (MLOps)", url: "https://madewithml.com/courses/mlops/", category: "Career", cost: "Free", status: "not-started", notes: "Spine for the deployed portfolio project." },
    { id: "hf-learn", name: "Hugging Face Learn", url: "https://huggingface.co/learn", category: "Career", cost: "Free", status: "not-started", notes: "Applied LLM / RAG depth." },
    { id: "sdp", name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", category: "Career", cost: "Free", status: "not-started", notes: "Zalando recommends Alex Xu's book for its system-design round." },
    { id: "pramp", name: "Pramp (Exponent)", url: "https://www.pramp.com/", category: "Career", cost: "Free (5 credits/month)", status: "not-started", notes: "Mock interviews from Phase 4/5." },
    { id: "arbeitnow", name: "Arbeitnow — English-speaking jobs in Germany", url: "https://www.arbeitnow.com/english-speaking-jobs", category: "Career", cost: "Free", status: "not-started", notes: "Saved searches from July 2027." },
    { id: "germantechjobs", name: "GermanTechJobs", url: "https://germantechjobs.de", category: "Career", cost: "Free", status: "not-started", notes: "" },
    { id: "visa-faq", name: "German Missions India — student visa FAQ", url: "https://india.diplo.de/in-en/service/2546328-2546328", category: "Logistics", cost: "Free", status: "not-started", notes: "Book VFS the week you're admitted." },
    { id: "daad-registering", name: "DAAD — registering in Germany (Anmeldung)", url: "https://www.daad.de/en/studying-in-germany/living-in-germany/registering/", category: "Logistics", cost: "Free", status: "not-started", notes: "Anmeldung within 2 weeks of moving in." }
  ],

  /* -----------------------------------------------------------------
     PROJECTS
     ----------------------------------------------------------------- */
  projects: [
    { id: "proj-dossier", name: "Germany application dossier (Winter 2027/28)", status: "in-progress", progress: 0,
      description: "Everything the universities actually score: transcript credit mapping against each program's required areas, motivation letter, TUM statement + essay, tabular CV, LORs, APS certificate, uni-assist VPD. TUM's first stage is 50 of 57 points on curricular fit — this dossier, not the CGPA, is what decides admits.",
      milestones: [
        { title: "Bennett documents received: module handbook, CGPA→% rule, minimum pass grade, rank letter", done: false, dueWeek: 3 },
        { title: "DAAD submitted (letter, CV, LOR, transcripts, IELTS)", done: false, dueWeek: 2 },
        { title: "APS dossier couriered", done: false, dueWeek: 5 },
        { title: "Credit-mapping table done for TUM, KIT, TUD, RWTH, TU Berlin, Passau", done: false, dueWeek: 7 },
        { title: "Master motivation letter reviewed by two humans", done: false, dueWeek: 9 },
        { title: "TUM essay + statement of reasons final", done: false, dueWeek: 26 },
        { title: "TUM VPD filed via uni-assist", done: false, dueWeek: 26 },
        { title: "All 7–9 applications submitted", done: false, dueWeek: 41 }
      ],
      links: { repo: "", demo: "" } },
    { id: "proj-mlops", name: "Werkstudent-ready applied-AI project (deployed)", status: "planned", progress: 0,
      description: "One applied-AI system with CI, tests, deployment and monitoring that you can defend end to end in a German Werkstudent interview. Build on an existing strength (Nomly / the Dino request cascade) rather than starting cold. Real hours only from Phase 4.",
      milestones: [
        { title: "Problem + scope chosen, repo with README skeleton", done: false, dueWeek: 27 },
        { title: "Tests + CI pipeline green", done: false, dueWeek: 32 },
        { title: "Deployed with basic monitoring", done: false, dueWeek: 37 },
        { title: "Methodology-first README + 2-minute walkthrough you can give cold", done: false, dueWeek: 45 }
      ],
      links: { repo: "", demo: "" } }
  ],

  /* -----------------------------------------------------------------
     APPLICATIONS — pre-seeded with the target list (status "planned").
     Deadlines are last cycle's pattern unless confirmed — re-check each
     program page in November.
     ----------------------------------------------------------------- */
  applications: [
    { id: "app-daad", company: "DAAD", role: "Study Scholarship — Master's (all disciplines)", dateApplied: "", deadline: "2026-10-15", status: "planned", link: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50026200", notes: "Working deadline 15 Oct — confirm in the portal (select India)." },
    { id: "app-rwth", company: "RWTH Aachen", role: "MSc Software Systems Eng. / Data Science", dateApplied: "", deadline: "2027-03-01", status: "planned", link: "https://sc.informatik.rwth-aachen.de/en/studium/master/sse/application-for-admission/", notes: "Only if APS is issued by 1 Mar. GRE Q >75th pct, V >15th, AWA ≥3.5. No GATE." },
    { id: "app-tue", company: "Uni Tübingen", role: "MSc Machine Learning", dateApplied: "", deadline: "2027-04-30", status: "planned", link: "https://uni-tuebingen.de/en/study/finding-a-course/degree-programs-available/detail/course/machine-learning-master/", notes: "Only if converted grade ≤2.0. 27 ECTS maths, 18 ECTS CS, IELTS 7.0. €1,500/sem." },
    { id: "app-saar", company: "Saarland University", role: "MSc Computer Science / DSAI", dateApplied: "", deadline: "2027-05-15", status: "planned", link: "https://saarland-informatics-campus.de/en/studium-studies/master-english/application-guide/", notes: "CGPA ≥75% AND top-10% rank; GRE or GATE (no minimum); 2 LORs; C1 English." },
    { id: "app-tum", company: "TUM", role: "MSc Informatics", dateApplied: "", deadline: "2027-05-31", status: "planned", link: "https://www.cit.tum.de/en/cit/studies/degree-programs/master-informatics/", notes: "APS via uni-assist VPD first (file by ~5 Apr). GRE Q164/AWA4 or GATE CS. €6,000/sem. Written test ~Aug if in the 70–84 band." },
    { id: "app-fau", company: "FAU Erlangen", role: "MSc Artificial Intelligence", dateApplied: "", deadline: "2027-05-31", status: "planned", link: "https://www.ai.study.fau.eu/prospective-students/master-ai/application-master/", notes: "GATE CS/DA route (or GRE General + Math Subject). €4,000/sem from SS 2027." },
    { id: "app-passau", company: "Uni Passau", role: "MSc AI Engineering", dateApplied: "", deadline: "2027-05-31", status: "planned", link: "https://www.uni-passau.de/en/msc-ai-eng", notes: "No GRE. APS by the deadline. A1 German by end of year 1. No tuition." },
    { id: "app-kit", company: "KIT", role: "MSc Computer Science (INT)", dateApplied: "", deadline: "2027-06-15", status: "planned", link: "https://www.informatik.kit.edu/english/14346.php", notes: "GRE V151/Q164/AWA4 or GATE. Possible interview Jun–Jul (0–60, pass 30). €1,500/sem." },
    { id: "app-tud", company: "TU Darmstadt", role: "MSc Computer Science", dateApplied: "", deadline: "2027-07-15", status: "planned", link: "https://www.informatik.tu-darmstadt.de/studium_fb20/vor_dem_studium/bewerbung_1/bewerbung_2.en.jsp", notes: "Direct via TUCaN, paper documents by post. 60 ECTS matching core; exam ~1 Sep unless GRE V155/Q165/AWA3.5 or GATE ≥750." },
    { id: "app-tub", company: "TU Berlin", role: "MSc Computer Science", dateApplied: "", deadline: "2027-08-31", status: "planned", link: "https://www.tu.berlin/en/eecs/academics-teaching/study-offer/masters-programs/msc-computer-science-informatik/msc-cs-in-application-admission", notes: "Safe-ish (open admission). No GRE. Credit minimums: 12 CP theory, 12 CP comp. eng., 18 CP maths." }
  ],
  interviews: [],
  competitions: [
    { id: "comp-kaggle-1", name: "First Kaggle competition (beginner-friendly, well-documented)", platform: "Kaggle", status: "not-started", url: "https://www.kaggle.com/competitions", notes: "Optional — only after every application is in (Phase 5). Goal if pursued: finish and document end to end, not win." }
  ],

  /* -----------------------------------------------------------------
     STUDY / EXERCISE LOGS — empty, user fills daily
     ----------------------------------------------------------------- */
  studyLog: [],
  exerciseLog: [],
  pomodoroLog: [],
  dailyPlanDone: {},

  /* -----------------------------------------------------------------
     TIMETABLE — same real schedule; the content of each block changed.
     ----------------------------------------------------------------- */
  timetable: [
    { time: "05:30–07:30", block: "Gym", type: "fixed", note: "Non-negotiable, set by you — not up for redesign." },
    { time: "07:30–08:30", block: "Breakfast & bath", type: "fixed", note: "Non-negotiable. German audio (Coffee Break German, Easy German) fits here." },
    { time: "08:30–09:30", block: "Buffer / commute — light warm-up", type: "light", note: "German: 1 Nicos Weg episode + 10 min Anki. Nothing new or hard here, it's transition time." },
    { time: "09:30–18:00", block: "WORK WINDOW → DAY BLOCK", type: "flexible", note: "Until 1 Dec: Deloitte — interruptible, ~2 real work hours scattered. Use 25-min Quick sessions for resumable tasks only: Anki (German + GRE vocab), GRE Quant mini-sets, application admin. From 2 Dec: free day block (Erasmus documents, German A1 sprint). From January: Bennett's final semester + dMAT Core micro-drills." },
    { time: "18:00–18:45", block: "Decompress / dinner prep", type: "light" },
    { time: "18:45–19:30", block: "Dinner", type: "fixed" },
    { time: "19:30–21:30", block: "DEEP WORK 1 — hardest task of the day", type: "deep", note: "Your best focus window. GRE Quant (Oct–Nov) → GATE CS (Dec–Feb) → TUM essay/statement (Mar) → one application per week (Apr–Jul) → German B1 exam prep (Jul–Aug)." },
    { time: "21:30–21:45", block: "Break", type: "light" },
    { time: "21:45–23:15", block: "DEEP WORK 2 — second-hardest", type: "deep", note: "GRE Verbal/AWA + application documents (Oct–Nov) → Erasmus Mundus + GRE retake (Dec–Jan) → dMAT reading sets (Jan–Mar) → German B1 (Apr–Jul) → Werkstudent prep (Jul–Sep)." },
    { time: "23:15–23:30", block: "Break", type: "light" },
    { time: "23:30–00:15", block: "LIGHT BLOCK — Anki / flashcards / plan tomorrow", type: "light", note: "Was 'Quant Lab'. Low-load only, never new theory. This is the FIRST block to cut: dropping it moves sleep to 23:30 (6h). At minimum, cut it in the 7 days before IELTS, GRE, GATE, dMAT and B1." },
    { time: "00:15–00:30", block: "Quick review + plan tomorrow", type: "light" },
    { time: "00:30", block: "Sleep (~5h to 05:30 wake)", type: "fixed", note: "Your call — kept as you set it. Research says ≤6h is inadequate for adults (AASM/Sleep Research Society) and sleep is when new vocabulary consolidates — which is exactly what German + GRE Verbal depend on. Chronic slippage past 00:30 should trigger a renegotiation at the next gate, not a silent further cut." }
  ],

  /* -----------------------------------------------------------------
     REVIEWS — weekly/monthly entries, start empty
     ----------------------------------------------------------------- */
  reviews: { weekly: [], monthly: [] },

  /* -----------------------------------------------------------------
     MILESTONES — Go/No-Go gates. Each criterion is a yes/no check;
     the fail action is what you do instead of renegotiating the plan.
     ----------------------------------------------------------------- */
  milestones: [
    { id: "g0", title: "G0 — Lock-in (14 Oct 2026)", dueDay: 14, status: "pending",
      criteria: "GATE CS registered (PDF + receipt). IELTS sat or booked on a date DAAD accepts. DAAD submitted — or consciously skipped (no partial submission). GRE booked for 1–10 Dec. Goethe GDW4D26 decision made. Bennett documents + 2 LORs requested, APS email sent, g.a.s.t. accommodation enquiry sent. FAIL ACTION: chase everything on 21 Oct; if GATE missed, GRE-only route." },
    { id: "g1", title: "G1 — Scores & audit (1 Dec 2026)", dueDay: 62, status: "pending",
      criteria: "IELTS ≥7.0 overall (≥6.5 floor). POWERPREP Test 2 timed: Q ≥163, AWA practice ~4. Credit-mapping table done for TUM, KIT, TUD, RWTH, TU Berlin, Passau. APS dossier couriered (tracking number). German: Nicos Weg A1 units 1–12, Anki on ≥80% of days. Erasmus shortlist ≤3. FAIL ACTION: IELTS retake in Dec; move GRE to early Jan (₹5,650); drop any program whose credit minimum you fail." },
    { id: "g2", title: "G2 — Wave 1 (15 Jan 2027)", dueDay: 107, status: "pending",
      criteria: "Official GRE ≥ Q164 / AWA 4.0 (stretch Q165 / V155). Erasmus submissions done as shortlisted. dMAT registered (New Delhi). Goethe A1 exam booked, A2 course started 9 or 11 Jan. GATE admit card downloaded. FAIL ACTION: apply the GRE-vs-GATE rule — below Q164 after two attempts, GATE CS becomes the TUM/KIT route and RWTH drops; if no dMAT date by 15 Jan, re-plan around KIT, TUD, TU Berlin." },
    { id: "g3", title: "G3 — Gate tests & APS (31 Mar 2027)", dueDay: 182, status: "pending",
      criteria: "dMAT sat, certificate forwarded to APS. APS certificate issued (or written confirmation it issues before ~5 Apr). TUM VPD filed through uni-assist. TUM essay (~1,000 words) + statement drafted by YOU and reviewed by two humans. GATE result recorded; final list frozen at 7–9 programs. FAIL ACTION: no APS by ~5 Apr → TUM, FAU, Passau come off the 'safe to submit' list; KIT, TUD, TU Berlin anchor the cycle." },
    { id: "g4", title: "G4 — Wave 2 (15 Jul 2027)", dueDay: 288, status: "pending",
      criteria: "All planned applications submitted, including at least one safe-ish (TU Berlin or Passau). At least 1 admit, OR ≥4 decisions still pending. Blocked-account money available (€11,904 in 2026 — check the 2027 figure). B1 course running, B1 dates booked. FAIL ACTION: add TU Berlin immediately (window to ~31 Aug); prepare the Summer 2028 contingency; JN Tata / K.C. Mahindra if funds fall short." },
    { id: "g5", title: "G5 — Departure-ready (31 Aug 2027)", dueDay: 335, status: "pending",
      criteria: "Visa granted. Housing: Studierendenwerk application filed or a scam-checked temporary contract. Anmeldung appointment booked for within 2 weeks of arrival. B1 modules sat (or retake booked). TUM written test / TUD exam attended or exempt. Werkstudent CV + saved searches live. FAIL ACTION: ask the university about deferring the start — don't fly on hope; book a 4-week short-stay room." },
    { id: "g6", title: "FINAL — On campus (20 Sep 2027)", dueDay: 355, status: "pending",
      criteria: "Landed, enrolled, Anmeldung done, bank account + health insurance active, B1 certificate (or retake date). Honest retrospective: what's verifiably true now vs. 1 Oct 2026. Then: Deutschlandstipendium in semester 1 and the first Werkstudent applications." }
  ],

  /* -----------------------------------------------------------------
     NOTES / RESUME / ACHIEVEMENTS
     ----------------------------------------------------------------- */
  notes: [],

  resume: {
    claims: [
      { skill: "Python", claimedLevel: "Strong understanding", verifiedLevel: 1, defensible: false, note: "Do not claim above level 3 until re-tested and holding up." },
      { skill: "SQL", claimedLevel: "Comfortable", verifiedLevel: 1.6, defensible: false, note: "JOINs are a real gap — fix before claiming this." },
      { skill: "NumPy/Pandas", claimedLevel: "Comfortable", verifiedLevel: null, defensible: null, note: "Untested by the diagnostic — verify before relying on the claim." },
      { skill: "Git/GitHub", claimedLevel: "Comfortable", verifiedLevel: null, defensible: null, note: "Untested by the diagnostic." },
      { skill: "German", claimedLevel: "Elementary (A1 in progress)", verifiedLevel: 0, defensible: true, note: "Claim only the level you've actually certified (Goethe A1 → B1). 'In progress' is honest and helps on LinkedIn." }
    ],
    portfolioLinks: []
  },

  achievements: [
    { id: "a1", date: "2026-08-15", title: "Diagnostic complete", description: "Finished the full 10-domain skill diagnostic — the real baseline this whole plan is built on." },
    { id: "a3", date: PLAN_START_DATE, title: "One lane: Germany MS", description: "Chose a single primary lane after researching ~60 programs in 15 countries, scholarships, tests and the German job market — and parked the quant plan explicitly instead of running five plans at once." }
  ],

  settings: { theme: "light" }
};

/* Deep clone helper so the DEFAULT_STATE object is never mutated in place */
function getFreshDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
