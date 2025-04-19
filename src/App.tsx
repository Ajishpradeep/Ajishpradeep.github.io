import React from 'react';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Navbar from './components/Navbar';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-16">
        <Header />
        <MobileMenu />
        <main className="container mx-auto px-4 py-8">
          {/* Your main content sections here */}
          <section id="about" className="min-h-screen py-20">
            {/* About section content */}
          </section>
          <section id="skills" className="min-h-screen py-20">
            {/* Skills section content */}
          </section>
          <section id="experience" className="min-h-screen py-20">
            {/* Experience section content */}
          </section>
          <section id="portfolio" className="min-h-screen py-20">
            {/* Portfolio section content */}
          </section>
          <section id="contact" className="min-h-screen py-20">
            {/* Contact section content */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;