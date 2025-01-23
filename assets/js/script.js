'use strict';

// Element toggle function
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Common modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Close modal function
const closeModal = () => {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
};

// Add close functionality to the overlay and close button
[modalCloseBtn, overlay].forEach((elem) => {
  elem.addEventListener("click", closeModal);
});

// Sidebar functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", () => {
  elementToggleFunc(sidebar);
});

// Testimonials functionality
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalImg = document.querySelector("[data-modal-img]");

testimonialsItem.forEach((item) => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;

    modalContainer.classList.add("active");
    overlay.classList.add("active");
  });
});

// Service modal functionality
const serviceItems = document.querySelectorAll("[data-service-item]");
const serviceDetails = [
  {
    title: "Generative AI Solutions",
    text: `
      I design and implement advanced generative AI architectures tailored for real-world applications...
    `,
  },
  {
    title: "End-to-End AI Deployment",
    text: `
      I specialize in designing and deploying full-scale AI pipelines, covering data preprocessing...
    `,
  },
  {
    title: "LLM Optimization",
    text: `
      My expertise in optimizing large language models (LLMs) focuses on improving computational efficiency...
    `,
  },
  {
    title: "AI Freelance Engineering",
    text: `
      As a freelance AI Engineer, I provide end-to-end support for AI projects...
    `,
  },
];

// Attach click events to service items
serviceItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (serviceDetails[index]) {
      modalTitle.textContent = serviceDetails[index].title;
      modalText.innerHTML = serviceDetails[index].text;

      modalContainer.classList.add("active");
      overlay.classList.add("active");
    }
  });
});

// Custom select functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", () => elementToggleFunc(select));

selectItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);

    filterItems.forEach((filterItem) => {
      if (selectedValue === "all" || selectedValue === filterItem.dataset.category) {
        filterItem.classList.add("active");
      } else {
        filterItem.classList.remove("active");
      }
    });
  });
});

// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetPage = link.innerHTML.toLowerCase();

    pages.forEach((page) => {
      page.classList.toggle("active", page.dataset.page === targetPage);
    });

    navigationLinks.forEach((navLink) => navLink.classList.remove("active"));
    link.classList.add("active");

    window.scrollTo(0, 0);
  });
});
