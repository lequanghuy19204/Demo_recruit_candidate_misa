// Table rendering and management
function getInitials(fullName) {
  if (!fullName) return "?";
  const words = fullName.trim().split(/\s+/);
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

function getAvatarColor(name) {
  const colors = ["#2680eb", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#009688", "#ff5722", "#795548"];
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// Render table với danh sách truyền vào (mặc định là candidates)
function renderCandidateTable(list) {
  const data = list || candidates;
  const tbody = document.querySelector(".candidates-table tbody");

  if (!tbody) return;

  tbody.innerHTML = "";
  const displayValue = (value) => value || "--";

  data.forEach((candidate) => {
    const tr = document.createElement("tr");
    const initials = getInitials(candidate.fullName);
    const avatarColor = getAvatarColor(candidate.fullName);
    const avatarHtml = candidate.avatar
      ? `<img src="${candidate.avatar}" alt="Avatar" class="candidate-avatar">`
      : `<div class="candidate-avatar candidate-avatar-initials" style="background-color: ${avatarColor}">${initials}</div>`;

    tr.innerHTML = `
        <td class="col-checkbox"><input type="checkbox" /></td>
        <td class="col-fullname"><div class="candidate-name-cell">${avatarHtml}<span>${displayValue(candidate.fullName)}</span></div></td>
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
        <td class="col-recommend">${displayValue(candidate.recommendingStaff)}</td>
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
  updateCandidateCount(data.length);
}

function updateCandidateCount(count) {
  const totalCountEl = document.querySelector(".total-records strong");
  if (totalCountEl) {
    totalCountEl.textContent = count !== undefined ? count : candidates.length;
  }
}

// Search functionality
function searchCandidates(query) {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    renderCandidateTable(candidates);
    return;
  }
  
  const filtered = candidates.filter((candidate) => {
    const searchableFields = [
      candidate.fullName,
      candidate.email,
      candidate.phone,
      candidate.address,
      candidate.gender,
      candidate.area,
      candidate.trainingLevel,
      candidate.trainingPlace,
      candidate.major,
      candidate.applicationDate,
      candidate.candidateSource,
      candidate.recommendingStaff,
      candidate.collaborators,
      candidate.recentWorkplace,
      candidate.workplace,
      candidate.jobPosition,
      candidate.taskDescription,
      candidate.dateOfBirth
    ];
    
    return searchableFields.some((field) => 
      field && field.toString().toLowerCase().includes(searchTerm)
    );
  });
  
  renderCandidateTable(filtered);
}

// Search input event listener
const searchInput = document.querySelector(".filter-search-input");
if (searchInput) {
  searchInput.addEventListener("input", function (e) {
    searchCandidates(e.target.value);
  });
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
