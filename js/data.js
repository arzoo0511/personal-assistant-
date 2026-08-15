/* =========================================================================
   data.js — Default seed data for the Career OS dashboard.
   This is the REAL Phase 1-5 output from the career strategy engagement
   (diagnostic results, chosen strategy, 90-day roadmap, verified free
   resources). It is only used to initialize localStorage the FIRST time
   the app runs — after that, everything the user edits lives in
   localStorage and this file is never read again (see app.js `loadState`).
   ========================================================================= */

const PLAN_START_DATE = "2026-08-15";

const DEFAULT_STATE = {
  meta: {
    startDate: PLAN_START_DATE,
    createdAt: PLAN_START_DATE,
    lastUpdated: PLAN_START_DATE,
    schemaVersion: 1
  },

  /* -----------------------------------------------------------------
     STRATEGY — read-only reference, shown on Dashboard / Roadmap
     ----------------------------------------------------------------- */
  strategy: {
    primary: "AI Engineer / ML Engineer",
    secondary: "High-paying Software Engineer",
    aggressiveParallel: "Quant Research (math/Python-heavy track — not Trading or Developer, no C++)",
    option: "Fintech / AI hybrid (layer onto an AI Engineer project later, no separate curriculum)",
    deprioritized: "Quant Trading, Quant Developer — fallback: revisit via a quant-adjacent master's 2-3 years post-grad if still of interest",
    notes: "Institute (Bennett University) does not feed India's IIT-first quant-prop campus pipeline — off-campus/portfolio route required for any quant path. C++ and competitive programming are explicitly out of scope for the chosen paths."
  },

  /* -----------------------------------------------------------------
     SKILLS — the real diagnostic baseline (0-6 scale), evidence-based
     ----------------------------------------------------------------- */
  skills: [
    { id: "python", name: "Python Fundamentals", category: "Core CS", level: 1, target: 4,
      note: "Root cause: doesn't mentally simulate own code before trusting it. Recurring list/tuple mutability misconception.",
      history: [{ date: PLAN_START_DATE, level: 1, note: "Initial diagnostic (Batch 1)" }] },
    { id: "dsa", name: "DSA Fundamentals", category: "Core CS", level: 1.6, target: 4,
      note: "Stack/queue tracing solid (4/6). Recursion never independently completed. Hash-based O(1) vs O(n) reasoning weak.",
      history: [{ date: PLAN_START_DATE, level: 1.6, note: "Initial diagnostic (Batch 2)" }] },
    { id: "probstat", name: "Probability & Statistics", category: "Math / Quant", level: 1.7, target: 4,
      note: "Individual pieces often right, combination step (Bayes denominator, finishing an EV calc) keeps dropping.",
      history: [{ date: PLAN_START_DATE, level: 1.7, note: "Initial diagnostic (Batch 3)" }] },
    { id: "linalg", name: "Linear Algebra & Calculus", category: "Math / Quant", level: 3.7, target: 4.5,
      note: "Strongest 'rule-based execution' domain. Score corrected down from 5/6 after user self-disclosed 2 assisted answers.",
      history: [{ date: PLAN_START_DATE, level: 3.7, note: "Initial diagnostic (Batch 4, corrected)" }] },
    { id: "mlopt", name: "Optimization & ML Fundamentals", category: "AI", level: 4, target: 4.5,
      note: "Strong grasp of bias/variance, loss functions, train/test split. Weak on learning-rate mechanics.",
      history: [{ date: PLAN_START_DATE, level: 4, note: "Initial diagnostic (Batch 5)" }] },
    { id: "dlai", name: "Deep Learning / AI Engineering", category: "AI", level: 2, target: 4,
      note: "Weakest domain that is also the PRIMARY path's core differentiator (RAG, attention, fine-tuning vs prompting, tokens). Priority.",
      history: [{ date: PLAN_START_DATE, level: 2, note: "Initial diagnostic (Batch 6)" }] },
    { id: "sql_sys", name: "SQL & Systems / Linux", category: "Core CS", level: 1.6, target: 3.5,
      note: "Single-table GROUP BY solid; JOINs a real gap despite 'comfortable' self-report. Linux confirmed genuine 0/6.",
      history: [{ date: PLAN_START_DATE, level: 1.6, note: "Initial diagnostic (Batch 7)" }] },
    { id: "finance", name: "Finance & Markets", category: "Quant", level: 1.4, target: 2.5,
      note: "Matches self-report accurately. Low priority by design — not gated at Quant Research entry level.",
      history: [{ date: PLAN_START_DATE, level: 1.4, note: "Initial diagnostic (Batch 8)" }] },
    { id: "stochastic", name: "Stochastic Processes", category: "Quant", level: 0.5, target: 2,
      note: "Near-zero, matches self-report ('essentially unknown'). Light coverage planned (Markov chains only).",
      history: [{ date: PLAN_START_DATE, level: 0.5, note: "Initial diagnostic (Batch 9)" }] },
    { id: "mentalmath", name: "Mental Math & Quant Reasoning", category: "Quant", level: 5, target: 5.5,
      note: "Genuine standout strength — 4/5 exact, fast, no calculator. Lean into this for Quant Research interview prep.",
      history: [{ date: PLAN_START_DATE, level: 5, note: "Initial diagnostic (Batch 9)" }] }
  ],

  /* -----------------------------------------------------------------
     ROADMAP — the real 90-day plan, week by week
     ----------------------------------------------------------------- */
  roadmap: [
    { phase: "Days 1-30 — Foundation & Acceleration", range: [1, 30], weeks: [
      { title: "Week 1: Python discipline + Probability foundations + SQL fix", days: "1-7", tasks: [
        "10 LeetCode Easy problems using the trace-before-you-run protocol (pseudocode -> hand-trace 2 cases -> verify in Python Tutor -> run)",
        "Recursion remediation, TWO passes not one: factorial, sum of digits, Fibonacci, string reversal, sum of list, then a second harder set (reverse a linked list, subsets/power set) — trace call stack in Python Tutor for each. This WILL be spot-checked cold later without warning.",
        "SQLZoo JOIN tutorial, then 10 LeetCode SQL Medium problems using joins",
        "Stat 110 Lectures 1-4 (probability & counting, Bayes' rule) + Strategic Practice sets"
      ], resources: ["python-tutor", "stat110", "sqlzoo", "neetcode"],
      dailyPlan: [
        { d: 1, morning: "Read Python Tutor's interface, don't skip this", daytime: "3 LeetCode Easy — trace protocol", deep1: "Stat 110 Lecture 1 + practice", deep2: "SQLZoo JOIN tutorial, part 1", night: "Recap today in 2 sentences" },
        { d: 2, morning: "Quick arithmetic warm-up", daytime: "3 more LeetCode Easy", deep1: "Stat 110 Lecture 2 + practice", deep2: "SQLZoo JOIN tutorial part 2 + 3 SQL Medium", night: "Explain Bayes' rule out loud, no notes" },
        { d: 3, morning: "Quick arithmetic warm-up", daytime: "4 LeetCode Easy (10 done) + recursion set A: factorial, digit sum, Fibonacci", deep1: "Stat 110 Lecture 3 + practice", deep2: "4 more SQL Medium", night: "Re-trace one recursion problem cold" },
        { d: 4, morning: "Quick arithmetic warm-up", daytime: "Recursion set A finish (string reversal, sum of list) + set B start (reverse a linked list)", deep1: "Stat 110 Lecture 4 + practice", deep2: "Remaining SQL Medium (10 done)", night: "Write Bayes' theorem from memory" },
        { d: 5, morning: "Quick arithmetic warm-up", daytime: "Recursion set B finish (subsets/power set)", deep1: "Strategic Practice catch-up for Lectures 1-4", deep2: "Redo any SQL problem that felt shaky", night: "Self-quiz: trace a fresh recursive function cold" },
        { d: 6, morning: "—", daytime: "CATCH-UP & BUFFER — finish anything behind. No new material today.", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 7, morning: "—", daytime: "REVIEW — redo 2 problems cold, no notes", deep1: "Preview Week 2's NeetCode category so Monday isn't a cold start", deep2: "Weekly review in the dashboard", night: "Plan tomorrow" }
      ]},
      { title: "Week 2: DSA patterns begin + Linux from zero + ML fundamentals", days: "8-14", tasks: [
        "NeetCode 150 — Arrays & Hashing category, 15 problems, 25-30 min independent attempt before watching solution",
        "OverTheWire Bandit levels 0-15 + read 'Learning the Shell' section of The Linux Command Line",
        "Stat 110 Lectures 5-8 (conditional probability, independence, discrete RVs) + practice",
        "fast.ai Practical Deep Learning for Coders — Lessons 1-2"
      ], resources: ["neetcode", "bandit", "tlcl", "stat110", "fastai"],
      dailyPlan: [
        { d: 8, morning: "Quick arithmetic warm-up", daytime: "NeetCode Arrays & Hashing x3 (independent attempt first)", deep1: "fast.ai Lesson 1", deep2: "Bandit levels 0-3", night: "Recap fast.ai Lesson 1" },
        { d: 9, morning: "Quick arithmetic warm-up", daytime: "NeetCode Arrays & Hashing x3", deep1: "fast.ai Lesson 1 exercises", deep2: "Bandit levels 4-7", night: "Recap" },
        { d: 10, morning: "Quick arithmetic warm-up", daytime: "NeetCode Arrays & Hashing x3 (9 done)", deep1: "fast.ai Lesson 2", deep2: "Bandit levels 8-11", night: "Recap" },
        { d: 11, morning: "Quick arithmetic warm-up", daytime: "NeetCode Arrays & Hashing x3 (12 done) + Stat 110 Lecture 5", deep1: "fast.ai Lesson 2 exercises", deep2: "Bandit levels 12-15 (done)", night: "Recap" },
        { d: 12, morning: "Quick arithmetic warm-up", daytime: "NeetCode Arrays & Hashing remaining (15 done) + Stat 110 Lecture 6", deep1: "Stat 110 Lectures 7-8 + practice", deep2: "Read The Linux Command Line — Learning the Shell", night: "Self-quiz: why is a set O(1) and a list O(n)?" },
        { d: 13, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 14, morning: "—", daytime: "REVIEW — redo 2 Arrays/Hashing problems cold", deep1: "Preview Week 3's Two Pointers/Stack categories", deep2: "Weekly review in the dashboard", night: "Plan tomorrow" }
      ]},
      { title: "Week 3: DSA continues + AI project starts + quant mental math layer", days: "15-21", tasks: [
        "SPACED-REPETITION CHECKPOINT: before anything new, redo every Week 1-2 problem you got wrong or were slow on. Skipping this is how 'progress' turns out to be an illusion.",
        "NeetCode 150 — Two Pointers, Stack, Binary Search categories, 15-20 problems",
        "Start Project 1 (RAG Q&A system) — ingestion + retrieval working",
        "fast.ai Lessons 3-4 + DeepLearning.AI: LangChain for LLM Application Development — HARD RULE: you may not start the next course until the previous one's concept is actually used in Project 1's real code. Watching without applying doesn't count as progress and won't move your skill level.",
        "Daily 15-20 min timed mental math + probability brain-teasers begins"
      ], resources: ["neetcode", "fastai", "dlai-langchain"],
      dailyPlan: [
        { d: 15, morning: "SPACED-REP: redo Week 1-2 wrong answers", daytime: "NeetCode Two Pointers x4", deep1: "Project 1 — repo setup, pick document set, plan architecture", deep2: "fast.ai Lesson 3", night: "Mental math 15min (starts today)" },
        { d: 16, morning: "Mental math 15min", daytime: "NeetCode Two Pointers x4 (done) + Stack x2", deep1: "Project 1 — ingestion pipeline", deep2: "fast.ai Lesson 3 exercises", night: "Mental math / probability brainteaser" },
        { d: 17, morning: "Mental math 15min", daytime: "NeetCode Stack x3 (5 done) + Binary Search x3", deep1: "Project 1 — chunking + embeddings", deep2: "fast.ai Lesson 4", night: "Mental math" },
        { d: 18, morning: "Mental math 15min", daytime: "NeetCode Binary Search remaining + mixed review", deep1: "Project 1 — vector store wired in", deep2: "DeepLearning.AI: LangChain — then immediately use retrieval in Project 1 (apply-before-advance rule)", night: "Mental math" },
        { d: 19, morning: "Mental math 15min", daytime: "NeetCode mixed review (15-20 done)", deep1: "Project 1 — get basic retrieval working end to end", deep2: "Debug/fix whatever broke", night: "Mental math + probability brainteaser" },
        { d: 20, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 21, morning: "—", daytime: "REVIEW — redo 2 problems cold", deep1: "SPACED-REP checkpoint prep for Week 4", deep2: "Weekly review in the dashboard", night: "Plan tomorrow" }
      ]},
      { title: "Week 4: Consolidation + first project ships + cold re-test", days: "22-30", tasks: [
        "NeetCode 150 — Trees, Recursion/Backtracking",
        "DeepLearning.AI: AI Agents in LangGraph + finish + deploy Project 1 — same apply-before-advance rule as Week 3",
        "Stat 110 Lectures 9-12 (expectation, more distributions)",
        "Day 30 cold re-test: fresh Bayes problem, fresh EV problem, define variance/stationarity unaided, debug a fresh buggy loop"
      ], resources: ["neetcode", "dlai-langgraph"],
      dailyPlan: [
        { d: 22, morning: "Mental math", daytime: "NeetCode Trees x4", deep1: "Project 1 — generation wired in", deep2: "DeepLearning.AI: AI Agents in LangGraph — apply immediately after", night: "Mental math" },
        { d: 23, morning: "Mental math", daytime: "NeetCode Trees x4 (8 done) + Recursion/Backtracking x2", deep1: "Project 1 — basic manual eval", deep2: "Stat 110 Lecture 9", night: "Mental math" },
        { d: 24, morning: "Mental math", daytime: "NeetCode Recursion/Backtracking x4", deep1: "Project 1 — deploy to Streamlit/HF Spaces", deep2: "Stat 110 Lecture 10", night: "Mental math" },
        { d: 25, morning: "Mental math", daytime: "NeetCode Recursion/Backtracking remaining (done)", deep1: "Stat 110 Lecture 11 + practice", deep2: "Project 1 — polish + README", night: "Mental math" },
        { d: 26, morning: "Mental math", daytime: "Light review of everything since Day 1", deep1: "Stat 110 Lecture 12 + practice", deep2: "Project 1 — confirm it's genuinely deployed and working", night: "Mental math" },
        { d: 27, morning: "—", daytime: "CATCH-UP & BUFFER — get Project 1 actually done if it isn't", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 28, morning: "—", daytime: "Prep for the Day 30 gate — review weak spots honestly", deep1: "Light review only, no cramming new material", deep2: "Same", night: "Rest, sleep properly before the gate" },
        { d: 29, morning: "—", daytime: "One more light review pass", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 30, morning: "—", daytime: "DAY 30 GATE — cold re-test: fresh Bayes, fresh EV, variance/stationarity unaided, debug a fresh buggy loop", deep1: "Go/No-Go review against the gate criteria", deep2: "Weekly + monthly review in the dashboard", night: "—" }
      ]}
    ]},
    { phase: "Days 31-60 — Building & Applying", range: [31, 60], weeks: [
      { title: "Week 5: DSA expansion + statistics for ML + real evaluation", days: "31-37", tasks: [
        "SPACED-REPETITION CHECKPOINT: redo every problem logged wrong in Weeks 3-4 before starting new categories",
        "NeetCode 150 — Heaps/Priority Queues, Intervals, 12-15 problems",
        "Stat 110 Lectures 13-16 (continuous & joint distributions) + Khan Academy hypothesis testing / CI modules",
        "Build a golden 20-30 question eval set for Project 1 — measure retrieval quality + answer correctness systematically",
        "Start Brainstellar puzzles, Easy tier"
      ], resources: ["neetcode", "stat110", "dlai-accuracy", "brainstellar"],
      dailyPlan: [
        { d: 31, morning: "SPACED-REP: redo Week 3-4 wrong answers", daytime: "NeetCode Heaps x3", deep1: "Stat 110 Lecture 13", deep2: "Start Project 1 eval set (5 questions)", night: "Mental math + Brainstellar Easy" },
        { d: 32, morning: "Mental math", daytime: "NeetCode Heaps x3 (done) + Intervals x2", deep1: "Stat 110 Lecture 14", deep2: "Eval set (10 questions)", night: "Mental math" },
        { d: 33, morning: "Mental math", daytime: "NeetCode Intervals x4 (~12 done)", deep1: "Stat 110 Lecture 15 + Khan Academy hypothesis testing", deep2: "Eval set (15-20 questions)", night: "Mental math" },
        { d: 34, morning: "Mental math", daytime: "Khan Academy confidence intervals", deep1: "Stat 110 Lecture 16 + practice", deep2: "Run the eval set against Project 1, measure it for real", night: "Mental math" },
        { d: 35, morning: "Mental math", daytime: "Fix whatever the eval set exposed in Project 1", deep1: "Review Stat 110 Lectures 13-16", deep2: "Finish eval set (20-30 questions), document results", night: "Mental math + Brainstellar" },
        { d: 36, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 37, morning: "—", daytime: "REVIEW — redo 2 problems cold", deep1: "Preview Week 6 (system design, graphs)", deep2: "Weekly review in the dashboard", night: "Plan tomorrow" }
      ]},
      { title: "Week 6: Systems foundations + agentic behavior", days: "38-44", tasks: [
        "NeetCode 150 — Greedy, Graphs (BFS/DFS), 15 problems",
        "System Design Primer (GitHub) + Gaurav Sen YouTube — scalability, caching, load balancing, CAP theorem",
        "DeepLearning.AI: Evaluating AI Agents",
        "Turn Project 1 into a real backend: FastAPI endpoints, validation, basic auth, real DB for history, add tool-use/agent behavior"
      ], resources: ["neetcode", "sysdesign-primer", "dlai-eval-agents"],
      dailyPlan: [
        { d: 38, morning: "Mental math", daytime: "NeetCode Greedy x4", deep1: "System Design Primer — scalability basics", deep2: "DeepLearning.AI: Evaluating AI Agents — apply after", night: "Mental math" },
        { d: 39, morning: "Mental math", daytime: "NeetCode Greedy x4 (done) + Graphs BFS/DFS x3", deep1: "System Design Primer — caching, load balancing", deep2: "FastAPI — scaffold Project 1 backend endpoints", night: "Mental math" },
        { d: 40, morning: "Mental math", daytime: "NeetCode Graphs x4", deep1: "System Design Primer — CAP theorem + Gaurav Sen video", deep2: "FastAPI — request validation + basic auth", night: "Mental math" },
        { d: 41, morning: "Mental math", daytime: "NeetCode Graphs remaining (15 done)", deep1: "Real DB wired in for chat history", deep2: "Add tool-use/agent behavior to Project 1", night: "Mental math" },
        { d: 42, morning: "Mental math", daytime: "Review this week's system design topics out loud", deep1: "Debug the agent/backend integration", deep2: "Test the whole backend end to end", night: "Mental math + Brainstellar" },
        { d: 43, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 44, morning: "—", daytime: "REVIEW", deep1: "Preview Week 7 (DP, Markov chains)", deep2: "Weekly review in the dashboard", night: "Plan tomorrow" }
      ]},
      { title: "Week 7: Stochastic processes gap + interview prep starts", days: "45-51", tasks: [
        "SPACED-REPETITION CHECKPOINT: redo every problem logged wrong in Weeks 5-6",
        "NeetCode 150 — 1-D Dynamic Programming, 12 problems",
        "MIT OCW probability/random processes — Markov chain mechanics only",
        "Brainstellar moves to Medium tier",
        "5-6 STAR behavioral stories written; first timed 30-45 min mock technical interview, self-recorded"
      ], resources: ["neetcode", "mit-ocw-prob", "brainstellar"],
      dailyPlan: [
        { d: 45, morning: "SPACED-REP: redo Week 5-6 wrong answers", daytime: "NeetCode 1-D DP x3", deep1: "MIT OCW — Markov chains part 1", deep2: "Write 2 STAR stories", night: "Mental math" },
        { d: 46, morning: "Mental math", daytime: "NeetCode 1-D DP x3", deep1: "MIT OCW — Markov chains part 2", deep2: "2 more STAR stories (4 done)", night: "Mental math" },
        { d: 47, morning: "Mental math", daytime: "NeetCode 1-D DP x3 (9 done)", deep1: "Brainstellar Medium x3", deep2: "2 more STAR stories (6 done)", night: "Mental math" },
        { d: 48, morning: "Mental math", daytime: "NeetCode 1-D DP remaining (12 done)", deep1: "Brainstellar Medium x3", deep2: "Pick a fresh problem for tomorrow's mock — don't preview it", night: "Mental math" },
        { d: 49, morning: "Mental math", daytime: "Light review", deep1: "FIRST TIMED MOCK TECHNICAL INTERVIEW — 30-45min, self-recorded", deep2: "Review the recording for communication, not just correctness", night: "Mental math" },
        { d: 50, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 51, morning: "—", daytime: "REVIEW", deep1: "Preview Week 8", deep2: "Weekly review in the dashboard", night: "Plan tomorrow" }
      ]},
      { title: "Week 8: Consolidation, project ships, applications expand", days: "52-60", tasks: [
        "NeetCode 150 — 2-D Dynamic Programming + full mixed review, target ~110-120 cumulative problems",
        "Project 1 final form: evaluated, real backend, deployed, system-design-style README",
        "Expand tracked application list across AI Engineer / SWE / Quant Research targets",
        "Publish one technical post about Project 1's architecture + real eval numbers",
        "Finish and document the Kaggle entry"
      ], resources: ["neetcode"],
      dailyPlan: [
        { d: 52, morning: "Mental math", daytime: "NeetCode 2-D DP x3", deep1: "Project 1 — final eval pass", deep2: "Research 5 application targets", night: "Mental math" },
        { d: 53, morning: "Mental math", daytime: "NeetCode 2-D DP x3", deep1: "Project 1 — system-design-style README", deep2: "Apply to 2-3 targets", night: "Mental math" },
        { d: 54, morning: "Mental math", daytime: "NeetCode full mixed review x5", deep1: "Project 1 — record the demo", deep2: "Apply to 2-3 more targets", night: "Mental math" },
        { d: 55, morning: "Mental math", daytime: "NeetCode mixed review x5 (target ~110-120 cumulative)", deep1: "Write the technical post — Project 1 architecture + real eval numbers", deep2: "Publish it", night: "Mental math" },
        { d: 56, morning: "Mental math", daytime: "Finish/document the Kaggle entry", deep1: "Finish/document the Kaggle entry (cont.)", deep2: "Application follow-ups", night: "Mental math + Brainstellar" },
        { d: 57, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 58, morning: "—", daytime: "Prep for Day 60 gate — honest self-check against the criteria", deep1: "Light review only", deep2: "Same", night: "Rest" },
        { d: 59, morning: "—", daytime: "One more light pass", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 60, morning: "—", daytime: "DAY 60 GATE — check against criteria", deep1: "Go/No-Go review", deep2: "Weekly + monthly review in the dashboard", night: "—" }
      ]}
    ]},
    { phase: "Days 61-90 — Polishing & Interview Prep", range: [61, 90], weeks: [
      { title: "Week 9: DSA final gaps + first full mock cycle", days: "61-67", tasks: [
        "SPACED-REPETITION CHECKPOINT: redo every problem logged wrong in Weeks 7-8",
        "NeetCode 150 — Advanced Graphs, Tries, Bit Manipulation, Union-Find",
        "Shift to timed mixed practice (random category, 30-45 min cap)",
        "Pramp: first DSA + system design mock interviews with a live person",
        "Jane Street's official monthly puzzle (current + 2-3 archive) + Brainstellar Hard tier"
      ], resources: ["neetcode", "pramp", "janestreet-puzzles", "brainstellar"],
      dailyPlan: [
        { d: 61, morning: "SPACED-REP: redo Week 7-8 wrong answers", daytime: "NeetCode Advanced Graphs x3", deep1: "Timed mixed practice, 30-45min cap", deep2: "Jane Street's current puzzle — attempt it", night: "Mental math" },
        { d: 62, morning: "Mental math", daytime: "NeetCode Tries x3", deep1: "Timed mixed practice", deep2: "Jane Street archive puzzle", night: "Mental math" },
        { d: 63, morning: "Mental math", daytime: "NeetCode Bit Manipulation x3", deep1: "Timed mixed practice", deep2: "Brainstellar Hard x2", night: "Mental math" },
        { d: 64, morning: "Mental math", daytime: "NeetCode Union-Find x3 (done)", deep1: "PRAMP: DSA mock interview", deep2: "Debrief — what communication gaps showed up", night: "Mental math" },
        { d: 65, morning: "Mental math", daytime: "Timed mixed review", deep1: "PRAMP: system design mock interview", deep2: "Debrief", night: "Mental math + Brainstellar" },
        { d: 66, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 67, morning: "—", daytime: "REVIEW", deep1: "Preview Week 10", deep2: "Weekly review in the dashboard", night: "Plan tomorrow" }
      ]},
      { title: "Week 10: Behavioral prep + project polish + resume audit", days: "68-74", tasks: [
        "Finalize STAR stories, run a behavioral mock via Pramp",
        "Project 1: clean README, short demo recording",
        "Full resume audit — every claim must hold at 3+ under questioning",
        "DSA: re-attempt every previously logged wrong answer"
      ], resources: ["pramp"],
      dailyPlan: [
        { d: 68, morning: "Mental math", daytime: "Finalize STAR stories, say them out loud", deep1: "PRAMP: behavioral mock", deep2: "Debrief", night: "Mental math" },
        { d: 69, morning: "Mental math", daytime: "Project 1 — clean up the README fully", deep1: "Project 1 — record the demo", deep2: "Resume audit part 1: Tier 1 skill claims", night: "Mental math" },
        { d: 70, morning: "Mental math", daytime: "Resume audit part 2: projects, experience", deep1: "DSA — re-attempt logged wrong answers, batch 1", deep2: "Batch 2", night: "Mental math" },
        { d: 71, morning: "Mental math", daytime: "DSA — re-attempt wrong answers, batch 3", deep1: "Finalize the resume", deep2: "Update the dashboard's Resume/Portfolio tracker with real links", night: "Mental math" },
        { d: 72, morning: "Mental math", daytime: "Light review of everything so far", deep1: "Self-run behavioral mock #2", deep2: "Application follow-ups", night: "Mental math + Brainstellar" },
        { d: 73, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 74, morning: "—", daytime: "REVIEW", deep1: "Preview Week 11", deep2: "Weekly review in the dashboard", night: "Plan tomorrow" }
      ]},
      { title: "Week 11: Real interview loops + continued applications", days: "75-81", tasks: [
        "Maintenance-mode timed DSA review",
        "Second full Pramp mock cycle: DSA, system design, behavioral",
        "Keep applying to open postings; follow up on anything quiet 2+ weeks",
        "Cold outreach / referral asks now that there's a real project to show"
      ], resources: ["pramp"],
      dailyPlan: [
        { d: 75, morning: "Mental math", daytime: "Maintenance DSA review x3", deep1: "Handle any live interview prep the actual pipeline needs", deep2: "Apply to 2-3 more targets", night: "Mental math" },
        { d: 76, morning: "Mental math", daytime: "Maintenance DSA review x3", deep1: "PRAMP: DSA mock, cycle 2", deep2: "Debrief", night: "Mental math" },
        { d: 77, morning: "Mental math", daytime: "Maintenance DSA review x3", deep1: "PRAMP: system design mock, cycle 2", deep2: "Debrief", night: "Mental math" },
        { d: 78, morning: "Mental math", daytime: "Maintenance DSA review x3", deep1: "PRAMP: behavioral mock, cycle 2", deep2: "Debrief", night: "Mental math" },
        { d: 79, morning: "Mental math", daytime: "Follow up on anything quiet 2+ weeks", deep1: "Cold outreach — 3 messages using Project 1 as the hook", deep2: "Referral asks", night: "Mental math + Brainstellar" },
        { d: 80, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 81, morning: "—", daytime: "REVIEW", deep1: "Preview Week 12 (this is the full re-diagnostic week)", deep2: "Weekly review in the dashboard", night: "Plan tomorrow" }
      ]},
      { title: "Week 12: Full cold re-diagnostic + retrospective", days: "82-90", tasks: [
        "Complete cold re-run of the entire original 10-domain diagnostic, same rigor, no notes",
        "Compare Day 1 vs Day 90 skill matrix",
        "Retrospective: which habits still show up, is Primary/Secondary/Quant split still right",
        "Day 90 Go/No-Go gate — feeds into 6-month and 1-year direction"
      ], resources: [],
      dailyPlan: [
        { d: 82, morning: "—", daytime: "Cold re-test: Python domain (Batch 1 style, fresh problems)", deep1: "Cold re-test: DSA domain", deep2: "Cold re-test: Probability & Statistics", night: "No new material" },
        { d: 83, morning: "—", daytime: "Cold re-test: Linear Algebra & Calculus", deep1: "Cold re-test: Optimization & ML", deep2: "Cold re-test: Deep Learning / AI Engineering", night: "No new material" },
        { d: 84, morning: "—", daytime: "Cold re-test: SQL & Systems/Linux", deep1: "Cold re-test: Finance & Markets", deep2: "Cold re-test: Stochastic Processes + Mental Math", night: "No new material" },
        { d: 85, morning: "—", daytime: "Compile the Day 1 vs Day 90 skill matrix comparison", deep1: "Retrospective: which of the 3 cross-cutting habits still show up", deep2: "Retrospective: is Primary/Secondary/Quant still the right split", night: "No new material" },
        { d: 86, morning: "—", daytime: "Update every dashboard tracker with final real numbers", deep1: "DAY 90 GO/NO-GO GATE DECISION", deep2: "Draft 6-month direction notes", night: "No new material" },
        { d: 87, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", night: "Rest" },
        { d: 88, morning: "—", daytime: "Final weekly + monthly review", deep1: "Plan the next phase", deep2: "—", night: "—" },
        { d: 89, morning: "—", daytime: "Buffer", deep1: "Buffer", deep2: "Buffer", night: "—" },
        { d: 90, morning: "—", daytime: "Buffer / celebrate what's actually verifiably true, not what feels true", deep1: "—", deep2: "—", night: "—" }
      ]}
    ]}
  ],

  /* -----------------------------------------------------------------
     COURSES / RESOURCE LIBRARY — verified free as of Aug 2026
     ----------------------------------------------------------------- */
  courses: [
    { id: "python-tutor", name: "Python Tutor — Visualize Code Execution", url: "https://pythontutor.com/visualize.html", category: "Python", cost: "Free", status: "not-started", notes: "Mandatory tool: trace every problem here before trusting your code." },
    { id: "neetcode", name: "NeetCode 150", url: "https://neetcode.io/practice", category: "DSA", cost: "Free", status: "not-started", notes: "Full 150-problem list + video explanations are free." },
    { id: "stat110", name: "Harvard Stat 110 (Blitzstein)", url: "https://www.edx.org/learn/probability/harvard-university-introduction-to-probability", category: "Probability & Statistics", cost: "Free to audit", status: "not-started", notes: "Also free on YouTube; textbook free at probabilitybook.net." },
    { id: "sqlzoo", name: "SQLZoo — JOIN tutorial", url: "https://sqlzoo.net/wiki/The_JOIN_operation", category: "SQL", cost: "Free", status: "not-started", notes: "" },
    { id: "bandit", name: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit/", category: "Linux", cost: "Free", status: "not-started", notes: "Gamified, hands-on via SSH. Levels 0-15 target for Week 2." },
    { id: "tlcl", name: "The Linux Command Line (Shotts)", url: "https://linuxcommand.org/tlcl.php", category: "Linux", cost: "Free (CC-licensed)", status: "not-started", notes: "Read 'Learning the Shell' section alongside Bandit." },
    { id: "fastai", name: "fast.ai: Practical Deep Learning for Coders", url: "https://course.fast.ai/", category: "AI / Deep Learning", cost: "Free", status: "not-started", notes: "~30 hrs video, teaches needed calculus/linalg inline." },
    { id: "dlai-langchain", name: "DeepLearning.AI: LangChain for LLM Application Development", url: "https://www.deeplearning.ai/courses/langchain", category: "AI Engineering", cost: "Free", status: "not-started", notes: "" },
    { id: "dlai-langgraph", name: "DeepLearning.AI: AI Agents in LangGraph", url: "https://www.deeplearning.ai/courses/ai-agents-in-langgraph", category: "AI Engineering", cost: "Free", status: "not-started", notes: "" },
    { id: "dlai-accuracy", name: "DeepLearning.AI: Improving Accuracy of LLM Applications", url: "https://www.deeplearning.ai/short-courses/improving-accuracy-of-llm-applications/", category: "AI Engineering", cost: "Free (platform beta — verify)", status: "not-started", notes: "Free during DeepLearning.AI's platform beta at time of research — re-verify before relying on it." },
    { id: "dlai-eval-agents", name: "DeepLearning.AI: Evaluating AI Agents", url: "https://www.deeplearning.ai/courses/evaluating-ai-agents", category: "AI Engineering", cost: "Free (platform beta — verify)", status: "not-started", notes: "Same beta caveat as above." },
    { id: "sysdesign-primer", name: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer", category: "Systems", cost: "Free (CC-licensed)", status: "not-started", notes: "270k+ stars, includes Anki flashcards." },
    { id: "mit-ocw-prob", name: "MIT OCW — Probability & Random Processes", url: "https://ocw.mit.edu/", category: "Quant", cost: "Free", status: "not-started", notes: "Markov chain basics only — not a full stochastic calculus treatment." },
    { id: "brainstellar", name: "Brainstellar — Quant Interview Puzzles", url: "https://brainstellar.com/", category: "Quant", cost: "Free", status: "not-started", notes: "Organized Easy -> Deadly, by category." },
    { id: "janestreet-puzzles", name: "Jane Street Puzzles", url: "https://www.janestreet.com/puzzles/", category: "Quant", cost: "Free", status: "not-started", notes: "Official, straight from a target firm. New puzzle roughly monthly." },
    { id: "pramp", name: "Pramp (Exponent)", url: "https://www.pramp.com/", category: "Interview Prep", cost: "Free (5 credits/month)", status: "not-started", notes: "Peer mock interviews — DSA, system design, behavioral. ~1-in-5 sessions no-show; real limitation, not a reason to skip it." }
  ],

  /* -----------------------------------------------------------------
     PROJECTS
     ----------------------------------------------------------------- */
  projects: [
    { id: "proj-rag", name: "RAG Q&A System", status: "planned", progress: 0,
      description: "Retrieval-augmented Q&A system over a real document set. Evolves across all 90 days: Month 1 core RAG, Month 2 real evaluation + agent tool-use + FastAPI backend, Month 3 polish + system-design write-up. Deliberately one deep project instead of several shallow ones.",
      milestones: [
        { title: "Document ingestion + chunking + embeddings + vector store working", done: false, dueWeek: 3 },
        { title: "Generation wired in, basic manual eval, deployed (Streamlit/HF Spaces)", done: false, dueWeek: 4 },
        { title: "Golden 20-30 question eval set built, retrieval + correctness measured", done: false, dueWeek: 5 },
        { title: "FastAPI backend: real endpoints, validation, auth, DB-backed history", done: false, dueWeek: 6 },
        { title: "Agent/tool-use added (search, calculator, structured lookups)", done: false, dueWeek: 6 },
        { title: "Final polish: README, demo recording, system-design write-up", done: false, dueWeek: 10 }
      ],
      links: { repo: "", demo: "" } }
  ],

  /* -----------------------------------------------------------------
     APPLICATIONS / INTERVIEWS / COMPETITIONS — start empty, real trackers
     ----------------------------------------------------------------- */
  applications: [],
  interviews: [],
  competitions: [
    { id: "comp-kaggle-1", name: "First Kaggle competition (beginner-friendly, well-documented)", platform: "Kaggle", status: "not-started", url: "https://www.kaggle.com/competitions", notes: "Goal: finish and document end-to-end, not to win. 1-2 well-documented entries beat a long history." }
  ],

  /* -----------------------------------------------------------------
     STUDY / EXERCISE LOGS — empty, user fills daily
     ----------------------------------------------------------------- */
  studyLog: [],
  exerciseLog: [],
  pomodoroLog: [],
  dailyPlanDone: {},

  /* -----------------------------------------------------------------
     TIMETABLE — the max-availability daily template
     ----------------------------------------------------------------- */
  timetable: [
    { time: "05:30–07:30", block: "Gym", type: "fixed", note: "Non-negotiable, set by you — not up for redesign." },
    { time: "07:30–08:30", block: "Breakfast & bath", type: "fixed", note: "Non-negotiable." },
    { time: "08:30–09:30", block: "Buffer / commute — light warm-up", type: "light", note: "Mental math + quick review only. Nothing new or hard here, it's transition time." },
    { time: "09:30–18:00", block: "WORK WINDOW — flexible study between pings", type: "flexible", note: "You're logged into Teams this whole span but only doing ~2 real work hours, scattered unpredictably. Do NOT plan deep, hard-to-resume work here — it will get shredded by interruptions. Use the floating focus timer in short 25-min sessions for resumable tasks: DSA problems, course lectures/reading, applications, light review. Roughly 6+ hours of real study time hides inside this window if you actually use the gaps instead of doom-scrolling between pings." },
    { time: "18:00–18:45", block: "Decompress / dinner prep", type: "light" },
    { time: "18:45–19:30", block: "Dinner", type: "fixed" },
    { time: "19:30–21:30", block: "DEEP WORK BLOCK 1 — hardest task of the day", type: "deep", note: "Uninterrupted, your best focus window. This is where Math/Probability, hard DSA, or real project-building goes — not the work window." },
    { time: "21:30–21:45", block: "Break", type: "light" },
    { time: "21:45–23:15", block: "DEEP WORK BLOCK 2 — project / AI engineering", type: "deep" },
    { time: "23:15–23:30", block: "Quick review + mental math + plan tomorrow", type: "light" },
    { time: "23:30", block: "Sleep (~6h) — flag if this bedtime is wrong, wake time is the only anchor you gave me", type: "fixed" }
  ],

  /* -----------------------------------------------------------------
     REVIEWS — weekly/monthly entries, start empty
     ----------------------------------------------------------------- */
  reviews: { weekly: [], monthly: [] },

  /* -----------------------------------------------------------------
     MILESTONES — the real gates from the plan
     ----------------------------------------------------------------- */
  milestones: [
    { id: "m30", title: "Day 30 Go/No-Go Gate", dueDay: 30, status: "pending",
      criteria: "Cold re-test shows real movement on Python (traces/debugs unaided) and Probability (finishes a Bayes/EV problem unprompted). NeetCode progress >= 40 problems. RAG project deployed and functional." },
    { id: "m60", title: "Day 60 Go/No-Go Gate", dueDay: 60, status: "pending",
      criteria: "~110-120 DSA problems logged with genuine independent-attempt-first discipline. Project 1 is a deployed, evaluated, backend-real system. At least one real mock technical interview completed and reviewed for communication. Stochastic processes moved off near-zero." },
    { id: "m90", title: "Day 90 Go/No-Go Gate", dueDay: 90, status: "pending",
      criteria: "Re-tested skill matrix shows real, verifiable movement across Tier 1 domains. Project 1 is genuinely resume-ready. At least 2 full mock interview cycles completed. Applications active in a real pipeline." }
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
      { skill: "Git/GitHub", claimedLevel: "Comfortable", verifiedLevel: null, defensible: null, note: "Untested by the diagnostic." }
    ],
    portfolioLinks: []
  },

  achievements: [
    { id: "a1", date: PLAN_START_DATE, title: "Diagnostic complete", description: "Finished the full 10-domain skill diagnostic — the real baseline this whole plan is built on." }
  ],

  settings: { theme: "light" }
};

/* Deep clone helper so the DEFAULT_STATE object is never mutated in place */
function getFreshDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
