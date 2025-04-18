import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-gray-800 pt-4 text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <span>AJISH PRADEEP PORTFOLIO v1.0</span>
        <span className="mx-2">|</span>
        <span>AI ENGINEER & RESEARCHER</span>
        <span className="mx-2">|</span>
        <span>LAST UPDATE: <span className="text-cyan-400">APRIL 2025</span></span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-green-500 mr-2 pulse-element"></div>
        <span>ONLINE</span>
        <span className="mx-2">|</span>
        <span id="status-message" className="blink text-yellow-400">READY FOR OPPORTUNITIES</span>
      </div>
    </footer>
  );
};

export default Footer;