import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 border-4 border-purple-500"
        />
        <h2 className="text-xl font-bold mb-2">John Doe</h2>
        <p className="text-gray-400 text-sm mb-4">Full Stack Developer</p>
        
        <div className="flex space-x-4 mb-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaLinkedin size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaTwitter size={24} />
          </a>
        </div>

        <div className="w-full">
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>React</span>
              <span className="text-gray-400">90%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>Node.js</span>
              <span className="text-gray-400">85%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            
            <div className="flex justify-between">
              <span>TypeScript</span>
              <span className="text-gray-400">80%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;