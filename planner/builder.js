/* Day builder v2: turns the content tables + settings into a timed list of slots for any date 2026-10-20 .. 2026-12-31.
   Rules baked in (research file 05): deep work ≤ 3.5 h/day (hard 4 h), retrieval/known-audio in the interruptible window,
   ≥ 90 min free time, one light day a week, fixed anchors, no new learning after 21:30, 7 h sleep.
   Workout: evening 19:00 (default) or early morning 05:15 — user setting. Indian AQI rule applies to every outdoor session. */
(function (root) {
  var C = root.CONTENT;
  var START = "2026-10-20", END = "2026-12-31", DELOITTE_END = "2026-12-01";
  var DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function D(s) { return new Date(s + "T00:00:00"); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function addDays(s, n) { var d = D(s); d.setDate(d.getDate() + n); return iso(d); }
  function dow(s) { return D(s).getDay(); }
  function weekOf(s) { return Math.floor((D(s) - D("2026-10-19")) / (7 * 864e5)) + 1; }
  function techWeek(s) { return Math.floor((D(s) - D("2026-10-26")) / (7 * 864e5)) + 1; }
  function mins(t) { var p = t.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function hhmm(m) { return pad(Math.floor(m / 60)) + ":" + pad(m % 60); }
  function nice(s) { var d = D(s); return DOW[d.getDay()].slice(0, 3) + " " + d.getDate() + " " + MON[d.getMonth()]; }

  var VIDEOS = {
    2: "Pick ONE video (don’t binge): lingoni ‘Finally Master German Articles’ part 1 · Learn German (@LearnGermanOriginal) L19–21 · Kedar Jadhav (Hindi) Ep 12 or 20 (nicht/kein).",
    3: "Pick ONE video: lingoni ‘How to tell time’ · lingoni ‘Separable verbs’ · Kedar Jadhav Ep 6 (modals) · Learn German L22–23 / L33–34.",
    4: "Pick ONE video: lingoni Dative series part 1 · Kedar Jadhav Ep 11–13 (cases) · Learn German L26–L32 / L40 (directions) · Easy German ‘At the Train Station’.",
    5: "Pick ONE video: Learn German L44–49 or L52–59 (exam-style real-life tasks) · Kedar Jadhav Ep 21 (exam tips, 23 min)."
  };
  var KAPITEL = { 2: "Kapitel 1–4 (skim 1–2, do 3–4)", 3: "Kapitel 5–6", 4: "Kapitel 7–9", 5: "Kapitel 10–12", 6: "any Kapitel you scored badly on" };

  /* ---------- settings helpers ---------- */
  function offSet(S) { var o = {}; String(S.off || "").split(",").forEach(function (x) { x = x.trim(); if (x) o[x] = 1; }); return o; }

  /* ---------- meals ---------- */
  var FALLBACK = {
    bf:   { t: "Protein-first breakfast", d: "Eggs / paneer bhurji / besan chilla / sprouts poha / oats with milk + a fruit — aim for ≈ 20 g protein. Make it for two (Dad too) in 10–15 min. Water first." },
    am:   { t: "Fruit + a handful of nuts", d: "One fruit and a small handful of almonds/peanuts; a big glass of water. Last tea/coffee by 14:00." },
    lunch:{ t: "Balanced thali", d: "2 rotis or 1 cup rice + dal / rajma / chole / paneer / egg curry + a vegetable + curd or salad. Half the plate vegetables, a palm of protein." },
    pre:  { t: "Light pre-run snack", d: "A banana, or roasted chana + a date, 60–90 min before your run/strength. Sip water." },
    dinner:{ t: "Recovery dinner", d: "Protein + vegetables + a moderate carb (roti/rice) within 1–2 h after your run: dal or paneer or egg/chicken, sabzi, 1–2 rotis, curd. Keep it lighter if it’s a rest day." }
  };
  function meal(S, w, key) {
    var M = C.meals, di = (w + 6) % 7;
    if (M && M.days && M.days[S.diet] && M.days[S.diet][di] && M.days[S.diet][di][key]) return M.days[S.diet][di][key];
    return FALLBACK[key];
  }
  function mealSlot(add, start, end, S, w, key, label, extra) {
    var m = meal(S, w, key);
    add(start, end, "meal", "E", label + " · " + m.t, m.d, extra);
  }

  /* ---------- Nicos Weg schedule ---------- */
  var nwCache = null;
  function nwFor(s) {
    if (!nwCache) {
      nwCache = {}; var used = 0;
      for (var d = START; d <= END; d = addDays(d, 1)) {
        var c = C.nwCount(d, dow(d)); nwCache[d] = C.nwOrder.slice(used, used + c); used += c;
      }
    }
    return nwCache[s] || [];
  }
  function nwLabel(list) { return list.map(function (n) { return "N" + n + " ‘" + C.nw[n] + "’"; }).join(" + "); }

  /* ---------- phases ---------- */
  function phase(s, S) {
    if (s <= "2026-10-25") return { id: 0, name: "NPTEL first", tone: "p0" };
    if (s <= "2026-11-09") return { id: 1, name: "Joveo intensive", tone: "p1" };
    if (s <= DELOITTE_END) return { id: 2, name: "German build · Joveo ready-state", tone: "p2" };
    if (s >= "2026-12-20") return { id: 6, name: "Year-end finish", tone: "p6" };
    if (s < S.exam) return { id: 3, name: "Exam mode", tone: "p3" };
    if (s === S.exam) return { id: 4, name: "A1 EXAM DAY", tone: "p4" };
    return { id: 5, name: "After the exam", tone: "p5" };
  }

  function mk(id, start, end, type, dom, title, detail, extra) {
    id = id.split("#")[0] + "@" + start;   // stable id = date@start-time, so ticks survive settings changes
    var o = { id: id, start: start, end: end, min: mins(end) - mins(start), type: type, dom: dom, title: title, detail: detail || "", links: [], needs: [] };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }

  /* ---------- German pieces ---------- */
  function ankiText(s, w, label) {
    var n = C.ankiNew(s, w);
    return label + ": reviews first, then " + (n ? n + " new cards" : "no new cards") + " (deck 293204297 in Anki, FSRS retention 0.90). If more than 120 reviews are due, skip new cards today.";
  }
  function germanDeepFor(s, w, wk, S) {
    var idx = (w === 1) ? 0 : (w === 3) ? 1 : 2;
    var g = C.grammar[Math.min(wk, 7)] || C.grammar[7];
    var parts = ["Grammar/practice (25 min): " + g[idx] + ". Do it from Grammatik aktiv A1 (or the DW grammar tab in Hindi) — rule in your own words, then exercises."];
    if (S.books && wk >= 2) parts.push("Workbook (20 min): Netzwerk neu A1 — " + (KAPITEL[Math.min(wk, 6)] || KAPITEL[6]) + ": odd-numbered exercise blocks + every Hören/Schreiben task; check the Lösungen.");
    else if (wk >= 2) parts.push("Workbook (20 min): the books haven’t arrived (tick ‘Books arrived’ in Settings when they do) — use DW Deutschtrainer exercises for this week’s theme instead.");
    if (idx === 2 && C.writing[Math.min(wk, 7)]) parts.push("Writing (15 min): " + C.writing[Math.min(wk, 7)]);
    if (VIDEOS[wk] && idx === 1) parts.push(VIDEOS[wk]);
    return parts.join("\n");
  }
  function examBlock(s) {
    var m = {
      "2026-12-02": "Weakest-Teil drill (the Teil you scored lowest in Mock 3) 40 min, then 2 messages typed on a German keyboard layout, self-marked with the official scoring sheet (30 min).",
      "2026-12-03": "Lesen Teil 1–3 timed (25 min) + review every miss (30 min) + 15 min skim of the Wortliste word groups. Optional LS-H tutor session today.",
      "2026-12-04": "Hören sectional: Teil 2 once only (20 min) · Schreiben typed: one form + one message (25 min) · Sprechen: say your Teil 1 script, spell your name, say 3 prices (25 min). Check your admission email now (arrives ≤ 4 days before the exam): time, room, ID rule."
    };
    return m[s] || "Exam-mode drill: weakest Teil first, then one timed section. No new vocabulary after Sat 5 Dec.";
  }

  /* ---------- fitness ---------- */
  function workout(s, w, wk, S) {
    var tier = S.tier, k = Math.min(wk, 11), runs = C.run[tier][k] || C.run[tier][9];
    var L = C.fitLinks, aqi = C.aqiRule;
    var when = S.workout === "am" ? "AQI check at 04:45 (cold smog layer: mornings are often the worst hour — if it says indoors, do the indoor swap)" : "AQI check at 18:45 (evening smog is often worse than midday — if it says indoors, do the indoor swap)";
    if (s === "2026-10-20") {
      return { title: "Tier test (your first workout)", min: 25, links: [L.warm],
        detail: "5 min brisk walk. Then jog at talk-test pace for as long as it feels easy — stop at 30 min max, note the minutes. Under 5 min → Tier A · 5–20 min → Tier B · 25+ min → Tier C. Pick it in Settings (default B). 5-min easy walk after.\n" + when + "\n" + aqi };
    }
    if (s === "2026-12-31") return { title: "Year-end run 🎉", min: 50, links: [L.warm], detail: C.yearEndRun[tier] + "\n" + when + "\n" + aqi };
    if (s === S.exam) return { title: "Movement: 10-minute minimum workout only", min: 10, links: [L.mvw], detail: CONTENT.mvw };
    if (s === addDays(S.exam, -1)) return { title: "Light: 20-min easy walk + mobility", min: 25, links: [L.mobility], detail: "Easy 15–20 min walk (indoors if AQI > 200) + the 10-min mobility video. No hard session within 48 h of the exam." };
    if (s === "2026-12-25") return { title: "Easy 30-min walk (festive day)", min: 30, links: [L.mobility], detail: "Walk with family or music; indoors if the AQI says so." };
    if (w === 0) return { title: "Rest day — optional walk or yoga", min: 25, links: [L.yoga, L.mobility], detail: "Optional 20–30 min easy walk, or a runner’s-yoga/mobility video. Resting is part of the plan." };
    if (w === 5) return { title: "Friday · 10-minute minimum workout (or an easy 15–20 min walk)", min: 15, links: [L.mvw], detail: CONTENT.mvw };
    if (w === 2 || w === 4) {
      var sm = C.strengthMin[k] || 20;
      return { title: (w === 2 ? "Strength A" : "Strength B") + " · " + sm + " min + 3 min mobility", min: sm + 3, links: [L.strengthRunners, L.strengthHindi],
        detail: (w === 2 ? C.strengthA : C.strengthB) + "\nW" + k + " volume: " + (k <= 2 ? "1 round" : k <= 4 ? "2 rounds" : k <= 8 ? "3 rounds or harder variations" : "short version, 12-min S-Mini") + "." };
    }
    var r = runs[(w === 1) ? 0 : (w === 3) ? 1 : 2];
    if (r[0].indexOf("MVW only") === 0) return { title: "Deload day · 10-minute minimum workout", min: 10, links: [L.mvw], detail: CONTENT.mvw };
    return { title: (w === 6 ? "Long run · " : "Run " + (w === 1 ? "R1" : "R2") + " · ") + r[0], min: r[1], links: [L.warm, L.cardio],
      detail: "Tier " + tier + " · week " + k + " · " + r[1] + " min including the 5-min warm walk and 5-min cool-down walk. Use time, not distance; talk-test pace.\n" + when + "\n" + aqi + "\nIf the air says indoors: " + C.indoorSwap };
  }

  /* ---------- tech ---------- */
  function techLight(s, w, tw) {
    if (s === "2026-10-20") return null;
    if (tw < 1) return null;
    var k = Math.min(tw, 8);
    if (w === 1) return { t: "Tech & AI · low-level design (week " + k + ") · SWE track, optional", d: C.tech.lld[k], opt: true };
    if (w === 2) return { t: "Tech & AI · AI/LLM fundamentals (week " + k + ")", d: C.tech.ai[k] };
    if (w === 3) return { t: "Tech & AI · CS fundamentals (week " + k + ")", d: C.tech.cs[k] };
    if (w === 4) return { t: "Tech & AI · high-level design (week " + k + ") · SWE track, optional", d: C.tech.hld[k], opt: true };
    if (w === 5) return { t: "Tech & AI · SQL / behavioural (week " + k + ")", d: C.tech.fri[k] };
    return null;
  }
  function weekdayTechDeep(s, w, tw) {
    var k = Math.max(1, Math.min(tw, 8)), ds = C.tech.dsa[k];
    if (w === 2) return ds.tue + "\n" + ds.pool;
    if (w === 4) return ds.thu + "\n" + ds.pool;
    if (w === 1) return "LLD in code: " + C.tech.lld[k];
    if (w === 3) return "CS fundamentals, say each answer in 2 minutes aloud: " + C.tech.cs[k];
    return "SQL/behavioural: " + C.tech.fri[k];
  }
  function dsaText(tw, w) {
    var k = Math.max(1, Math.min(tw, 8)), ds = C.tech.dsa[k];
    return (w === 2 ? ds.tue : ds.thu) + "\n" + ds.pool + "\nRules: 25-min stuck rule (read the hint, re-solve from a blank page tomorrow); anything over 35 min goes on the redo list for +2 and +7 days. Plain doc, dry-run aloud.";
  }

  /* ---------- the three weekday deep blocks ---------- */
  function blockA(s, w, wk, tw, ph, S) {
    var P = ph.id, np = C.nptel[s], gd = C.gd[s], ye = C.yearend[s];
    if (P === 0 && np && np.A) return { dom: "N", t: np.A.t, d: np.A.d };
    if (P === 1 && gd) return { dom: "J", t: gd.t, d: gd.d + "\nTemplate: warm-up 10 · learn 15 · drill 20–25 · live 20–25 · review 10–15; end with ONE fix for tomorrow." };
    if (P === 2 && (w === 2 || w === 4)) {
      var cs = C.caseSets[(Math.floor((D(s) - D("2026-11-10")) / (7 * 864e5)) + (w === 4 ? 1 : 0)) % 4];
      return { dom: "J", t: "Joveo · 2 timed cases + GD maintenance", d: "Timed cases, answer-first, structure aloud, score yourself 1–5 each: " + cs + ". Then 20 min of GD maintenance: one random topic card (file 09 §3.7), 2 openers aloud, 1 AI-simulator round or a 12-min solo recorded mock. Refresh live facts (PLFS, H-1B, EU AI Act) once a week." };
    }
    if (P === 2) return { dom: "G", t: "German deep block (70 min)", d: germanDeepFor(s, w, wk, S) };
    if (P === 3) return { dom: "G", t: "German · exam-mode block (70 min)", d: examBlock(s) };
    if (P === 5) {
      var pi = Math.abs(Math.floor((D(s) - D("2026-12-09")) / 864e5));
      return { dom: "J", t: "Joveo · timed cases + stories", d: "Two timed cases (" + C.caseSets[pi % 4] + "), then " + C.piMon[pi % 3] + " If the GD/PI date has arrived, switch to the 48-hour compressed plan in file 09 §4.5 and put it here." };
    }
    if (P === 6 && ye) return { dom: "J", t: ye.A.t, d: ye.A.d };
    return { dom: "J", t: "Joveo · weakest-area drill", d: "Pick the lowest score on your last scorecard and drill it for 70 min." };
  }
  function blockM(s, w, wk, tw, ph, S) {
    var P = ph.id, np = C.nptel[s], jm = C.jM[s], ye = C.yearend[s];
    if (P === 0 && np && np.M) return { dom: "N", t: np.M.t, d: np.M.d };
    if (P === 1) return jm ? { dom: "J", t: jm.t, d: jm.d } : { dom: "J", t: "Joveo business track (75 min)", d: "Pick from your open items: teardown, stories, a timed case set. Log what you did and one thing to fix." };
    var wkN = Math.floor((D(s) - D("2026-11-10")) / (7 * 864e5));
    if (P === 2) {
      if (w === 2 || w === 4) return { dom: "T", t: "DSA foundations — " + C.tech.dsa[Math.max(1, Math.min(tw, 8))].theme, d: dsaText(tw, w) + "\nExam-month rule: if the day was heavy, do the Level-B version (40 min)." };
      if (w === 1 || w === 3) return { dom: "J", t: "Joveo PI prep (75 min)", d: (w === 1 ? C.piMon : C.piWed)[Math.max(0, wkN) % 3] + " Then 20 min: re-read your keyword strip and fix one weak answer." };
      return { dom: "J", t: "Joveo mock / repair (75 min)", d: C.piFri[Math.max(0, wkN) % 3] };
    }
    if (P === 3) {
      if (w === 2 || w === 4) return { dom: "T", t: "Tech maintenance (Level B, 40 min + review)", d: "Exam month: re-solve 2 problems from your error log under 20-min timers, then 20 min of rapid-fire CS/AI questions aloud. Nothing new." };
      return { dom: "J", t: "Joveo maintenance (75 min)", d: "One timed case or a mock-repair session from your latest scorecard; keep answers short and structured. If the GD/PI date has arrived, rehearse for that instead." };
    }
    if (P === 5) return { dom: "T", t: "Tech & AI deep (75 min)", d: weekdayTechDeep(s, w, tw) };
    if (P === 6 && ye) return { dom: ye.M.t.indexOf("DSA") === 0 || ye.M.t.indexOf("LLD") === 0 ? "T" : "T", t: ye.M.t, d: ye.M.d };
    return { dom: "T", t: "Tech & AI deep (75 min)", d: weekdayTechDeep(s, w, tw) };
  }
  function blockB1(s, w, wk, tw, ph, S) {
    var P = ph.id, np = C.nptel[s], ye = C.yearend[s], gerDeep = (w === 1 || w === 3 || w === 5);
    var wkN = Math.floor((D(s) - D("2026-12-09")) / 864e5);
    if (P === 0 && np && np.B1) return { dom: "N", t: np.B1.t, d: np.B1.d };
    if (P === 1) {
      if (gerDeep) return { dom: "G", t: "German deep block (60 min)", d: germanDeepFor(s, w, wk, S) };
      return { dom: "T", t: "DSA foundations — " + C.tech.dsa[Math.max(1, Math.min(tw, 8))].theme, d: dsaText(tw, w) };
    }
    if (P === 2) {
      if (gerDeep) return { dom: "G", t: "German · speaking + writing + Hören (60 min)", d: "Speaking (20 min): run the AI voice examiner for today’s Teil (prompts P1–P4 in file 06 §3.3), then FEEDBACK P5.\nWriting (20 min): one typed Schreiben task on a German keyboard layout, marked with the official sheet.\nHören (20 min): one sectional set (the Teil you scored lowest), mark every miss." };
      return { dom: "M", t: "Catch-up / pick one (60 min)", d: "Pick whichever domain is furthest behind today. One pre-chosen item beats deciding in the moment: default = German.", opt: true };
    }
    if (P === 3) {
      if (gerDeep) return { dom: "G", t: "German · speaking script + typed writing (60 min)", d: "Say your Teil 1 script twice, run P2 or P3 with the AI voice examiner once, then one typed Schreiben Teil 2 message marked with the official sheet." };
      return { dom: "M", t: "Catch-up / pick one (60 min)", d: "Default: the German Teil you scored lowest. Skip it if you already did 3+ h of German today.", opt: true };
    }
    if (P === 5) {
      if (w === 1 || w === 3) return { dom: "C", t: "Germany lane · IELTS / APS (60 min)", d: "IELTS writing task or the next APS/application admin item from Career OS. Decide with the Career OS deadlines page what is due next. One item only — finish it.", opt: true };
      if (w === 5) return { dom: "J", t: "Joveo mock / repair (60 min)", d: C.piFri[Math.abs(wkN) % 3] };
      return { dom: "J", t: "Joveo PI prep (60 min)", d: (w === 2 ? C.piWed : C.piMon)[Math.abs(wkN) % 3] };
    }
    if (P === 6 && ye) return { dom: ye.B1.t.indexOf("Germany") === 0 ? "C" : ye.B1.t.indexOf("German") === 0 ? "G" : "M", t: ye.B1.t, d: ye.B1.d, opt: !!ye.B1.opt };
    return { dom: "M", t: "Catch-up / pick one (60 min)", d: "Whichever domain is furthest behind.", opt: true };
  }

  /* ---------- build ---------- */
  function build(s, S) {
    S = Object.assign({}, C.defaults, S || {});
    var w = dow(s), wk = weekOf(s), tw = techWeek(s), ph = phase(s, S);
    var off = offSet(S);
    var deloitte = w >= 1 && w <= 5 && s <= DELOITTE_END;
    var weekday = w >= 1 && w <= 5;
    var slots = [], idn = 0;
    function add(start, end, type, dom, title, detail, extra) { slots.push(mk(s + "#" + (idn++), start, end, type, dom, title, detail, extra)); }
    var live = C.live[s];
    var day = { date: s, label: nice(s), dow: w, dowName: DOW[w], wk: wk, tw: tw, phase: ph, deloitte: deloitte, slots: slots, notes: [], off: !!off[s] };
    C.events.filter(function (e) { return e.d === s; }).forEach(function (e) { day.notes.push(e.t); });
    if (s === S.exam) day.notes.push("A1 EXAM — New Delhi, computer-based. Original passport + booking confirmation. No phones or watches.");
    if (S.gd && s === S.gd) day.notes.push("GD DAY (as you set it)");
    day.theme = themeOf(s, w, ph, S, !!off[s]);

    if (off[s]) { offDay(add, s, w, S); finish(day); return day; }
    if (s === S.exam) { examDay(add, S, w); finish(day); return day; }
    if (s === "2026-10-25") { nptelExamDay(add, S, w); finish(day); return day; }
    if (s === "2026-11-08") { diwali(add, s, w, S); finish(day); return day; }
    if (s === addDays(S.exam, -1)) { taperDay(add, s, w, S); finish(day); return day; }
    if (s === "2026-12-31") { yearEnd(add, s, w, wk, S); finish(day); return day; }
    if (s === "2026-12-25") { festive(add, s, w, wk, S); finish(day); return day; }

    var wo = workout(s, w, wk, S);
    var am = S.workout === "am";
    var morningEnd = morning(add, s, w, S, wo, weekday, am);
    if (weekday) weekdayDay(add, s, w, wk, tw, ph, S, deloitte, live, wo, am);
    else if (w === 6) saturdayDay(add, s, w, wk, tw, ph, S, live, wo, am);
    else sundayDay(add, s, w, wk, tw, ph, S, wo, am);
    finish(day);
    return day;
  }

  function themeOf(s, w, ph, S, off) {
    if (off) return "Day off";
    if (s === "2026-11-08") return "Diwali — light day";
    if (s === "2026-10-25") return "NPTEL exam day";
    if (s === S.exam) return "German A1 exam";
    if (s === "2026-12-31") return "Year-end review";
    if (s === "2026-12-25") return "Festive light day";
    if (w === 6) return "Mock day";
    if (w === 0) return "Light day";
    return ph.name;
  }

  /* ---------- morning (both workout modes) ---------- */
  function morning(add, s, w, S, wo, weekday, am) {
    var listen = C.listen[s];
    var touchText = ankiText(s, w, "Anki, 10 min") + "\nDo the cards by a window or on the balcony — 5–10 min of daylight early resets your sleep clock.\nPhone rule: no phone until this card batch is done. It charges in the hall tonight, not next to your bed.";
    function listenSlot(a, b) {
      if (listen && listen[0] && listen[0] !== "—") add(a, b, "light", "G", "Listening (core)" + (weekday ? " while breakfast heats" : ""), listen[0] + "\nOne pass eyes-closed, one pass with transcript/subtitles, then shadow 3 sentences aloud.", { needs: ["headphones"] });
      else add(a, b, "light", "G", "Speak-and-shadow (10 min)", "Read yesterday’s Nicos Weg dialogue aloud twice; record it once on your phone and compare with the DW audio.", { needs: ["speak"] });
    }
    var bfEnd = weekday ? "08:30" : "09:00";
    if (!am) {
      add("07:00", "07:15", "light", "G", "Wake · water · daylight · German touch #1 BEFORE the phone", touchText, { needs: ["silent"] });
      listenSlot("07:15", "07:35");
      mealSlot(add, "07:35", bfEnd, S, w, "bf", "Breakfast" + (weekday ? " for Dad and you" : ""), { });
    } else {
      var ws = (w === 0) ? 390 : (w === 6) ? 330 : 300;
      var pre = "Glass of water; a banana or 2 dates if you need fuel. Check the AQI before you step out (rule in the workout card).";
      add(hhmm(ws), hhmm(ws + 15), "anchor", "L", "Wake · water · light snack · AQI check", pre);
      var wst = ws + 15, wend = wst + wo.min;
      add(hhmm(wst), hhmm(wend), "move", "F", wo.title, wo.detail, { links: wo.links, wmin: wo.min });
      var sh = Math.max(wend + 25, 405 + (w === 6 ? 30 : 0) + (w === 0 ? 45 : 0));
      add(hhmm(wend), hhmm(sh), "anchor", "L", "Shower · get ready", "Breathe, rehydrate.");
      add(hhmm(sh), hhmm(sh + 15), "light", "G", "German touch #1 BEFORE the phone", touchText, { needs: ["silent"] });
      listenSlot(hhmm(sh + 15), hhmm(sh + 35));
      mealSlot(add, hhmm(sh + 35), bfEnd, S, w, "bf", "Breakfast" + (weekday ? " for Dad and you" : ""), { });
    }
    if (weekday) add("08:30", "08:45", "anchor", "L", "Desk reset · write the ‘next step’ line", "Clear the desk, open today’s page, write one line for each deep block so nothing needs deciding. Timer visible, phone face-down.");
    return bfEnd;
  }

  function eveningTail(add, s, w, S, am, afterTime) {
    add(afterTime, "20:15", "free", "L", am ? "Free time" : "Free / shower / early dinner", "Eat, unwind.");
  }

  /* ---------- bedtime ramp + evening tail ---------- */
  function lightsOut(s) {
    if (s <= "2026-10-23") return "01:00";
    if (s === "2026-10-24") return "23:30";
    if (s === "2026-10-25") return "00:00";
    if (s <= "2026-11-01") return "00:30";
    if (s <= "2026-11-08") return "00:00";
    if (s <= "2026-11-15") return "23:30";
    return "23:00";
  }
  function tailSlots(add, s, am) {
    if (am) { add("21:30", "22:00", "anchor", "L", "Wind-down · lights out 22:00", "Screens away by 21:30; the phone charges in the hall. Your 05:00 wake needs 7 h of sleep."); return; }
    var lo = lightsOut(s);
    add("21:30", "22:30", "free", "L", "Free window · Netflix / chat / reels (earned, ≤ 60 min)", "Earned once today’s blocks are ticked. Set a 60-minute timer. Nothing new to learn here. When it rings you are done: the phone goes to the hall to charge.");
    add("22:30", "23:59", "anchor", "L", "Wind-down · phone parked · lights out " + lo, "Phone in the hall, light dim, shower/stretch/read a paper book. Lights out " + lo + (lo === "23:00" ? " — your target (8 h until 07:00)." : " — this week’s step toward 23:00. Wake stays 07:00; every earlier night makes the days easier."));
  }

  /* ---------- weekday ---------- */
  function weekdayDay(add, s, w, wk, tw, ph, S, deloitte, live, wo, am) {
    var P = ph.id, np = C.nptel[s], nw = nwFor(s), tl = techLight(s, w, tw);
    var A = blockA(s, w, wk, tw, ph, S), M = blockM(s, w, wk, tw, ph, S), B1 = blockB1(s, w, wk, tw, ph, S);

    add("08:45", "09:55", "deep", A.dom, "Block A · " + A.t, A.d, { needs: ["speak"] });
    add("09:55", "10:00", "anchor", "L", deloitte ? "10:00 login ritual" : "10:00 VIRTUAL LOGIN ritual (your new anchor)", deloitte ? "Open Teams/work tools, set status, phone face-down. Deloitte tasks first if anything is waiting." : "Deloitte is over: stand up, glass of water, open this page, start the timer — the same ritual as the old login, because the routine is what carries you.");

    var am1 = meal(S, w, "am");
    var t = "10:00";
    if (deloitte) {
      add("10:00", "10:30", "buffer", "L", "Deloitte check-in + buffer · mid-morning snack", "Do whatever Deloitte needs (usually < 1 h in a day). If nothing, start the next slot early.\nSnack: " + am1.t + " — " + am1.d);
      t = "10:30";
    } else {
      add("10:00", "10:15", "meal", "E", "Mid-morning snack · " + am1.t, am1.d);
      t = "10:15";
    }
    /* German NW / sectional */
    if (nw.length) {
      var nwEnd = hhmm(mins(t) + (nw.length >= 3 ? 45 : 30));
      add(t, nwEnd, "light", "G", "Nicos Weg · " + nwLabel(nw), "Per lesson: watch the scene → do the interactive steps → read the Hindi grammar tab → write 5 sentences of your own. ~15 min each.\nHindi hub: learngerman.dw.com/hi/nicos-weg/c-71245621", { needs: ["headphones"], links: [["Nicos Weg (Hindi)", "https://learngerman.dw.com/hi/nicos-weg/c-71245621"]] });
      t = nwEnd;
    } else if (deloitte) {
      var nwEnd2 = hhmm(mins(t) + 30);
      add(t, nwEnd2, "light", "G", "German · sectional drill (30 min)", "Pick the Teil you scored lowest in your last mock (file 02 §1: Hören / Lesen / Schreiben) and do one sectional set. Mark every miss and tag it.", { needs: ["headphones"] });
      t = nwEnd2;
    }
    if (mins(t) < 690) {
      add(t, "11:30", "light", P === 0 ? "J" : "J", P === 0 ? "GD minimum (10 min)" : "Joveo reading (light)", P === 0 ? C.gdMin : C.l0[w], { needs: [P === 0 ? "speak" : "silent"], links: [["joveo.com", "https://www.joveo.com/"]] });
    }
    if (tl && P >= 1) add("11:30", "12:00", "light", "T", tl.t, tl.d, { needs: ["silent"], optional: !!tl.opt });
    else add("11:30", "12:00", "buffer", "L", P === 0 ? "NPTEL quick recall (30 min, interruptible)" : "Buffer", P === 0 ? "Retrieval only: 20 MCQs or flash-recall of the DO-NOT-FORGET sheet. No new material." : "Spare slot — use it where you’re furthest behind.");
    add("12:00", "12:35", "light", P === 0 ? "N" : "J", P === 0 ? "NPTEL retrieval (35 min)" : "Joveo light block (35 min)", P === 0 ? C.nptelL1 : C.l1[w], { needs: ["silent", "speak?"] });
    add("12:35", "13:00", "anchor", "L", "Stretch · water · prep lunch", "Stand, stretch 3 min, big glass of water.");
    mealSlot(add, "13:00", "13:45", S, w, "lunch", "Lunch", {});
    add("13:45", "14:15", "light", "G", "German retrieval: Anki #2 + mini listening + numbers", ankiText(s, w, "Anki, 10 min") + "\nMini listening (10 min): " + ((C.listen[s] && C.listen[s][1] && C.listen[s][1] !== "—") ? C.listen[s][1] : "replay yesterday’s favourite clip") + "\nNumbers dictation (10 min): have Google TTS read 5 prices and 5 times — you write them.", { needs: ["headphones"] });
    add("14:15", "14:30", "anchor", "L", "Break · walk · water", "Away from the screen. If Deloitte pings during the next block, pause the timer, answer, resume.");
    add("14:30", "15:45", "deep", M.dom, "Block M · " + M.t, M.d, { needs: ["silent", "speak?"] });
    add("15:45", "16:00", "light", P === 0 ? "N" : "J", P === 0 ? "NPTEL flash recall (15 min)" : "Joveo flash questions (15 min)", (P === 0 ? C.nptelL2 : C.l2) + (C.nudges[s] ? "\n" + C.nudges[s] : "") + (live ? "\n" + live : ""), { needs: ["silent"] });
    var cur = 960;
    if (s === "2026-10-20") {
      add("16:00", "16:50", "light", "L", "SET-UP (today only, 50 min)",
        "1) Order the books: Netzwerk neu A1 Indian 4-book set (Amazon ASIN B0B25CN16Z, ≈₹1,329) + Grammatik aktiv A1–B1 (ASIN 9363646394, ≈₹549); optional ‘Fit fürs Goethe-Zertifikat A1’ Indian ed. (ASIN 8183072720, ≈₹310) — the order is yours to place; delivery shows ≈27 Oct.\n2) Install Anki; import deck 293204297; enable FSRS, retention 0.90, learning steps 1m 10m, 20 new/day, max interval 28 days, max reviews 200.\n3) Bookmark DW Nicos Weg (Hindi) and Deutschtrainer (Hindi).\n4) Check your PASSPORT is valid — it is the only ID accepted at the Goethe exam.\n5) Message Career Services about GD logistics (questions in file 09 §0).\n6) SCREEN TIME (Android): Settings → Digital Wellbeing → Dashboard — write down today’s hours (your baseline). Set app timers of 60 min each on Instagram, YouTube and Netflix. Turn on Bedtime mode (greyscale + Do Not Disturb) scheduled 22:30–07:00 and Focus mode for 08:45–18:00 (pauses the social apps). Move the reels apps off the home screen and pick the hall socket where the phone charges at night. On your PC install a site blocker (LeechBlock or Cold Turkey) for reels/Netflix sites during 08:45–18:00 — your choice; I can’t install it for you.\n7) Running tier: your test tonight decides; default is C (you said 5 km on a good day). If it feels hard, pick B.", { links: [["Goethe A1 exam page", "https://www.goethe.de/ins/in/en/spr/prf/gzsd1.cfm"]] });
      cur = 1010;
    } else if (w === 3 && s >= "2026-11-02" && s < "2026-12-30") {
      add("16:00", "16:30", "light", "C", "Germany lane · IELTS / APS (30 min, optional)", "IELTS vocabulary or one reading passage, or the next APS/application admin item from Career OS. Decision for you: keep this slot or drop it — Joveo and A1 are ahead of it in this plan.", { optional: true, needs: ["silent"] });
      cur = 990;
    }
    add(hhmm(cur), "17:00", "free", "L", "Free time (≥ 90 min of your day is protected)", "Walk, phone, music, tea. Two planned scroll windows of 10–15 min are fine; the first 30 min can serve as overflow buffer.");
    var pre = meal(S, w, "pre");
    add("17:00", "17:15", "meal", "E", "Evening snack · " + pre.t, pre.d + (am ? "" : "\n(This is also your pre-run snack: ~60–120 min before the 19:00 session.)"));
    add("17:15", "17:30", "light", "H", "Human touch (10 min)", "Message or call ONE person you like — a friend, a cousin, or just chat with Dad or Mum for 10 minutes. A small question or a meme is enough. Connection counts as part of the plan.");
    add("17:30", "18:00", "free", "L", deloitte ? "Free · Deloitte wrap-up (log off 18:00)" : "Free time", "Write the ‘next step’ line for tonight’s block. Body break: stretch 5 min.");

    /* ---- evening ---- */
    var b1End = am ? "19:15" : "19:00";
    var b1 = { dom: B1.dom, t: B1.t };
    add("18:00", b1End, "deep", B1.dom, "Block B1 · " + B1.t.replace(/ \(\d+ min\)/, ""), B1.d, { optional: !!B1.opt, needs: ["silent", "speak?"] });
    var tail = b1End;
    if (!am) {
      var wEnd = 1140 + wo.min, wEndR = Math.ceil(wEnd / 5) * 5;
      add("19:00", hhmm(wEndR), "move", "F", wo.title, wo.detail, { links: wo.links, wmin: wo.min });
      if (wEndR < 1215) add(hhmm(wEndR), "20:15", "anchor", "L", "Shower · cool-down · rehydrate", "Stretch 3 min, shower, water.");
      tail = "20:15";
    } else {
      add("19:15", "20:15", "free", "L", "Free time", "Eat late snack if hungry; unwind. Screens down by 21:00.");
    }
    mealSlot(add, "20:15", "21:00", S, w, "dinner", "Dinner", {});
    add("21:00", "21:30", "light", "M", "Evening close (30 min): speaking loop + log + tomorrow’s plan",
      "Speak (12 min): " + C.speakByDow[w] + " — voice AI examiner (prompts P1–P4 in file 06 §3.3); then ‘FEEDBACK’ prompt P5 in text.\n" + (P <= 2 ? "Joveo (8 min): record 3 × 60-second answers from today’s topics, replay one.\n" : "") + "Anki #3 (5 min).\nLog (3 min): what I did, one thing to fix. If-then for tomorrow: ‘If it is 08:45, then I open Block A.’", { needs: ["speak"] });
    tailSlots(add, s, am);
  }

  /* ---------- Saturday ---------- */
  function saturdayDay(add, s, w, wk, tw, ph, S, live, wo, am) {
    var P = ph.id, mock = C.mocks[s], j = C.jSat[s], gd = C.gd[s], np = C.nptel[s];
    var d1;
    if (np && np.sat) d1 = { dom: "N", t: np.sat.t, d: np.sat.d, m: np.sat.m || 90 };
    else if (gd) d1 = { dom: "J", t: gd.t, d: gd.d, m: gd.m || 90 };
    else if (j) d1 = { dom: "J", t: j.t, d: j.d, m: j.m };
    else d1 = { dom: "J", t: "Joveo · open session", d: "One timed case + one guesstimate + 5 quant questions, then fix your top weakness. Optional peer mock if someone is free.", m: 80 };
    if (s === "2026-12-05") d1 = { dom: "J", t: "Joveo · light (exam soon)", d: "20 min: stories aloud + the keyword strip. Nothing hard before the dress-rehearsal mock.", m: 30 };
    var st = 570, en = st + d1.m;
    add(hhmm(st), hhmm(en), "deep", d1.dom, "Deep 1 · " + d1.t, d1.d, { needs: ["speak"] });
    add(hhmm(en), hhmm(en + 20), "anchor", "L", "Break", "Stand up, water, 5 min outside or at a window.");
    var mm = null, cur = 960;
    var lunchStart = Math.max(en + 30, 780);
    if (lunchStart - (en + 20) >= 45) add(hhmm(en + 20), hhmm(lunchStart), "light", "H", "Get out (45–60 min): café, market, park or library", "Leave the house today — with someone if you can, alone is fine. Take your earphones, keep the phone in your pocket, and pick one thing to look at or buy. Daylight and a change of scene are part of the plan.");
    else add(hhmm(en + 20), hhmm(lunchStart), "free", "L", "Free", "Rest.");
    mealSlot(add, hhmm(lunchStart), hhmm(lunchStart + 45), S, w, "lunch", "Lunch", {});
    add(hhmm(lunchStart + 45), "14:30", "anchor", "L", "Rest", "No study. Rest, shower.");
    if (np && np.sat) {
      /* NPTEL final day: no Deep 2 */
      add("14:30", "15:30", "free", "L", "Rest · early evening off", "Nothing more to learn. Eat well, rest.");
      cur = 930;
    } else if (mock) {
      mm = mock.m || 105;
      add("14:30", hhmm(870 + mm), "deep", "G", "Deep 2 · " + mock.n, mock.what + "\nBefore you start: phone out of the room, printed paper or exam-like screen, timer visible. After: mark with the official scoring sheet, tag every miss, add the tags to your error log." + (live ? "\n" + live : ""), { links: [["Goethe free sets", "https://www.goethe.de/ins/cs/de/spr/prf/gzsd1/ueb.html"]] });
      add(hhmm(870 + mm), hhmm(900 + mm), "light", "G", "Debrief + error log (30 min)", "Raw score vs the 36/60 pass line; the 3 weakest items; one Anki card or grammar fix per miss.");
      cur = 900 + mm;
    } else if (P === 5 || P === 6) {
      add("14:30", "15:30", "deep", "C", "Germany lane / German A2 (optional, 60 min)", "Next item from the Career OS Deadlines page (IELTS/APS/SOP), or Nicos Weg A2 (learngerman.dw.com/en/nicos-weg/c-36519797): 2 lessons. Skip it if the week was heavy." + (live ? "\n" + live : ""), { optional: true });
      cur = 930;
    } else {
      add("14:30", "16:00", "deep", "G", "Deep 2 · German weekend session", (P === 2 ? "Catch up whatever you missed this week (Nicos Weg lessons, workbook chapter) then 20 min of writing typed on a German layout." : "German as needed: weak-Teil drill and a typed writing task.") + (live ? "\n" + live : ""));
    }
    var nwSat = nwFor(s);
    if (nwSat.length) {
      add(hhmm(cur), hhmm(cur + 30), "light", "G", "Nicos Weg · " + nwLabel(nwSat), "Per lesson: watch the scene → do the interactive steps → read the Hindi grammar tab → write 5 sentences of your own.", { needs: ["headphones"], links: [["Nicos Weg (Hindi)", "https://learngerman.dw.com/hi/nicos-weg/c-71245621"]] });
      cur += 30;
    }
    var pre = meal(S, w, "pre");
    var snackAt = Math.max(cur, 1020);
    if (cur < 1020) add(hhmm(cur), "17:00", "free", "L", "Free time", "Friends, family, walk. No screens for learning.");
    add(hhmm(snackAt), hhmm(snackAt + 15), "meal", "E", "Snack · " + pre.t, pre.d);
    var snackEnd = snackAt + 15;
    if (!am) {
      var wEnd = Math.ceil((1095 + wo.min) / 5) * 5;
      if (snackEnd < 1095) add(hhmm(snackEnd), "18:15", "free", "L", "Free", "Ease into the evening; AQI check at 17:45.");
      add("18:15", hhmm(wEnd), "move", "F", wo.title, wo.detail, { links: wo.links, wmin: wo.min });
      add(hhmm(wEnd), "20:15", "anchor", "L", "Shower · rehydrate", "Stretch, shower, water.");
    } else {
      add(hhmm(snackEnd), "20:15", "free", "L", "Evening free", "Friends, family, play — this is your fun block.");
    }
    mealSlot(add, "20:15", "21:00", S, w, "dinner", "Dinner", {});
    add("21:00", "21:30", "light", "M", "Evening close (30 min)", "Speak (12 min): " + C.speakByDow[6] + ". Anki #3 (5 min). Log + tomorrow’s plan (5 min). Weekly review is tomorrow at 16:00.", { needs: ["speak"] });
    tailSlots(add, s, am);
  }

  /* ---------- Sunday ---------- */
  function sundayDay(add, s, w, wk, tw, ph, S, wo, am) {
    var gd = C.gd[s], k = Math.min(Math.max(tw, 1), 8), P = ph.id;
    var nwTest = (s === "2026-11-22");
    var slowStart = am ? "09:15" : "09:00";
    add(slowStart, "09:45", "anchor", "L", "Slow morning", "Sunday is the one light day: ≤ 2 hours of learning in total.");
    add("09:45", "10:00", "light", "G", "Anki reviews (15 min, reviews only on Sundays)", ankiText(s, w, "Anki") + (C.listen[s] ? "\nListening later today: " + C.listen[s][0] : ""), { needs: ["silent"] });
    var cur = "10:00";
    if (nwTest) { add("10:00", "10:30", "light", "G", "Nicos Weg FINAL TEST A1 (N77)", "DW’s free A1 final test — a checkpoint, not a verdict. Note your score and the 3 topics you missed.", { links: [["Nicos Weg (Hindi)", "https://learngerman.dw.com/hi/nicos-weg/c-71245621"]] }); cur = "10:30"; }
    if (tw >= 1) {
      var ds = C.tech.dsa[k];
      add(cur, hhmm(mins(cur) + 45), "deep", "T", "DSA timed mock (45 min)", ds.sun, { needs: ["silent"] });
      cur = hhmm(mins(cur) + 60);
      add(cur, hhmm(mins(cur) + 45), "deep", "T", "AI goal slot · applied AI on your own project (45 min)", C.applied[k] + "\n(‘Clear AI’ = strong tech and AI: this is the hands-on half.)", { needs: ["silent"] });
      cur = hhmm(mins(cur) + 60);
    }
    var lunchAt = Math.max(mins(cur), 750);
    mealSlot(add, hhmm(lunchAt), hhmm(lunchAt + 45), S, w, "lunch", "Lunch", {});
    if (mins(cur) < lunchAt) add(cur, hhmm(lunchAt), "free", "L", "Free", "Rest.");
    if (C.listen[s] && C.listen[s][0] !== "—") add(hhmm(lunchAt + 60), hhmm(lunchAt + 80), "light", "G", "Listening (core, 20 min)", C.listen[s][0] + (C.listen[s][1] && C.listen[s][1] !== "—" ? "\nMini: " + C.listen[s][1] : ""), { needs: ["headphones"] });
    add("14:30", "16:00", "free", "L", "Rest · family · fun", "No screens for learning. This is a real rest block. Even 20 minutes outside counts. Option: a guest visit to the Noida Toastmasters Online Club (Sundays, check the schedule on toastmasters.org) — real people and speaking practice.");
    add("16:00", "16:30", "light", "M", "WEEKLY REVIEW (30 min)", "Write one number per goal: German hours + mock score; Joveo mocks + scorecard average; tech problems solved; workouts done; average daily screen time; average hours slept. Name the one thing to change next week. Send the numbers to one person (accountability) — that is what makes the review work.");
    if (gd) add("16:30", "17:00", "light", "J", gd.t, gd.d);
    else if (s >= "2026-11-02") add("16:30", "16:50", "light", "J", "Joveo maintenance (20 min)", "One random GD topic card + 2 openers aloud, and re-read the one-page keyword strip.");
    var pre = meal(S, w, "pre");
    add("17:00", "17:15", "meal", "E", "Snack · " + pre.t, pre.d);
    if (s >= "2026-11-01") add("17:15", "18:00", "light", "C", "Germany lane · IELTS / APS (45 min, optional)", "IELTS prep or the next APS/application admin item from the Career OS Deadlines page. One item only. Keep or drop? — your call.", { optional: true, needs: ["silent"] });
    if (am) {
      /* rest day: workout card already placed in the morning */
    } else {
      add("18:00", "19:00", "free", "L", "Free", "Ease into the evening.");
      add("19:00", hhmm(1140 + Math.ceil(wo.min / 5) * 5), "move", "F", wo.title, wo.detail, { links: wo.links, wmin: wo.min });
    }
    var dEnd = am ? "18:00" : hhmm(1140 + Math.ceil(wo.min / 5) * 5);
    if (am) add("18:00", "20:15", "free", "L", "Evening free", "Family, friends, play.");
    else add(dEnd, "20:15", "free", "L", "Free", "Shower, unwind.");
    mealSlot(add, "20:15", "21:00", S, w, "dinner", "Dinner", {});
    add("21:00", "21:30", "light", "M", "Evening close (30 min)", "Speak (12 min): " + C.speakByDow[0] + ". Anki #3 (5 min). Plan tomorrow: Block A is " + (s < "2026-11-02" ? "your NPTEL/GD block" : "your case/PI block") + ".", { needs: ["speak"] });
    tailSlots(add, s, am);
  }

  /* ---------- special days ---------- */
  function offDay(add, s, w, S) {
    add("08:00", "09:00", "meal", "E", "Breakfast · " + meal(S, w, "bf").t, meal(S, w, "bf").d);
    add("09:00", "13:30", "free", "L", "DAY OFF — go enjoy your plans", "Nothing is scheduled today, on purpose. Nothing is rescheduled either: your NPTEL plan already accounts for this day, and the German lessons are caught up on 26–28 Oct. Eat properly, drink water, be back on plan tomorrow.");
    mealSlot(add, "13:30", "14:15", S, w, "lunch", "Lunch (adjust to your plans)", {});
    add("14:15", "20:30", "free", "L", "DAY OFF — enjoy", "Plans, friends, family. No screens for learning.");
    mealSlot(add, "20:30", "21:15", S, w, "dinner", "Dinner (adjust to your plans)", {});
    add("21:30", "21:45", "light", "G", "Optional: Anki 10 min", "Only if you feel like keeping the streak alive. Zero guilt if not.", { optional: true });
    add("21:45", "23:00", "anchor", "L", "Wind-down", "Sleep by 23:00 — tomorrow is a full day.");
  }
  function nptelExamDay(add, S, w) {
    add("07:30", "07:45", "light", "G", "Wake · water · Anki 10 min", "Light touch only; phone after.");
    var bf = (C.meals && C.meals.special && C.meals.special.exam) || meal(S, w, "bf");
    add("07:45", "09:00", "meal", "E", "Breakfast · " + bf.t, bf.d);
    add("09:30", "10:15", "light", "N", "Gentle recall (45 min, nothing new)", "Cover-and-recall the DO-NOT-FORGET page (file 13 §D). Stop at 10:15 — no cramming today.");
    add("10:15", "11:00", "anchor", "L", "Pack and dress", "Professional attire — NO shorts. In your hands: printed hall ticket (A4) · ONE original photo ID (College ID, Aadhaar, Passport, PAN or Driving licence) · your own pen/pencil · transparent water bottle. NOT allowed inside: phone, watch, wallet, bag, food — keep them outside at your own risk.");
    add("11:00", "11:30", "meal", "E", "Light early lunch · familiar food only", "Something you know sits well: dal-chawal or khichdi with a little curd, a banana. Small portion, not oily, nothing new. Carry water in a transparent bottle (food is not allowed inside the hall).");
    add("11:30", "13:00", "anchor", "L", "Travel to the centre", "iON Digital Zone iDZ 2, Mathura Road (A-27 Mohan Co-op Industrial Estate, near Sarita Vihar Metro, New Delhi 110044). Aim to arrive by 12:30; reporting time is 13:00.");
    add("13:00", "17:00", "event", "N", "NPTEL Innovation, Business Models & Entrepreneurship — EXAM (afternoon session, 14:00–17:00)", "13:00 report · 13:40 take your seat · 13:50 log in and read the instructions · 14:00 exam starts · 14:30 gate closes · you cannot leave before 15:30 · submit is enabled from 15:30 · 17:00 exam ends (180 minutes). Write your name and registration number on the A4 rough sheets before using them; return them at the end. An on-screen scientific calculator is available. Read each question twice, flag and return, and press SUBMIT when done.", { links: [["On-screen scientific calculator (practise 5 min)", "https://www.tcsion.com/OnlineAssessment/ScientificCalculator/Calculator.html"]] });
    add("17:00", "19:00", "anchor", "L", "Travel home · eat something", "No studying. Send one friend a one-word message: ‘done!’");
    add("19:00", "20:15", "free", "L", "Rest", "You did the work. Let it be done.");
    mealSlot(add, "20:15", "21:00", S, w, "dinner", "Dinner", {});
    add("21:00", "21:20", "light", "M", "Minimum viable day (20 min)", "10 min Anki · 5 min listening · say 1 story aloud. Tomorrow restarts the full plan (Monday 26 Oct: weekly review + the GD programme begins).", { needs: ["headphones"] });
    tailSlots(add, "2026-10-25", false);
  }
  function diwali(add, s, w, S) {
    add("07:30", "07:45", "light", "G", "Anki 10 min", "Reviews only.");
    add("09:00", "21:00", "free", "L", "DIWALI — family, food, light", "No deep work today. Enjoy the sweets in moderation.");
    add("21:00", "21:20", "light", "J", "Minimum viable day (20 min)", "10 min Anki + 1 story aloud + 10 min easy audio (CBG 16 shopping).");
  }
  function examDay(add, S, w) {
    var bf = (C.meals && C.meals.special && C.meals.special.exam) || { t: "Light familiar breakfast", d: "Something you know sits well; water. No new foods today." };
    add("06:30", "07:15", "meal", "E", "Wake · breakfast · " + bf.t, bf.d);
    add("07:15", "07:25", "move", "F", "10-minute minimum workout", CONTENT.mvw);
    add("07:25", "07:40", "light", "G", "Warm-up aloud (10 min)", "Self-introduction (Name, Alter, Land, Wohnort, Sprachen, Beruf/Studium, Hobby) twice; spell your name with German letter names; say your phone number and 3 prices.", { needs: ["speak"] });
    add("07:40", "08:15", "anchor", "L", "Bag check", "ORIGINAL PASSPORT (only accepted ID) · booking confirmation/admission email printed or on phone · water. No phones or watches in the exam room; there is no waiting area.");
    add("08:15", "17:00", "event", "G", "GOETHE A1 · START DEUTSCH 1 — New Delhi (Max Mueller Bhavan)", "Arrive at the time on your admission email. Written block is 65 min with no break (Hören → Lesen → Schreiben), typed on a Goethe laptop with a German keyboard and headphones; then Sprechen in a group of up to 4. Tip: in Sprechen Teil 2 and 3, asking a question or making a request scores more than answering. Fees are non-refundable.", { links: [["Goethe India A1 page", "https://www.goethe.de/ins/in/en/spr/prf/gzsd1.cfm"]] });
    add("17:00", "23:00", "free", "L", "Done. Eat, rest, no study", "Results appear on MeinGoethe on the date shown at registration. Tomorrow is a rest day.");
  }
  function taperDay(add, s, w, S) {
    add("07:00", "07:15", "light", "G", "Wake · Anki reviews 10 min (no new cards)", "Reviews only.");
    mealSlot(add, "07:15", "08:30", S, w, "bf", "Breakfast", {});
    add("10:00", "10:45", "light", "G", "Light run-through (40 min)", "Self-introduction ×3 aloud · spelling + numbers · one Hören Teil 1 sectional · skim the Wortliste word groups. Stop at 10:45.", { needs: ["speak"] });
    var wo = workout(s, w, weekOf(s), S);
    add("12:00", "12:30", "move", "F", wo.title, wo.detail, { links: wo.links, wmin: wo.min });
    mealSlot(add, "13:00", "13:45", S, w, "lunch", "Lunch", {});
    add("14:00", "14:30", "light", "L", "Logistics (30 min)", "Pack: ORIGINAL passport + booking confirmation. Route to Max Mueller Bhavan, K.G. Marg, Delhi; leave early. Check the admission email for the report time. Alarm 06:15.");
    mealSlot(add, "19:30", "20:15", S, w, "dinner", "Early light dinner", {});
    add("21:00", "21:15", "light", "G", "Anki reviews 5 min", "Then screens away.");
    add("21:30", "22:30", "anchor", "L", "Early night", "Lights out by 22:30. Sleep is worth more than another hour of revision.");
  }
  function festive(add, s, w, wk, S) {
    add("07:30", "07:45", "light", "G", "Anki 10 min", "Reviews only.");
    mealSlot(add, "08:00", "09:00", S, w, "bf", "Breakfast", {});
    add("10:00", "10:30", "light", "J", "One story aloud + keyword strip (30 min)", "Keep one thread alive: say one story aloud, re-read your keyword strip. Then you’re done for the day.");
    var wo = workout(s, w, wk, S);
    add("17:30", "18:00", "move", "F", wo.title, wo.detail, { links: wo.links, wmin: wo.min });
    mealSlot(add, "13:00", "13:45", S, w, "lunch", "Lunch", {});
    mealSlot(add, "20:15", "21:00", S, w, "dinner", "Dinner", {});
    add("21:00", "21:20", "light", "M", "Minimum viable day (20 min)", "10 min Anki + 5 min listening + one line of log.");
    add("21:30", "23:00", "anchor", "L", "Wind-down", "Lights out 23:00.");
  }
  function yearEnd(add, s, w, wk, S) {
    add("07:00", "07:15", "light", "G", "Wake · water · Anki 10 min", "Reviews only.");
    mealSlot(add, "07:30", "08:30", S, w, "bf", "Breakfast", {});
    var wo = workout(s, w, wk, S);
    add("08:30", hhmm(510 + Math.ceil(wo.min / 5) * 5), "move", "F", wo.title, wo.detail, { links: wo.links, wmin: wo.min });
    add("10:00", "12:00", "deep", "M", "YEAR-END REVIEW (120 min)", "1) Numbers: German A1 result + best mock, Joveo mocks and scorecard average, tech problems solved, workouts done, sleep average. 2) Wins: write 10 things that went better than October-you would have expected. 3) Misses: 3 things that didn’t happen, and why (honest, kind). 4) Open loops: Joveo status, results, applications, IELTS/APS. 5) 2027 first 4 weeks: one lane at a time, the 3 weekly priorities, the daily non-negotiables. Send the summary to one person.");
    mealSlot(add, "13:00", "13:45", S, w, "lunch", "Lunch", {});
    add("15:00", "16:00", "light", "M", "Thank-yous (60 min)", "Short thank-you notes to the people who helped you this term (Career Services, mentors, mock partners, the tutor).");
    add("17:00", "20:00", "free", "L", "Celebrate", "You did the work. Do something you actually enjoy.");
    mealSlot(add, "20:15", "21:15", S, w, "dinner", "Dinner (celebration allowed)", {});
    add("21:30", "23:00", "anchor", "L", "Wind-down", "Lights out 23:00. Happy new year ahead.");
  }

  function finish(day) {
    var deep = 0;
    day.slots.sort(function (a, b) { return mins(a.start) - mins(b.start); });
    day.slots.forEach(function (x) { if (x.type === "deep") deep += x.min; });
    day.deepMin = deep;
  }

  root.PLAN = { START: START, END: END, build: build, addDays: addDays, dow: dow, nice: nice, mins: mins, D: D, iso: iso, phase: phase, DOW: DOW, MON: MON, weekOf: weekOf };
  if (typeof module !== "undefined") module.exports = root.PLAN;
})(typeof window !== "undefined" ? window : globalThis);
