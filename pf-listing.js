// Enhances every Quarto listing container on the site (id ending in
// "-listing"):
// 1. Injects a Tabler icon into each card's thumbnail placeholder, matching
//    the icons used on the Research hub page:
//    - if the container has a `data-pf-icon` attribute, that icon is used
//      for every card in it (category-scoped listings, e.g. publications.qmd)
//    - otherwise the icon is picked from each card's category badge (mixed
//      listings, e.g. the unified list on research.qmd)
// 2. Shows a friendly "nothing here yet" placeholder (and hides the useless
//    search box) when a category-scoped listing has no items at all, using
//    `data-pf-empty-title` / `data-pf-empty-desc` for the copy. The
//    placeholder is removed automatically once real items are added.
document.addEventListener("DOMContentLoaded", function () {
  var iconByCategory = {
    "Publications": "ti-books",
    "Datasets": "ti-database",
    "Tools & Data": "ti-tool",
    "Deliverables": "ti-clipboard-check"
  };

  function applyIcons(container) {
    var fixedIcon = container.dataset.pfIcon;
    container.querySelectorAll(".quarto-post").forEach(function (post) {
      var placeholder = post.querySelector(".listing-item-img-placeholder");
      if (!placeholder || placeholder.dataset.pfIconApplied) return;
      var icon = fixedIcon;
      if (!icon) {
        var category = post.querySelector(".listing-category");
        icon = category ? iconByCategory[category.textContent.trim()] : null;
      }
      if (icon) {
        placeholder.innerHTML = '<i class="pf-listing-icon ti ' + icon + '"></i>';
        placeholder.dataset.pfIconApplied = "true";
      }
    });
  }

  function applyEmptyState(container) {
    var list = container.querySelector(".list");
    if (!list) return;
    var hasItems = list.querySelector(".quarto-post") !== null;
    var actions = container.querySelector(".listing-actions-group");
    var existing = container.querySelector(".pf-empty-state");

    if (hasItems) {
      if (actions) actions.hidden = false;
      if (existing) existing.remove();
      return;
    }

    if (actions) actions.hidden = true;
    if (existing) return;

    var icon = container.dataset.pfIcon || "ti-info-circle";
    var title = container.dataset.pfEmptyTitle || "Nothing here yet";
    var desc = container.dataset.pfEmptyDesc || "Check back soon.";

    var el = document.createElement("div");
    el.className = "pf-empty-state";
    el.innerHTML =
      '<i class="pf-empty-icon ti ' + icon + '"></i>' +
      '<p class="pf-empty-title">' + title + '</p>' +
      '<p class="pf-empty-desc">' + desc + '</p>' +
      '<a class="pf-btn pf-btn-outline" href="research.html">&larr; Back to Research</a>';
    container.appendChild(el);
  }

  document.querySelectorAll("[id$='-listing']").forEach(function (container) {
    applyIcons(container);
    applyEmptyState(container);
    // Re-apply after the listing library (re)builds the DOM on filter/sort.
    new MutationObserver(function () {
      applyIcons(container);
      applyEmptyState(container);
    }).observe(container, { childList: true, subtree: true });
  });
});
