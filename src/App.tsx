import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import MobileNav from './components/MobileNav';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import { initScrollAnimations, initLoadAnimations, initBackToTop, initMobileMenu, initSkillFiltering, initPortfolioFiltering, initSmoothScrolling } from './utils/animations';
import './App.css';
import './index.css';

function App() {
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
    <Router>
      <div className="text-gray-200 bg-black">
        {/* Subtle AI Background */}
        <div className="ai-background fixed top-0 left-0 w-full h-full -z-10"></div>
        
        {/* Mobile Navigation Menu */}
        <MobileMenu />
        
        <div className="container mx-auto px-3 md:px-4 py-6 mt-16 md:mt-6 max-w-full md:max-w-screen-xl">
          {/* Header - Hidden on mobile */}
          <Header />
          
          {/* Main Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar - Sticky */}
            <Sidebar />
            
            {/* Main Content */}
            <MainContent />
          </div>
          
          {/* Footer */}
          <Footer />
        </div>
        
        {/* Mobile Bottom Navigation */}
        <MobileNav />
        
        {/* Back to top button */}
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;