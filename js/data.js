/* =========================================================================
   data.js — Default seed data for the Career OS dashboard.
   This is the REAL output of an ongoing career strategy engagement. It is
   only used to initialize localStorage the FIRST time the app runs — after
   that, everything the user edits lives in localStorage and this file is
   never read again except for the version-gated content migration in
   app.js's loadState()/migrateContent().

   PIVOT LOG: on 2026-08-30 (Day 16 of the original 90-day plan) the user
   pivoted from an AI-Engineer-primary strategy to Quant/Algorithmic-Trading-
   primary, driven by a warm-but-unconfirmed introduction to a friend-of-
   sister's quant trading startup and a hard external deadline of Dec 1,
   2026 (Deloitte internship end date). This required a CONTENT_VERSION bump
   in app.js (2 -> 3) that also does a one-time reset of the user's plan
   start date to the day this update is first loaded — a deliberate restart,
   not the normal pattern for routine content edits. See js/app.js's
   migrateContent() for exactly what that migration does and does not touch.
   ========================================================================= */

const PLAN_START_DATE = "2026-08-30";

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
    primary: "Quant / Algorithmic Trading — research & strategy track (probability, time-series/stochastic modeling, backtesting methodology, Python/pandas). NOT the C++/HFT-infrastructure track — that stays explicitly excluded.",
    secondary: "AI Engineer/ML Engineer & Software Engineer — a real hedge, not dropped. DSA and Python fundamentals are kept in full because they're shared infrastructure with the quant track anyway. The RAG project is cut to a minimal stub (no backend, no agent tool-use, no deployment) — enough to defensibly discuss RAG basics in an AI-Eng interview, not pursued as a differentiator.",
    aggressiveParallel: "None as a separate track. Deploying a validated strategy to Alpaca paper trading is a stretch bonus layered onto the Primary track once a strategy is real (Week 9+), not a third curriculum competing for the same hours.",
    option: "Fintech / trading-adjacent tech roles (market-data platforms, trading-software vendors) — a natural bridge if neither a pure quant shop nor a pure AI-Eng/SWE role lands. Draws on both tracks as-is, no separate curriculum.",
    deprioritized: "Quant Developer / HFT infrastructure (C++, low-latency systems) — stays excluded per research: small/boutique quant shops hire on Python + probability/stats + mental math + hustle, not C++/HFT infra or pedigree. Also deprioritized: AI-Engineer differentiator depth (deep RAG/agent systems, the old DeepLearning.AI course sequence, dedicated System Design Primer study) — kept only as a minimal hedge stub; Pramp's system-design mocks alone cover the SWE hedge's needs.",
    notes: "Pivoted from AI-Engineer-primary to Quant-Trading-primary on Day 16 of the original plan (2026-08-30), driven by a warm-but-UNCONFIRMED introduction to a friend-of-sister's quant trading startup, and a hard Dec 1, 2026 deadline (Deloitte internship end date) — 94 days from the restart date, not compressed from the original plan, re-weighted using an extra evening hour (5h sleep floor vs 6h) instead. Target bar is explicitly 'credible, trainable-junior working knowledge' — built and validated at least one backtested strategy, knows lookahead bias/survivorship bias/overfitting cold — NOT mastery, which research confirmed isn't reachable from this baseline in this window; don't let this quietly reinflate later. Because the opportunity is unconfirmed, the curriculum builds general, transferable quant-trading credibility usable for other small/boutique shops too, not a bet on one contact. Bennett University still doesn't feed the IIT-first quant-prop pipeline — off-campus/portfolio route required, unchanged from before. Sleep floor is 5 hours (talked down from an initial 4-hour proposal — 4h was assessed as actively counterproductive given already-disclosed ADHD; this is a hard floor with zero slack, not a target to erode further)."
  },

  /* -----------------------------------------------------------------
     SKILLS — evidence-based, 0-6 scale. Baselines are the original
     diagnostic (2026-08-15); targets revised for the quant-primary pivot.
     ----------------------------------------------------------------- */
  skills: [
    { id: "python", name: "Python Fundamentals", category: "Core CS", level: 1, target: 4.5,
      note: "Now the single toolkit both tracks depend on daily (pandas/numpy backtesting code, not just occasional scripting) — needs more fluency than the old AI-Eng plan required, not less.",
      history: [{ date: "2026-08-15", level: 1, note: "Initial diagnostic (Batch 1)" }] },
    { id: "dsa", name: "DSA Fundamentals", category: "Core CS", level: 1.6, target: 3.5,
      note: "Hedge-only now. Enough for a junior SWE screen, not chasing deep pattern mastery — NeetCode volume target drops from 110-120 to ~80-85 cumulative.",
      history: [{ date: "2026-08-15", level: 1.6, note: "Initial diagnostic (Batch 2)" }] },
    { id: "probstat", name: "Probability & Statistics", category: "Math / Quant", level: 1.7, target: 4.5,
      note: "Now genuinely central, not incidental — price-process modeling, hypothesis-testing intuition for backtest validity, Bayesian reasoning about signals. Raised despite the pivot because it's load-bearing for the primary track.",
      history: [{ date: "2026-08-15", level: 1.7, note: "Initial diagnostic (Batch 3)" }] },
    { id: "linalg", name: "Linear Algebra & Calculus", category: "Math / Quant", level: 3.7, target: 4.5,
      note: "Maintained mostly through applied use in strategy code (covariance, portfolio-optimization intuition), not dedicated study time.",
      history: [{ date: "2026-08-15", level: 3.7, note: "Initial diagnostic (Batch 4, corrected)" }] },
    { id: "mlopt", name: "Optimization & ML Fundamentals", category: "AI", level: 4, target: 4.5,
      note: "Bias-variance/overfitting concepts transfer almost for free to 'why is my backtest lying to me' — real synergy with the primary track, no extra dedicated time needed.",
      history: [{ date: "2026-08-15", level: 4, note: "Initial diagnostic (Batch 5)" }] },
    { id: "dlai", name: "Deep Learning / AI Engineering", category: "AI", level: 2, target: 2.5,
      note: "No longer the differentiator — RAG project cut to a stub. Target reflects 'won't embarrass yourself if asked about RAG/tokens/embeddings,' not depth.",
      history: [{ date: "2026-08-15", level: 2, note: "Initial diagnostic (Batch 6)" }] },
    { id: "sql_sys", name: "SQL & Systems / Linux", category: "Core CS", level: 1.6, target: 3,
      note: "Hedge maintained (SQLZoo, Bandit) but System Design Primer depth is cut, slightly lowering the realistic ceiling.",
      history: [{ date: "2026-08-15", level: 1.6, note: "Initial diagnostic (Batch 7)" }] },
    { id: "finance", name: "Finance & Markets", category: "Quant", level: 1.4, target: 4,
      note: "Was explicitly deprioritized before ('not gated at Quant Research entry'). Now actively taught through GT CS7646 (market mechanics, EMH, CAPM) — needs to be a real number, not a token one.",
      history: [{ date: "2026-08-15", level: 1.4, note: "Initial diagnostic (Batch 8)" }] },
    { id: "stochastic", name: "Stochastic Processes", category: "Quant", level: 0.5, target: 3,
      note: "4/6 = 'can explain and simulate a random walk, codes the Markov property from real transition-probability data, distinguishes mean-reversion from random-walk price behavior and can test for it empirically.' Deliberately NOT claiming stochastic calculus (Brownian motion/Itô/SDEs) — that needs measure-theory prerequisites this plan isn't building, and chasing it would cannibalize probability/backtesting time for worse ROI against the actual bar.",
      history: [{ date: "2026-08-15", level: 0.5, note: "Initial diagnostic (Batch 9)" }] },
    { id: "mentalmath", name: "Mental Math & Quant Reasoning", category: "Quant", level: 5, target: 5.5,
      note: "Already near-ceiling and a genuine strength — protect, don't rebuild. Daily 10-15 min maintenance only, zero dedicated study time.",
      history: [{ date: "2026-08-15", level: 5, note: "Initial diagnostic (Batch 9)" }] },
    { id: "algo_trading", name: "Algorithmic Trading / Backtesting", category: "Quant", level: 0, target: 4,
      note: "New track, zero baseline. 4/6 = 'credible working knowledge': has independently built 2+ backtested strategies, applied walk-forward validation, can point to a specific lookahead-bias fix in their own code, understands transaction-cost impact on results. NOT claiming production-grade deployment or multi-asset-class breadth — that's a 5-6, explicitly out of scope for this window.",
      history: [{ date: PLAN_START_DATE, level: 0, note: "New skill added at the quant-primary pivot" }] },
    { id: "microstructure", name: "Market Microstructure & Trading Vocabulary", category: "Quant", level: 0.3, target: 4,
      note: "Operationalizes the stated success bar directly: 4/6 = can define and correctly use, unprompted, to an interviewer: bid-ask spread, market/limit/stop orders, slippage, liquidity, lookahead bias, survivorship bias, overfitting, walk-forward validation, Sharpe ratio, max drawdown, alpha, beta, mean reversion, random walk, Markov property. Distinct from Finance & Markets (broader/macro) — this is the cold-recall vocabulary layer specifically.",
      history: [{ date: PLAN_START_DATE, level: 0.3, note: "New skill added at the quant-primary pivot" }] }
  ],

  /* -----------------------------------------------------------------
     ROADMAP — 94 days to Dec 1, 2026 (Day 1 = restart date). Same proven
     pattern throughout: 5 active days + 1 no-new-material buffer day +
     1 review day per week.
     ----------------------------------------------------------------- */
  roadmap: [
    { phase: "Days 1-28 — Quant Onboarding + Foundations Continue", range: [1, 28], weeks: [
      { title: "Week 1: DSA/Probability continue + Quant onboarding begins", days: "1-7", tasks: [
        "NeetCode 150 — Two Pointers, Stack, Binary Search, ~12 problems",
        "Create a QuantConnect account and complete its own Boot Camp tutorial — run a first template backtest end to end",
        "Stat 110 lectures continue from wherever you actually left off + MIT OCW Markov-chain intro (moved up specifically because it's now load-bearing, not an afterthought)",
        "Daily quant-vocabulary flashcards begin (bid-ask spread, market/limit/stop order, slippage, liquidity, lookahead bias, survivorship bias, overfitting, Sharpe ratio, max drawdown, mean reversion) + mental math + Brainstellar Easy begin"
      ], resources: ["neetcode", "quantconnect", "stat110", "mit-ocw-prob", "brainstellar"],
      dailyPlan: [
        { d: 1, morning: "Create QuantConnect account; quick Python Tutor refresher", daytime: "NeetCode Two Pointers x3", deep1: "Stat 110 — next lecture + practice", deep2: "QuantConnect Boot Camp, part 1", deep3: "—", night: "Vocab flashcards, set 1 (5 terms) + recap today in 2 sentences" },
        { d: 2, morning: "Vocab flashcards review", daytime: "NeetCode Two Pointers x3 (6 done)", deep1: "Stat 110 — next lecture + practice", deep2: "QuantConnect Boot Camp, part 2 — run first template backtest end to end", deep3: "—", night: "Mental math 15min (starts today)" },
        { d: 3, morning: "Vocab + mental math", daytime: "NeetCode Stack x3", deep1: "Stat 110 — next lecture + practice", deep2: "MIT OCW — Markov chains, intro (transition probabilities)", deep3: "—", night: "Mental math" },
        { d: 4, morning: "Vocab + mental math", daytime: "NeetCode Binary Search x3", deep1: "Stat 110 — next lecture + practice", deep2: "MIT OCW — Markov chains, continued", deep3: "Skim QuantConnect docs on strategy structure (Initialize/OnData)", night: "Mental math + Brainstellar Easy" },
        { d: 5, morning: "Vocab + mental math", daytime: "NeetCode mixed review (~12 done)", deep1: "Strategic Practice catch-up on recent Stat 110 lectures", deep2: "Read 2-3 example strategies in QuantConnect's algorithm library", deep3: "Note down anything you don't understand yet — don't skip past confusion", night: "Self-quiz: explain lookahead bias in your own words, no notes" },
        { d: 6, morning: "—", daytime: "CATCH-UP & BUFFER — no new material", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 7, morning: "—", daytime: "REVIEW — cold-recall all 10 vocab terms, redo 2 NeetCode problems cold", deep1: "Preview Week 2 (GT CS7646 begins)", deep2: "Weekly review in the dashboard", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 2: Georgia Tech CS7646 begins + first trivial QuantConnect algorithm", days: "8-14", tasks: [
        "NeetCode 150 — Trees, Recursion, ~8 problems (reduced volume, hedge-only now)",
        "Georgia Tech CS7646 (free, YouTube + lucylabs.gatech.edu/ml4t) — market mechanics, reading financial data, technical-analysis intro",
        "Stat 110 continues",
        "Build a trivial 'Buy & Hold' QuantConnect algorithm end to end — this is mechanics warm-up, not a real strategy yet"
      ], resources: ["neetcode", "gt-cs7646", "stat110", "quantconnect"],
      dailyPlan: [
        { d: 8, morning: "Vocab + mental math", daytime: "NeetCode Trees x3", deep1: "GT CS7646 — reading financial data", deep2: "Stat 110 — next lecture", deep3: "—", night: "Mental math" },
        { d: 9, morning: "Vocab + mental math", daytime: "NeetCode Trees x3 (6 done)", deep1: "GT CS7646 — market mechanics", deep2: "Stat 110 — next lecture", deep3: "—", night: "Mental math" },
        { d: 10, morning: "Vocab + mental math", daytime: "NeetCode Recursion x3", deep1: "GT CS7646 — technical analysis intro", deep2: "Scaffold 'Buy & Hold' QuantConnect algorithm — Initialize() only", deep3: "—", night: "Mental math" },
        { d: 11, morning: "Vocab + mental math", daytime: "NeetCode Recursion x2 (done, ~8)", deep1: "Stat 110 continues", deep2: "Finish Buy & Hold algorithm — OnData(), run first backtest", deep3: "Read the output report — note every metric shown even if you don't understand it yet", night: "Mental math" },
        { d: 12, morning: "Vocab + mental math", daytime: "NeetCode mixed review", deep1: "Review this week's GT CS7646 material out loud", deep2: "Re-run Buy & Hold on a different asset/date range, compare", deep3: "Write down what changed and why", night: "Mental math + Brainstellar" },
        { d: 13, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 14, morning: "—", daytime: "REVIEW — cold-recall vocab, explain Buy & Hold results out loud", deep1: "Preview Week 3 (backtesting pitfalls)", deep2: "Weekly review in the dashboard", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 3: Backtesting pitfalls cold + Markov chain mini-project", days: "15-21", tasks: [
        "SPACED-REPETITION CHECKPOINT: redo every Week 1-2 problem you got wrong or were slow on",
        "NeetCode 150 — Heaps, Intervals, ~10 problems",
        "QuantStart's FREE articles (not their paid ebooks) on lookahead bias, survivorship bias, overfitting — read each and write your own one-paragraph example. This is what operationalizes 'knows the pitfalls cold,' not passive reading.",
        "MIT OCW Markov chains: transition matrices, stationary distributions — then code a 2-state Markov chain simulator on real historical price data"
      ], resources: ["neetcode", "quantstart-articles", "mit-ocw-prob"],
      dailyPlan: [
        { d: 15, morning: "SPACED-REP: redo Week 1-2 wrong answers", daytime: "NeetCode Heaps x3", deep1: "QuantStart — lookahead bias article, write your own example", deep2: "MIT OCW — transition matrices", deep3: "—", night: "Mental math" },
        { d: 16, morning: "Vocab + mental math", daytime: "NeetCode Heaps x3 (done)", deep1: "QuantStart — survivorship bias, write your own example", deep2: "MIT OCW — stationary distributions", deep3: "—", night: "Mental math" },
        { d: 17, morning: "Vocab + mental math", daytime: "NeetCode Intervals x3", deep1: "QuantStart — overfitting, write your own example", deep2: "Start coding a 2-state Markov chain simulator (up/down days) in Python", deep3: "Pull real historical price data for the simulator (QuantConnect or a free source)", night: "Mental math + Brainstellar" },
        { d: 18, morning: "Vocab + mental math", daytime: "NeetCode Intervals x3 (done, ~10)", deep1: "Estimate real transition probabilities from historical returns", deep2: "Finish the Markov simulator, validate it against real data", deep3: "Document what you found", night: "Mental math" },
        { d: 19, morning: "Vocab + mental math", daytime: "NeetCode mixed review", deep1: "Review this week's 3 pitfall articles cold — explain each out loud, no notes", deep2: "Polish the Markov chain script and write-up", deep3: "—", night: "Mental math" },
        { d: 20, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 21, morning: "—", daytime: "REVIEW — cold-explain lookahead/survivorship/overfitting to an imaginary interviewer", deep1: "Preview Week 4", deep2: "Weekly review in the dashboard", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 4: Consolidation + Gate 1", days: "22-28", tasks: [
        "NeetCode 150 — Greedy, ~6 problems",
        "Full review pass across everything covered in Phase 1 — Stat 110, GT CS7646, the Markov project, the Buy & Hold algorithm",
        "Day 28 Gate: cold-define lookahead bias/survivorship bias/overfitting, explain Sharpe ratio and max drawdown conceptually, fresh Bayes/EV problem solved unaided, QuantConnect account active with a template run end to end, NeetCode cumulative >= 25"
      ], resources: ["neetcode"],
      dailyPlan: [
        { d: 22, morning: "Vocab + mental math", daytime: "NeetCode Greedy x3", deep1: "Review Stat 110 material covered so far", deep2: "Review GT CS7646 material covered so far", deep3: "—", night: "Mental math" },
        { d: 23, morning: "Vocab + mental math", daytime: "NeetCode Greedy x3 (done)", deep1: "Re-explain the Markov chain project cold, no notes", deep2: "Re-explain the QuantConnect Buy & Hold algorithm cold", deep3: "—", night: "Mental math" },
        { d: 24, morning: "Vocab + mental math", daytime: "Light DSA review", deep1: "Full vocab cold-recall drill, all terms so far", deep2: "Fresh Bayes problem + fresh EV problem, solved cold", deep3: "—", night: "Mental math" },
        { d: 25, morning: "Vocab + mental math", daytime: "Light review", deep1: "Define Sharpe ratio and max drawdown conceptually, unaided, no notes", deep2: "Review anything flagged as shaky this month", deep3: "—", night: "Mental math" },
        { d: 26, morning: "—", daytime: "Light review only — no new material, no cramming", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 27, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest, sleep properly before the gate" },
        { d: 28, morning: "—", daytime: "GATE 1 — full review against criteria above", deep1: "Go/No-Go review", deep2: "Weekly + monthly review in the dashboard", deep3: "—", night: "—" }
      ]}
    ]},
    { phase: "Days 29-56 — Core Quant Build: First Real Strategy", range: [29, 56], weeks: [
      { title: "Week 5: Strategy 1 — SMA crossover, built and backtested", days: "29-35", tasks: [
        "NeetCode 150 — Graphs BFS/DFS, ~8 problems",
        "Build Strategy 1 (SMA crossover) on QuantConnect, run over 5+ years of real historical data",
        "Read the output (Sharpe, max drawdown, CAGR) and write your own definition of each next to your own numbers",
        "Audit your own code for at least one concrete lookahead-bias risk and fix it; add QuantConnect's transaction-cost model and compare before/after"
      ], resources: ["neetcode", "quantconnect"],
      dailyPlan: [
        { d: 29, morning: "Vocab + mental math", daytime: "NeetCode Graphs BFS x3", deep1: "QuantConnect — scaffold Strategy 1 (SMA crossover), Initialize()", deep2: "Wire up OnData(), get it running on 1 year of data", deep3: "—", night: "Mental math" },
        { d: 30, morning: "Vocab + mental math", daytime: "NeetCode Graphs DFS x3", deep1: "Extend Strategy 1 to 5+ years of data", deep2: "Run first full backtest", deep3: "—", night: "Mental math" },
        { d: 31, morning: "Vocab + mental math", daytime: "NeetCode Graphs x2 (done, ~8)", deep1: "Read the backtest report line by line", deep2: "Write your own 1-line definition of Sharpe/drawdown/CAGR next to your actual numbers", deep3: "—", night: "Mental math + Brainstellar" },
        { d: 32, morning: "Vocab + mental math", daytime: "Light DSA review", deep1: "Audit your own Strategy 1 code for lookahead bias, line by line", deep2: "Fix anything found", deep3: "—", night: "Mental math" },
        { d: 33, morning: "Vocab + mental math", daytime: "Light review", deep1: "Re-run the backtest after the fix — note how results changed", deep2: "Add QuantConnect's built-in transaction-cost/fee model", deep3: "—", night: "Mental math" },
        { d: 34, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 35, morning: "—", daytime: "REVIEW — explain Strategy 1 end to end out loud, cold", deep1: "Preview Week 6", deep2: "Weekly review in the dashboard", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 6: Strategy 1 hardening + GitHub repo starts", days: "36-42", tasks: [
        "NeetCode 150 — 1-D Dynamic Programming, ~6 problems",
        "Compare Strategy 1 with vs. without realistic transaction costs — document the gap honestly",
        "Start the GitHub repo — methodology-first README, real commit history",
        "Re-test Strategy 1 on a different asset and document how results differ"
      ], resources: ["neetcode"],
      dailyPlan: [
        { d: 36, morning: "Vocab + mental math", daytime: "NeetCode 1-D DP x3", deep1: "Re-run Strategy 1 with the fee model, compare before/after honestly", deep2: "Document the gap in a findings note", deep3: "—", night: "Mental math" },
        { d: 37, morning: "Vocab + mental math", daytime: "NeetCode 1-D DP x3 (done)", deep1: "Start GitHub repo — README skeleton", deep2: "Write the methodology section of the README", deep3: "—", night: "Mental math" },
        { d: 38, morning: "Vocab + mental math", daytime: "Light review", deep1: "Re-test Strategy 1 on a different asset", deep2: "Document how results differ", deep3: "—", night: "Mental math + Brainstellar" },
        { d: 39, morning: "Vocab + mental math", daytime: "Light review", deep1: "Clean up Strategy 1 code for readability", deep2: "Push to GitHub with real commit history", deep3: "—", night: "Mental math" },
        { d: 40, morning: "Vocab + mental math", daytime: "Light review", deep1: "Full cold-explain of Strategy 1 to an imaginary interviewer", deep2: "Note weak points in your own explanation", deep3: "—", night: "Mental math" },
        { d: 41, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 42, morning: "—", daytime: "REVIEW", deep1: "Preview Week 7 (walk-forward validation)", deep2: "Weekly review in the dashboard", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 7: Walk-forward validation + STAR stories begin", days: "43-49", tasks: [
        "NeetCode 150 — 2-D Dynamic Programming, ~9 problems",
        "Walk-forward split on Strategy 1: train on one window, test only on a held-out later window, report the test performance honestly even if it's worse",
        "5-6 STAR behavioral stories written (unchanged from the original plan's approach)",
        "Brainstellar moves to Medium tier"
      ], resources: ["neetcode", "brainstellar"],
      dailyPlan: [
        { d: 43, morning: "Vocab + mental math", daytime: "NeetCode 2-D DP x3", deep1: "Set up a walk-forward split for Strategy 1 — train window only", deep2: "Write 2 STAR stories from past projects/internship", deep3: "—", night: "Mental math" },
        { d: 44, morning: "Vocab + mental math", daytime: "NeetCode 2-D DP x3", deep1: "Run Strategy 1 on the held-out test window", deep2: "2 more STAR stories (4 done)", deep3: "—", night: "Mental math" },
        { d: 45, morning: "Vocab + mental math", daytime: "NeetCode 2-D DP x3 (done, ~9)", deep1: "Report test-window performance honestly, even if worse than train", deep2: "2 more STAR stories (6 done)", deep3: "—", night: "Mental math + Brainstellar Medium" },
        { d: 46, morning: "Vocab + mental math", daytime: "Light DSA review", deep1: "Write up the walk-forward findings — what changed test vs. train, and why", deep2: "Brainstellar Medium x3", deep3: "—", night: "Mental math" },
        { d: 47, morning: "Vocab + mental math", daytime: "Light review", deep1: "Cold-explain walk-forward validation and why it matters", deep2: "Brainstellar Medium x3", deep3: "—", night: "Mental math" },
        { d: 48, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 49, morning: "—", daytime: "REVIEW", deep1: "Preview Week 8 (Strategy 2 + Gate 2)", deep2: "Weekly review in the dashboard", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 8: Strategy 2 + comparison + Gate 2", days: "50-56", tasks: [
        "NeetCode 150 — 2-D DP finish + mixed review",
        "Build Strategy 2 (RSI/mean-reversion, single asset — deliberately not pairs trading, which needs cointegration testing that's out of scope for this window)",
        "Compute and compare Sharpe, Sortino, max drawdown, alpha, beta across both strategies",
        "Day 56 Gate: at least one independently-built, walk-forward-validated strategy with documented lookahead-bias fix; NeetCode cumulative >= 50"
      ], resources: ["neetcode"],
      dailyPlan: [
        { d: 50, morning: "Vocab + mental math", daytime: "NeetCode mixed review x4", deep1: "QuantConnect — scaffold Strategy 2 (RSI mean-reversion)", deep2: "Get Strategy 2 running on 1 year of data", deep3: "—", night: "Mental math" },
        { d: 51, morning: "Vocab + mental math", daytime: "NeetCode mixed review x4", deep1: "Extend Strategy 2 to 5+ years, run full backtest", deep2: "Apply the walk-forward split to Strategy 2 too", deep3: "—", night: "Mental math" },
        { d: 52, morning: "Vocab + mental math", daytime: "Light review", deep1: "Compute Sortino ratio and alpha/beta for both strategies", deep2: "Build a comparison table: Strategy 1 vs. Strategy 2, all metrics", deep3: "—", night: "Mental math + Brainstellar" },
        { d: 53, morning: "Vocab + mental math", daytime: "Light review", deep1: "Audit Strategy 2 for lookahead/survivorship bias", deep2: "Fix anything found, re-run", deep3: "—", night: "Mental math" },
        { d: 54, morning: "Vocab + mental math", daytime: "Light review", deep1: "Full cold-explain: which strategy is 'better' and why, using the actual numbers", deep2: "Update the GitHub repo with Strategy 2 + the comparison", deep3: "—", night: "Mental math" },
        { d: 55, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest, sleep properly before the gate" },
        { d: 56, morning: "—", daytime: "GATE 2 — full review against criteria above", deep1: "Go/No-Go review", deep2: "Weekly + monthly review in the dashboard", deep3: "—", night: "—" }
      ]}
    ]},
    { phase: "Days 57-77 — Strategy Iteration, Validation & Interview Readiness", range: [57, 77], weeks: [
      { title: "Week 9: Parameter sensitivity + Pramp resumes + Alpaca deploy", days: "57-63", tasks: [
        "NeetCode 150 — Advanced Graphs, Tries, ~6 problems",
        "Parameter-sensitivity testing on both strategies — the classic 'only works for one magic number' overfitting tell",
        "Pramp DSA + system-design mocks resume (unchanged rotation from the original plan)",
        "Alpaca paper-trading account setup, deploy Strategy 1 to paper trading; Jane Street's monthly puzzle + Brainstellar Hard tier begin"
      ], resources: ["neetcode", "pramp", "alpaca", "janestreet-puzzles", "brainstellar"],
      dailyPlan: [
        { d: 57, morning: "Vocab + mental math", daytime: "NeetCode Advanced Graphs x3", deep1: "Parameter-sensitivity test — vary Strategy 1's moving-average windows, does it still work", deep2: "Document what you find: fragile or robust?", deep3: "—", night: "Mental math" },
        { d: 58, morning: "Vocab + mental math", daytime: "NeetCode Tries x3", deep1: "Same sensitivity test on Strategy 2's RSI thresholds", deep2: "Document findings", deep3: "—", night: "Mental math" },
        { d: 59, morning: "Vocab + mental math", daytime: "Light DSA review", deep1: "PRAMP — DSA mock interview", deep2: "Debrief — what communication gaps showed up", deep3: "—", night: "Mental math + Brainstellar Hard" },
        { d: 60, morning: "Vocab + mental math", daytime: "Light review", deep1: "PRAMP — system design mock", deep2: "Debrief", deep3: "Create Alpaca paper-trading account", night: "Mental math" },
        { d: 61, morning: "Vocab + mental math", daytime: "Light review", deep1: "Deploy Strategy 1 to Alpaca paper trading", deep2: "Confirm it's actually placing simulated trades correctly", deep3: "Jane Street's current puzzle — attempt it", night: "Mental math" },
        { d: 62, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 63, morning: "—", daytime: "REVIEW", deep1: "Preview Week 10", deep2: "Weekly review in the dashboard", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 10: Cross-asset testing + first quant mock + behavioral mock", days: "64-70", tasks: [
        "DSA shifts to maintenance-mode timed review",
        "Re-run the best strategy across 2-3 different assets/periods — document where it breaks",
        "First self-run timed quant mock: explain full methodology + all pitfalls out loud, recorded",
        "Pramp behavioral mock"
      ], resources: ["pramp"],
      dailyPlan: [
        { d: 64, morning: "Vocab + mental math", daytime: "Maintenance DSA review x3", deep1: "Re-run the best strategy on a second asset", deep2: "Document results", deep3: "—", night: "Mental math" },
        { d: 65, morning: "Vocab + mental math", daytime: "Maintenance DSA review x3", deep1: "Re-run on a third asset/period", deep2: "Document where/why it breaks, if it does", deep3: "—", night: "Mental math" },
        { d: 66, morning: "Vocab + mental math", daytime: "Maintenance review", deep1: "PRAMP — behavioral mock", deep2: "Debrief", deep3: "—", night: "Mental math + Brainstellar" },
        { d: 67, morning: "Vocab + mental math", daytime: "Maintenance review", deep1: "Self-run timed quant mock — explain full methodology + all pitfalls out loud, 30min, recorded", deep2: "Review the recording honestly", deep3: "—", night: "Mental math" },
        { d: 68, morning: "Vocab + mental math", daytime: "Light review", deep1: "Fix whatever the mock exposed as weak", deep2: "Update the GitHub repo with cross-asset findings", deep3: "—", night: "Mental math" },
        { d: 69, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 70, morning: "—", daytime: "REVIEW", deep1: "Preview Week 11 (Gate 3)", deep2: "Weekly review in the dashboard", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 11: Portfolio combination + resume audit + Gate 3", days: "71-77", tasks: [
        "Combine both strategies into a simple equal-weight portfolio view + a basic position-sizing/stop-loss concept",
        "Finalize the GitHub repo README — methodology-first, honest about limitations",
        "Full resume audit — every quant claim AND every hedge (DSA/Python) claim must hold under questioning",
        "Day 77 Gate: 2 strategies compared on Sharpe/Sortino/drawdown/alpha/beta, defensible under adversarial questioning, deployed to Alpaca, real repo, applications active on both tracks"
      ], resources: [],
      dailyPlan: [
        { d: 71, morning: "Vocab + mental math", daytime: "Light DSA review", deep1: "Combine Strategy 1+2 into a simple equal-weight portfolio view", deep2: "Compute combined Sharpe/drawdown", deep3: "—", night: "Mental math" },
        { d: 72, morning: "Vocab + mental math", daytime: "Light review", deep1: "Add a basic position-sizing/stop-loss concept to the portfolio", deep2: "Re-run the portfolio with the addition", deep3: "—", night: "Mental math" },
        { d: 73, morning: "Vocab + mental math", daytime: "Light review", deep1: "Finalize the GitHub repo README — methodology-first, honest about limitations", deep2: "Resume audit part 1: every quant claim must hold under questioning", deep3: "—", night: "Mental math + Brainstellar" },
        { d: 74, morning: "Vocab + mental math", daytime: "Light review", deep1: "Resume audit part 2: AI-Eng/SWE hedge claims (DSA, Python) — must also hold", deep2: "Update the dashboard's Resume/Portfolio tracker with real links", deep3: "—", night: "Mental math" },
        { d: 75, morning: "Vocab + mental math", daytime: "Light review", deep1: "Full cold walk-through of the whole portfolio project, recorded", deep2: "Review the recording, fix weak spots", deep3: "—", night: "Mental math" },
        { d: 76, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest, sleep properly before the gate" },
        { d: 77, morning: "—", daytime: "GATE 3 — full review against criteria above", deep1: "Go/No-Go review", deep2: "Weekly + monthly review in the dashboard", deep3: "—", night: "—" }
      ]}
    ]},
    { phase: "Days 78-94 — Portfolio, Outreach & Final Gate", range: [78, 94], weeks: [
      { title: "Week 12: Outreach + broad applications", days: "78-84", tasks: [
        "Warm-intro outreach using the finished project as the hook — NOT the only bet, per the plan's own 'unconfirmed opportunity' framing",
        "Broad applications to other small/boutique quant shops in parallel",
        "Continued AI-Eng/SWE hedge applications",
        "Second full Pramp mock cycle: DSA, system design, behavioral"
      ], resources: ["pramp"],
      dailyPlan: [
        { d: 78, morning: "Vocab + mental math", daytime: "Light DSA review", deep1: "Draft the outreach message for the warm intro, the project as the hook", deep2: "Research 5 other small/boutique quant shop targets", deep3: "—", night: "Mental math" },
        { d: 79, morning: "Vocab + mental math", daytime: "Light review", deep1: "Send the warm-intro outreach", deep2: "Apply to 2-3 other quant shop targets", deep3: "—", night: "Mental math" },
        { d: 80, morning: "Vocab + mental math", daytime: "Light review", deep1: "PRAMP — DSA mock, cycle 2", deep2: "Debrief", deep3: "—", night: "Mental math + Brainstellar" },
        { d: 81, morning: "Vocab + mental math", daytime: "Light review", deep1: "PRAMP — behavioral mock, cycle 2", deep2: "Continue AI-Eng/SWE hedge applications", deep3: "—", night: "Mental math" },
        { d: 82, morning: "Vocab + mental math", daytime: "Light review", deep1: "Follow up on anything quiet 2+ weeks", deep2: "More quant-shop + AI-Eng/SWE applications", deep3: "—", night: "Mental math" },
        { d: 83, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 84, morning: "—", daytime: "REVIEW — preview the full re-diagnostic week", deep1: "Weekly review in the dashboard", deep2: "—", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 13: Full cold re-diagnostic + targeted remediation", days: "85-91", tasks: [
        "Complete cold re-run across all 10 original domains PLUS the 2 new quant skills, same rigor as the original diagnostic, no notes",
        "Compare Day 1 (2026-08-15, original) vs. today's skill matrix honestly",
        "Targeted remediation of whatever the re-diagnostic shows is weakest — not more of everything, specifically the weak points",
        "Update every dashboard tracker with real final numbers"
      ], resources: [],
      dailyPlan: [
        { d: 85, morning: "—", daytime: "Cold re-test: Python + DSA domains", deep1: "Cold re-test: Probability & Statistics", deep2: "Cold re-test: Linear Algebra & Calculus", deep3: "—", night: "No new material" },
        { d: 86, morning: "—", daytime: "Cold re-test: Optimization & ML + Deep Learning/AI Engineering", deep1: "Cold re-test: SQL & Systems/Linux", deep2: "Cold re-test: Finance & Markets", deep3: "—", night: "No new material" },
        { d: 87, morning: "—", daytime: "Cold re-test: Stochastic Processes + Mental Math", deep1: "Cold re-test: Algorithmic Trading/Backtesting — explain a strategy cold", deep2: "Cold re-test: Market Microstructure vocabulary — all terms, unprompted", deep3: "—", night: "No new material" },
        { d: 88, morning: "—", daytime: "Compile the full skill matrix comparison, honestly", deep1: "Identify the single weakest area", deep2: "Targeted remediation session on that weakest area", deep3: "—", night: "No new material" },
        { d: 89, morning: "—", daytime: "Second-weakest-area remediation", deep1: "Update every dashboard tracker with real final numbers", deep2: "Retrospective: is quant-primary still the right call, what's next regardless of outcome", deep3: "—", night: "No new material" },
        { d: 90, morning: "—", daytime: "CATCH-UP & BUFFER", deep1: "Same", deep2: "Same", deep3: "—", night: "Rest" },
        { d: 91, morning: "—", daytime: "REVIEW — final weekly + monthly review", deep1: "Preview the final days", deep2: "—", deep3: "—", night: "Plan tomorrow" }
      ]},
      { title: "Week 14: Final polish + Dec 1 gate", days: "92-94", tasks: [
        "Final resume/portfolio audit — every claim on both tracks must hold under questioning",
        "Final self-run mock: explain lookahead bias/survivorship bias/overfitting cold, walk through the portfolio project end to end, recorded",
        "Day 94 / Dec 1 FINAL GATE — full honest review, not a pass/fail performance"
      ], resources: [],
      dailyPlan: [
        { d: 92, morning: "—", daytime: "Final resume/portfolio audit — every claim holds under questioning", deep1: "Re-read your own strategy write-up cold, check every number", deep2: "Update the dashboard one last time", deep3: "—", night: "Rest" },
        { d: 93, morning: "—", daytime: "Buffer", deep1: "Final self-run mock — explain lookahead/survivorship/overfitting cold + walk through the portfolio project end to end, recorded", deep2: "Review the recording", deep3: "—", night: "Rest, sleep properly before the gate" },
        { d: 94, morning: "—", daytime: "FINAL GATE (DEC 1) — full review against criteria above", deep1: "Weekly + monthly + full-plan review in the dashboard", deep2: "Honest retrospective: what's actually, verifiably true now vs. Day 1", deep3: "—", night: "—" }
      ]}
    ]}
  ],

  /* -----------------------------------------------------------------
     COURSES / RESOURCE LIBRARY — verified free as of Aug 2026
     ----------------------------------------------------------------- */
  courses: [
    { id: "python-tutor", name: "Python Tutor — Visualize Code Execution", url: "https://pythontutor.com/visualize.html", category: "Python", cost: "Free", status: "not-started", notes: "Mandatory tool: trace every problem here before trusting your code." },
    { id: "neetcode", name: "NeetCode 150", url: "https://neetcode.io/practice", category: "DSA", cost: "Free", status: "not-started", notes: "Full 150-problem list + video explanations are free. Hedge-only now — target ~80-85 cumulative, not 110-120." },
    { id: "stat110", name: "Harvard Stat 110 (Blitzstein)", url: "https://www.edx.org/learn/probability/harvard-university-introduction-to-probability", category: "Probability & Statistics", cost: "Free to audit", status: "not-started", notes: "Also free on YouTube; textbook free at probabilitybook.net. Now load-bearing for the primary track, not just the hedge." },
    { id: "sqlzoo", name: "SQLZoo — JOIN tutorial", url: "https://sqlzoo.net/wiki/The_JOIN_operation", category: "SQL", cost: "Free", status: "not-started", notes: "" },
    { id: "bandit", name: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit/", category: "Linux", cost: "Free", status: "not-started", notes: "Gamified, hands-on via SSH." },
    { id: "tlcl", name: "The Linux Command Line (Shotts)", url: "https://linuxcommand.org/tlcl.php", category: "Linux", cost: "Free (CC-licensed)", status: "not-started", notes: "" },
    { id: "mit-ocw-prob", name: "MIT OCW — Probability & Random Processes", url: "https://ocw.mit.edu/", category: "Quant", cost: "Free", status: "not-started", notes: "Markov chain basics only — not a full stochastic calculus treatment (deliberately out of scope, see the stochastic skill note)." },
    { id: "brainstellar", name: "Brainstellar — Quant Interview Puzzles", url: "https://brainstellar.com/", category: "Quant", cost: "Free", status: "not-started", notes: "Organized Easy -> Deadly, by category." },
    { id: "janestreet-puzzles", name: "Jane Street Puzzles", url: "https://www.janestreet.com/puzzles/", category: "Quant", cost: "Free", status: "not-started", notes: "Official, straight from a target firm. New puzzle roughly monthly." },
    { id: "pramp", name: "Pramp (Exponent)", url: "https://www.pramp.com/", category: "Interview Prep", cost: "Free (5 credits/month)", status: "not-started", notes: "Peer mock interviews — DSA, system design, behavioral. ~1-in-5 sessions no-show; real limitation, not a reason to skip it." },
    { id: "quantconnect", name: "QuantConnect (Algorithm Lab + free historical data)", url: "https://www.quantconnect.com/", category: "Quant / Algo Trading", cost: "Free, no card required", status: "not-started", notes: "Primary hands-on backtesting platform — Python/C#, 400TB+ historical data, unlimited free backtesting. Boot Camp tutorial first (Week 1), real strategy building from Week 5." },
    { id: "zipline", name: "zipline-reloaded", url: "https://github.com/stefan-jansen/zipline-reloaded", category: "Quant / Algo Trading", cost: "Free / open-source", status: "not-started", notes: "Local/offline backtesting alternative — a backup if QuantConnect has an outage, not the primary platform." },
    { id: "alpaca", name: "Alpaca (paper trading API)", url: "https://alpaca.markets/learn/start-paper-trading", category: "Quant / Algo Trading", cost: "Free paper trading account", status: "not-started", notes: "Deploy a validated strategy to live-simulated execution — used from Week 9, after a strategy is real, not before." },
    { id: "gt-cs7646", name: "Georgia Tech CS7646 — Machine Learning for Trading", url: "https://lucylabs.gatech.edu/ml4t/", category: "Quant / Algo Trading", cost: "Free (full lecture set on YouTube + free materials)", status: "not-started", notes: "Core theory spine: market mechanics, CAPM/portfolio theory, technical indicators, backtesting." },
    { id: "quantstart-articles", name: "QuantStart — free articles", url: "https://www.quantstart.com/articles/", category: "Quant / Algo Trading", cost: "Free (articles only)", status: "not-started", notes: "Best free explanation of lookahead bias/survivorship bias/overfitting. Do NOT buy their ebooks ($39-79) — everything required is in the free articles." }
  ],

  /* -----------------------------------------------------------------
     PROJECTS
     ----------------------------------------------------------------- */
  projects: [
    { id: "proj-quant", name: "Quant Trading Strategy Portfolio", status: "planned", progress: 0,
      description: "The primary portfolio piece for the pivot: 2 independently-built, backtested trading strategies (SMA crossover, RSI mean-reversion) on QuantConnect, validated with walk-forward testing and honest lookahead/survivorship-bias auditing, compared on Sharpe/Sortino/drawdown/alpha/beta, at least one deployed to Alpaca paper trading, documented in a methodology-first GitHub repo. This is the actual evidence behind the 'credible working knowledge' claim — not a resume line, a real artifact.",
      milestones: [
        { title: "QuantConnect account active, Boot Camp complete, first template backtest run", done: false, dueWeek: 1 },
        { title: "Markov-chain mini-project done on real transition-probability data", done: false, dueWeek: 3 },
        { title: "Strategy 1 (SMA crossover) built, backtested 5+ years, lookahead-bias audited and fixed", done: false, dueWeek: 5 },
        { title: "Strategy 1 walk-forward validated, results reported honestly", done: false, dueWeek: 7 },
        { title: "Strategy 2 (RSI mean-reversion) built and compared against Strategy 1 on Sharpe/Sortino/drawdown/alpha/beta", done: false, dueWeek: 8 },
        { title: "Strategy deployed to Alpaca paper trading and confirmed working", done: false, dueWeek: 9 },
        { title: "GitHub repo finalized — methodology-first README, honest about limitations", done: false, dueWeek: 11 }
      ],
      links: { repo: "", demo: "" } },
    { id: "proj-rag", name: "RAG Q&A System (AI-Eng hedge stub)", status: "planned", progress: 0,
      description: "Deliberately minimized after the quant pivot — a 3-4 day stub, not a multi-week build. Enough to defensibly discuss RAG basics (retrieval, chunking, embeddings) in an AI-Eng interview. No FastAPI backend, no agent tool-use, no deployment — those were cut entirely, not deferred.",
      milestones: [
        { title: "Basic document ingestion + chunking + embeddings + retrieval working locally", done: false, dueWeek: 6 },
        { title: "Can explain the architecture and trade-offs out loud, unaided", done: false, dueWeek: 6 }
      ],
      links: { repo: "", demo: "" } }
  ],

  /* -----------------------------------------------------------------
     APPLICATIONS / INTERVIEWS / COMPETITIONS — start empty, real trackers
     ----------------------------------------------------------------- */
  applications: [],
  interviews: [],
  competitions: [
    { id: "comp-kaggle-1", name: "First Kaggle competition (beginner-friendly, well-documented)", platform: "Kaggle", status: "not-started", url: "https://www.kaggle.com/competitions", notes: "Lower priority after the pivot — only pursue if time genuinely allows after the quant portfolio work. Goal if pursued: finish and document end-to-end, not win." }
  ],

  /* -----------------------------------------------------------------
     STUDY / EXERCISE LOGS — empty, user fills daily
     ----------------------------------------------------------------- */
  studyLog: [],
  exerciseLog: [],
  pomodoroLog: [],
  dailyPlanDone: {},

  /* -----------------------------------------------------------------
     TIMETABLE — revised for a 5-hour sleep floor (talked down from an
     initial 4-hour proposal). Gym/breakfast stay non-negotiable; the
     Deloitte work window is unchanged (internship-imposed, not a choice).
     The actual trade is bedtime moving 1 hour later, not the evening
     getting compressed.
     ----------------------------------------------------------------- */
  timetable: [
    { time: "05:30–07:30", block: "Gym", type: "fixed", note: "Non-negotiable, set by you — not up for redesign." },
    { time: "07:30–08:30", block: "Breakfast & bath", type: "fixed", note: "Non-negotiable." },
    { time: "08:30–09:30", block: "Buffer / commute — light warm-up", type: "light", note: "Quant-vocabulary flashcards + quick mental math. Nothing new or hard here, it's transition time." },
    { time: "09:30–18:00", block: "WORK WINDOW — flexible study between pings", type: "flexible", note: "Deloitte internship — you're logged in this whole span but only doing ~2 real work hours, scattered unpredictably. Do NOT plan deep, hard-to-resume work here. Use the floating focus timer in short 25-min sessions for resumable tasks: DSA problems, GT CS7646/QuantStart reading, applications." },
    { time: "18:00–18:45", block: "Decompress / dinner prep", type: "light" },
    { time: "18:45–19:30", block: "Dinner", type: "fixed" },
    { time: "19:30–21:30", block: "DEEP WORK 1 — hardest task of the day", type: "deep", note: "Uninterrupted, your best focus window. Quant theory (probability, stochastic processes, backtesting concepts) most days; DSA only ~2x/week." },
    { time: "21:30–21:45", block: "Break", type: "light" },
    { time: "21:45–23:15", block: "DEEP WORK 2 — applied coding", type: "deep", note: "The quant strategy project (was the RAG project pre-pivot)." },
    { time: "23:15–23:30", block: "Break", type: "light" },
    { time: "23:30–00:15", block: "DEEP WORK 3 — Quant Lab", type: "deep", note: "New block, 45min, ring-fenced specifically for QuantConnect/backtesting hands-on execution so it never gets silently displaced by DSA or hedge content. Deliberately lower-cognitive-load than Deep Work 1 — iteration, not new theory, since it's 11:30pm." },
    { time: "00:15–00:30", block: "Quick review + mental math + plan tomorrow", type: "light" },
    { time: "00:30", block: "Sleep (~5h to 05:30 wake)", type: "fixed", note: "Hard floor, zero slack. Talked down from an initial 4-hour proposal — chronic slippage past 00:30 should trigger a schedule renegotiation at the next gate, not a silent further cut." }
  ],

  /* -----------------------------------------------------------------
     REVIEWS — weekly/monthly entries, start empty
     ----------------------------------------------------------------- */
  reviews: { weekly: [], monthly: [] },

  /* -----------------------------------------------------------------
     MILESTONES — the real gates, quant-primary, "credible working
     knowledge" bar throughout, not mastery
     ----------------------------------------------------------------- */
  milestones: [
    { id: "gate1", title: "Day 28 Gate — Phase 1 Complete", dueDay: 28, status: "pending",
      criteria: "Cold-define lookahead bias, survivorship bias, and overfitting correctly and unprompted. Explain what a Sharpe ratio and max drawdown measure, conceptually, without notes. Fresh Bayes/EV problem solved unaided. QuantConnect account active, at least one template algorithm run end to end. NeetCode cumulative >= 25 problems." },
    { id: "gate2", title: "Day 56 Gate — Phase 2 Complete", dueDay: 56, status: "pending",
      criteria: "At least one genuinely independently-built backtested strategy on QuantConnect with real multi-year results (Sharpe, drawdown, CAGR documented). Can point to a specific lookahead-bias fix made in your own code and explain why it mattered. Walk-forward validation applied at least once, with honest reporting even where test performance dropped. Markov-chain transition-probability mini-project done on real data. NeetCode cumulative >= 50." },
    { id: "gate3", title: "Day 77 Gate — Phase 3 Complete", dueDay: 77, status: "pending",
      criteria: "2 distinct backtested strategies built and compared on Sharpe/Sortino/max drawdown/alpha/beta. Can defend either strategy under adversarial questioning — what would break it, why isn't this overfit. Strategy deployed to Alpaca paper trading at least once. Real GitHub repo with an honest, methodology-first README. Applications active for both quant-shop targets generally (not just the warm intro) and AI-Eng/SWE hedge targets. NeetCode cumulative >= 70-75." },
    { id: "gate4", title: "Day 94 / Dec 1 — FINAL GATE", dueDay: 94, status: "pending",
      criteria: "Full cold re-diagnostic complete across all 10 original domains plus the 2 new quant skills, compared honestly against the original Day 1 baseline. Can explain, cold and unprompted, all core vocabulary/pitfalls (lookahead bias, survivorship bias, overfitting, walk-forward validation, Sharpe ratio, max drawdown, alpha, beta, mean reversion, random walk, Markov property) to a nontechnical-ish interviewer. At least one backtested strategy is genuinely finished, validated, and resume-ready — not a toy, not claimed-but-fragile. NeetCode cumulative >= 80-85 (hedge intact, not abandoned). This is a 'credible, trainable junior' bar, not mastery — the gate is honesty about what's actually true, not a pass/fail performance." }
  ],

  /* -----------------------------------------------------------------
     NOTES / RESUME / ACHIEVEMENTS
     ----------------------------------------------------------------- */
  notes: [],

  resume: {
    claims: [
      { skill: "Python", claimedLevel: "Strong understanding", verifiedLevel: 1, defensible: false, note: "Do not claim above level 3 until re-tested and holding up." },
      { skill: "SQL", claimedLevel: "Comfortable", verifiedLevel: 1.6, defensible: false, note: "JOINs are a real gap — fix before claiming this." },
      { skill: "NumPy/Pandas", claimedLevel: "Comfortable", verifiedLevel: null, defensible: null, note: "Untested by the diagnostic — verify before relying on the claim. Now genuinely load-bearing for the quant track." },
      { skill: "Git/GitHub", claimedLevel: "Comfortable", verifiedLevel: null, defensible: null, note: "Untested by the diagnostic." },
      { skill: "Algorithmic Trading", claimedLevel: "N/A yet", verifiedLevel: 0, defensible: false, note: "Do not claim ANY quant-trading skill on a resume until the Strategy 1/2 portfolio is real and verifiable — this is the whole point of the pivot's evidence-based framing." }
    ],
    portfolioLinks: []
  },

  achievements: [
    { id: "a1", date: "2026-08-15", title: "Diagnostic complete", description: "Finished the full 10-domain skill diagnostic — the real baseline this whole plan is built on." },
    { id: "a2", date: PLAN_START_DATE, title: "Quant pivot — evidence-based, not impulsive", description: "Researched the real timeline/hiring-bar evidence before committing, got talked down from a 4-hour-sleep plan to a sustainable 5-hour floor, and set 'credible working knowledge' instead of 'mastery' as the actual target. That's the harder, more useful decision than just saying yes to the deadline." }
  ],

  settings: { theme: "light" }
};

/* Deep clone helper so the DEFAULT_STATE object is never mutated in place */
function getFreshDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}
