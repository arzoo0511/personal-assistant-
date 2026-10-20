/* Joveo + NPTEL content tables (calendar v2, 20 Oct): NPTEL exam Sun 25 Oct is the top priority until then, Wed 21 Oct is a day off,
   the GD programme starts Mon 26 Oct. Sources: research files 00, 00b, 07, 08, 09, 10 in research_notes/A1 sprint 2026.
   The GD (then 3 personal interviews) date is NOT announced yet, so everything is built for "could be called any day". */
var CONTENT = (typeof CONTENT !== "undefined") ? CONTENT : {};

/* ---- NPTEL Innovation, Business Models & Entrepreneurship — exam Sun 25 Oct. A = 08:45 block, M = 14:30 block, B1 = 18:00 block. ---- */
CONTENT.nptel = {
"2026-10-20": {
  A:  { t: "NPTEL · recall pass Wk 1–6 + 20-MCQ diagnostic", d: "70 min: skim your notes for Wk 1–6 (types and schools of innovation, steps of innovation management, divergent vs convergent thinking, design thinking, experimentation/prototyping, business model and entrepreneur types, Blue Ocean I & II, marketing of innovation, technology forecasting, sustainability innovation). Then 20 MCQs to find your weak weeks — write the weak ones on a sticky note. (Weekly sheets: file 13 §E · MCQs: §F.)" },
  M:  { t: "NPTEL · Wk 7–8 first pass", d: "75 min: Wk 7–8 — management of innovation, IPR I & II (types, patents, copyrights, patents in India); business models and value proposition, business-model failure (reasons and remedies), incubators (business vs technology), managing investors, future markets and innovation needs for India. Definitions + one example each. Use the Wk 7–8 sheets in research file 13 §E." },
  B1: { t: "NPTEL · timed mixed quiz Wk 1–8 + error list", d: "60 min: 40 MCQs (5 per week from file 13 §F) timed in 45 min, then 15 min error analysis — one line per wrong item. Log the score in the Career OS NPTEL tracker." }
},
"2026-10-22": {
  A:  { t: "NPTEL · FULL MOCK 1 (timed)", d: "70 min, timed, no peeking: Mock set 1 (file 13 §G). Score it straight away with the key and list every wrong item’s concept." },
  M:  { t: "NPTEL · error analysis + reteach worst topics", d: "75 min: 45 min analysis (why was each wrong item wrong?), 30 min reteach the 3 worst topics from scratch." },
  B1: { t: "NPTEL · easily-confused terms + assignment re-solve", d: "60 min: confusable-terms drill (types of innovation, schools of innovation, Blue Ocean I vs II, patents vs copyrights vs trademarks vs designs, incubator types, investor types) then re-solve the weekly assignments for your 2 weakest weeks." }
},
"2026-10-23": {
  A:  { t: "NPTEL · reteach your weakest weeks", d: "70 min: take the 2 weakest weeks from Mock 1 and rebuild them as one-page sheets (definitions, frameworks, a mini-example each)." },
  M:  { t: "NPTEL · FULL MOCK 2 (timed)", d: "75 min, timed: Mock set 2 (file 13 §G). Compare the score with Mock 1 — it should climb." },
  B1: { t: "NPTEL · error analysis + DO-NOT-FORGET sheet", d: "60 min: analyse Mock 2 errors, then write the one-page DO-NOT-FORGET sheet (the ~40 facts you still confuse). Start from the 45-fact DO-NOT-FORGET page in file 13 §D. Print or photograph it — it is your last-24-hours material." }
},
"2026-10-24": { sat: { t: "NPTEL · final pass (light, 90 min)", d: "DO-NOT-FORGET sheet + Wk 7–8 traps + 20 easy MCQs for confidence — nothing new. Optional 30-min speed drill on Mock set 3 (file 13 §G) only if you feel fresh. LOGISTICS (30 min) for tomorrow — AFTERNOON session: report 13:00, seats 13:40, login 13:50, exam 14:00–17:00, gate closes 14:30, you cannot leave before 15:30. Centre: iON Digital Zone iDZ 2, Mathura Road (A-27 Mohan Co-op Industrial Estate, near Sarita Vihar Metro), New Delhi. Tonight: PRINT the hall ticket on A4 (laser/colour); original photo ID (College ID/Aadhaar/Passport/PAN/Driving licence); your own pen/pencil; transparent water bottle; professional attire — NO shorts; no watch, phone, wallet or bag inside the hall (leave them outside at your own risk); no food. Plan the route in Maps with a 90-minute buffer, aim to arrive by 12:30. Practise 5 min on the on-screen scientific calculator (link in this card). Early night — lights out 23:30.", m: 105 } }
};

/* ---- Group Discussion programme (file 09 §4.4), Block A (08:45, 70 min). D1 starts Mon 26 Oct (NPTEL first). ---- */
CONTENT.gd = {
"2026-10-26": { t: "GD D1 · Baseline + set-up", d: "Read file 09 §1.1–1.6 and the §5 checklist (30 min). Set up camera, mic and light. Record 3 impromptu 60-second answers (openers for T1 AI-jobs, T6 AI bias, T21 H-1B fee). Solo 12-min mock on T1: 4 turns × 30 s + a 20-s close, recorded. Fill the scorecard (§4.3): turns, longest turn, fillers = your baseline. If you haven’t yet, message Career Services for GD logistics (platform, group size, camera rule, topic type, date) — questions in file 09 §0." },
"2026-10-27": { t: "GD D2 · Structure: PREL and FAB", d: "Learn the frameworks (§2.1) + cards T2 (AI and freshers) and T13 (youth unemployment). Drill: 10 mini-turns × 30 s using PREL on T2, T13, T14, T12, T3 — record and count seconds. Live: AI-simulator round on T13 (prompt in §4.2). Fix: cut every turn to 30 s." },
"2026-10-28": { t: "GD D3 · Openers + Joveo’s own words", d: "Read joveo.com home + about-us (20 min). Cards T6, T7 (AI interviewers — your home turf, you build voice agents), T8. Write and speak 8 openers (30 s each) for T6–T12 and T35 with FAB. Live: AI-simulator on T7. Fix: openers under 25 s. TODAY also: message 4–6 people for Saturday’s peer GD mock." },
"2026-10-29": { t: "GD D4 · Listening, building, bridging", d: "Phrases 7–17 (§2.2); cards T1, T4, T5. Shadow drill: watch a recorded campus/B-school GD (8–10 min, see §4.6) and pause every 60 s to summarise the last speaker in one sentence, then add one building point aloud. AI-simulator on T1: start 3 of your turns with ‘Building on [name]…’. Fix: use 3+ names." },
"2026-10-30": { t: "Joveo · 2 diagnosis cases + guesstimate G1", d: "Two timed diagnosis cases (file 10 §6.4: ‘applications dropped 30% week-on-week’, ‘CPA rose from 150 to 220’), then guesstimate G1 (§6.8). Score each 1–5 on structure / quant / so-what; note the top fix." },
"2026-10-31": { t: "GD D5 · PEER MOCK #1 (virtual)", d: "4–6 people on Meet/Zoom, one timekeeper-evaluator with the scorecard (§4.3). 15 min warm-up (45-s intros), 20-min GD on T2 or T6, 20 min feedback. Compare peer scores with your own; fix the top peer feedback item.", m: 90 },
"2026-11-01": { t: "GD D6 · Light", d: "15–20 min: skim cards T21–T24 (read the data aloud once) and say 5 openers aloud. Nothing new." },
"2026-11-02": { t: "GD D7 · Difficult people + de-escalation", d: "§2.3 scripts (phrases 26–32, 52–55). Role-play 5 scenarios × 3 min (dominator, silent, off-topic, aggressive, duel) with a friend or AI — scripted, then unscripted. AI-simulator on T8 with the persona set. Fix: calm, slower voice under pressure." },
"2026-11-03": { t: "GD D8 · Abstract topics + case #1", d: "§2.4 abstract + case rows; cards T31 (fast or right), T32 (build like an artist), T38, T39. 6 abstract prompts × 90 s (fast or right? zero vs one? data = new oil? customer always right? artist or engineer? red vs blue?). Case-GD #1: mini-cases 1–2 from §2.5 (partners / new initiative), 15 min solo with SOCDR aloud. Fix: always end with a recommendation + a metric." },
"2026-11-04": { t: "GD D9 · Case #2 + current-affairs refresh", d: "Re-check the live facts (10 min): PLFS latest, H-1B fee status, EU AI Act date, a layoffs tracker — update your cards. Cards T21, T22, T25, T26. Mini-cases 3, 4, 5 (§2.5), 6 min each. AI-simulator on T21. Fix: one source + one year per number. TODAY also: invite 6–8 people for Saturday’s dress-rehearsal GD." },
"2026-11-05": { t: "GD D10 · Virtual craft", d: "§1.6: check Zoom/Teams/Meet shortcuts, set a clean display name. On a call with a friend practise hand-raise + verbal cue, the 1-second lag wait, collision recovery (‘please go ahead — I’ll follow’) and looking at the lens. 20-min recorded mock with 2–3 friends on T6 or T10 including a deliberate audio drop and rejoin. Fix: audio quality and lag etiquette." },
"2026-11-06": { t: "GD D11 · Hinglish → English, pace, fillers", d: "§1.7; read 20 phrases from §2.2 aloud 3×. ‘Hindi-think, English-speak’: 6 prompts — 3 bullets in Hindi on paper (60 s), speak them in English (60 s), record, then re-record with half the fillers. 5 × 20-s closing summaries. AI-simulator on T27 (remote vs on-site). Fix: replace one filler with a pause." },
"2026-11-07": { t: "GD D12 · PEER MOCK #2 — dress rehearsal (6–8 people)", d: "Run the full pre-flight checklist (§5). 15 min one-line openers; 20-min GD on a surprise topic chosen by the timekeeper; camera on; evaluator sheet; 20 min feedback. Compare with D5; fix the single biggest gap.", m: 90 },
"2026-11-09": { t: "GD D13–14 · Final rehearsal + taper", d: "Skim all cards, recite the 12 safe numbers, the five Joveo values; opener ×3 (T1, T6, T21) + mid-summary ×2; one 15-min AI-simulator round on an unseen topic, recorded; check logistics (power, hotspot, background, light). Nothing new. After today: 20 min/day maintenance (one random topic card, 2 openers, 1 AI round) until the GD." }
};

/* ---- Joveo business-track deep block M (75 min, 14:30), Phase 1 (26 Oct–9 Nov) — file 10 §10.3 + §4.2 ---- */
CONTENT.jM = {
"2026-10-26": { t: "Weekly review + Joveo teardown research (D1)", d: "20 min: weekly review (scores, fixes, next week). 55 min: public-info research for the teardown — joveo.com/about-us, press page, the ‘bid management’ and ‘maturity model’ blogs, all three JDs. Draw the marketplace on one page: employers/agencies ↔ Joveo’s engine ↔ publishers/job boards ↔ job seekers. Hypotheses stay hypotheses." },
"2026-10-27": { t: "Teardown draft v0 (D1)", d: "75 min: write the 1-page teardown — (a) marketplace diagram, (b) funnel and the 4-3-2-1 idea (4 clicks → 3 applies → 2 shortlists → 1 hire), (c) 3 hypotheses on supply quality / under-pacing, (d) one New-Initiatives idea with metric, pilot size and kill criteria, (e) 3 questions public info can’t answer. Details: file 10 §4.2 D1." },
"2026-10-28": { t: "Case method + metric tree", d: "45 min: Victor Cheng’s FREE program (≈6 h total, sign-up needed) — first modules. 30 min: from a blank page retrieve the metric tree (file 10 §6.2: spend → clicks → applies → shortlists → hires; CPC, CPA, apply rate, hire rate, fill rate, publisher quality) and do 3 diagnosis drills (§6.4)." },
"2026-10-29": { t: "Story bank (D2) + your commitment answer", d: "60 min: list 10 candidate episodes (Deloitte AI-intern work — check what the NDA lets you share, projects, 2 papers, GSSoC mentoring, Univest); pick 8; Card 1 = Nova (your shipped AI voice agent) — Joveo’s own AI Interviewer (launched Mar 2026) is a voice product, so ‘I build AI voice agents’ is your signature story; Card 2 = Facebook Link Analysis (say where it stands). Fill cards 1–4 (file 10 §7.1: situation, task, action, result with a number, Joveo value tag, 90-s and 3-min versions). 15 min: write your TRUE answer to the commitment question (‘will you join full-time?’, file 10 §5) and rehearse it calmly." },
"2026-10-30": { t: "10 questions for interviewers + 8-week intern plan (D3, D6)", d: "30 min: 10 sharp questions in 3 tiers (file 10 §4.5). 45 min: a one-page 8-week plan for your top role — first two weeks, first deliverable, the metric you’d move." },
"2026-11-02": { t: "Weekly review + 2 new-initiative cases", d: "20 min review. Then two timed cases (file 10 §6.6): ‘pilot an AI interview agent in India BPO hiring’ and ‘find one new niche supply channel’ — this one mirrors the New Initiatives JD line ‘help identify new and niche supply channels’." },
"2026-11-03": { t: "MOCK PI-1 (observed, 40 min + 10 debrief)", d: "Needs a human on camera (senior, placement cell, a friend who has done cases) — if they can only do evenings, swap this with the 18:00 block. Resume + Deloitte/projects deep-dive, motivation (‘why Joveo, why this role’), five-year question. Debrief with the 8-point scorecard (file 10 §10.4). No human? Claude as interviewer with a no-hints rule — weaker, because being watched changes performance." },
"2026-11-04": { t: "Publisher scorecard + partner mini-evaluations (D5)", d: "1-page rubric (weights, thresholds) for onboarding a publisher/job board; evaluate 2–3 public boards from public facts only; each ends with go/no-go and ‘the decision this would change’. Mirrors the Supply JD: launches, performance, anomalies, escalations." },
"2026-11-05": { t: "AI-agent concept spec (D7)", d: "75 min: make it a VOICE agent (you already build them): 1-page spec for an ‘Underpacing Diagnoser’ or ‘Supply Partner Copilot’ that answers aloud — “which publishers are under-pacing today?” — inputs, tools, what it may do alone vs needs a human, guardrails, success metric; optional 40–80-line demo on synthetic data. Maps to the Supply JD ‘AI experiments’ and the New Initiatives JD ‘AI-led projects’." },
"2026-11-06": { t: "2 GTM cases + quant speed test", d: "Two timed go-to-market cases (file 10 §6.6) — market, entry wedge, first 90 days, metric, risks; then a 25-min quant speed test (percentages, ratios, CAGR, break-even — file 10 §6.9). Score yourself 1–5." },
"2026-11-09": { t: "2 mixed cases (no notes) + fix your top 3 weaknesses", d: "One diagnosis + one partner-evaluation case, notes closed. Then read your scorecards from all mocks so far; pick the 3 recurring faults and drill each once. From here the plan holds you at ready-state until the GD/PI dates arrive." }
};

/* ---- Saturday Deep 1 (09:30) after the GD peer mocks ---- */
CONTENT.jSat = {
"2026-11-14": { t: "FULL SIMULATION — 3 PI rounds, compressed", d: "30 + 30 + 20 min with 5-min breaks, with an interviewer who has not seen you. PI-1 resume/motivation, PI-2 case + guesstimate + quant, PI-3 founder-mindset/commitment/compensation. 15-min debrief; fix the top 3.", m: 110 },
"2026-11-21": { t: "Peer GD mock #3 (refresh)", d: "6+ people, surprise topic from the Rapid-fire map (file 09 §3.7), camera on, evaluator sheet, 20 min feedback. Refresh the live facts first (PLFS, H-1B, EU AI Act).", m: 90 },
"2026-11-28": { t: "Mock · PI-3 style (founder mindset, failure, commitment, pay)", d: "Someone who is not a close friend if possible. Your commitment answer must sound the same as it did in October. 10-min debrief.", m: 80 },
"2026-12-12": { t: "FULL SIMULATION #2 — 3 PI rounds, compressed", d: "30 + 30 + 20 min with an unfamiliar interviewer (or the GD if it has been announced). Compare the scorecards with 14 Nov.", m: 110 },
"2026-12-19": { t: "Joveo status check + open mock", d: "Read your last two scorecards; one open mock on whatever is weakest; write a 10-line ‘what changed since October’ note.", m: 70 },
"2026-12-26": { t: "Joveo · final mock + retro", d: "One last full-length mock (your choice of PI-1/2/3), then a retro: what improved since 26 Oct, what still wobbles, what you’ll keep doing in January if you are still in the process.", m: 90 }
};

/* ---- Phase 2 weekday rotations (10 Nov onwards) ---- */
CONTENT.caseSets = [
  "diagnosis — ‘spend is flat but applications fell 25%’ and ‘a top publisher’s cost-per-apply doubled’",
  "partner evaluation — ‘should we onboard Partner X?’ (quality, volume, price, fraud risk, integration cost) × 2 different publishers",
  "new initiative / GTM — ‘pilot an AI scheduling or AI interviewer product in a new market’ and ‘enter the gig-staffing segment’",
  "pricing and product sense — ‘move a client from CPC to CPA’ and ‘what one feature would you add to the supply dashboard?’"
];
CONTENT.piMon = [
  "Record 2 stories (90 s each) from your bank; replay at 1.5× and cut fillers.",
  "Record ‘Tell me about yourself’ (90 s) and ‘Why Joveo, why this role?’ (60 s); compare with your teardown.",
  "Record the commitment answer (‘Will you join full-time?’) and one failure story; listen for consistency."
];
CONTENT.piWed = [
  "10 resume deep-dive questions on one project (every library, DB and metric you list — file 10 §2.1) + 5 quant.",
  "PI-3 question set aloud (file 10 §2.3: ownership, speed, ambiguity, failure, pay) + 5 quant.",
  "5 guesstimates (file 10 §6.8) timed 4 min each."
];
CONTENT.piFri = [
  "AI mock interviewer, 30 min, strict no-hints (PI-1 style), + 15 min debrief with the scorecard.",
  "AI mock interviewer, 30 min (case), + 15 min debrief.",
  "Peer mock (30 min) if you can get someone; else AI mock (PI-3 style)."
];

/* ---- Light Joveo slots ---- */
CONTENT.l0 = {
  1: "Read: Joveo’s ‘bid management in job advertising’ blog (joveo.com/blog/bid-management-job-advertising/) — write 3 bullets: what is bid, pacing, floor. Then 3 glossary terms (file 08 §7.3).",
  2: "Re-read the three JDs (file 00b). Underline the verbs; write which 2 you can prove with a story. Learn 3 glossary terms.",
  3: "Read: Joveo’s ‘programmatic job advertising maturity model’ blog (joveo.com/blog/programmatic-job-advertising-maturity-model/) — name the 5 stages in your own words. Competitors: skim Appcast / Recruitics / PandoLogic one-liners (file 08 §4).",
  4: "Read Joveo’s press page titles (joveo.com/press/): AI Interviewer, AI Scheduling, AI Talent Campaigns, OpenAI Ads, ChatGPT job discovery. Write one ‘so what for supply?’ line per product.",
  5: "Read: Joveo’s ‘Indeed single-source feed policy’ blog (joveo.com/blog/indeed-single-source-feed-policy/) — what changed on 31 Mar 2026 and what it means for Strategic Partnerships – Supply. Then 10 min of recruiting/AI-hiring news for fresh GD facts."
};
CONTENT.l1 = {
  1: "Quant 15 min (percentages / ratios — file 10 §6.9) · recite 2 stories aloud 10 min (timer) · formulas from memory 10 min (CPC, CPA, apply rate, hire rate, cost-per-hire).",
  2: "Quant 15 min (averages / CAGR) · recite 2 different stories 10 min · metric-tree retrieval from a blank page 10 min.",
  3: "Quant 15 min (break-even, profit) · recite 2 stories 10 min · formulas 10 min.",
  4: "Quant 15 min (mixed speed set) · recite 2 stories 10 min · say the 60-second ‘what Joveo does’ pitch (file 08 §7) twice.",
  5: "Quant 15 min · recite 2 stories 10 min · rehearse the commitment answer once, calmly, aloud."
};
CONTENT.l2 = "Flash questions (15 min, aloud): 5 Joveo facts · 3 metric definitions · the commitment answer · one ‘why this role’ line for each of the three roles.";
CONTENT.nptelL1 = "NPTEL retrieval (35 min, silent): 25 MCQs from the weeks you’re weakest in, then cover-and-recall the DO-NOT-FORGET sheet. No new material.";
CONTENT.nptelL2 = "NPTEL flash recall (15 min): types of innovation · Blue Ocean tools · IPR types · incubator types — say each aloud, then check.";
CONTENT.gdMin = "GD minimum (10 min, aloud): say 3 openers (T1, T6, T21) and one 20-second closing summary. NPTEL has priority until Sunday; the full GD programme starts Mon 26 Oct.";

/* Logistics nudges attached to specific days (appended to the 15:45 slot) */
CONTENT.nudges = {
  "2026-10-22": "Logistics: your hall ticket is confirmed (Sun 25 Oct, afternoon, iON Digital Zone Sarita Vihar) — print it on A4 today so it is not a last-night job. Book 3 trial German tutor lessons for next week (LS-A) — quality over price.",
  "2026-10-28": "Logistics: line up 4–6 people for Saturday 31 Oct’s peer GD mock; find a human for the 3 Nov PI-1 mock.",
  "2026-10-30": "Logistics: BOOK the Goethe A1 exam today (8 or 9 Dec, goethe.de/ins/in, passport + card; booking closes 20 Nov 22:00 IST).",
  "2026-11-03": "Logistics: find a different interviewer for the 14 Nov full simulation; invite 6–8 people for Saturday’s dress-rehearsal GD (7 Nov).",
  "2026-11-13": "Logistics: buy the third-party mock test book (‘Fit fürs Goethe-Zertifikat A1’, ₹310) if you want it for 21 Nov.",
  "2026-11-16": "Logistics: 20 Nov is the last booking day for the exam — confirm you have a booking confirmation email.",
  "2026-12-01": "Today: last Deloitte day — ask your manager for an internship certificate and a recommendation letter before you log off."
};
