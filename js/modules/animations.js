/**
 * Animations Module - Handles all animation-related functionality
 */

export default class Animations {
    constructor() {
        this.titleElements = document.querySelectorAll(".title-text");
        this.revealElements = document.querySelectorAll(".reveal-element");
        this.staggeredElements = document.querySelectorAll(".stagger-children");
        this.revealTexts = document.querySelectorAll(".reveal-text");
        this.floatingElements = document.querySelectorAll(".floating-animation");
        this.tiltElements = document.querySelectorAll(".tilt-effect");

        this.init();
    }

    init() {
        this.initTypingAnimation();
        this.initInitialAnimations();
        this.initScrollReveal();
        this.initFloatingAnimation();
        this.initTiltEffect();
    }

    initTypingAnimation() {
        this.titleElements.forEach((titleElement) => {
            if (titleElement) {
                const originalText = titleElement.textContent;
                titleElement.innerHTML =
                    '<span class="typing-container"><span class="typing-animation"></span><span class="cursor"></span></span>';

                setTimeout(() => {
                    const typingElement = titleElement.querySelector(".typing-animation");
                    typingElement.textContent = originalText;
                }, 500);
            }
        });
    }

    initInitialAnimations() {
        setTimeout(() => {
            document.querySelectorAll(".slide-in-left, .slide-in-right, .slide-in-top, .slide-in-bottom").forEach((element) => {
                element.classList.add("appear");
            });
        }, 300);
    }

    initFloatingAnimation() {
        this.floatingElements.forEach((element, index) => {
            // Add slightly different animation delay for each element to create a more natural look
            const delay = index % 4 * 0.5;
            element.style.animationDelay = `${delay}s`;
        });
    }

    initTiltEffect() {
        if ('ontouchstart' in window) {
            // Skip tilt effect on touch devices
            return;
        }

        this.tiltElements.forEach(element => {
            element.addEventListener('mousemove', e => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                element.style.transform = `perspective(1000px) rotateX(${-deltaY * 5}deg) rotateY(${deltaX * 5}deg) translateZ(10px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    initScrollReveal() {
        // Create an Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");

                        // For staggered children animations
                        if (entry.target.classList.contains("stagger-children")) {
                            const children = entry.target.children;
                            Array.from(children).forEach((child, index) => {
                                setTimeout(() => {
                                    child.classList.add("active");
                                    child.style.opacity = "1";
                                    child.style.transform = "translateY(0)";
                                }, 100 * index);
                            });
                        }

                        // Activate reveal-text elements inside this element
                        const childTexts = entry.target.querySelectorAll(".reveal-text");
                        childTexts.forEach((text, index) => {
                            setTimeout(
                                () => {
                                    text.classList.add("active");
                                },
                                300 + index * 100,
                            );
                        });

                        // Start progress animations for skill bars
                        const progressElements = entry.target.querySelectorAll(".progress-animation");
                        progressElements.forEach((progress, index) => {
                            setTimeout(() => {
                                const width = progress.style.getPropertyValue('--progress-width') || '0%';
                                progress.style.width = width;
                            }, 500 + index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 },
        );

        // Observe all reveal elements
        this.revealElements.forEach((el) => observer.observe(el));
        this.staggeredElements.forEach((el) => observer.observe(el));

        // Add parallax scrolling effect for section containers
        window.addEventListener('scroll', () => {
            const parallaxElements = document.querySelectorAll('.section-container');
            parallaxElements.forEach(element => {
                const position = window.scrollY;
                const offset = element.offsetTop;
                const distance = offset - position;

                if (Math.abs(distance) < window.innerHeight) {
                    const intensity = 0.03;  // Adjust this for more/less parallax effect
                    element.style.transform = `translateY(${distance * intensity}px)`;
                }
            });
        });
    }
} 