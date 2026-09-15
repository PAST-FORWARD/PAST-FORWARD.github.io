// Injects a Tabler icon into the thumbnail placeholder of every research
// output listing card (matches the icons used on the Research hub page).
// Works for any Quarto listing container whose id ends in "-listing":
// - if the container has a `data-pf-icon` attribute, that icon is used for
//   every card in it (category-scoped listings, e.g. publications.qmd)
// - otherwise the icon is picked from each card's category badge (mixed
//   listings, e.g. the unified list on research.qmd)
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

  document.querySelectorAll("[id$='-listing']").forEach(function (container) {
    applyIcons(container);
    // Re-apply after the listing library (re)builds the DOM on filter/sort.
    new MutationObserver(function () { applyIcons(container); })
      .observe(container, { childList: true, subtree: true });
  });
});
