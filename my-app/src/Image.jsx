import React, { useState } from 'react';
import { Copy, Check, Maximize2, Palette, Camera, Zap } from 'lucide-react';

const ChatGptIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

const GeminiIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
  </svg>
);

const GrokIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2 2h20v20H2V2zm4 4v12h12V6H6zm2 2h8v8H8V8z" />
  </svg>
);

const IMAGE_DATA = [
  {
    id: 1,
    title: "Neon Cyberpunk City",
    tool: "Midjourney V6",
    prompt: "A futuristic city with neon lights, rain-slicked streets, towering skyscrapers, cyberpunk aesthetic, cinematic lighting, 8k resolution --ar 16:9",
    url: "https://images.unsplash.com/photo-1605218427306-0333d9584266?auto=format&fit=crop&q=80&w=600",
    icon: Zap,
    badgeColor: "bg-yellow-100 text-yellow-700"
  },
  {
    id: 2,
    title: "Abstract Fluid Art",
    tool: "DALL-E 3",
    prompt: "Swirling colors of liquid gold and deep blue, abstract fluid art, high contrast, macro photography style, intricate details.",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
    icon: Palette,
    badgeColor: "bg-purple-100 text-purple-700"
  },
  {
    id: 3,
    title: "Portrait of an Astronaut",
    tool: "Stable Diffusion XL",
    prompt: "Close-up portrait of an astronaut in a white space suit, reflection of earth in the visor, realistic skin texture, dramatic lighting.",
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600",
    icon: Camera,
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 4,
    title: "Surreal Digital Landscape",
    tool: "ChatGPT DALL-E 3",
    prompt: "A surreal digital landscape with floating islands, waterfalls cascading into the void, vibrant colors, dreamlike atmosphere.",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
    icon: ChatGptIcon,
    badgeColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: 5,
    title: "Cybernetic Portrait",
    tool: "Gemini Ultra",
    prompt: "Portrait of a cyborg with transparent skin revealing glowing circuitry, soft lighting, high detail, 8k resolution.",
    url: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=600",
    icon: GeminiIcon,
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 6,
    title: "Minimalist Architecture",
    tool: "Grok Vision",
    prompt: "Minimalist concrete architecture in a desert, harsh shadows, clear blue sky, geometric shapes.",
    url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=600",
    icon: GrokIcon,
    badgeColor: "bg-gray-100 text-gray-700"
  }
];

function Image() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Image Generation</h2>
        <p className="text-gray-600">
          Explore a collection of high-quality image generation prompts and examples.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {IMAGE_DATA.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white text-gray-700 shadow-sm">
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
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4 font-mono bg-gray-50 p-2 rounded border border-gray-100">
                {item.prompt}
              </p>
              
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button 
                  onClick={() => handleCopy(item.prompt, item.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {copiedId === item.id ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  {copiedId === item.id ? <span className="text-green-600">Copied!</span> : "Copy Prompt"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Image