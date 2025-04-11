/**
 * MobileMenu Module - Handles mobile menu functionality
 */

export default class MobileMenu {
    constructor() {
        this.mobileMenuToggle = document.getElementById("mobile-menu-toggle");
        this.mobileMenu = document.getElementById("mobile-menu");
        this.mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");

        this.init();
    }

    init() {
        if (!this.mobileMenuToggle || !this.mobileMenu) {
            console.error('Mobile menu elements not found in DOM');
            return;
        }

        this.mobileMenuToggle.setAttribute("aria-expanded", "false");
        this.mobileMenuToggle.setAttribute("aria-controls", "mobile-menu");

        this.setupToggleEvent();
        this.setupLinkEvents();
    }

    setupToggleEvent() {
        this.mobileMenuToggle.addEventListener("click", () => {
            const isExpanded = this.mobileMenu.classList.contains("open");
            this.mobileMenu.classList.toggle("hidden");

            // Add a slight delay before adding the open class for smooth animation
            if (this.mobileMenu.classList.contains("hidden")) {
                this.mobileMenu.classList.remove("open");
                // Add animation to the toggle button
                this.mobileMenuToggle.classList.remove("active");
            } else {
                setTimeout(() => {
                    this.mobileMenu.classList.add("open");
                    // Add animation to the toggle button
                    this.mobileMenuToggle.classList.add("active");
                }, 10);
            }

            // Toggle icon between bars and times with smooth transition
            const icon = this.mobileMenuToggle.querySelector("i");
            if (icon) {
                if (icon.classList.contains("fa-bars")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-times");
                } else {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }

            // Update ARIA attributes
            this.mobileMenuToggle.setAttribute("aria-expanded", !isExpanded);
        });
    }

    setupLinkEvents() {
        if (!this.mobileMenuLinks.length) return;

        this.mobileMenuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                this.mobileMenu.classList.add("hidden");
                this.mobileMenu.classList.remove("open");
                this.mobileMenuToggle.setAttribute("aria-expanded", "false");
                this.mobileMenuToggle.classList.remove("active");

                const icon = this.mobileMenuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }
} 