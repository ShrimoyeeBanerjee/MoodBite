
import React from 'react';
import { Recipe } from '../types';

interface RecipeListScreenProps {
  recipes: Recipe[];
  loading: boolean;
  onSelect: (recipe: Recipe) => void;
  onBack: () => void;
}

const RecipeListScreen: React.FC<RecipeListScreenProps> = ({ recipes, loading, onSelect, onBack }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center space-y-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-maroon/20 dark:border-primary/20 rounded-full animate-spin border-t-maroon dark:border-t-primary"></div>
          <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-maroon dark:text-primary filled-icon">soup_kitchen</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Cooking up ideas...</h2>
          <p className="text-gray-500">Gemini is finding the perfect match for your mood.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 mr-4">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Recommended for you</h1>
      </header>

      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => onSelect(recipe)}
            className="bg-white dark:bg-[#1c2e23] p-4 rounded-[1.5rem] shadow-sm flex flex-col gap-3 group cursor-pointer hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full bg-soft-green/50 dark:bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-[#122017] dark:text-primary">
                  {recipe.moodTag}
                </span>
                <span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-0.5 text-xs font-semibold text-orange-800 dark:text-orange-200">
                  {recipe.time}
                </span>
              </div>
              <span className="text-lg">{recipe.emojis[0]}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#122017] dark:text-white group-hover:text-maroon dark:group-hover:text-primary transition-colors">
                {recipe.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {recipe.description}
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="flex -space-x-2">
                {recipe.emojis.map((emoji, i) => (
                  <div key={i} className="size-6 rounded-full bg-gray-200 border-2 border-white dark:border-[#1c2e23] flex items-center justify-center text-[10px]">{emoji}</div>
                ))}
              </div>
              <button className="text-xs font-bold text-maroon dark:text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Recipe <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeListScreen;
