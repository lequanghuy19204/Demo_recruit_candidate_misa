// Selection Toolbar Module
const SelectionToolbar = (function () {
  let isSelectAll = false; // Track if "Select all on list" is active

  const elements = {
    filterSection: null,
    selectionToolbar: null,
    selectionCount: null,
    deselectBtn: null,
    selectAllBtn: null,
    headerCheckbox: null,
  };

  function init() {
    elements.filterSection = document.querySelector(".filter-section");
    elements.selectionToolbar = document.querySelector(".selection-toolbar");
    elements.selectionCount = document.querySelector(".selection-count");
    elements.deselectBtn = document.querySelector(".selection-deselect");
    elements.selectAllBtn = document.querySelector(".selection-select-all");
    elements.headerCheckbox = document.querySelector(
      ".candidates-table thead .col-checkbox input"
    );

    bindEvents();
  }

  function bindEvents() {
    if (elements.deselectBtn) {
      elements.deselectBtn.addEventListener("click", deselectAll);
    }

    if (elements.selectAllBtn) {
      elements.selectAllBtn.addEventListener("click", selectAll);
    }

    document.addEventListener("change", function (e) {
      if (e.target.matches(".candidates-table .col-checkbox input")) {
        // Reset isSelectAll when user manually changes checkbox
        isSelectAll = false;
        updateToolbar();
      }
    });
  }

  function getSelectedCount() {
    // If select all is active, return total candidates count
    if (isSelectAll && typeof candidates !== "undefined") {
      return candidates.length;
    }
    const checkboxes = document.querySelectorAll(
      ".candidates-table tbody .col-checkbox input"
    );
    return Array.from(checkboxes).filter((cb) => cb.checked).length;
  }

  function updateToolbar() {
    const count = getSelectedCount();

    if (count > 0) {
      showToolbar(count);
    } else {
      hideToolbar();
    }
  }

  function showToolbar(count) {
    if (elements.filterSection) {
      elements.filterSection.style.display = "none";
    }
    if (elements.selectionToolbar) {
      elements.selectionToolbar.style.display = "flex";
    }
    if (elements.selectionCount) {
      elements.selectionCount.textContent = count;
    }
  }

  function hideToolbar() {
    if (elements.filterSection) {
      elements.filterSection.style.display = "flex";
    }
    if (elements.selectionToolbar) {
      elements.selectionToolbar.style.display = "none";
    }
    isSelectAll = false;
  }

  function deselectAll() {
    isSelectAll = false;
    const checkboxes = document.querySelectorAll(
      ".candidates-table .col-checkbox input"
    );
    checkboxes.forEach((cb) => (cb.checked = false));
    if (elements.headerCheckbox) {
      elements.headerCheckbox.indeterminate = false;
    }
    hideToolbar();
  }

  function selectAll() {
    isSelectAll = true;
    const checkboxes = document.querySelectorAll(
      ".candidates-table tbody .col-checkbox input"
    );
    checkboxes.forEach((cb) => (cb.checked = true));
    if (elements.headerCheckbox) {
      elements.headerCheckbox.checked = true;
      elements.headerCheckbox.indeterminate = false;
    }
    updateToolbar();
  }

  function getSelectedIds() {
    if (isSelectAll && typeof candidates !== "undefined") {
      return candidates.map((c) => c.id);
    }
    const rows = document.querySelectorAll(".candidates-table tbody tr");
    const selectedIds = [];
    rows.forEach((row) => {
      const checkbox = row.querySelector(".col-checkbox input");
      if (checkbox && checkbox.checked) {
        const deleteBtn = row.querySelector(".action-btn-delete");
        if (deleteBtn) {
          selectedIds.push(Number(deleteBtn.dataset.id));
        }
      }
    });
    return selectedIds;
  }

  function isAllSelected() {
    return isSelectAll;
  }

  return {
    init,
    updateToolbar,
    hideToolbar,
    getSelectedIds,
    deselectAll,
    isAllSelected,
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  SelectionToolbar.init();
});
