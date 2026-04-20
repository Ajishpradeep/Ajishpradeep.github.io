import React, { useEffect } from 'react';
import { initTerminal } from '../utils/terminal';
import BlogSection from './BlogSection';

const MainContent: React.FC = () => {
  useEffect(() => {
    // Initialize terminal after component mounts
    initTerminal();
  }, []);

  return (
    <div className="lg:col-span-5 space-y-6">
      {/* Mobile Profile Section (Only visible on mobile) */}
      <div className="md:hidden bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover-glow reveal-element from-left mb-4">
        <div className="p-4">
          {/* Profile Header with Picture and Info */}
          <div className="flex items-start space-x-4 mb-4">
            {/* Profile Picture */}
            <div className="w-16 h-16 overflow-hidden rounded-lg profile-pic-container-mobile">
              <img src="/profile_pic.png" alt="Pradeep Rajasekar" className="w-full h-full object-cover" />
            </div>

            {/* Name and Title */}
            <div className="flex-1">
              <h1 className="text-lg font-bold text-cyan-400 typing-animation-mobile">PRADEEP RAJASEKAR</h1>
              <p className="text-xs text-gray-400 mb-1">AI RESEARCH ENGINEER</p>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 pulse-element"></div>
                <span className="text-xs text-green-400">AVAILABLE FOR WORK</span>
              </div>
            </div>
          </div>

          {/* Status and Location */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gray-800 rounded p-2">
              <div className="flex items-center mb-1">
                <i className="fas fa-map-marker-alt text-cyan-400 mr-2"></i>
                <span className="text-xs text-cyan-400">LOCATION</span>
              </div>
              <span className="text-xs text-gray-300">NEW TAIPEI CITY, TAIWAN</span>
            </div>
            <div className="bg-gray-800 rounded p-2">
              <div className="flex items-center mb-1">
                <i className="fas fa-signal text-green-400 mr-2"></i>
                <span className="text-xs text-green-400">STATUS</span>
              </div>
              <span className="text-xs text-gray-300">PORTFOLIO: ACTIVE</span>
            </div>
          </div>

          {/* Social Icons and Download CV in Table Layout */}
          <div className="grid grid-cols-3 gap-2">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/ajishpradeep/" target="_blank" className="mobile-social-link flex items-center bg-gray-800 rounded p-2 hover:bg-gray-700">
              <i className="fab fa-linkedin-in text-cyan-400 mr-2"></i>
              <span className="text-xs text-gray-300">LinkedIn</span>
            </a>
            {/* GitHub */}
            <a href="https://github.com/Ajishpradeep/" target="_blank" className="mobile-social-link flex items-center bg-gray-800 rounded p-2 hover:bg-gray-700">
              <i className="fab fa-github text-green-400 mr-2"></i>
              <span className="text-xs text-gray-300">GitHub</span>
            </a>
            {/* Line */}
            <a href="https://line.me/ti/p/Ubq5KJIQTv" target="_blank" className="mobile-social-link flex items-center bg-gray-800 rounded p-2 hover:bg-gray-700">
              <i className="fab fa-line text-yellow-400 mr-2"></i>
              <span className="text-xs text-gray-300">Line</span>
            </a>
            {/* Email */}
            <a href="mailto:ajishpradeep@gmail.com" className="mobile-social-link flex items-center bg-gray-800 rounded p-2 hover:bg-gray-700">
              <i className="fas fa-envelope text-orange-400 mr-2"></i>
              <span className="text-xs text-gray-300">Email</span>
            </a>
            {/* Phone */}
            <a href="tel:+886905174662" className="mobile-social-link flex items-center bg-gray-800 rounded p-2 hover:bg-gray-700">
              <i className="fas fa-phone text-red-400 mr-2"></i>
              <span className="text-xs text-gray-300">Phone</span>
            </a>
            {/* Download CV */}
            <a href="/Resume.pdf" download className="mobile-social-link flex items-center bg-gray-800 rounded p-2 hover:bg-gray-700">
              <i className="fas fa-download text-purple-400 mr-2"></i>
              <span className="text-xs text-gray-300">CV</span>
            </a>
          </div>
        </div>
      </div>

      {/* Terminal Component */}
      {/* <Terminal /> */}

      {/* Skills Section (Full Width) */}
      <div id="skills" className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover-glow reveal-element from-right">
        <div className="border-b border-gray-800 p-4 bg-gray-950 flex justify-between items-center">
          <h2 className="font-bold text-green-400 flex items-center">
            <i className="fas fa-code mr-2"></i> CORE SKILLS
          </h2>
          <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">EXPERT</span>
        </div>

        {/* Skills Categories */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="skill-category-btn active" data-category="all">ALL</button>
            <button className="skill-category-btn" data-category="programming">PROGRAMMING</button>
            <button className="skill-category-btn" data-category="ai-frameworks">AI FRAMEWORKS</button>
            <button className="skill-category-btn" data-category="cloud-deployment">CLOUD & DEPLOYMENT</button>
            <button className="skill-category-btn" data-category="specializations">SPECIALIZATIONS</button>
            <button className="skill-category-btn" data-category="mathematics">MATHEMATICS</button>
          </div>
        </div>

        {/* Skills Tiles Container */}
        <div className="p-4">
          <div className="skills-container-fullwidth">
            {/* Programming Skills */}
            <div className="skill-tile" data-category="programming">
              <i className="fas fa-code skill-icon"></i>
              <span>Python</span>
            </div>
            <div className="skill-tile" data-category="programming">
              <i className="fab fa-js skill-icon"></i>
              <span>JavaScript</span>
            </div>

            {/* AI Frameworks */}
            <div className="skill-tile" data-category="ai-frameworks">
              <i className="fas fa-brain skill-icon"></i>
              <span>PyTorch</span>
            </div>
            <div className="skill-tile" data-category="ai-frameworks">
              <i className="fas fa-brain skill-icon"></i>
              <span>TensorFlow</span>
            </div>
            <div className="skill-tile" data-category="ai-frameworks">
              <i className="fas fa-robot skill-icon"></i>
              <span>Transformers</span>
            </div>
            <div className="skill-tile" data-category="ai-frameworks">
              <i className="fas fa-project-diagram skill-icon"></i>
              <span>Diffusion Models</span>
            </div>
            <div className="skill-tile" data-category="ai-frameworks">
              <i className="fas fa-stream skill-icon"></i>
              <span>Deepstream</span>
            </div>

            {/* Cloud & Deployment */}
            <div className="skill-tile" data-category="cloud-deployment">
              <i className="fas fa-cloud skill-icon"></i>
              <span>Google Cloud (GCP)</span>
            </div>
            <div className="skill-tile" data-category="cloud-deployment">
              <i className="fas fa-server skill-icon"></i>
              <span>Vertex AI</span>
            </div>
            <div className="skill-tile" data-category="cloud-deployment">
              <i className="fas fa-microchip skill-icon"></i>
              <span>Edge Deployment</span>
            </div>
            <div className="skill-tile" data-category="cloud-deployment">
              <i className="fas fa-bolt skill-icon"></i>
              <span>TensorRT</span>
            </div>

            {/* Specializations */}
            <div className="skill-tile" data-category="specializations">
              <i className="fas fa-eye skill-icon"></i>
              <span>Object Detection</span>
            </div>
            <div className="skill-tile" data-category="specializations">
              <i className="fas fa-image skill-icon"></i>
              <span>Conditional Image Generation</span>
            </div>
            <div className="skill-tile" data-category="specializations">
              <i className="fas fa-comments skill-icon"></i>
              <span>LLM Optimization</span>
            </div>
            <div className="skill-tile" data-category="specializations">
              <i className="fas fa-layer-group skill-icon"></i>
              <span>Multi-Modal AI</span>
            </div>
            <div className="skill-tile" data-category="specializations">
              <i className="fas fa-database skill-icon"></i>
              <span>Vector Embedding</span>
            </div>
            <div className="skill-tile" data-category="specializations">
              <i className="fas fa-cogs skill-icon"></i>
              <span>Custom AI Model Training</span>
            </div>
            <div className="skill-tile" data-category="specializations">
              <i className="fas fa-sliders-h skill-icon"></i>
              <span>Fine-tuning</span>
            </div>

            {/* Mathematics */}
            <div className="skill-tile" data-category="mathematics">
              <i className="fas fa-square-root-alt skill-icon"></i>
              <span>Linear Algebra</span>
            </div>
            <div className="skill-tile" data-category="mathematics">
              <i className="fas fa-infinity skill-icon"></i>
              <span>Calculus</span>
            </div>
            <div className="skill-tile" data-category="mathematics">
              <i className="fas fa-lightbulb skill-icon"></i>
              <span>Attention Mechanism</span>
            </div>
            <div className="skill-tile" data-category="mathematics">
              <i className="fas fa-chart-line skill-icon"></i>
              <span>Feature Extraction</span>
            </div>
          </div>
        </div>
      </div>

      {/* What I'm Doing */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover-glow reveal-element from-left">
        <div className="border-b border-gray-800 p-4 bg-gray-950 flex justify-between items-center">
          <h2 className="font-bold text-orange-400 flex items-center">
            <i className="fas fa-laptop-code mr-2"></i> WHAT I'M DOING
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 stagger-children">
          {/* Service 1 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 service-card service-cyan">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center mr-3 service-icon">
                <i className="fas fa-brain text-cyan-400"></i>
              </div>
              <h3 className="font-bold">POSE LIFTING & BIOMECHANICAL AI</h3>
            </div>
            <p className="text-xs text-gray-400">
              2D-to-3D pose estimation for sports analysis. 60% accuracy improvement (8cm→3cm error) through temporal consistency. On-device 240fps inference powering XView AI for PGA professionals.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 service-card service-orange">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-orange-900 rounded-full flex items-center justify-center mr-3 service-icon">
                <i className="fas fa-project-diagram text-orange-400"></i>
              </div>
              <h3 className="font-bold">AGENTIC LLM COACHING SYSTEMS</h3>
            </div>
            <p className="text-xs text-gray-400">
              Domain-specific AI coaches fine-tuned with biomechanical facts. Multi-turn interactions with Claude/Gemini APIs. Real-time feedback generation for athlete improvement grounded in motion analysis.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 service-card service-green">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center mr-3 service-icon">
                <i className="fas fa-microchip text-green-400"></i>
              </div>
              <h3 className="font-bold">EDGE AI & APPLE ECOSYSTEM</h3>
            </div>
            <p className="text-xs text-gray-400">
              Model compression & quantization for ARM devices. CoreML optimization achieving 80% size reduction. Battery-efficient on-device inference without cloud dependency or latency.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 service-card service-yellow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-yellow-900 rounded-full flex items-center justify-center mr-3 service-icon">
                <i className="fas fa-handshake text-yellow-400"></i>
              </div>
              <h3 className="font-bold">AI TOOLING & ORGANIZATIONAL STANDARDS</h3>
            </div>
            <p className="text-xs text-gray-400">
              Organization-wide AI coding standards & custom cursor rules. Consensus-driven LLM workflows. Mentoring 8+ engineers on effective AI collaboration while maintaining code quality.
            </p>
          </div>
        </div>
      </div>

      {/* Experience & Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div id="experience" className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden h-full hover-glow reveal-element from-bottom">
            <div className="border-b border-gray-800 p-3 bg-gray-950 flex justify-between items-center">
              <h2 className="font-bold text-orange-400 flex items-center">
                <i className="fas fa-briefcase mr-2"></i> EXPERIENCE
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {/* Experience 1 */}
              <div className="border-b border-gray-800 pb-4 experience-item">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-orange-400">AI RESEARCH ENGINEER</h3>
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">MAY 2025 — PRESENT</span>
                </div>
                <p className="text-sm mb-2">IdeasLab Formosa, Taipei, Taiwan</p>
                <ul className="text-xs text-gray-400 list-disc pl-4 space-y-2">
                  <li>Led R&D of high-precision 2D-to-3D pose lifting (VGGT, TCPFormer, FreeMo), reducing joint error by 60% (8cm→3cm) via temporal consistency, motion-aligned lifting, spatial refinement. First markerless golf swing analysis on mobile.</li>
                  <li>Reconstructed 5+ SOTA research architectures (Gaussian Splatting, multi-view geometry) into production-ready PyTorch modules. Internal benchmarking suite for long-tailed actions. 30% fidelity gain under occlusion.</li>
                  <li>Architecting agentic LLM coaching system: fine-tuned models with biomechanical constraints, multi-turn Claude/Gemini API integrations, real-time feedback grounded in motion analysis facts.</li>
                  <li>240fps on-device inference via CoreML optimization, quantization, ARM deployment. Zero cloud calls. iOS app live with 1000+ PGA professionals. Spearheaded TAITRA award-winning proposal (55 countries).</li>
                </ul>
              </div>

              {/* Experience 2 */}
              <div className="border-b border-gray-800 pb-4 experience-item">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-orange-400">AI ENGINEER</h3>
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">NOV 2023 — FEB 2025</span>
                </div>
                <p className="text-sm mb-2">President Information Corp (統一資訊), Taipei, Taiwan</p>
                <ul className="text-xs text-gray-400 list-disc pl-4 space-y-2">
                  <li>Led real-time planogram compliance system (YOLO + embeddings): NVIDIA GTC 2025 poster presenter. Training-free catalog updates via vector similarity. Deployed to 200+ retail stores.</li>
                  <li>Computer vision for handheld object recognition under occlusion (DETR, fine-tuned embeddings): 30% perf gain. Live in Taiwan's X8 unmanned 7-Eleven. Edge inference with sub-100ms latency.</li>
                  <li>NVIDIA collaboration: Metropolis microservices architecture. TAO Toolkit for model training, TensorRT optimization achieving 40% latency reduction, DeepStream SDK for real-time processing pipelines.</li>
                  <li>LLM-assisted NER pipeline on GCP Document AI. Predictive analytics: 5M+ data points analyzed with 95% confidence intervals. Cross-functional data science + engineering leadership.</li>
                </ul>
              </div>

              {/* Experience 3 */}
              <div className="experience-item">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-orange-400">SOFTWARE DEVELOPER</h3>
                  <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">MAY 2017 — AUG 2021</span>
                </div>
                <p className="text-sm mb-2">AIBS Software Solutions, Coimbatore, India</p>
                <ul className="text-xs text-gray-400 list-disc pl-4 space-y-2">
                  <li>Full-stack ERP solutions (React + Node.js + PostgreSQL) for 50+ enterprise clients. Custom workflows for manufacturing optimization. Real-time dashboards with WebSockets. REST APIs handling 10K+ req/hour.</li>
                  <li>Inventory management + tax tracking system: Resolved 95% of legacy software discrepancies. Optimized PostgreSQL queries reducing latency by 65%. Led team of 3, mentored 5 junior developers. High end-user satisfaction.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden h-full hover-glow reveal-element from-right">
            <div className="border-b border-gray-800 p-3 bg-gray-950 flex justify-between items-center">
              <h2 className="font-bold text-green-400 flex items-center">
                <i className="fas fa-terminal mr-2"></i> AI TERMINAL
              </h2>
              <div className="flex space-x-2">
                <button className="text-xs bg-gray-800 hover:bg-green-900 text-green-400 px-2 py-1 rounded transition-all" id="clear-terminal">
                  <i className="fas fa-trash mr-1"></i> CLEAR
                </button>
                <button className="text-xs bg-gray-800 hover:bg-green-900 text-green-400 px-2 py-1 rounded transition-all" id="refresh-terminal">
                  <i className="fas fa-redo mr-1"></i> REFRESH
                </button>
              </div>
            </div>
            <div id="terminal-content" className="h-64 p-3 overflow-y-auto terminal-scroll bg-black text-green-400 text-xs font-mono">
              <div className="mb-1 text-gray-500">$ help</div>
              <div className="mb-1">help - Show available commands</div>
              <div className="mb-1">skills - List technical skills</div>
              <div className="mb-1">projects - Show portfolio projects</div>
              <div className="mb-1">collaborations - List collaborations</div>
              <div className="mb-1">contact - Contact information</div>
              <div className="mb-1">clear - Clear terminal</div>
              <div className="mb-1">ask [question] - Ask AI about Ajish</div>
              <div className="mb-2"><span className="text-yellow-400">$</span><span className="code-input"> _</span></div>
            </div>
            <div className="p-2 border-t border-gray-800 bg-gray-950">
              <div className="flex">
                <input type="text" id="terminal-input" placeholder="Enter Command..." className="w-full bg-black border border-gray-700 text-green-400 text-xs p-1 focus:outline-none focus:border-green-500" />
                <button id="terminal-submit" className="bg-green-900 text-green-400 px-2 text-xs">ASK</button>
              </div>
              <div className="text-xs text-gray-600 mt-1">Type 'help' or 'ask' [question]</div>
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div id="education" className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover-glow reveal-element from-left">
        <div className="border-b border-gray-800 p-4 bg-gray-950 flex justify-between items-center">
          <h2 className="font-bold text-green-400 flex items-center">
            <i className="fas fa-graduation-cap mr-2"></i> EDUCATION
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 stagger-children">
          {/* Education 1 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 education-card education-green">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center mr-3 education-icon">
                <i className="fas fa-university text-green-400"></i>
              </div>
              <div>
                <h3 className="font-bold">MASTER OF SCIENCE IN ELECTRICAL ENGINEERING AND COMPUTER SCIENCE</h3>
                <p className="text-xs text-gray-500">National Taipei University of Technology, Taiwan (2021–2023) | GPA: 3.8/4.0</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Master's thesis: "Content and Spatial Aware Generative Model for Inpainting" — Proposed GAN-based architecture with contextual and spatial attention, addressing mode collapse, memorization, and underfitting in low-data regimes while extending receptive-field capacity for improved spatial consistency.
            </p>
          </div>

          {/* Education 2 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 education-card education-cyan">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center mr-3 education-icon">
                <i className="fas fa-university text-cyan-400"></i>
              </div>
              <div>
                <h3 className="font-bold">BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY</h3>
                <p className="text-xs text-gray-500">Sri Ramakrishna Mission Vidyalaya College, Coimbatore, India (2011–2014) | GPA: 7.9/10</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Strong foundation in computer science, data structures, algorithms, and programming fundamentals that enabled rapid skill development and domain mastery across multiple specialized areas.
            </p>
          </div>
        </div>
      </div>

      {/* Research Blog & Case Studies */}
      <BlogSection />

      {/* Portfolio */}
      <div id="portfolio" className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover-glow reveal-element from-right">
        <div className="border-b border-gray-800 p-4 bg-gray-950 flex justify-between items-center">
          <h2 className="font-bold text-yellow-400 flex items-center">
            <i className="fas fa-project-diagram mr-2"></i> PORTFOLIO
          </h2>
          <div className="text-xs">
            <span className="text-orange-400">NOTE: </span>
            <span className="text-gray-400">SOME REPOSITORIES ARE PRIVATE DUE TO NDA</span>
          </div>
        </div>

        {/* Portfolio Filter */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="portfolio-filter active" data-filter="all">ALL</button>
            <button className="portfolio-filter" data-filter="research">RESEARCH</button>
            <button className="portfolio-filter" data-filter="projects">PROJECTS</button>
            <button className="portfolio-filter" data-filter="case-studies">CASE STUDIES</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 portfolio-container stagger-children">
          {/* Project 1 */}
          <div className="bg-gray-950 p-3 rounded border border-gray-800 hover:border-cyan-700 transition-all cursor-pointer portfolio-item" data-category="research">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-cyan-400">POSE LIFTING & MOTION ANALYSIS FOR GOLF SWING</h3>
              <span className="text-xs bg-cyan-900 text-cyan-300 px-2 py-0.5 rounded-full">RESEARCH</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Led R&D of high-precision 2D-to-3D human pose lifting system achieving 60% accuracy improvement (8cm→3cm mean per-joint error). Integrated temporal consistency modeling, motion-aligned lifting, and spatial refinement. Reconstructed state-of-the-art research architectures for XView AI platform production deployment.
            </p>
            <div className="flex justify-between text-xs">
              <span className="text-cyan-400">CURRENT PROJECT</span>
              <span className="text-gray-400">CONTACT FOR DETAILS</span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-gray-950 p-3 rounded border border-gray-800 hover:border-orange-700 transition-all cursor-pointer portfolio-item" data-category="research">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-orange-400">SCALABLE VISION AI FOR PLANOGRAM COMPLIANCE</h3>
              <span className="text-xs bg-orange-900 text-orange-300 px-2 py-0.5 rounded-full">NVIDIA GTC 2025</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Led development of scalable real-time planogram compliance system combining dense object detection (YOLO) with fine-tuned vector embeddings enabling training-free product catalog updates at scale. Presented as technical poster at NVIDIA GTC 2025.
            </p>
            <div className="flex justify-between text-xs">
              <span className="text-orange-400">CONFERENCE PRESENTATION</span>
              <a href="https://www.nvidia.com/gtc/session-catalog/?search=Pradeep#/session/1727681108625001ctNM" target="_blank" className="text-blue-400 hover:underline">VIEW DETAILS</a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-gray-950 p-3 rounded border border-gray-800 hover:border-green-700 transition-all cursor-pointer portfolio-item" data-category="research">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-green-400">EFFICIENT LLM INFERENCE VIA KAN</h3>
              <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">RESEARCH</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Investigating substitution of dense MLP blocks with Kolmogorov-Arnold Networks (KAN) layers to reduce LLM computational cost while preserving representational capacity, bridging mathematical function approximation theory with practical inference optimization.
            </p>
            <div className="flex justify-between text-xs">
              <span className="text-green-400">IN PROGRESS</span>
              <span className="text-gray-400">CONTACT FOR DETAILS</span>
            </div>
          </div>

          {/* Project 4 */}
          <div className="bg-gray-950 p-3 rounded border border-gray-800 hover:border-yellow-700 transition-all cursor-pointer portfolio-item" data-category="projects">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-yellow-400">AUTONOMOUS RETAIL VISION AI</h3>
              <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-0.5 rounded-full">PRODUCTION</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Engineered computer vision pipeline for partially occluded handheld object recognition integrating custom detection with vector-embedding search, achieving 30% performance gain. Deployed to production at Taiwan's 8th unmanned 7-Eleven store (X8) in Keelung.
            </p>
            <div className="flex justify-between text-xs">
              <span className="text-yellow-400">DEPLOYED</span>
              <span className="text-gray-400">CASE STUDY</span>
            </div>
          </div>

          {/* Project 5 */}
          <div className="bg-gray-950 p-3 rounded border border-gray-800 hover:border-cyan-700 transition-all cursor-pointer portfolio-item" data-category="case-studies">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-cyan-400">PLANOGRAM COMPLIANCE VISION SYSTEM</h3>
              <span className="text-xs bg-cyan-900 text-cyan-300 px-2 py-0.5 rounded-full">CASE STUDY</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Developed vision-based system identifying discrepancies between planogram and realogram for retail shelf optimization. Enhanced operational efficiency for 7-Eleven stores through real-time compliance monitoring and automated reporting.
            </p>
            <div className="flex justify-between text-xs">
              <span className="text-cyan-400">CASE STUDY</span>
              <a href="https://drive.google.com/file/d/1CHZokDYdyX0GEruNErHCW4bFt6hBf8On/view?usp=sharing" target="_blank" className="text-blue-400 hover:underline">VIEW DETAILS</a>
            </div>
          </div>

          {/* Project 6 */}
          <div className="bg-gray-950 p-3 rounded border border-gray-800 hover:border-yellow-700 transition-all cursor-pointer portfolio-item" data-category="case-studies">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-yellow-400">MASTER'S THESIS: CONTENT & SPATIAL AWARE INPAINTING</h3>
              <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-0.5 rounded-full">RESEARCH CASE STUDY</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              GAN-based inpainting architecture integrating contextual attention in generator and content-spatial attention in discriminator. Overcame mode collapse, memorization, underfitting in low-data regimes while extending receptive-field for spatial consistency.
            </p>
            <div className="flex justify-between text-xs">
              <span className="text-yellow-400">THESIS PROJECT</span>
              <a href="https://github.com/Ajishpradeep/Case_Study" target="_blank" className="text-blue-400 hover:underline">VIEW RELATED WORK</a>
            </div>
          </div>
        </div>
      </div>

      {/* Recognition & Awards */}
      <div id="recognition" className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover-glow reveal-element from-bottom">
        <div className="border-b border-gray-800 p-4 bg-gray-950 flex justify-between items-center">
          <h2 className="font-bold text-yellow-400 flex items-center">
            <i className="fas fa-trophy mr-2"></i> RECOGNITION & AWARDS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 stagger-children">
          {/* Award 1 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 award-card award-nvidia">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 bg-yellow-900 rounded-full flex items-center justify-center mr-3 award-icon">
                <i className="fas fa-award text-yellow-400"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-yellow-400">NVIDIA GTC 2025</h3>
                <p className="text-xs text-gray-500">Technical Poster Presenter</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Led scalable vision AI research for planogram compliance system. Presented technical poster: "Scalable Vision AI for Planogram Compliance."
            </p>
          </div>

          {/* Award 2 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 award-card award-taitra">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-3 award-icon">
                <i className="fas fa-star text-red-400"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-400">TAITRA Award 2025</h3>
                <p className="text-xs text-gray-500">"Go Healthy Taiwan"</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Technical lead engineer behind award-winning proposal. Selected from 638 international submissions across 55 countries. Highlighted AI innovation in sports analytics and biomechanics.
            </p>
          </div>

          {/* Award 3 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 award-card award-expo">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center mr-3 award-icon">
                <i className="fas fa-globe text-green-400"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-400">Taiwan Expo Europe</h3>
                <p className="text-xs text-gray-500">Lead Engineering Representative</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Selected as lead engineering representative to showcase AI capabilities at Taiwan Expo Europe, Poland (June 2026). Representing Taiwan's AI innovation globally.
            </p>
          </div>
        </div>
      </div>

      {/* Collaborations */}
      <div id="collaborations" className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover-glow reveal-element from-left">
        <div className="border-b border-gray-800 p-4 bg-gray-950 flex justify-between items-center">
          <h2 className="font-bold text-cyan-400 flex items-center">
            <i className="fas fa-handshake mr-2"></i> COLLABORATIONS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 stagger-children">
          {/* Collaboration 1 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 collab-card collab-cyan">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center mr-3 collab-icon">
                <i className="fas fa-building text-cyan-400"></i>
              </div>
              <div>
                <h3 className="font-bold">FUTURE DATA SYSTEMS</h3>
                <p className="text-xs text-gray-500">Taipei, Taiwan</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-2">
              <strong>About:</strong> A Taiwan Based Bespoke AI startup focus on introducing AI in Agriculture in Taiwan
            </p>
            <p className="text-xs text-gray-400 mb-2">
              <strong>My Contribution:</strong> Part of the pioneer team as an AI engineer with focus on research and POC planning for AI analysis with focus on crop yield prediction.
            </p>
            <a href="https://www.futuredatasystems.ai/" target="_blank" className="text-xs text-cyan-400 hover:underline">Visit Website</a>
          </div>

          {/* Collaboration 2 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 collab-card collab-orange">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-orange-900 rounded-full flex items-center justify-center mr-3 collab-icon">
                <i className="fas fa-building text-orange-400"></i>
              </div>
              <div>
                <h3 className="font-bold">MOBILITYZ</h3>
                <p className="text-xs text-gray-500">Houston, United States of America</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-2">
              <strong>About:</strong> MobilityZ Health is a digital health company specializing in musculoskeletal (MSK) injury management.
            </p>
            <p className="text-xs text-gray-400 mb-2">
              <strong>My Contribution:</strong> Led the AI development for a key model within a multi-level cascade, overseeing the entire process from research to deployment.
            </p>
            <a href="https://mobilityzhealth.com/" target="_blank" className="text-xs text-orange-400 hover:underline">Visit Website</a>
          </div>

          {/* Collaboration 3 */}
          <div className="bg-gray-950 p-4 rounded border border-gray-800 collab-card collab-green">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center mr-3 collab-icon">
                <i className="fas fa-university text-green-400"></i>
              </div>
              <div>
                <h3 className="font-bold">RESEARCH LAB (AI & MULTIMEDIA SYSTEMS)</h3>
                <p className="text-xs text-gray-500">NTUT, Taipei, Taiwan</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-2">
              <strong>About:</strong> A research lab at National Taipei University of Technology focusing on multimedia encoding with AI intervention.
            </p>
            <p className="text-xs text-gray-400 mb-2">
              <strong>My Contribution:</strong> Part of the research team as a research assistant to professor and vice president of the university Dr.Shih-Hsuan Yang.
            </p>
            <a href="https://www-en.ntut.edu.tw/p/404-1006-116494.php?Lang=en" target="_blank" className="text-xs text-green-400 hover:underline">Visit Website</a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact" className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover-glow reveal-element from-bottom">
        <div className="border-b border-gray-800 p-4 bg-gray-950 flex justify-between items-center">
          <h2 className="font-bold text-red-400 flex items-center">
            <i className="fas fa-envelope mr-2"></i> CONTACT
          </h2>
          <div className="text-xs flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-1 pulsing-border"></div>
            <span className="text-red-400">SECURE TRANSMISSION</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-red-400 mb-4">CONTACT INFORMATION</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center mr-3 contact-icon">
                  <i className="fas fa-envelope text-red-400"></i>
                </div>
                <div>
                  <p className="text-sm font-bold">Email</p>
                  <table className="text-xs text-gray-400">
                    <tbody>
                      <tr>
                        <td className="pr-2">Personal:</td>
                        <td><a href="mailto:ajishpradeep@gmail.com" className="hover:text-red-400 contact-link">ajishpradeep@gmail.com</a></td>
                      </tr>
                      <tr>
                        <td className="pr-2">Business:</td>
                        <td><a href="mailto:ajish@quintet-ai.com" className="hover:text-red-400 contact-link">ajish@quintet-ai.com</a></td>
                      </tr>
                      <tr>
                        <td className="pr-2">Freelance:</td>
                        <td><a href="mailto:ajish@futuredatasystems.ai" className="hover:text-red-400 contact-link">ajish@futuredatasystems.ai</a></td>
                      </tr>
                      <tr>
                        <td className="pr-2">Work:</td>
                        <td><a href="mailto:ajish@pic.net.tw" className="hover:text-red-400 contact-link">ajish@pic.net.tw</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-900 rounded-full flex items-center justify-center mr-3 contact-icon">
                  <i className="fas fa-phone text-yellow-400"></i>
                </div>
                <div>
                  <p className="text-sm font-bold">Phone</p>
                  <p className="text-xs text-gray-400">
                    <a href="tel:+886905174662" className="hover:text-yellow-400 contact-link">+886 905 174 662</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center mr-3 contact-icon">
                  <i className="fas fa-map-marker-alt text-cyan-400"></i>
                </div>
                <div>
                  <p className="text-sm font-bold">Location</p>
                  <p className="text-xs text-gray-400">Taipei City, Taiwan</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm font-bold text-cyan-400 mb-3">SOCIAL LINKS</p>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/ajishpradeep/" target="_blank" className="social-icon-sidebar linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/Ajishpradeep/" target="_blank" className="social-icon-sidebar github">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://line.me/ti/p/Ubq5KJIQTv" target="_blank" className="social-icon-sidebar line">
                    <i className="fab fa-line"></i>
                  </a>
                  <a href="https://instagram.com/ajishpradeep" target="_blank" className="social-icon-sidebar instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-bold text-red-400 mb-4">SEND MESSAGE</h3>
            <form name="contact" method="POST" encType="multipart/form-data" data-netlify="true" className="space-y-4 contact-form">
              <div>
                <input type="text" name="fullname" placeholder="* FULL NAME" required className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-300 focus:outline-none focus:border-red-500 transition-all form-input" />
              </div>

              <div>
                <input type="email" name="email" placeholder="* EMAIL ADDRESS" required className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-300 focus:outline-none focus:border-red-500 transition-all form-input" />
              </div>

              <div>
                <textarea name="message" placeholder="* YOUR MESSAGE" required className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-300 focus:outline-none focus:border-red-500 transition-all h-32 form-input"></textarea>
              </div>

              <div>
                <input type="file" name="file" className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-300 focus:outline-none focus:border-red-500 transition-all form-input" />
              </div>

              <div>
                <button type="submit" className="bg-gradient-to-r from-red-900 to-orange-800 hover:from-red-800 hover:to-orange-700 text-red-400 py-2 px-4 rounded flex items-center transition-all hover:scale-105 form-submit">
                  <i className="fas fa-paper-plane mr-2"></i> SEND MESSAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;