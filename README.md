# Career OS — Personal Dashboard

A single-page career-tracking dashboard, pre-populated with the real output of a
full career-strategy engagement: a 10-domain evidence-based skill diagnostic, a
chosen strategy (AI Engineer/ML Engineer primary, SWE secondary, Quant Research
as an aggressive parallel track), and the resulting 90-day plan.

No backend, no build step, no signup. Everything lives in your browser's
`localStorage`. Two CDN scripts (Chart.js, Font Awesome) are the only external
dependencies, both loaded from `index.html`.

## Folder structure

```
career-os-dashboard/
├── index.html          # app shell, all view containers, CDN links
├── css/
│   └── styles.css       # full design system (light + dark)
├── js/
│   ├── data.js           # DEFAULT_STATE — the real seed data (read once, on first run)
│   ├── trackers.js       # skills, projects, courses, applications, interviews,
│   │                      #   competitions, study log, reviews (render + CRUD)
│   ├── charts.js         # Chart.js chart builders for the Progress view
│   └── app.js             # state load/save, routing, dashboard/roadmap/
│                           #   timetable/milestones/notes/resume/settings, init
└── README.md
```

## Running it locally

No build step required — it's static HTML/CSS/JS. Any of these work:

```bash
# Option 1: Python's built-in server
python -m http.server 8000
# then open http://localhost:8000

# Option 2: Node's `serve` (if you have Node installed)
npx serve .

# Option 3: just double-click index.html
# (works, but some browsers restrict localStorage on file:// — a local server is safer)
```

## Deploying it for free

**GitHub Pages**
1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → Deploy from branch → pick `main` and `/ (root)`.
3. Your dashboard is live at `https://<username>.github.io/<repo>/`.

**Netlify**
1. Drag-and-drop this folder onto [app.netlify.com/drop](https://app.netlify.com/drop) — that's it, no config needed for a static site.

**Vercel**
1. `npx vercel` from inside this folder and follow the prompts (no framework preset needed — it's static).

No environment variables are needed anywhere — there's no backend.

## How your data works

- On first load, the app seeds `localStorage` from `js/data.js` (`DEFAULT_STATE`) —
  your real diagnostic scores, the 90-day roadmap, verified resources, and the
  Day 30/60/90 milestone gates.
- Every edit (skill update, application logged, note saved, etc.) is written
  straight back to `localStorage` under the key `careerOS_state_v1`.
- `js/data.js` is **never read again** after the first load — editing it later
  only affects a fresh browser/profile that hasn't initialized yet. To change
  the seed plan for a new device, edit `data.js` before first load, or use
  Import (below) to push a specific state onto any device.

## Backup / restore / reset

Go to **Settings & Backup** in the sidebar:
- **Export backup (.json)** — downloads your entire state. Do this regularly,
  and definitely before clearing browser data, switching browsers, or moving
  to a new machine.
- **Import backup** — restores from a previously exported `.json` file. This
  fully replaces current state, so export first if you want to keep both.
- **Reset to default plan** — wipes local data and reloads the original seed
  plan from `data.js`. Irreversible without a backup.

Because everything is local-only, there is no server-side account and no way
to recover data if you clear site storage without a backup — the export step
is the only safety net.

## Updating the plan's content later

If you want to change the seed roadmap/skills/resources for future fresh
installs (e.g. a new device), edit the `DEFAULT_STATE` object in `js/data.js`
directly — it's plain, readable JSON-shaped JS, organized by section
(`skills`, `roadmap`, `courses`, `projects`, `milestones`, etc.). Existing
installs with data already in `localStorage` won't see the change unless you
also reset or import a matching backup.

## Notes on the design

- Colors follow a validated, colorblind-checked palette (categorical hues in a
  fixed order, a single-hue sequential ramp for the skill heatmap, and a
  reserved status palette for application/interview/milestone states — status
  color is never the only signal, it always ships with an icon + label).
- Dark mode is a real, separately-tuned palette (not an automatic filter),
  selectable in Settings, and also respects your OS preference by default.
- Fully responsive: the sidebar collapses to a hamburger menu under ~900px.
