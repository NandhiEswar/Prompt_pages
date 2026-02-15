import React from 'react';
import { Moon, Sun, User, Bell, Shield, ChevronRight } from 'lucide-react';

const Settings = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full transition-colors ${darkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-yellow-100 text-yellow-600'}`}>
              {darkMode ? <Moon size={24} /> : <Sun size={24} />}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Adjust the appearance of the application</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${darkMode ? 'bg-purple-600' : 'bg-gray-200'}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>
      </div>

      {/* Account Section - Read Only */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-2xl">U</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">User Name</h3>
            <p className="text-gray-500 dark:text-gray-400">user@example.com</p>
          </div>
          <span className="ml-auto px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full">Pro Plan</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors group">
             <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
               <User size={20} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
               <span>Personal Information</span>
             </div>
             <ChevronRight size={16} className="text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors group">
             <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
               <Bell size={20} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
               <span>Notifications</span>
             </div>
             <ChevronRight size={16} className="text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors group">
             <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
               <Shield size={20} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
               <span>Privacy & Security</span>
             </div>
             <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
