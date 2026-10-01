import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ChevronRight, Clock, Pill } from 'lucide-react';

export default function History() {
  const navigate = useNavigate();
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('medicine_history')) || [];
      setHistoryItems(savedHistory);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  }, []);

  const handleClearHistory = () => {
    try {
      setHistoryItems([]);
      localStorage.removeItem('medicine_history');
    } catch (err) {
      console.error('Error clearing history:', err);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F4FBF7] px-6 py-10 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-6 my-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Your Search History
            </h1>
            <p className="text-gray-600 text-xs md:text-sm pt-1">
              View the medicines you've recently searched for.
            </p>
          </div>
          
          {historyItems.length > 0 && (
            <button 
              onClick={handleClearHistory}
              className="flex items-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition w-fit"
            >
              <Trash2 className="w-4 h-4" /> Clear History
            </button>
          )}
        </div>

        <div className="space-y-3">
          {historyItems.length > 0 ? (
            historyItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white border border-emerald-100 rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-sm hover:shadow-md transition gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{item.category || item.subtitle || 'General Medicine'}</p>
                    <p className="text-[11px] text-gray-400 font-normal pt-0.5">{item.strength ? `Strength: ${item.strength}` : ''}</p>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/medicine/${item.name}`)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5 shrink-0"
                >
                  View Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white border border-emerald-100 rounded-3xl p-12 text-center space-y-3 shadow-sm">
              <Clock className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-gray-600 text-sm font-medium">Your search history is empty.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}