import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
        {/* Side Panel */}
        <aside className="w-64 bg-gray-900 flex-shrink-0">
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 relative">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="min-h-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;