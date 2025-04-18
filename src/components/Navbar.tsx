import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { memo } from 'react';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Navbar = ({ isDarkMode, setIsDarkMode }: NavbarProps) => {
  return (
    <nav 
      className="h-full bg-gray-900 flex flex-col"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="p-6">
        <Link 
          to="/" 
          className="text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded block mb-8"
          aria-label="Home"
        >
          Portfolio
        </Link>
        
        <div className="flex flex-col space-y-6">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded transition-colors"
            aria-current="page"
          >
            Home
          </Link>
          <Link 
            to="/projects" 
            className="text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded transition-colors"
          >
            Projects
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-300 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>

      <div className="mt-auto p-6">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-400 w-5 h-5" aria-hidden="true" />
          ) : (
            <FaMoon className="text-gray-300 w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default memo(Navbar); 