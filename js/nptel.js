/* =========================================================================
   nptel.js — NPTEL exam tracker (Oct 2026): countdowns, week-by-week
   coverage, mock scores, weakness register, and a day-by-day plan to
   16 Oct (Programming with Generative AI) and 25 Oct (Innovation, Business
   Models and Entrepreneurship). Self-contained: state lives in STATE.nptel,
   created lazily, so no CONTENT_VERSION migration is needed.
   ========================================================================= */

const NPTEL_COURSES = {
  genai: {
    name: "Programming with Generative AI",
    short: "GenAI",
    who: "Prof. Viraj Kumar · IISc Bangalore",
    exam: "2026-10-16",
    url: "https://nptel.ac.in/courses/106108703"
  },
  innov: {
    name: "Innovation, Business Models and Entrepreneurship",
    short: "Innovation",
    who: "Prof. Rajat Agrawal & Prof. Vinay Sharma · IIT Roorkee",
    exam: "2026-10-25",
    url: "https://nptel.ac.in/courses/110107094"
  }
};

// Only weeks 6-8 of the Innovation course were verified (from the NPTEL page
// snippet); every other title is a blank for the user to fill from the real
// syllabus — nothing here is invented.
const NPTEL_VERIFIED_TOPICS = {
  innov: {
    6: "Sustainability innovation & entrepreneurship; innovation context & pattern; SMEs in sustainable development",
    7: "Management of innovation; creation of IPR; types of IPR; patents & copyrights; patents in India",
    8: "Business models & value proposition; business model failure; incubators; managing investors; future markets & innovation needs for India"
  }
};

function nptelState() {
  if (!STATE.nptel) {
    STATE.nptel = { done: {}, courses: {}, session: {} };
    Object.keys(NPTEL_COURSES).forEach(k => {
      STATE.nptel.courses[k] = {
        weeks: Array.from({ length: 8 }, (_, i) => ({
          topic: (NPTEL_VERIFIED_TOPICS[k] || {})[i + 1] || "",
          lectures: false, assignment: false, revised: false
        })),
        mocks: [], weak: []
      };
    });
  }
  return STATE.nptel;
}

/* ---- day-by-day plan (4 slots/day; career block is dropped in the final 72h of each exam) ---- */
function nptelPlan() {
  const G = "GenAI", I = "Innovation";
  const d = (date, theme, tasks) => ({ date, theme, tasks });
  return [
    d("2026-10-06", "Verify + diagnostics", [
      [G, "Confirm hall ticket (date, session, centre) for both exams", 20],
      [G, "Diagnostic test: GenAI (ask Claude for it)", 60],
      [I, "Diagnostic test: Innovation (ask Claude for it)", 45],
      ["Career", "Add this tracker to Career OS / push to Vercel", 20]]),
    d("2026-10-07", "GenAI Wk 1–2", [[G, "Learn Wk 1–2 + weekly assignment review", 120], [G, "20 MCQs + code-output drill", 40], [I, "Wk 1 first pass", 45], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-08", "GenAI Wk 3–4", [[G, "Learn Wk 3–4 + assignment review", 120], [G, "20 MCQs + active recall of Wk 1–2", 40], [I, "Wk 2 first pass", 45], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-09", "GenAI Wk 5–6", [[G, "Learn Wk 5–6 + assignment review", 120], [G, "20 MCQs + recall of Wk 1–4", 40], [I, "Wk 3 first pass", 45], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-10", "GenAI Wk 7–8", [[G, "Learn Wk 7–8 + assignment review", 120], [G, "Mixed quiz, Wk 1–8 (timed)", 45], [I, "Wk 4 first pass", 45], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-11", "GenAI weak spots", [[G, "Update weakness register; reteach worst 3 topics", 90], [G, "Half mock (Wk 1–4), timed", 60], [I, "Wk 5 first pass", 45], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-12", "GenAI mock 1", [[G, "FULL mock 1, timed; no peeking", 75], [G, "Error analysis + reteach", 75], [I, "Wk 6 first pass", 45], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-13", "GenAI repair", [[G, "Repair mock-1 errors; re-test same topics", 120], [G, "Code-tracing drills (output prediction)", 45], [I, "Wk 7 first pass", 45]]),
    d("2026-10-14", "GenAI mock 2", [[G, "FULL mock 2, timed", 75], [G, "Error analysis; build DO-NOT-FORGET sheet", 75], [I, "Wk 8 first pass", 45]]),
    d("2026-10-15", "GenAI final 24h", [[G, "Light: DO-NOT-FORGET sheet + assignment skim (max 90 min)", 90], [G, "Prep ID, hall ticket, route to centre; sleep early", 15]]),
    d("2026-10-16", "EXAM DAY — GenAI", [[G, "GenAI EXAM. Then 30 min Innovation skim in the evening only", 30]]),
    d("2026-10-17", "Innovation reset + diagnostic", [[I, "Rest in the morning; Innovation diagnostic + weak map", 90], [I, "Wk 1–2 deep pass + MCQs", 90], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-18", "Innovation Wk 1–3", [[I, "Wk 1–3 definitions, frameworks, examples", 150], [I, "Recall + 25 MCQs", 45], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-19", "Innovation Wk 4–6", [[I, "Wk 4–6 frameworks + blue ocean + sustainability", 150], [I, "Recall of Wk 1–3 + 25 MCQs", 45], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-20", "Innovation Wk 7–8", [[I, "Wk 7–8: IPR/patents, business models, incubators, investors", 150], [I, "Mixed quiz Wk 1–8, timed", 45], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-21", "Innovation mock 1", [[I, "FULL mock 1, timed", 75], [I, "Error analysis + reteach", 90], ["Career", "30-min Career OS block", 30]]),
    d("2026-10-22", "Innovation repair", [[I, "Repair weaknesses; easily-confused-terms drill", 120], [I, "Assignment re-solve (all 8 weeks)", 60]]),
    d("2026-10-23", "Innovation mock 2", [[I, "FULL mock 2, timed", 75], [I, "Error analysis; DO-NOT-FORGET sheet", 90]]),
    d("2026-10-24", "Innovation final 24h", [[I, "Light: DO-NOT-FORGET sheet + traps (max 90 min)", 90], [I, "Prep ID, hall ticket, route; sleep early", 15]]),
    d("2026-10-25", "EXAM DAY — Innovation", [[I, "Innovation EXAM. Rest after.", 0]])
  ];
}

/* ---- actions ---- */
function nptelToggleDay(date, idx) {
  const s = nptelState(), k = date + "#" + idx;
  s.done[k] = !s.done[k];
  saveState(); renderNptel();
}
function nptelToggleWeek(c, i, f) {
  const w = nptelState().courses[c].weeks[i];
  w[f] = !w[f];
  saveState(); renderNptel();
}
function nptelSetTopic(c, i, v) {
  nptelState().courses[c].weeks[i].topic = v.trim();
  saveState();
}
function nptelSetSession(c, v) {
  nptelState().session[c] = v.trim();
  saveState();
}
function nptelAddMock(c) {
  const label = document.getElementById("mock-label-" + c).value.trim() || "Mock";
  const score = parseFloat(document.getElementById("mock-score-" + c).value);
  const total = parseFloat(document.getElementById("mock-total-" + c).value);
  if (!(total > 0) || isNaN(score) || score < 0 || score > total) { toast("Enter a valid score and total"); return; }
  nptelState().courses[c].mocks.push({ id: uid("m"), date: todayISO(), label, score, total });
  saveState(); renderNptel(); toast("Mock logged");
}
function nptelDelMock(c, id) {
  const cs = nptelState().courses[c];
  cs.mocks = cs.mocks.filter(m => m.id !== id);
  saveState(); renderNptel();
}
function nptelAddWeak(c) {
  const topic = document.getElementById("weak-topic-" + c).value.trim();
  if (!topic) { toast("Topic required"); return; }
  nptelState().courses[c].weak.push({
    id: uid("w"), topic,
    acc: document.getElementById("weak-acc-" + c).value.trim(),
    note: document.getElementById("weak-note-" + c).value.trim(),
    priority: document.getElementById("weak-pri-" + c).value
  });
  saveState(); renderNptel();
}
function nptelDelWeak(c, id) {
  const cs = nptelState().courses[c];
  cs.weak = cs.weak.filter(w => w.id !== id);
  saveState(); renderNptel();
}

/* ---- derived numbers ---- */
function nptelCoverage(c) {
  const w = nptelState().courses[c].weeks;
  const pts = w.reduce((a, x) => a + (x.lectures ? 1 : 0) + (x.assignment ? 1 : 0) + (x.revised ? 1 : 0), 0);
  return Math.round(pts / (w.length * 3) * 100);
}
function nptelReadiness(c) {
  const m = nptelState().courses[c].mocks.slice(-2);
  if (!m.length) return null;
  return Math.round(m.reduce((a, x) => a + x.score / x.total * 100, 0) / m.length);
}
function nptelDaysTo(iso) { return daysBetween(todayISO(), iso); }

/* ---- render ---- */
function renderNptel() {
  const el = document.getElementById("view-nptel");
  const s = nptelState();
  const today = todayISO();
  const plan = nptelPlan();
  const priBadge = { Critical: "badge-critical", High: "badge-serious", Low: "badge-neutral" };

  const countdown = Object.entries(NPTEL_COURSES).map(([k, c]) => {
    const n = nptelDaysTo(c.exam);
    const cov = nptelCoverage(k), rd = nptelReadiness(k);
    return `<div class="card stat-tile">
      <div class="value">${n > 0 ? n : n === 0 ? "TODAY" : "Done"}${n > 0 ? "<span style='font-size:14px'> days</span>" : ""}</div>
      <div class="label">${escapeHtml(c.short)} exam · ${fmtDate(c.exam)}</div>
      <div class="delta muted">Coverage ${cov}% · ${rd == null ? "no mock yet" : "mock avg " + rd + "%"}</div>
    </div>`;
  }).join("");

  const todayPlan = plan.find(p => p.date === today);
  const planRows = plan.map(p => {
    const past = p.date < today, isToday = p.date === today;
    return `<tr style="${isToday ? "background: color-mix(in srgb, var(--series-1) 10%, transparent);" : ""}${past ? "opacity:.7;" : ""}">
      <td style="white-space:nowrap;"><b>${fmtDate(p.date).replace(/, \d{4}/, "")}</b>${isToday ? " <span class='badge badge-warning'>today</span>" : ""}</td>
      <td>${escapeHtml(p.theme)}</td>
      <td>${p.tasks.map((t, i) => `<label class="flex" style="gap:8px;font-size:13px;margin:2px 0;"><input type="checkbox" ${s.done[p.date + "#" + i] ? "checked" : ""} onchange="nptelToggleDay('${p.date}',${i})" /> <b>${t[0]}</b>: ${escapeHtml(t[1])}${t[2] ? ` <span class="muted">(${t[2]} min)</span>` : ""}</label>`).join("")}</td>
    </tr>`;
  }).join("");

  const courseCard = (k) => {
    const c = NPTEL_COURSES[k], cs = s.courses[k];
    const rd = nptelReadiness(k);
    return `<div class="card mb-16">
      <div class="card-title-row"><h3><i class="fa-solid fa-graduation-cap"></i>&nbsp; ${escapeHtml(c.name)}</h3>
        <a class="btn btn-sm" href="${c.url}" target="_blank" rel="noopener">NPTEL page</a></div>
      <p class="muted">${escapeHtml(c.who)} · Exam ${fmtDate(c.exam)} · Readiness shown only from your last 2 mocks${rd == null ? " (none yet)" : ": <b>" + rd + "%</b>"}</p>
      <div class="field"><label>Exam session / centre (from your hall ticket)</label>
        <input type="text" value="${escapeHtml(s.session[k] || "")}" placeholder="e.g. forenoon, centre name" onchange="nptelSetSession('${k}', this.value)" /></div>

      <div class="section-title">Week-by-week coverage (${nptelCoverage(k)}%)</div>
      <div class="table-wrap"><table>
        <thead><tr><th>Wk</th><th>Topic (edit from official syllabus)</th><th>Lectures</th><th>Assignment</th><th>Revised</th></tr></thead>
        <tbody>${cs.weeks.map((w, i) => `<tr>
          <td><b>${i + 1}</b></td>
          <td><input type="text" style="width:100%;min-width:200px;" value="${escapeHtml(w.topic)}" placeholder="Add title from syllabus" onchange="nptelSetTopic('${k}',${i},this.value)" /></td>
          ${["lectures", "assignment", "revised"].map(f => `<td><input type="checkbox" ${w[f] ? "checked" : ""} onchange="nptelToggleWeek('${k}',${i},'${f}')" /></td>`).join("")}
        </tr>`).join("")}</tbody>
      </table></div>

      <div class="section-title">Mock / quiz scores</div>
      <div class="form-row">
        <div class="field"><label>Label</label><input type="text" id="mock-label-${k}" placeholder="Mock 1" /></div>
        <div class="field"><label>Score</label><input type="number" id="mock-score-${k}" min="0" /></div>
        <div class="field"><label>Out of</label><input type="number" id="mock-total-${k}" min="1" value="25" /></div>
        <div class="field"><label>&nbsp;</label><button class="btn btn-primary" onclick="nptelAddMock('${k}')">Log</button></div>
      </div>
      ${cs.mocks.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Label</th><th>Score</th><th>%</th><th></th></tr></thead><tbody>
        ${cs.mocks.map(m => `<tr><td>${fmtDate(m.date)}</td><td>${escapeHtml(m.label)}</td><td>${m.score}/${m.total}</td><td><b>${Math.round(m.score / m.total * 100)}%</b></td>
        <td><button class="icon-btn" onclick="nptelDelMock('${k}','${m.id}')"><i class="fa-solid fa-trash"></i></button></td></tr>`).join("")}</tbody></table></div>`
        : `<p class="muted">No mocks logged yet.</p>`}

      <div class="section-title">Weakness register</div>
      <div class="form-row">
        <div class="field"><label>Topic</label><input type="text" id="weak-topic-${k}" /></div>
        <div class="field"><label>Accuracy %</label><input type="text" id="weak-acc-${k}" /></div>
        <div class="field"><label>Priority</label><select id="weak-pri-${k}"><option>Critical</option><option selected>High</option><option>Low</option></select></div>
      </div>
      <div class="field"><label>What goes wrong</label><input type="text" id="weak-note-${k}" /></div>
      <button class="btn btn-sm mb-16" onclick="nptelAddWeak('${k}')"><i class="fa-solid fa-plus"></i> Add</button>
      ${cs.weak.length ? `<div class="table-wrap"><table><thead><tr><th>Topic</th><th>Acc.</th><th>Issue</th><th>Priority</th><th></th></tr></thead><tbody>
        ${cs.weak.map(w => `<tr><td>${escapeHtml(w.topic)}</td><td>${escapeHtml(w.acc)}</td><td class="muted">${escapeHtml(w.note)}</td>
        <td><span class="badge ${priBadge[w.priority] || "badge-neutral"}">${w.priority}</span></td>
        <td><button class="icon-btn" onclick="nptelDelWeak('${k}','${w.id}')"><i class="fa-solid fa-trash"></i></button></td></tr>`).join("")}</tbody></table></div>`
        : `<p class="muted">Empty — fills up from diagnostics and mocks.</p>`}
    </div>`;
  };

  el.innerHTML = `
    <div class="grid grid-2 mb-16">${countdown}</div>
    <div class="card mb-16">
      <div class="card-title-row"><h3><i class="fa-solid fa-bullseye"></i>&nbsp; Today</h3></div>
      ${todayPlan ? `<p><b>${escapeHtml(todayPlan.theme)}</b> — ${todayPlan.tasks.filter((t, i) => s.done[todayPlan.date + "#" + i]).length}/${todayPlan.tasks.length} blocks done</p>`
        : `<p class="muted">No plan day for today (plan runs 6–25 Oct 2026).</p>`}
      <p class="muted">NPTEL = primary · Career OS = 30-min secondary block, dropped in the final 72h before each exam.</p>
    </div>
    ${courseCard("genai")}
    ${courseCard("innov")}
    <div class="card">
      <div class="card-title-row"><h3><i class="fa-solid fa-calendar-check"></i>&nbsp; Day-by-day plan</h3></div>
      <div class="table-wrap"><table><thead><tr><th>Date</th><th>Focus</th><th>Blocks</th></tr></thead><tbody>${planRows}</tbody></table></div>
    </div>`;
}
