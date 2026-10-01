import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChevronRight, Pill } from 'lucide-react';

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem('medicine_favorites')) || [];
      setFavorites(savedFavorites);
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  }, []);

  const handleRemove = (medicineName) => {
    try {
      const updated = favorites.filter(item => item.name.toLowerCase() !== medicineName.toLowerCase());
      setFavorites(updated);
      localStorage.setItem('medicine_favorites', JSON.stringify(updated));
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F4FBF7] px-6 py-10 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full space-y-8 my-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Your Favorites
            </h1>
            <p className="text-gray-600 text-xs md:text-sm pt-1">
              Quick access to the medicines you save for later.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.length > 0 ? (
            favorites.map((med, index) => (
              <div 
                key={index}
                className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                      <Pill className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{med.name}</h3>
                      <p className="text-xs text-gray-500 font-medium pt-0.5">{med.category || 'General Medicine'}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleRemove(med.name)}
                    className="text-red-500 p-1 hover:bg-red-50 rounded-full transition"
                    title="Remove from favorites"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                <button 
                  onClick={() => navigate(`/medicine/${med.name}`)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-xs font-semibold shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white border border-emerald-100 rounded-3xl p-12 text-center space-y-3 shadow-sm">
              <Heart className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-gray-600 text-sm font-medium">No favorite medicines saved yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}