// Table rendering and management
function renderCandidateTable() {
  const tbody = document.querySelector(".candidates-table tbody");

  if (!tbody) return;

  tbody.innerHTML = "";

  const displayValue = (value) => value || "--";

  candidates.forEach((candidate) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class="col-checkbox"><input type="checkbox" /></td>
        <td class="col-fullname">${displayValue(candidate.fullName)}</td>
        <td class="col-email">${displayValue(candidate.email)}</td>
        <td class="col-phone">${displayValue(candidate.phone)}</td>
        <td class="col-campaign">--</td>
        <td class="col-position">--</td>
        <td class="col-jobs">${displayValue(candidate.recentWorkplace)}</td>
        <td class="col-round">--</td>
        <td class="col-review">--</td>
        <td class="col-appdate">${displayValue(candidate.applicationDate)}</td>
        <td class="col-source">${displayValue(candidate.candidateSource)}</td>
        <td class="col-training">${displayValue(candidate.trainingLevel)}</td>
        <td class="col-place">${displayValue(candidate.trainingPlace)}</td>
        <td class="col-major">${displayValue(candidate.major)}</td>
        <td class="col-workplace">${displayValue(candidate.workplace)}</td>
        <td class="col-recommend">${displayValue(
          candidate.recommendingStaff
        )}</td>
        <td class="col-department">--</td>
        <td class="col-compat">--</td>
        <td class="col-area">${displayValue(candidate.area)}</td>
        <td class="col-referral">--</td>
        <td class="col-receipt">--</td>
        <td class="col-talent">--</td>
        <td class="col-portal">--</td>
        <td class="col-tag">--</td>
        <td class="col-status">--</td>
        <td class="col-sex">${displayValue(candidate.gender)}</td>
        <td class="col-dob">${displayValue(candidate.dateOfBirth)}</td>
        <td class="col-address">${displayValue(candidate.address)}</td>
        <td class="col-reason">--</td>
        <td class="col-collab">${displayValue(candidate.collaborators)}</td>
        <td class="col-receiptdate">--</td>
        <td class="col-offer">--</td>
        <td class="col-actions">
          <div class="action-buttons">
            <button class="action-btn-edit" data-id="${candidate.id}"><span class="icon-edit"></span></button>
            <button class="action-btn-delete" data-id="${candidate.id}"><span class="icon-delete"></span></button>
          </div>
        </td>
      `;
    tbody.appendChild(tr);
  });
  updateCandidateCount();
}

function updateCandidateCount() {
  const totalCountEl = document.querySelector(".total-records strong");
  if (totalCountEl) {
    totalCountEl.textContent = candidates.length;
  }
}

// Select all checkbox
const headerCheckbox = document.querySelector(
  ".candidates-table thead .col-checkbox input"
);

headerCheckbox.addEventListener("change", function () {
  const rowCheckboxes = document.querySelectorAll(
    ".candidates-table tbody .col-checkbox input"
  );
  rowCheckboxes.forEach((checkbox) => {
    checkbox.checked = this.checked;
  });
});

// Update header checkbox when row checkboxes change
document.addEventListener("change", function (e) {
  if (e.target.matches(".candidates-table tbody .col-checkbox input")) {
    const rowCheckboxes = document.querySelectorAll(
      ".candidates-table tbody .col-checkbox input"
    );
    const allChecked = Array.from(rowCheckboxes).every((cb) => cb.checked);
    const someChecked = Array.from(rowCheckboxes).some((cb) => cb.checked);

    headerCheckbox.checked = allChecked;
    headerCheckbox.indeterminate = someChecked && !allChecked;
  }
});
