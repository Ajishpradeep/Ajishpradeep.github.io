document.addEventListener("DOMContentLoaded", () => {
  // Subtle AI Background Animation
  const aiBackground = document.querySelector(".ai-background")
  const offset = 0

  // Performance optimizations
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Mobile detection with feature detection
  const isMobile = () => {
    return window.matchMedia('(max-width: 768px)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
  };

  // Enhanced scroll smoothness with ScrollReveal effect
  const enhancedSmoothScroll = (targetSelector, duration = 1000, offset = 0) => {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - offset;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function for smooth animation
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  // Improved mobile menu toggle with accessibility
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.setAttribute("aria-expanded", "false")
    mobileMenuToggle.setAttribute("aria-controls", "mobile-menu")

    mobileMenuToggle.addEventListener("click", () => {
      const isExpanded = mobileMenu.classList.contains("open")
      mobileMenu.classList.toggle("hidden")

      // Add a slight delay before adding the open class for smooth animation
      if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("open")
        // Add animation to the toggle button
        mobileMenuToggle.classList.remove("active")
      } else {
        setTimeout(() => {
          mobileMenu.classList.add("open")
          // Add animation to the toggle button
          mobileMenuToggle.classList.add("active")
        }, 10)
      }

      // Toggle icon between bars and times with smooth transition
      const icon = mobileMenuToggle.querySelector("i")
      if (icon) {
        if (icon.classList.contains("fa-bars")) {
          icon.classList.remove("fa-bars")
          icon.classList.add("fa-times")
        } else {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      }

      // Update ARIA attributes
      mobileMenuToggle.setAttribute("aria-expanded", !isExpanded)
    })

    // Close mobile menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link")
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
        mobileMenu.classList.remove("open")
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        mobileMenuToggle.classList.remove("active")

        const icon = mobileMenuToggle.querySelector("i")
        if (icon) {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }

        // Add a subtle ripple effect on click
        const ripple = document.createElement("span");
        ripple.classList.add("menu-link-ripple");
        link.appendChild(ripple);

        setTimeout(() => {
          link.removeChild(ripple);
        }, 600);
      })
    })

    // Add touch feedback animations for mobile social icons and improve touch interactions
    const mobileSocialIcons = document.querySelectorAll(".mobile-social-icon");
    mobileSocialIcons.forEach(icon => {
      // For touch devices
      icon.addEventListener("touchstart", () => {
        icon.style.transform = "scale(0.95) translateY(-2px)";
      });

      icon.addEventListener("touchend", () => {
        icon.style.transform = "";

        // Add pulse effect on touch
        icon.classList.add("pulse-once");
        setTimeout(() => {
          icon.classList.remove("pulse-once");
        }, 600);
      });

      // For mouse devices
      icon.addEventListener("mouseenter", () => {
        icon.style.transform = "scale(1.05) translateY(-3px)";
        icon.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.3)";
      });

      icon.addEventListener("mouseleave", () => {
        icon.style.transform = "";
        icon.style.boxShadow = "";
      });
    });

    // Fix for any potential layout shifts on mobile
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        if (!mobileMenu.classList.contains('hidden') && !mobileMenu.classList.contains('open')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  }

  // Typing animation for the title - FIXED
  const titleElements = document.querySelectorAll(".title-text")
  titleElements.forEach((titleElement) => {
    if (titleElement) {
      const originalText = titleElement.textContent
      titleElement.innerHTML =
        '<span class="typing-container"><span class="typing-animation"></span><span class="cursor"></span></span>'

      setTimeout(() => {
        const typingElement = titleElement.querySelector(".typing-animation")
        typingElement.textContent = originalText
      }, 500)
    }
  })

  // Initial load animations with performance optimization
  setTimeout(() => {
    document.querySelectorAll(".slide-in-left, .slide-in-right, .slide-in-top, .slide-in-bottom").forEach((element) => {
      element.classList.add("appear")
    })
  }, 300)

  // Improved Scroll reveal animation with Intersection Observer API
  const revealElements = document.querySelectorAll(".reveal-element")
  const staggeredElements = document.querySelectorAll(".stagger-children")
  const revealTexts = document.querySelectorAll(".reveal-text")
  const expertiseTiles = document.querySelectorAll(".expertise-tile")

  // Add hover effect to expertise tiles
  expertiseTiles.forEach((tile) => {
    tile.addEventListener("mouseenter", () => {
      tile.style.transform = "translateY(-5px)";
      tile.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
    });

    tile.addEventListener("mouseleave", () => {
      tile.style.transform = "";
      tile.style.boxShadow = "";
    });
  });

  // Create an Intersection Observer with better options
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")

          // For staggered children animations
          if (entry.target.classList.contains("stagger-children")) {
            const children = entry.target.children
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("active")
                child.style.opacity = "1"
                child.style.transform = "translateY(0)"
              }, 100 * index)
            })
          }

          // Activate reveal-text elements inside this element
          const childTexts = entry.target.querySelectorAll(".reveal-text")
          childTexts.forEach((text, index) => {
            setTimeout(
              () => {
                text.classList.add("active")
              },
              300 + index * 100,
            )
          })

          // Add a subtle pulse effect when elements appear
          setTimeout(() => {
            entry.target.classList.add("pulse-once");
            setTimeout(() => {
              entry.target.classList.remove("pulse-once");
            }, 600);
          }, 300);

          // Unobserve after animation is triggered
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe all reveal elements
  revealElements.forEach((element) => {
    observer.observe(element)
  })

  // Observe staggered elements
  staggeredElements.forEach((element) => {
    observer.observe(element)
  })

  // Initial check for elements already in viewport
  setTimeout(() => {
    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        element.classList.add("active")

        // Activate reveal-text elements inside this element
        const childTexts = element.querySelectorAll(".reveal-text")
        childTexts.forEach((text, index) => {
          setTimeout(
            () => {
              text.classList.add("active")
            },
            300 + index * 100,
          )
        })
      }
    })
  }, 500)

  // Smooth scrolling for navigation links with enhanced physics
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Adjust offset based on device
        const offset = isMobile() ? 100 : 80

        // Use enhanced smooth scrolling
        enhancedSmoothScroll(targetId, 800, offset);

        // Add a subtle highlight effect to the target section
        setTimeout(() => {
          targetElement.classList.add("highlight-section");
          setTimeout(() => {
            targetElement.classList.remove("highlight-section");
          }, 1000);
        }, 800);

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
          mobileMenu.classList.remove("open")
          if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute("aria-expanded", "false")
          }
        }
      }
    })
  })

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

  // Skills category filtering with improved accessibility
  const skillCategoryBtns = document.querySelectorAll(".skill-category-btn")
  const skillTiles = document.querySelectorAll(".skill-tile")

  skillCategoryBtns.forEach((btn) => {
    btn.setAttribute("role", "button")
    btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false")

    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      skillCategoryBtns.forEach((b) => {
        b.classList.remove("active")
        b.setAttribute("aria-pressed", "false")
      })

      // Add active class to clicked button
      btn.classList.add("active")
      btn.setAttribute("aria-pressed", "true")

      // Get category value
      const category = btn.getAttribute("data-category")

      // Filter skill tiles
      skillTiles.forEach((tile) => {
        const tileCategory = tile.getAttribute("data-category")

        if (category === "all" || tileCategory === category) {
          tile.style.display = "flex"
          setTimeout(() => {
            tile.style.opacity = "1"
            tile.style.transform = "translateY(0)"
          }, 100)
        } else {
          tile.style.opacity = "0"
          tile.style.transform = "translateY(10px)"
          setTimeout(() => {
            tile.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Terminal functionality with AI integration - improved for mobile
  const terminal = document.getElementById("terminal-content")
  const terminalInput = document.getElementById("terminal-input")
  const terminalSubmit = document.getElementById("terminal-submit")
  let resumeData = null
  let isProcessingAI = false

  // Function to fetch the resume PDF and convert to base64
  async function fetchResumeData() {
    try {
      const response = await fetch("Resume.pdf")
      const arrayBuffer = await response.arrayBuffer()
      return btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ""))
    } catch (error) {
      console.error("Error fetching resume:", error)
      return null
    }
  }

  // Try to load the resume data when the page loads
  fetchResumeData()
    .then((data) => {
      resumeData = data
      console.log("Resume data loaded")
    })
    .catch((err) => {
      console.error("Failed to load resume data:", err)
    })

  function addTerminalLine(text, className = "") {
    if (!terminal) return

    const newLine = document.createElement("div")
    newLine.className = `mb-1 ${className}`
    newLine.textContent = text
    terminal.appendChild(newLine)
    terminal.scrollTop = terminal.scrollHeight
  }

  async function askAI(query) {
    if (isProcessingAI) {
      addTerminalLine("[!] Already processing a request. Please wait...", "text-yellow-400")
      return
    }

    isProcessingAI = true

    // Show AI thinking messages
    const thinkingMessages = [
      "[+] Jarvis is processing your query...",
      "[+] Analyzing your question...",
      "[+] Accessing resume data...",
      "[+] Formulating response...",
    ]

    // Display the first thinking message immediately
    addTerminalLine(thinkingMessages[0], "text-cyan-400")

    // Display additional thinking messages with delays
    let messageIndex = 1
    const thinkingInterval = setInterval(() => {
      if (messageIndex < thinkingMessages.length) {
        addTerminalLine(thinkingMessages[messageIndex], "text-cyan-400")
        messageIndex++
      } else {
        clearInterval(thinkingInterval)
      }
    }, 800)

    try {
      // Call the Netlify Function instead of directly using Gemini API
      const response = await fetch("/.netlify/functions/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Stop the thinking messages
      clearInterval(thinkingInterval)

      // Split the response by lines and add each line to the terminal
      const lines = data.reply.split("\n")
      lines.forEach((line) => {
        if (line.trim()) {
          addTerminalLine(line, "text-green-400")
        }
      })
    } catch (error) {
      // Stop the thinking messages
      clearInterval(thinkingInterval)

      console.error("Error asking AI:", error)
      addTerminalLine(`[!] Error communicating with AI: ${error.message}`, "text-red-400")
      addTerminalLine("[!] This might be due to API key restrictions or network issues.", "text-red-400")
    } finally {
      isProcessingAI = false

      // Add back the cursor
      const cursor = document.createElement("div")
      cursor.className = "mb-1"
      cursor.innerHTML = '<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>'
      terminal.appendChild(cursor)
    }
  }

  function processCommand(command) {
    if (!terminal) return

    addTerminalLine(`ajish@portfolio:~# ${command}`)

    const commands = {
      help: () => {
        addTerminalLine("[+] Available commands:")
        addTerminalLine("    help - Show this help message")
        addTerminalLine("    skills - List technical skills")
        addTerminalLine("    projects - List portfolio projects")
        addTerminalLine("    collaborations - List collaborations")
        addTerminalLine("    contact - Show contact information")
        addTerminalLine("    clear - Clear the terminal")
        addTerminalLine("    Enter Command... ")
      },
      skills: () => {
        addTerminalLine("[+] Technical Skills:")
        addTerminalLine("    • Programming: Python, JavaScript")
        addTerminalLine("    • AI Frameworks: PyTorch, TensorFlow, Transformers")
        addTerminalLine("    • Specializations: Generative AI, Vision AI, LLM Optimization")
        addTerminalLine("    • Cloud: Google Cloud Platform, Vertex AI")
        addTerminalLine("    • Edge Deployment: TensorRT, NVIDIA TAO Toolkit")
        addTerminalLine("    • Mathematics: Linear Algebra, Calculus, Attention Mechanisms")
        addTerminalLine("    • Techniques: Feature Extraction, Vector Embedding")
      },
      projects: () => {
        addTerminalLine("[+] Notable Projects:")
        addTerminalLine("    • Content and Spatial Aware Generative Model (Thesis)")
        addTerminalLine("    • NVIDIA GTC 2025 Poster Presentation")
        addTerminalLine("    • Retail Inventory Management System")
        addTerminalLine("    • LLM Optimization Research")
        addTerminalLine("    • Handheld Object Detection")
      },
      collaborations: () => {
        addTerminalLine("[+] Key Collaborations:")
        addTerminalLine("    • Future Data Systems (Taiwan) - AI in Agriculture")
        addTerminalLine("    • MobilityZ (USA) - MSK Injury Management")
        addTerminalLine("    • NTUT Research Lab - AI & Multimedia Systems")
      },
      contact: () => {
        addTerminalLine("[+] Contact Information:")
        addTerminalLine("    • Email: ajishpradeep@gmail.com")
        addTerminalLine("    • Phone: +886 905 174 662")
        addTerminalLine("    • Location: Taipei, Taiwan")
        addTerminalLine("    • LinkedIn: linkedin.com/in/ajishpradeep")
      },
      clear: () => {
        terminal.innerHTML = ""
        addTerminalLine(
          '<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>',
          "html",
        )
      },
      about: () => {
        addTerminalLine("[+] About Ajish Pradeep:")
        addTerminalLine("    AI Engineer & Researcher specializing in designing and")
        addTerminalLine("    deploying advanced AI solutions with a research-driven")
        addTerminalLine("    approach to solving complex AI challenges.")
      },
    }

    if (command.trim() === "") {
      return
    } else if (command.toLowerCase().startsWith("ask ")) {
      // Extract the question part
      const question = command.substring(4).trim()
      if (question) {
        askAI(question)
        return
      } else {
        addTerminalLine("[!] Please provide a question after 'ask'")
      }
    } else if (commands[command.toLowerCase()]) {
      commands[command.toLowerCase()]()
    } else {
      // If not a built-in command, treat it as a question for the AI
      askAI(command)
    }

    // Add back the cursor (only for non-AI commands)
    if (!command.toLowerCase().startsWith("ask ")) {
      const cursor = document.createElement("div")
      cursor.className = "mb-1"
      cursor.innerHTML = '<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>'
      terminal.appendChild(cursor)
    }
  }

  if (terminalSubmit && terminalInput) {
    terminalSubmit.addEventListener("click", () => {
      const command = terminalInput.value
      processCommand(command)
      terminalInput.value = ""
    })

    terminalInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const command = terminalInput.value
        processCommand(command)
        terminalInput.value = ""
      }
    })
  }

  // Terminal auto-updates with reduced frequency on mobile
  if (terminal) {
    let count = 0
    const updateInterval = isMobile() ? 12000 : 8000 // Longer interval on mobile

    setInterval(() => {
      if (count < 3) {
        const entries = [
          "[+] Analyzing latest AI research papers...",
          "[+] Scanning for new generative AI techniques...",
          "[+] Monitoring LLM optimization strategies...",
          "[+] Checking vision transformer architectures...",
          "[+] Evaluating edge deployment options...",
          "[+] Analyzing neural network topologies...",
          "[+] Benchmarking model inference speeds...",
          "[+] Optimizing attention mechanisms...",
        ]
        const randomEntry = entries[Math.floor(Math.random() * entries.length)]

        const newEntry = document.createElement("div")
        newEntry.className = "mb-1 text-gray-500"
        newEntry.textContent = `[${new Date().toLocaleTimeString()}] ${randomEntry}`
        terminal.appendChild(newEntry)
        terminal.scrollTop = terminal.scrollHeight
        count++
      }
    }, updateInterval)

    // Blinking cursor effect
    setInterval(() => {
      const cursor = document.querySelector(".code-input")
      if (cursor) {
        cursor.classList.toggle("opacity-0")
      }
    }, 500)
  }

  // Terminal control buttons
  const clearTerminal = document.getElementById("clear-terminal")
  if (clearTerminal && terminal) {
    clearTerminal.addEventListener("click", () => {
      terminal.innerHTML =
        '<div class="mb-1"><span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span></div>'
    })
  }

  const refreshTerminal = document.getElementById("refresh-terminal")
  if (refreshTerminal && terminal) {
    refreshTerminal.addEventListener("click", () => {
      const newEntry1 = document.createElement("div")
      newEntry1.className = "mb-1"
      newEntry1.textContent = "[+] Refreshing terminal session..."
      terminal.appendChild(newEntry1)

      setTimeout(() => {
        const newEntry2 = document.createElement("div")
        newEntry2.className = "mb-1"
        newEntry2.textContent = "[+] Loading latest AI expertise data..."
        terminal.appendChild(newEntry2)

        setTimeout(() => {
          const newEntry3 = document.createElement("div")
          newEntry3.className = "mb-1"
          newEntry3.textContent = "[+] Terminal refreshed. All systems operational."
          terminal.appendChild(newEntry3)

          const prompt = document.createElement("div")
          prompt.className = "mb-1"
          prompt.innerHTML = '<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>'
          terminal.appendChild(prompt)

          terminal.scrollTop = terminal.scrollHeight
        }, 800)
      }, 800)
    })
  }

  // Portfolio filtering with improved accessibility
  const portfolioFilters = document.querySelectorAll(".portfolio-filter")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  portfolioFilters.forEach((filter) => {
    filter.setAttribute("role", "button")
    filter.setAttribute("aria-pressed", filter.classList.contains("active") ? "true" : "false")

    filter.addEventListener("click", () => {
      // Remove active class from all filters
      portfolioFilters.forEach((f) => {
        f.classList.remove("active")
        f.setAttribute("aria-pressed", "false")
      })

      // Add active class to clicked filter
      filter.classList.add("active")
      filter.setAttribute("aria-pressed", "true")

      // Get filter value
      const filterValue = filter.getAttribute("data-filter")

      // Filter items
      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category")

        if (filterValue === "all" || category === filterValue) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "translateY(20px)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Back to top button with improved mobile positioning
  const backToTopButton = document.getElementById("back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Handle active states for mobile bottom navigation
  const sections = document.querySelectorAll("section, div[id]")
  const navLinks = document.querySelectorAll(".mobile-nav a")

  function setActiveNavLink() {
    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("text-white", "font-bold")
      const href = link.getAttribute("href").substring(1)

      if (href === currentSection) {
        link.classList.add("text-white", "font-bold")
      }
    })
  }

  window.addEventListener("scroll", setActiveNavLink)
  setActiveNavLink() // Set initial state

  // Add theme toggle functionality
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  const isDarkMode = prefersDarkMode

  // Add dark mode toggle button if needed

  // Add print functionality for resume
  // const printButton = document.querySelector(".resume-download-btn")
  // if (printButton) {
  //   const printResume = document.createElement("button")
  //   printResume.className = "resume-download-btn w-full text-center mt-2"
  //   printResume.innerHTML = '<i class="fas fa-print"></i> PRINT RESUME'
  //   printResume.addEventListener("click", () => {
  //     window.print()
  //   })
  //   printButton.parentNode.appendChild(printResume)
  // }

  // Add keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden")
      mobileMenu.classList.remove("open")
      if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        const icon = mobileMenuToggle.querySelector("i")
        if (icon) {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      }
    }

    // Tab key navigation for accessibility
    if (e.key === "Tab") {
      const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  })

  // Add lazy loading for images
  document.querySelectorAll("img").forEach((img) => {
    img.loading = "lazy"
  })

  // Add offline support with service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("ServiceWorker registration successful")
        })
        .catch((error) => {
          console.log("ServiceWorker registration failed:", error)
        })
    })
  }

  // Add copy to clipboard functionality for contact info
  const contactInfoElements = document.querySelectorAll(".contact-link")
  contactInfoElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (element.getAttribute("href").startsWith("mailto:") || element.getAttribute("href").startsWith("tel:")) {
        return // Let default behavior handle these
      }

      e.preventDefault()
      const textToCopy = element.textContent
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show a tooltip or notification
        const originalText = element.textContent
        element.textContent = "Copied!"
        setTimeout(() => {
          element.textContent = originalText
        }, 2000)
      })
    })
  })

  // Optimize scroll handling
  const handleScroll = throttle(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Back to top button visibility
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      if (scrollPosition > windowHeight * 0.5) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal-element');
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });

    // Staggered children animations
    const staggerParents = document.querySelectorAll('.stagger-children');
    staggerParents.forEach((parent, parentIndex) => {
      const children = parent.children;
      Array.from(children).forEach((child, childIndex) => {
        const delay = childIndex * 100;
        child.style.transitionDelay = `${delay}ms`;

        const childTop = child.getBoundingClientRect().top;
        const childVisible = 150;

        if (childTop < windowHeight - childVisible) {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }
      });
    });
  }, 100);

  // Optimize mobile menu
  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('.mobile-menu-button');

    if (mobileMenu && menuButton) {
      mobileMenu.classList.toggle('open');
      menuButton.classList.toggle('active');

      // Prevent body scroll when menu is open
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }
  };

  // Optimize typing animation
  const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';

    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  };

  // Optimize smooth scroll
  const smoothScroll = (target, duration = 800) => {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    // Easing function
    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  // Optimize form handling
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    try {
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending...';

      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        form.reset();
        submitButton.innerHTML = 'Sent!';
        setTimeout(() => {
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      submitButton.innerHTML = 'Error!';
      setTimeout(() => {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      }, 3000);
    }
  };

  // Optimize image loading
  const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // Initialize optimizations
  document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', debounce(handleScroll, 250));

    // Mobile menu
    const menuButton = document.querySelector('.mobile-menu-button');
    if (menuButton) {
      menuButton.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = anchor.getAttribute('href');
        smoothScroll(target);

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          toggleMobileMenu();
        }
      });
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Initialize lazy loading
    lazyLoadImages();

    // Initial scroll check
    handleScroll();

    // Typing animation for hero section
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
      const text = heroText.textContent;
      typeWriter(heroText, text);
    }

    // Add touch feedback for mobile
    if (isMobile()) {
      document.querySelectorAll('.skill-tile, .expertise-tile, .service-card, .education-card, .collab-card, .portfolio-item').forEach(element => {
        element.addEventListener('touchstart', () => {
          element.style.transform = 'scale(0.98)';
        });

        element.addEventListener('touchend', () => {
          element.style.transform = '';
        });
      });
    }
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', debounce(handleScroll, 250));
  });
})

// Create a simple service worker for offline support
if (typeof window !== "undefined") {
  const createServiceWorker = () => {
    const swContent = `
      // Simple service worker for basic offline support
      const CACHE_NAME = 'ajish-portfolio-cache-v1';
      const urlsToCache = [
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/profile_pic.png',
        '/Resume.pdf'
      ];

      self.addEventListener('install', event => {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
        );
      });

      self.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
            .then(response => response || fetch(event.request))
        );
      });
    `

    const blob = new Blob([swContent], { type: "text/javascript" })
    const swUrl = URL.createObjectURL(blob)

    // Create a link to download the service worker
    const link = document.createElement("a")
    link.href = swUrl
    link.download = "service-worker.js"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Uncomment this to generate the service worker file
  // createServiceWorker();
}
