/* =========================================================================
   app.js — core: state load/save, routing, dashboard/roadmap/timetable/
   milestones/notes/resume/achievements/settings views, modal + toast utils.
   Tracker-heavy views (skills, projects, courses, applications, interviews,
   competitions, studylog, reviews) live in trackers.js. Chart rendering
   lives in charts.js. All three share the single global STATE object.
   ========================================================================= */

const STORAGE_KEY = "careerOS_state_v1";
let STATE = null;

/* ---------------------------- State I/O ---------------------------- */

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { console.warn("Failed to parse saved state, resetting.", e); }
  const fresh = getFreshDefaultState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

function saveState() {
  STATE.meta.lastUpdated = todayISO();
  checkLevelUp();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
}
function checkLevelUp() {
  const { level, title } = levelInfo();
  const known = STATE.meta.lastKnownLevel || 1;
  if (level > known) {
    STATE.meta.lastKnownLevel = level;
    STATE.achievements.unshift({ id: uid("a"), date: todayISO(), title: `Level ${level}: ${title}`, description: "Earned through logged activity — tasks completed, milestones passed, days shown up." });
    setTimeout(() => toast(`🚀 Level up → ${level}: ${title}`, true), 50);
  }
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function uid(prefix) {
  return prefix + "_" + Math.random().toString(36).slice(2, 9);
}

function daysBetween(a, b) {
  const A = new Date(a + "T00:00:00");
  const B = new Date(b + "T00:00:00");
  return Math.round((B - A) / 86400000);
}

function currentPlanDay() {
  const d = daysBetween(STATE.meta.startDate, todayISO()) + 1;
  return d < 1 ? 1 : d;
}

function fmtDate(iso) {
  if (!iso) return "–";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/* ---------------------------- Toast ---------------------------- */
let toastTimer = null;
function toast(msg, celebrate) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.toggle("celebrate", !!celebrate);
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), celebrate ? 3200 : 2200);
}

/* ---------------------------- Modal ---------------------------- */
function openModal(innerHtml) {
  document.getElementById("modalContent").innerHTML = innerHtml;
  document.getElementById("modalBackdrop").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("modalBackdrop").classList.add("hidden");
  document.getElementById("modalContent").innerHTML = "";
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modalBackdrop").addEventListener("click", (e) => {
    if (e.target.id === "modalBackdrop") closeModal();
  });
});

/* ---------------------------- Badges / small helpers (shared) ---------------------------- */
function statusBadge(status) {
  const map = {
    "applied": ["badge-neutral", "fa-paper-plane"],
    "interview": ["badge-warning", "fa-comments"],
    "offer": ["badge-good", "fa-circle-check"],
    "rejected": ["badge-critical", "fa-circle-xmark"],
    "ghosted": ["badge-serious", "fa-ghost"],
    "not-started": ["badge-neutral", "fa-circle"],
    "in-progress": ["badge-warning", "fa-spinner"],
    "planned": ["badge-neutral", "fa-circle-dot"],
    "done": ["badge-good", "fa-circle-check"],
    "completed": ["badge-good", "fa-circle-check"],
    "pending": ["badge-neutral", "fa-hourglass-half"],
    "passed": ["badge-good", "fa-circle-check"],
    "failed": ["badge-critical", "fa-circle-xmark"],
    "scheduled": ["badge-warning", "fa-calendar"]
  };
  const [cls, icon] = map[status] || ["badge-neutral", "fa-circle"];
  const label = status.replace(/-/g, " ");
  return `<span class="badge ${cls}"><i class="fa-solid ${icon}"></i>${label}</span>`;
}

function levelColor(level) {
  // maps a 0-6 skill level to a step on the sequential blue ramp
  const steps = ["--seq-150","--seq-250","--seq-300","--seq-400","--seq-450","--seq-550","--seq-650"];
  const idx = Math.max(0, Math.min(6, Math.round(level)));
  return `var(${steps[idx]})`;
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

/* ============================================================
   NAVIGATION
   ============================================================ */
const VIEW_TITLES = {
  dashboard: ["Dashboard", "Your career operating system, at a glance"],
  mastersheet: ["90-Day Master Sheet", "Everything on one page — weeks, milestones, and the skill matrix"],
  roadmap: ["90-Day Roadmap", "Days 1-30 · 31-60 · 61-90, week by week"],
  timetable: ["Timetable & Calendar", "The daily template + a study-day log"],
  skills: ["Skill Trackers", "AI · Quant · Math · DSA · Finance — evidence-based, 0-6 scale"],
  progress: ["Progress & Charts", "Skill growth, DSA volume, study hours, 90-day pace"],
  projects: ["Projects", "Portfolio pieces in progress"],
  courses: ["Courses & Resources", "The verified free-resource library"],
  applications: ["Applications", "Internship / job pipeline"],
  interviews: ["Interviews", "Rounds, prep notes, outcomes"],
  competitions: ["Competitions", "Kaggle, hackathons, and the rest"],
  studylog: ["Study & Exercise Log", "Daily hours by category + streaks"],
  milestones: ["Milestones", "Day 30 / 60 / 90 gates and weekly checkpoints"],
  reviews: ["Weekly / Monthly Review", "What got done, what didn't, why"],
  notes: ["Notes", "Freeform, tagged"],
  resume: ["Resume & Portfolio", "Only claim what you can demonstrate at 3+"],
  achievements: ["Achievements", "The log of real, verified wins"],
  settings: ["Settings & Backup", "Theme, data export/import, reset"]
};

function goToView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const target = document.getElementById("view-" + name);
  if (!target) return;
  target.classList.add("active");
  const navBtn = document.querySelector(`.nav-item[data-view="${name}"]`);
  if (navBtn) navBtn.classList.add("active");
  const [title, sub] = VIEW_TITLES[name] || [name, ""];
  document.getElementById("viewTitle").textContent = title;
  document.getElementById("viewSub").innerHTML = sub + ` &nbsp;·&nbsp; Day <b>${currentPlanDay()}</b> of 90`;
  renderView(name);
  renderStakesBanner();
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarScrim").classList.remove("show");
  window.scrollTo(0, 0);
}

const RENDERERS = {
  dashboard: renderDashboard,
  mastersheet: renderMasterSheet,
  roadmap: renderRoadmap,
  timetable: renderTimetable,
  skills: renderSkills,          // trackers.js
  progress: renderProgress,      // charts.js
  projects: renderProjects,      // trackers.js
  courses: renderCourses,        // trackers.js
  applications: renderApplications, // trackers.js
  interviews: renderInterviews,  // trackers.js
  competitions: renderCompetitions, // trackers.js
  studylog: renderStudyLog,      // trackers.js
  milestones: renderMilestones,
  reviews: renderReviews,        // trackers.js
  notes: renderNotes,
  resume: renderResume,
  achievements: renderAchievements,
  settings: renderSettings
};

function renderView(name) {
  const fn = RENDERERS[name];
  if (fn) fn();
}

function refreshAll() {
  saveState();
  const active = document.querySelector(".view.active");
  if (active) {
    const name = active.id.replace("view-", "");
    renderView(name);
  }
}

/* ============================================================
   GAMIFICATION — XP / Levels / Badges
   (computed from real tracked activity, never a fake number —
   if this reads as inflated, it's because the underlying data is)
   ============================================================ */
const LEVEL_TITLES = [
  "Diagnostic Survivor", "Pattern Recognizer", "Habit Breaker", "Momentum Builder",
  "Problem Solver", "Shipped Something Real", "Interview Sharp", "Bottleneck Killer",
  "Offer Threat", "Groundtruth"
];
const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];

function totalXP() {
  STATE.pomodoroLog = STATE.pomodoroLog || [];
  STATE.dailyPlanDone = STATE.dailyPlanDone || {};
  const tasksDone = Object.values(STATE.roadmapDone || {}).filter(Boolean).length;
  const milestonesPassed = STATE.milestones.filter(m => m.status === "passed").length;
  const studyDays = STATE.studyLog.length;
  const projectMilestones = STATE.projects.reduce((a, p) => a + (p.milestones || []).filter(m => m.done).length, 0);
  const exerciseDays = STATE.exerciseLog.filter(e => e.done).length;
  const pomodoroSessions = STATE.pomodoroLog.reduce((a, l) => a + l.count, 0);
  const dailySlotsDone = Object.values(STATE.dailyPlanDone).filter(Boolean).length;
  return tasksDone * 10 + milestonesPassed * 50 + studyDays * 5 + projectMilestones * 15 + exerciseDays * 3 + pomodoroSessions * 8 + dailySlotsDone * 4;
}
function levelInfo() {
  const xp = totalXP();
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) { level = i + 1; break; }
  }
  const idx = level - 1;
  const floor = LEVEL_THRESHOLDS[idx];
  const next = LEVEL_THRESHOLDS[idx + 1] ?? (floor + 600);
  const pct = Math.min(100, Math.round(((xp - floor) / (next - floor)) * 100));
  return { xp, level, title: LEVEL_TITLES[idx] || "Groundtruth", floor, next, pct };
}

/* ============================================================
   STAKES BANNER (persistent, every view)
   ============================================================ */
function renderStakesBanner() {
  const el = document.getElementById("stakesBanner");
  if (!el) return;
  const day = currentPlanDay();
  const nextGate = STATE.milestones.find(m => m.status !== "passed" && m.status !== "failed") || STATE.milestones[STATE.milestones.length - 1];
  const daysToGate = nextGate ? nextGate.dueDay - day : null;
  const weakest = [...STATE.skills].sort((a, b) => (a.level - a.target) - (b.level - b.target))[0];
  const cw = findCurrentWeek();
  const weekTasksTotal = cw ? cw.week.tasks.length : 0;
  const weekTasksDone = cw ? cw.week.tasks.filter((_, tIdx) => {
    const pIdx = STATE.roadmap.indexOf(cw.phase);
    const wIdx = cw.phase.weeks.indexOf(cw.week);
    return (STATE.roadmapDone || {})[`${pIdx}-${wIdx}-${tIdx}`];
  }).length : 0;
  const onTrack = weekTasksTotal > 0 && weekTasksDone === weekTasksTotal;

  el.className = "stakes-banner" + (onTrack ? " on-track" : "");
  el.innerHTML = `
    <i class="fa-solid ${onTrack ? "fa-fire" : "fa-triangle-exclamation"} sb-icon"></i>
    <div>
      <b>TARGET: ${escapeHtml(STATE.strategy.primary)}</b> ${escapeHtml("+ a real " + STATE.strategy.aggressiveParallel.split(" (")[0] + " shot")} — before 2027 graduation.
      <span class="sb-sub">&nbsp;Day ${day}/90 ${daysToGate != null ? `· ${daysToGate <= 0 ? "GATE DUE NOW" : daysToGate + " days to " + nextGate.title} ` : ""}· weakest right now: ${escapeHtml(weakest.name)} (${weakest.level}/6, needs ${weakest.target}/6)${onTrack ? " · this week's tasks: done" : ""}</span>
    </div>
  `;
}

/* ============================================================
   FLOATING FOCUS TIMER (Pomodoro-style)
   Two work presets (Quick 25 for the interruptible work window,
   Deep 50 for the evening deep-work blocks) since one fixed length
   didn't fit both kinds of time in the real schedule. Auto long-break
   every 4th session, audio + browser notification on completion so
   it's noticeable even if the tab isn't focused, and a hint pulled
   from today's actual day-by-day plan instead of a generic label.
   ============================================================ */
const TIMER_DURATIONS = { quick: 25 * 60, deep: 50 * 60, break: 5 * 60, longBreak: 15 * 60 };
const WORK_TYPES = ["quick", "deep"];
let timer = { type: "quick", remaining: TIMER_DURATIONS.quick, running: false, intervalId: null };
let notifyPermissionAsked = false;

function fmtClock(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function todayPomodoroCount() {
  const t = todayISO();
  const entry = (STATE.pomodoroLog || []).find(l => l.date === t);
  return entry ? entry.count : 0;
}
function logPomodoroSession() {
  const t = todayISO();
  STATE.pomodoroLog = STATE.pomodoroLog || [];
  const entry = STATE.pomodoroLog.find(l => l.date === t);
  if (entry) entry.count++;
  else STATE.pomodoroLog.push({ date: t, count: 1 });
  saveState();
  return todayPomodoroCount();
}
/* The only path that adds study hours automatically — tied to a real
   completed, timed session, not a typed-in number. This exists because
   free-form hour entry is too easy to log wrong or inflate by accident. */
function addStudyMinutes(category, minutes) {
  const t = todayISO();
  let entry = STATE.studyLog.find(l => l.date === t);
  if (!entry) {
    entry = { date: t, hours: {}, total: 0 };
    STATE.studyLog.unshift(entry);
    STATE.studyLog.sort((a, b) => b.date.localeCompare(a.date));
  }
  const added = Math.round((minutes / 60) * 100) / 100;
  entry.hours[category] = Math.round(((entry.hours[category] || 0) + added) * 100) / 100;
  entry.total = Math.round(Object.values(entry.hours).reduce((a, v) => a + v, 0) * 100) / 100;
  saveState();
}

/* Sound + system notification — a silent toast is easy to miss,
   especially mid-focus or if the tab isn't in front. */
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.18, 0.36].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = i === 2 ? 880 : 660;
      gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.15);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.16);
    });
  } catch (e) { /* Web Audio unavailable — silent no-op, toast still fires */ }
}
function notifyCompletion(title, body) {
  playBeep();
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "" });
  } else if (Notification.permission !== "denied" && !notifyPermissionAsked) {
    notifyPermissionAsked = true;
    Notification.requestPermission().then(p => { if (p === "granted") new Notification(title, { body }); });
  }
}

function todayHintFor(type) {
  const plan = findDayPlan(currentPlanDay());
  if (!plan) return "";
  const p = plan.plan;
  if (type === "quick") return p.daytime && p.daytime !== "—" ? `Today's work-window plan: ${p.daytime}` : "";
  if (type === "deep") {
    const parts = [p.deep1, p.deep2].filter(x => x && x !== "—");
    return parts.length ? `Today's deep work: ${parts.join(" · ")}` : "";
  }
  return "";
}
function onCategoryChange() {
  STATE.settings.lastTimerCategory = document.getElementById("ftCategory").value;
  saveState();
}
function updateTimerUI() {
  const total = TIMER_DURATIONS[timer.type];
  const pctElapsed = Math.round(((total - timer.remaining) / total) * 100);
  document.getElementById("ftRing").style.setProperty("--pct", pctElapsed);
  document.getElementById("ftTimeCollapsed").textContent = fmtClock(timer.remaining);
  document.getElementById("ftLabelCollapsed").textContent = timer.running ? (WORK_TYPES.includes(timer.type) ? "Focusing…" : "On break…") : "Focus timer";
  document.getElementById("ftBigTime").textContent = fmtClock(timer.remaining);
  document.getElementById("ftStartPause").innerHTML = timer.running ? '<i class="fa-solid fa-pause"></i> Pause' : '<i class="fa-solid fa-play"></i> Start';
  const n = todayPomodoroCount();
  document.getElementById("ftSessions").textContent = `${n} focus session${n === 1 ? "" : "s"} today${n > 0 && n % 4 === 0 ? " — long break earned" : ""}`;
  document.getElementById("ftHint").textContent = todayHintFor(timer.type);
}
function toggleTimerExpanded() {
  const el = document.getElementById("focusTimer");
  const expanding = !el.classList.contains("expanded");
  el.classList.toggle("expanded");
  document.getElementById("ftClose").style.display = expanding ? "block" : "none";
  updateTimerUI();
}
function collapseTimer(e) {
  e.stopPropagation();
  document.getElementById("focusTimer").classList.remove("expanded");
  document.getElementById("ftClose").style.display = "none";
}
function setTimerDuration(type) {
  if (timer.running) return;
  timer.type = type;
  timer.remaining = TIMER_DURATIONS[type];
  document.getElementById("ftDurQuick").classList.toggle("active", type === "quick");
  document.getElementById("ftDurDeep").classList.toggle("active", type === "deep");
  document.getElementById("ftDurBreak").classList.toggle("active", type === "break" || type === "longBreak");
  document.getElementById("ftCategoryField").style.display = WORK_TYPES.includes(type) ? "flex" : "none";
  updateTimerUI();
}
// Suggests a sensible default the moment the widget is opened, based on
// the real timetable block the current clock time falls in.
function suggestTimerDefault() {
  const h = new Date().getHours() + new Date().getMinutes() / 60;
  if (h >= 19.5 && h < 23.25) return "deep";   // evening deep-work blocks
  if (h >= 9.5 && h < 18) return "quick";       // interruptible work window
  return "quick";
}
function startPauseTimer(e) {
  e.stopPropagation();
  if (timer.running) {
    clearInterval(timer.intervalId);
    timer.running = false;
  } else {
    timer.running = true;
    timer.intervalId = setInterval(() => {
      timer.remaining--;
      if (timer.remaining <= 0) {
        clearInterval(timer.intervalId);
        timer.running = false;
        if (WORK_TYPES.includes(timer.type)) {
          const count = logPomodoroSession();
          const category = document.getElementById("ftCategory").value;
          addStudyMinutes(category, TIMER_DURATIONS[timer.type] / 60);
          if (document.querySelector(".view.active")?.id === "view-studylog") renderStudyLog();
          if (document.querySelector(".view.active")?.id === "view-dashboard") renderDashboard();
          const mins = Math.round(TIMER_DURATIONS[timer.type] / 60);
          const isLongBreak = count % 4 === 0;
          notifyCompletion("Focus session done", `${mins}min logged to ${category}. ${isLongBreak ? "Long break earned." : "Short break."}`);
          toast(`${mins}min logged to ${category} — real time, not typed in.${isLongBreak ? " Long break earned." : ""}`, isLongBreak);
          setTimerDuration(isLongBreak ? "longBreak" : "break");
        } else {
          notifyCompletion("Break's over", "Back to it.");
          toast("Break's over.");
          setTimerDuration(suggestTimerDefault());
        }
      }
      updateTimerUI();
    }, 1000);
  }
  updateTimerUI();
}
function resetTimer(e) {
  e.stopPropagation();
  clearInterval(timer.intervalId);
  timer.running = false;
  timer.remaining = TIMER_DURATIONS[timer.type];
  updateTimerUI();
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function weakSkills() {
  return STATE.skills.filter(s => s.level < 2.5 && s.category !== "Quant" || (s.category === "Quant" && s.id !== "mentalmath" && s.level < 2));
}

function findCurrentWeek() {
  const day = currentPlanDay();
  for (const phase of STATE.roadmap) {
    for (const w of phase.weeks) {
      const [start, end] = w.days.split("-").map(n => parseInt(n, 10));
      if (day >= start && day <= end) return { phase, week: w, start, end };
    }
  }
  return null;
}

function findDayPlan(dayNum) {
  for (const phase of STATE.roadmap) {
    for (const w of phase.weeks) {
      if (!w.dailyPlan) continue;
      const found = w.dailyPlan.find(d => d.d === dayNum);
      if (found) return { week: w, plan: found };
    }
  }
  return null;
}
function toggleDailyPlanSlot(day, slot) {
  STATE.dailyPlanDone = STATE.dailyPlanDone || {};
  const key = `${day}-${slot}`;
  STATE.dailyPlanDone[key] = !STATE.dailyPlanDone[key];
  saveState();
  renderDashboard();
}

function studyStreak() {
  const days = new Set(STATE.studyLog.map(l => l.date));
  let streak = 0;
  let cursor = new Date(todayISO() + "T00:00:00");
  while (true) {
    const iso = cursor.toISOString().slice(0, 10);
    if (days.has(iso)) { streak++; cursor.setDate(cursor.getDate() - 1); }
    else break;
  }
  return streak;
}

const PLAN_SLOTS = [
  { key: "morning", label: "Morning (8:30-9:30)", icon: "fa-feather", color: "var(--series-4)" },
  { key: "daytime", label: "Work window (9:30-18:00)", icon: "fa-shuffle", color: "var(--series-2)" },
  { key: "deep1", label: "Deep work 1 (19:30-21:30)", icon: "fa-bolt", color: "var(--series-1)" },
  { key: "deep2", label: "Deep work 2 (21:45-23:15)", icon: "fa-bolt", color: "var(--series-1)" },
  { key: "night", label: "Night (23:15-23:30)", icon: "fa-moon", color: "var(--series-7)" }
];
function renderTodayPlanCard(day, plan) {
  STATE.dailyPlanDone = STATE.dailyPlanDone || {};
  const isBufferDay = plan.daytime.includes("CATCH-UP") || plan.daytime.includes("BUFFER");
  const doneCount = PLAN_SLOTS.filter(s => plan[s.key] !== "—" && STATE.dailyPlanDone[`${day}-${s.key}`]).length;
  const activeSlots = PLAN_SLOTS.filter(s => plan[s.key] && plan[s.key] !== "—");
  return `
    <div class="card mb-16" style="border-color:var(--series-1);">
      <div class="card-title-row">
        <h3><i class="fa-solid fa-calendar-day"></i>&nbsp; Today's plan — Day ${day}${isBufferDay ? " (buffer day)" : ""}</h3>
        <span class="muted">${doneCount}/${activeSlots.length} done</span>
      </div>
      ${activeSlots.map(s => {
        const key = `${day}-${s.key}`;
        const checked = !!STATE.dailyPlanDone[key];
        return `
        <label class="task-row ${checked ? "done" : ""}" style="align-items:flex-start; cursor:pointer;">
          <input type="checkbox" ${checked ? "checked" : ""} onchange="toggleDailyPlanSlot(${day}, '${s.key}')" style="margin-top:4px;" />
          <span>
            <span class="badge" style="background:color-mix(in srgb, ${s.color} 18%, transparent); color:${s.color}; margin-right:6px;"><i class="fa-solid ${s.icon}"></i>${s.label}</span>
            <span>${escapeHtml(plan[s.key])}</span>
          </span>
        </label>`;
      }).join("")}
    </div>
  `;
}
function renderDashboard() {
  const day = currentPlanDay();
  const pct = Math.min(100, Math.round((day / 90) * 100));
  const cw = findCurrentWeek();
  const avgSkill = (STATE.skills.reduce((a, s) => a + s.level, 0) / STATE.skills.length).toFixed(1);
  const dsaHours = STATE.studyLog.reduce((a, l) => a + (l.hours.dsa || 0), 0);
  const weak = weakSkills().sort((a, b) => a.level - b.level).slice(0, 3);
  const streak = studyStreak();
  const upcomingMilestone = STATE.milestones.find(m => m.status !== "passed" && m.status !== "failed" && m.dueDay >= day) || STATE.milestones[STATE.milestones.length - 1];

  const li = levelInfo();
  const loggedToday = STATE.studyLog.some(l => l.date === todayISO());
  const todayPlan = findDayPlan(day);

  const el = document.getElementById("view-dashboard");
  el.innerHTML = `
    ${todayPlan ? renderTodayPlanCard(day, todayPlan.plan) : ""}
    ${!loggedToday ? `
    <div class="card nudge-card mb-16">
      <div class="flex-between">
        <div>
          <b style="font-size:13.5px;">Nothing logged today yet.</b>
          <p style="font-size:12.5px; margin-top:2px;">Streak is at ${streak}. A zero today breaks it — that's the whole mechanic, no exceptions for "basically did stuff."</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="goToView('studylog')">Log now</button>
      </div>
    </div>` : ""}

    <div class="card level-card mb-16">
      <div class="level-badge">${li.level}</div>
      <div class="level-info">
        <div class="title">Level ${li.level}: ${escapeHtml(li.title)}</div>
        <div class="xp">${li.xp} XP ${li.next ? `· ${li.next - li.xp} to next level` : ""}</div>
        <div class="xp-bar"><span style="width:${li.pct}%"></span></div>
        ${STATE.achievements.length ? `<div class="badge-row">${STATE.achievements.slice(0, 4).map(a => `<span class="earned-badge"><i class="fa-solid fa-medal"></i>${escapeHtml(a.title)}</span>`).join("")}</div>` : ""}
      </div>
    </div>

    <div class="grid grid-4 mb-16">
      <div class="card stat-tile">
        <div class="value">${day} <small style="font-size:14px;color:var(--text-muted)">/ 90</small></div>
        <div class="label">Day of plan</div>
        <div class="meter mt-16"><span style="width:${pct}%"></span></div>
      </div>
      <div class="card stat-tile">
        <div class="value">${avgSkill}<small style="font-size:14px;color:var(--text-muted)">/6</small></div>
        <div class="label">Average skill level</div>
        <div class="delta flat"><i class="fa-solid fa-arrow-right"></i> across ${STATE.skills.length} tracked domains</div>
      </div>
      <div class="card stat-tile">
        <div class="value">${streak}</div>
        <div class="label">Day study streak</div>
        <div class="delta ${streak > 0 ? "good" : "flat"}"><i class="fa-solid fa-fire"></i> ${streak > 0 ? "keep it going" : "log today to start one"}</div>
      </div>
      <div class="card stat-tile">
        <div class="value">${dsaHours}h</div>
        <div class="label">DSA hours logged</div>
        <div class="delta flat"><i class="fa-solid fa-code"></i> total since start</div>
      </div>
    </div>

    <div class="grid grid-3 mb-16">
      <div class="card" style="grid-column: span 2;">
        <div class="card-title-row"><h3><i class="fa-solid fa-route"></i>&nbsp; This week</h3></div>
        ${cw ? `
          <div class="muted mb-16">${cw.phase.phase}</div>
          <h4 style="font-size:14.5px;">${cw.week.title}</h4>
          <ul style="margin:8px 0 0 18px; padding:0; font-size:13px; color:var(--text-secondary);">
            ${cw.week.tasks.slice(0, 4).map(t => `<li style="margin-bottom:6px;">${escapeHtml(t)}</li>`).join("")}
          </ul>
          <button class="btn btn-sm mt-16" onclick="goToView('roadmap')">Open full roadmap <i class="fa-solid fa-arrow-right"></i></button>
        ` : `<div class="empty-state"><i class="fa-solid fa-flag-checkered"></i>Plan window complete — check Milestones for what's next.</div>`}
      </div>
      <div class="card">
        <div class="card-title-row"><h3><i class="fa-solid fa-flag-checkered"></i>&nbsp; Next gate</h3></div>
        ${upcomingMilestone ? `
          <h4 style="font-size:14.5px;">${escapeHtml(upcomingMilestone.title)}</h4>
          <p style="font-size:12.5px;">Due Day ${upcomingMilestone.dueDay}</p>
          ${statusBadge(upcomingMilestone.status)}
          <p style="font-size:12px; margin-top:10px;">${escapeHtml(upcomingMilestone.criteria)}</p>
        ` : `<div class="empty-state">No milestones set.</div>`}
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card">
        <div class="card-title-row"><h3><i class="fa-solid fa-triangle-exclamation"></i>&nbsp; Weakness detection</h3></div>
        ${weak.length ? weak.map(s => `
          <div class="flex-between" style="padding:8px 0; border-bottom:1px solid var(--gridline);">
            <div>
              <div style="font-size:13px; font-weight:600;">${escapeHtml(s.name)}</div>
              <div class="muted">${s.level}/6 — target ${s.target}</div>
            </div>
            <span class="badge badge-critical"><i class="fa-solid fa-arrow-trend-down"></i>needs work</span>
          </div>
        `).join("") : `<div class="empty-state"><i class="fa-solid fa-thumbs-up"></i>No domain is critically behind right now.</div>`}
        <button class="btn btn-sm mt-16" onclick="goToView('skills')">Open skill trackers <i class="fa-solid fa-arrow-right"></i></button>
      </div>
      <div class="card">
        <div class="card-title-row"><h3><i class="fa-solid fa-compass"></i>&nbsp; Strategy reference</h3></div>
        <p style="font-size:12.5px;"><b>Primary:</b> ${escapeHtml(STATE.strategy.primary)}</p>
        <p style="font-size:12.5px;"><b>Secondary:</b> ${escapeHtml(STATE.strategy.secondary)}</p>
        <p style="font-size:12.5px;"><b>Aggressive parallel:</b> ${escapeHtml(STATE.strategy.aggressiveParallel)}</p>
        <p style="font-size:12.5px;"><b>Option:</b> ${escapeHtml(STATE.strategy.option)}</p>
        <p style="font-size:11.5px; margin-top:10px;">${escapeHtml(STATE.strategy.notes)}</p>
      </div>
    </div>
  `;
}

/* ============================================================
   90-DAY MASTER SHEET
   (the digital replacement for a printable master sheet — one
   consolidated view of weeks, milestones, and the skill matrix.
   A native browser print (Ctrl/Cmd+P) works fine on this page if
   a physical copy is ever wanted, no dedicated print stylesheet.)
   ============================================================ */
function renderMasterSheet() {
  const day = currentPlanDay();
  const el = document.getElementById("view-mastersheet");

  let weekRows = "";
  STATE.roadmap.forEach((phase, pIdx) => {
    phase.weeks.forEach((w, wIdx) => {
      const [start, end] = w.days.split("-").map(n => parseInt(n, 10));
      const total = w.tasks.length;
      const done = w.tasks.filter((_, tIdx) => (STATE.roadmapDone || {})[`${pIdx}-${wIdx}-${tIdx}`]).length;
      const state = done === total && total > 0 ? "done" : (day >= start && day <= end) ? "in-progress" : (day > end) ? "overdue" : "not-started";
      const badge = state === "done" ? statusBadge("completed") : state === "in-progress" ? statusBadge("in-progress") : state === "overdue" ? statusBadge("failed") : statusBadge("pending");
      weekRows += `
        <tr>
          <td class="muted">${phase.phase.split("—")[0].trim()}</td>
          <td><b>${escapeHtml(w.title)}</b></td>
          <td>${w.days}</td>
          <td>${done}/${total}</td>
          <td>${badge}</td>
        </tr>`;
    });
  });

  const milestoneRows = STATE.milestones.map(m => `
    <tr>
      <td><b>${escapeHtml(m.title)}</b></td>
      <td>${m.dueDay}</td>
      <td>${statusBadge(m.status)}</td>
      <td class="muted" style="font-size:12px;">${escapeHtml(m.criteria)}</td>
    </tr>`).join("");

  const skillRows = STATE.skills.map(s => `
    <tr>
      <td><b>${escapeHtml(s.name)}</b></td>
      <td class="muted">${escapeHtml(s.category)}</td>
      <td>${s.level}/6</td>
      <td>${s.target}/6</td>
      <td>${s.level >= s.target ? statusBadge("completed") : s.level >= s.target - 1 ? `<span class="badge badge-warning"><i class="fa-solid fa-minus"></i>close</span>` : `<span class="badge badge-critical"><i class="fa-solid fa-arrow-down"></i>behind</span>`}</td>
    </tr>`).join("");

  const weeksTotal = STATE.roadmap.reduce((a, p) => a + p.weeks.length, 0);
  const weeksDone = STATE.roadmap.reduce((a, p) => a + p.weeks.filter((w, wIdx) => {
    const pIdx = STATE.roadmap.indexOf(p);
    return w.tasks.every((_, tIdx) => (STATE.roadmapDone || {})[`${pIdx}-${wIdx}-${tIdx}`]);
  }).length, 0);

  el.innerHTML = `
    <div class="flex-between mb-16">
      <p class="muted">Day ${day} of 90 · Plan start ${fmtDate(STATE.meta.startDate)} · Generated ${fmtDate(todayISO())}</p>
      <button class="btn btn-sm" onclick="window.print()"><i class="fa-solid fa-print"></i> Print this page</button>
    </div>

    <div class="grid grid-4 mb-16">
      <div class="card stat-tile"><div class="value">${day}/90</div><div class="label">Day of plan</div></div>
      <div class="card stat-tile"><div class="value">${weeksDone}/${weeksTotal}</div><div class="label">Weeks fully complete</div></div>
      <div class="card stat-tile"><div class="value">${STATE.milestones.filter(m => m.status === "passed").length}/${STATE.milestones.length}</div><div class="label">Gates passed</div></div>
      <div class="card stat-tile"><div class="value">${(STATE.skills.reduce((a, s) => a + s.level, 0) / STATE.skills.length).toFixed(1)}/6</div><div class="label">Average skill level</div></div>
    </div>

    <div class="card mb-16">
      <div class="card-title-row"><h3><i class="fa-solid fa-route"></i>&nbsp; All 12 weeks</h3></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Phase</th><th>Week</th><th>Days</th><th>Tasks</th><th>Status</th></tr></thead>
        <tbody>${weekRows}</tbody>
      </table></div>
    </div>

    <div class="card mb-16">
      <div class="card-title-row"><h3><i class="fa-solid fa-flag-checkered"></i>&nbsp; Go/No-Go gates</h3></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Gate</th><th>Due day</th><th>Status</th><th>Criteria</th></tr></thead>
        <tbody>${milestoneRows}</tbody>
      </table></div>
    </div>

    <div class="card">
      <div class="card-title-row"><h3><i class="fa-solid fa-brain"></i>&nbsp; Skill matrix snapshot</h3></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Domain</th><th>Category</th><th>Level</th><th>Target</th><th></th></tr></thead>
        <tbody>${skillRows}</tbody>
      </table></div>
    </div>
  `;
}

/* ============================================================
   ROADMAP
   ============================================================ */
function toggleTask(phaseIdx, weekIdx, taskIdx) {
  const key = `${phaseIdx}-${weekIdx}-${taskIdx}`;
  STATE.roadmapDone = STATE.roadmapDone || {};
  STATE.roadmapDone[key] = !STATE.roadmapDone[key];
  saveState();
  renderRoadmap();
}
function toggleWeekOpen(id) {
  const el = document.getElementById(id);
  el.classList.toggle("open");
}
function renderRoadmap() {
  STATE.roadmapDone = STATE.roadmapDone || {};
  const day = currentPlanDay();
  const el = document.getElementById("view-roadmap");
  let html = "";
  STATE.roadmap.forEach((phase, pIdx) => {
    html += `<div class="section-title">${escapeHtml(phase.phase)}</div>`;
    phase.weeks.forEach((w, wIdx) => {
      const [start, end] = w.days.split("-").map(n => parseInt(n, 10));
      const isCurrent = day >= start && day <= end;
      const total = w.tasks.length;
      const done = w.tasks.filter((_, tIdx) => STATE.roadmapDone[`${pIdx}-${wIdx}-${tIdx}`]).length;
      const bodyId = `week-${pIdx}-${wIdx}`;
      html += `
        <div class="week-block" ${isCurrent ? 'style="border-color:var(--series-1)"' : ""}>
          <div class="week-header" onclick="toggleWeekOpen('${bodyId}')">
            <div>
              <span class="wtitle">${escapeHtml(w.title)}</span>
              ${isCurrent ? '<span class="badge badge-good" style="margin-left:8px;">current</span>' : ""}
            </div>
            <div class="flex gap-10">
              <span class="wdays">Days ${w.days} · ${done}/${total}</span>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div class="week-body ${isCurrent ? "open" : ""}" id="${bodyId}">
            ${w.tasks.map((t, tIdx) => {
              const key = `${pIdx}-${wIdx}-${tIdx}`;
              const checked = !!STATE.roadmapDone[key];
              return `<div class="task-row ${checked ? "done" : ""}">
                <input type="checkbox" ${checked ? "checked" : ""} onchange="toggleTask(${pIdx},${wIdx},${tIdx})" id="t-${key}" />
                <label for="t-${key}">${escapeHtml(t)}</label>
              </div>`;
            }).join("")}
            ${w.resources && w.resources.length ? `
              <div class="muted mt-16">Resources: ${w.resources.map(rid => {
                const c = STATE.courses.find(c => c.id === rid);
                return c ? `<a href="${c.url}" target="_blank" rel="noopener">${escapeHtml(c.name)}</a>` : rid;
              }).join(", ")}</div>
            ` : ""}
            ${w.dailyPlan ? `
              <div class="mt-16">
                <div class="muted" style="font-weight:650; margin-bottom:6px;">Day-by-day (check today's box on the Dashboard, this is reference only)</div>
                <div class="table-wrap"><table>
                  <thead><tr><th>Day</th><th>Morning</th><th>Work window</th><th>Deep work 1</th><th>Deep work 2</th><th>Night</th></tr></thead>
                  <tbody>
                    ${w.dailyPlan.map(dp => `<tr ${dp.d === day ? 'style="background:color-mix(in srgb, var(--series-1) 8%, transparent);"' : ""}>
                      <td><b>${dp.d}${dp.d === day ? " (today)" : ""}</b></td>
                      <td style="font-size:12px;">${escapeHtml(dp.morning)}</td>
                      <td style="font-size:12px;">${escapeHtml(dp.daytime)}</td>
                      <td style="font-size:12px;">${escapeHtml(dp.deep1)}</td>
                      <td style="font-size:12px;">${escapeHtml(dp.deep2)}</td>
                      <td style="font-size:12px;">${escapeHtml(dp.night)}</td>
                    </tr>`).join("")}
                  </tbody>
                </table></div>
              </div>
            ` : ""}
          </div>
        </div>
      `;
    });
  });
  el.innerHTML = html;
}

/* ============================================================
   TIMETABLE & CALENDAR
   ============================================================ */
const TT_TYPE_STYLE = {
  fixed: { color: "var(--text-muted)", label: "FIXED", icon: "fa-lock" },
  light: { color: "var(--series-4)", label: "LIGHT", icon: "fa-feather" },
  flexible: { color: "var(--series-2)", label: "INTERRUPTIBLE", icon: "fa-shuffle" },
  deep: { color: "var(--series-1)", label: "DEEP WORK", icon: "fa-bolt" }
};
function renderTimetable() {
  const el = document.getElementById("view-timetable");
  const monthDays = buildCalendarMonth();
  el.innerHTML = `
    <div class="card mb-16">
      <div class="card-title-row"><h3><i class="fa-solid fa-clock"></i>&nbsp; Your actual daily structure</h3></div>
      <p class="muted mb-16">Built from your real schedule, not a generic template. Color = what kind of task belongs in each block — matching that matters more than the exact minutes.</p>
      <div class="table-wrap"><table>
        <tbody>
          ${STATE.timetable.map(b => {
            const s = TT_TYPE_STYLE[b.type] || TT_TYPE_STYLE.light;
            return `<tr style="border-left:3px solid ${s.color};">
              <td style="width:120px; color:var(--text-muted); font-variant-numeric:tabular-nums; white-space:nowrap;">${escapeHtml(b.time)}</td>
              <td style="width:130px;"><span class="badge" style="background:color-mix(in srgb, ${s.color} 18%, transparent); color:${s.color};"><i class="fa-solid ${s.icon}"></i>${s.label}</span></td>
              <td>
                <b>${escapeHtml(b.block)}</b>
                ${b.note ? `<div class="muted" style="font-size:12px; margin-top:2px;">${escapeHtml(b.note)}</div>` : ""}
              </td>
            </tr>`;
          }).join("")}
        </tbody>
      </table></div>
      <p class="muted mt-16">Use the floating focus timer for anything in an INTERRUPTIBLE block — it's built for exactly this: short, resumable, survives getting pulled away mid-session.</p>
    </div>
    <div class="card">
      <div class="card-title-row"><h3><i class="fa-solid fa-calendar-days"></i>&nbsp; This month — study days logged</h3></div>
      <div class="streak-cal" style="grid-template-columns: repeat(7, 1fr);">
        ${monthDays.map(d => `<div class="streak-day ${d.hit ? "hit" : ""}" title="${d.date}${d.hit ? " — logged" : ""}"></div>`).join("")}
      </div>
      <p class="muted mt-16">Filled = a day with a study-log entry. Log daily hours from Study &amp; Exercise Log.</p>
      <button class="btn btn-sm mt-16" onclick="goToView('studylog')">Go log today <i class="fa-solid fa-arrow-right"></i></button>
    </div>
  `;
}
function buildCalendarMonth() {
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  const first = new Date(y, m, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const logged = new Set(STATE.studyLog.map(l => l.date));
  const cells = [];
  for (let i = 0; i < startPad; i++) cells.push({ date: "", hit: false });
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ date: iso, hit: logged.has(iso) });
  }
  return cells;
}

/* ============================================================
   MILESTONES
   ============================================================ */
function setMilestoneStatus(id, status) {
  const m = STATE.milestones.find(m => m.id === id);
  if (!m) return;
  m.status = status;
  if (status === "passed") {
    STATE.achievements.push({ id: uid("a"), date: todayISO(), title: `Passed: ${m.title}`, description: m.criteria });
  }
  saveState();
  renderMilestones();
  toast("Milestone updated");
}
function renderMilestones() {
  const day = currentPlanDay();
  const el = document.getElementById("view-milestones");
  el.innerHTML = `
    <div class="grid grid-3">
      ${STATE.milestones.map(m => `
        <div class="card">
          <div class="card-title-row"><h3>${escapeHtml(m.title)}</h3>${statusBadge(m.status)}</div>
          <p class="muted">Due Day ${m.dueDay} ${m.dueDay <= day ? "(reached)" : `(in ${m.dueDay - day} days)`}</p>
          <p style="font-size:13px;">${escapeHtml(m.criteria)}</p>
          <div class="flex gap-8 mt-16">
            <button class="btn btn-sm" onclick="setMilestoneStatus('${m.id}','passed')"><i class="fa-solid fa-check"></i> Pass</button>
            <button class="btn btn-sm btn-danger" onclick="setMilestoneStatus('${m.id}','failed')"><i class="fa-solid fa-xmark"></i> No-Go</button>
            <button class="btn btn-sm" onclick="setMilestoneStatus('${m.id}','pending')">Reset</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

/* ============================================================
   NOTES
   ============================================================ */
function openNoteModal(id) {
  const n = id ? STATE.notes.find(n => n.id === id) : null;
  openModal(`
    <div class="modal-header"><h3>${n ? "Edit" : "New"} note</h3><button class="icon-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button></div>
    <div class="field"><label>Tags (comma separated)</label><input type="text" id="f-tags" value="${escapeHtml(n ? n.tags.join(", ") : "")}" placeholder="quant, interview, idea" /></div>
    <div class="field"><label>Content</label><textarea id="f-content" rows="6">${escapeHtml(n ? n.content : "")}</textarea></div>
    <div class="modal-actions">
      ${n ? `<button class="btn btn-danger" onclick="deleteNote('${n.id}')">Delete</button>` : ""}
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveNote('${n ? n.id : ""}')">Save</button>
    </div>
  `);
}
function saveNote(id) {
  const tags = document.getElementById("f-tags").value.split(",").map(t => t.trim()).filter(Boolean);
  const content = document.getElementById("f-content").value.trim();
  if (!content) { toast("Note can't be empty"); return; }
  if (id) {
    const n = STATE.notes.find(n => n.id === id);
    n.tags = tags; n.content = content;
  } else {
    STATE.notes.unshift({ id: uid("note"), date: todayISO(), tags, content });
  }
  saveState(); closeModal(); renderNotes(); toast("Note saved");
}
function deleteNote(id) {
  STATE.notes = STATE.notes.filter(n => n.id !== id);
  saveState(); closeModal(); renderNotes(); toast("Note deleted");
}
function renderNotes() {
  const el = document.getElementById("view-notes");
  el.innerHTML = `
    <div class="flex-between mb-16"><div></div><button class="btn btn-primary" onclick="openNoteModal()"><i class="fa-solid fa-plus"></i> New note</button></div>
    ${STATE.notes.length ? `<div class="grid grid-3">${STATE.notes.map(n => `
      <div class="card" style="cursor:pointer;" onclick="openNoteModal('${n.id}')">
        <div class="muted mb-16">${fmtDate(n.date)}</div>
        <p style="font-size:13px; color:var(--text-primary); white-space:pre-wrap;">${escapeHtml(n.content.slice(0, 220))}${n.content.length > 220 ? "…" : ""}</p>
        <div class="mt-16">${n.tags.map(t => `<span class="badge badge-neutral" style="margin-right:4px;">${escapeHtml(t)}</span>`).join("")}</div>
      </div>
    `).join("")}</div>` : `<div class="card empty-state"><i class="fa-solid fa-note-sticky"></i>No notes yet.</div>`}
  `;
}

/* ============================================================
   RESUME & PORTFOLIO
   ============================================================ */
function addPortfolioLink() {
  const url = prompt("Portfolio / GitHub / project link:");
  if (!url) return;
  STATE.resume.portfolioLinks.push({ id: uid("link"), url });
  saveState(); renderResume();
}
function removePortfolioLink(id) {
  STATE.resume.portfolioLinks = STATE.resume.portfolioLinks.filter(l => l.id !== id);
  saveState(); renderResume();
}
function renderResume() {
  const el = document.getElementById("view-resume");
  el.innerHTML = `
    <div class="card mb-16">
      <div class="card-title-row"><h3><i class="fa-solid fa-shield-halved"></i>&nbsp; Claim vs. verified level</h3></div>
      <p class="muted mb-16">Anything below level 3, or untested, does not go on the resume yet — per the rule set at the start of this whole process.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Skill</th><th>Claimed</th><th>Verified level</th><th>Defensible?</th><th>Note</th></tr></thead>
        <tbody>
          ${STATE.resume.claims.map(c => `
            <tr>
              <td><b>${escapeHtml(c.skill)}</b></td>
              <td>${escapeHtml(c.claimedLevel)}</td>
              <td>${c.verifiedLevel == null ? "untested" : c.verifiedLevel + "/6"}</td>
              <td>${c.defensible === true ? statusBadge("offer") : c.defensible === false ? statusBadge("rejected") : statusBadge("pending")}</td>
              <td class="muted">${escapeHtml(c.note)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table></div>
    </div>
    <div class="card">
      <div class="card-title-row"><h3><i class="fa-solid fa-link"></i>&nbsp; Portfolio links</h3><button class="btn btn-sm" onclick="addPortfolioLink()"><i class="fa-solid fa-plus"></i> Add</button></div>
      ${STATE.resume.portfolioLinks.length ? `<div class="link-list">${STATE.resume.portfolioLinks.map(l => `
        <div class="flex-between"><a href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.url)}</a><button class="icon-btn" onclick="removePortfolioLink('${l.id}')"><i class="fa-solid fa-trash"></i></button></div>
      `).join("")}</div>` : `<div class="empty-state">No links yet — add your GitHub / deployed project once Project 1 ships.</div>`}
    </div>
  `;
}

/* ============================================================
   ACHIEVEMENTS
   ============================================================ */
function renderAchievements() {
  const el = document.getElementById("view-achievements");
  const sorted = [...STATE.achievements].sort((a, b) => b.date.localeCompare(a.date));
  el.innerHTML = `
    <div class="card">
      ${sorted.length ? sorted.map(a => `
        <div class="flex gap-16" style="padding:12px 0; border-bottom:1px solid var(--gridline);">
          <div style="width:34px;height:34px;border-radius:50%;background:color-mix(in srgb, var(--status-good) 18%, transparent);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fa-solid fa-medal" style="color:var(--status-good);"></i>
          </div>
          <div>
            <div style="font-weight:650; font-size:13.5px;">${escapeHtml(a.title)}</div>
            <div class="muted">${fmtDate(a.date)}</div>
            <p style="font-size:12.5px; margin-top:4px;">${escapeHtml(a.description)}</p>
          </div>
        </div>
      `).join("") : `<div class="empty-state"><i class="fa-solid fa-medal"></i>Nothing logged yet — pass a milestone or ship a project.</div>`}
    </div>
  `;
}

/* ============================================================
   SETTINGS
   ============================================================ */
function applyTheme(mode) {
  if (mode === "system") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", mode);
  STATE.settings.theme = mode;
  saveState();
}
function toggleThemeQuick() {
  const cur = STATE.settings.theme;
  const next = cur === "dark" ? "light" : cur === "light" ? "system" : "dark";
  applyTheme(next);
  toast("Theme: " + next);
}
function exportData() {
  const blob = new Blob([JSON.stringify(STATE, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `career-os-backup-${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast("Backup downloaded");
}
function importData(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      STATE = parsed;
      saveState();
      applyTheme(STATE.settings.theme || "system");
      toast("Backup restored");
      goToView("dashboard");
    } catch (e) { alert("That file doesn't look like a valid Career OS backup."); }
  };
  reader.readAsText(file);
  evt.target.value = "";
}
function resetAll() {
  if (!confirm("This wipes all local data and reloads the original 90-day plan. Export a backup first if you want to keep anything. Continue?")) return;
  STATE = getFreshDefaultState();
  saveState();
  toast("Reset to default plan");
  goToView("dashboard");
}
function renderSettings() {
  const el = document.getElementById("view-settings");
  el.innerHTML = `
    <div class="grid grid-2">
      <div class="card">
        <div class="card-title-row"><h3><i class="fa-solid fa-palette"></i>&nbsp; Theme</h3></div>
        <div class="form-row">
          <button class="btn ${STATE.settings.theme === "light" ? "btn-primary" : ""}" onclick="applyTheme('light'); renderSettings();">Light</button>
          <button class="btn ${STATE.settings.theme === "dark" ? "btn-primary" : ""}" onclick="applyTheme('dark'); renderSettings();">Dark</button>
          <button class="btn ${STATE.settings.theme === "system" ? "btn-primary" : ""}" onclick="applyTheme('system'); renderSettings();">Match system</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title-row"><h3><i class="fa-solid fa-database"></i>&nbsp; Data &amp; backup</h3></div>
        <p class="muted">Everything lives in this browser's localStorage only — nothing is sent anywhere. Export regularly, especially before clearing browser data.</p>
        <div class="flex gap-8 mt-16">
          <button class="btn btn-primary" onclick="exportData()"><i class="fa-solid fa-download"></i> Export backup (.json)</button>
          <label class="btn" style="cursor:pointer;">
            <i class="fa-solid fa-upload"></i> Import backup
            <input type="file" accept="application/json" style="display:none" onchange="importData(event)" />
          </label>
        </div>
        <div class="mt-16">
          <button class="btn btn-danger" onclick="resetAll()"><i class="fa-solid fa-triangle-exclamation"></i> Reset to default plan</button>
        </div>
      </div>
      <div class="card" style="grid-column: span 2;">
        <div class="card-title-row"><h3><i class="fa-solid fa-circle-info"></i>&nbsp; About this plan</h3></div>
        <p style="font-size:13px;">Plan start date: <b>${fmtDate(STATE.meta.startDate)}</b> · Last updated: <b>${fmtDate(STATE.meta.lastUpdated)}</b></p>
        <p style="font-size:12.5px;">Built from a full Phase 1-5 career strategy engagement: 2026 market research, a 10-domain forced-problem-solving diagnostic (not self-report), evidence-based path selection, a skill-gap analysis, and this 90-day plan. Edit skill levels honestly as you re-test — the whole point of this tool is that it reflects demonstrated ability, not how you feel about your progress.</p>
      </div>
    </div>
  `;
}

/* ============================================================
   INIT
   ============================================================ */
function initNav() {
  document.querySelectorAll(".nav-item[data-view]").forEach(btn => {
    btn.addEventListener("click", () => goToView(btn.dataset.view));
  });
  document.getElementById("mobileToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("sidebarScrim").classList.toggle("show");
  });
  document.getElementById("sidebarScrim").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebarScrim").classList.remove("show");
  });
  document.getElementById("themeToggle").addEventListener("click", toggleThemeQuick);
}

document.addEventListener("DOMContentLoaded", () => {
  STATE = loadState();
  STATE.pomodoroLog = STATE.pomodoroLog || [];
  STATE.dailyPlanDone = STATE.dailyPlanDone || {};
  applyTheme(STATE.settings.theme || "light");
  initNav();
  if (STATE.settings.lastTimerCategory) document.getElementById("ftCategory").value = STATE.settings.lastTimerCategory;
  setTimerDuration(suggestTimerDefault());
  goToView("dashboard");
});
