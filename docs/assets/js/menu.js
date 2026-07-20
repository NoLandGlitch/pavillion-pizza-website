// Menu page: renders window.PAVILLION_MENU_ITEMS / _CATEGORIES (see menu-data.js,
// generated from menu-import.csv) into category sections, with client-side
// search and category-chip navigation. No build step, no framework —
// intentionally simple for a static site.

(function () {
  "use strict";

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function formatPrice(n) {
    return "$" + n.toFixed(2);
  }

  // Groups rows sharing the same category + title into one card with
  // multiple size/price rows, in the order they appear (displayOrder).
  function groupItems(items) {
    var groups = [];
    var index = {};
    items.forEach(function (item) {
      var key = item.category + "::" + item.subcategory + "::" + item.title;
      if (!(key in index)) {
        index[key] = groups.length;
        groups.push({
          title: item.title,
          category: item.category,
          subcategory: item.subcategory,
          description: item.description,
          image: item.image,
          imageAlt: item.imageAlt,
          available: item.available,
          featured: item.featured,
          displayOrder: item.displayOrder,
          sizes: [],
        });
      }
      var group = groups[index[key]];
      group.sizes.push({ label: item.priceLabel, price: item.price });
      // A group is only "available" if at least one size still is.
      group.available = group.available || item.available;
    });
    return groups;
  }

  function renderPriceRow(group) {
    return group.sizes
      .map(function (s) {
        var label = s.label ? '<span class="price-label">' + escapeHtml(s.label) + "</span>" : "";
        return label + formatPrice(s.price);
      })
      .join('<span aria-hidden="true">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>');
  }

  function renderCard(group) {
    var imageHtml = group.image
      ? '<div class="menu-item-image"><img src="' +
        escapeHtml(group.image) +
        '" alt="' +
        escapeHtml(group.imageAlt || "") +
        '" loading="lazy" width="84" height="84"></div>'
      : "";

    var star = group.featured ? '<span class="featured-star" aria-label="Fan favorite">&#9733;</span>' : "";

    var availability = group.available
      ? ""
      : '<div class="menu-item-unavailable">Currently Unavailable</div>';

    var searchText = (group.title + " " + group.description).toLowerCase();

    return (
      '<article class="menu-item-card" data-search="' +
      escapeHtml(searchText) +
      '">' +
      imageHtml +
      '<div class="menu-item-main">' +
      '<div class="menu-item-top">' +
      '<h4 class="menu-item-title">' +
      escapeHtml(group.title) +
      star +
      "</h4>" +
      "</div>" +
      (group.description ? '<p class="menu-item-desc">' + escapeHtml(group.description) + "</p>" : "") +
      '<div class="menu-item-prices">' +
      renderPriceRow(group) +
      "</div>" +
      availability +
      "</div>" +
      "</article>"
    );
  }

  function renderCategory(category, groups) {
    var bySubcategory = {};
    var subcategoryOrder = [];
    groups.forEach(function (g) {
      var key = g.subcategory || "";
      if (!(key in bySubcategory)) {
        bySubcategory[key] = [];
        subcategoryOrder.push(key);
      }
      bySubcategory[key].push(g);
    });

    var itemsHtml = subcategoryOrder
      .map(function (subKey) {
        var subHeading = subKey ? '<h5 class="menu-subcategory-title">' + escapeHtml(subKey) + "</h5>" : "";
        var cards = bySubcategory[subKey]
          .sort(function (a, b) {
            return a.displayOrder - b.displayOrder;
          })
          .map(renderCard)
          .join("");
        return subHeading + '<div class="menu-items">' + cards + "</div>";
      })
      .join("");

    return (
      '<section class="menu-category-section" id="category-' +
      escapeHtml(category.slug) +
      '" data-category-slug="' +
      escapeHtml(category.slug) +
      '">' +
      '<div class="container">' +
      '<div class="menu-category-heading">' +
      "<h2>" +
      escapeHtml(category.title) +
      "</h2>" +
      "<p>" +
      escapeHtml(category.description || "") +
      "</p>" +
      "</div>" +
      itemsHtml +
      "</div>" +
      "</section>"
    );
  }

  function renderChips(categories) {
    return categories
      .map(function (c, i) {
        return (
          '<button type="button" class="category-chip' +
          (i === 0 ? " is-active" : "") +
          '" data-target="category-' +
          escapeHtml(c.slug) +
          '">' +
          escapeHtml(c.title) +
          "</button>"
        );
      })
      .join("");
  }

  function init() {
    var categories = window.PAVILLION_MENU_CATEGORIES || [];
    var items = window.PAVILLION_MENU_ITEMS || [];
    var container = document.querySelector("#menuCategoriesContainer");
    var chipNav = document.querySelector("#categoryNav");
    var searchInput = document.querySelector("#menuSearchInput");
    var emptyState = document.querySelector("#menuEmptyState");

    if (!container) return;

    var grouped = groupItems(items);

    var html = categories
      .map(function (category) {
        var groupsForCategory = grouped.filter(function (g) {
          return g.category === category.title;
        });
        if (!groupsForCategory.length) return "";
        return renderCategory(category, groupsForCategory);
      })
      .join("");

    container.innerHTML = html;

    if (chipNav) {
      chipNav.innerHTML = renderChips(categories.filter(function (c) {
        return grouped.some(function (g) {
          return g.category === c.title;
        });
      }));

      chipNav.querySelectorAll(".category-chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          var target = document.getElementById(chip.dataset.target);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          chipNav.querySelectorAll(".category-chip").forEach(function (c) {
            c.classList.remove("is-active");
          });
          chip.classList.add("is-active");
        });
      });
    }

    // Search: filter individual item cards by title/description; hide a
    // whole category section if none of its cards match.
    if (searchInput) {
      var debounceTimer;
      searchInput.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          var query = searchInput.value.trim().toLowerCase();
          var anyVisible = false;

          container.querySelectorAll(".menu-category-section").forEach(function (section) {
            var sectionHasMatch = false;
            section.querySelectorAll(".menu-item-card").forEach(function (card) {
              var matches = !query || card.dataset.search.indexOf(query) !== -1;
              card.classList.toggle("is-hidden", !matches);
              if (matches) sectionHasMatch = true;
            });
            section.hidden = !sectionHasMatch;
            if (sectionHasMatch) anyVisible = true;
          });

          if (emptyState) emptyState.hidden = anyVisible;
        }, 200);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
