import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pill, Heart, Clock, Search, PhoneCall, Scale, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Brand / Logo (Ab is par click karne se Home khulega) */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:bg-emerald-700 transition">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-black text-gray-900 tracking-tight leading-none">
              Quick Medicine Info
            </h1>
            <span className="text-xs font-semibold text-emerald-600 tracking-wide">
              Health Information
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <Link to="/" className="hover:text-emerald-600 transition">Home</Link>
          <Link to="/search" className="hover:text-emerald-600 transition">Search</Link>
          <Link to="/history" className="hover:text-emerald-600 transition">History</Link>
          <Link to="/favorites" className="hover:text-emerald-600 transition">Favorites</Link>
          <Link to="/emergencies" className="hover:text-emerald-600 transition flex items-center gap-1 text-red-600">
            <PhoneCall className="w-3.5 h-3.5" /> Emergency
          </Link>
          <Link to="/compare" className="hover:text-emerald-600 transition flex items-center gap-1 text-emerald-700">
            <Scale className="w-3.5 h-3.5" /> Compare
          </Link>
        </nav>

        {/* Right: Profile / User Icon with Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 hover:bg-emerald-100 transition shadow-sm"
            title="User Profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-emerald-100 rounded-2xl shadow-xl py-2 z-50 text-sm">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-bold text-gray-800">Ifrah Bashir</p>
                <p className="text-xs text-gray-400">Health User</p>
              </div>
              <Link 
                to="/favorites" 
                onClick={() => setShowProfileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 transition"
              >
                Saved Medicines
              </Link>
              <Link 
                to="/history" 
                onClick={() => setShowProfileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 transition"
              >
                Search History
              </Link>
              <Link 
                to="/compare" 
                onClick={() => setShowProfileMenu(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 transition"
              >
                Compare Tool
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}