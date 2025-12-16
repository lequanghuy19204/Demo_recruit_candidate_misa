// Modal Add Candidate
// ------------------------------------
// Opening and closing modal
const modalAddCandidate = document.getElementById("modalAddCandidate");
const btnAddCandidate = document.querySelector(".btn-add-candidate");
const closeModalAddCandidate = document.getElementById(
  "closeModalAddCandidate"
);
const cancelModalAddCandidate = document.getElementById(
  "cancelModalAddCandidate"
);

function openModal() {
  modalAddCandidate.classList.remove("commons-display-none");
}

function closeModal() {
  modalAddCandidate.classList.add("commons-display-none");
}

btnAddCandidate.addEventListener("click", openModal);
closeModalAddCandidate.addEventListener("click", closeModal);
cancelModalAddCandidate.addEventListener("click", closeModal);

modalAddCandidate.addEventListener("click", function (e) {
  if (e.target === modalAddCandidate) {
    closeModal();
  }
});

closeModal();

// Custom dropdowns
const dropdownSelects = document.querySelectorAll(
  ".modal-add-candidate-select, .modal-add-candidate-area-select"
);

dropdownSelects.forEach((select) => {
  select.addEventListener("click", function (e) {
    e.stopPropagation();

    dropdownSelects.forEach((s) => {
      if (s !== select) s.classList.remove("active");
    });

    this.classList.toggle("active");
  });
});

const dropdownItems = document.querySelectorAll(
  ".modal-add-candidate-dropdown-item"
);

dropdownItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();

    const select = this.closest(
      ".modal-add-candidate-select, .modal-add-candidate-area-select"
    );
    const textEl = select.querySelector(
      ".modal-add-candidate-select-text, .modal-add-candidate-area-select-text"
    );

    select
      .querySelectorAll(".modal-add-candidate-dropdown-item")
      .forEach((i) => i.classList.remove("selected"));
    this.classList.add("selected");

    textEl.textContent = this.textContent;
    textEl.classList.add("has-value");

    select.classList.remove("active");
  });
});

document.addEventListener("click", function () {
  dropdownSelects.forEach((select) => select.classList.remove("active"));
});

// Date input with calendar icon
const dateInputs = document.querySelectorAll(
  ".modal-add-candidate-date-input input"
);
const calendars = document.querySelectorAll(
  ".modal-add-candidate-date-input-icon"
);

calendars.forEach((calendar, index) => {
  calendar.addEventListener("click", function () {
    dateInputs[index].showPicker();
  });
});

// Candidate data
const candidateData = "candidate-data.json";
let candidates = [];

function loadCandidates() {
  const saved = localStorage.getItem("candidates");
  if (saved) {
    candidates = JSON.parse(saved);
    renderCandidateTable();
  }
}

function getDropdownValue(elementId) {
  const el = document.getElementById(elementId);
  return el.classList.contains("has-value") ? el.textContent : "";
}

function getCandidateFormData() {
  return {
    id: Date.now(),
    fullName: document.getElementById("fullName").value,
    dateOfBirth: document.getElementById("dateOfBirth").value,
    gender: getDropdownValue("gender"),
    area: getDropdownValue("area"),
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    trainingLevel: getDropdownValue("trainingLevel"),
    trainingPlace: getDropdownValue("trainingPlace"),
    major: getDropdownValue("major"),
    applicationDate: document.getElementById("applicationDate").value,
    candidateSource: getDropdownValue("candidateSource"),
    recommendingStaff: getDropdownValue("recommendingStaff"),
    collaborators: getDropdownValue("collaborators"),
    recentWorkplace: document.getElementById("recentWorkplace").value,
    workplace: document.getElementById("workplace").value,
    timeFrom: document.getElementById("timeFrom").value,
    timeTo: document.getElementById("timeTo").value,
    jobPosition: document.getElementById("jobPosition").value,
    taskDescription: document.getElementById("taskDescription").value,
    createAt: new Date().toISOString(),
  };
}

function resetCandidateForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("dateOfBirth").value = "";
  document.getElementById("gender").textContent = "Choose gender";
  document.getElementById("gender").classList.remove("has-value");
  document.getElementById("area").textContent = "Select area";
  document.getElementById("area").classList.remove("has-value");
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
  document.getElementById("trainingLevel").textContent =
    "Select training level";
  document.getElementById("trainingLevel").classList.remove("has-value");
  document.getElementById("trainingPlace").textContent =
    "Select training place";
  document.getElementById("trainingPlace").classList.remove("has-value");
  document.getElementById("major").textContent = "Select major";
  document.getElementById("major").classList.remove("has-value");
  document.getElementById("applicationDate").value = "";
  document.getElementById("candidateSource").textContent = "Select source";
  document.getElementById("candidateSource").classList.remove("has-value");
  document.getElementById("recommendingStaff").textContent = "Select staff";
  document.getElementById("recommendingStaff").classList.remove("has-value");
  document.getElementById("collaborators").textContent = "Select collaborators";
  document.getElementById("collaborators").classList.remove("has-value");
  document.getElementById("recentWorkplace").value = "";
  document.getElementById("workplace").value = "";
  document.getElementById("timeFrom").value = "";
  document.getElementById("timeTo").value = "";
  document.getElementById("jobPosition").value = "";
  document.getElementById("taskDescription").value = "";
}

function saveCandidateForm() {
  const newCandidate = getCandidateFormData();

  if (!newCandidate.fullName || !newCandidate.applicationDate) {
    alert("Please fill in all required fields.");
    return false;
  }

  candidates.push(newCandidate);
  localStorage.setItem("candidates", JSON.stringify(candidates));
  renderCandidateTable();
  resetCandidateForm();
  closeModal();
  alert("Candidate added successfully!");
  return true;
}

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
        <td class="col-actions">--</td>
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

document
  .querySelector(".modal-add-candidate-btn-save")
  .addEventListener("click", saveCandidateForm);

window.addEventListener("load", loadCandidates);
