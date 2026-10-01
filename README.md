# Career OS — Personal Dashboard

A single-page career-tracking dashboard, pre-populated with the real output of a
full career-strategy engagement: a 355-day, calendar-anchored plan (Day 1 =
2026-10-01, Day 355 = 2027-09-20 arrival) for a CS/AI master's in Germany,
Winter 2027/28 — six phases with Go/No-Go gates, an exam + German (A1 -> B1)
skill matrix, a verified resource library, and the target universities
pre-seeded in Applications. (Earlier versions: AI-Engineer-primary, then a
quant-trading pivot on 2026-08-30; the v4 migration archives the quant plan
into `STATE.archive.quant` rather than deleting it — see `CONTENT_VERSION` in
`js/app.js`.)

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
  the skill matrix, the 355-day roadmap (explicit day-by-day plans for Days
  1–21, then each phase's weekly `dayTemplate` fills Today's Plan for every
  other day), verified resources, target applications and the G0–G5 gates.
- Every edit (skill update, application logged, note saved, etc.) is written
  straight back to `localStorage` under the key `careerOS_state_v1`.
- Unlike a purely static seed, **content updates do propagate to an existing
  save** — see "Updating the plan's content later" below for exactly how.

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

Edit the `DEFAULT_STATE` object in `js/data.js` directly — it's plain, readable
JSON-shaped JS, organized by section (`skills`, `roadmap`, `courses`,
`projects`, `milestones`, `timetable`, `strategy`, etc.).

Unlike a plain static seed, an **existing** save (already in `localStorage`)
*does* pick up content changes — but only if you also bump `CONTENT_VERSION`
in `js/app.js`. On next load, `migrateContent()` compares the save's stored
version against that constant and, if it's behind, refreshes the
authored/reference fields (`roadmap`, `timetable`, `strategy`, milestone
title/criteria text) while fully preserving everything the user actually
tracked (skill levels/history, `roadmapDone`, `dailyPlanDone`, study logs,
applications, course edits, achievements, milestone *status*). New `courses`
and `skills` entries are added additively — existing ones are never
overwritten or removed. **Forgetting to bump `CONTENT_VERSION` means an
existing user never sees the content change, silently** — this is the one
step that's easy to skip and breaks the update path if you do.

## Notes on the design

- Colors follow a validated, colorblind-checked palette (categorical hues in a
  fixed order, a single-hue sequential ramp for the skill heatmap, and a
  reserved status palette for application/interview/milestone states — status
  color is never the only signal, it always ships with an icon + label).
- Dark mode is a real, separately-tuned palette (not an automatic filter),
  selectable in Settings, and also respects your OS preference by default.
- Fully responsive: the sidebar collapses to a hamburger menu under ~900px.
