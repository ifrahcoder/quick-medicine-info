import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/medicine/${encodeURIComponent(query.trim())}`);
    }
  };

  const popularMedicines = ['Paracetamol', 'Ibuprofen', 'Cetirizine', 'Omeprazole', 'Amoxicillin'];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative flex items-center shadow-sm rounded-2xl overflow-hidden bg-white border border-gray-200 focus-within:border-emerald-500 transition">
        <span className="pl-4 text-gray-400">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicine name..."
          className="w-full py-4 px-3 text-gray-800 placeholder-gray-400 focus:outline-none text-sm md:text-base"
        />
        <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 font-medium transition flex items-center gap-2">
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-gray-500 font-medium mr-1">Popular:</span>
        {popularMedicines.map((med) => (
          <button
            key={med}
            onClick={() => navigate(`/medicine/${med}`)}
            className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 transition"
          >
            {med}
          </button>
        ))}
      </div>
    </div>
  );
}