import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale, Activity, AlertTriangle, ShieldAlert, CheckCircle2, Search } from 'lucide-react';

export default function MedicineCompare() {
  const navigate = useNavigate();
  const [med1Name, setMed1Name] = useState('Paracetamol');
  const [med2Name, setMed2Name] = useState('Ibuprofen');
  
  const [med1Data, setMed1Data] = useState(null);
  const [med2Data, setMed2Data] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Backend se dono medicines ka data fetch karne ka function
  const handleCompare = async (e) => {
    e.preventDefault();
    if (!med1Name.trim() || !med2Name.trim()) {
      alert('Please enter both medicine names to compare.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Parallel requests dono medicines ke liye
      const [res1, res2] = await Promise.all([
        fetch('http://localhost:5000/api/medicine-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ medicineName: med1Name.trim() }),
        }),
        fetch('http://localhost:5000/api/medicine-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ medicineName: med2Name.trim() }),
        })
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      if (res1.ok && res2.ok) {
        setMed1Data(data1);
        setMed2Data(data2);
      } else {
        setError(data1.detail || data2.detail || 'Failed to fetch details for comparison. Check spelling.');
      }
    } catch (err) {
      console.error('Comparison Error:', err);
      setError('Server connection error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F4FBF7] px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Back & Header */}
        <div className="flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Advanced Tool
          </span>
        </div>

        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Scale className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Medicine Comparison Tool
          </h1>
          <p className="text-gray-600 text-sm">
            Compare two different medicines side-by-side to understand their uses, side effects, and active properties.
          </p>
        </div>

        {/* Input Form Box */}
        <form onSubmit={handleCompare} className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">First Medicine</label>
            <input
              type="text"
              value={med1Name}
              onChange={(e) => setMed1Name(e.target.value)}
              placeholder="e.g. Paracetamol"
              className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:outline-none text-sm font-medium"
              required
            />
          </div>

          <div className="hidden md:flex md:col-span-1 justify-center pt-5">
            <span className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center border border-emerald-100 text-xs shadow-sm">
              VS
            </span>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Second Medicine</label>
            <input
              type="text"
              value={med2Name}
              onChange={(e) => setMed2Name(e.target.value)}
              placeholder="e.g. Ibuprofen"
              className="w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:outline-none text-sm font-medium"
              required
            />
          </div>

          <div className="md:col-span-5 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-sm"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Comparing Medicines...' : 'Compare Side-by-Side'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl text-center text-sm font-medium">
            {error}
          </div>
        )}

        {/* Side-by-Side Comparison Results */}
        {med1Data && med2Data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            
            {/* Medicine 1 Card */}
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  {med1Data.category || 'Medicine A'}
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-2">{med1Data.name}</h2>
                <p className="text-gray-500 text-xs">{med1Data.subtitle}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-600" /> Common Uses
                </h4>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                  {med1Data.uses?.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">How It Works</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{med1Data.howItWorks}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Side Effects
                </h4>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                  {med1Data.sideEffects?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="border-t pt-4 grid grid-cols-2 gap-2 text-[11px] text-gray-500">
                <div><strong>Strength:</strong> {med1Data.strength}</div>
                <div><strong>Forms:</strong> {med1Data.forms}</div>
              </div>
            </div>

            {/* Medicine 2 Card */}
            <div className="bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  {med2Data.category || 'Medicine B'}
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-2">{med2Data.name}</h2>
                <p className="text-gray-500 text-xs">{med2Data.subtitle}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-600" /> Common Uses
                </h4>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                  {med2Data.uses?.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">How It Works</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{med2Data.howItWorks}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Side Effects
                </h4>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                  {med2Data.sideEffects?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="border-t pt-4 grid grid-cols-2 gap-2 text-[11px] text-gray-500">
                <div><strong>Strength:</strong> {med2Data.strength}</div>
                <div><strong>Forms:</strong> {med2Data.forms}</div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}