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

   Provenance: TUM, FAU and GATE facts were checked against the official
   pages on 2026-10-06. Everything else is the 1 Oct research or last
   cycle's pattern and is flagged "re-check" until verified.
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
  { id: "ielts", date: "2026-10-09", when: "8–10 Oct", approx: true, cat: "Test", level: "chain",
    title: "Sit IELTS Academic (computer-delivered)",
    miss: "The result is needed for DAAD (15 Oct working deadline) and as English proof everywhere. Computer results take 1–2 days, so 10 Oct is the last comfortable day.",
    note: "Target 7.0 overall, no band below 6.5 (Tübingen, Saarland, TU Darmstadt ask 7.0). The plan assumed it was booked on Day 1 — confirm the booking exists.",
    link: "https://ieltsidpindia.com/information/ielts-test-fee" },
  { id: "lor-daad", date: "2026-10-12", cat: "Documents", level: "chain",
    title: "DAAD letter of recommendation in hand (1 professor)",
    miss: "DAAD can't be submitted without it, and professors need about two weeks' notice. Saarland later needs 2 LORs.",
    note: "Chase on 8 and 12 Oct if nothing has arrived." },
  { id: "gre-book", date: "2026-10-15", cat: "Test", level: "target",
    title: "Book the GRE General seat for 1–10 Dec",
    miss: "A later sitting squeezes the retake: a retake needs a 21-day gap and scores take ~8–10 days to arrive.",
    note: "Suggested date — there is no external deadline, but popular dates fill up. Take POWERPREP Test 1 cold first as your diagnostic.",
    link: "https://www.ets.org/gre/test-takers/general-test/prepare/powerprep.html" },
  { id: "bennett-docs", date: "2026-10-21", cat: "Documents", level: "chain",
    title: "Bennett documents: module handbook, CGPA→% rule, minimum pass grade, class-rank letter",
    miss: "Without the CGPA→% rule and pass grade you can't compute your converted German grade (Tübingen needs ≤2.0; Saarland wants ≥75% and top-10% rank) or finish the credit-mapping table that decides TUM's first-stage score.",
    note: "Plan target: documents requested Day 1, chase on 21 Oct." },
  { id: "aps-courier", date: "2026-10-31", cat: "Documents", level: "chain",
    title: "Register with APS India and courier the dossier (₹18,000)",
    miss: "The APS certificate is mandatory for every program on your list and can't be added after you apply. It only issues after the dMAT is checked, so the dossier should already be waiting.",
    note: "APS accepts the dossier before the dMAT result.",
    link: "https://aps-india.de/" },
  { id: "dmat-access", date: "2026-11-04", cat: "Test", level: "target",
    title: "Ask g.a.s.t. about dMAT ADHD accommodations",
    miss: "Requests must be in at least 10 weeks before your test date. For a 20 Feb sitting that is ~12 Dec at the latest.",
    note: "Plan target 4 Nov; the real limit moves with your dMAT date.",
    link: "https://www.d-mat.de/en/faq-graduate-students-india/" },
  { id: "reverify", date: "2026-11-15", cat: "Applications", level: "check",
    title: "Re-verify every program's 2027/28 deadline and requirements on its official page",
    miss: "Most dates here are last cycle's pattern. A moved deadline or a new requirement is the quiet way to lose an application.",
    note: "Already verified 6 Oct: TUM (GRE/GATE minimums, 1 Feb–31 May window) and FAU (GRE General accepted; 2027/28 dates not yet published). Edit any date in the Applications tracker and it updates here." },
  { id: "gre-test", date: "2026-12-10", when: "1–10 Dec", cat: "Test", level: "chain",
    title: "Sit the GRE General (first attempt)",
    miss: "TUM needs Quant ≥164 and Writing ≥4.0 and KIT asks the same; both are hard minimums and there is no GATE fallback. December leaves room for a retake before spring.",
    note: "Verbal is ignored by TUM; TU Darmstadt's exam exemption needs V155 / Q165 / AWA 3.5. TUM's ETS code is 7806, department 5199." },
  { id: "emai", date: "2026-12-20", approx: true, cat: "Scholarship", level: "hard", optional: true,
    title: "EMAI Erasmus Mundus scholarship round closes (last cycle's date)",
    miss: "Only matters if you were shortlisted — the round opens ~15 Nov. Funding layer, not a second lane.",
    note: "Max 2–3 AI/data programs; accept only if fully funded.",
    link: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en" },
  { id: "erasmus-jan", date: "2027-01-04", when: "4–13 Jan", approx: true, cat: "Scholarship", level: "hard", optional: true,
    title: "Erasmus Mundus: CYBERSURE 4 Jan · CoDaS 5 Jan · EDISS 12 Jan · DEAI ~13 Jan",
    miss: "Only if shortlisted; last cycle's dates, so re-check the catalogue.",
    link: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en" },
  { id: "dmat-sit", date: "2027-02-20", approx: true, cat: "Test", level: "chain",
    title: "Sit the dMAT — latest comfortable date (date TBC on d-mat.de)",
    miss: "Later than ~20 Feb pushes the APS certificate past ~5 Apr and the uni-assist VPD inside 8 weeks of 31 May — TUM, FAU and Passau fall out, and KIT (15 Jun), TU Darmstadt (15 Jul) and TU Berlin carry the cycle.",
    note: "Register the day g.a.s.t. opens it. Forward the certificate to APS the day it arrives.",
    link: "https://www.d-mat.de/en/faq-graduate-students-india/" },
  { id: "tum-topics", date: "2027-03-01", cat: "Documents", level: "check",
    title: "TUM essay topics published — pick one and outline it",
    miss: "The ~1,000-word essay and ≤2-page statement are scored, and TUM excludes AI-written applications — so these need drafting time, in your own words.",
    link: "https://www.tum.de/en/studies/application/application-info-portal/document-requirements/tum-style-guide" },
  { id: "gre-final", date: "2027-03-31", cat: "Test", level: "target",
    title: "GRE final score in hand (any retake included) and program list frozen at 7–9",
    miss: "Scores take ~8–10 days to reach universities. A retake after mid-April risks missing 31 May.",
    note: "Plan's Gate 3 date." },
  { id: "aps-cert", date: "2027-03-31", cat: "Documents", level: "chain",
    title: "APS certificate issued (or written APS confirmation it issues by ~5 Apr)",
    miss: "uni-assist can't process the TUM VPD without it, and every program on your list requires it." },
  { id: "tum-vpd", date: "2027-04-05", cat: "Documents", level: "chain",
    title: "File the TUM VPD through uni-assist (€75 + €30 per extra program)",
    miss: "uni-assist takes 6–7 weeks for Asia; filing after ~5 Apr can't clear before TUM's 31 May deadline.",
    link: "https://www.uni-assist.de/fileadmin/Downloads/Tools/Checklisten/EN/UA-Checkliste-Standard-Verfahren-EN.pdf" },
  { id: "grad-docs", date: "2027-05-31", when: "May 2027", approx: true, cat: "Documents", level: "target",
    title: "Request final transcripts and degree certificate as soon as you graduate",
    miss: "Admission offers and the visa both end up needing the degree certificate; every week of delay holds up enrolment." },
  { id: "b1-book", date: "2027-06-30", cat: "German", level: "target",
    title: "Book Goethe B1 module dates (released ~2–2.5 months ahead)",
    miss: "B1 by Sept 2027 is your German target; late booking means retaking modules in Germany.",
    link: "https://www.goethe.de/ins/mm/en/m/spr/prf/gzb1/ueb.html" },
  { id: "blocked", date: "2027-07-15", cat: "Visa & logistics", level: "chain",
    title: "Blocked account money ready (€11,904 in 2026 — check the 2027 figure)",
    miss: "The visa application needs proof of funds, and the visa appointment can't be moved earlier once booked." },
  { id: "tum-test", date: "2027-08-20", when: "~mid/late Aug", approx: true, cat: "Test", level: "hard", optional: true,
    title: "TUM written test (on site, 90 min) — only if invited",
    miss: "Invited applicants in the middle score band sit it; missing it ends the application. Prep from the sample test.",
    link: "https://www.cit.tum.de/fileadmin/w00byx/cit/Studium/Studiengaenge/Master_Informatik/sample-test_Master_application1.pdf" },
  { id: "b1-done", date: "2027-08-31", cat: "German", level: "target",
    title: "Goethe B1 — all four modules passed",
    miss: "Shortens Blue Card settlement from 27 to 21 months and fixes the top hiring complaint from German IT employers." },
  { id: "tud-exam", date: "2027-09-01", approx: true, cat: "Test", level: "hard", optional: true,
    title: "TU Darmstadt entrance exam (~1 Sep) — unless you clear the GRE exemption",
    miss: "Exempt with GRE V155 / Q165 / AWA 3.5 or GATE ≥750; otherwise you must sit it." },
  { id: "arrival", date: "2027-09-20", cat: "Visa & logistics", level: "target",
    title: "On campus, enrolled; Anmeldung booked within 2 weeks of moving in",
    miss: "Day 355 of the plan.",
    link: "https://www.daad.de/en/studying-in-germany/living-in-germany/registering/" }
];

/* ---- date still unknown: check on a schedule instead of waiting ---- */
const DL_FLOATING = [
  { id: "fl-dmat", cat: "Test", level: "chain", title: "dMAT Q1 2027 date and registration opening",
    miss: "Everything downstream (APS, VPD, TUM/FAU/Passau) is timed from this sitting; seats are limited.",
    note: "Register through g.a.s.t. the day it opens. Accommodation requests need ≥10 weeks' notice.",
    link: "https://www.d-mat.de/en/faq-graduate-students-india/" },
  { id: "fl-vfs", cat: "Visa & logistics", level: "chain", title: "VFS visa appointment — the week you get an admit",
    miss: "Appointments can't be moved earlier, so booking on the day you're admitted decides your arrival date.",
    link: "https://india.diplo.de/in-en/service/2546328-2546328" }
];

/* ---- per-application consequence + conditions (keyed by STATE.applications ids) ---- */
const DL_APP_NOTES = {
  "app-daad": { level: "hard",
    miss: "Scholarship round lost — the next one is a year away. Aim to submit by 13 Oct for two days of slack.",
    check: "15 Oct is the plan's working deadline, not confirmed: select India in the DAAD portal and email DAAD New Delhi today." },
  "app-rwth": { level: "hard", optional: true,
    miss: "RWTH is out for this intake. Only apply if the APS certificate is already issued by 1 Mar — otherwise skip it deliberately.",
    check: "Plan note: GRE accepted, no GATE route." },
  "app-tue": { level: "hard", optional: true,
    miss: "Tübingen is out. Only apply if your converted grade is ≤2.0 — that needs Bennett's CGPA→% rule first." },
  "app-saar": { level: "hard",
    miss: "Out for this intake. Check eligibility first: plan notes say CGPA ≥75% AND top-10% rank, plus 2 LORs and GRE/GATE (no minimum score).",
    check: "Your CGPA→% conversion decides whether you qualify at all — get Bennett's rule and rank letter." },
  "app-tum": { level: "hard", verified: "2026-10-06",
    miss: "Out of TUM. Needs GRE Q≥164 + AWA≥4.0 (or GATE), APS certificate, uni-assist VPD filed by ~5 Apr, statement + essay — all your own writing." },
  "app-fau": { level: "hard", verified: "2026-10-06",
    miss: "Out of FAU. GRE General is accepted (Math Subject Test optional, score should be above the 60th percentile).",
    check: "2027/28 dates aren't published yet — last cycle ran 15 Apr to 31 May." },
  "app-passau": { level: "hard",
    miss: "Out of Passau. No GRE needed, but the APS certificate has to be there by the deadline." },
  "app-kit": { level: "hard",
    miss: "Out of KIT. GRE V151 / Q164 / AWA 4 (or GATE); a possible interview in Jun–Jul is scored 0–60, pass 30." },
  "app-tud": { level: "hard",
    miss: "Out of TU Darmstadt. Paper documents go by post/courier — allow transit time.",
    check: "Exam ~1 Sep unless GRE V155 / Q165 / AWA 3.5." },
  "app-tub": { level: "hard",
    miss: "TU Berlin's open-admission window closes — your safe-ish fallback. Credit minimums: 12 CP theory, 12 CP computer engineering, 18 CP maths." }
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
    { date: "2027-02-20", label: "dMAT sat", sub: "date TBC on d-mat.de" },
    { date: "2027-03-31", label: "APS certificate issued", sub: "can't issue before the dMAT is checked" },
    { date: "2027-04-05", label: "TUM VPD filed (uni-assist)", sub: "8 weeks before 31 May" },
    { date: "2027-05-31", label: "TUM · FAU · Passau submit", sub: "KIT 15 Jun · TUD 15 Jul if you slip" }
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
    <p class="muted" style="margin-top:10px;">Every step waits on the one before it. If the dMAT lands after ~20 Feb, TUM, FAU and Passau are at risk and the cycle rests on KIT (15 Jun), TU Darmstadt (15 Jul) and TU Berlin. APS also has to be filed before you apply — it can't be added later. Source: the 1 Oct plan.</p>
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
    <p class="muted" style="margin-bottom:10px;">Verified against official pages on 6 Oct 2026: TUM, FAU and GATE. All other dates come from the 1 Oct research or last cycle's pattern — treat them as <b>re-check</b> until the November pass. University deadlines come from the Applications tracker, so edit them there.</p>
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
    <div style="font-size:13px;"><b>6 Oct 2026 — GRE only, no GATE.</b> GATE 2027's late registration window closes 12 Oct, so this is reversible only until then; the exam is 6–21 Feb and results are out 19 Mar. TUM and KIT therefore depend on GRE Quant ≥164 / AWA ≥4.0, which makes the December attempt and the retake window your only buffer. Reopen only if your cold POWERPREP Test 1 comes back far below 164 — and only before 12 Oct.</div>
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
