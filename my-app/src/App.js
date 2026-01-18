import React, { useState, useEffect } from 'react';
import ImagePage from './Image.jsx';
import { 
  Search, 
  Menu, 
  LayoutGrid, 
  Image as ImageIcon, 
  Mail, 
  Code, 
  Settings, 
  User, 
  Copy 
} from 'lucide-react';

// --- Mock Data based on your screenshots ---
const PROMPTS_DATA = [
  {
    id: 1,
    title: "Midjourney V6: Cyberpunk City",
    category: "Image Generation",
    content: "https://images.unsplash.com/photo-1605218427306-0333d9584266?auto=format&fit=crop&q=80&w=600", // Placeholder cyberpunk image
    contentType: "image",
    description: "A hyper-realistic cinematic action scene of me (using my uploaded photo as face reference), transformed into a powerful Indian warrior, riding a massive charging white bull through a dusty ancient temple city, intense fierce expression, long flowing hair, muscular body, wearing traditional Indian warrior clothing, leather arm guards and dhoti, RIGHT HAND clearly gripping a large glowing trishul (Lord Shiva style trident), the trishul held upright and visible in front of the body, attached saffron flag waving from the trident, hand firmly wrapped around the trishul handle, weapon centered in the frame, dramatic dust and debris flying in the air, cinematic golden sunlight from behind, volumetric lighting, epic shadows, motion blur from the bull running, shallow depth of field, ultra-detailed skin texture, realistic sweat and dirt, 8K resolution, IMAX movie poster style, mythological heroic atmosphere, extremely realistic, no blur on face or weapon",
    buttonText: "Copy Prompt"
  },
  {
    id: 2,
    title: "ChatGPT: Cold Email Template",
    category: "Copywriting",
    content: "Dear [Name],\n\nI am reaching out regarding this application complene and customcect in your semwms. We and massestaved adviss to oral regards, for envavvement.\n\nIf you have any demasecons opportunity and unarttass your email.\n\nSincerely,\nBest",
    contentType: "text",
    description: "ChatGPT: Cold email template to pend put co-no-end with scromnt is our email template text to your entiflads.",
    buttonText: "Copy Text"
  },
  {
    id: 3,
    title: "DALL-E 3: Logo Concept",
    category: "Design",
    content: "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=600", // Placeholder logo concept
    contentType: "image", // In a real app, this might be a grid of 4 images
    description: "DALL-E 3: Logo concept, iki logo variations, sollution, logo, etaration, DALL-E 3.",
    buttonText: "Copy Prompt"
  },
  {
    id: 4,
    title: "Midjourney V6: Space Station",
    category: "Image Generation",
    content: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600",
    contentType: "image",
    description: "A futuristic space station orbiting a gas giant, cinematic lighting, 8k resolution.",
    buttonText: "Copy Prompt"
  }
];

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-gray-100 text-black font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

const PromptCard = ({ item }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      {/* Card Header / Visual */}
      <div className="p-4 pb-0">
        <h3 className="font-semibold text-lg text-gray-900 mb-3 truncate">{item.title}</h3>
        
        {item.contentType === 'image' ? (
          <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={item.content} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-48 rounded-lg bg-gray-50 p-4 border border-gray-100 overflow-hidden text-sm text-gray-600 font-mono leading-relaxed">
            {item.content}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 flex-grow">
          <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">
            {item.description}
          </p>
        </div>
        
        <button className="w-full bg-black text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors active:scale-95">
           {item.buttonText === 'Copy Text' ? <Copy size={16} /> : null}
           {item.buttonText}
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-900">
      
      {/* --- Sidebar (Desktop) --- */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-red-500 text-white p-1.5 rounded-md font-bold text-xl">N</div>
          <span className="font-bold text-xl tracking-tight">Prompt</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem icon={LayoutGrid} label="All Prompts" active={currentRoute === 'all'} onClick={() => navigate('all')} />
          <SidebarItem icon={ImageIcon} label="Images" active={currentRoute === 'images'} onClick={() => navigate('images')} />
          <SidebarItem icon={Mail} label="Emails" active={currentRoute === 'emails'} onClick={() => navigate('emails')} />
          <SidebarItem icon={Code} label="Code" active={currentRoute === 'code'} onClick={() => navigate('code')} />
          <SidebarItem icon={Settings} label="Settings" active={currentRoute === 'settings'} onClick={() => navigate('settings')} />
        </nav>

        <div className="p-4 border-t border-gray-100">
           <div className="flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 cursor-pointer p-2">
             <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">U</div>
             <div className="flex flex-col">
               <span className="font-medium text-black">User Name</span>
               <span className="text-xs">Pro Plan</span>
             </div>
           </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Top Row: Logo/Menu (Mobile) & Search/Profile (Desktop) */}
            <div className="flex items-center justify-between gap-4">
              
              {/* Mobile: Hamburger + Logo */}
              <div className="flex items-center gap-3 md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <Menu size={24} />
                </button>
                <div className="flex items-center gap-2">
                  <div className="bg-red-500 text-white p-1 rounded-md font-bold text-sm">N</div>
                  <span className="font-bold text-lg">Prompt</span>
                </div>
              </div>

              {/* Desktop: Header Title */}
              <h1 className="hidden md:block text-xl font-bold text-gray-800">
                {getPageTitle()}
              </h1>

              {/* Desktop Search & Profile */}
              <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50"
                  />
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                  <User size={20} />
                </button>
              </div>
            </div>

            {/* Mobile: Search Bar (Row 2) */}
            <div className="mt-3 md:hidden">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50"
                />
              </div>
            </div>

          </div>
        </header>

        {/* Content Grid */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {currentRoute === 'images' ? (
            <ImagePage />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROMPTS_DATA.filter(item => {
                if (currentRoute === 'all') return true;
                if (currentRoute === 'images') return item.category === 'Image Generation' || item.category === 'Design';
                if (currentRoute === 'emails') return item.category === 'Copywriting';
                return false;
              }).map((item) => (
                <PromptCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
           <div className="w-64 bg-white h-full p-4 flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="mb-6 flex items-center gap-2">
                <div className="bg-black text-white p-1.5 rounded-md font-bold">P</div>
                <span className="font-bold text-lg">Prompt</span>
              </div>
              <nav className="space-y-1">
                <SidebarItem icon={LayoutGrid} label="All Prompts" active={currentRoute === 'all'} onClick={() => { navigate('all'); setIsMobileMenuOpen(false); }} />
                <SidebarItem icon={ImageIcon} label="Images" active={currentRoute === 'images'} onClick={() => { navigate('images'); setIsMobileMenuOpen(false); }} />
                <SidebarItem icon={Mail} label="Emails" active={currentRoute === 'emails'} onClick={() => { navigate('emails'); setIsMobileMenuOpen(false); }} />
                <SidebarItem icon={Code} label="Code" active={currentRoute === 'code'} onClick={() => { navigate('code'); setIsMobileMenuOpen(false); }} />
                <SidebarItem icon={Settings} label="Settings" active={currentRoute === 'settings'} onClick={() => { navigate('settings'); setIsMobileMenuOpen(false); }} />
              </nav>
           </div>
        </div>
      )}

    </div>
  );
}