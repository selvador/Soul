import React, { useState } from 'react';
import Navigation from './components/Navigation';
import PatientDashboard from './components/PatientDashboard';
import TherapistDashboard from './components/TherapistDashboard';
import AdminDashboard from './components/AdminDashboard';
import SOSButton from './components/SOSButton';
import { User, UserRole } from './types';
import { LayoutDashboard } from 'lucide-react';

const MOCK_USERS: Record<UserRole, User> = {
  [UserRole.GUEST]: { id: '0', name: 'Guest', role: UserRole.GUEST },
  [UserRole.PATIENT]: { id: '1', name: 'Alex Mercer', role: UserRole.PATIENT },
  [UserRole.THERAPIST]: { id: '2', name: 'Dr. Sarah Chen', role: UserRole.THERAPIST },
  [UserRole.ADMIN]: { id: '3', name: 'System Admin', role: UserRole.ADMIN },
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[UserRole.PATIENT]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, clear tokens here
    alert("Logged out");
    setCurrentUser(MOCK_USERS[UserRole.GUEST]);
  };

  const renderDashboard = () => {
    switch (currentUser.role) {
      case UserRole.PATIENT:
        return <PatientDashboard />;
      case UserRole.THERAPIST:
        return <TherapistDashboard />;
      case UserRole.ADMIN:
        return <AdminDashboard />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[80vh] text-center p-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to SoulSpace</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Healing the individual, sustaining the service. Please select a demo role below to begin.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button 
                onClick={() => setCurrentUser(MOCK_USERS[UserRole.PATIENT])}
                className="bg-soul-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-soul-700 transition"
              >
                Demo as Patient
              </button>
              <button 
                onClick={() => setCurrentUser(MOCK_USERS[UserRole.THERAPIST])}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Demo as Therapist
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-calm-50 font-sans text-gray-900">
      
      {currentUser.role !== UserRole.GUEST && (
        <Navigation 
          user={currentUser} 
          onLogout={handleLogout} 
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
      )}

      {/* Role Switcher (Debug Tool for Demo) */}
      <div className="fixed bottom-6 left-6 z-40 bg-white p-2 rounded-lg shadow-lg border border-gray-200 opacity-50 hover:opacity-100 transition-opacity">
        <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Demo Switcher</div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentUser(MOCK_USERS[UserRole.PATIENT])} className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Patient</button>
          <button onClick={() => setCurrentUser(MOCK_USERS[UserRole.THERAPIST])} className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs">Therapist</button>
          <button onClick={() => setCurrentUser(MOCK_USERS[UserRole.ADMIN])} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Admin</button>
        </div>
      </div>

      <main className="relative z-0">
        {renderDashboard()}
      </main>

      {/* Humanity Layer: Persistent SOS */}
      <SOSButton />
    </div>
  );
}

export default App;