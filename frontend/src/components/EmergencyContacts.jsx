import React from 'react';
import { PhoneCall, ShieldAlert, HeartPulse, Building2 } from 'lucide-react';

export default function EmergencyContacts() {
  // Pakistan / General emergency helplines (Aap apni requirement ke mutabiq modify kar sakti hain)
  const emergencyNumbers = [
    {
      title: 'Rescue / Ambulance',
      number: '1122',
      description: 'For immediate medical emergencies, accidents, and rescue services.',
      icon: <AmbulanceIcon className="w-6 h-6 text-red-600" />,
      bg: 'bg-red-50',
      border: 'border-red-100',
      badgeColor: 'bg-red-100 text-red-700'
    },
    {
      title: 'National Health Helpline',
      number: '1166',
      description: 'Government health advisory, disease information, and general medical queries.',
      icon: <HeartPulse className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      badgeColor: 'bg-emerald-100 text-emerald-700'
    },
    {
      title: 'Edhi Ambulance Service',
      number: '115',
      description: '24/7 nationwide emergency ambulance and social welfare services.',
      icon: <PhoneCall className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Police Emergency',
      number: '15',
      description: 'For immediate law enforcement, security threats, or urgent police assistance.',
      icon: <ShieldAlert className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      badgeColor: 'bg-amber-100 text-amber-700'
    }
  ];

  return (
    <div className="min-h-[85vh] bg-[#F4FBF7] px-6 py-10 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-8 my-auto">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block shadow-sm">
            24/7 Available
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Emergency Helplines
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            In case of any critical medical emergency or urgent assistance, please reach out to these verified helplines immediately.
          </p>
        </div>

        {/* Emergency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyNumbers.map((item, index) => (
            <div 
              key={index}
              className={`bg-white border ${item.border} rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md mt-1 inline-block ${item.badgeColor}`}>
                      Verified Helpline
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dial Direct:</span>
                <a 
                  href={`tel:${item.number}`}
                  className="bg-gray-900 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-base md:text-lg tracking-wider shadow-sm transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" /> {item.number}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Note Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-6 text-center text-amber-900 text-xs md:text-sm font-medium shadow-sm">
          ⚠️ <strong>Medical Disclaimer:</strong> Quick Medicine Info provides educational details only. If you or someone else is experiencing a life-threatening medical emergency, please call your local emergency service (like 1122) or visit the nearest hospital emergency room immediately.
        </div>

      </div>
    </div>
  );
}

// Custom simple Ambulance Icon helper component
function AmbulanceIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 10H6M14 10h-2M18 18h2a1 1 0 0 0 1-1v-4.5a1 1 0 0 0-.2-.6l-2-2.5a1 1 0 0 0-.8-.4H15v8z" />
      <path d="M6 18H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10v9z" />
      <circle cx="7.5" cy="18.5" r="2.5" />
      <circle cx="16.5" cy="18.5" r="2.5" />
    </svg>
  );
}