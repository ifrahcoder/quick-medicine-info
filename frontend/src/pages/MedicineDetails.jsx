import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Pill, ShieldAlert, AlertTriangle, Activity, Printer } from 'lucide-react';

export default function MedicineDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/medicine-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ medicineName: name }),
        });

        const data = await response.json();
        if (response.ok) {
          setMedicine(data);
          saveToHistory(data);
          checkIfFavorite(data.name);
        } else {
          setError(data.detail || 'Failed to fetch medicine details.');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Server connection error.');
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchMedicineDetails();
    }
  }, [name]);

  const saveToHistory = (medData) => {
    try {
      const history = JSON.parse(localStorage.getItem('medicine_history')) || [];
      const filtered = history.filter(item => item.name.toLowerCase() !== medData.name.toLowerCase());
      
      const newItem = {
        name: medData.name,
        category: medData.category || medData.subtitle || 'General Medicine',
        strength: medData.strength || 'Standard',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      
      localStorage.setItem('medicine_history', JSON.stringify([newItem, ...filtered]));
    } catch (err) {
      console.error('History save error:', err);
    }
  };

  const checkIfFavorite = (medName) => {
    try {
      const favorites = JSON.parse(localStorage.getItem('medicine_favorites')) || [];
      const exists = favorites.some(item => item.name.toLowerCase() === medName.toLowerCase());
      setIsFavorite(exists);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = () => {
    if (!medicine) return;
    try {
      let favorites = JSON.parse(localStorage.getItem('medicine_favorites')) || [];
      
      if (isFavorite) {
        favorites = favorites.filter(item => item.name.toLowerCase() !== medicine.name.toLowerCase());
        setIsFavorite(false);
      } else {
        const favItem = {
          name: medicine.name,
          category: medicine.category || medicine.subtitle || 'General Medicine'
        };
        favorites.push(favItem);
        setIsFavorite(true);
      }
      localStorage.setItem('medicine_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Favorite toggle error:', err);
    }
  };

  // Print / PDF Handler function
  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="p-10 text-center text-emerald-600 font-bold">Loading medicine details...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-[85vh] bg-[#F4FBF7] px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Actions: Back, Print & Favorite Toggle */}
        <div className="flex justify-between items-center print:hidden">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <div className="flex items-center gap-3">
            {/* Print / PDF Button */}
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white text-gray-700 border border-emerald-200 hover:bg-emerald-50 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition"
            >
              <Printer className="w-4 h-4 text-emerald-600" /> Save PDF / Print
            </button>

            {/* Favorite Toggle Button */}
            <button 
              onClick={toggleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition ${isFavorite ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-white text-gray-700 border border-emerald-200 hover:bg-emerald-50'}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} /> 
              {isFavorite ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Medicine Main Card */}
        {medicine && (
          <div className="bg-white border border-emerald-100 rounded-3xl p-8 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {medicine.category}
              </span>
              <h1 className="text-3xl font-black text-gray-900 mt-2">{medicine.name}</h1>
              <p className="text-gray-500 text-sm">{medicine.subtitle}</p>
            </div>

            {/* Common Uses */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" /> Common Uses
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {medicine.uses?.map((use, idx) => <li key={idx}>{use}</li>)}
              </ul>
            </div>

            {/* How It Works */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-800">How It Works</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{medicine.howItWorks}</p>
            </div>

            {/* Side Effects */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Side Effects
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {medicine.sideEffects?.map((effect, idx) => <li key={idx}>{effect}</li>)}
              </ul>
            </div>

            {/* Precautions */}
            <div className="space-y-2">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500" /> Precautions
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {medicine.precautions?.map((prec, idx) => <li key={idx}>{prec}</li>)}
              </ul>
            </div>

            {/* General Info Footer */}
            <div className="border-t pt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-gray-500">
              <div><strong>Forms:</strong> {medicine.forms}</div>
              <div><strong>Strength:</strong> {medicine.strength}</div>
              <div><strong>Manufacturer:</strong> {medicine.manufacturer}</div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}