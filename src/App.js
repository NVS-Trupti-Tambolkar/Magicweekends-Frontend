import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/dashboard/Home';
import TravelDetailPage from './components/dashboard/TravelDetailPage';
import MyBookings from './components/booking/MyBookings';

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel/:id" element={<TravelDetailPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;