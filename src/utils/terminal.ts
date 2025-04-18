import { getGeminiResponse } from './gemini';

// Process terminal commands
export const processCommand = async (input: string): Promise<string> => {
  const command = input.trim().toLowerCase();
  
  if (command === 'help') {
    return `Available commands:
- help: Show this help message
- skills: List my technical skills
- projects: Show my portfolio projects
- collaborations: List my collaborations
- contact: Show contact information
- clear: Clear the terminal
- ask [question]: Ask me anything about my experience, skills, or projects`;
  }
  
  if (command === 'skills') {
    return `Technical Skills:
- Programming: Python, JavaScript
- AI Frameworks: PyTorch, TensorFlow, Transformers, Diffusion Models
- Specializations: Generative AI, Vision AI, LLM Optimization
- Cloud & Deployment: Google Cloud Platform, Vertex AI, Edge Deployment
- Mathematics: Linear Algebra, Calculus, Attention Mechanisms
- Techniques: Feature Extraction, Vector Embedding`;
  }
  
  if (command === 'projects') {
    return `Portfolio Projects:
1. Real-time Planogram Compliance System
2. Custom AI Model for Object Detection
3. Generative AI Pipelines with NVIDIA
4. Consumer Behavior Prediction Model
5. ERP Solutions Development
6. Inventory Management System`;
  }
  
  if (command === 'collaborations') {
    return `Collaborations:
- NVIDIA: Generative AI pipelines
- 7-Eleven: Planogram compliance system
- Future Data Systems: AI solutions
- MobilityZ: AI integration`;
  }
  
  if (command === 'contact') {
    return `Contact Information:
- Email: ajishpradeep@gmail.com
- LinkedIn: https://www.linkedin.com/in/ajishpradeep/
- GitHub: https://github.com/Ajishpradeep/`;
  }
  
  if (command === 'clear') {
    return 'clear';
  }
  
  // Handle any input that starts with 'ask' or any other text as a question
  if (command.startsWith('ask ') || !['help', 'skills', 'projects', 'collaborations', 'contact', 'clear'].includes(command)) {
    const question = command.startsWith('ask ') ? command.substring(4).trim() : command;
    if (question) {
      try {
        const response = await getGeminiResponse(question);
        if (!response) {
          throw new Error('No response from Gemini API');
        }
        return response;
      } catch (error) {
        console.error('Error getting AI response:', error);
        return "I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.";
      }
    }
    return "Please provide a question. For example: 'ask What is your experience with AI?' or just type your question directly.";
  }
  
  return `Command not found: ${command}. Type 'help' to see available commands.`;
};

// Terminal functionality
export const initTerminal = () => {
  const terminal = document.getElementById('terminal-content');
  const terminalInput = document.getElementById('terminal-input') as HTMLInputElement;
  const terminalSubmit = document.getElementById('terminal-submit');
  
  if (!terminal || !terminalInput || !terminalSubmit) {
    console.error('Terminal elements not found');
    return;
  }
  
  // Function to add a line to the terminal
  const addTerminalLine = (text: string, className = '') => {
    const newLine = document.createElement('div');
    newLine.className = `mb-1 ${className}`;
    newLine.innerHTML = text;
    terminal.appendChild(newLine);
    terminal.scrollTop = terminal.scrollHeight;
  };
  
  // Function to process and display command
  const processAndDisplayCommand = async (command: string) => {
    if (!command.trim()) return;
    
    addTerminalLine(`<span class="text-yellow-400">ajish@portfolio:~#</span> ${command}`);
    
    try {
      const response = await processCommand(command);
      if (response === 'clear') {
        terminal.innerHTML = '';
        addTerminalLine('<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>');
      } else {
        addTerminalLine(response);
        addTerminalLine('<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>');
      }
    } catch (error) {
      console.error('Error processing command:', error);
      addTerminalLine('Error processing command. Please try again.');
      addTerminalLine('<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>');
    }
  };
  
  // Event listeners
  terminalSubmit.addEventListener('click', async () => {
    const command = terminalInput.value;
    terminalInput.value = '';
    await processAndDisplayCommand(command);
  });
  
  terminalInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value;
      terminalInput.value = '';
      await processAndDisplayCommand(command);
    }
  });
  
  // Terminal control buttons
  const clearTerminal = document.getElementById('clear-terminal');
  if (clearTerminal) {
    clearTerminal.addEventListener('click', () => {
      terminal.innerHTML = '<div class="mb-1"><span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span></div>';
    });
  }
  
  const refreshTerminal = document.getElementById('refresh-terminal');
  if (refreshTerminal) {
    refreshTerminal.addEventListener('click', () => {
      addTerminalLine("[+] Refreshing terminal session...");
      
      setTimeout(() => {
        addTerminalLine("[+] Loading latest AI expertise data...");
        
        setTimeout(() => {
          addTerminalLine("[+] Terminal refreshed. All systems operational.");
          addTerminalLine('<span class="text-yellow-400">ajish@portfolio:~#</span><span class="code-input"> _</span>');
        }, 800);
      }, 800);
    });
  }
  
  // Blinking cursor effect
  setInterval(() => {
    const cursor = document.querySelector(".code-input");
    if (cursor) {
      cursor.classList.toggle("opacity-0");
    }
  }, 500);
  
  // Terminal auto-updates
  let count = 0;
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
      ];
      const randomEntry = entries[Math.floor(Math.random() * entries.length)];
      
      addTerminalLine(`[${new Date().toLocaleTimeString()}] ${randomEntry}`, 'text-gray-500');
      count++;
    }
  }, 8000);
};