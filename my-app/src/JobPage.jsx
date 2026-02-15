import React, { useState, useEffect } from 'react';
import { Briefcase, Check } from 'lucide-react';
import { JOB_PROMPTS } from './data';

const ChatGptIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 16.64C15.5 17.78 13.88 18.5 12 18.5C10.12 18.5 8.5 17.78 7.36 16.64C6.22 15.5 5.5 13.88 5.5 12C5.5 10.12 6.22 8.5 7.36 7.36C8.5 6.22 10.12 5.5 12 5.5C13.88 5.5 15.5 6.22 16.64 7.36C17.78 8.5 18.5 10.12 18.5 12C18.5 13.88 17.78 15.5 16.64 16.64Z" fill="currentColor" fillOpacity="0.2"/>
    <path d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z" fill="currentColor"/>
    <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8Z" fill="currentColor"/>
  </svg>
);

const GeminiIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12L12 8L16 12M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CATEGORIES = ['All', 'Resume', 'Cover Letter', 'Interview', 'LinkedIn', 'Negotiation', 'Networking'];

const JobPage = ({ selectedId }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  // Scroll to selected item when selectedId changes
  useEffect(() => {
    if (selectedId) {
      const element = document.getElementById(`job-${selectedId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedId]);

  const handleCopy = (text, id, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId({ id, type });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = selectedCategory === 'All' 
    ? JOB_PROMPTS 
    : JOB_PROMPTS.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Briefcase className="text-purple-600 dark:text-purple-400" />
          Job Search Assistant
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Land your dream job with AI-optimized resumes, cover letters, and interview prep.
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

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((item) => (
          <div 
            key={item.id} 
            id={`job-${item.id}`}
            className={`bg-white dark:bg-gray-800 border-2 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 group ${
              selectedId === item.id 
                ? 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-900 scale-[1.02]' 
                : 'border-transparent dark:border-gray-700'
            }`}
          >
            
            {/* Card Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded tracking-wide ${
                  item.category === 'Resume' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' :
                  item.category === 'Interview' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                  item.category === 'Cover Letter' ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300'
                }`}>
                  {item.category}
                </span>
                <item.icon size={18} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate" title={item.title}>
                {item.title}
              </h3>
            </div>

            {/* Content Preview */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 flex flex-col flex-grow">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm font-mono text-gray-600 dark:text-gray-300 leading-relaxed mb-4 h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                {item.content}
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-4">
                {item.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-auto grid grid-cols-2 gap-2 sm:gap-3">
                <button 
                  onClick={() => handleCopy(item.content, item.id, 'chatgpt')}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 shadow-sm"
                >
                  {copiedId?.id === item.id && copiedId?.type === 'chatgpt' ? <Check size={14} className="text-green-600 sm:w-4 sm:h-4" /> : <ChatGptIcon size={14} className="text-teal-600 sm:w-4 sm:h-4" />}
                  {copiedId?.id === item.id && copiedId?.type === 'chatgpt' ? <span className="text-green-600 truncate">Copied!</span> : "ChatGPT"}
                </button>

                <button 
                  onClick={() => handleCopy(item.content, item.id, 'gemini')}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 shadow-sm"
                >
                  {copiedId?.id === item.id && copiedId?.type === 'gemini' ? <Check size={14} className="text-green-600 sm:w-4 sm:h-4" /> : <GeminiIcon size={14} className="text-blue-600 sm:w-4 sm:h-4" />}
                  {copiedId?.id === item.id && copiedId?.type === 'gemini' ? <span className="text-green-600 truncate">Copied!</span> : "Gemini"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPage;
