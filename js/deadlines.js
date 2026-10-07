/* =========================================================================
   deadlines.js — Germany deadline tracker: every date that can cost you an
   admission, in one place. Self-contained like nptel.js: state lives in
   STATE.deadlines (created lazily), so no CONTENT_VERSION migration.

   Three row sources are merged into one timeline:
     1. STATE.applications — the Applications tracker stays the source of
        truth for university deadlines, so a date edited there (e.g. after the
        November re-check) flows straight into this view.
     2. DL_ITEMS below — tests, documents and logistics on the critical path.
     3. STATE.deadlines.custom — anything you add yourself.

   Provenance: requirements for TU Berlin, TU Darmstadt, TU Dortmund, FU Berlin,
   Passau, Göttingen, TUHH and APS India were read on their official pages on
   2026-10-06. WS 2027/28 deadlines are not published yet — dates are last
   cycle's pattern and stay flagged "re-check" until the November pass.
   ========================================================================= */

const DL_LEVEL = {
  hard:   { label: "Hard cutoff",   badge: "badge-critical", icon: "fa-ban" },
  chain:  { label: "Critical path", badge: "badge-serious",  icon: "fa-link" },
  target: { label: "Target",        badge: "badge-neutral",  icon: "fa-bullseye" },
  check:  { label: "Re-check",      badge: "badge-warning",  icon: "fa-magnifying-glass" }
};

/* ---- non-application items. level: hard = external fixed date · chain = prerequisite on the
        dMAT → APS → VPD → submit path · target = self-set date · check = re-verify a source ---- */
const DL_ITEMS = [
  { id: "aps-ask", date: "2026-10-12", cat: "Documents", level: "chain",
    title: "Ask APS India the final-year question (quiz + email to info@aps-india.de)",
    miss: "Everything downstream depends on the answer: can a student with 7 of 8 semesters done sit the dMAT and file APS before graduating? If not, the May deadlines fail and the plan moves to the July–August deadlines or Summer 2028.",
    note: "g.a.s.t. replied on 6 Oct that eligibility is APS India's call. APS lists no email on its contact page (a web form); info@aps-india.de appears on its dMAT page.",
    link: "https://aps-india.de/dmat/" },
  { id: "passau-check", date: "2026-10-12", cat: "Applications", level: "target",
    title: "Email Passau: do stats / discrete maths / ML / algorithms count as mathematics?",
    miss: "Passau needs ≥35 ECTS of maths and you have ~24 (~30 with Statistical ML). Applying without asking wastes a uni-assist fee and a letter.",
    note: "Send your course list; skip Passau if the answer is no." },
  { id: "lor", date: "2026-10-15", cat: "Documents", level: "target", optional: true,
    title: "Ask two professors for recommendation letters",
    miss: "Only DAAD and possibly HPI ask for them — none of the core five do. Cheap to do once, but not on the critical path.",
    note: "Short email + your CV + the program list." },
  { id: "bennett-docs", date: "2026-10-21", cat: "Documents", level: "chain",
    title: "Bennett documents: syllabi with contact hours, 168 = 240 ECTS letter, grading scale + pass mark, CGPA→%, medium-of-instruction letter, transcript",
    miss: "Universities decide credits from syllabus content and workload. Without these you can't finish the credit audit that decides TU Berlin, FU Berlin, Dortmund and Darmstadt (maths is your thinnest area).",
    note: "Plan target: requested on Day 1, chase on 21 Oct. Details: reports/bennett-credit-audit-2026-10-06.md." },
  { id: "aps-docs", date: "2026-10-31", cat: "Documents", level: "chain",
    title: "Assemble the APS paperwork (Class X/XII marksheets, passport, Aadhaar with linked mobile, semester 1–7 marksheets)",
    miss: "APS needs the complete checklist in one submission — nothing can be added later for the same procedure. Having it ready means you can file the day APS confirms you can.",
    note: "Don't courier anything until APS answers the final-year question.",
    link: "https://aps-india.de/wp-content/uploads/2026/06/Leaflet_BA_Graduates_English_dMAT_June2026.pdf" },
  { id: "audit", date: "2026-11-04", cat: "Applications", level: "chain",
    title: "Credit-audit table done for the core programs (syllabi attached)",
    miss: "Maths is your thinnest area (~24 ECTS-equivalent). A program with a high maths bar (Passau ≥35) can sink an application after you've paid for it.",
    note: "Start from reports/bennett-credit-audit-2026-10-06.md." },
  { id: "internship", date: "2026-11-15", cat: "Career", level: "target",
    title: "Apply for the next internship before Deloitte ends on 1 Dec (SAP Labs India or another German-linked firm)",
    miss: "A gap after 1 Dec removes a Germany-linked line from your CV just as applications open. Check each page's real eligibility — the criteria I found (≥60%, no active backlogs, 3–6 months) come from third-party sites.",
    link: "https://www.foundit.in/career-advice/sap-labs-internship-apply/" },
  { id: "reverify", date: "2026-11-15", cat: "Applications", level: "check",
    title: "Re-verify every program's 2027/28 deadline and requirements on its official page",
    miss: "Most dates here are last cycle's pattern (WS 2027/28 dates aren't published yet). A moved deadline or a new requirement is the quiet way to lose an application.",
    note: "Requirements were read on the official pages on 6 Oct (TU Berlin, TU Darmstadt, Dortmund, FU Berlin, Passau, Göttingen, TUHH, APS India). Edit any date in the Applications tracker and it updates here." },
  { id: "ielts-prep", date: "2026-10-31", cat: "Test", level: "target",
    title: "Start IELTS prep: one timed diagnostic mock (after the NPTEL exams)",
    miss: "A 7.0 with no band under 6.5 needs roughly six weeks of regular practice if you are starting cold. Starting after 25 Oct keeps both NPTEL exams safe; nothing IELTS is due before this.",
    note: "Then about 1 hour on weekdays and one timed section at weekends.",
    link: "https://ieltsidpindia.com/information/ielts-test-fee" },
  { id: "ielts-book", date: "2026-11-30", cat: "Test", level: "target",
    title: "Book the mid-December IELTS slot (computer-delivered)",
    miss: "Popular dates fill up; a mid-December result leaves room for a late-January retake before you file APS." },
  { id: "ielts-sit", date: "2026-12-20", when: "mid-Dec", cat: "Test", level: "chain",
    title: "Sit IELTS Academic (target 7.0 overall, no band under 6.5)",
    miss: "APS and the student visa need an approved language certificate — medium-of-instruction letters are not accepted there. TU Darmstadt wants 7.0, TU Berlin and Göttingen 6.5. The result is only needed when you file APS (Feb–Mar), so mid-December (after Deloitte ends, before the A2 course starts) is the sweet spot, with a late-January retake as the buffer.",
    note: "Computer-delivered: results in 1–2 days." },
  { id: "a1-done", date: "2026-12-15", cat: "German", level: "target",
    title: "German A1 finished (Nicos Weg + the free certificate test)",
    miss: "The A2 course in January builds on it; Passau wants A1 by the end of year 1.",
    link: "https://learngerman.dw.com/en/nicos-weg/c-36519789" },
  { id: "a2-start", date: "2027-01-09", cat: "German", level: "target",
    title: "Start the A2 course (Goethe New Delhi weekend batch)",
    miss: "The fixed class time is your scaffold through the final semester; B1 by Jul–Aug depends on starting here.",
    link: "https://www.goethe.de/ins/in/en/sta/del/kur/tup.cfm" },
  { id: "sem7-marks", date: "2027-01-15", when: "Dec–Jan", cat: "Documents", level: "chain",
    title: "Semester 7 results → marksheets 1–7 added to the APS file",
    miss: "APS's dMAT exemption is measured in completed semesters (7 of 8); you want the marksheet in hand the moment a dMAT date opens." },
  { id: "gre-decision", date: "2027-01-15", cat: "Test", level: "target",
    title: "GRE decision (default: no)",
    miss: "Only KIT, Mannheim, RWTH and FAU AI need it, and their deadlines still leave room for a February–March sitting. TUM, Saarland, Stuttgart and Tübingen are off the list for other reasons.",
    note: "Say yes only if you consciously want one of those programs." },
  { id: "dmat-sit", date: "2027-02-20", approx: true, cat: "Test", level: "chain",
    title: "Sit the dMAT — latest comfortable date (date TBC on d-mat.de)",
    miss: "Later than ~20 Feb pushes the APS certificate past ~5 Apr and the uni-assist VPDs inside 8 weeks of 31 May — Passau and FU Berlin fall out, and the cycle rests on TU Darmstadt (15 Jul) and TU Berlin (31 Aug).",
    note: "Register the day g.a.s.t. opens it; forward the certificate to APS the day it arrives. Eligibility to sit before graduating isn't confirmed — see the APS item above.",
    link: "https://www.d-mat.de/en/faq-graduate-students-india/" },
  { id: "aps-cert", date: "2027-03-31", cat: "Documents", level: "chain",
    title: "APS certificate issued (or APS's written status)",
    miss: "APS is mandatory for every Indian degree on your list, and it only issues after the dMAT is checked." },
  { id: "vpd", date: "2027-04-05", cat: "Documents", level: "chain",
    title: "File the uni-assist VPDs (Passau, FU Berlin, TU Berlin as applicable)",
    miss: "uni-assist takes 6–7 weeks for Asia; file at least 8 weeks before the deadline (31 May → by ~5 Apr). TU Darmstadt applies directly, not through uni-assist.",
    link: "https://www.uni-assist.de/fileadmin/Downloads/Tools/Checklisten/EN/UA-Checkliste-Standard-Verfahren-EN.pdf" },
  { id: "grad-docs", date: "2027-05-31", when: "May 2027", approx: true, cat: "Documents", level: "target",
    title: "Request final transcripts and degree certificate as soon as you graduate",
    miss: "Admission offers and the visa both end up needing the degree certificate; every week of delay holds up enrolment." },
  { id: "b1-book", date: "2027-05-15", cat: "German", level: "target",
    title: "Book the Goethe B1 modules (dates open ~2–2.5 months ahead)",
    miss: "B1 by Aug–Sep 2027 shortens the settlement clock from 27 to 21 months; late booking means retaking modules in Germany.",
    link: "https://www.goethe.de/ins/mm/en/m/spr/prf/gzb1/ueb.html" },
  { id: "blocked", date: "2027-07-15", cat: "Visa & logistics", level: "chain",
    title: "Blocked account money ready (€11,904 in 2026 — check the 2027 figure)",
    miss: "The visa application needs proof of funds, and the visa appointment can't be moved earlier once booked." },
  { id: "b1-done", date: "2027-08-31", cat: "German", level: "target",
    title: "Goethe B1 — all four modules passed",
    miss: "84% of tech Werkstudent posts ask for German; B1 also shortens settlement from 27 to 21 months." },
  { id: "tud-exam", date: "2027-09-01", when: "first week of Sep", approx: true, cat: "Test", level: "hard", optional: true,
    title: "TU Darmstadt entrance exam (on campus) — unless you are exempt",
    miss: "A 90-minute written exam if your documents can't prove the required content; it is on campus, so plan the trip and visa timing. GRE V155/Q165/AWA 3.5 would exempt you." },
  { id: "arrival", date: "2027-09-20", cat: "Visa & logistics", level: "target",
    title: "On campus, enrolled; Anmeldung booked within 2 weeks of moving in",
    miss: "Day 355 of the plan.",
    link: "https://www.daad.de/en/studying-in-germany/living-in-germany/registering/" }
];

/* ---- date still unknown: check on a schedule instead of waiting ---- */
const DL_FLOATING = [
  { id: "fl-dmat", cat: "Test", level: "chain", title: "dMAT Q1 2027 date and registration opening",
    miss: "Everything downstream (APS, VPDs, the May deadlines) is timed from this sitting; seats are limited.",
    note: "Register through g.a.s.t. the day it opens. Accommodation requests need ≥10 weeks' notice. Whether you can sit it before graduating is awaiting APS's answer.",
    link: "https://www.d-mat.de/en/faq-graduate-students-india/" },
  { id: "fl-vfs", cat: "Visa & logistics", level: "chain", title: "VFS visa appointment — the week you get an admit",
    miss: "Appointments can't be moved earlier, so booking on the day you're admitted decides your arrival date.",
    link: "https://india.diplo.de/in-en/service/2546328-2546328" }
];

/* ---- per-application consequence + conditions (keyed by STATE.applications ids) ---- */
const DL_APP_NOTES = {
  "app-daad": { level: "hard", optional: true,
    miss: "Scholarship round lost — the next one is a year away. Skipping is the default; decide by 10 Oct.",
    check: "15 Oct is the plan's working date, not confirmed: select India in the DAAD portal." },
  "app-tub": { level: "hard", verified: "2026-10-06",
    miss: "TU Berlin's open-admission window closes (~31 Aug) — your late-deadline anchor. Credit match: 12 CP theory, 12 CP computer engineering, 12 CP methodological, 18 CP maths.",
    check: "Theory credit hangs on Algorithms (DAA) counting as theory." },
  "app-tud": { level: "hard", verified: "2026-10-06",
    miss: "Out of TU Darmstadt. Paper documents go by post/courier and must ARRIVE by 15 Jul.",
    check: "IELTS 7.0 / C1; entrance exam in the first week of September unless GRE-exempt." },
  "app-dortmund": { level: "hard", verified: "2026-10-06",
    miss: "Out of Dortmund — your safest program (not admission-restricted).",
    check: "The pages disagree on the deadline (15 May / 15 Jun / 15 Jul): verify." },
  "app-fub": { level: "hard", verified: "2026-10-06",
    miss: "Out of FU Berlin — free, English-taught Data Science that fits your credits.",
    check: "2027/28 dates aren't published; last cycle ran to 31 May." },
  "app-passau": { level: "hard", verified: "2026-10-06",
    miss: "Out of Passau — but check the maths bar first (≥35 ECTS vs your ~24–30).",
    check: "uni-assist window 1 Apr–31 May." },
  "app-goe": { level: "hard", optional: true, verified: "2026-10-06",
    miss: "Out of Göttingen — a backup, not a target.",
    check: "Includes a ~60-minute aptitude test." },
  "app-hpi": { level: "hard", optional: true,
    miss: "Out of HPI — a stretch (admission-restricted).",
    check: "Third-party info only; email studinfo@hpi.de first." },
  "app-tuhh": { level: "hard", optional: true, verified: "2026-10-06",
    miss: "Out of TUHH — a stretch whose 1 Mar deadline likely precedes your APS certificate.",
    check: "Ask your senior whether TUHH accepts proof that the APS application was submitted." }
};

/* ---- state + helpers ---- */
function dlState() {
  if (!STATE.deadlines) STATE.deadlines = { done: {}, checked: {}, custom: [], view: "open" };
  const s = STATE.deadlines;
  s.done = s.done || {}; s.checked = s.checked || {}; s.custom = s.custom || []; s.view = s.view || "open";
  return s;
}

// Local calendar date — todayISO() is UTC, which reads a day behind between 00:00 and 05:30 IST.
function dlToday() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function dlSafeUrl(u) { return /^https?:\/\//i.test(u || "") ? escapeHtml(u) : ""; }

// All dated rows, soonest first. Application rows are derived, never copied.
function dlRows() {
  const s = dlState();
  const rows = [];

  (STATE.applications || []).forEach(a => {
    if (!a.deadline) return;
    const n = DL_APP_NOTES[a.id] || {};
    rows.push({
      id: "app:" + a.id, src: "app", date: a.deadline, cat: "Application", level: n.level || "hard",
      title: a.company + " — " + a.role, miss: n.miss || "", note: [a.notes, n.check].filter(Boolean).join(" · "),
      link: a.link, optional: !!n.optional, verified: n.verified || "", status: a.status,
      done: a.status && a.status !== "planned"
    });
  });
  DL_ITEMS.forEach(i => rows.push({ ...i, src: "item", done: !!s.done[i.id] }));
  s.custom.forEach(c => rows.push({
    id: c.id, src: "custom", date: c.date, cat: "Custom", level: c.level || "target",
    title: c.title, miss: "", note: c.note || "", done: !!s.done[c.id]
  }));

  return rows.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}

function dlDays(date) { return daysBetween(dlToday(), date); }

// Anything still pending that should nag: not done, not conditional ("optional"), not already-applied.
function dlPending() { return dlRows().filter(r => !r.done && !r.optional); }

function dlChip(r) {
  if (r.done) return `<span class="badge badge-good"><i class="fa-solid fa-check"></i>${r.src === "app" ? escapeHtml(r.status) : "done"}</span>`;
  const n = dlDays(r.date);
  if (n < 0) return `<span class="badge badge-critical">${-n}d ${r.src === "app" ? "passed" : "overdue"}</span>`;
  if (n === 0) return `<span class="badge badge-critical">TODAY</span>`;
  const cls = n <= 3 ? "badge-critical" : n <= 14 ? "badge-serious" : n <= 45 ? "badge-warning" : "badge-neutral";
  return `<span class="badge ${cls}">${n} day${n === 1 ? "" : "s"}</span>`;
}

function dlFmt(r) {
  const base = r.when ? escapeHtml(r.when) : fmtDate(r.date).replace(/, \d{4}$/, "");
  const yr = new Date(r.date + "T00:00:00").getFullYear();
  return (r.approx && !r.when ? "~" : "") + base + (r.when ? "" : ", " + yr);
}

/* ---- actions ---- */
function dlToggle(id) {
  const s = dlState();
  s.done[id] = !s.done[id];
  saveState(); renderDeadlines(); renderStakesBanner();
}
function dlSetView(v) { dlState().view = v; saveState(); renderDeadlines(); }
function dlChecked(id) {
  dlState().checked[id] = dlToday();
  saveState(); renderDeadlines(); toast("Marked as checked today");
}
function dlAddCustom() {
  const title = document.getElementById("dl-new-title").value.trim();
  const date = document.getElementById("dl-new-date").value;
  if (!title || !date) { toast("Title and date required"); return; }
  dlState().custom.push({
    id: uid("d"), date, title,
    note: document.getElementById("dl-new-note").value.trim(),
    level: document.getElementById("dl-new-level").value
  });
  saveState(); renderDeadlines(); renderStakesBanner(); toast("Deadline added");
}
function dlDelCustom(id) {
  const s = dlState();
  s.custom = s.custom.filter(c => c.id !== id);
  delete s.done[id];
  saveState(); renderDeadlines(); renderStakesBanner();
}

/* ---- pieces reused by the dashboard and the banner ---- */
function dlBannerText() {
  const next = dlPending().find(r => r.level !== "check" || dlDays(r.date) <= 7);
  if (!next) return "";
  const n = dlDays(next.date);
  const when = n < 0 ? `${-n}d overdue` : n === 0 ? "TODAY" : `in ${n}d`;
  return `next deadline: ${escapeHtml(next.title.split(" — ")[0].split(" (")[0])} ${when}`;
}

function dlDashboardCard() {
  const rows = dlPending().slice(0, 4);
  return `<div class="card mb-16">
    <div class="card-title-row"><h3><i class="fa-solid fa-calendar-xmark"></i>&nbsp; Next deadlines</h3>
      <button class="btn btn-sm" onclick="goToView('deadlines')">All deadlines <i class="fa-solid fa-arrow-right"></i></button></div>
    ${rows.length ? rows.map(r => `<div class="flex-between" style="padding:7px 0; border-bottom:1px solid var(--gridline); gap:12px;">
      <div style="font-size:13px; min-width:0;"><b>${escapeHtml(r.title)}</b><div class="muted">${dlFmt(r)} · ${DL_LEVEL[r.level].label}</div></div>
      ${dlChip(r)}
    </div>`).join("") : `<div class="empty-state"><i class="fa-solid fa-circle-check"></i>Nothing pending.</div>`}
  </div>`;
}

/* ---- decisions already made (shown on the page so they are not reopened by drift) ---- */
const DL_DECISIONS = [
  { when: "6 Oct 2026", title: "No GATE", body: "GATE 2027's late registration closes 12 Oct and its results (19 Mar) would come too late to help most deadlines; skipped." },
  { when: "6 Oct 2026", title: "GRE is parked until 15 Jan (default: no)", body: "It only matters for KIT, Mannheim, RWTH and FAU AI. TUM (Q≥164, €4–6k/semester), Saarland (CGPA ≥75% and top 10%), Stuttgart (15 Jan deadline) and Tübingen (grade ≤2.0) are off the list for their own reasons." },
  { when: "6 Oct 2026", title: "A lean list: 4–6 applications in tuition-free states", body: "Core: TU Berlin, TU Darmstadt, TU Dortmund Data Science, FU Berlin Data Science. Check first: Passau (maths bar). Stretch/backup: HPI, TUHH, Göttingen. Baden-Württemberg (€1,500/semester) and Bavaria's TUM/FAU (€4–6k) are out." },
  { when: "7 Oct 2026", title: "One IELTS, but not soon", body: "APS and the visa do not accept medium-of-instruction letters, so one IELTS is required. Prepare from 31 Oct (after the NPTEL exams), sit in mid-December, retake in late January if needed. It is not due this month." },
  { when: "6 Oct 2026", title: "German: A1 now, A2 course from January, B1 exam Jul–Aug", body: "June is a stretch, not a plan; B1 is not needed for admission to the English-taught programs on your list." }
];

/* ---- render ---- */
function renderDeadlines() {
  const el = document.getElementById("view-deadlines");
  const s = dlState();
  const today = dlToday();
  const all = dlRows();
  const pending = all.filter(r => !r.done && !r.optional);
  const view = s.view;

  const shown = all.filter(r => {
    if (view === "all") return true;
    if (view === "hard") return !r.done && (r.level === "hard" || r.level === "chain");
    return !r.done; // open
  });

  const nextHard = pending.find(r => r.level === "hard" && dlDays(r.date) >= 0);
  const soon = pending.filter(r => dlDays(r.date) <= 14);
  const overdue = pending.filter(r => dlDays(r.date) < 0);
  const doneCount = all.filter(r => r.done).length;

  const tiles = `<div class="grid grid-4 mb-16">
    <div class="card stat-tile">
      <div class="value">${nextHard ? dlDays(nextHard.date) : "–"}<span style="font-size:14px"> days</span></div>
      <div class="label">Next hard cutoff</div>
      <div class="delta muted">${nextHard ? escapeHtml(nextHard.title.split(" — ")[0]) + " · " + dlFmt(nextHard) : "none pending"}</div>
    </div>
    <div class="card stat-tile">
      <div class="value">${soon.length}</div>
      <div class="label">Due within 14 days</div>
      <div class="delta muted">includes anything overdue</div>
    </div>
    <div class="card stat-tile">
      <div class="value" style="${overdue.length ? "color:var(--status-critical);-webkit-text-fill-color:var(--status-critical);" : ""}">${overdue.length}</div>
      <div class="label">Overdue</div>
      <div class="delta ${overdue.length ? "" : "good"}">${overdue.length ? "decide today: do it or drop it" : "none — keep it that way"}</div>
    </div>
    <div class="card stat-tile">
      <div class="value">${doneCount}<span style="font-size:14px"> / ${all.length}</span></div>
      <div class="label">Done or submitted</div>
    </div>
  </div>`;

  const rowCheck = r => r.src === "app"
    ? `<a class="icon-btn" title="Update status in the Applications tracker" onclick="goToView('applications')"><i class="fa-solid fa-paper-plane"></i></a>`
    : `<input type="checkbox" ${r.done ? "checked" : ""} onchange="dlToggle('${r.id}')" />`;

  const levelBadge = r => `<span class="badge ${DL_LEVEL[r.level].badge}"><i class="fa-solid ${DL_LEVEL[r.level].icon}"></i>${DL_LEVEL[r.level].label}</span>`;

  const detail = r => `
    <div><b>${escapeHtml(r.title)}</b>${r.optional ? ` <span class="badge badge-neutral">conditional</span>` : ""}${r.verified ? ` <span class="badge badge-good" title="Checked against the official page">verified ${fmtDate(r.verified)}</span>` : ""}</div>
    ${r.note ? `<div class="muted" style="margin-top:2px;">${escapeHtml(r.note)}</div>` : ""}
    ${dlSafeUrl(r.link) ? `<div style="margin-top:2px;"><a href="${dlSafeUrl(r.link)}" target="_blank" rel="noopener" style="font-size:12px;">Source / page <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>` : ""}`;

  /* do-now: due within 14 days or overdue */
  const doNow = `<div class="card mb-16" style="border-left:4px solid var(--status-serious);">
    <div class="card-title-row"><h3><i class="fa-solid fa-bolt"></i>&nbsp; Do now — due within 14 days or overdue</h3></div>
    ${soon.length ? soon.map(r => `<div class="flex" style="gap:12px; align-items:flex-start; padding:9px 0; border-bottom:1px solid var(--gridline);">
      <div style="padding-top:2px;">${rowCheck(r)}</div>
      <div style="flex:1; min-width:0; font-size:13px;">${detail(r)}
        ${r.miss ? `<div style="margin-top:4px; font-size:12.5px; color:var(--text-secondary);"><b>If you miss it:</b> ${escapeHtml(r.miss)}</div>` : ""}</div>
      <div style="text-align:right; white-space:nowrap;">${dlChip(r)}<div class="muted" style="margin-top:4px;">${dlFmt(r)}</div></div>
    </div>`).join("") : `<p class="muted">Nothing due in the next 14 days.</p>`}
  </div>`;

  /* the dMAT → APS → VPD → submit chain */
  const chain = [
    { date: "2026-10-20", label: "APS answers the final-year question", sub: "quiz run + email sent" },
    { date: "2027-02-20", label: "dMAT sat", sub: "date TBC on d-mat.de" },
    { date: "2027-03-31", label: "APS certificate issued", sub: "can't issue before the dMAT is checked" },
    { date: "2027-05-31", label: "Passau · FU Berlin submit", sub: "Dortmund ~15 May · TU Darmstadt 15 Jul · TU Berlin 31 Aug if you slip" }
  ];
  const chainCard = `<div class="card mb-16">
    <div class="card-title-row"><h3><i class="fa-solid fa-link"></i>&nbsp; The critical path — this, not your CGPA, is what can sink the cycle</h3></div>
    <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:stretch;">
      ${chain.map((c, i) => `${i ? `<div style="align-self:center; color:var(--text-muted);"><i class="fa-solid fa-arrow-right"></i></div>` : ""}
        <div style="flex:1; min-width:150px; border:1px solid var(--border); border-radius:var(--radius-s); padding:10px 12px; background:var(--page-plane);">
          <div style="font-size:12px; color:var(--text-muted); font-weight:600;">${i + 1}. ~${fmtDate(c.date).replace(/, \d{4}$/, "")}</div>
          <div style="font-weight:700; font-size:13px;">${escapeHtml(c.label)}</div>
          <div class="muted">${escapeHtml(c.sub)}</div>
          <div style="margin-top:6px;"><span class="badge ${dlDays(c.date) <= 45 ? "badge-serious" : "badge-neutral"}">${dlDays(c.date)} days left</span></div>
        </div>`).join("")}
    </div>
    <p class="muted" style="margin-top:10px;">Every step waits on the one before it. APS decides first whether a student with 7 of 8 semesters done can sit the dMAT and file before graduating. If not — or if the dMAT lands after ~20 Feb — the May deadlines fail and the cycle rests on TU Darmstadt (15 Jul) and TU Berlin (31 Aug), or you move to the Summer 2028 intake (Passau opens 1 Nov–15 Dec 2027; the dMAT result stays valid).</p>
  </div>`;

  /* timeline, grouped by month */
  let lastMonth = "";
  const body = shown.map(r => {
    const month = new Date(r.date + "T00:00:00").toLocaleDateString(undefined, { month: "long", year: "numeric" });
    const head = month !== lastMonth ? `<tr><td colspan="5" style="background:var(--page-plane); font-weight:700; font-size:12.5px; color:var(--text-secondary); padding:8px 12px;">${month}</td></tr>` : "";
    lastMonth = month;
    const past = !r.done && dlDays(r.date) < 0;
    return head + `<tr style="${r.done ? "opacity:.55;" : ""}${past ? "background: color-mix(in srgb, var(--status-critical) 8%, transparent);" : ""}">
      <td style="width:34px;">${rowCheck(r)}</td>
      <td style="white-space:nowrap;"><b>${dlFmt(r)}</b><div style="margin-top:3px;">${dlChip(r)}</div></td>
      <td style="min-width:260px; font-size:13px;">${detail(r)}</td>
      <td style="white-space:nowrap;">${levelBadge(r)}<div class="muted" style="margin-top:3px;">${escapeHtml(r.cat)}</div></td>
      <td style="min-width:220px; font-size:12.5px; color:var(--text-secondary);">${escapeHtml(r.miss)}
        ${r.src === "custom" ? `<div><button class="icon-btn" title="Delete" onclick="dlDelCustom('${r.id}')"><i class="fa-solid fa-trash"></i></button></div>` : ""}</td>
    </tr>`;
  }).join("");

  const timeline = `<div class="card mb-16">
    <div class="card-title-row"><h3><i class="fa-solid fa-timeline"></i>&nbsp; Full timeline</h3>
      <select onchange="dlSetView(this.value)" style="font-size:12.5px; padding:5px 8px;">
        <option value="open" ${view === "open" ? "selected" : ""}>Open items</option>
        <option value="hard" ${view === "hard" ? "selected" : ""}>Hard cutoffs + critical path only</option>
        <option value="all" ${view === "all" ? "selected" : ""}>Everything incl. done</option>
      </select></div>
    <p class="muted" style="margin-bottom:10px;">Requirements were read on official pages on 6 Oct 2026 (TU Berlin, TU Darmstadt, Dortmund, FU Berlin, Passau, Göttingen, TUHH, APS India). WS 2027/28 deadlines are not published yet, so dates are last cycle's pattern — treat them as <b>re-check</b> until the November pass. University deadlines come from the Applications tracker, so edit them there.</p>
    ${shown.length ? `<div class="table-wrap"><table>
      <thead><tr><th></th><th>When</th><th>What</th><th>Type</th><th>If you miss it</th></tr></thead><tbody>${body}</tbody></table></div>`
      : `<div class="empty-state"><i class="fa-solid fa-circle-check"></i>Nothing to show in this view.</div>`}
  </div>`;

  /* dates not announced yet */
  const floating = `<div class="card mb-16">
    <div class="card-title-row"><h3><i class="fa-solid fa-hourglass-half"></i>&nbsp; Date not announced yet — check on a schedule</h3></div>
    ${DL_FLOATING.map(f => {
      const last = s.checked[f.id];
      const age = last ? daysBetween(last, today) : null;
      const stale = age == null || age > 7;
      return `<div class="flex" style="gap:12px; align-items:flex-start; padding:9px 0; border-bottom:1px solid var(--gridline);">
        <div style="flex:1; min-width:0; font-size:13px;">
          <div><b>${escapeHtml(f.title)}</b> <span class="badge ${DL_LEVEL[f.level].badge}">${DL_LEVEL[f.level].label}</span></div>
          <div class="muted" style="margin-top:2px;">${escapeHtml(f.note || "")}</div>
          <div style="margin-top:4px; font-size:12.5px; color:var(--text-secondary);"><b>If you miss it:</b> ${escapeHtml(f.miss)}</div>
          ${dlSafeUrl(f.link) ? `<div style="margin-top:2px;"><a href="${dlSafeUrl(f.link)}" target="_blank" rel="noopener" style="font-size:12px;">Open page <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>` : ""}
        </div>
        <div style="text-align:right;">
          <span class="badge ${stale ? "badge-warning" : "badge-good"}">${last ? (age === 0 ? "checked today" : "checked " + age + "d ago") : "never checked"}</span>
          <div style="margin-top:6px;"><button class="btn btn-sm" onclick="dlChecked('${f.id}')">Checked today</button></div>
        </div>
      </div>`;
    }).join("")}
    <p class="muted" style="margin-top:8px;">The Sunday buffer block in your weekly template already says "check d-mat.de" — this just records that you did.</p>
  </div>`;

  /* locked decisions */
  const decisions = `<div class="card mb-16">
    <div class="card-title-row"><h3><i class="fa-solid fa-lock"></i>&nbsp; Decisions already made — don't reopen by drift</h3></div>
    ${DL_DECISIONS.map(d => `<div style="font-size:13px; padding:7px 0; border-bottom:1px solid var(--gridline);"><b>${escapeHtml(d.when)} — ${escapeHtml(d.title)}.</b> ${escapeHtml(d.body)}</div>`).join("")}
  </div>`;

  /* add your own */
  const customForm = `<div class="card">
    <div class="card-title-row"><h3><i class="fa-solid fa-plus"></i>&nbsp; Add your own deadline</h3></div>
    <div class="form-row">
      <div class="field"><label>What</label><input type="text" id="dl-new-title" placeholder="e.g. Send LOR reminder to Prof. X" /></div>
      <div class="field"><label>Date</label><input type="date" id="dl-new-date" /></div>
      <div class="field"><label>Type</label><select id="dl-new-level"><option value="hard">Hard cutoff</option><option value="chain">Critical path</option><option value="target" selected>Target</option><option value="check">Re-check</option></select></div>
    </div>
    <div class="field"><label>Note (optional)</label><input type="text" id="dl-new-note" /></div>
    <button class="btn btn-primary btn-sm" onclick="dlAddCustom()"><i class="fa-solid fa-plus"></i> Add</button>
  </div>`;

  el.innerHTML = tiles + doNow + chainCard + timeline + floating + decisions + customForm;
}
