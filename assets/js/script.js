'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Close modal function
const closeModal = function () {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
};

// Add close functionality to the overlay and close button
modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalImg = document.querySelector("[data-modal-img]");

// Testimonials modal function
testimonialsItem.forEach((item) => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    modalContainer.classList.add("active");
    overlay.classList.add("active");
  });
});

// Service modal functionality
const serviceItems = document.querySelectorAll("[data-service-item]");

// Define service details (title and content)
const serviceDetails = [
  {
    title: "Generative AI Solutions",
    text: "Detailed description of the service including expertise in generative models.",
  },
  {
    title: "End-to-End AI Deployment",
    text: "Details about your work in deploying scalable AI pipelines.",
  },
];

// Add click events to service items
serviceItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    modalTitle.textContent = serviceDetails[index].title;
    modalText.textContent = serviceDetails[index].text;

    modalContainer.classList.add("active");
    overlay.classList.add("active");
  });
});

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Add event in all select items
selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach((item) => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields
formInputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all navigation links
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    pages.forEach((page) => {
      if (targetPage === page.dataset.page) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach((navLink) => navLink.classList.remove("active"));
    this.classList.add("active");

    window.scrollTo(0, 0);
  });
});
