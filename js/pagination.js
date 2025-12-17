// Pagination Module
const Pagination = (function () {
  let currentPage = 1;
  let recordsPerPage = 25;
  let totalRecords = 0;
  let data = [];
  let renderCallback = null;

  const elements = {
    totalRecords: null,
    recordsSelect: null,
    pageInfo: null,
    prevBtn: null,
    nextBtn: null,
  };

  function init(options = {}) {
    renderCallback = options.renderCallback || null;

    elements.totalRecords = document.querySelector(".total-records strong");
    elements.recordsSelect = document.querySelector(".records-select");
    elements.pageInfo = document.querySelector(".page-info");
    elements.prevBtn = document.querySelector(".page-btn.prev");
    elements.nextBtn = document.querySelector(".page-btn.next");

    bindEvents();

    if (elements.recordsSelect) {
      recordsPerPage = parseInt(elements.recordsSelect.value, 10);
    }
  }

  function bindEvents() {
    if (elements.recordsSelect) {
      elements.recordsSelect.addEventListener("change", function () {
        recordsPerPage = parseInt(this.value, 10);
        currentPage = 1; // Reset to first page
        render();
      });
    }

    if (elements.prevBtn) {
      elements.prevBtn.addEventListener("click", function () {
        if (currentPage > 1) {
          currentPage--;
          render();
        }
      });
    }

    if (elements.nextBtn) {
      elements.nextBtn.addEventListener("click", function () {
        const totalPages = getTotalPages();
        if (currentPage < totalPages) {
          currentPage++;
          render();
        }
      });
    }
  }

  function setData(newData) {
    data = newData || [];
    totalRecords = data.length;
    currentPage = 1;
    render();
  }

  function getTotalPages() {
    return Math.ceil(totalRecords / recordsPerPage) || 1;
  }

  function getCurrentPageData() {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return data.slice(startIndex, endIndex);
  }

  function updateUI() {
    const totalPages = getTotalPages();
    const startRecord =
      totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
    const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

    if (elements.totalRecords) {
      elements.totalRecords.textContent = totalRecords;
    }

    if (elements.pageInfo) {
      elements.pageInfo.textContent = `${startRecord} - ${endRecord} record`;
    }

    if (elements.prevBtn) {
      elements.prevBtn.disabled = currentPage <= 1;
    }

    if (elements.nextBtn) {
      elements.nextBtn.disabled = currentPage >= totalPages;
    }
  }

  function render() {
    updateUI();

    if (renderCallback && typeof renderCallback === "function") {
      const pageData = getCurrentPageData();
      renderCallback(pageData);
    }
  }

  function goToPage(page) {
    const totalPages = getTotalPages();
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      render();
    }
  }

  function getState() {
    return {
      currentPage,
      recordsPerPage,
      totalRecords,
      totalPages: getTotalPages(),
    };
  }

  return {
    init,
    setData,
    render,
    goToPage,
    getState,
    getCurrentPageData,
  };
})();
