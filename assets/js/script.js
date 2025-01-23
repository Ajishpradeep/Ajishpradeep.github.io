'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// SERVICE MODAL LOGIC

// Define service data (full descriptions)
const serviceDetails = [
  {
    title: 'Generative AI Solutions',
    text: 'I specialize in creating spatially and content-aware models for tasks such as image inpainting, conditional image generation, and data augmentation. Using frameworks like PyTorch and TensorFlow, I’ve developed systems that overcome data scarcity challenges, enhance contextual understanding, and improve feature extraction. My notable work includes a GAN-based architecture showcased at NVIDIA GTC 2025, which significantly improved performance in data-limited environments while minimizing mode collapse.',
  },
  {
    title: 'End-to-End AI Deployment',
    text: 'I design and deploy full-scale AI pipelines, including data preprocessing, model optimization, and production integration. My expertise spans cloud-native platforms like GCP and Vertex AI and edge deployments using NVIDIA TAO Toolkit and TensorRT. A key achievement includes developing a real-time planogram compliance system for retail, improving object detection accuracy by 25% and seamlessly integrating it into operational workflows.',
  },
];

// Modal selectors
const serviceItems = document.querySelectorAll("[data-service-item]");
const serviceModalContainer = document.querySelector("[data-modal-container]");
const serviceModalCloseBtn = document.querySelector("[data-modal-close-btn]");
const serviceModalOverlay = document.querySelector("[data-overlay]");
const serviceModalTitle = document.querySelector("[data-modal-title]");
const serviceModalText = document.querySelector("[data-modal-text]");

// Open modal for services
serviceItems.forEach((item, index) => {
  const popupBtn = item.querySelector("[data-popup-btn]");
  popupBtn.addEventListener("click", () => {
    serviceModalTitle.textContent = serviceDetails[index].title;
    serviceModalText.textContent = serviceDetails[index].text;
    serviceModalContainer.removeAttribute("hidden");
    serviceModalContainer.classList.add("active");
  });
});

// Close modal for services
const closeServiceModal = () => {
  serviceModalContainer.setAttribute("hidden", "");
  serviceModalContainer.classList.remove("active");
};

serviceModalCloseBtn.addEventListener("click", closeServiceModal);
serviceModalOverlay.addEventListener("click", closeServiceModal);

// TESTIMONIALS MODAL LOGIC

const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector('.service-modal-container');
const modalOverlay = document.querySelector('.service-overlay');


// Modal toggle function
const testimonialsModalFunc = function () {
  serviceModalContainer.classList.toggle("active");
  serviceModalOverlay.classList.toggle("active");
};

// Add click event to all testimonial items
testimonialsItems.forEach((item) => {
  item.addEventListener("click", function () {
    const modalImg = document.querySelector("[data-modal-img]");
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    serviceModalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    serviceModalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
});

// Add click event to modal close button
serviceModalCloseBtn.addEventListener("click", testimonialsModalFunc);
serviceModalOverlay.addEventListener("click", testimonialsModalFunc);
