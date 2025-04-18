import React from 'react';

const MobileNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 z-50 md:hidden mobile-nav">
      <div className="flex justify-around">
        <a href="#about" className="flex flex-col items-center text-xs p-1">
          <i className="fas fa-user text-cyan-400"></i>
          <span>About</span>
        </a>
        <a href="#skills" className="flex flex-col items-center text-xs p-1">
          <i className="fas fa-code text-green-400"></i>
          <span>Skills</span>
        </a>
        <a href="#experience" className="flex flex-col items-center text-xs p-1">
          <i className="fas fa-briefcase text-orange-400"></i>
          <span>Work</span>
        </a>
        <a href="#portfolio" className="flex flex-col items-center text-xs p-1">
          <i className="fas fa-project-diagram text-yellow-400"></i>
          <span>Projects</span>
        </a>
        <a href="#contact" className="flex flex-col items-center text-xs p-1">
          <i className="fas fa-envelope text-red-400"></i>
          <span>Contact</span>
        </a>
      </div>
    </div>
  );
};

export default MobileNav;