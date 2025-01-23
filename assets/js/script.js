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
    text: `
      I design and implement advanced generative AI architectures tailored for real-world applications. My expertise includes creating spatially and content-aware models for tasks like image inpainting, conditional image generation, and data augmentation. Leveraging frameworks like PyTorch and TensorFlow, I have successfully developed and deployed generative AI systems that address data scarcity, improve contextual understanding, and enhance feature extraction in diverse domains.

      Notable achievements include a content-aware GAN architecture presented at NVIDIA GTC 2025, which significantly improved performance in data-limited environments while minimizing mode collapse and overfitting.
    `,
  },
  {
    title: "End-to-End AI Deployment",
    text: `
      I specialize in designing and deploying full-scale AI pipelines, covering data preprocessing, model development, optimization, and integration into production environments. My experience spans cloud-native solutions (Google Cloud Platform, Vertex AI) and edge deployments (NVIDIA TAO Toolkit, TensorRT), ensuring reliability, scalability, and performance optimization.

      My work includes a real-time planogram compliance system for retail, improving object detection accuracy by 25% and integrating seamlessly into existing workflows.
    `,
  },
  {
    title: "LLM Optimization",
    text: `
      My expertise in optimizing large language models (LLMs) focuses on improving computational efficiency while maintaining or enhancing model performance. I employ advanced techniques, such as Kolmogorov-Arnold Networks (KAN), pruning, quantization, and parameter-efficient fine-tuning, to reduce resource consumption and enable deployment in resource-constrained environments.

      Recent work includes optimizing transformers for visual question answering and deploying lightweight LLMs for enterprise applications, achieving faster inference times without compromising accuracy.
    `,
  },
  {
    title: "AI Freelance Engineering",
    text: `
      As a freelance AI Engineer, I provide end-to-end support for AI projects, from ideation to deployment. My services include custom model development, feature extraction, model fine-tuning, and integration with existing systems. I bring a research-driven approach to each project, ensuring solutions are both innovative and practical.

      My freelance collaborations have helped startups and enterprises optimize workflows, develop scalable AI solutions, and unlock new opportunities through AI-driven insights.
    `,
  },
];

// Attach click events to service items
serviceItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const modalTitle = document.querySelector("[data-modal-title]");
    const modalText = document.querySelector("[data-modal-text]");

    modalTitle.textContent = serviceDetails[index].title;
    modalText.innerHTML = serviceDetails[index].text; // Allows for multiline text
    const modalContainer = document.querySelector("[data-modal-container]");
    const overlay = document.querySelector("[data-overlay]");
    modalContainer.classList.add("active");
    overlay.classList.add("active");
  });
});

// Close modal functionality
modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

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
