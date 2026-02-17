import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/dashboard/Home';
import TravelDetailPage from './components/dashboard/TravelDetailPage';

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel/:id" element={<TravelDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;