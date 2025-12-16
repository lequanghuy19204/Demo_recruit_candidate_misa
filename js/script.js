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

const dateInputs = document.querySelectorAll(
  '.modal-add-candidate-date-input input'
);
const calendars = document.querySelectorAll(
  ".modal-add-candidate-date-input-icon"
);

calendars.forEach((calendar, index) => {
  calendar.addEventListener("click", function () {
    dateInputs[index].showPicker();
  });
});
