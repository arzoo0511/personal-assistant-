/* =========================================================================
   planner.js — embeds the standalone Sprint Planner (planner/index.html)
   inside Career OS. The planner has its own styles and its own state
   (localStorage key "sprint-planner-v1"), so nothing else in the app is
   touched and no CONTENT_VERSION migration is needed.
   ========================================================================= */

function renderPlanner() {
  const el = document.getElementById("view-planner");
  if (!el || el.dataset.ready) return;
  el.dataset.ready = "1";
  el.innerHTML =
    '<iframe src="planner/index.html?v=1" title="Day-by-Day Plan" loading="lazy" ' +
    'style="width:100%;height:calc(100vh - 150px);min-height:620px;border:0;border-radius:12px"></iframe>';
}
