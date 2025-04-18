// This file will contain utility functions for the portfolio

// Function to handle smooth scrolling
export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

// Function to toggle mobile menu
export const toggleMobileMenu = () => {
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  
  if (mobileMenu && mobileMenuToggle) {
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.classList.add('open');
      }, 10);
      
      // Change icon
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
    } else {
      mobileMenu.classList.remove('open');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
      
      // Change icon back
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  }
};

// Function to filter portfolio items
export const filterPortfolio = (category: string) => {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach((item) => {
    const itemCategory = item.getAttribute('data-category');
    const element = item as HTMLElement;
    
    if (category === 'all' || itemCategory === category) {
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
};

// Function to filter skills
export const filterSkills = (category: string) => {
  const skillTiles = document.querySelectorAll('.skill-tile');
  
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
};

// Function to handle terminal commands
export const processTerminalCommand = (command: string) => {
  const terminal = document.getElementById('terminal-content');
  if (!terminal) return '';
  
  const commands: Record<string, string> = {
    'help': 'Available commands: help, skills, projects, collaborations, contact, clear',
    'skills': 'Technical Skills: Python, JavaScript, PyTorch, TensorFlow, Transformers, Generative AI, Vision AI, LLM Optimization',
    'projects': 'Notable Projects: Content and Spatial Aware Generative Model, NVIDIA GTC 2025 Poster, Retail Inventory Management System',
    'collaborations': 'Key Collaborations: Future Data Systems (Taiwan), MobilityZ (USA), NTUT Research Lab',
    'contact': 'Contact: ajishpradeep@gmail.com | +886 905 174 662 | Taipei, Taiwan',
    'clear': ''
  };
  
  if (command === 'clear') {
    terminal.innerHTML = '';
    return '';
  }
  
  if (commands[command.toLowerCase()]) {
    return commands[command.toLowerCase()];
  }
  
  return `Command not found: ${command}. Type 'help' for available commands.`;
};

// Function to handle back to top button visibility
export const handleBackToTopVisibility = () => {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }
};

// Function to initialize scroll animations
export const initScrollAnimations = () => {
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
              }, 100 * index);
            });
          }
          
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );
  
  // Observe all reveal elements
  document.querySelectorAll('.reveal-element').forEach((element) => {
    observer.observe(element);
  });
  
  // Observe staggered elements
  document.querySelectorAll('.stagger-children').forEach((element) => {
    observer.observe(element);
  });
};