import { initScrollAnimations, initLoadAnimations, initBackToTop, initMobileMenu, initSkillFiltering, initPortfolioFiltering, initSmoothScrolling } from './utils/animations';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initLoadAnimations();
  initScrollAnimations();
  initBackToTop();
  initMobileMenu();
  initSkillFiltering();
  initPortfolioFiltering();
  initSmoothScrolling();
  
  // Add CSS for highlight effect
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .highlight-section {
      animation: highlightSection 1s ease;
    }
    @keyframes highlightSection {
      0% { box-shadow: 0 0 0 rgba(6, 182, 212, 0); }
      50% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
      100% { box-shadow: 0 0 0 rgba(6, 182, 212, 0); }
    }
    .pulse-once {
      animation: pulseOnce 0.6s ease;
    }
    @keyframes pulseOnce {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(styleElement);
});