/* Tech & AI mastery ("clear AI") + fitness content. Sources: file 03 (Joveo SWE/AI blueprint), file 04 (fitness), file 05 (schedule rules). */
var CONTENT = (typeof CONTENT !== "undefined") ? CONTENT : {};

/* ---- Tech weeks, shifted so Tech-W1 starts Mon 26 Oct (NPTEL week first). tw = 1..8 ---- */
CONTENT.tech = {
  dsa: {
    1: { theme: "Foundations · arrays and hashing", tue: "217 Contains Duplicate → 242 Valid Anagram → 1 Two Sum (watch NeetCode’s 10-min explanation of the PATTERN first, then code it yourself, then compare)", thu: "49 Group Anagrams → 347 Top K Frequent Elements", sun: "Timed 45 min on a plain doc, say your approach aloud before coding: 238 Product of Array Except Self", pool: "extra if ahead: 128 Longest Consecutive Sequence, 36 Valid Sudoku" },
    2: { theme: "Foundations · two pointers and sliding window", tue: "125 Valid Palindrome → 167 Two Sum II → 121 Best Time to Buy and Sell Stock", thu: "3 Longest Substring Without Repeating Characters → 15 3Sum", sun: "Timed 45 min: 11 Container With Most Water + redo one problem from your redo list", pool: "extra: 424, 567, 42, 76" },
    3: { theme: "Foundations · stack and binary search", tue: "20 Valid Parentheses → 155 Min Stack → 150 Evaluate Reverse Polish Notation", thu: "704 Binary Search → 74 Search a 2D Matrix → 875 Koko Eating Bananas", sun: "Timed 45 min: 739 Daily Temperatures + 153 Find Minimum in Rotated Sorted Array", pool: "extra: 22 Generate Parentheses, 33 Search in Rotated Sorted Array" },
    4: { theme: "Foundations · linked lists (incl. a Joveo-reported classic)", tue: "206 Reverse Linked List → 21 Merge Two Sorted Lists → 141 Linked List Cycle", thu: "143 Reorder List → 19 Remove Nth Node From End → 2 Add Two Numbers", sun: "Timed 45 min: 146 LRU Cache (reported in Joveo engineering interviews) — a doubly-linked list plus a dict", pool: "extra: 138 Copy List with Random Pointer, 287, 23" },
    5: { theme: "Foundations · trees", tue: "226 Invert Binary Tree → 104 Maximum Depth → 100 Same Tree", thu: "102 Binary Tree Level Order Traversal → 98 Validate BST → 230 Kth Smallest in a BST", sun: "Timed 45 min: 235 Lowest Common Ancestor of a BST + 199 Binary Tree Right Side View", pool: "extra: 543, 110, 572, 1448, 105" },
    6: { theme: "Heaps + first look at DP (exam week: keep it light)", tue: "703 Kth Largest Element in a Stream → 1046 Last Stone Weight", thu: "70 Climbing Stairs → 198 House Robber", sun: "Timed 45 min: 322 Coin Change (read the idea first; DP is a lot to ask in a week)", pool: "extra: 215 Kth Largest Element in an Array" },
    7: { theme: "Mixed patterns (exam week: Thursday only)", tue: "(Tue 8 Dec = exam day — nothing)", thu: "53 Maximum Subarray → 55 Jump Game", sun: "Timed 45 min: 56 Merge Intervals + 78 Subsets", pool: "extra: 15 3Sum again from memory" },
    8: { theme: "Review: redo your error log + the Joveo-reported set", tue: "Redo 2 problems from your redo list under 25-min timers, then re-solve 146 LRU Cache from a blank page", thu: "Redo 2 from the list, then attempt 72 Edit Distance (watch an explanation first if stuck at 25 min)", sun: "Timed 45 min: 2 problems from your redo list", pool: "optional: Huffman encoding (frequency → min-heap → tree → codes) after watching a walkthrough" }
  },
  lld: { 1: "OOP + SOLID summary; patterns Strategy, Observer, Factory (refactoring.guru catalogue)", 2: "LRU Cache class design + Parking Lot (AlgoMaster LLD list)", 3: "Logging Framework + Pub-Sub system", 4: "Task Management System + your own Job Scheduler (priority, retries, concurrency)", 5: "Vending Machine (State pattern) + Splitwise", 6: "Rate limiter (token bucket) + in-memory KV store with TTL", 7: "Notification service (Observer + Strategy) + an ad budget-pacing engine", 8: "45-min timed LLD mock (Elevator or ATM) — requirements → entities → classes → code → ‘now add X’" },
  ai: {
    1: "Transformers: tokenisation, embeddings, self-attention (Q/K/V), multi-head, positional encoding, decoder-only generation, KV cache, temperature/top-p. Read Jay Alammar’s ‘The Illustrated Transformer’. Self-test: walk me through what happens between a prompt and the next token.",
    2: "Embeddings + vector search: cosine vs dot product, ANN, HNSW vs IVFFlat, recall vs latency, pgvector (README). Self-test: why HNSW over IVFFlat? what does ef_search do? what breaks with filtered queries?",
    3: "RAG end to end: chunking, hybrid search (BM25 + vectors with RRF), reranking, contextual retrieval (Anthropic ‘Contextual Retrieval’, 19 Sep 2024; RAG paper Lewis et al. 2020). Self-test: design RAG for 10k HR policy PDFs — what do you measure?",
    4: "Evals: unit-test assertions, human/model evals, A/B tests, LLM-as-judge alignment, RAG metrics (Hamel Husain ‘Your AI Product Needs Evals’; Ragas metric list). Self-test: how do you know your chatbot got better?",
    5: "Prompting + structured output, guardrails, caching (Anthropic prompt-engineering overview; Eugene Yan’s LLM patterns). Self-test: when prompt vs fine-tune vs RAG?",
    6: "Agents and conversational state (Anthropic ‘Building Effective Agents’, 19 Dec 2024: workflows vs agents, routing, orchestrator-workers, evaluator-optimizer). Self-test: where do you store conversation state; what happens at 500 concurrent chats?",
    7: "Production LLM apps: latency (streaming, caching, smaller models), cost, retries/idempotency, observability, PII, responsible AI in hiring (Chip Huyen ‘AI Engineering’). Self-test: design the AI Interviewer backend.",
    8: "30 rapid-fire Q&A aloud, 2 min each, plus a project walk-through with metrics."
  },
  cs: { 1: "OS: process vs thread, context switch, scheduling (FCFS/SJF/RR/priority), synchronisation (mutex, semaphore, monitor), deadlock (4 conditions, avoidance) — OSTEP concurrency chapters", 2: "OS memory: paging, segmentation, virtual memory, TLB, page replacement, thrashing. Python concurrency: GIL, threads vs processes vs asyncio (matters for FastAPI)", 3: "DBMS: ACID, transactions, isolation levels + anomalies, MVCC, deadlocks in databases", 4: "DBMS: indexing and B+ trees, normalisation 1NF–BCNF, joins, query execution, WAL/replication (ties to Postgres logical replication)", 5: "Networks: OSI vs TCP/IP, TCP vs UDP, 3-way handshake, HTTP/1.1 vs 2 vs 3, TLS handshake, DNS resolution, REST vs gRPC vs WebSocket, L4 vs L7 load balancers, CDN", 6: "Java crash: HashMap internals, TreeMap, equals/hashCode contract, ConcurrentHashMap, immutability, String pool, generics, GC basics, ExecutorService", 7: "Project walk-through: pick one project and explain problem → architecture → your part → two hardest decisions → evaluation → failure modes → what you’d change", 8: "Project walk-through mock aloud (10 min per project)" },
  hld: { 1: "Framework + estimation (ByteByteGo vol 1 ch 2–4); system-design-primer scalability intro", 2: "Rate limiter (BBG ch 5) + consistent hashing (ch 6)", 3: "URL shortener (BBG ch 9 — think ‘ad click tracking links’) + key-value store (ch 7); Kafka 101 (Confluent, 16 lessons ≈76 min) split over Thu + Sun", 4: "Ad click event aggregation (BBG vol 2) + change-data-capture with Debezium", 5: "Elasticsearch internals (shards, Lucene segments, refresh_interval) + search autocomplete (BBG ch 14)", 6: "Notification system (BBG ch 11) + distributed message queue + web crawler (think ‘job-feed ingestion with dedup’)", 7: "Design an LLM chatbot / AI-interviewer backend: ingestion → chunking → embeddings → pgvector → retrieval + rerank → LLM → guardrails; conversation state, streaming, retries, evals, cost", 8: "Two timed 40-min HLD mocks (one ad-tech, one LLM-app)" },
  fri: { 1: "SQL basics: SELECT, JOIN types, GROUP BY/HAVING, NULL handling (LeetCode SQL 50: basic joins + aggregation)", 2: "Window functions: ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD, running totals, CTEs — 176, 184, 185, 178, 180, 1321", 3: "Postgres: indexes (B-tree, composite, partial, GIN), EXPLAIN (ANALYZE), isolation levels, MVCC — run it on your own project DB", 4: "Ad-tech schema (campaigns, jobs, clicks, applications) + aggregation queries + pgvector operators (<->, <#>, <=>)", 5: "Behavioural: fill story cards 5–8 (file 10 §7) and rehearse the project walk-through", 6: "STAR practice: 3 stories aloud, 90 s each, timed", 7: "Behavioural mock, 30 min (AI or peer)", 8: "Behavioural mock, 30 min" }
};
CONTENT.applied = {
  1: "Architecture one-pager of your best FastAPI/Postgres/LLM project (the SWE JD says ‘shipped something real… your name on the commits’).",
  2: "pgvector: compare HNSW vs IVFFlat on your own data — recall and latency table.",
  3: "Chunking / hybrid-search experiment on your own data; note what moved the numbers.",
  4: "Build a 30–50-example golden set and 2–3 metrics for your RAG/LLM app.",
  5: "Prompt + guardrail test cases for your app (injection, PII, off-topic).",
  6: "Conversation-state diagram: where state lives, what happens on retry/timeout.",
  7: "Latency and cost table (p50/p95, tokens, price per 1k requests).",
  8: "Final write-up: README with problem, metric, screenshot, what you’d change (also D9 in file 10: clean public proof)."
};

/* ---- Fitness: run prescriptions by tier and week. [text, total minutes incl. 5-min warm walk + 5-min cool-down] ---- */
CONTENT.run = {
  A: { /* cannot jog 5 min — NHS Couch-to-5K mapping (file 04 §5.2) */
    1: [["run 1 min / walk 1.5 min × 7, finish with a 1-min run",29],["run 1 min / walk 1.5 min × 7, finish with a 1-min run",29],["run 1 min / walk 1.5 min × 7, finish with a 1-min run",29]],
    2: [["run 1.5 / walk 2 × 5, finish with 1.5",29],["run 1.5 / walk 2 × 5, finish with 1.5",29],["run 1.5 / walk 2 × 5, finish with 1.5",29]],
    3: [["run 1.5, walk 1.5, run 3, walk 3, run 1.5, walk 1.5, run 3",25],["same as Monday",25],["same as Monday",25]],
    4: [["DELOAD · repeat last week’s pattern (run 1.5, walk 1.5, run 3, walk 3 …)",25],["MVW only (10 min)",10],["DELOAD · same pattern",25]],
    5: [["run 3, walk 1.5, run 5, walk 2.5, run 3, walk 1.5, run 5",32],["same as Monday",32],["same as Monday",32]],
    6: [["run 5 / walk 3 / run 5 / walk 3 / run 5",31],["run 8 / walk 5 / run 8",31],["20 min straight run",30]],
    7: [["run 5 / walk 3 / run 8 / walk 3 / run 5",34],["run 10 / walk 3 / run 10",33],["25 min straight run",35]],
    8: [["25 min straight run",35],["25 min straight run",35],["25 min straight run",35]],
    9: [["28 min straight run",38],["30 min straight run",40],["5K run (or run/walk) — realistic finish line for this tier",40]]
  },
  B: { /* can jog ~10–15 min (file 04 §5.3) */
    1: [["run 5 / walk 3 / run 5 / walk 3 / run 5 (15 min running)",31],["run 8 / walk 5 / run 8 (16 min running)",31],["20 min straight, or 2 × 10 min with a 1-min walk",30]],
    2: [["run 5 / walk 3 / run 8 / walk 3 / run 5 (18 min running)",34],["run 10 / walk 3 / run 10 (20 min running)",33],["23 min straight",33]],
    3: [["25 min straight",35],["25 min straight",35],["26 min straight",36]],
    4: [["DELOAD · 20 min straight",30],["DELOAD · 20 min straight",30],["DELOAD · 20 min straight",30]],
    5: [["25 min straight",35],["28 min straight",38],["30 min straight",40]],
    6: [["28 min straight",38],["30 min straight",40],["34 min straight",44]],
    7: [["30 min straight",40],["30 min straight",40],["39 min straight (≈5.4 km) · long-run exception",49]],
    8: [["30 min straight",40],["30 min straight",40],["44 min straight (≈6 km) · long-run exception",54]],
    9: [["25 min easy",35],["20 min easy",30],["Sat 19 Dec: 50 min run (≈7 km) · stretch only if zero niggles and clean air: 10K as 9 run / 1 walk (~70 min)",60]]
  },
  C: { /* can jog ~25–30 min (file 04 §5.4) */
    1: [["25 min easy, talk-test pace",35],["25 min easy",35],["30 min easy",40]],
    2: [["28 min easy",38],["28 min easy",38],["34 min easy",44]],
    3: [["30 min easy",40],["30 min easy",40],["38 min (≈5 km) · 5K milestone · long-run exception",48]],
    4: [["DELOAD · 22 min easy",32],["DELOAD · 22 min easy",32],["DELOAD · 30 min easy",40]],
    5: [["30 min easy",40],["30 min easy",40],["43 min · long-run exception",53]],
    6: [["33 min easy",43],["33 min easy (4–6 strides after only if AQI ≤ 100)",43],["49 min · long-run exception",59]],
    7: [["35 min easy",45],["35 min easy",45],["55 min (≈7.5 km) · long-run exception",65]],
    8: [["35 min easy",45],["30 min easy",40],["62 min (≈8 km) · 8K milestone · long-run exception",72]],
    9: [["25 min easy",35],["20 min easy (+4 strides if AQI ≤ 100)",30],["Sat 19 Dec: 10K attempt (~72 min; 9 run / 1 walk if needed) · long-run exception",85]]
  }
};
CONTENT.strengthMin = { 1: 20, 2: 20, 3: 25, 4: 25, 5: 30, 6: 30, 7: 30, 8: 30, 9: 15 };
CONTENT.strengthA = "Strength A — lower body + core: squat (sit-to-stand → bodyweight → slow 3-s lowering) 10–15 · reverse lunge 8/leg (hold a wall) · glute bridge 12 → single-leg 6–8/leg · calf raise 15 → single-leg · dead bug 8/side · side plank 20–30 s/side. Rest 30–45 s; first two weeks only ONE round, stop with 2–3 reps in reserve.";
CONTENT.strengthB = "Strength B — single-leg + upper + back: step-up on a stair/sturdy chair 8–10/leg · single-leg Romanian deadlift (fingertips on wall) 6–8/leg · incline push-up (hands on table) 8–12 · bird dog 8/side · plank 20–45 s · wall sit 30–45 s · superman 10.";
CONTENT.mvw = "10-minute minimum workout (MVW-1): 1 min march + arm circles, then 3 rounds of squat 40 s / rest 20, incline push-up 40 / 20, glute bridge 40 / 20. Put your shoes on and do the first 2 minutes — you may stop after that (you usually won’t). Never skip two days in a row.";
CONTENT.aqiRule = "Check the hourly AQI at 12:30 from the nearest station (Knowledge Park III/V, Greater Noida) on the Indian (CPCB) scale; act on the worse of two sources. ≤ 100: outdoors as planned (easy pace if > 60). 101–200: easy run/walk ≤ 30 min only, or swap indoors. 201–300: NO outdoor run — indoor swap. 301–400: indoors, talk-test intensity, ≤ 30 min. 401+: mobility and light strength only. If you swap ≥ 2 of the 3 weekly runs indoors, repeat the week’s run prescription instead of advancing.";
CONTENT.indoorSwap = "Indoor swap (same minutes): 3 min brisk march with arm drive + 1 min step-ups on the bottom stair, repeat; or a low-impact cardio video (e.g. fitbymik ‘20 min low impact cardio — all standing’, two back-to-back); or shadow-boxing 3-min rounds. Pair it with German audio.";
CONTENT.fitLinks = {
  warm: ["5-min pre-run warm-up (Yoga With Tim)", "https://www.youtube.com/watch?v=3WUtJxLv-wI"],
  strengthRunners: ["Easy bodyweight exercises for runners (The Running Channel, ~14 min)", "https://www.youtube.com/watch?v=yN8tKZobL8c"],
  strengthHindi: ["20-min full-body home workout in Hindi (Body Fit TV)", "https://www.youtube.com/watch?v=iuastI2FVzI"],
  mvw: ["10-min full body, no equipment (MonikaFit)", "https://www.youtube.com/watch?v=W2Bm9dfQjbk"],
  mobility: ["10-min mobility for runners (Run and Stretch)", "https://www.youtube.com/watch?v=_4XL82i2Lko"],
  yoga: ["Runner’s yoga (Yoga With Adriene, ~30 min)", "https://www.youtube.com/watch?v=0hTllAb4XGg"],
  cardio: ["20-min low-impact cardio, all standing (fitbymik)", "https://www.youtube.com/watch?v=WjH-NQDeQ3o"]
};

/* ---- Fixed dates / events shown as banners ---- */
CONTENT.events = [
  { d: "2026-10-25", t: "NPTEL Innovation exam" },
  { d: "2026-10-30", t: "Book the Goethe A1 exam by today" },
  { d: "2026-11-08", t: "Diwali — light day" },
  { d: "2026-11-20", t: "LAST day to book the Goethe A1 exam (22:00 IST)" },
  { d: "2026-12-01", t: "Last Deloitte day" },
  { d: "2026-12-19", t: "Run milestone day" }
];

/* ---- Rewards (editable in the Rewards tab) ---- */
CONTENT.rewards = {
  7:  "7-day streak → your favourite non-veg meal (order it in, or ask for it at home)",
  14: "14-day streak → a solo movie in a theatre with popcorn (a matinee is fine)",
  21: "21-day streak → a café afternoon + one small thing you pick (a book, a cap, earphones)",
  35: "35-day streak → a bigger solo day out that you plan yourself",
  50: "50-day streak → something you have wanted for a while (keep it under ₹2,000)",
  73: "All 73 days → a proper celebration of your choice — you earned it"
};

/* ---- Key links for the Resources tab ---- */
CONTENT.links = [
  { g: "German — start here", items: [
    ["DW Nicos Weg A1 (Hindi interface)", "https://learngerman.dw.com/hi/nicos-weg/c-71245621"],
    ["DW Nicos Weg A1 (English)", "https://learngerman.dw.com/en/nicos-weg/c-36519789"],
    ["DW Deutschtrainer A1 (Hindi)", "https://learngerman.dw.com/hi/deutschtrainer/c-74131464"],
    ["DW ABC (sounds and letters)", "https://learngerman.dw.com/en/abc/c-39621991"],
    ["Anki deck: Goethe Institute A1 Wordlist (AnkiWeb 293204297)", "https://ankiweb.net/shared/info/293204297"],
    ["Official Goethe A1 Wortliste (PDF)", "https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf"],
    ["Coffee Break German, Season 1 (free audio)", "https://coffeebreaklanguages.com/tag/cbg-season-1/"],
    ["Easy German — German A1 for absolute beginners (playlist)", "https://www.youtube.com/playlist?list=PLk1fjOl39-50kWobutO8NVFzbw9PHtbbg"]
  ]},
  { g: "German — exam", items: [
    ["Goethe A1 official free practice sets + Hören audio", "https://www.goethe.de/ins/cs/de/spr/prf/gzsd1/ueb.html"],
    ["Goethe online Modellsatz (timed)", "https://bfu.goethe.de/a1_sd1/"],
    ["Goethe India — A1 exam dates and booking", "https://www.goethe.de/ins/in/en/spr/prf/gzsd1.cfm"]
  ]},
  { g: "Joveo", items: [
    ["Joveo — home", "https://www.joveo.com/"],
    ["Joveo — about / leadership", "https://www.joveo.com/about-us/"],
    ["Joveo — press", "https://www.joveo.com/press/"],
    ["Joveo careers", "https://careers.joveo.com/"]
  ]},
  { g: "Mocks and people when nobody is free", items: [
    ["Pramp / Aced Practice — free peer mock interviews with strangers (check current limits)", "https://www.pramp.com/"],
    ["Noida Toastmasters Online Club — guests welcome, real people + speaking practice (confirm schedule)", "https://www.toastmasters.org/Find-a-Club/28678103"]
  ]}
];
