import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Clock, Pill } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  // Popular medicines list jo suggestions ke liye use hogi
  const allMedicines = [
    'Paracetamol', 'Ibuprofen', 'Cetirizine', 'Omeprazole', 
    'Amoxicillin', 'Aspirin', 'Azithromycin', 'Metformin', 
    'Amlodipine', 'Pantoprazole', 'Diclofenac', 'Vitamin D3'
  ];

  // Component load hone par localStorage se real history load karna
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('medicine_history')) || [];
      setRecentSearches(saved.slice(0, 5));
    } catch (err) {
      console.error('Error loading recent searches:', err);
    }
  }, []);

  // Jab user input kare toh suggestions filter hon
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      const filtered = allMedicines.filter(med => 
        med.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSuggestions([]);
      navigate(`/medicine/${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectSuggestion = (medName) => {
    setQuery(medName);
    setSuggestions([]);
    navigate(`/medicine/${encodeURIComponent(medName)}`);
  };

  return (
    <div className="min-h-[85vh] bg-[#F4FBF7] px-6 py-10 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-10 my-auto">
        
        {/* Top Search Header & Box */}
        <div className="text-center space-y-4 max-w-2xl mx-auto relative">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Search Medicine
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Enter the name of the medicine you want to know about.
          </p>

          <div className="relative">
            <form onSubmit={handleSearch} className="relative flex items-center shadow-md rounded-2xl overflow-hidden bg-white border border-emerald-200 mt-4 z-10">
              <span className="pl-4 text-gray-400">
                <Search className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="e.g. Paracetamol, Ibuprofen, Cetirizine..."
                className="w-full py-4 px-3 text-gray-800 placeholder-gray-400 focus:outline-none text-sm font-medium"
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-4 font-semibold transition m-1 rounded-xl shadow-sm">
                Search
              </button>
            </form>

            {/* Auto-suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-emerald-100 rounded-2xl shadow-xl overflow-hidden z-20 text-left">
                {suggestions.map((med, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectSuggestion(med)}
                    className="px-5 py-3 hover:bg-emerald-50 text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-none transition"
                  >
                    <Pill className="w-4 h-4 text-emerald-600" />
                    {med}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Popular Searches Chips */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">Popular Searches:</span>
            {allMedicines.slice(0, 5).map((med) => (
              <button
                key={med}
                onClick={() => navigate(`/medicine/${med}`)}
                className="bg-white border border-gray-200 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 shadow-sm transition"
              >
                {med}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Two Cards Grid: Quick Tips & Recent Searches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Quick Tips Card */}
          <div className="bg-[#EBF9F1] border border-emerald-100 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-800 font-bold text-lg">
              <div className="p-2 bg-emerald-200/60 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
              </div>
              Quick Tips
            </div>
            <ul className="space-y-3.5 text-xs md:text-sm text-gray-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">&check;</span> Search by brand name or generic name (e.g. Paracetamol).
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">&check;</span> Make sure the spelling is correct.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">&check;</span> If you don't find the medicine, try the active ingredient name.
              </li>
            </ul>
          </div>

          {/* Recent Searches Card */}
          <div className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-3 text-gray-900 font-bold text-lg">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              Recent Searches
            </div>
            
            <div className="space-y-3">
              {recentSearches.length > 0 ? (
                recentSearches.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => navigate(`/medicine/${item.name}`)}
                    className="flex items-center justify-between p-2.5 hover:bg-emerald-50/60 rounded-xl cursor-pointer transition border border-transparent hover:border-emerald-100"
                  >
                    <div className="flex items-center gap-3 text-xs md:text-sm text-gray-800 font-medium">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {item.name}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic py-4 text-center">No recent searches yet.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}