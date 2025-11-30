import React from 'react';
import { 
  Activity, AlertCircle, CheckCircle, Shield, 
  UserPlus, FileText
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Case Manager Triage & System Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Triage Dashboard (Humanity Layer - High Priority) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border-t-4 border-rose-500 overflow-hidden">
          <div className="p-6 bg-rose-50 border-b border-rose-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              High Risk Alerts (Triage)
            </h2>
            <span className="bg-white text-rose-600 px-3 py-1 rounded-full text-xs font-bold border border-rose-200">
              3 New Alerts
            </span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    <h3 className="font-bold text-gray-900">Anonymous User #{2930 + i}</h3>
                  </div>
                  <span className="text-xs text-gray-500">10 mins ago</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200 italic">
                  "I don't know if I can keep doing this anymore. Everything feels so heavy..."
                  <span className="block not-italic text-xs text-gray-400 mt-2 font-semibold">Detected triggers: Hopelessness, Severe Distress</span>
                </p>
                <div className="flex gap-3">
                  <button className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-700">
                    Intervene Now
                  </button>
                  <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Assign to Senior Therapist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health & Verification */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Activity className="text-teal-500" />
              Platform Health
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                <span className="text-sm text-green-800 font-medium">Video Servers</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                <span className="text-sm text-green-800 font-medium">Database (Postgres)</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <span className="text-sm text-yellow-800 font-medium">AI Latency</span>
                <span className="text-xs font-bold text-yellow-700">~1.2s</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="text-blue-500" />
              Therapist Verification
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">DK</div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Dr. Kara Danvers</p>
                  <p className="text-xs text-gray-500">License Uploaded</p>
                </div>
                <button className="text-blue-600 text-xs font-bold hover:underline">Review</button>
              </div>
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 font-medium border border-gray-300 rounded-lg py-2 hover:bg-gray-50">
              <UserPlus className="w-4 h-4" />
              Invite New Provider
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;