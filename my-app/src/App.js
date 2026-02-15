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
  User, 
  Copy,
  Check,
  ChevronRight,
  Share2,
  Briefcase
} from 'lucide-react';
import { PROMPTS_DATA, searchAll } from './data';

// Local icons removed as they are now used via data.js items or Lucide directly
// Mock Data moved to src/data.js

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`}>
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

const PromptCard = ({ item, copiedId, handleCopy }) => {
  const copyText = item.contentType === 'image' ? item.description : item.content;
  
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      {/* Card Header / Visual */}
      <div className="p-4 pb-0">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 truncate">{item.title}</h3>
        
        {item.contentType === 'image' ? (
          <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img 
              src={item.content} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-48 rounded-lg bg-gray-50 dark:bg-gray-900 p-4 border border-gray-100 dark:border-gray-700 overflow-hidden text-sm text-gray-600 dark:text-gray-300 font-mono leading-relaxed">
            {item.content}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 mb-4 flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4 leading-relaxed">
            {item.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={() => handleCopy(copyText, item.id, 'chatgpt')}
            className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
          >
            {copiedId?.id === item.id && copiedId?.type === 'chatgpt' ? <Check size={14} className="text-green-600 sm:w-4 sm:h-4" /> : <div className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center text-[8px] font-bold text-white">GP</div>}
            {copiedId?.id === item.id && copiedId?.type === 'chatgpt' ? <span className="text-green-600 truncate">Copied!</span> : "ChatGPT"}
          </button>

          <button 
            onClick={() => handleCopy(copyText, item.id, 'gemini')}
            className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
          >
            {copiedId?.id === item.id && copiedId?.type === 'gemini' ? <Check size={14} className="text-green-600 sm:w-4 sm:h-4" /> : <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white">GE</div>}
            {copiedId?.id === item.id && copiedId?.type === 'gemini' ? <span className="text-green-600 truncate">Copied!</span> : "Gemini"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Search effect
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
      // Clear highlight after 2 seconds
      setTimeout(() => setSelectedId(null), 2000);
    }
  };
  
  // Initialize dark mode from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleCopy = (text, id, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId({ id, type });
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  // 1. Initialize state based on the current URL path
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname.slice(1); // Remove leading slash
    return path === '' ? 'all' : path;
  });

  // 2. Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1);
      setCurrentRoute(path === '' ? 'all' : path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 3. Function to update URL and State together
  const navigate = (route) => {
    setCurrentRoute(route);
    const path = route === 'all' ? '/' : `/${route}`;
    window.history.pushState({}, '', path);
  };

  const getPageTitle = () => {
    switch (currentRoute) {
      case 'images': return 'Image Generation';
      case 'emails': return 'Email Templates';
      case 'code': return 'Code Snippets';
      case 'settings': return 'Settings';
      default: return 'Recent Highlights';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* --- Sidebar (Desktop) --- */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col fixed h-full z-10 transition-colors">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-red-500 text-white p-1.5 rounded-md font-bold text-xl">N</div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Prompt</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem icon={LayoutGrid} label="All Prompts" active={currentRoute === 'all'} onClick={() => navigate('all')} />
          <SidebarItem icon={ImageIcon} label="Images" active={currentRoute === 'images'} onClick={() => navigate('images')} />
          <SidebarItem icon={Mail} label="Emails" active={currentRoute === 'emails'} onClick={() => navigate('emails')} />
          <SidebarItem icon={Share2} label="Social Media" active={currentRoute === 'social'} onClick={() => navigate('social')} />
          <SidebarItem icon={Briefcase} label="Job Search" active={currentRoute === 'job'} onClick={() => navigate('job')} />
          <SidebarItem icon={Code} label="Code" active={currentRoute === 'code'} onClick={() => navigate('code')} />
          <SidebarItem icon={Settings} label="Settings" active={currentRoute === 'settings'} onClick={() => navigate('settings')} />
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
           <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
             <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center font-bold">U</div>
             <div className="flex flex-col">
               <span className="font-medium text-black dark:text-white">User Name</span>
               <span className="text-xs">Pro Plan</span>
             </div>
           </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all">
        
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 sticky top-0 z-20 transition-colors">
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Top Row: Logo/Menu (Mobile) & Search/Profile (Desktop) */}
            <div className="flex items-center justify-between gap-4">
              
              {/* Mobile: Hamburger + Logo */}
              <div className="flex items-center gap-3 md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  <Menu size={24} className="text-gray-600 dark:text-gray-300" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="bg-red-500 text-white p-1 rounded-md font-bold text-sm">N</div>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">Prompt</span>
                </div>
              </div>

              {/* Desktop: Header Title */}
              <h1 className="hidden md:block text-xl font-bold text-gray-800 dark:text-white">
                {getPageTitle()}
              </h1>

              {/* Desktop Search & Profile */}
              <div className="hidden md:flex items-center gap-4 flex-1 justify-end relative">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search prompts, images, emails..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                  />
                  
                  {/* Search Suggestions Dropdown (Desktop) */}
                  {showSuggestions && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      {searchResults.map((result) => (
                        <div 
                          key={`${result.type}-${result.id}`}
                          onClick={() => handleSearchSelect(result.route, result.id)}
                          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between group border-b border-gray-100 dark:border-gray-700 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              result.type === 'image' ? 'bg-purple-100 text-purple-600' :
                              result.type === 'email' ? 'bg-blue-100 text-blue-600' :

                              result.type === 'code' ? 'bg-emerald-100 text-emerald-600' :
                              result.type === 'social' ? 'bg-pink-100 text-pink-600' :
                              result.type === 'job' ? 'bg-orange-100 text-orange-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {result.type === 'image' ? <ImageIcon size={16} /> :
                               result.type === 'email' ? <Mail size={16} /> :
                               result.type === 'code' ? <Code size={16} /> :
                               result.type === 'social' ? <Share2 size={16} /> :
                               result.type === 'job' ? <Briefcase size={16} /> :
                               <Search size={16} />
                              }
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                                {result.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {result.category || result.type}
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
                  <User size={20} />
                </button>
              </div>
            </div>

            {/* Mobile: Search Bar (Row 2) */}
            <div className="mt-3 md:hidden">
              <div className="relative w-full z-30">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                />
                
                {/* Search Suggestions Dropdown (Mobile) */}
                {showSuggestions && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    {searchResults.map((result) => (
                      <div 
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleSearchSelect(result.route, result.id)}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between border-b border-gray-100 dark:border-gray-700 last:border-0"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className={`p-2 rounded-lg shrink-0 ${
                            result.type === 'image' ? 'bg-purple-100 text-purple-600' :
                            result.type === 'email' ? 'bg-blue-100 text-blue-600' :

                            result.type === 'code' ? 'bg-emerald-100 text-emerald-600' :
                            result.type === 'social' ? 'bg-pink-100 text-pink-600' :
                            result.type === 'job' ? 'bg-orange-100 text-orange-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {result.type === 'image' ? <ImageIcon size={16} /> :
                             result.type === 'email' ? <Mail size={16} /> :
                             result.type === 'code' ? <Code size={16} /> :
                             result.type === 'social' ? <Share2 size={16} /> :
                             result.type === 'job' ? <Briefcase size={16} /> :
                             <Search size={16} />
                            }
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {result.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {result.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </header>

        {/* Content Grid */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {currentRoute === 'settings' ? (
            <SettingsPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROMPTS_DATA.filter(item => {
                if (currentRoute === 'all') return true;
                if (currentRoute === 'images') return item.category === 'Image Generation' || item.category === 'Design';
                if (currentRoute === 'emails') return item.category === 'Copywriting';
                return false;
              }).map((item) => (
                <PromptCard key={item.id} item={item} copiedId={copiedId} handleCopy={handleCopy} />
              ))}
            </div>
          )}
        </div>

      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
           <div className="w-64 bg-white dark:bg-gray-900 h-full p-4 flex flex-col transition-colors" onClick={e => e.stopPropagation()}>
              <div className="mb-6 flex items-center gap-2">
                <div className="bg-black dark:bg-white text-white dark:text-black p-1.5 rounded-md font-bold transition-colors">P</div>
                <span className="font-bold text-lg text-gray-900 dark:text-white">Prompt</span>
              </div>
              <nav className="space-y-1">
                <SidebarItem icon={LayoutGrid} label="All Prompts" active={currentRoute === 'all'} onClick={() => { navigate('all'); setIsMobileMenuOpen(false); }} />
                <SidebarItem icon={ImageIcon} label="Images" active={currentRoute === 'images'} onClick={() => { navigate('images'); setIsMobileMenuOpen(false); }} />
                <SidebarItem icon={Mail} label="Emails" active={currentRoute === 'emails'} onClick={() => { navigate('emails'); setIsMobileMenuOpen(false); }} />

                <SidebarItem icon={Share2} label="Social Media" active={currentRoute === 'social'} onClick={() => { navigate('social'); setIsMobileMenuOpen(false); }} />
                <SidebarItem icon={Briefcase} label="Job Search" active={currentRoute === 'job'} onClick={() => { navigate('job'); setIsMobileMenuOpen(false); }} />
                <SidebarItem icon={Code} label="Code" active={currentRoute === 'code'} onClick={() => { navigate('code'); setIsMobileMenuOpen(false); }} />
                <SidebarItem icon={Settings} label="Settings" active={currentRoute === 'settings'} onClick={() => { navigate('settings'); setIsMobileMenuOpen(false); }} />
              </nav>

              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                 <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                   <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center font-bold">U</div>
                   <div className="flex flex-col">
                     <span className="font-medium text-black dark:text-white">User Name</span>
                     <span className="text-xs">Pro Plan</span>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}