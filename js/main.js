// Function to load HTML components
async function loadComponent(containerId, componentPath) {
    try {
        console.log(`Loading component: ${componentPath}`);
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath} - Status: ${response.status}`);
        }
        const html = await response.text();
        console.log(`Successfully loaded: ${componentPath}`);
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container element with ID '${containerId}' not found in the DOM.`);
        }
        container.innerHTML = html;
    } catch (error) {
        console.error(`Error loading component: ${error.message}`);
        document.getElementById(containerId).innerHTML = `<div class="p-4 bg-red-900 text-white rounded">Error loading ${componentPath}</div>`;
    }
}

// Import modules
import Terminal from './modules/terminal.js';
import Animations from './modules/animations.js';
import Filters from './modules/filters.js';
import MobileMenu from './modules/mobileMenu.js';

// Load all components when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing component loading...');

    // Array of components to load
    const components = [
        { id: 'nav-container', path: 'components/nav.html' },
        { id: 'sidebar-container', path: 'components/sidebar.html' },
        { id: 'about-container', path: 'components/about.html' },
        { id: 'skills-container', path: 'components/skills.html' },
        { id: 'services-container', path: 'components/services.html' },
        { id: 'experience-container', path: 'components/experience.html' },
        { id: 'education-container', path: 'components/education.html' },
        { id: 'portfolio-container', path: 'components/portfolio.html' },
        { id: 'collaborations-container', path: 'components/collaborations.html' },
        { id: 'contact-container', path: 'components/contact.html' },
        { id: 'footer-container', path: 'components/footer.html' }
    ];

    try {
        // Load all components in parallel
        await Promise.all(components.map(comp => loadComponent(comp.id, comp.path)));
        console.log('All components loaded successfully');

        // Initialize the UI after all components are loaded
        initializeUI();
    } catch (error) {
        console.error('Error loading components:', error);
    }
});

// Initialize UI interactions and animations
function initializeUI() {
    console.log('Initializing UI...');

    // Initialize modules
    try {
        new MobileMenu();
        new Animations();
        new Filters();
        new Terminal();
        console.log('All modules initialized successfully');
    } catch (error) {
        console.error('Error initializing modules:', error);
    }

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.classList.remove('visible');
                backToTopButton.style.opacity = '0';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
} 