document.addEventListener("DOMContentLoaded", () => {
  // Subtle AI Background Animation
  const aiBackground = document.querySelector(".ai-background")
  let offset = 0

  function animateBackground() {
    offset += 0.1
    if (offset > 50) offset = 0

    aiBackground.style.backgroundPosition = `${offset}px ${offset}px`
    requestAnimationFrame(animateBackground)
  }

  animateBackground()

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

  // Initial load animations
  setTimeout(() => {
    document.querySelectorAll(".slide-in-left, .slide-in-right, .slide-in-top, .slide-in-bottom").forEach((element) => {
      element.classList.add("appear")
    })
  }, 300)

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      mobileMenu.classList.toggle("open")
    })
  }

  // Scroll reveal animation with direction
  const revealElements = document.querySelectorAll(".reveal-element")
  const staggeredElements = document.querySelectorAll(".stagger-children")
  const revealTexts = document.querySelectorAll(".reveal-text")

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")

          // For staggered children animations
          if (entry.target.classList.contains("stagger-children")) {
            entry.target.classList.add("active")
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

          // Unobserve after animation is triggered
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
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

  // Skills category filtering
  const skillCategoryBtns = document.querySelectorAll(".skill-category-btn")
  const skillTiles = document.querySelectorAll(".skill-tile")

  skillCategoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      skillCategoryBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

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

  // Terminal functionality with AI integration
  const terminal = document.getElementById("terminal-content")
  const terminalInput = document.getElementById("terminal-input")
  const terminalSubmit = document.getElementById("terminal-submit")
  let resumeData = null
  let isProcessingAI = false

  // Function to fetch the resume PDF and convert to base64
  async function fetchResumeData() {
    try {
      const response = await fetch("resume.pdf")
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
      "[+] AjishGPT is processing your query...",
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
      // Initialize the Google Generative AI
      const genAI = new google.generativeai.GenerativeModel({ model: "gemini-1.5-flash" })

      // Prepare the contents array with the system prompt and user query
      const contents = [
        {
          role: "user",
          parts: [
            {
              text: `
              You are Ajish's AI assistant embedded in his portfolio website. Your name is AjishGPT.
              You should be helpful, friendly, and professional but with a playful character.
              You should answer questions about Ajish's portfolio, skills, experience, and background.
              
              Here's information about Ajish:
              - He's an AI Engineer and Researcher based in Taipei, Taiwan
              - He specializes in Vision AI, Generative AI, and LLM optimization
              - He works at President Information Corp as an AI Engineer
              - He presented a poster at NVIDIA GTC 2025 on scalable AI innovation
              - He has expertise in PyTorch, TensorFlow, Transformers, and Diffusion Models
              - He has a Master's in Electrical Engineering and Computer Science from National Taipei University of Technology
              - He previously worked as a Software Developer at AIBS Software Solutions in India
              
              If you don't know the answer to a question, you can say "I don't have that specific information about Ajish, but I can tell you about his skills and experience in AI engineering."
              
              Keep your responses concise and engaging. Use emojis occasionally to add personality.
              
              Now, please respond to this query: ${query}
            `,
            },
          ],
        },
      ]

      // If resume data is available, add it to the contents
      if (resumeData) {
        contents[0].parts.push({
          inlineData: {
            mimeType: "application/pdf",
            data: resumeData,
          },
        })
      }

      // Stop the thinking messages
      clearInterval(thinkingInterval)

      // Generate content
      const result = await genAI.generateContent(contents)
      const text = result.response.text()

      // Split the response by lines and add each line to the terminal
      const lines = text.split("\n")
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

  // Terminal auto-updates
  if (terminal) {
    let count = 0
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
    }, 8000)

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

  // Portfolio filtering
  const portfolioFilters = document.querySelectorAll(".portfolio-filter")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  portfolioFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      // Remove active class from all filters
      portfolioFilters.forEach((f) => f.classList.remove("active"))

      // Add active class to clicked filter
      filter.classList.add("active")

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

  // Back to top button
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

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
        }
      }
    })
  })
})

// Declare google variable before using it
var google

