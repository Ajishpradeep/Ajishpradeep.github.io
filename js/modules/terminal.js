/**
 * Terminal Module - Handles all terminal-related functionality
 */

export default class Terminal {
    constructor() {
        this.terminalInput = document.getElementById('terminal-input');
        this.terminalSubmit = document.getElementById('terminal-submit');
        this.terminalContent = document.getElementById('terminal-content');
        this.clearTerminalBtn = document.getElementById('clear-terminal');
        this.refreshTerminalBtn = document.getElementById('refresh-terminal');

        this.init();
    }

    init() {
        if (!this.terminalInput || !this.terminalSubmit || !this.terminalContent) {
            console.error('Terminal elements not found in the DOM');
            return;
        }

        // Set up event listeners
        this.terminalSubmit.addEventListener('click', () => this.handleCommand());

        this.terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand();
            }
        });

        if (this.clearTerminalBtn) {
            this.clearTerminalBtn.addEventListener('click', () => this.clearTerminal());
        }

        if (this.refreshTerminalBtn) {
            this.refreshTerminalBtn.addEventListener('click', () => this.refreshTerminal());
        }

        // Initialize terminal with default content
        this.initTerminal();
    }

    initTerminal() {
        this.terminalContent.innerHTML = '';
        this.addTerminalLine('<span class="text-yellow-400">ajish@portfolio:~#</span> ./skills --list -t expertise');
        this.addTerminalLine('[+] Initializing skill analysis...');
        this.addTerminalLine('[+] Loading expertise profile... <span class="text-green-400">SUCCESS</span>');
        this.addTerminalLine('[+] Analyzing core competencies...');
        this.addTerminalLine('[!] EXPERTISE: Generative AI, Vision AI, LLM Optimization');
        this.addTerminalLine('[!] FRAMEWORKS: PyTorch, TensorFlow, Transformers, Diffusion Models');
        this.addTerminalLine('[!] PLATFORMS: Google Cloud Platform (GCP), Vertex AI, Deepstream');
        this.addTerminalLine('[+] Scanning for specialized techniques...');
        this.addTerminalLine('[!] FOUND: Feature extraction, vector embedding, transformer architectures');
        this.addTerminalLine('[+] Analyzing mathematical foundations...');
        this.addTerminalLine('[!] STRONG: Linear Algebra, Calculus, Attention Mechanisms');
        this.addTerminalLine('[+] Jarvis initialized. Type \'ask\' followed by your question or just type your question directly.');
        this.addTerminalLine(`<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>`);
    }

    addTerminalLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `mb-1 ${className}`;
        line.innerHTML = text;
        this.terminalContent.appendChild(line);
        this.terminalContent.scrollTop = this.terminalContent.scrollHeight;
    }

    handleCommand() {
        const command = this.terminalInput.value.trim();
        if (!command) return;

        this.addTerminalLine(`<span class="text-yellow-400">ajish@portfolio:~#</span> ${command}`);
        this.processCommand(command);
        this.terminalInput.value = '';
    }

    clearTerminal() {
        this.terminalContent.innerHTML = '<div class="mb-1"><span class="text-yellow-400">ajish@portfolio:~#</span> clear</div>';
        this.addTerminalLine('[+] Terminal cleared');
        this.addTerminalLine(`<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>`);
    }

    refreshTerminal() {
        this.addTerminalLine('<span class="text-yellow-400">ajish@portfolio:~#</span> refresh');
        this.addTerminalLine('[+] Refreshing terminal...');
        setTimeout(() => {
            this.initTerminal();
        }, 500);
    }

    processCommand(command) {
        const lowerCommand = command.toLowerCase();

        if (lowerCommand === 'help') {
            this.addTerminalLine('[+] Available commands:');
            this.addTerminalLine('[+] <span class="text-cyan-400">help</span> - Show this help message');
            this.addTerminalLine('[+] <span class="text-cyan-400">skills</span> - List skills and expertise');
            this.addTerminalLine('[+] <span class="text-cyan-400">projects</span> - Display projects information');
            this.addTerminalLine('[+] <span class="text-cyan-400">collaborations</span> - Show collaborations');
            this.addTerminalLine('[+] <span class="text-cyan-400">contact</span> - Display contact information');
            this.addTerminalLine('[+] <span class="text-cyan-400">clear</span> - Clear the terminal');
            this.addTerminalLine('[+] <span class="text-cyan-400">ask [question]</span> - Ask a question about Ajish');
        } else if (lowerCommand === 'skills') {
            this.addTerminalLine('[+] PROGRAMMING: Python, JavaScript');
            this.addTerminalLine('[+] AI FRAMEWORKS: PyTorch, TensorFlow, Transformers, Diffusion Models, Deepstream');
            this.addTerminalLine('[+] CLOUD/DEPLOYMENT: Google Cloud (GCP), Vertex AI, Edge Deployment, TensorRT');
            this.addTerminalLine('[+] SPECIALIZATIONS: Computer Vision, LLM Optimization, Fine-tuning, Multi-Modal AI');
            this.addTerminalLine('[+] MATHEMATICS: Linear Algebra, Calculus, Attention Mechanism, Feature Extraction');
        } else if (lowerCommand === 'projects') {
            this.addTerminalLine('[+] Featured Projects:');
            this.addTerminalLine('[+] <span class="text-cyan-400">1. Content and Spatial Aware Generative Model</span> - Research');
            this.addTerminalLine('[+] <span class="text-orange-400">2. NVIDIA GTC 2025 Poster</span> - Research');
            this.addTerminalLine('[+] <span class="text-green-400">3. Reducing LLM Computational Costs</span> - Research (NDA)');
            this.addTerminalLine('[+] <span class="text-yellow-400">4. Handheld Object Detection</span> - Project (NDA)');
            this.addTerminalLine('[+] <span class="text-cyan-400">5. Retail Inventory Management</span> - Project');
            this.addTerminalLine('[+] <span class="text-yellow-400">6. Case Study: Transformers & Embedding</span> - Case Study');
        } else if (lowerCommand === 'collaborations') {
            this.addTerminalLine('[+] Key Collaborations:');
            this.addTerminalLine('[+] <span class="text-cyan-400">1. Future Data Systems</span> - AI in Agriculture (Taiwan)');
            this.addTerminalLine('[+] <span class="text-orange-400">2. MobilityZ</span> - Digital Health (USA)');
            this.addTerminalLine('[+] <span class="text-green-400">3. Research Lab (AI & Multimedia Systems)</span> - NTUT (Taiwan)');
        } else if (lowerCommand === 'contact') {
            this.addTerminalLine('[+] PERSONAL EMAIL: ajishpradeep@gmail.com');
            this.addTerminalLine('[+] BUSINESS EMAIL: ajish@quintet-ai.com');
            this.addTerminalLine('[+] PHONE: +886 905 174 662');
            this.addTerminalLine('[+] LOCATION: Taipei, Taiwan');
            this.addTerminalLine('[+] LINKEDIN: linkedin.com/in/ajishpradeep');
            this.addTerminalLine('[+] GITHUB: github.com/Ajishpradeep');
        } else if (lowerCommand.startsWith('ask ') || (!lowerCommand.startsWith('ask') && lowerCommand !== 'clear')) {
            const question = lowerCommand.startsWith('ask ') ? command.substring(4).trim() : command;
            if (question) {
                this.addTerminalLine(`[+] Question: ${question}`);
                this.addTerminalLine('[+] <span class="text-yellow-400">Connecting to AI...</span>');

                // Simulate AI thinking
                setTimeout(() => {
                    this.processAIResponse(question);
                }, 1000);
            } else {
                this.addTerminalLine('[!] <span class="text-red-400">ERROR: Please provide a question after "ask"</span>');
            }
        }

        // Always add a new prompt line except for clear command
        if (lowerCommand !== 'clear') {
            setTimeout(() => {
                this.addTerminalLine(`<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>`);
            }, 100);
        }
    }

    processAIResponse(question) {
        // Simulated responses based on keywords
        if (question.toLowerCase().includes('experience') || question.toLowerCase().includes('work')) {
            this.addTerminalLine('[+] <span class="text-green-400">AI:</span> Ajish currently works as an AI Engineer at President Information Corp in Taiwan (since 2023). He previously worked as a Software Developer at AIBS Software Solutions in India from 2017 to 2021. His current work focuses on generative AI and computer vision solutions.');
        } else if (question.toLowerCase().includes('education') || question.toLowerCase().includes('study')) {
            this.addTerminalLine('[+] <span class="text-green-400">AI:</span> Ajish holds a Master\'s degree in Electrical Engineering and Computer Science from National Taipei University of Technology, Taiwan. During his studies, he conducted research on generative AI models, specifically focusing on content and spatial-aware models for image inpainting.');
        } else if (question.toLowerCase().includes('skill') || question.toLowerCase().includes('expertise')) {
            this.addTerminalLine('[+] <span class="text-green-400">AI:</span> Ajish specializes in Generative AI, Vision AI, and LLM optimization. He works with frameworks like PyTorch, TensorFlow, and Transformers. His technical skills include Edge Deployment, Vector Embedding, and AI model fine-tuning.');
        } else if (question.toLowerCase().includes('contact') || question.toLowerCase().includes('hire')) {
            this.addTerminalLine('[+] <span class="text-green-400">AI:</span> You can contact Ajish via email at ajishpradeep@gmail.com (personal) or ajish@quintet-ai.com (business). His phone number is +886 905 174 662. He is currently available for freelance projects and collaborations.');
        } else {
            this.addTerminalLine('[+] <span class="text-green-400">AI:</span> I\'m a simple AI assistant for Ajish\'s portfolio. I can answer basic questions about his experience, education, skills, and how to contact him. Please try asking about these topics or use commands like "skills", "projects", or "collaborations" to learn more.');
        }
    }
} 