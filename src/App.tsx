import React, { useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import MobileNav from './components/MobileNav';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import { initScrollAnimations, initLoadAnimations, initBackToTop, initMobileMenu, initSkillFiltering, initPortfolioFiltering, initSmoothScrolling } from './utils/animations';
import './App.css';
import './index.css';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize all animations
    initScrollAnimations();
    initLoadAnimations();
    initBackToTop();
    initMobileMenu();
    initSkillFiltering();
    initPortfolioFiltering();
    initSmoothScrolling();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <Sidebar />
          </div>
          <div className="w-full md:w-3/4">
            <MainContent />
          </div>
        </div>
      </div>
      <Footer />
      <MobileMenu />
      <MobileNav />
      <BackToTop />
    </div>
  );
};

export default App;