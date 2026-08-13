/* =========================================================================
   trackers.js — Skills, Projects, Courses, Applications, Interviews,
   Competitions, Study/Exercise Log, Reviews. Uses helpers from app.js
   (openModal/closeModal/saveState/toast/escapeHtml/statusBadge/uid/etc).
   ========================================================================= */

/* ============================================================
   SKILLS
   ============================================================ */
function openSkillModal(id) {
  const s = STATE.skills.find(s => s.id === id);
  if (!s) return;
  openModal(`
    <div class="modal-header"><h3>${escapeHtml(s.name)}</h3><button class="icon-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button></div>
    <p class="muted">${escapeHtml(s.note)}</p>
    <div class="form-row">
      <div class="field"><label>Current level (0-6)</label><input type="number" id="f-level" min="0" max="6" step="0.1" value="${s.level}" /></div>
      <div class="field"><label>Target level</label><input type="number" id="f-target" min="0" max="6" step="0.1" value="${s.target}" /></div>
    </div>
    <div class="field"><label>Note on this update (what changed / how you verified it)</label><textarea id="f-note" rows="3" placeholder="e.g. re-solved a fresh Bayes problem cold, correct"></textarea></div>
    <p class="muted" style="font-size:11.5px;">Update this only after real, demonstrated evidence — a cold re-test or a completed problem set — not because it "feels" better. That discipline is the entire point of this tracker.</p>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveSkillUpdate('${id}')">Save update</button>
    </div>
  `);
}
function saveSkillUpdate(id) {
  const s = STATE.skills.find(s => s.id === id);
  const level = parseFloat(document.getElementById("f-level").value);
  const target = parseFloat(document.getElementById("f-target").value);
  const note = document.getElementById("f-note").value.trim();
  if (isNaN(level) || level < 0 || level > 6) { toast("Level must be 0-6"); return; }
  s.level = level;
  s.target = isNaN(target) ? s.target : target;
  s.history.push({ date: todayISO(), level, note: note || "Manual update" });
  saveState();
  closeModal();
  renderSkills();
  toast(`${s.name} updated`);
}
function renderSkills() {
  const el = document.getElementById("view-skills");
  const categories = [...new Set(STATE.skills.map(s => s.category))];
  const avg = (STATE.skills.reduce((a, s) => a + s.level, 0) / STATE.skills.length).toFixed(1);
  let html = `
    <div class="grid grid-4 mb-16">
      <div class="card stat-tile"><div class="value">${avg}/6</div><div class="label">Average across all domains</div></div>
      <div class="card stat-tile"><div class="value">${STATE.skills.filter(s => s.level >= s.target).length}</div><div class="label">Domains at/above target</div></div>
      <div class="card stat-tile"><div class="value">${STATE.skills.filter(s => s.level < 2).length}</div><div class="label">Domains below level 2</div></div>
      <div class="card stat-tile"><div class="value">${Math.max(...STATE.skills.map(s => s.level))}/6</div><div class="label">Strongest domain</div></div>
    </div>
  `;
  categories.forEach(cat => {
    html += `<div class="section-title">${escapeHtml(cat)}</div><div class="heat-grid">`;
    STATE.skills.filter(s => s.category === cat).forEach(s => {
      const behind = s.level < s.target - 1;
      html += `
        <div class="heat-cell" style="cursor:pointer;" onclick="openSkillModal('${s.id}')">
          <div class="name">${escapeHtml(s.name)}</div>
          <div class="lvl">${s.level}<small>/6</small></div>
          <div class="heat-swatch" style="background:${levelColor(s.level)}"></div>
          <div class="muted" style="margin-top:6px;">target ${s.target}</div>
          ${behind ? `<div class="weak-flag"><i class="fa-solid fa-triangle-exclamation"></i>behind target</div>` : ""}
        </div>
      `;
    });
    html += `</div>`;
  });
  el.innerHTML = html;
}

/* ============================================================
   PROJECTS
   ============================================================ */
function openProjectModal(id) {
  const p = id ? STATE.projects.find(p => p.id === id) : null;
  openModal(`
    <div class="modal-header"><h3>${p ? "Edit" : "New"} project</h3><button class="icon-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button></div>
    <div class="field"><label>Name</label><input type="text" id="f-name" value="${escapeHtml(p ? p.name : "")}" /></div>
    <div class="field"><label>Description</label><textarea id="f-desc" rows="3">${escapeHtml(p ? p.description : "")}</textarea></div>
    <div class="form-row">
      <div class="field"><label>Status</label>
        <select id="f-status">
          ${["planned","in-progress","done"].map(v => `<option value="${v}" ${p && p.status === v ? "selected" : ""}>${v}</option>`).join("")}
        </select>
      </div>
      <div class="field"><label>Progress %</label><input type="number" id="f-progress" min="0" max="100" value="${p ? p.progress : 0}" /></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Repo link</label><input type="text" id="f-repo" value="${escapeHtml(p && p.links ? p.links.repo : "")}" /></div>
      <div class="field"><label>Demo link</label><input type="text" id="f-demo" value="${escapeHtml(p && p.links ? p.links.demo : "")}" /></div>
    </div>
    <div class="modal-actions">
      ${p ? `<button class="btn btn-danger" onclick="deleteProject('${p.id}')">Delete</button>` : ""}
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveProject('${p ? p.id : ""}')">Save</button>
    </div>
  `);
}
function saveProject(id) {
  const name = document.getElementById("f-name").value.trim();
  if (!name) { toast("Name required"); return; }
  const data = {
    name,
    description: document.getElementById("f-desc").value.trim(),
    status: document.getElementById("f-status").value,
    progress: parseInt(document.getElementById("f-progress").value, 10) || 0,
    links: { repo: document.getElementById("f-repo").value.trim(), demo: document.getElementById("f-demo").value.trim() }
  };
  if (id) {
    Object.assign(STATE.projects.find(p => p.id === id), data);
  } else {
    STATE.projects.push({ id: uid("proj"), milestones: [], ...data });
  }
  saveState(); closeModal(); renderProjects(); toast("Project saved");
}
function deleteProject(id) {
  STATE.projects = STATE.projects.filter(p => p.id !== id);
  saveState(); closeModal(); renderProjects(); toast("Project deleted");
}
function toggleProjectMilestone(pid, idx) {
  const p = STATE.projects.find(p => p.id === pid);
  p.milestones[idx].done = !p.milestones[idx].done;
  const doneCount = p.milestones.filter(m => m.done).length;
  if (p.milestones.length) p.progress = Math.round((doneCount / p.milestones.length) * 100);
  saveState(); renderProjects();
}
function addMilestoneToProject(pid) {
  const title = prompt("Milestone title:");
  if (!title) return;
  const p = STATE.projects.find(p => p.id === pid);
  p.milestones.push({ title, done: false, dueWeek: null });
  saveState(); renderProjects();
}
function renderProjects() {
  const el = document.getElementById("view-projects");
  el.innerHTML = `
    <div class="flex-between mb-16"><div></div><button class="btn btn-primary" onclick="openProjectModal()"><i class="fa-solid fa-plus"></i> New project</button></div>
    ${STATE.projects.length ? STATE.projects.map(p => `
      <div class="card mb-16">
        <div class="card-title-row">
          <h3 style="font-size:16px; color:var(--text-primary);">${escapeHtml(p.name)}</h3>
          <div class="flex gap-8">${statusBadge(p.status)}<button class="icon-btn" onclick="openProjectModal('${p.id}')"><i class="fa-solid fa-pen"></i></button></div>
        </div>
        <p style="font-size:13px;">${escapeHtml(p.description)}</p>
        <div class="meter mt-16"><span style="width:${p.progress}%"></span></div>
        <div class="muted" style="margin-top:4px;">${p.progress}% complete</div>
        ${p.links && (p.links.repo || p.links.demo) ? `<div class="mt-16 flex gap-16">
          ${p.links.repo ? `<a href="${escapeHtml(p.links.repo)}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repo</a>` : ""}
          ${p.links.demo ? `<a href="${escapeHtml(p.links.demo)}" target="_blank" rel="noopener"><i class="fa-solid fa-rocket"></i> Demo</a>` : ""}
        </div>` : ""}
        ${p.milestones && p.milestones.length ? `
          <div class="mt-16">
            ${p.milestones.map((m, i) => `
              <div class="task-row ${m.done ? "done" : ""}">
                <input type="checkbox" ${m.done ? "checked" : ""} onchange="toggleProjectMilestone('${p.id}',${i})" id="pm-${p.id}-${i}" />
                <label for="pm-${p.id}-${i}">${escapeHtml(m.title)}${m.dueWeek ? ` <span class="muted">(week ${m.dueWeek})</span>` : ""}</label>
              </div>
            `).join("")}
          </div>
        ` : ""}
        <button class="btn btn-sm mt-16" onclick="addMilestoneToProject('${p.id}')"><i class="fa-solid fa-plus"></i> Add milestone</button>
      </div>
    `).join("") : `<div class="card empty-state"><i class="fa-solid fa-diagram-project"></i>No projects yet.</div>`}
  `;
}

/* ============================================================
   COURSES / RESOURCE LIBRARY
   ============================================================ */
function openCourseModal(id) {
  const c = id ? STATE.courses.find(c => c.id === id) : null;
  openModal(`
    <div class="modal-header"><h3>${c ? "Edit" : "New"} resource</h3><button class="icon-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button></div>
    <div class="field"><label>Name</label><input type="text" id="f-name" value="${escapeHtml(c ? c.name : "")}" /></div>
    <div class="field"><label>URL</label><input type="text" id="f-url" value="${escapeHtml(c ? c.url : "")}" /></div>
    <div class="form-row">
      <div class="field"><label>Category</label><input type="text" id="f-cat" value="${escapeHtml(c ? c.category : "")}" /></div>
      <div class="field"><label>Cost</label><input type="text" id="f-cost" value="${escapeHtml(c ? c.cost : "Free")}" /></div>
    </div>
    <div class="field"><label>Status</label>
      <select id="f-status">${["not-started","in-progress","completed"].map(v => `<option value="${v}" ${c && c.status === v ? "selected" : ""}>${v}</option>`).join("")}</select>
    </div>
    <div class="field"><label>Notes</label><textarea id="f-notes" rows="2">${escapeHtml(c ? c.notes : "")}</textarea></div>
    <div class="modal-actions">
      ${c ? `<button class="btn btn-danger" onclick="deleteCourse('${c.id}')">Delete</button>` : ""}
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveCourse('${c ? c.id : ""}')">Save</button>
    </div>
  `);
}
function saveCourse(id) {
  const name = document.getElementById("f-name").value.trim();
  if (!name) { toast("Name required"); return; }
  const data = {
    name, url: document.getElementById("f-url").value.trim(),
    category: document.getElementById("f-cat").value.trim() || "General",
    cost: document.getElementById("f-cost").value.trim() || "Free",
    status: document.getElementById("f-status").value,
    notes: document.getElementById("f-notes").value.trim()
  };
  if (id) Object.assign(STATE.courses.find(c => c.id === id), data);
  else STATE.courses.push({ id: uid("course"), ...data });
  saveState(); closeModal(); renderCourses(); toast("Resource saved");
}
function deleteCourse(id) {
  STATE.courses = STATE.courses.filter(c => c.id !== id);
  saveState(); closeModal(); renderCourses(); toast("Resource deleted");
}
function cycleCourseStatus(id) {
  const order = ["not-started", "in-progress", "completed"];
  const c = STATE.courses.find(c => c.id === id);
  c.status = order[(order.indexOf(c.status) + 1) % order.length];
  saveState(); renderCourses();
}
function renderCourses() {
  const el = document.getElementById("view-courses");
  const cats = [...new Set(STATE.courses.map(c => c.category))];
  el.innerHTML = `
    <div class="flex-between mb-16"><div></div><button class="btn btn-primary" onclick="openCourseModal()"><i class="fa-solid fa-plus"></i> Add resource</button></div>
    ${cats.map(cat => `
      <div class="section-title">${escapeHtml(cat)}</div>
      <div class="card">
        <div class="table-wrap"><table>
          <thead><tr><th>Resource</th><th>Cost</th><th>Status</th><th>Notes</th><th></th></tr></thead>
          <tbody>
            ${STATE.courses.filter(c => c.category === cat).map(c => `
              <tr>
                <td><a href="${escapeHtml(c.url)}" target="_blank" rel="noopener">${escapeHtml(c.name)}</a></td>
                <td class="resource-cost">${escapeHtml(c.cost)}</td>
                <td style="cursor:pointer;" onclick="cycleCourseStatus('${c.id}')">${statusBadge(c.status)}</td>
                <td class="muted">${escapeHtml(c.notes)}</td>
                <td><button class="icon-btn" onclick="openCourseModal('${c.id}')"><i class="fa-solid fa-pen"></i></button></td>
              </tr>
            `).join("")}
          </tbody>
        </table></div>
      </div>
    `).join("")}
  `;
}

/* ============================================================
   APPLICATIONS
   ============================================================ */
function openApplicationModal(id) {
  const a = id ? STATE.applications.find(a => a.id === id) : null;
  openModal(`
    <div class="modal-header"><h3>${a ? "Edit" : "New"} application</h3><button class="icon-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button></div>
    <div class="form-row">
      <div class="field"><label>Company</label><input type="text" id="f-company" value="${escapeHtml(a ? a.company : "")}" /></div>
      <div class="field"><label>Role</label><input type="text" id="f-role" value="${escapeHtml(a ? a.role : "")}" /></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Date applied</label><input type="date" id="f-date" value="${a ? a.dateApplied : todayISO()}" /></div>
      <div class="field"><label>Deadline (if known)</label><input type="date" id="f-deadline" value="${a && a.deadline ? a.deadline : ""}" /></div>
    </div>
    <div class="field"><label>Status</label>
      <select id="f-status">${["applied","interview","offer","rejected","ghosted"].map(v => `<option value="${v}" ${a && a.status === v ? "selected" : ""}>${v}</option>`).join("")}</select>
    </div>
    <div class="field"><label>Link</label><input type="text" id="f-link" value="${escapeHtml(a ? a.link : "")}" /></div>
    <div class="field"><label>Notes</label><textarea id="f-notes" rows="2">${escapeHtml(a ? a.notes : "")}</textarea></div>
    <div class="modal-actions">
      ${a ? `<button class="btn btn-danger" onclick="deleteApplication('${a.id}')">Delete</button>` : ""}
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveApplication('${a ? a.id : ""}')">Save</button>
    </div>
  `);
}
function saveApplication(id) {
  const company = document.getElementById("f-company").value.trim();
  if (!company) { toast("Company required"); return; }
  const data = {
    company, role: document.getElementById("f-role").value.trim(),
    dateApplied: document.getElementById("f-date").value,
    deadline: document.getElementById("f-deadline").value,
    status: document.getElementById("f-status").value,
    link: document.getElementById("f-link").value.trim(),
    notes: document.getElementById("f-notes").value.trim()
  };
  if (id) Object.assign(STATE.applications.find(a => a.id === id), data);
  else STATE.applications.push({ id: uid("app"), ...data });
  saveState(); closeModal(); renderApplications(); toast("Application saved");
}
function deleteApplication(id) {
  STATE.applications = STATE.applications.filter(a => a.id !== id);
  saveState(); closeModal(); renderApplications(); toast("Application deleted");
}
function renderApplications() {
  const el = document.getElementById("view-applications");
  const counts = {};
  STATE.applications.forEach(a => counts[a.status] = (counts[a.status] || 0) + 1);
  el.innerHTML = `
    <div class="grid grid-4 mb-16">
      ${["applied","interview","offer","rejected"].map(s => `<div class="card stat-tile"><div class="value">${counts[s] || 0}</div><div class="label">${s}</div></div>`).join("")}
    </div>
    <div class="flex-between mb-16"><div></div><button class="btn btn-primary" onclick="openApplicationModal()"><i class="fa-solid fa-plus"></i> Log application</button></div>
    <div class="card">
      <div class="table-wrap"><table>
        <thead><tr><th>Company</th><th>Role</th><th>Applied</th><th>Deadline</th><th>Status</th><th></th></tr></thead>
        <tbody>
          ${STATE.applications.length ? STATE.applications.map(a => `
            <tr>
              <td><b>${escapeHtml(a.company)}</b></td>
              <td>${escapeHtml(a.role)}</td>
              <td>${fmtDate(a.dateApplied)}</td>
              <td>${a.deadline ? fmtDate(a.deadline) : "–"}</td>
              <td>${statusBadge(a.status)}</td>
              <td><button class="icon-btn" onclick="openApplicationModal('${a.id}')"><i class="fa-solid fa-pen"></i></button></td>
            </tr>
          `).join("") : `<tr><td colspan="6"><div class="empty-state"><i class="fa-solid fa-paper-plane"></i>No applications logged yet.</div></td></tr>`}
        </tbody>
      </table></div>
    </div>
  `;
}

/* ============================================================
   INTERVIEWS
   ============================================================ */
function openInterviewModal(id) {
  const iv = id ? STATE.interviews.find(i => i.id === id) : null;
  openModal(`
    <div class="modal-header"><h3>${iv ? "Edit" : "New"} interview</h3><button class="icon-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button></div>
    <div class="form-row">
      <div class="field"><label>Company</label><input type="text" id="f-company" value="${escapeHtml(iv ? iv.company : "")}" /></div>
      <div class="field"><label>Round</label><input type="text" id="f-round" value="${escapeHtml(iv ? iv.round : "")}" placeholder="e.g. Onsite 1 of 3" /></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Date</label><input type="date" id="f-date" value="${iv ? iv.date : todayISO()}" /></div>
      <div class="field"><label>Type</label>
        <select id="f-type">${["DSA","System Design","Behavioral","Quant/Probability","Take-home","Other"].map(v => `<option ${iv && iv.type === v ? "selected" : ""}>${v}</option>`).join("")}</select>
      </div>
    </div>
    <div class="field"><label>Outcome</label>
      <select id="f-outcome">${["scheduled","passed","failed","pending"].map(v => `<option value="${v}" ${iv && iv.outcome === v ? "selected" : ""}>${v}</option>`).join("")}</select>
    </div>
    <div class="field"><label>Prep notes / debrief</label><textarea id="f-notes" rows="3">${escapeHtml(iv ? iv.notes : "")}</textarea></div>
    <div class="modal-actions">
      ${iv ? `<button class="btn btn-danger" onclick="deleteInterview('${iv.id}')">Delete</button>` : ""}
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveInterview('${iv ? iv.id : ""}')">Save</button>
    </div>
  `);
}
function saveInterview(id) {
  const company = document.getElementById("f-company").value.trim();
  if (!company) { toast("Company required"); return; }
  const data = {
    company, round: document.getElementById("f-round").value.trim(),
    date: document.getElementById("f-date").value,
    type: document.getElementById("f-type").value,
    outcome: document.getElementById("f-outcome").value,
    notes: document.getElementById("f-notes").value.trim()
  };
  if (id) Object.assign(STATE.interviews.find(i => i.id === id), data);
  else STATE.interviews.push({ id: uid("iv"), ...data });
  saveState(); closeModal(); renderInterviews(); toast("Interview saved");
}
function deleteInterview(id) {
  STATE.interviews = STATE.interviews.filter(i => i.id !== id);
  saveState(); closeModal(); renderInterviews(); toast("Interview deleted");
}
function renderInterviews() {
  const el = document.getElementById("view-interviews");
  el.innerHTML = `
    <div class="flex-between mb-16"><div></div><button class="btn btn-primary" onclick="openInterviewModal()"><i class="fa-solid fa-plus"></i> Log interview</button></div>
    <div class="card">
      <div class="table-wrap"><table>
        <thead><tr><th>Company</th><th>Round</th><th>Type</th><th>Date</th><th>Outcome</th><th></th></tr></thead>
        <tbody>
          ${STATE.interviews.length ? STATE.interviews.map(iv => `
            <tr>
              <td><b>${escapeHtml(iv.company)}</b></td>
              <td>${escapeHtml(iv.round)}</td>
              <td>${escapeHtml(iv.type)}</td>
              <td>${fmtDate(iv.date)}</td>
              <td>${statusBadge(iv.outcome)}</td>
              <td><button class="icon-btn" onclick="openInterviewModal('${iv.id}')"><i class="fa-solid fa-pen"></i></button></td>
            </tr>
          `).join("") : `<tr><td colspan="6"><div class="empty-state"><i class="fa-solid fa-comments"></i>No interviews logged yet.</div></td></tr>`}
        </tbody>
      </table></div>
    </div>
  `;
}

/* ============================================================
   COMPETITIONS
   ============================================================ */
function openCompetitionModal(id) {
  const c = id ? STATE.competitions.find(c => c.id === id) : null;
  openModal(`
    <div class="modal-header"><h3>${c ? "Edit" : "New"} competition</h3><button class="icon-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button></div>
    <div class="field"><label>Name</label><input type="text" id="f-name" value="${escapeHtml(c ? c.name : "")}" /></div>
    <div class="form-row">
      <div class="field"><label>Platform</label><input type="text" id="f-platform" value="${escapeHtml(c ? c.platform : "")}" /></div>
      <div class="field"><label>Status</label>
        <select id="f-status">${["not-started","in-progress","completed"].map(v => `<option value="${v}" ${c && c.status === v ? "selected" : ""}>${v}</option>`).join("")}</select>
      </div>
    </div>
    <div class="field"><label>URL</label><input type="text" id="f-url" value="${escapeHtml(c ? c.url : "")}" /></div>
    <div class="field"><label>Notes</label><textarea id="f-notes" rows="2">${escapeHtml(c ? c.notes : "")}</textarea></div>
    <div class="modal-actions">
      ${c ? `<button class="btn btn-danger" onclick="deleteCompetition('${c.id}')">Delete</button>` : ""}
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveCompetition('${c ? c.id : ""}')">Save</button>
    </div>
  `);
}
function saveCompetition(id) {
  const name = document.getElementById("f-name").value.trim();
  if (!name) { toast("Name required"); return; }
  const data = {
    name, platform: document.getElementById("f-platform").value.trim(),
    status: document.getElementById("f-status").value,
    url: document.getElementById("f-url").value.trim(),
    notes: document.getElementById("f-notes").value.trim()
  };
  if (id) Object.assign(STATE.competitions.find(c => c.id === id), data);
  else STATE.competitions.push({ id: uid("comp"), ...data });
  saveState(); closeModal(); renderCompetitions(); toast("Competition saved");
}
function deleteCompetition(id) {
  STATE.competitions = STATE.competitions.filter(c => c.id !== id);
  saveState(); closeModal(); renderCompetitions(); toast("Competition deleted");
}
function renderCompetitions() {
  const el = document.getElementById("view-competitions");
  el.innerHTML = `
    <div class="flex-between mb-16"><div></div><button class="btn btn-primary" onclick="openCompetitionModal()"><i class="fa-solid fa-plus"></i> Add competition</button></div>
    <div class="grid grid-3">
      ${STATE.competitions.length ? STATE.competitions.map(c => `
        <div class="card">
          <div class="card-title-row"><h3 style="color:var(--text-primary); font-size:14.5px;">${escapeHtml(c.name)}</h3>${statusBadge(c.status)}</div>
          <p class="muted">${escapeHtml(c.platform)}</p>
          <p style="font-size:12.5px;">${escapeHtml(c.notes)}</p>
          <div class="flex-between mt-16">
            ${c.url ? `<a href="${escapeHtml(c.url)}" target="_blank" rel="noopener" style="font-size:12.5px;">Open <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : "<span></span>"}
            <button class="icon-btn" onclick="openCompetitionModal('${c.id}')"><i class="fa-solid fa-pen"></i></button>
          </div>
        </div>
      `).join("") : `<div class="card empty-state"><i class="fa-solid fa-trophy"></i>No competitions yet.</div>`}
    </div>
  `;
}

/* ============================================================
   STUDY & EXERCISE LOG
   ============================================================ */
function logToday() {
  const cats = ["math", "dsa", "quant", "ai", "projects", "interviewPrep"];
  const hours = {};
  let total = 0;
  cats.forEach(c => {
    const v = parseFloat(document.getElementById("h-" + c).value) || 0;
    hours[c] = v; total += v;
  });
  const date = document.getElementById("log-date").value || todayISO();
  const existingIdx = STATE.studyLog.findIndex(l => l.date === date);
  const entry = { date, hours, total: Math.round(total * 10) / 10 };
  if (existingIdx >= 0) STATE.studyLog[existingIdx] = entry;
  else STATE.studyLog.push(entry);
  STATE.studyLog.sort((a, b) => b.date.localeCompare(a.date));

  const exercised = document.getElementById("log-exercise").checked;
  const exIdx = STATE.exerciseLog.findIndex(l => l.date === date);
  if (exIdx >= 0) STATE.exerciseLog[exIdx].done = exercised;
  else STATE.exerciseLog.push({ date, done: exercised, notes: "" });

  saveState();
  renderStudyLog();
  toast("Logged " + entry.total + "h for " + fmtDate(date));
}
function deleteLogEntry(date) {
  STATE.studyLog = STATE.studyLog.filter(l => l.date !== date);
  saveState(); renderStudyLog();
}
function renderStudyLog() {
  const el = document.getElementById("view-studylog");
  const today = todayISO();
  const todayEntry = STATE.studyLog.find(l => l.date === today) || { hours: {} };
  const todayExercise = STATE.exerciseLog.find(l => l.date === today);
  const cats = [
    ["math", "Mathematics"], ["dsa", "DSA"], ["quant", "Quant"],
    ["ai", "AI / Projects work"], ["projects", "Other project time"], ["interviewPrep", "Interview prep"]
  ];
  const totalLogged = STATE.studyLog.reduce((a, l) => a + l.total, 0);
  const streak = studyStreak();

  el.innerHTML = `
    <div class="grid grid-3 mb-16">
      <div class="card stat-tile"><div class="value">${streak}</div><div class="label">Current streak (days)</div></div>
      <div class="card stat-tile"><div class="value">${totalLogged.toFixed(1)}h</div><div class="label">Total logged, all time</div></div>
      <div class="card stat-tile"><div class="value">${STATE.exerciseLog.filter(e => e.done).length}</div><div class="label">Exercise days logged</div></div>
    </div>
    <div class="card mb-16">
      <div class="card-title-row"><h3><i class="fa-solid fa-plus"></i>&nbsp; Log a day</h3></div>
      <div class="field" style="max-width:200px;"><label>Date</label><input type="date" id="log-date" value="${today}" /></div>
      <div class="form-row">
        ${cats.map(([id, label]) => `<div class="field"><label>${label} (hrs)</label><input type="number" step="0.25" min="0" max="14" id="h-${id}" value="${todayEntry.hours[id] || 0}" /></div>`).join("")}
      </div>
      <label class="flex gap-8" style="font-size:13px; margin:10px 0;"><input type="checkbox" id="log-exercise" ${todayExercise && todayExercise.done ? "checked" : ""} /> Exercised today</label>
      <button class="btn btn-primary" onclick="logToday()"><i class="fa-solid fa-check"></i> Save today's log</button>
    </div>
    <div class="card">
      <div class="card-title-row"><h3><i class="fa-solid fa-clock-rotate-left"></i>&nbsp; History</h3></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Date</th><th>Math</th><th>DSA</th><th>Quant</th><th>AI</th><th>Projects</th><th>Interview</th><th>Total</th><th></th></tr></thead>
        <tbody>
          ${STATE.studyLog.length ? STATE.studyLog.slice(0, 30).map(l => `
            <tr>
              <td>${fmtDate(l.date)}</td>
              <td>${l.hours.math || 0}</td><td>${l.hours.dsa || 0}</td><td>${l.hours.quant || 0}</td>
              <td>${l.hours.ai || 0}</td><td>${l.hours.projects || 0}</td><td>${l.hours.interviewPrep || 0}</td>
              <td><b>${l.total}h</b></td>
              <td><button class="icon-btn" onclick="deleteLogEntry('${l.date}')"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
          `).join("") : `<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-stopwatch"></i>Nothing logged yet — start today.</div></td></tr>`}
        </tbody>
      </table></div>
    </div>
  `;
}

/* ============================================================
   REVIEWS (weekly / monthly)
   ============================================================ */
let reviewTab = "weekly";
function setReviewTab(t) { reviewTab = t; renderReviews(); }
function openReviewModal() {
  openModal(`
    <div class="modal-header"><h3>New ${reviewTab} review</h3><button class="icon-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button></div>
    <div class="field"><label>${reviewTab === "weekly" ? "Week of" : "Month"}</label><input type="text" id="f-period" placeholder="${reviewTab === "weekly" ? "e.g. Week 5 (Days 31-37)" : "e.g. Month 2"}" /></div>
    <div class="field"><label>What did I complete?</label><textarea id="f-completed" rows="2"></textarea></div>
    <div class="field"><label>What did I fail to complete?</label><textarea id="f-failed" rows="2"></textarea></div>
    <div class="field"><label>Why?</label><textarea id="f-why" rows="2"></textarea></div>
    <div class="field"><label>What should be cut?</label><textarea id="f-cut" rows="2"></textarea></div>
    <div class="field"><label>What should be accelerated?</label><textarea id="f-accelerate" rows="2"></textarea></div>
    <div class="modal-actions">
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveReview()">Save</button>
    </div>
  `);
}
function saveReview() {
  const entry = {
    id: uid("rev"), date: todayISO(),
    period: document.getElementById("f-period").value.trim() || "Untitled",
    completed: document.getElementById("f-completed").value.trim(),
    failed: document.getElementById("f-failed").value.trim(),
    why: document.getElementById("f-why").value.trim(),
    cut: document.getElementById("f-cut").value.trim(),
    accelerate: document.getElementById("f-accelerate").value.trim()
  };
  STATE.reviews[reviewTab].unshift(entry);
  saveState(); closeModal(); renderReviews(); toast("Review saved");
}
function deleteReview(id) {
  STATE.reviews[reviewTab] = STATE.reviews[reviewTab].filter(r => r.id !== id);
  saveState(); renderReviews();
}
function renderReviews() {
  const el = document.getElementById("view-reviews");
  const list = STATE.reviews[reviewTab];
  el.innerHTML = `
    <div class="tabs">
      <div class="tab ${reviewTab === "weekly" ? "active" : ""}" onclick="setReviewTab('weekly')">Weekly</div>
      <div class="tab ${reviewTab === "monthly" ? "active" : ""}" onclick="setReviewTab('monthly')">Monthly</div>
    </div>
    <div class="flex-between mb-16"><div></div><button class="btn btn-primary" onclick="openReviewModal()"><i class="fa-solid fa-plus"></i> New review</button></div>
    ${list.length ? list.map(r => `
      <div class="card mb-16">
        <div class="card-title-row"><h3 style="color:var(--text-primary);">${escapeHtml(r.period)}</h3><button class="icon-btn" onclick="deleteReview('${r.id}')"><i class="fa-solid fa-trash"></i></button></div>
        <div class="grid grid-2">
          <div><p style="font-size:12px; color:var(--text-muted); font-weight:650;">COMPLETED</p><p style="font-size:13px;">${escapeHtml(r.completed) || "–"}</p></div>
          <div><p style="font-size:12px; color:var(--text-muted); font-weight:650;">FAILED</p><p style="font-size:13px;">${escapeHtml(r.failed) || "–"}</p></div>
          <div><p style="font-size:12px; color:var(--text-muted); font-weight:650;">WHY</p><p style="font-size:13px;">${escapeHtml(r.why) || "–"}</p></div>
          <div><p style="font-size:12px; color:var(--text-muted); font-weight:650;">CUT / ACCELERATE</p><p style="font-size:13px;">${escapeHtml(r.cut)} ${r.accelerate ? " · " + escapeHtml(r.accelerate) : ""}</p></div>
        </div>
      </div>
    `).join("") : `<div class="card empty-state"><i class="fa-solid fa-arrows-rotate"></i>No ${reviewTab} reviews yet.</div>`}
  `;
}
