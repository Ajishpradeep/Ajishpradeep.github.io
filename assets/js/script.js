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
      Design and implement advanced generative AI architectures tailored for real-world applications. My expertise includes creating spatially and content-aware models for tasks like image inpainting, conditional image generation, and data augmentation. Leveraging frameworks like PyTorch and TensorFlow, I have successfully developed and deployed generative AI systems that address data scarcity, improve contextual understanding, and enhance feature extraction in diverse domains.

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

// Filter functionality
const filterButtons = document.querySelectorAll("[data-filter-btn]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to the clicked button
    button.classList.add("active");

    const filterCategory = button.getAttribute("data-category");

    // Show or hide projects based on the selected category
    filterItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (filterCategory === "all" || itemCategory === filterCategory) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
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


document.querySelectorAll('.navbar-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    const targetId = this.getAttribute('href').substring(1); // Get the target section ID
    const targetSection = document.getElementById(targetId); // Find the target section

    if (targetSection) {
      // Scroll to the target section smoothly
      targetSection.scrollIntoView({ behavior: 'smooth' });

      // Update active class on navigation links
      document.querySelectorAll('.navbar-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.5 } // Adjust threshold as needed
);

sections.forEach(section => {
  observer.observe(section);
});



