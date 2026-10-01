import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Info, Clock } from 'lucide-react';
import heroImg from '../assets/Screenshot (1).png';

export default function Home() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  // Component load hone par localStorage se recent history read karna
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('medicine_history')) || [];
      // Sirf top 5 recent items dikhane ke liye
      setRecentSearches(saved.slice(0, 5));
    } catch (err) {
      console.error('Error reading history:', err);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/medicine/${encodeURIComponent(query.trim())}`);
    }
  };

  const popularMedicines = ['Paracetamol', 'Ibuprofen', 'Cetirizine', 'Omeprazole', 'Amoxicillin'];

  return (
    <div className="min-h-[85vh] bg-[#F4FBF7] px-6 py-6 flex flex-col justify-between">
      
      <div className="max-w-7xl mx-auto w-full bg-[#EBF9F1] border border-emerald-100 rounded-[2.5rem] p-8 md:p-14 shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center gap-12 my-auto">
        
        <div className="lg:col-span-7 space-y-6">
          <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest bg-white/90 border border-emerald-200/60 inline-block px-4 py-1.5 rounded-lg shadow-sm">
            Your Health, Our Priority
          </p>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
            Understand Your <br />
            Medicine, <span className="text-emerald-600">Simply.</span>
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg max-w-lg font-normal leading-relaxed">
            Search a medicine and get clear, easy-to-understand general information in seconds.
          </p>

          <form onSubmit={handleSearch} className="relative flex items-center shadow-lg shadow-emerald-900/5 rounded-2xl overflow-hidden bg-white border border-emerald-200 max-w-xl">
            <span className="pl-4 text-gray-400">
              <Search className="w-5 h-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medicine name..."
              className="w-full py-4 px-3 text-gray-800 placeholder-gray-400 focus:outline-none text-sm md:text-base font-medium"
            />
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 font-semibold transition m-1 rounded-xl shadow-sm">
              Search
            </button>
          </form>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">Popular Medicines:</span>
            {popularMedicines.map((med) => (
              <button
                key={med}
                onClick={() => navigate(`/medicine/${med}`)}
                className="bg-white border border-gray-200 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 shadow-sm transition"
              >
                {med}
              </button>
            ))}
          </div>

          {/* Dynamic Recent Searches from localStorage */}
          {recentSearches.length > 0 && (
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Recent:
              </span>
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/medicine/${item.name}`)}
                  className="bg-white border border-emerald-200 px-3 py-1 rounded-lg text-xs font-medium text-emerald-800 hover:bg-emerald-50 shadow-sm transition"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md flex items-center justify-center p-4">
            <img 
              src={heroImg} 
              alt="Medicine Illustration" 
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto w-full pt-4">
        <div className="bg-white border border-emerald-100 rounded-2xl p-4 md:px-6 flex items-center gap-3.5 text-gray-700 text-xs md:text-sm shadow-sm">
          <div className="bg-emerald-100 text-emerald-700 p-2 rounded-xl shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <p>
            For general educational information only. Always follow the medicine label and consult a healthcare professional when needed.
          </p>
        </div>
      </div>

    </div>
  );
}