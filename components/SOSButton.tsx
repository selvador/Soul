import React, { useState } from 'react';
import { Phone, X, AlertTriangle } from 'lucide-react';

const SOSButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sticky Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 font-bold tracking-wide"
        >
          <AlertTriangle className="w-5 h-5" />
          <span>SOS / CRISIS</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-t-4 border-rose-500 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-rose-600 flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Immediate Support
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-700 mb-6">
              You are not alone. If you are in immediate danger or need someone to talk to right now, please use these free resources.
            </p>

            <div className="space-y-3">
              <a 
                href="tel:988" 
                className="block w-full text-center bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold py-4 rounded-xl border border-rose-200 transition-colors"
              >
                Call 988 (Suicide & Crisis Lifeline)
              </a>
              <a 
                href="sms:741741" 
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-xl border border-gray-200 transition-colors"
              >
                Text HOME to 741741
              </a>
              <button 
                className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-xl transition-colors"
                onClick={() => alert("Connecting to nearest available crisis counselor...")}
              >
                Chat with a SoulSpace Crisis Counselor
              </button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-6">
              This service is free, confidential, and available 24/7.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;