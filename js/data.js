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
   - 2026-10-06: GATE dropped (v5), then the lean re-plan (v6): GRE parked,
     shortlist = TU Berlin / TU Darmstadt / TU Dortmund DS / FU Berlin DS (+ checks),
     APS timing risk, German B1 by Aug–Sep 2027. See the v5/v6 migrations in app.js.

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
  deep2: "Plan next week + check d-mat.de (Q1 2027 date) and the APS news page; uni pages in the Nov/Apr passes",
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
    primary: "Germany MS in CS/AI/Data Science, Winter 2027/28 (Summer 2028 is the fallback) — tuition-free public universities in job cities, no GRE. Core: TU Berlin CS, TU Darmstadt CS, TU Dortmund Data Science, FU Berlin Data Science. Check first: Passau AI Engineering (needs ≥35 ECTS maths — pre-check before paying). Stretch: HPI Potsdam, TUHH Data Science (its 1 Mar deadline likely precedes your APS certificate). Backup: Göttingen Applied CS. Apply to 4–6.",
    secondary: "Funding is a bonus, not a lane: DAAD only if the India deadline in the portal still fits and you want to spend the week on it (skipped by default). Erasmus Mundus is dropped. Deutschlandstipendium after enrolment.",
    aggressiveParallel: "None. German A1 → B1 runs inside this plan (it is part of the Germany lane). The next internship (SAP Labs India or another German-linked firm, 2027 batch) is an application task, not a second lane; Werkstudent readiness (portfolio project, DSA, LinkedIn) gets real hours only after the applications are in.",
    option: "Quant / algo-trading plan — PARKED on 2026-10-01 (archived in Settings data, nothing deleted). Reopen only by an explicit decision, never by drift. Contingency if APS cannot be issued before the spring deadlines (it may need the completed degree): use the July–August deadlines (TU Darmstadt 15 Jul, TU Berlin 31 Aug) or move to the Summer 2028 intake (Passau opens 1 Nov–15 Dec 2027); the dMAT result stays valid and an IELTS is usually accepted for 2 years.",
    deprioritized: "GATE CS (skipped 6 Oct 2026). GRE General is parked — decide on 15 Jan, default no; it only matters for KIT, Mannheim, RWTH and FAU AI. Off the list: TUM (GRE Q≥164, €4–6k/semester), Saarland (CGPA ≥75% and top-10% rank), Stuttgart (15 Jan deadline), Tübingen (grade ≤2.0), RWTH (1 Mar + GRE), FAU (€4,000/semester). Also: Erasmus Mundus rounds, US programs, telc German certificates (not on the visa list — use Goethe or ÖSD), the Goethe A2 exam (no legal value).",
    notes: "Re-planned 2026-10-06 after the deep dive (reports/germany-ms-deep-dive-2026-10-06.md) and the Bennett credit audit (reports/bennett-credit-audit-2026-10-06.md). Day 1 = 1 Oct 2026, Day 355 = 20 Sept 2027. What decides this cycle: (1) CREDITS — maths is your thinnest area (~24 ECTS-equivalent), so Dortmund, FU Berlin, TU Berlin and Darmstadt fit while Passau (≥35) probably does not; (2) APS — the certificate needs the dMAT, and it is unconfirmed whether a student with 7 of 8 semesters done can get it before graduating (APS reply pending): if not, the May deadlines fail and you rely on July–August deadlines or Summer 2028; (3) MONEY — tuition-free states only (Berlin, Hesse, NRW today); Baden-Württemberg is €1,500/semester and TUM/FAU €4–6k; budget 5 semesters; (4) GERMAN — 84% of tech Werkstudent posts need it, so aim for B1 by Aug–Sep 2027 (A2 course Jan–May, B1 exam Jul–Aug; June is a stretch). CGPA is 7.80 (recomputed from the transcript); semester 7 has only 12 credits, so it can lift it to 7.97 at most — do not trade German or the dMAT for marks. IELTS is needed regardless of any university waiver: APS and the visa accept only IELTS/TOEFL/Goethe, not medium-of-instruction letters. Sleep: the 5h floor stays your call, but the research (AASM: ≤6h is inadequate; sleep consolidates new vocabulary) says drop the 23:30 light block, at minimum in the 7 days before each exam."
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
    { id: "english_test", name: "IELTS Academic", category: "Exams", level: 3.5, target: 5,
      note: "5/6 = 7.0 overall, no band below 6.5 (TU Darmstadt asks 7.0, TU Berlin and Göttingen 6.5; APS and the visa need an approved certificate — medium-of-instruction letters are not accepted there). PROVISIONAL until the Day 2 full mock.",
      history: [{ date: PLAN_START_DATE, level: 3.5, note: "Provisional estimate" }] },
    { id: "dmat", name: "dMAT Core speed", category: "Exams", level: 2.5, target: 4,
      note: "Core Module = figure sequences, mathematical equations, Latin squares — 20 items / 25 min each, NO note-taking. That's a working-memory load: practise exactly that format, and consider requesting ADHD accommodations (≥10 weeks before the test). Eligibility: APS exempts bachelor students who have not completed 7 semesters of a 4-year program — you complete semester 7 in Dec 2026; confirm with APS.",
      history: [{ date: PLAN_START_DATE, level: 2.5, note: "Provisional estimate" }] },
    { id: "toc", name: "Theory of Computation", category: "CS Foundations", level: 1, target: 4,
      note: "Feeds the TU Darmstadt entrance exam, Göttingen's aptitude test and admission interviews. Check = NPTEL weekly assignments ≥70%. MOOCs do NOT add ECTS — this is for tests/interviews, not credit matching.",
      history: [{ date: PLAN_START_DATE, level: 1, note: "Provisional estimate" }] },
    { id: "probstat", name: "Discrete Maths & Probability", category: "CS Foundations", level: 1.7, target: 4,
      note: "Your thinnest credit area (~24 ECTS-equivalent) + the TU Darmstadt exam. MIT 6.042J problem sets as the check.",
      history: [{ date: "2026-08-15", level: 1.7, note: "Initial diagnostic (Batch 3 — Probability & Statistics)" }] },
    { id: "linalg", name: "Linear Algebra & Analysis", category: "CS Foundations", level: 3.7, target: 4,
      note: "Already close — maintain via dMAT practice, no dedicated block.",
      history: [{ date: "2026-08-15", level: 3.7, note: "Initial diagnostic (Batch 4, corrected)" }] },
    { id: "db_arch", name: "Databases & Computer Architecture", category: "CS Foundations", level: 2.5, target: 4,
      note: "TU Darmstadt exam (DBMS / computer architecture) + the TU Dresden/Berlin credit tables. Databases are a real-project strength (Postgres EXCLUDE constraints, locking); architecture is the gap.",
      history: [{ date: PLAN_START_DATE, level: 2.5, note: "Provisional estimate" }] },
    { id: "dsa", name: "DSA Fundamentals", category: "Career", level: 1.6, target: 4,
      note: "Werkstudent online assessments are LeetCode easy–medium (SAP, Zalando). NeetCode 150 from Phase 4. Diagnostic score kept as the honest baseline even though LeetCode rating is 1655 — re-test before claiming more.",
      history: [{ date: "2026-08-15", level: 1.6, note: "Initial diagnostic (Batch 2)" }] },
    { id: "dlai", name: "Applied AI / MLOps", category: "Career", level: 2, target: 5,
      note: "5/6 = one deployed project with CI, tests and monitoring that you can defend end to end in a German Werkstudent interview. Made With ML is the spine.",
      history: [{ date: "2026-08-15", level: 2, note: "Initial diagnostic (Batch 6 — Deep Learning / AI Engineering)" }] },
    { id: "app_docs", name: "Application documents", category: "Applications", level: 1, target: 5,
      note: "5/6 = motivation letters + credit-mapping tables + tabular CV reviewed by two humans (not AI) and mapped to each program's modules. Write every letter yourself, no AI.",
      history: [{ date: PLAN_START_DATE, level: 1, note: "Starting point" }] },
    { id: "interview", name: "Admission interview readiness", category: "Applications", level: 1.5, target: 4,
      note: "4/6 = can explain your own projects and your motivation for 10 minutes without notes (admission interviews, aptitude tests). Two recorded mock orals before June.",
      history: [{ date: PLAN_START_DATE, level: 1.5, note: "Provisional estimate" }] }
  ],

  /* -----------------------------------------------------------------
     ROADMAP — 6 phases, Day 1 = 1 Oct 2026 → Day 355 = 20 Sep 2027.
     Explicit day-by-day plans for Days 1–21; every other day falls back
     to its phase's weekly template (dayTemplate, indexed by weekday).
     ----------------------------------------------------------------- */
  roadmap: [
    { phase: "Phase 0 — Lock-in (1–14 Oct 2026)", range: [1, 14], weeks: [
      { title: "Week 1 (1–7 Oct): Lock the exam plan, ask APS, request Bennett documents", days: "1-7", tasks: [
        "Open the DAAD portal, select India and read the exact deadline — apply only if it still fits (decide by 10 Oct; skipping is the default)",
        "Lock the exam plan: dMAT + IELTS only — no GATE, GRE parked until the 15 Jan decision",
        "Choose the IELTS sitting (first half of November is ideal) and check Goethe A1 evening/weekend batches (code GDW4D26 valid to 14 Oct)",
        "Email Bennett: syllabi with contact hours, a '168 credits = 240 ECTS' letter, grading scale + pass mark, CGPA→%, medium-of-instruction letter, official transcript — and ask 2 professors for recommendation letters (only DAAD/HPI need them; cheap to do once)",
        "Send the dMAT question to g.a.s.t. (done 6 Oct — they replied that eligibility is APS India's call) and run the APS requirements quiz"
      ], resources: ["daad-scholarship", "dmat-faq", "ielts-idp", "aps-dmat"],
      dailyPlan: [
        { d: 1, morning: "Open DAAD portal → select India → note the exact deadline; email DAAD New Delhi", daytime: "Emails: 2 professors (LORs) + Bennett registrar (syllabi, CGPA→% rule, grading scale + pass mark, 168 = 240 ECTS letter, medium-of-instruction letter)", deep1: "Lock the exam plan: dMAT + IELTS only (GATE skipped, GRE parked until 15 Jan)", deep2: "Choose the IELTS sitting (Nov–Dec) and check Goethe A1 batches", deep3: "Install Anki, add the Goethe A1 deck", night: "Recap today in 2 sentences + log hours" },
        { d: 2, morning: "DW Nicos Weg A1 — episode 1", daytime: "Outline your general motivation letter in bullets (read the DAAD letter guide only if you will apply — the same story serves every program)", deep1: "IELTS full practice test, timed — this is your diagnostic", deep2: "Motivation letter draft v1 (your own words — no AI); it feeds DAAD and every program", deep3: "Anki 10 min", night: "Score the IELTS mock → update the IELTS skill level" },
        { d: 3, morning: "—", daytime: "IELTS Writing Task 1 + Task 2 practice, then Speaking (record yourself, 3 parts)", deep1: "Tabular CV — ≤3 pages, month/year dates (used by DAAD and several programs)", deep2: "German: Nicos Weg episodes 2–3", deep3: "—", night: "Rest" },
        { d: 4, morning: "—", daytime: "CATCH-UP & BUFFER — finish anything from Days 1–3", deep1: "Write down your IELTS date choice and the Goethe A1 batch decision", deep2: "Weekly review: self-rate every skill 0–6 in Skill Trackers", deep3: "—", night: "Rest" },
        { d: 5, morning: "Nicos Weg ep 4 + Anki", daytime: "IELTS Reading set (timed) in 25-min chunks", deep1: "IELTS Listening + weakest-band drill", deep2: "Motivation letter v2", deep3: "Anki", night: "Recap + log" },
        { d: 6, morning: "Nicos Weg ep 5 + Anki", daytime: "Collect APS documents: Class X/XII marksheets, passport, Aadhaar (linked mobile), semester 1–7 marksheets", deep1: "IELTS full mock #2, timed", deep2: "Review mock #2 mistakes; Writing Task 2 rewrite", deep3: "Anki", night: "Recap + log" },
        { d: 7, morning: "Nicos Weg ep 6 + Anki", daytime: "Email APS India (info@aps-india.de): can a 7-of-8-semester student sit the dMAT and file APS before graduating? Then run the APS requirements quiz", deep1: "NPTEL GenAI — Wk 1–2 + assignment review (NPTEL tracker plan)", deep2: "Email Passau the maths pre-check question (stats/ML/algorithms as 'mathematics'?)", deep3: "30-min Career OS block: start the credit-audit table", night: "Recap + log" }
      ]},
      { title: "Week 2 (8–14 Oct): APS answer, Passau pre-check, NPTEL first, Gate 0", days: "8-14", tasks: [
        "Email APS India the final-year question (info@aps-india.de, or the contact form on aps-india.de/contact-us/) — and write down what the quiz said",
        "Email Passau: do Probability & Statistics, Discrete Mathematical Structures, Statistical ML and Algorithms count as mathematics modules? (they need ≥35 ECTS; you have ~24–30)",
        "Collect the APS paperwork: Class X/XII marksheets, passport, Aadhaar with linked mobile, semester 1–7 marksheets",
        "Decide DAAD (skip by default) and book the IELTS date; the NPTEL GenAI exam on 16 Oct is this week's priority",
        "Gate 0 review on Day 14"
      ], resources: ["aps-dmat", "aps-leaflet", "ielts-idp"],
      dailyPlan: [
        { d: 8, morning: "Anki only", daytime: "LOR requests to 2 professors (short email + CV + program list) — if not sent yet", deep1: "NPTEL GenAI Wk 3–4 (NPTEL tracker)", deep2: "NPTEL GenAI: 20 MCQs + recall", deep3: "30-min Career OS block: credit audit — map each Bennett course to an area", night: "Recap + log" },
        { d: 9, morning: "Nicos Weg + Anki", daytime: "DAAD decision: if the real India deadline fits and you want it, start; otherwise note 'skipped' in Applications", deep1: "NPTEL GenAI Wk 5–6", deep2: "NPTEL GenAI quiz", deep3: "30-min Career OS block: list the APS documents you still lack", night: "Recap + log" },
        { d: 10, morning: "Nicos Weg + Anki", daytime: "Book the IELTS Academic date (computer-delivered, first half of November)", deep1: "NPTEL GenAI Wk 7–8", deep2: "NPTEL GenAI mixed quiz (timed)", deep3: "Anki", night: "Recap + log" },
        { d: 11, morning: "—", daytime: "CATCH-UP & BUFFER — finish what slipped", deep1: "Weekly review in Career OS — re-rate skills honestly", deep2: "Plan next week + check d-mat.de (Q1 2027 date) and the APS news page", deep3: "—", night: "Rest" },
        { d: 12, morning: "Anki only", daytime: "Check for the APS and Passau replies; chase Bennett if nothing arrived", deep1: "NPTEL GenAI mock 1 (timed)", deep2: "NPTEL error analysis", deep3: "30-min Career OS block: update the credit-audit table with any syllabi received", night: "Recap + log" },
        { d: 13, morning: "Anki only", daytime: "If the APS reply arrived: write the checklist in Notes and update the dMAT/APS timeline here", deep1: "NPTEL GenAI repair", deep2: "NPTEL code-tracing drills", deep3: "—", night: "Recap + log" },
        { d: 14, morning: "—", daytime: "Gate 0 (G0) — check every criterion in Milestones", deep1: "NPTEL GenAI mock 2", deep2: "Plan Phase 1 around the 25 Oct NPTEL exam (Career OS = 30 min/day until then)", deep3: "—", night: "—" }
      ]}
    ]},

    { phase: "Phase 1 — Credits, IELTS & German A1 (15 Oct – 1 Dec 2026)", range: [15, 62],
      dayTemplate: weekTemplate(
        { morning: "German: 1 Nicos Weg episode + Anki A1 (10 min)", daytime: "Work-window micro-slots (25-min Quick timer): Anki + IELTS vocabulary + 1 reading passage", deep1: "IELTS — this week's skill block (Writing / Speaking / Reading / Listening) + error log", deep2: "Application admin: credit-audit table / letters / document chase", deep3: "Light: Anki (German) + plan tomorrow — first block to cut", night: "2-sentence recap + log hours" },
        { morning: "—", daytime: "IELTS full timed mock (3h) + review", deep1: "Credit audit / letter drafting (long block)", deep2: "German long session: Nicos Weg ×3 + 1 grammar video", deep3: "—", night: "Rest" },
        BUFFER_SUNDAY,
        { 2: { deep1: "IELTS Writing Task 2, timed — self-score with the band descriptors" },
          4: { deep2: "Applications: credit audit / APS paperwork / Bennett document chase" } }
      ),
      weeks: [
      { title: "Days 15–21 (15–21 Oct): NPTEL exams first, credit audit in 30-minute slices", days: "15-21", tasks: [
        "NPTEL GenAI exam on 16 Oct, then Innovation prep for 25 Oct — Career OS gets 30 minutes a day until the 25th",
        "Chase Bennett documents on 21 Oct if nothing has arrived; write down what you received",
        "Credit-audit table (course → area → credits → syllabus) for TU Berlin, FU Berlin, Dortmund and Darmstadt, from your Bennett transcript",
        "Act on the APS reply (or follow up) and fix the dMAT and IELTS dates in your calendar"
      ], resources: ["aps-dmat", "ielts-idp", "dw-nicos"],
      dailyPlan: [
        { d: 15, morning: "Nicos Weg + Anki", daytime: "Check APS and Passau replies (10 min)", deep1: "NPTEL GenAI final 24h: light sheet review only", deep2: "—", deep3: "—", night: "Sleep early" },
        { d: 16, morning: "—", daytime: "NPTEL GenAI EXAM DAY", deep1: "Rest — no study after the exam", deep2: "—", deep3: "—", night: "Rest" },
        { d: 17, morning: "—", daytime: "NPTEL Innovation: diagnostic + weak map", deep1: "NPTEL Innovation Wk 1–2", deep2: "—", deep3: "30-min Career OS block: credit audit — area totals", night: "Rest" },
        { d: 18, morning: "—", daytime: "CATCH-UP & BUFFER — Innovation Wk 1–3 if nothing slipped", deep1: "NPTEL Innovation Wk 3", deep2: "Weekly review in Career OS", deep3: "—", night: "Rest" },
        { d: 19, morning: "Nicos Weg + Anki", daytime: "Micro-slots: Anki + IELTS vocabulary", deep1: "NPTEL Innovation Wk 4–6", deep2: "NPTEL recall + MCQs", deep3: "30-min Career OS block: Bennett documents status", night: "Recap + log" },
        { d: 20, morning: "Nicos Weg + Anki", daytime: "Micro-slots: Anki + IELTS reading passage", deep1: "NPTEL Innovation Wk 7–8", deep2: "NPTEL mixed quiz (timed)", deep3: "30-min Career OS block: IELTS 20-min listening", night: "Recap + log" },
        { d: 21, morning: "Nicos Weg + Anki", daytime: "Chase Bennett documents if not received", deep1: "NPTEL Innovation mock 1", deep2: "NPTEL error analysis", deep3: "—", night: "Recap + log" }
      ]},
      { title: "Days 22–35 (22 Oct – 4 Nov): NPTEL done, credit audit finished", days: "22-35", tasks: [
        "NPTEL Innovation exam on 25 Oct — then rest on the 26th",
        "Credit-audit table finished for the five programs with syllabus PDFs attached (use reports/bennett-credit-audit-2026-10-06.md)",
        "IELTS: full mock + weak-band plan; book the sitting if you have not",
        "German: Nicos Weg A1 units 1–6; decide on a Goethe A1 batch"
      ], resources: ["ielts-idp", "dw-nicos", "goethe-delhi-courses"],
      dailyPlan: [
        { d: 22, morning: "Nicos Weg + Anki", daytime: "Micro-slots: Anki + IELTS vocabulary", deep1: "NPTEL Innovation repair", deep2: "NPTEL easily-confused-terms drill", deep3: "—", night: "Recap + log" },
        { d: 23, morning: "Nicos Weg + Anki", daytime: "Micro-slots: Anki", deep1: "NPTEL Innovation mock 2", deep2: "NPTEL error analysis + do-not-forget sheet", deep3: "—", night: "Recap + log" },
        { d: 24, morning: "—", daytime: "NPTEL Innovation final 24h: light sheet review only", deep1: "Prep ID + route to the exam centre", deep2: "—", deep3: "—", night: "Sleep early" },
        { d: 25, morning: "—", daytime: "NPTEL INNOVATION EXAM DAY", deep1: "Rest", deep2: "—", deep3: "—", night: "Rest" },
        { d: 26, morning: "—", daytime: "Rest — nothing new", deep1: "Anki only (German)", deep2: "—", deep3: "—", night: "Rest" }
      ]},
      { title: "Days 36–49 (5–18 Nov): IELTS, letters, re-verification", days: "36-49", tasks: [
        "Sit IELTS in the first half of November if booked; otherwise 3 full mocks + writing feedback",
        "Draft motivation letter v1 (own words) and a tabular CV",
        "Re-verify each program's WS 2027/28 deadline and requirements page (15 Nov) — edit the dates in the Applications tracker",
        "Apply for the next internship before Deloitte ends on 1 Dec: SAP Labs India or another German-linked firm (check the real eligibility)"
      ], resources: ["ielts-idp", "dw-nicos", "arbeitnow"] },
      { title: "Days 50–62 (19 Nov – 1 Dec): IELTS result, A1 done, Gate 1", days: "50-62", tasks: [
        "IELTS result in hand (target 7.0, no band under 6.5) — or the retake booked for January",
        "German: Nicos Weg A1 finished and the free certificate test taken",
        "Gate 1: credit audit, APS paperwork and letter drafts done; you know the APS rule for a 7-of-8-semester student",
        "Deloitte internship ends 1 Dec — the day block opens from Day 63"
      ], resources: ["dw-nicos", "goethe-a1-practice"] }
    ]},

    { phase: "Phase 2 — Documents, A1 → A2 & dMAT readiness (2 Dec 2026 – 15 Jan 2027)", range: [63, 107],
      dayTemplate: weekTemplate(
        { morning: "German: Anki A1 + Nicos Weg", daytime: "Day block (no Deloitte): German A1 sprint (1.5h) + application documents (2h)", deep1: "Application documents: letters / credit audit / APS file", deep2: "IELTS retake prep if needed, otherwise dMAT Core drills", deep3: "Light: Anki + plan tomorrow", night: "Recap + log" },
        { morning: "—", daytime: "Goethe A1 Modellsatz / Practice Set — timed, full", deep1: "italki speaking session (1h)", deep2: "dMAT drill set (timed, NO notes)", deep3: "—", night: "Rest" },
        BUFFER_SUNDAY
      ),
      weeks: [
      { title: "Days 63–72 (2–11 Dec): A1 finish + dMAT watch", days: "63-72", tasks: [
        "Register for the Q1 2027 dMAT the day g.a.s.t. opens it (check d-mat.de weekly)",
        "Request dMAT accommodations at least 10 weeks before the test if you need them",
        "German: take the A1 certificate test; italki speaking 2×/week",
        "Letters: motivation letter v2 and two human reviews (not AI)"
      ], resources: ["dmat-faq", "dw-nicos", "italki"] },
      { title: "Days 73–92 (12–31 Dec): Semester 7 results + APS file", days: "73-92", tasks: [
        "Add the semester 7 marksheets to the APS file and follow the checklist APS gave you",
        "Book the Goethe exams you actually want (A1 paper only if Passau stays on the list; skip the A2 exam)",
        "Letters v3 per program (FU Berlin, Dortmund, Darmstadt, TU Berlin)",
        "German: timed A1 practice sets; start A2 vocabulary"
      ], resources: ["aps-leaflet", "goethe-a1-practice", "italki"] },
      { title: "Days 93–107 (1–15 Jan): A2 course, GRE decision, Gate 2", days: "93-107", tasks: [
        "Start the A2 course (Goethe New Delhi weekend batch, 9 Jan)",
        "dMAT Core drills from the official prep PDF — 3 h/week",
        "Decide GRE on 15 Jan (default: no); if yes, book Feb–Mar and add KIT/Mannheim to the list",
        "Gate 2 review on Day 107"
      ], resources: ["goethe-delhi-courses", "dmat-prep", "powerprep"] }
    ]},

    { phase: "Phase 3 — dMAT, APS & letters (16 Jan – 31 Mar 2027, final semester)", range: [108, 182],
      dayTemplate: weekTemplate(
        { morning: "German: Anki A2 + DW Deutschtrainer", daytime: "College + micro-slots: dMAT Core drill (Latin squares / figure sequences — 25-min timed, NO notes)", deep1: "dMAT Core drills + CS foundations until the dMAT → then letters and CV", deep2: "dMAT General Academic reading set (timed) / application documents", deep3: "Light: Anki + plan tomorrow — cut entirely in exam weeks", night: "Recap + log" },
        { morning: "—", daytime: "Goethe A2 class (08:00–13:30, weekend batch) — or Nicos Weg A2 if on the weekday batch", deep1: "dMAT full timed mock", deep2: "Review the mock", deep3: "—", night: "Rest" },
        { morning: "—", daytime: "Goethe A2 class (08:00–13:30) — then CATCH-UP & BUFFER", deep1: "Weekly review in Career OS", deep2: "Check d-mat.de / APS status / uni pages", deep3: "—", night: "Rest" }
      ),
      weeks: [
      { title: "Days 108–143 (16 Jan – 20 Feb): dMAT sprint + A2 course", days: "108-143", tasks: [
        "Sit the dMAT when the date is published (ideally by ~20 Feb) and forward the certificate to APS the day it arrives",
        "dMAT drills — 3 h/week, 6 h/week in the final 3 weeks (practise without notes)",
        "Follow the A2 course without skipping — it is the ADHD scaffold through the crunch",
        "GRE only if you decided yes on 15 Jan: sit it by mid-February"
      ], resources: ["dmat-prep", "goethe-delhi-courses", "aps-dmat"] },
      { title: "Days 144–162 (21 Feb – 11 Mar): APS dossier + final letters", days: "144-162", tasks: [
        "Submit or finish the APS dossier per the checklist APS gave you; keep the courier tracking number",
        "Final motivation letters and CV for every program (two human reviews)",
        "Check APS status weekly and write down the date the certificate will issue",
        "Gather the uni-assist / VPD paperwork for Passau, FU Berlin and TU Berlin"
      ], resources: ["aps-india", "uni-assist-checklist", "tum-style-guide"] },
      { title: "Days 163–182 (12–31 Mar): APS certificate, VPDs filed, Gate 3", days: "163-182", tasks: [
        "APS certificate issued, or written APS status in hand",
        "File uni-assist VPDs at least 8 weeks before the deadline (31 May deadlines → by ~5 Apr)",
        "Freeze the final list at 4–6 programs",
        "Gate 3 review on Day 182"
      ], resources: ["uni-assist-checklist"] }
    ]},

    { phase: "Phase 4 — Applications & German B1 (1 Apr – 15 Jul 2027)", range: [183, 288],
      dayTemplate: weekTemplate(
        { morning: "German: Anki B1 + DW slow news", daytime: "College (until May) → then portfolio project: deployed applied-AI/MLOps build", deep1: "Applications: one program at a time end to end (documents, portal, uni-assist)", deep2: "German B1: course / Nicos Weg B1 + one written text for tutor correction", deep3: "Light: Anki + plan tomorrow", night: "Recap + log" },
        { morning: "—", daytime: "Aptitude-test prep: CS theory mock + DS/OS/DB drills (Darmstadt exam, Göttingen test)", deep1: "German speaking practice (B1 speaking is in pairs)", deep2: "NeetCode 150 — 3 problems", deep3: "—", night: "Rest" },
        BUFFER_SUNDAY
      ),
      weeks: [
      { title: "Days 183–212 (1–30 Apr): VPDs, Göttingen, A2 course ends", days: "183-212", tasks: [
        "Göttingen 15 Apr (only if kept as a backup; it includes a 60-minute aptitude test)",
        "VPDs filed at uni-assist where needed; confirm that each application portal is open",
        "A2 course ends ~1 May — skip the A2 exam (no legal value)",
        "2 recorded mock admission interviews or aptitude-test mocks (Darmstadt, Göttingen)"
      ], resources: ["uni-assist-checklist", "tud-examples"] },
      { title: "Days 213–243 (1–31 May): Dortmund, Passau, FU Berlin + graduation", days: "213-243", tasks: [
        "Dortmund (cautious date 15 May — verify), Passau and FU Berlin on 31 May: submit one at a time",
        "HPI ~1 Jun and its scholarship ~12 May — only if you kept it",
        "Graduate from Bennett (May) — request final transcripts and the degree certificate immediately",
        "Start B1 (Goethe online live course or Nicos Weg B1 + italki) and book B1 modules (dates open ~2–2.5 months ahead)"
      ], resources: ["goethe-delhi-courses", "dw-nicos", "italki"] },
      { title: "Days 244–273 (1–30 Jun): TU Berlin + TU Darmstadt windows, internships", days: "244-273", tasks: [
        "TU Berlin opens 1 Jun (to 31 Aug) and TU Darmstadt 1 Jun–15 Jul — assemble both now",
        "Internship and Werkstudent leads: SAP Labs India (2027 batch) and German firms' India centres",
        "Portfolio project: CI + tests + deployment (Made With ML)",
        "Mid-June B1 mock exams: if every module is ≥60%, a June/July sitting is realistic"
      ], resources: ["made-with-ml", "neetcode", "goethe-b1-practice"] },
      { title: "Days 274–288 (1–15 Jul): TU Darmstadt, blocked account, Gate 4", days: "274-288", tasks: [
        "TU Darmstadt 15 Jul — the paper documents must ARRIVE by then (courier early)",
        "Submit TU Berlin as soon as it is ready (deadline 31 Aug)",
        "Blocked-account money ready (€11,904 in 2026 — check the 2027 figure)",
        "Gate 4 review on Day 288"
      ], resources: ["goethe-b1-practice", "visa-faq"] }
    ]},

    { phase: "Phase 5 — Departure (16 Jul – 20 Sep 2027)", range: [289, 355],
      dayTemplate: weekTemplate(
        { morning: "German: Anki B1 + DW news", daytime: "Logistics block — one task a day: visa / blocked account / insurance / housing / Anmeldung booking", deep1: "German B1 exam prep — timed module practice", deep2: "Werkstudent prep: NeetCode ×2 + CV + 5 LinkedIn connections", deep3: "Light: Anki + plan tomorrow", night: "Recap + log" },
        { morning: "—", daytime: "TU Darmstadt entrance-exam prep if you applied and are not exempt (logic, maths, theory, DB/architecture)", deep1: "German speaking practice", deep2: "Portfolio project polish", deep3: "—", night: "Rest" },
        BUFFER_SUNDAY
      ),
      weeks: [
      { title: "Days 289–304 (16–31 Jul): Admit → visa appointment the same week", days: "289-304", tasks: [
        "The week you get an admit: book the VFS visa appointment (appointments can't be moved earlier)",
        "Open the blocked account and buy health insurance (visa start follows insurance start)",
        "Apply to the Studierendenwerk dorm immediately; scam-check every WG-Gesucht offer",
        "Sit B1 Reading + Listening modules"
      ], resources: ["visa-faq", "daad-registering"] },
      { title: "Days 305–335 (1–31 Aug): B1 + Darmstadt exam prep + Werkstudent CV + Gate 5", days: "305-335", tasks: [
        "Sit B1 Writing + Speaking modules (₹4,700 each)",
        "TU Darmstadt entrance exam falls in the first week of September, on campus: plan travel and visa timing now",
        "Werkstudent CV (1–2 pages, tabular, English) + saved searches on LinkedIn, StepStone, Arbeitnow, GermanTechJobs",
        "Gate 5 review on Day 335"
      ], resources: ["arbeitnow", "germantechjobs", "neetcode"] },
      { title: "Days 336–355 (1–20 Sep): Fly, land, register", days: "336-355", tasks: [
        "TU Darmstadt entrance exam (~first week of September) if you applied and are not exempt",
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
    { id: "powerprep", name: "ETS POWERPREP tests 1 & 2 (+ PLUS, $44.95 each)", url: "https://www.ets.org/gre/test-takers/general-test/prepare/powerprep.html", category: "Exams — GRE", cost: "Free (2 tests)", status: "not-started", notes: "OPTIONAL: GRE is parked until the 15 Jan decision. If you add it, Test 1 cold = diagnostic. Save Test 2 for the final 3 weeks. Buy 1–2 PLUS tests." },
    { id: "gregmat", name: "GregMat+", url: "https://www.gregmat.com/", category: "Exams — GRE", cost: "$11.99/month", status: "not-started", notes: "OPTIONAL (GRE parked until 15 Jan). The most-recommended course on r/GRE (community consensus). Follow one study plan, don't hop." },
    { id: "ielts-idp", name: "IELTS Academic — IDP India booking", url: "https://ieltsidpindia.com/information/ielts-test-fee", category: "Exams — English", cost: "₹19,000", status: "not-started", notes: "Computer-delivered: results in 1–2 days. Target 7.0, no band below 6.5." },
    { id: "toefl-practice", name: "TOEFL iBT full-length practice test (2026 format)", url: "https://www.in.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-full-length-practice-test-1.pdf", category: "Exams — English", cost: "Free", status: "not-started", notes: "Only if you switch to TOEFL (₹15,729, scored 1–6 since Jan 2026)." },
    { id: "dmat-faq", name: "dMAT India FAQ (check weekly for the Q1 2027 date)", url: "https://www.d-mat.de/en/faq-graduate-students-india/", category: "Exams — dMAT", cost: "€150 test", status: "not-started", notes: "Register via g.a.s.t. the day it opens. Accommodation requests ≥10 weeks before the test." },
    { id: "dmat-prep", name: "dMAT official prep PDF (Core + General Academic)", url: "https://www.d-mat.de/wp-content/uploads/2026/09/260902_dMAT_General-Academic-Module_Preparatoy-Materials_EN.pdf", category: "Exams — dMAT", cost: "Free", status: "not-started", notes: "Plus 5 official tutorial videos and a portal demo on d-mat.de. Practise without notes — the real test allows none." },
    { id: "aps-india", name: "APS India — registration & checklist", url: "https://aps-india.de/", category: "Applications", cost: "₹18,000", status: "not-started", notes: "Courier the dossier by 31 Oct. Certificate issues only after the dMAT certificate is checked." },
    { id: "tum-sample-test", name: "TUM MSc Informatics sample written test", url: "https://www.cit.tum.de/fileadmin/w00byx/cit/Studium/Studiengaenge/Master_Informatik/sample-test_Master_application1.pdf", category: "Exams — University tests", cost: "Free", status: "not-started", notes: "2023 sample, 3 problems. Real test: 90 min, logic / maths / theory / DB-architecture-Java." },
    { id: "tud-examples", name: "TU Darmstadt entrance-exam example questions", url: "https://www.informatik.tu-darmstadt.de/media/informatik/fb20_studium/studiengaenge/sonstige_pdfs/Examples.pdf", category: "Exams — University tests", cost: "Free", status: "not-started", notes: "Dijkstra, LL(1) parsing, neural-network forward pass. Exempt with GRE V155/Q165/AWA3.5." },
    { id: "nptel-toc", name: "NPTEL Theory of Computation (Prof. Tewari, IIT Kanpur)", url: "https://nptel.ac.in/courses/106104148", category: "CS Foundations", cost: "Free", status: "not-started", notes: "8 weeks, automata → decidability. Check = weekly assignments ≥70%." },
    { id: "mit-6042", name: "MIT 6.042J Mathematics for Computer Science", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/", category: "CS Foundations", cost: "Free", status: "not-started", notes: "Discrete maths + probability (TUM test area b)." },
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
    { id: "daad-registering", name: "DAAD — registering in Germany (Anmeldung)", url: "https://www.daad.de/en/studying-in-germany/living-in-germany/registering/", category: "Logistics", cost: "Free", status: "not-started", notes: "Anmeldung within 2 weeks of moving in." },
    { id: "aps-dmat", name: "APS India — dMAT page (who needs it, timing)", url: "https://aps-india.de/dmat/", category: "Exams — dMAT", cost: "Free", status: "not-started", notes: "Exempts bachelor students who have not completed 7 semesters of a 4-year program; the APS certificate issues only after the dMAT certificate is checked. Contact: info@aps-india.de (g.a.s.t. only runs the test and sent a boilerplate reply on 6 Oct)." },
    { id: "aps-leaflet", name: "APS India application leaflet for bachelor graduates (June 2026)", url: "https://aps-india.de/wp-content/uploads/2026/06/Leaflet_BA_Graduates_English_dMAT_June2026.pdf", category: "Applications", cost: "Free", status: "not-started", notes: "Checklist: marksheets of all semesters, degree or provisional certificate (<1 year old), language certificate. For the visa only IELTS/TOEFL/Goethe count — NOT medium-of-instruction letters." }
  ],

  /* -----------------------------------------------------------------
     PROJECTS
     ----------------------------------------------------------------- */
  projects: [
    { id: "proj-dossier", name: "Germany application dossier (Winter 2027/28)", status: "in-progress", progress: 0,
      description: "Everything the universities actually score: transcript credit mapping against each program's required areas, motivation letters, tabular CV, APS certificate, uni-assist VPDs (LORs only for DAAD/HPI). Credit match against each program's required areas is the first gate — this dossier, not the CGPA, is what decides admits.",
      milestones: [
        { title: "Bennett documents received: syllabi with contact hours, 168 = 240 ECTS letter, grading scale + pass mark, CGPA→%, medium-of-instruction letter", done: false, dueWeek: 3 },
        { title: "DAAD submitted — or consciously skipped (default: skip)", done: false, dueWeek: 2 },
        { title: "APS dossier assembled and couriered once APS confirms the checklist", done: false, dueWeek: 5 },
        { title: "Credit-mapping table done for TU Berlin, FU Berlin, Dortmund, Darmstadt (+ Passau after the pre-check)", done: false, dueWeek: 7 },
        { title: "Master motivation letter reviewed by two humans", done: false, dueWeek: 9 },
        { title: "Motivation letters final for each shortlisted program", done: false, dueWeek: 26 },
        { title: "uni-assist VPDs filed (TU Berlin, FU Berlin, Passau as applicable)", done: false, dueWeek: 26 },
        { title: "All 4–6 applications submitted", done: false, dueWeek: 41 }
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
    { id: "app-daad", company: "DAAD", role: "Study Scholarship — Master's (all disciplines)", dateApplied: "", deadline: "2026-10-15", status: "planned", link: "https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50026200", notes: "OPTIONAL — skip by default. 15 Oct is the plan's working date, not confirmed: select India in the DAAD portal and apply only if the real deadline fits and you want to spend the week on it. Needs a CV (≤3 pages), a 1–3-page letter, 1 professor LOR, transcripts and English proof." },
    { id: "app-tub", company: "TU Berlin", role: "MSc Computer Science", dateApplied: "", deadline: "2027-08-31", status: "planned", link: "https://www.tu.berlin/en/eecs/academics-teaching/study-offer/masters-programs/msc-computer-science-informatik/msc-cs-in-application-admission", notes: "CORE. Open admission; no GRE; credit match: 36 CP CS foundations (12 theory, 12 computer engineering, 12 methodological) + 18 CP maths + ≥30 CP more CS; IELTS 6.5; suitability form; APS + uni-assist VPD. Window ~1 Jun–31 Aug (2026 pattern). Your theory credit hangs on Algorithms (DAA) counting as theory." },
    { id: "app-tud", company: "TU Darmstadt", role: "MSc Computer Science", dateApplied: "", deadline: "2027-07-15", status: "planned", link: "https://www.informatik.tu-darmstadt.de/studium_fb20/vor_dem_studium/bewerbung_1/bewerbung_2.en.jsp", notes: "CORE. Direct via TUCaN; paper documents must ARRIVE by 15 Jul (window 1 Jun–15 Jul). ≥60 CP core match; IELTS 7.0 / C1; a 90-minute on-campus exam in the first week of September unless GRE V155/Q165/AWA3.5 — plan the trip and visa timing." },
    { id: "app-dortmund", company: "TU Dortmund", role: "MSc Data Science", dateApplied: "", deadline: "2027-05-15", status: "planned", link: "https://statistik.tu-dortmund.de/en/studies/degrees/data-science-msc/admission/", notes: "CORE, safe. Not admission-restricted; grade ≥2.7; ≥44 CP maths/CS/statistics (≥8 CP algorithms & data structures, ≥16 CP maths); any B2 English proof; no German needed. The pages give 15 May, 15 Jun (2026/27 extension) and 15 Jul — 15 May is the cautious date; verify. NRW tuition is free today (fees discussed, nothing found as law)." },
    { id: "app-fub", company: "Freie Universität Berlin", role: "MSc Data Science", dateApplied: "", deadline: "2027-05-31", status: "planned", link: "https://www.fu-berlin.de/en/studium/studienangebot/master/data-science/index.html", notes: "CORE. English-taught, 4 semesters, free. ≥20 LP maths (≥5 linear algebra/calculus, ≥5 probability/statistics), ≥10 CS (≥5 algorithms, ≥5 a programming language). C1 English is waived for English-instruction degrees (get the Bennett letter) — APS and the visa still need IELTS. VPD via uni-assist." },
    { id: "app-passau", company: "Uni Passau", role: "MSc AI Engineering", dateApplied: "", deadline: "2027-05-31", status: "planned", link: "https://www.uni-passau.de/en/msc-ai-eng", notes: "PRE-CHECK FIRST: it needs ≥35 ECTS maths and you have ~24 (~30 with Statistical ML). Email Passau whether statistics/ML/algorithms count as maths; skip if not. Otherwise: grade ≤2.7 or top 70%, IELTS 5.5, uni-assist 1 Apr–31 May, no tuition, A1 German by the end of year 1. Small town." },
    { id: "app-goe", company: "Uni Göttingen", role: "MSc Applied Computer Science", dateApplied: "", deadline: "2027-04-15", status: "planned", link: "https://www.uni-goettingen.de/en/applied+computer+science+m.+sc./619499.html", notes: "BACKUP. C1 English (IELTS 6.5) or a ≥2-year degree taught only in English; a ~60-minute aptitude test for all international applicants; certificates must be ≤2 years old. Small city, modest job market." },
    { id: "app-hpi", company: "Hasso Plattner Institute (Uni Potsdam)", role: "MSc Computer Science / Data Engineering", dateApplied: "", deadline: "2027-06-01", status: "planned", link: "https://www.hpi.de/en/studies/before-your-studies/application.html", notes: "STRETCH (admission-restricted). No tuition, GRE not required, IELTS 6.0, deadline ~1 Jun, scholarship deadline ~12 May — third-party info only; email studinfo@hpi.de with your credit list before applying." },
    { id: "app-tuhh", company: "TUHH (Hamburg)", role: "MSc Data Science", dateApplied: "", deadline: "2027-03-01", status: "planned", link: "https://www.tuhh.de/tuhh/en/studying/before-studying/degree-courses/international-study-programs/data-science/admission-requirements", notes: "STRETCH — conditional. Window 1 Dec–1 Mar and an APS certificate is required, which may not exist by 1 Mar. 'Very good' grades (no number published), IELTS 6.5, MINTFIT test, GRE not considered. Ask your senior whether TUHH accepts proof that the APS application was submitted." }
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
    { time: "09:30–18:00", block: "WORK WINDOW → DAY BLOCK", type: "flexible", note: "Until 1 Dec: Deloitte — interruptible, ~2 real work hours scattered. Use 25-min Quick sessions for resumable tasks only: Anki (German), IELTS vocabulary and reading passages, application admin. From 2 Dec: free day block (application documents, German A1 sprint). From January: Bennett's final semester + dMAT Core micro-drills." },
    { time: "18:00–18:45", block: "Decompress / dinner prep", type: "light" },
    { time: "18:45–19:30", block: "Dinner", type: "fixed" },
    { time: "19:30–21:30", block: "DEEP WORK 1 — hardest task of the day", type: "deep", note: "Your best focus window. NPTEL exams (to 25 Oct) → IELTS prep + credit audit (Nov) → dMAT drills + CS foundations (Dec–Feb) → motivation letters (Mar) → one application at a time (Apr–Jul) → German B1 exam prep (Jun–Aug)." },
    { time: "21:30–21:45", block: "Break", type: "light" },
    { time: "21:45–23:15", block: "DEEP WORK 2 — second-hardest", type: "deep", note: "IELTS Writing/Speaking + application documents (Oct–Nov) → German A1/A2 + letters (Dec–Jan) → dMAT reading sets (Jan–Mar) → German B1 (Apr–Jul) → Werkstudent prep (Jul–Sep)." },
    { time: "23:15–23:30", block: "Break", type: "light" },
    { time: "23:30–00:15", block: "LIGHT BLOCK — Anki / flashcards / plan tomorrow", type: "light", note: "Was 'Quant Lab'. Low-load only, never new theory. This is the FIRST block to cut: dropping it moves sleep to 23:30 (6h). At minimum, cut it in the 7 days before IELTS, dMAT and B1 (and NPTEL exams)." },
    { time: "00:15–00:30", block: "Quick review + plan tomorrow", type: "light" },
    { time: "00:30", block: "Sleep (~5h to 05:30 wake)", type: "fixed", note: "Your call — kept as you set it. Research says ≤6h is inadequate for adults (AASM/Sleep Research Society) and sleep is when new vocabulary consolidates — which is exactly what German and IELTS vocabulary depend on. Chronic slippage past 00:30 should trigger a renegotiation at the next gate, not a silent further cut." }
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
      criteria: "Exam plan locked: dMAT + IELTS only (no GATE, GRE parked until 15 Jan). The APS question sent (quiz run, email to info@aps-india.de). Bennett documents requested (syllabi with contact hours, 168 = 240 ECTS letter, grading scale + pass mark, CGPA→%, medium-of-instruction letter, transcript). Passau maths pre-check sent. DAAD decided (skip by default). IELTS date chosen. FAIL ACTION: chase everything on 21 Oct; the NPTEL GenAI exam on 16 Oct takes priority over all of it." },
    { id: "g1", title: "G1 — Credits, IELTS & A1 (1 Dec 2026)", dueDay: 62, status: "pending",
      criteria: "IELTS sat (target ≥7.0 overall, no band under 6.5) or booked for early December/January. Credit-audit table done for TU Berlin, FU Berlin, Dortmund and Darmstadt (and Passau if it passed the pre-check) with syllabi attached. APS answer received and the checklist for a 7-of-8-semester student known. German: Nicos Weg A1 units 1–12, Anki on ≥80% of days. Every program page re-verified (15 Nov). FAIL ACTION: IELTS retake in January; drop any program whose credit minimum you fail; if APS needs the completed degree, switch the plan to the July–August deadlines or Summer 2028." },
    { id: "g2", title: "G2 — Documents & A2 (15 Jan 2027)", dueDay: 107, status: "pending",
      criteria: "A1 finished (certificate test); A2 course started 9 or 11 Jan. Semester 7 results in and marksheets 1–7 ready for APS. dMAT registered if g.a.s.t. has opened a date. Motivation-letter drafts for the shortlist (own words, reviewed by one human). GRE decision made (default: no). FAIL ACTION: no dMAT date by 15 Jan → keep the July–August deadlines and Summer 2028 as the fallback; add GRE only if you consciously want KIT/Mannheim." },
    { id: "g3", title: "G3 — dMAT, APS & letters (31 Mar 2027)", dueDay: 182, status: "pending",
      criteria: "dMAT sat (or its date fixed) and the certificate forwarded to APS. APS certificate issued, or APS's written status known. Final list frozen at 4–6 programs. Letters reviewed by two humans; uni-assist VPDs filed where needed (≥8 weeks before the deadline). FAIL ACTION: no APS by ~mid-April → the May deadlines (Dortmund, Passau, FU Berlin) come off; TU Darmstadt (15 Jul) and TU Berlin (31 Aug) carry the cycle; otherwise Summer 2028." },
    { id: "g4", title: "G4 — Applications in (15 Jul 2027)", dueDay: 288, status: "pending",
      criteria: "All planned applications submitted (TU Darmstadt documents arrived by 15 Jul; TU Berlin by 31 Aug at the latest). At least 1 admit, OR ≥3 decisions still pending. Blocked-account money available (€11,904 in 2026 — check the 2027 figure). B1 course running, B1 dates booked. FAIL ACTION: submit TU Berlin immediately if you have not; prepare the Summer 2028 contingency; JN Tata / K.C. Mahindra if funds fall short." },
    { id: "g5", title: "G5 — Departure-ready (31 Aug 2027)", dueDay: 335, status: "pending",
      criteria: "Visa granted. Housing: Studierendenwerk application filed or a scam-checked temporary contract. Anmeldung appointment booked for within 2 weeks of arrival. B1 modules sat (or a retake booked). TU Darmstadt exam attended or exempt, with travel and visa timing settled. Werkstudent CV + saved searches live. FAIL ACTION: ask the university about deferring the start — don't fly on hope; book a 4-week short-stay room." },
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
