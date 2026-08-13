/* =========================================================================
   data.js — Default seed data for the Career OS dashboard.
   This is the REAL Phase 1-5 output from the career strategy engagement
   (diagnostic results, chosen strategy, 90-day roadmap, verified free
   resources). It is only used to initialize localStorage the FIRST time
   the app runs — after that, everything the user edits lives in
   localStorage and this file is never read again (see app.js `loadState`).
   ========================================================================= */

const PLAN_START_DATE = "2026-08-12";

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
        "Recursion remediation: factorial, sum of digits, Fibonacci, string reversal, sum of list — trace call stack in Python Tutor for each",
        "SQLZoo JOIN tutorial, then 10 LeetCode SQL Medium problems using joins",
        "Stat 110 Lectures 1-4 (probability & counting, Bayes' rule) + Strategic Practice sets"
      ], resources: ["python-tutor", "stat110", "sqlzoo", "neetcode"] },
      { title: "Week 2: DSA patterns begin + Linux from zero + ML fundamentals", days: "8-14", tasks: [
        "NeetCode 150 — Arrays & Hashing category, 15 problems, 25-30 min independent attempt before watching solution",
        "OverTheWire Bandit levels 0-15 + read 'Learning the Shell' section of The Linux Command Line",
        "Stat 110 Lectures 5-8 (conditional probability, independence, discrete RVs) + practice",
        "fast.ai Practical Deep Learning for Coders — Lessons 1-2"
      ], resources: ["neetcode", "bandit", "tlcl", "stat110", "fastai"] },
      { title: "Week 3: DSA continues + AI project starts + quant mental math layer", days: "15-21", tasks: [
        "NeetCode 150 — Two Pointers, Stack, Binary Search categories, 15-20 problems",
        "Start Project 1 (RAG Q&A system) — ingestion + retrieval working",
        "fast.ai Lessons 3-4 + DeepLearning.AI: LangChain for LLM Application Development",
        "Daily 15-20 min timed mental math + probability brain-teasers begins"
      ], resources: ["neetcode", "fastai", "dlai-langchain"] },
      { title: "Week 4: Consolidation + first project ships + cold re-test", days: "22-30", tasks: [
        "NeetCode 150 — Trees, Recursion/Backtracking",
        "DeepLearning.AI: AI Agents in LangGraph + finish + deploy Project 1",
        "Stat 110 Lectures 9-12 (expectation, more distributions)",
        "Day 30 cold re-test: fresh Bayes problem, fresh EV problem, define variance/stationarity unaided, debug a fresh buggy loop"
      ], resources: ["neetcode", "dlai-langgraph"] }
    ]},
    { phase: "Days 31-60 — Building & Applying", range: [31, 60], weeks: [
      { title: "Week 5: DSA expansion + statistics for ML + real evaluation", days: "31-37", tasks: [
        "NeetCode 150 — Heaps/Priority Queues, Intervals, 12-15 problems",
        "Stat 110 Lectures 13-16 (continuous & joint distributions) + Khan Academy hypothesis testing / CI modules",
        "Build a golden 20-30 question eval set for Project 1 — measure retrieval quality + answer correctness systematically",
        "Start Brainstellar puzzles, Easy tier"
      ], resources: ["neetcode", "stat110", "dlai-accuracy", "brainstellar"] },
      { title: "Week 6: Systems foundations + agentic behavior", days: "38-44", tasks: [
        "NeetCode 150 — Greedy, Graphs (BFS/DFS), 15 problems",
        "System Design Primer (GitHub) + Gaurav Sen YouTube — scalability, caching, load balancing, CAP theorem",
        "DeepLearning.AI: Evaluating AI Agents",
        "Turn Project 1 into a real backend: FastAPI endpoints, validation, basic auth, real DB for history, add tool-use/agent behavior"
      ], resources: ["neetcode", "sysdesign-primer", "dlai-eval-agents"] },
      { title: "Week 7: Stochastic processes gap + interview prep starts", days: "45-51", tasks: [
        "NeetCode 150 — 1-D Dynamic Programming, 12 problems",
        "MIT OCW probability/random processes — Markov chain mechanics only",
        "Brainstellar moves to Medium tier",
        "5-6 STAR behavioral stories written; first timed 30-45 min mock technical interview, self-recorded"
      ], resources: ["neetcode", "mit-ocw-prob", "brainstellar"] },
      { title: "Week 8: Consolidation, project ships, applications expand", days: "52-60", tasks: [
        "NeetCode 150 — 2-D Dynamic Programming + full mixed review, target ~110-120 cumulative problems",
        "Project 1 final form: evaluated, real backend, deployed, system-design-style README",
        "Expand tracked application list across AI Engineer / SWE / Quant Research targets",
        "Publish one technical post about Project 1's architecture + real eval numbers",
        "Finish and document the Kaggle entry"
      ], resources: ["neetcode"] }
    ]},
    { phase: "Days 61-90 — Polishing & Interview Prep", range: [61, 90], weeks: [
      { title: "Week 9: DSA final gaps + first full mock cycle", days: "61-67", tasks: [
        "NeetCode 150 — Advanced Graphs, Tries, Bit Manipulation, Union-Find",
        "Shift to timed mixed practice (random category, 30-45 min cap)",
        "Pramp: first DSA + system design mock interviews with a live person",
        "Jane Street's official monthly puzzle (current + 2-3 archive) + Brainstellar Hard tier"
      ], resources: ["neetcode", "pramp", "janestreet-puzzles", "brainstellar"] },
      { title: "Week 10: Behavioral prep + project polish + resume audit", days: "68-74", tasks: [
        "Finalize STAR stories, run a behavioral mock via Pramp",
        "Project 1: clean README, short demo recording",
        "Full resume audit — every claim must hold at 3+ under questioning",
        "DSA: re-attempt every previously logged wrong answer"
      ], resources: ["pramp"] },
      { title: "Week 11: Real interview loops + continued applications", days: "75-81", tasks: [
        "Maintenance-mode timed DSA review",
        "Second full Pramp mock cycle: DSA, system design, behavioral",
        "Keep applying to open postings; follow up on anything quiet 2+ weeks",
        "Cold outreach / referral asks now that there's a real project to show"
      ], resources: ["pramp"] },
      { title: "Week 12: Full cold re-diagnostic + retrospective", days: "82-90", tasks: [
        "Complete cold re-run of the entire original 10-domain diagnostic, same rigor, no notes",
        "Compare Day 1 vs Day 90 skill matrix",
        "Retrospective: which habits still show up, is Primary/Secondary/Quant split still right",
        "Day 90 Go/No-Go gate — feeds into 6-month and 1-year direction"
      ], resources: [] }
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

  /* -----------------------------------------------------------------
     TIMETABLE — the max-availability daily template
     ----------------------------------------------------------------- */
  timetable: [
    { time: "05:30–06:45", block: "Wake, exercise" },
    { time: "06:45–07:30", block: "Breakfast / buffer" },
    { time: "07:30–09:30", block: "Deep work 1 — Math (Probability/Stats, rotating Linear Algebra/Calculus)" },
    { time: "09:45–11:45", block: "Deep work 2 — DSA / coding practice" },
    { time: "11:45–12:30", block: "Lunch" },
    { time: "12:30–14:30", block: "Work / internship" },
    { time: "14:45–16:45", block: "Deep work 3 — AI Engineering project build" },
    { time: "17:15–18:30", block: "Light study — SQL / Linux / DL theory rotation" },
    { time: "18:30–19:15", block: "Dinner" },
    { time: "19:15–20:15", block: "Interview prep / mock problems" },
    { time: "20:15–21:00", block: "Mental math & quant-puzzle drilling" },
    { time: "21:00–21:45", block: "Applications / networking / daily review" },
    { time: "23:30", block: "Sleep (6h)" }
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

  settings: { theme: "system" }
};

/* Deep clone helper so the DEFAULT_STATE object is never mutated in place */
function getFreshDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
