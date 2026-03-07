import React, { useState, useEffect } from 'react';
import { Check, Maximize2, Palette, X } from 'lucide-react';
import { IMAGE_DATA } from './data';

const CATEGORIES = [
  'All',
  'Space', 'Cartoon', 'Cyberpunk', 'Abstract', 'Photography', 'Architecture',
  'Tollywood', 'Kollywood', 'Bollywood',
  'Hollywood', 'British Cinema', 'French Cinema', 'Italian Cinema',
  'Korean Cinema', 'Japanese Cinema',
  'Chinese Cinema', 'Spanish Cinema', 'Nollywood',
];

const GRADIENT_MAP = {
  Space: 'from-indigo-500 to-blue-600',
  Cartoon: 'from-pink-500 to-rose-600',
  Tollywood: 'from-amber-500 to-orange-600',
  Kollywood: 'from-yellow-500 to-amber-600',
  Bollywood: 'from-pink-600 to-rose-700',
  Cyberpunk: 'from-violet-500 to-purple-700',
  Abstract: 'from-teal-500 to-cyan-600',
  Photography: 'from-slate-500 to-gray-600',
  Architecture: 'from-stone-500 to-gray-600',
  Hollywood: 'from-red-500 to-rose-600',
  'British Cinema': 'from-slate-600 to-gray-700',
  'French Cinema': 'from-blue-500 to-indigo-600',
  'Italian Cinema': 'from-yellow-600 to-amber-700',
  'Korean Cinema': 'from-sky-500 to-blue-600',
  'Japanese Cinema': 'from-rose-500 to-red-600',
  'Chinese Cinema': 'from-red-600 to-orange-700',
  'Spanish Cinema': 'from-orange-500 to-red-600',
  Nollywood: 'from-green-500 to-emerald-600',
  default: 'from-violet-500 to-purple-700',
};

function Image({ selectedId }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedId) {
      const el = document.getElementById(`image-${selectedId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedId]);

  const filteredImages = selectedCategory === 'All'
    ? IMAGE_DATA
    : IMAGE_DATA.filter(item => item.category === selectedCategory);

  const handleCopy = (text, id, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId({ id, type });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const grad = (cat) => GRADIENT_MAP[cat] || GRADIENT_MAP['default'];

  const CopyBtn = ({ item, type, label, abbr, color }) => {
    const isCopied = copiedId?.id === item.id && copiedId?.type === type;
    return (
      <button
        onClick={() => handleCopy(item.prompt, item.id, type)}
        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${isCopied ? 'copy-btn-green' : 'copy-btn'
          }`}
      >
        {isCopied
          ? <Check size={12} />
          : <span className={`w-3.5 h-3.5 rounded-full ${color} flex items-center justify-center text-[8px] font-bold text-white`}>{abbr}</span>
        }
        {isCopied ? 'Copied!' : label}
      </button>
    );
  };

  return (
    <div className="space-y-6 fade-up">
      {/* Header */}
      <div className="glass rounded-2xl p-4 md:p-5 flex flex-wrap items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/10 border border-violet-500/20 shrink-0">
          <Palette size={20} className="text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl font-bold text-white">Image Generation</h2>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5 line-clamp-1">High-quality AI image prompts from Midjourney, DALL-E &amp; more</p>
        </div>
        <div className="stat-pill text-xs">{filteredImages.length} prompts</div>
      </div>

      {/* Filter tags */}
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
        {filteredImages.map((item, i) => (
          <div
            key={item.id}
            id={`image-${item.id}`}
            className={`relative flex flex-col bg-white/5 border border-white/5 rounded-2xl overflow-hidden group fade-up transition-all duration-300 ${selectedId === item.id ? 'ring-2 ring-violet-500 ring-offset-1 ring-offset-transparent' : ''
              }`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Image */}
            <div className="relative h-36 sm:h-44 overflow-hidden">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* tool badge */}
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-sm border border-white/10 text-white">
                <item.icon size={11} />
                {item.tool}
              </span>

              {/* category badge */}
              <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${grad(item.category)} shadow-sm`}>
                {item.category}
              </span>

              {/* expand btn */}
              <button
                onClick={() => setSelectedImage(item)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Card body */}
            <div className="p-4">
              <h3 className="font-semibold text-sm text-white mb-2 line-clamp-1">{item.title}</h3>
              <p className="mono-content line-clamp-3 mb-4">{item.prompt}</p>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5">
                <CopyBtn item={item} type="chatgpt" label="ChatGPT" abbr="GP" color="bg-teal-500" />
                <CopyBtn item={item} type="gemini" label="Gemini" abbr="GE" color="bg-blue-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox Modal ── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] glass rounded-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="md:w-3/5 bg-black flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[60vh] md:max-h-full w-full object-contain"
              />
            </div>

            <div className="md:w-2/5 p-6 flex flex-col overflow-y-auto">
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${grad(selectedImage.category)} mb-3`}>
                  {selectedImage.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{selectedImage.title}</h3>
                <p className="text-xs text-violet-400 font-medium">{selectedImage.tool}</p>
              </div>

              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Prompt</p>
                <p className="mono-content bg-black/30 rounded-xl p-4 border border-white/10 leading-relaxed text-sm">
                  {selectedImage.prompt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
                {[
                  { type: 'chatgpt', label: 'ChatGPT', abbr: 'GP', color: 'bg-teal-500' },
                  { type: 'gemini', label: 'Gemini', abbr: 'GE', color: 'bg-blue-500' },
                ].map(({ type, label, abbr, color }) => {
                  const isCopied = copiedId?.id === selectedImage.id && copiedId?.type === type;
                  return (
                    <button
                      key={type}
                      onClick={() => handleCopy(selectedImage.prompt, selectedImage.id, type)}
                      className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${isCopied ? 'copy-btn-green' : 'copy-btn'
                        }`}
                    >
                      {isCopied
                        ? <Check size={14} />
                        : <span className={`w-4 h-4 rounded-full ${color} flex items-center justify-center text-[9px] font-bold text-white`}>{abbr}</span>
                      }
                      {isCopied ? 'Copied!' : label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Image;