import React from 'react';
import { UserRole, User } from '../types';
import { Heart, Menu, Bell, User as UserIcon, LogOut } from 'lucide-react';

interface NavigationProps {
  user: User;
  onLogout: () => void;
  toggleSidebar: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout, toggleSidebar }) => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center gap-2 ml-2 lg:ml-0 cursor-pointer">
              <div className="bg-soul-500 p-1.5 rounded-lg">
                <Heart className="h-5 w-5 text-white fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-800">SoulSpace</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-medium text-gray-900">{user.name}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{user.role}</span>
            </div>
            
            <button className="p-2 rounded-full text-gray-400 hover:text-soul-600 hover:bg-soul-50 transition-colors relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            <div className="relative ml-3">
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;