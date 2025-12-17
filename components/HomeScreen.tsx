
import React, { useState } from 'react';
import { generateRecipes } from '../services/geminiService';
import { Recipe } from '../types';

interface HomeScreenProps {
  onSearch: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setSearchResults: (recipes: Recipe[]) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSearch, setLoading, setSearchResults }) => {
  const [mood, setMood] = useState('');

  const handleInspireMe = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    onSearch(mood);
    const results = await generateRecipes(mood);
    setSearchResults(results);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </header>

      <div className="mb-10 opacity-90">
        <span className="material-symbols-outlined text-6xl text-maroon dark:text-primary animate-pulse filled-icon">soup_kitchen</span>
      </div>
      
      <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-maroon dark:text-primary leading-tight">
        What are you in<br/>the mood for today?
      </h1>
      <p className="text-lg opacity-60 mb-8 max-w-[280px]">
        Describe your cravings, ingredients you have, or just how you're feeling.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-maroon dark:group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input 
            className="block w-full pl-12 pr-4 py-4 rounded-xl border-2 border-transparent bg-white dark:bg-[#1c2e23] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-maroon/20 dark:focus:border-primary/30 shadow-sm transition-all text-lg" 
            placeholder="e.g. Spicy comfort food..." 
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInspireMe()}
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-center mt-2">
          {['☕ Breakfast', '🥗 Healthy', '⏱️ Quick'].map((tag) => (
            <button 
              key={tag}
              onClick={() => { setMood(tag.split(' ')[1]); }}
              className="px-4 py-2 bg-white/50 dark:bg-[#1c2e23]/50 rounded-full text-sm font-medium hover:bg-white dark:hover:bg-[#1c2e23] transition-colors border border-transparent hover:border-maroon/10 dark:hover:border-primary/20" 
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 w-full px-6">
        <button 
          onClick={handleInspireMe}
          className="w-full h-14 bg-maroon text-white dark:bg-primary dark:text-[#122017] rounded-full font-bold text-lg shadow-lg shadow-maroon/20 dark:shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          <span className="material-symbols-outlined animate-pulse text-xl">auto_awesome</span>
          Inspire Me
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
