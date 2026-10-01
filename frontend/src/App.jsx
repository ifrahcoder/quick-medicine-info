import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import MedicineDetails from './pages/MedicineDetails';
import Favorites from './pages/Favorites';
import History from './pages/History';
import EmergencyContacts from './components/EmergencyContacts';
import MedicineCompare from './pages/MedicineCompare'; // <--- Import here
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F4FBF7] flex flex-col justify-between">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/medicine/:name" element={<MedicineDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/emergencies" element={<EmergencyContacts />} />
            <Route path="/compare" element={<MedicineCompare />} /> {/* <--- Route here */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}