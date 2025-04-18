import React from 'react';

const MobileMenu: React.FC = () => {
  return (
    <div>
      {/* Navigation Menu for Mobile */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-cyan-800 md:hidden">
        <div className="container mx-auto px-3 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-base font-bold text-cyan-400">AJISH PRADEEP</h1>
            <button id="mobile-menu-toggle" className="mobile-menu-btn flex items-center justify-center rounded-lg">
              <i className="fas fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div id="mobile-menu" className="hidden fixed top-14 left-0 right-0 z-50 md:hidden">
        <div className="container mx-auto px-3">
          <div className="bg-gray-800 rounded-lg border border-cyan-800 p-3 shadow-glow">
            <a href="#about" className="mobile-menu-link flex items-center p-2 rounded hover:bg-gray-700">
              <i className="fas fa-user w-6 text-cyan-400"></i>
              <span className="text-sm">About Me</span>
            </a>
            <a href="#skills" className="mobile-menu-link flex items-center p-2 rounded hover:bg-gray-700">
              <i className="fas fa-code w-6 text-green-400"></i>
              <span className="text-sm">Skills</span>
            </a>
            <a href="#experience" className="mobile-menu-link flex items-center p-2 rounded hover:bg-gray-700">
              <i className="fas fa-briefcase w-6 text-orange-400"></i>
              <span className="text-sm">Experience</span>
            </a>
            <a href="#education" className="mobile-menu-link flex items-center p-2 rounded hover:bg-gray-700">
              <i className="fas fa-graduation-cap w-6 text-green-400"></i>
              <span className="text-sm">Education</span>
            </a>
            <a href="#portfolio" className="mobile-menu-link flex items-center p-2 rounded hover:bg-gray-700">
              <i className="fas fa-project-diagram w-6 text-yellow-400"></i>
              <span className="text-sm">Portfolio</span>
            </a>
            <a href="#contact" className="mobile-menu-link flex items-center p-2 rounded hover:bg-gray-700">
              <i className="fas fa-envelope w-6 text-red-400"></i>
              <span className="text-sm">Contact</span>
            </a>
            <div className="mt-3 pt-3 border-t border-gray-700 flex justify-center">
              <a href="Resume.pdf" download className="mobile-download-btn">
                <i className="fas fa-download mr-2"></i> DOWNLOAD CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;