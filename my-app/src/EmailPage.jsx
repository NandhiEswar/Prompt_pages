import React, { useState, useEffect } from 'react';
import { Mail, Check } from 'lucide-react';
import { EMAIL_TEMPLATES } from './data';

const CATEGORIES = ['All', 'Cold Outreach', 'Follow Up', 'Sales', 'Networking', 'Job Search', 'Marketing'];

const CAT_COLORS = {
  'Cold Outreach': 'from-violet-500 to-purple-600',
  'Follow Up':     'from-blue-500 to-cyan-600',
  'Sales':         'from-emerald-500 to-teal-600',
  'Networking':    'from-orange-500 to-amber-600',
  'Job Search':    'from-pink-500 to-rose-600',
  'Marketing':     'from-indigo-500 to-blue-600',
  'default':       'from-slate-500 to-gray-600',
};

const EmailPage = ({ selectedId }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (selectedId) {
      const el = document.getElementById(`email-${selectedId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedId]);

  const handleCopy = (text, id, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId({ id, type });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEmails = selectedCategory === 'All'
    ? EMAIL_TEMPLATES
    : EMAIL_TEMPLATES.filter(e => e.category === selectedCategory);

  const grad = (cat) => CAT_COLORS[cat] || CAT_COLORS['default'];

  return (
    <div className="space-y-6 fade-up">
      {/* Header */}
      <div className="glass rounded-2xl p-4 md:p-5 flex flex-wrap items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-600/10 border border-blue-500/20 shrink-0">
          <Mail size={20} className="text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl font-bold text-white">Email Templates</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">Professional templates for every situation. Copy, customise and send.</p>
        </div>
        <div className="stat-pill text-xs">{filteredEmails.length} templates</div>
      </div>

      {/* Filters */}
      <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex overflow-x-auto pb-2 pt-1 gap-2.5 scrollbar-hide">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`tag shrink-0 whitespace-nowrap fade-in-right ${selectedCategory === cat ? 'active' : ''}`}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Right fade gradient for mobile scroll hint */}
        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#0f0f1a] to-transparent pointer-events-none md:hidden" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmails.map((item, i) => (
          <div
            key={item.id}
            id={`email-${item.id}`}
            className={`prompt-card rounded-2xl overflow-hidden flex flex-col fade-up ${
              selectedId === item.id ? 'ring-2 ring-violet-500' : ''
            }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Top colour stripe + category */}
            <div className={`h-1.5 bg-gradient-to-r ${grad(item.category)}`} />

            <div className="p-5 flex flex-col flex-1">
              {/* Category + title */}
              <div className="mb-3">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${grad(item.category)} mb-2`}>
                  {item.category}
                </span>
                <h3 className="font-semibold text-white text-sm line-clamp-2">{item.title}</h3>
              </div>

              {/* Email content preview */}
              <div className="flex-1 bg-black/30 rounded-xl p-3 border border-white/10 mb-3 h-36 sm:h-40 overflow-y-auto scrollbar-hide">
                <pre className="mono-content text-xs whitespace-pre-wrap leading-relaxed">{item.content}</pre>
              </div>

              <p className="text-xs text-slate-400 italic mb-4 line-clamp-2">{item.description}</p>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
                {[
                  { type: 'chatgpt', label: 'ChatGPT', abbr: 'GP', color: 'bg-teal-500' },
                  { type: 'gemini',  label: 'Gemini',  abbr: 'GE', color: 'bg-blue-500' },
                ].map(({ type, label, abbr, color }) => {
                  const isCopied = copiedId?.id === item.id && copiedId?.type === type;
                  return (
                    <button
                      key={type}
                      onClick={() => handleCopy(item.content, item.id, type)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        isCopied ? 'copy-btn-green' : 'copy-btn'
                      }`}
                    >
                      {isCopied
                        ? <Check size={12} />
                        : <span className={`w-3.5 h-3.5 rounded-full ${color} flex items-center justify-center text-[8px] font-bold text-white`}>{abbr}</span>
                      }
                      {isCopied ? 'Copied!' : label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailPage;
