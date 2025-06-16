import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MemoryProvider } from './context/MemoryContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Memories from './pages/Memories';
import Gallery from './pages/Gallery';
import AboutUs from './pages/AboutUs';
import Calendar from './pages/Calendar';
import Chatbot from './pages/Chatbot';
import Map from './pages/Map';

function App() {
  return (
    <MemoryProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/memories" element={<Memories />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MemoryProvider>
  );
}

export default App;
