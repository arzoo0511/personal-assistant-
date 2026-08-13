/* =========================================================================
   charts.js — Progress & Charts view. Chart.js instances, rebuilt on every
   render (destroyed first so re-entering the view doesn't throw "canvas
   already in use"). Colors are read from the CSS custom properties defined
   in styles.css so light/dark stay in sync automatically.
   ========================================================================= */

const chartInstances = {};

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

function chartBaseOptions() {
  const grid = cssVar("--gridline");
  const muted = cssVar("--text-muted");
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: cssVar("--surface-1"),
        titleColor: cssVar("--text-primary"),
        bodyColor: cssVar("--text-secondary"),
        borderColor: cssVar("--border"),
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8
      }
    },
    scales: {
      x: { grid: { color: grid, display: false }, ticks: { color: muted, font: { size: 11 } } },
      y: { grid: { color: grid }, ticks: { color: muted, font: { size: 11 } }, beginAtZero: true }
    }
  };
}

function skillBarColor(level, target) {
  if (level >= target) return cssVar("--status-good");
  if (level >= target - 1) return cssVar("--status-warning");
  return cssVar("--status-critical");
}

function renderSkillChart() {
  destroyChart("skillChart");
  const ctx = document.getElementById("skillChart");
  if (!ctx) return;
  const skills = STATE.skills;
  chartInstances.skillChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: skills.map(s => s.name),
      datasets: [{
        label: "Level",
        data: skills.map(s => s.level),
        backgroundColor: skills.map(s => skillBarColor(s.level, s.target)),
        borderRadius: 4,
        barThickness: 16
      }]
    },
    options: {
      ...chartBaseOptions(),
      indexAxis: "y",
      scales: {
        x: { min: 0, max: 6, grid: { color: cssVar("--gridline") }, ticks: { color: cssVar("--text-muted"), stepSize: 1 } },
        y: { grid: { display: false }, ticks: { color: cssVar("--text-primary"), font: { size: 11.5 } } }
      },
      plugins: {
        ...chartBaseOptions().plugins,
        tooltip: {
          ...chartBaseOptions().plugins.tooltip,
          callbacks: {
            label: (item) => {
              const s = skills[item.dataIndex];
              return `${s.level}/6 (target ${s.target}) — ${s.level >= s.target ? "at target" : "below target"}`;
            }
          }
        }
      }
    }
  });
}

function renderHoursByCategoryChart() {
  destroyChart("hoursChart");
  const ctx = document.getElementById("hoursChart");
  if (!ctx) return;
  const cats = [
    ["math", "Math", "--series-1"], ["dsa", "DSA", "--series-2"], ["quant", "Quant", "--series-3"],
    ["ai", "AI / Projects", "--series-4"], ["projects", "Other projects", "--series-5"], ["interviewPrep", "Interview prep", "--series-7"]
  ];
  const totals = cats.map(([id]) => STATE.studyLog.reduce((a, l) => a + (l.hours[id] || 0), 0));
  chartInstances.hoursChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: cats.map(c => c[1]),
      datasets: [{
        data: totals,
        backgroundColor: cats.map(c => cssVar(c[2])),
        borderRadius: 4,
        barThickness: 28
      }]
    },
    options: chartBaseOptions()
  });
}

function renderCumulativeChart() {
  destroyChart("cumChart");
  const ctx = document.getElementById("cumChart");
  if (!ctx) return;
  const sorted = [...STATE.studyLog].sort((a, b) => a.date.localeCompare(b.date));
  let running = 0;
  const points = sorted.map(l => { running += l.total; return running; });
  chartInstances.cumChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: sorted.map(l => l.date.slice(5)),
      datasets: [{
        data: points,
        borderColor: cssVar("--series-1"),
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: sorted.length > 20 ? 0 : 3,
        pointBackgroundColor: cssVar("--series-1"),
        tension: 0.25
      }]
    },
    options: chartBaseOptions()
  });
}

function renderProgress() {
  const el = document.getElementById("view-progress");
  const day = currentPlanDay();
  const remaining = Math.max(0, 90 - day);
  const totalHours = STATE.studyLog.reduce((a, l) => a + l.total, 0);
  const avgPerDay = STATE.studyLog.length ? (totalHours / STATE.studyLog.length).toFixed(1) : "0";

  el.innerHTML = `
    <div class="grid grid-4 mb-16">
      <div class="card stat-tile"><div class="value">${day}/90</div><div class="label">Days elapsed</div></div>
      <div class="card stat-tile"><div class="value">${remaining}</div><div class="label">Days remaining</div></div>
      <div class="card stat-tile"><div class="value">${totalHours.toFixed(1)}h</div><div class="label">Total study hours logged</div></div>
      <div class="card stat-tile"><div class="value">${avgPerDay}h</div><div class="label">Average per logged day</div></div>
    </div>

    <div class="grid grid-2 mb-16">
      <div class="card chart-card">
        <div class="card-title-row"><h3><i class="fa-solid fa-chart-bar"></i>&nbsp; Skill levels vs. target</h3></div>
        <div style="height:320px;"><canvas id="skillChart"></canvas></div>
        <p class="muted mt-16"><span style="color:var(--status-good)">●</span> at target &nbsp; <span style="color:var(--status-warning)">●</span> within 1 &nbsp; <span style="color:var(--status-critical)">●</span> more than 1 behind</p>
      </div>
      <div class="card chart-card">
        <div class="card-title-row"><h3><i class="fa-solid fa-layer-group"></i>&nbsp; Total hours by category</h3></div>
        <div style="height:320px;"><canvas id="hoursChart"></canvas></div>
      </div>
    </div>

    <div class="card chart-card">
      <div class="card-title-row"><h3><i class="fa-solid fa-chart-line"></i>&nbsp; Cumulative study hours</h3></div>
      ${STATE.studyLog.length ? `<div style="height:260px;"><canvas id="cumChart"></canvas></div>` : `<div class="empty-state"><i class="fa-solid fa-chart-line"></i>Log a few days in Study Log to see this fill in.</div>`}
    </div>
  `;

  renderSkillChart();
  renderHoursByCategoryChart();
  if (STATE.studyLog.length) renderCumulativeChart();
}
