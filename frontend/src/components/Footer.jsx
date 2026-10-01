import React from 'react';
import { Pill, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white p-2 rounded-xl">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Quick Medicine Info</h3>
            <p className="text-xs text-slate-400">Simple health information for everyday medicine questions.</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-300">
          <a href="#" className="hover:text-emerald-400">Home</a>
          <a href="#" className="hover:text-emerald-400">Search</a>
          <a href="#" className="hover:text-emerald-400">History</a>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
          <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
          <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 text-center text-xs text-slate-500">
        <p>This website provides general educational information and does not replace professional medical advice, diagnosis, or treatment.</p>
      </div>
    </footer>
  );
}