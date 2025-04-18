// Animation utilities

// Initialize scroll animations
export const initScrollAnimations = () => {
  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // For staggered children animations
          if (entry.target.classList.contains('stagger-children')) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('active');
                (child as HTMLElement).style.opacity = '1';
                (child as HTMLElement).style.transform = 'translateY(0)';
              }, 100 * index);
            });
          }
          
          // Activate reveal-text elements inside this element
          const childTexts = entry.target.querySelectorAll('.reveal-text');
          childTexts.forEach((text, index) => {
            setTimeout(
              () => {
                text.classList.add('active');
              },
              300 + index * 100,
            );
          });
          
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    },
  );
  
  // Observe all reveal elements
  document.querySelectorAll('.reveal-element').forEach((element) => {
    observer.observe(element);
  });
  
  // Observe staggered elements
  document.querySelectorAll('.stagger-children').forEach((element) => {
    observer.observe(element);
  });
  
  // Initial check for elements already in viewport
  setTimeout(() => {
    document.querySelectorAll('.reveal-element').forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        element.classList.add('active');
        
        // Activate reveal-text elements inside this element
        const childTexts = element.querySelectorAll('.reveal-text');
        childTexts.forEach((text, index) => {
          setTimeout(
            () => {
              text.classList.add('active');
            },
            300 + index * 100,
          );
        });
      }
    });
  }, 500);
};

// Initialize initial load animations
export const initLoadAnimations = () => {
  setTimeout(() => {
    document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-top, .slide-in-bottom').forEach((element) => {
      element.classList.add('appear');
    });
  }, 300);
};

// Initialize back to top button
export const initBackToTop = () => {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
};

// Initialize mobile menu
export const initMobileMenu = () => {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-controls', 'mobile-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('hidden');
      
      // Add a slight delay before adding the open class for smooth animation
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('open');
        // Add animation to the toggle button
        mobileMenuToggle.classList.remove('active');
      } else {
        setTimeout(() => {
          mobileMenu.classList.add('open');
          // Add animation to the toggle button
          mobileMenuToggle.classList.add('active');
        }, 10);
      }
      
      // Toggle icon between bars and times with smooth transition
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        if (icon.classList.contains('fa-bars')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
      
      // Update ARIA attributes
      mobileMenuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
    });
    
    // Close mobile menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.classList.remove('active');
        
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        
        // Add a subtle ripple effect on click
        const ripple = document.createElement('span');
        ripple.classList.add('menu-link-ripple');
        link.appendChild(ripple);
        
        setTimeout(() => {
          link.removeChild(ripple);
        }, 600);
      });
    });
  }
};

// Initialize skill category filtering
export const initSkillFiltering = () => {
  const skillCategoryBtns = document.querySelectorAll('.skill-category-btn');
  const skillTiles = document.querySelectorAll('.skill-tile');
  
  skillCategoryBtns.forEach((btn) => {
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      skillCategoryBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      
      // Add active class to clicked button
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      
      // Get category value
      const category = btn.getAttribute('data-category');
      
      // Filter skill tiles
      skillTiles.forEach((tile) => {
        const tileCategory = tile.getAttribute('data-category');
        const element = tile as HTMLElement;
        
        if (category === 'all' || tileCategory === category) {
          element.style.display = 'flex';
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, 100);
        } else {
          element.style.opacity = '0';
          element.style.transform = 'translateY(10px)';
          setTimeout(() => {
            element.style.display = 'none';
          }, 300);
        }
      });
    });
  });
};

// Initialize portfolio filtering
export const initPortfolioFiltering = () => {
  const portfolioFilters = document.querySelectorAll('.portfolio-filter');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioFilters.forEach((filter) => {
    filter.setAttribute('role', 'button');
    filter.setAttribute('aria-pressed', filter.classList.contains('active') ? 'true' : 'false');
    
    filter.addEventListener('click', () => {
      // Remove active class from all filters
      portfolioFilters.forEach((f) => {
        f.classList.remove('active');
        f.setAttribute('aria-pressed', 'false');
      });
      
      // Add active class to clicked filter
      filter.classList.add('active');
      filter.setAttribute('aria-pressed', 'true');
      
      // Get filter value
      const filterValue = filter.getAttribute('data-filter');
      
      // Filter items
      portfolioItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        const element = item as HTMLElement;
        
        if (filterValue === 'all' || category === filterValue) {
          element.style.display = 'block';
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, 100);
        } else {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
          setTimeout(() => {
            element.style.display = 'none';
          }, 300);
        }
      });
    });
  });
};

// Initialize smooth scrolling
export const initSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Adjust offset based on device
        const offset = window.innerWidth <= 768 ? 100 : 80;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
        
        // Add a subtle highlight effect to the target section
        setTimeout(() => {
          targetElement.classList.add('highlight-section');
          setTimeout(() => {
            targetElement.classList.remove('highlight-section');
          }, 1000);
        }, 800);
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('open');
          if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            
            // Toggle icon
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
            }
          }
        }
      }
    });
  });
};