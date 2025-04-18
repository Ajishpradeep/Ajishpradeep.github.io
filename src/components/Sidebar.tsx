import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="lg:col-span-2 space-y-6 hidden md:block">
      <div className="sticky top-6 sidebar-container">
        {/* User Profile */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 hover-glow slide-in-left mb-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-18 overflow-hidden mb-4 profile-pic-container p-1 rounded-lg">
              <img src="/profile_pic.png" alt="Ajish Pradeep" className="w-full h-full object-cover rounded-lg" />
            </div>
            <h3 className="font-bold text-lg mb-1">Ajish Pradeep</h3>
            <p className="text-xs text-gray-400 mb-3">AI ENGINEER & RESEARCHER</p>
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-green-400">AVAILABLE FOR WORK</span>
            </div>
            <div className="w-full h-px bg-gray-800 my-3"></div>
            <div className="text-xs text-gray-400 mb-3">
              <div className="flex items-center mb-2">
                <i className="fas fa-map-marker-alt text-cyan-400 w-5"></i>
                <span>Taipei, Taiwan</span>
              </div>
              <div className="flex items-center mb-2">
                <i className="fas fa-envelope text-cyan-400 w-5"></i>
                <a href="mailto:ajishpradeep@gmail.com" className="hover:text-cyan-400">ajishpradeep@gmail.com</a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-cyan-400 w-5"></i>
                <a href="tel:+886905174662" className="hover:text-cyan-400">+886 905 174 662</a>
              </div>
            </div>
            <div className="w-full h-px bg-gray-800 my-3"></div>
            <div className="flex justify-center space-x-2 mb-3">
              <a href="https://www.linkedin.com/in/ajishpradeep/" target="_blank" className="social-icon-sidebar linkedin">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/Ajishpradeep/" target="_blank" className="social-icon-sidebar github">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://line.me/ti/p/Ubq5KJIQTv" target="_blank" className="social-icon-sidebar line">
                <i className="fab fa-line"></i>
              </a>
              <a href="mailto:ajishpradeep@gmail.com" className="social-icon-sidebar email">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="tel:+886905174662" className="social-icon-sidebar phone">
                <i className="fas fa-phone"></i>
              </a>
            </div>
            <a href="Resume.pdf" download className="resume-download-btn w-full text-center">
              <i className="fas fa-download"></i> DOWNLOAD RESUME
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 hover-glow slide-in-left">
          <h3 className="font-bold text-cyan-400 mb-3 flex items-center">
            <i className="fas fa-bolt mr-2"></i> QUICK LINKS
          </h3>
          <div className="space-y-2">
            <a href="#about" className="flex items-center text-sm p-2 bg-gray-800 hover:bg-cyan-900 rounded transition-all">
              <i className="fas fa-user text-cyan-400 mr-2 w-5"></i> About Me
            </a>
            <a href="#skills" className="flex items-center text-sm p-2 bg-gray-800 hover:bg-green-900 rounded transition-all">
              <i className="fas fa-code text-green-400 mr-2 w-5"></i> Skills
            </a>
            <a href="#experience" className="flex items-center text-sm p-2 bg-gray-800 hover:bg-orange-900 rounded transition-all">
              <i className="fas fa-briefcase text-orange-400 mr-2 w-5"></i> Experience
            </a>
            <a href="#portfolio" className="flex items-center text-sm p-2 bg-gray-800 hover:bg-yellow-900 rounded transition-all">
              <i className="fas fa-project-diagram text-yellow-400 mr-2 w-5"></i> Portfolio
            </a>
            <a href="#contact" className="flex items-center text-sm p-2 bg-gray-800 hover:bg-red-900 rounded transition-all">
              <i className="fas fa-envelope text-red-400 mr-2 w-5"></i> Contact
            </a>
          </div>

          {/* Expertise Section (in Sidebar) */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <h3 className="font-bold text-green-400 mb-3 flex items-center">
              <i className="fas fa-chart-line mr-2"></i> EXPERTISE
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="expertise-tile bg-gray-800 p-2 rounded flex items-center">
                <i className="fas fa-eye text-cyan-400 mr-2"></i>
                <span className="text-xs">Vision AI</span>
              </div>
              <div className="expertise-tile bg-gray-800 p-2 rounded flex items-center">
                <i className="fas fa-brain text-green-400 mr-2"></i>
                <span className="text-xs">Generative AI</span>
              </div>
              <div className="expertise-tile bg-gray-800 p-2 rounded flex items-center">
                <i className="fas fa-microchip text-orange-400 mr-2"></i>
                <span className="text-xs">LLM Optimization</span>
              </div>
              <div className="expertise-tile bg-gray-800 p-2 rounded flex items-center">
                <i className="fas fa-server text-yellow-400 mr-2"></i>
                <span className="text-xs">Edge Deployment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;