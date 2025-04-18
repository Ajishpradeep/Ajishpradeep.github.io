import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="hidden md:flex flex-col md:flex-row justify-between items-center border-b border-cyan-600 pb-4 mb-8 slide-in-top">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="w-4 h-12 bg-gradient-to-b from-cyan-500 via-green-500 to-yellow-500 mr-3 pulse-element"></div>
        <div>
          <h1 className="text-2xl font-bold title-text">AJISH PRADEEP</h1>
          <p className="text-xs text-gray-400">AI ENGINEER & RESEARCHER</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 slide-in-right">
        <div className="flex items-center">
          <div className="signal-strength mr-2">
            <div className="signal-bar" style={{ left: 0, height: '5px' }}></div>
            <div className="signal-bar" style={{ left: '20px', height: '10px' }}></div>
            <div className="signal-bar filled" style={{ left: '40px', height: '15px' }}></div>
            <div className="signal-bar filled" style={{ left: '60px', height: '20px' }}></div>
            <div className="signal-bar filled" style={{ left: '80px', height: '20px' }}></div>
          </div>
          <span className="text-cyan-500 text-xs">PORTFOLIO: ACTIVE</span>
        </div>
        <span className="text-gray-500">|</span>
        <div className="text-xs">
          <span className="text-yellow-400">LOCATION: </span>
          <span className="text-cyan-400">TAIPEI, TAIWAN</span>
        </div>
        <span className="text-gray-500">|</span>
        <div className="text-xs">
          <span className="text-yellow-400">STATUS: </span>
          <span className="text-green-400">AVAILABLE</span>
        </div>
        <a href="#contact" className="bg-gradient-to-r from-cyan-900 to-green-900 hover:from-cyan-800 hover:to-green-800 text-xs px-3 py-1 rounded-md transition-all hover:scale-105">
          <i className="fas fa-paper-plane mr-1"></i> CONTACT
        </a>
      </div>
    </header>
  );
};

export default Header;