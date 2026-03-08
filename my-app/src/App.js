import React, { useState, useEffect } from 'react';
import ImagePage from './Image.jsx';
import SettingsPage from './Settings.jsx';
import EmailPage from './EmailPage.jsx';
import CodePage from './CodePage.jsx';
import SocialPage from './SocialPage.jsx';
import JobPage from './JobPage.jsx';
import {
  Search,
  Menu,
  LayoutGrid,
  Image as ImageIcon,
  Mail,
  Code,
  Settings,
  Check,
  ChevronRight,
  Share2,
  Briefcase,
  Sparkles,
  X,
  Zap,
  ArrowUp,
} from 'lucide-react';
import { PROMPTS_DATA, searchAll } from './data';

/* ─── Category colour map ─── */
const CATEGORY_COLORS = {
  'Image Generation': 'from-violet-500 to-purple-600',
  'Design': 'from-pink-500 to-rose-600',
  'Copywriting': 'from-blue-500 to-cyan-600',
  'Code': 'from-emerald-500 to-teal-600',
  'Social Media': 'from-orange-500 to-amber-600',
  'default': 'from-indigo-500 to-purple-600',
};

const getBg = (cat) => CATEGORY_COLORS[cat] || CATEGORY_COLORS['default'];

/* ─── Sidebar Item ─── */
const SidebarItem = ({ icon: Icon, label, active = false, onClick, count }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-left ${active
        ? 'sidebar-active text-white'
        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
      }`}
  >
    <div className={`p-1.5 rounded-lg ${active ? 'bg-violet-500/30' : 'bg-white/5'}`}>
      <Icon size={16} />
    </div>
    <span className="flex-1 text-sm font-medium">{label}</span>
    {count && (
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-violet-500/40 text-violet-200' : 'bg-white/10 text-slate-400'}`}>
        {count}
      </span>
    )}
  </button>
);

/* ─── Prompt Card ─── */
const PromptCard = ({ item, copiedId, handleCopy, index }) => {
  const copyText = item.contentType === 'image' ? item.description : item.content;
  const gradClass = getBg(item.category);

  return (
    <div
      className="prompt-card rounded-xl md:rounded-2xl overflow-hidden flex flex-col fade-up min-w-0 w-full"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Colour stripe / image */}
      <div className={`relative bg-gradient-to-br ${gradClass} h-1.5 md:h-2`} />

      <div className="p-4 md:p-5 flex flex-col flex-1 min-w-0">
        {/* header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-xs md:text-sm text-white leading-snug line-clamp-2 min-w-0 overflow-hidden">
            {item.title}
          </h3>
          <span className="badge shrink-0 text-[9px] md:text-[0.65rem]">{item.category}</span>
        </div>

        {/* image preview OR text preview */}
        {item.contentType === 'image' ? (
          <div className="w-full h-32 md:h-40 rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4 ring-1 ring-white/10 shrink-0">
            <img src={item.content} alt={item.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-full h-32 md:h-40 rounded-lg md:rounded-xl mb-3 md:mb-4 p-3 bg-black/30 ring-1 ring-white/10 overflow-hidden shrink-0">
            <p className="mono-content text-[10px] md:text-[0.78rem] line-clamp-5 md:line-clamp-6 break-words overflow-hidden">{item.content}</p>
          </div>
        )}

        {/* description */}
        <p className="text-[10px] md:text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 flex-1 break-words overflow-hidden">
          {item.description}
        </p>

        {/* action buttons */}
        <div className="flex flex-row items-center gap-1.5 md:gap-2 pt-3 border-t border-white/5 mt-auto">
          {[
            { key: 'chatgpt', label: 'ChatGPT', abbr: 'GP', color: 'bg-teal-500' },
            { key: 'gemini', label: 'Gemini', abbr: 'GE', color: 'bg-blue-500' },
          ].map(({ key, label, abbr, color }) => {
            const isCopied = copiedId?.id === item.id && copiedId?.type === key;
            return (
              <div key={key} className="flex-1 min-w-0">
                <button
                  onClick={() => handleCopy(copyText, item.id, key)}
                  className={`w-full flex items-center justify-center gap-1 py-2 px-1.5 md:px-3 rounded-lg text-[10px] md:text-xs font-medium transition-all duration-200 ${isCopied ? 'copy-btn-green' : 'copy-btn'
                    }`}
                >
                  {isCopied ? (
                    <Check size={11} />
                  ) : (
                    <span className={`w-3 h-3 rounded-full ${color} flex items-center justify-center text-[7px] font-bold text-white shrink-0`}>
                      {abbr}
                    </span>
                  )}
                  <span className="truncate">{isCopied ? 'Copied!' : label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─── Stats pill ─── */
const StatPill = ({ icon: Icon, value, label, color }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${color} bg-opacity-10 border border-white/10`}>
    <Icon size={14} className="text-white/70" />
    <span className="text-sm font-bold text-white">{value}</span>
    <span className="text-xs text-white/50">{label}</span>
  </div>
);

/* ─── Main App ─── */
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* Show/hide scroll-to-top button */
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /* Search effect */
  useEffect(() => {
    if (searchQuery.length > 0) {
      setSearchResults(searchAll(searchQuery));
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchSelect = (route, id) => {
    navigate(route);
    setSearchQuery('');
    setShowSuggestions(false);
    if (id) {
      setSelectedId(id);
      setTimeout(() => setSelectedId(null), 2000);
    }
  };

  /* Routing */
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname.slice(1);
    return path === '' ? 'all' : path;
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1);
      setCurrentRoute(path === '' ? 'all' : path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route) => {
    setCurrentRoute(route);
    const path = route === 'all' ? '/' : `/${route}`;
    window.history.pushState({}, '', path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Copy handler */
  const handleCopy = (text, id, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId({ id, type });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const navItems = [
    { route: 'all', icon: LayoutGrid, label: 'All Prompts', count: PROMPTS_DATA.length },
    { route: 'images', icon: ImageIcon, label: 'Images', count: 27 },
    { route: 'emails', icon: Mail, label: 'Emails', count: 18 },
    { route: 'social', icon: Share2, label: 'Social Media', count: 8 },
    { route: 'job', icon: Briefcase, label: 'Job Search', count: 8 },
    { route: 'code', icon: Code, label: 'Code', count: 9 },
    { route: 'settings', icon: Settings, label: 'Settings' },
  ];

  const pageTitles = {
    all: 'All Prompts',
    images: 'Image Generation',
    emails: 'Email Templates',
    social: 'Social Media',
    job: 'Job Search',
    code: 'Code Prompts',
    settings: 'Settings',
  };

  const typeColorMap = {
    image: 'bg-violet-500/20 text-violet-300',
    email: 'bg-blue-500/20 text-blue-300',
    code: 'bg-emerald-500/20 text-emerald-300',
    social: 'bg-orange-500/20 text-orange-300',
    job: 'bg-amber-500/20 text-amber-300',
    all: 'bg-slate-500/20 text-slate-300',
  };

  const typeIconMap = { image: ImageIcon, email: Mail, code: Code, social: Share2, job: Briefcase, all: LayoutGrid };

  /* ── Render ── */
  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#0a0a14' }}>

      {/* ── Decorative BG orbs ── */}
      <div className="orb w-96 h-96 bg-violet-600/20" style={{ top: '-80px', left: '-60px' }} />
      <div className="orb w-80 h-80 bg-blue-600/15" style={{ top: '40%', right: '-60px' }} />
      <div className="orb w-64 h-64 bg-pink-600/10" style={{ bottom: '0', left: '30%' }} />

      {/* ════ SIDEBAR (desktop) ════ */}
      <aside className="sidebar hidden md:flex w-60 flex-col fixed h-full z-20">
        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg gradient-text tracking-tight">PromptPages</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 mt-2">
          {navItems.map(({ route, icon, label, count }) => (
            <SidebarItem
              key={route}
              icon={icon}
              label={label}
              active={currentRoute === route}
              onClick={() => navigate(route)}
              count={count}
            />
          ))}
        </nav>

        {/* User footer */}
        <div className="p-3 mx-3 mb-4 rounded-2xl glass">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
              N
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">User Name</p>
              <p className="text-xs text-violet-400 font-medium">Pro Plan</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          </div>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <main className="flex-1 md:ml-60 flex flex-col min-h-screen relative z-10">

        {/* ── Top bar ── */}
        <header className="topbar px-3 md:px-6 py-2.5 sticky top-0 z-30">
          {/* Row 1: hamburger + logo (mobile) | title (desktop) + search */}
          <div className="flex items-center gap-3">

            {/* Mobile: hamburger + logo */}
            <div className="flex items-center gap-2 md:hidden shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg glass text-slate-300 hover:text-white transition-colors"
              >
                <Menu size={20} />
              </button>
              <span className="font-bold gradient-text text-base whitespace-nowrap">PromptPages</span>
            </div>

            {/* Desktop: page title */}
            <h1 className="hidden md:block text-xl font-bold text-white shrink-0">
              {pageTitles[currentRoute] || 'Prompts'}
            </h1>

            {/* Search — full width on mobile, constrained on desktop */}
            <div className="relative flex-1 max-w-sm ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="search-input w-full pl-9 pr-3 py-2 rounded-xl text-sm"
              />

              {/* Dropdown */}
              {showSuggestions && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 glass rounded-xl overflow-hidden shadow-2xl border border-white/10 z-50">
                  {searchResults.map((r) => {
                    const Icon = typeIconMap[r.type] || Search;
                    return (
                      <button
                        key={`${r.type}-${r.id}`}
                        onMouseDown={() => handleSearchSelect(r.route, r.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 text-left"
                      >
                        <span className={`p-1.5 rounded-lg text-sm ${typeColorMap[r.type]}`}>
                          <Icon size={14} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{r.title}</p>
                          <p className="text-xs text-slate-400">{r.category || r.type}</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-500 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <div className="p-4 md:p-6 flex-1">
          {currentRoute === 'settings' ? (
            <SettingsPage darkMode={true} toggleDarkMode={() => { }} />
          ) : currentRoute === 'images' ? (
            <ImagePage selectedId={selectedId} />
          ) : currentRoute === 'emails' ? (
            <EmailPage selectedId={selectedId} />
          ) : currentRoute === 'code' ? (
            <CodePage selectedId={selectedId} />
          ) : currentRoute === 'social' ? (
            <SocialPage selectedId={selectedId} />
          ) : currentRoute === 'job' ? (
            <JobPage selectedId={selectedId} />
          ) : (
            <>
              {/* Stats row — wraps on mobile */}
              <div className="flex flex-wrap gap-2 mb-5">
                <StatPill icon={Zap} value={PROMPTS_DATA.length} label="prompts" color="from-violet-600/30 to-purple-600/20" />
                <StatPill icon={ImageIcon} value="54" label="images" color="from-pink-600/30 to-rose-600/20" />
                <StatPill icon={Mail} value="18" label="emails" color="from-blue-600/30 to-cyan-600/20" />
                <StatPill icon={Code} value="9" label="code" color="from-emerald-600/30 to-teal-600/20" />
              </div>

              {/* Section heading */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-500 to-purple-700" />
                <h2 className="text-base font-semibold text-white">Recent Highlights</h2>
                <span className="stat-pill">{PROMPTS_DATA.length} prompts</span>
              </div>

              {/* Grid — 1 col mobile, 2 tablet, 3 desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROMPTS_DATA.map((item, i) => (
                  <PromptCard
                    key={item.id}
                    item={item}
                    index={i}
                    copiedId={copiedId}
                    handleCopy={handleCopy}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* ════ MOBILE SIDEBAR OVERLAY ════ */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="sidebar w-64 h-full flex flex-col p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="font-bold gradient-text text-lg">PromptPages</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="space-y-0.5">
              {navItems.map(({ route, icon, label, count }) => (
                <SidebarItem
                  key={route}
                  icon={icon}
                  label={label}
                  active={currentRoute === route}
                  onClick={() => navigate(route)}
                  count={count}
                />
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ── Floating Scroll-to-Top Button ── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? 'auto' : 'none',
          transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
          border: '1px solid rgba(167,139,250,0.4)',
          boxShadow: '0 8px 30px rgba(124,58,237,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(124,58,237,0.75)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.5)'}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}