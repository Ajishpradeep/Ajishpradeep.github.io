import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="hidden md:block bg-gray-900 border-b border-cyan-800 py-2 mb-6 slide-in-top">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6">
          <a href="#about" className="nav-link flex items-center text-sm p-2 hover:bg-cyan-900 rounded transition-all">
            <i className="fas fa-user text-cyan-400 mr-2 w-5"></i> About Me
          </a>
          <a href="#skills" className="nav-link flex items-center text-sm p-2 hover:bg-green-900 rounded transition-all">
            <i className="fas fa-code text-green-400 mr-2 w-5"></i> Skills
          </a>
          <a href="#experience" className="nav-link flex items-center text-sm p-2 hover:bg-orange-900 rounded transition-all">
            <i className="fas fa-briefcase text-orange-400 mr-2 w-5"></i> Experience
          </a>
          <a href="#portfolio" className="nav-link flex items-center text-sm p-2 hover:bg-yellow-900 rounded transition-all">
            <i className="fas fa-project-diagram text-yellow-400 mr-2 w-5"></i> Portfolio
          </a>
          <a href="#contact" className="nav-link flex items-center text-sm p-2 hover:bg-red-900 rounded transition-all">
            <i className="fas fa-envelope text-red-400 mr-2 w-5"></i> Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 