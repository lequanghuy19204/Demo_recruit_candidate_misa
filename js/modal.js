// Modal Add Candidate
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

btnAddCandidate.addEventListener("click", openModalForAdd);
closeModalAddCandidate.addEventListener("click", closeModal);
cancelModalAddCandidate.addEventListener("click", closeModal);

modalAddCandidate.addEventListener("click", function (e) {
  if (e.target === modalAddCandidate) {
    closeModal();
  }
});

closeModal();
