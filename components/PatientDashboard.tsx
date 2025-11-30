import React, { useState, useEffect } from 'react';
import { 
  Smile, Frown, Meh, Sun, BookOpen, 
  Calendar, Video, Users, Mic, Sparkles, Send, Lock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { analyzeJournalEntry } from '../services/geminiService';
import { JournalResponse } from '../types';

const moodData = [
  { day: 'Mon', score: 6 },
  { day: 'Tue', score: 5 },
  { day: 'Wed', score: 7 },
  { day: 'Thu', score: 4 },
  { day: 'Fri', score: 6 },
  { day: 'Sat', score: 8 },
  { day: 'Sun', score: 8 },
];

const PatientDashboard: React.FC = () => {
  const [mood, setMood] = useState<number>(5);
  const [journalEntry, setJournalEntry] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<JournalResponse | null>(null);

  const handleJournalSubmit = async () => {
    if (!journalEntry.trim()) return;
    setIsAnalyzing(true);
    const result = await analyzeJournalEntry(journalEntry);
    setAiResponse(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-soul-600 to-calm-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Good Morning, Alex.</h1>
        <p className="text-soul-100 text-lg">"Healing is not linear. Be patient with yourself today."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Daily Check-in (Humanity Layer) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Mood Slider */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Sun className="text-orange-400" />
                Daily Check-in
              </h2>
              <span className="text-sm text-gray-500">Free Feature</span>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                How are you feeling right now? ({mood}/10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-soul-500"
              />
              <div className="flex justify-between mt-2 text-2xl px-1">
                <Frown className={`transition-colors ${mood < 4 ? 'text-rose-500' : 'text-gray-300'}`} />
                <Meh className={`transition-colors ${mood >= 4 && mood <= 7 ? 'text-yellow-500' : 'text-gray-300'}`} />
                <Smile className={`transition-colors ${mood > 7 ? 'text-green-500' : 'text-gray-300'}`} />
              </div>
            </div>

            <div className="h-48 w-full">
               <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Your Week</p>
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={moodData}>
                   <defs>
                     <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                   <YAxis hide domain={[0, 10]} />
                   <Tooltip 
                     contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                   />
                   <Area type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
          </div>

          {/* AI Journal (Humanity + Tech) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="text-purple-500" />
                AI Journal
              </h2>
            </div>
            
            {!aiResponse ? (
              <div className="space-y-4">
                <textarea
                  className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-soul-200 focus:border-soul-400 outline-none resize-none bg-gray-50 h-32 transition-all"
                  placeholder="What's on your mind today? This space is private and safe."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleJournalSubmit}
                    disabled={isAnalyzing || !journalEntry}
                    className="flex items-center gap-2 bg-soul-600 hover:bg-soul-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50"
                  >
                    {isAnalyzing ? 'Processing...' : 'Reflect'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-white rounded text-purple-600 border border-purple-200 uppercase tracking-wide">
                    {aiResponse.sentiment}
                  </span>
                </div>
                <p className="text-gray-800 font-medium mb-4 leading-relaxed">
                  "{aiResponse.supportiveMessage}"
                </p>
                <div className="bg-white bg-opacity-60 p-4 rounded-lg border border-purple-100">
                  <p className="text-sm text-purple-800 font-semibold flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    Suggested Action:
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{aiResponse.suggestedAction}</p>
                </div>
                <button 
                  onClick={() => { setAiResponse(null); setJournalEntry(''); }}
                  className="mt-4 text-sm text-gray-500 hover:text-soul-600 underline"
                >
                  New Entry
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Col: Commercial Layer */}
        <div className="space-y-8">
          
          {/* Next Appointment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Calendar className="w-24 h-24 text-soul-500" />
             </div>
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Up Next</h3>
             <div className="flex items-start gap-4 mb-6">
                <img src="https://picsum.photos/100/100" alt="Doctor" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-gray-900">Dr. Sarah Chen</p>
                  <p className="text-sm text-gray-500">Cognitive Behavioral Therapy</p>
                </div>
             </div>
             <div className="bg-soul-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 text-soul-800 font-medium mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Tomorrow, 2:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-soul-600 text-sm">
                  <Video className="w-4 h-4" />
                  <span>Video Session (45 min)</span>
                </div>
             </div>
             <button className="w-full py-2.5 rounded-lg border border-soul-200 text-soul-600 font-medium hover:bg-soul-50 transition-colors">
               Reschedule
             </button>
          </div>

          {/* Therapist Marketplace (Commercial) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Available Therapists</h2>
              <a href="#" className="text-sm text-soul-600 hover:underline">View All</a>
            </div>
            
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                  <img src={`https://picsum.photos/100/100?random=${i+10}`} className="w-12 h-12 rounded-lg object-cover" alt="Therapist" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-soul-600">Dr. Emily Stone</h4>
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">$120/hr</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">Specializes in anxiety and workplace stress.</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl font-medium shadow-lg shadow-gray-200 hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Book New Session
            </button>
          </div>

          {/* Community (Humanity Layer) */}
          <div className="bg-calm-100 rounded-2xl p-6 border border-calm-200">
            <h2 className="text-lg font-bold text-calm-800 mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Community Garden
            </h2>
            <p className="text-sm text-calm-600 mb-4">
              Join 1,204 others in the "Anxiety Support" circle.
            </p>
            <button className="w-full bg-white text-calm-800 py-2 rounded-lg border border-calm-300 text-sm font-semibold hover:bg-calm-50 transition-colors">
              Enter Forum (Anonymous)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;