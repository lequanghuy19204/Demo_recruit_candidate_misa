// Main script - Event listeners and initialization

// Event delegation for edit and delete buttons
document.addEventListener("click", function (e) {
  const deleteBtn = e.target.closest(".action-btn-delete");
  if (deleteBtn) {
    const id = Number(deleteBtn.dataset.id);
    deleteCandidate(id);
  }

  const editBtn = e.target.closest(".action-btn-edit");
  if (editBtn) {
    const id = Number(editBtn.dataset.id);
    const candidate = candidates.find((c) => c.id === id);
    if (candidate) {
      openModalForEdit(candidate);
    }
  }
});

// Save button
document
  .querySelector(".modal-add-candidate-btn-save")
  .addEventListener("click", saveCandidateForm);

// Load candidates on page load
window.addEventListener("load", loadCandidates);

// Sidebar toggle
const sidebar = document.querySelector(".app-sidebar");
const shrinkBtn = document.querySelector(".shrink-button");
const shrinkIcon = shrinkBtn.querySelector(".icon-left");

shrinkBtn.addEventListener("click", function () {
  sidebar.classList.toggle("collapsed");
  shrinkIcon.classList.toggle("icon-left");
  shrinkIcon.classList.toggle("icon-right");
});
