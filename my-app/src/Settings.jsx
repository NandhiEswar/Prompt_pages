import React from 'react';
import { Moon, User, Bell, Shield, ChevronRight, Sparkles } from 'lucide-react';

const Settings = () => {
  const settingsItems = [
    { icon: User,   label: 'Personal Information', desc: 'Manage your name and email' },
    { icon: Bell,   label: 'Notifications',         desc: 'Configure alerts and push settings' },
    { icon: Shield, label: 'Privacy & Security',    desc: 'Password and 2FA settings' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-5 fade-up">

      {/* Account card */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-violet-500/30">
            N
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg">User Name</h3>
            <p className="text-sm text-slate-400">user@example.com</p>
          </div>
          <span className="stat-pill flex items-center gap-1.5">
            <Sparkles size={11} />
            Pro Plan
          </span>
        </div>

        <div className="space-y-1">
          {settingsItems.map(({ icon: Icon, label, desc }) => (
            <button
              key={label}
              className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
            >
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-violet-500/20 transition-colors">
                <Icon size={16} className="text-slate-400 group-hover:text-violet-400 transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
              <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Appearance card */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4">Appearance</h2>
        <div className="flex items-center justify-between p-3 rounded-xl bg-black/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <Moon size={16} className="text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Dark Mode</p>
              <p className="text-xs text-slate-400">Always on for best experience</p>
            </div>
          </div>
          {/* Toggle (always on) */}
          <div className="h-6 w-11 rounded-full bg-violet-600 relative flex items-center px-0.5 cursor-not-allowed">
            <div className="w-5 h-5 rounded-full bg-white shadow translate-x-5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Plan info */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4">Your Plan</h2>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-indigo-600/10 border border-violet-500/20">
          <div className="p-2.5 rounded-xl bg-violet-500/20">
            <Sparkles size={20} className="text-violet-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Pro Plan — Active</p>
            <p className="text-xs text-slate-400 mt-0.5">Unlimited prompts · Priority support · API access</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;
