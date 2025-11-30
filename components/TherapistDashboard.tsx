import React from 'react';
import { 
  Users, Clock, DollarSign, FileText, CheckCircle, 
  Video, MoreVertical, Search
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { day: 'Mon', amount: 450 },
  { day: 'Tue', amount: 600 },
  { day: 'Wed', amount: 300 },
  { day: 'Thu', amount: 750 },
  { day: 'Fri', amount: 500 },
];

const patients = [
  { id: 1, name: 'Alex M.', time: '14:00', type: 'Initial', status: 'Confirmed' },
  { id: 2, name: 'Sarah J.', time: '15:30', type: 'Follow-up', status: 'Confirmed' },
  { id: 3, name: 'Mike T.', time: '16:45', type: 'Crisis', status: 'Pending' },
];

const TherapistDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Patients</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Revenue (Wk)</p>
            <p className="text-2xl font-bold text-gray-900">$2,450</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Hours Billed</p>
            <p className="text-2xl font-bold text-gray-900">18.5</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pending Notes</p>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content: Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Today's Schedule</h2>
            <button className="text-sm text-soul-600 font-medium bg-soul-50 px-3 py-1.5 rounded-lg hover:bg-soul-100">
              View Calendar
            </button>
          </div>
          
          <div className="divide-y divide-gray-50">
            {patients.map((patient) => (
              <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-center gap-4">
                <div className="text-center sm:text-left min-w-[80px]">
                  <p className="text-lg font-bold text-gray-900">{patient.time}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Today</p>
                </div>
                
                <div className="flex-1 flex items-center gap-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{patient.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      patient.type === 'Crisis' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {patient.type}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                   <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-soul-600 hover:bg-soul-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                     <Video className="w-4 h-4" />
                     Join
                   </button>
                   <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-500">
                     <FileText className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Clinical Notes & Revenue */}
        <div className="space-y-8">
           
           {/* Revenue Chart */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Earnings</h3>
             <div className="h-48">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={revenueData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                   <YAxis hide />
                   <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                   <Bar dataKey="amount" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </div>

           {/* SOAP Notes Quick Access */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-gray-800">SOAP Notes</h3>
               <Search className="w-4 h-4 text-gray-400" />
             </div>
             <div className="space-y-3">
               <div className="p-3 border border-gray-100 rounded-xl hover:border-soul-300 cursor-pointer transition-colors">
                 <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">Jennifer W.</span>
                    <span className="text-xs text-orange-500 font-bold">Incomplete</span>
                 </div>
                 <p className="text-xs text-gray-400">Last session: Yesterday</p>
               </div>
               <div className="p-3 border border-gray-100 rounded-xl hover:border-soul-300 cursor-pointer transition-colors">
                 <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">Robert K.</span>
                    <span className="text-xs text-green-500 font-bold">Signed</span>
                 </div>
                 <p className="text-xs text-gray-400">Last session: 2 days ago</p>
               </div>
             </div>
             <button className="w-full mt-4 text-sm text-soul-600 font-medium hover:underline">
               View All Documentation
             </button>
           </div>

        </div>

      </div>
    </div>
  );
};

export default TherapistDashboard;