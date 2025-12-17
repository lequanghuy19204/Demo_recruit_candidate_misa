// Candidate data
let candidates = [];
let editingCandidateId = null;

function loadCandidates() {
  const saved = localStorage.getItem("candidates");
  if (saved) {
    candidates = JSON.parse(saved);
  }
  initPagination();
}

function getDropdownValue(elementId) {
  const el = document.getElementById(elementId);
  return el.classList.contains("has-value") ? el.textContent.trim() : "";
}

function setDropdownValue(elementId, value) {
  const el = document.getElementById(elementId);
  if (value) {
    el.textContent = value;
    el.classList.add("has-value");
  }
}

function fillCandidateForm(candidate) {
  document.getElementById("fullName").value = candidate.fullName || "";
  document.getElementById("dateOfBirth").value = candidate.dateOfBirth || "";
  setDropdownValue("gender", candidate.gender);
  setDropdownValue("area", candidate.area);
  document.getElementById("phone").value = candidate.phone || "";
  document.getElementById("email").value = candidate.email || "";
  document.getElementById("address").value = candidate.address || "";
  setDropdownValue("trainingLevel", candidate.trainingLevel);
  setDropdownValue("trainingPlace", candidate.trainingPlace);
  setDropdownValue("major", candidate.major);
  document.getElementById("applicationDate").value =
    candidate.applicationDate || "";
  setDropdownValue("candidateSource", candidate.candidateSource);
  setDropdownValue("recommendingStaff", candidate.recommendingStaff);
  setDropdownValue("collaborators", candidate.collaborators);
  document.getElementById("recentWorkplace").value =
    candidate.recentWorkplace || "";
  document.getElementById("workplace").value = candidate.workplace || "";
  document.getElementById("timeFrom").value = candidate.timeFrom || "";
  document.getElementById("timeTo").value = candidate.timeTo || "";
  document.getElementById("jobPosition").value = candidate.jobPosition || "";
  document.getElementById("taskDescription").value =
    candidate.taskDescription || "";
}

function openModalForEdit(candidate) {
  editingCandidateId = candidate.id;
  document.querySelector(".modal-add-candidate-title").textContent =
    "Edit candidate";
  fillCandidateForm(candidate);
  openModal();
}

function openModalForAdd() {
  editingCandidateId = null;
  document.querySelector(".modal-add-candidate-title").textContent =
    "Add candidate";
  resetCandidateForm();
  openModal();
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
  const formData = getCandidateFormData();

  if (!formData.fullName || !formData.applicationDate) {
    showToast("Please fill in all required fields.", ToastType.ERROR);
    return false;
  }

  try {
    if (editingCandidateId) {
      const index = candidates.findIndex((c) => c.id === editingCandidateId);
      if (index !== -1) {
        formData.id = editingCandidateId;
        formData.createAt = candidates[index].createAt;
        candidates[index] = formData;
      }
      showToast("Candidate updated successfully!", ToastType.SUCCESS);
    } else {
      candidates.push(formData);
      showToast("Candidate added successfully!", ToastType.SUCCESS);
    }

    localStorage.setItem("candidates", JSON.stringify(candidates));
    Pagination.setData(candidates); 
    resetCandidateForm();
    editingCandidateId = null;
    closeModal();
    return true;
  } catch (error) {
    showToast("An error occurred. Please try again.", ToastType.ERROR);
    return false;
  }
}

function deleteCandidate(id) {
  if (confirm("Are you sure you want to delete this candidate?")) {
    candidates = candidates.filter((c) => c.id !== id);
    localStorage.setItem("candidates", JSON.stringify(candidates));
    Pagination.setData(candidates); 
  }
}
