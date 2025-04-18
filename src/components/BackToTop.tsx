import React from 'react';

const BackToTop: React.FC = () => {
  return (
    <button id="back-to-top" className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-900 to-green-900 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 transition-all hover:from-cyan-800 hover:to-green-800">
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default BackToTop;