import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['about', 'skills', 'experience', 'portfolio', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', icon: 'fa-user', label: 'About', color: 'cyan' },
    { id: 'skills', icon: 'fa-code', label: 'Skills', color: 'green' },
    { id: 'experience', icon: 'fa-briefcase', label: 'Experience', color: 'orange' },
    { id: 'portfolio', icon: 'fa-project-diagram', label: 'Portfolio', color: 'yellow' },
    { id: 'contact', icon: 'fa-envelope', label: 'Contact', color: 'red' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 via-green-500 to-yellow-500 rounded-full animate-pulse"></div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-cyan-400">AJISH PRADEEP</h1>
              <p className="text-xs text-gray-400">AI ENGINEER & RESEARCHER</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? `bg-${item.color}-900/50 text-${item.color}-400`
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} text-${item.color}-400 group-hover:scale-110 transition-transform`}></i>
                <span className="text-sm font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-${item.color}-500 rounded-full`}></div>
                )}
              </a>
            ))}
          </div>

          {/* Contact Button */}
          <a
            href="#contact"
            className="hidden md:block bg-gradient-to-r from-cyan-900 to-green-900 hover:from-cyan-800 hover:to-green-800 text-xs px-4 py-2 rounded-lg transition-all hover:scale-105"
          >
            <i className="fas fa-paper-plane mr-2"></i> CONTACT
          </a>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 