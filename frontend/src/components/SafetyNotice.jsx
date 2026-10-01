import React from 'react';
import { Info } from 'lucide-react';

export default function SafetyNotice() {
  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3 text-emerald-900 text-sm max-w-xl mx-auto my-6">
      <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      <p>For general educational information only. Always follow the medicine label and consult a healthcare professional when needed.</p>
    </div>
  );
}