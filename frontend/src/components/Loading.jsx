import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-700 font-medium">Getting medicine information...</p>
      <p className="text-xs text-gray-400 mt-1">This may take a few seconds.</p>
    </div>
  );
}