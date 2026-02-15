import React, { useState, useEffect } from 'react';
import { Check, Maximize2, Palette, Zap, Camera, Rocket, Smile, Star, X } from 'lucide-react';
import { IMAGE_DATA } from './data';

const CATEGORIES = ['All', 'Space', 'Cartoon', 'Tollywood', 'Cyberpunk', 'Abstract', 'Photography'];

function Image({ selectedId }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Scroll to selected item when selectedId changes
  useEffect(() => {
    if (selectedId) {
      const element = document.getElementById(`image-${selectedId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Optional: Trigger a state to show a highlight effect if needed, 
        // though the border style below handles it via the selectedId check.
      }
    }
  }, [selectedId]);

  const filteredImages = selectedCategory === 'All'
    ? IMAGE_DATA
    : IMAGE_DATA.filter(item => {
        if (selectedCategory === 'Space') return item.category === 'Space';
        if (selectedCategory === 'Cartoon') return item.category === 'Cartoon';
        if (selectedCategory === 'Tollywood') return item.category === 'Tollywood';
        // Basic mapping for existing generic items if we wanted to categorize them strictly, 
        // but for now relying on explicit category or fallback.
        // Let's add categories to the original items to make this work effectively.
        if (selectedCategory === 'Cyberpunk' && item.title.includes('Cyberpunk')) return true;
        if (selectedCategory === 'Abstract' && item.title.includes('Abstract')) return true;
        if (selectedCategory === 'Photography' && (item.title.includes('Portrait') || item.title.includes('Architecture'))) return true;
        return item.category === selectedCategory;
      });

  const handleCopy = (text, id, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId({ id, type });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Palette className="text-purple-600 dark:text-purple-400" />
          Image Generation
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explore a collection of high-quality image generation prompts, featuring Space, Cartoons, and Cinematic Heroes.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
              selectedCategory === category
                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((item) => (
          <div 
            key={item.id} 
            id={`image-${item.id}`}
            className={`bg-white dark:bg-gray-800 border-2 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group ${
              selectedId === item.id 
                ? 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-900 scale-[1.02]' 
                : 'border-transparent dark:border-gray-700'
            }`}
          >
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(item);
                  }}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white text-gray-700 shadow-sm"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3">
                 <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm flex items-center gap-1.5 ${item.badgeColor}`}>
                    <item.icon size={12} />
                    {item.tool}
                 </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 font-mono bg-gray-50 dark:bg-gray-900/50 p-2 rounded border border-gray-100 dark:border-gray-700">
                {item.prompt}
              </p>
              
              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => handleCopy(item.prompt, item.id, 'chatgpt')}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                >
                  {copiedId?.id === item.id && copiedId?.type === 'chatgpt' ? <Check size={14} className="text-green-600 sm:w-4 sm:h-4" /> : <div className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center text-[8px] font-bold text-white">GP</div>}
                  {copiedId?.id === item.id && copiedId?.type === 'chatgpt' ? <span className="text-green-600 truncate">Copied!</span> : "ChatGPT"}
                </button>

                <button 
                  onClick={() => handleCopy(item.prompt, item.id, 'gemini')}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                >
                  {copiedId?.id === item.id && copiedId?.type === 'gemini' ? <Check size={14} className="text-green-600 sm:w-4 sm:h-4" /> : <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white">GE</div>}
                  {copiedId?.id === item.id && copiedId?.type === 'gemini' ? <span className="text-green-600 truncate">Copied!</span> : "Gemini"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="md:w-2/3 bg-black flex items-center justify-center">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="max-h-[60vh] md:max-h-[90vh] w-auto object-contain"
              />
            </div>

            <div className="md:w-1/3 p-6 md:p-8 flex flex-col overflow-y-auto">
              <div className="mb-6">
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded tracking-wide mb-3 inline-block ${selectedImage.badgeColor}`}>
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedImage.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                    {selectedImage.tool}
                  </span>
                </div>
              </div>

              <div className="flex-grow">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
                  Prompt
                </label>
                <p className="text-gray-700 dark:text-gray-300 font-mono text-sm leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                  {selectedImage.prompt}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-3">
                 <button 
                  onClick={() => handleCopy(selectedImage.prompt, selectedImage.id, 'chatgpt')}
                  className="flex items-center justify-center gap-2 py-3 px-4 font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
                >
                  {copiedId?.id === selectedImage.id && copiedId?.type === 'chatgpt' ? <Check size={16} className="text-green-600" /> : <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center text-[10px] font-bold text-white">GP</div>}
                  {copiedId?.id === selectedImage.id && copiedId?.type === 'chatgpt' ? <span className="text-green-600">Copied!</span> : "ChatGPT"}
                </button>

                <button 
                  onClick={() => handleCopy(selectedImage.prompt, selectedImage.id, 'gemini')}
                  className="flex items-center justify-center gap-2 py-3 px-4 font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
                >
                  {copiedId?.id === selectedImage.id && copiedId?.type === 'gemini' ? <Check size={16} className="text-green-600" /> : <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">GE</div>}
                  {copiedId?.id === selectedImage.id && copiedId?.type === 'gemini' ? <span className="text-green-600">Copied!</span> : "Gemini"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Image