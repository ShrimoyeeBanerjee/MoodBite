
import React from 'react';
import { Recipe } from '../types';

interface SavedRecipesScreenProps {
  recipes: Recipe[];
  onSelect: (recipe: Recipe) => void;
}

const SavedRecipesScreen: React.FC<SavedRecipesScreenProps> = ({ recipes, onSelect }) => {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Saved Recipes</h1>
        <p className="text-gray-500">Your favorite mood-boosters</p>
      </header>

      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="size-20 bg-warm-gray/50 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-maroon/50">bookmark_border</span>
          </div>
          <h3 className="text-lg font-bold">No saved recipes yet</h3>
          <p className="text-sm text-gray-500 max-w-[200px]">Start exploring recipes based on your mood and save them here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recipes.map(recipe => (
            <div 
              key={recipe.id}
              onClick={() => onSelect(recipe)}
              className="bg-white dark:bg-[#1c2e23] p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-maroon bg-maroon/10 px-2 py-1 rounded-full">{recipe.moodTag}</span>
                <span className="text-lg">{recipe.emojis[0]}</span>
              </div>
              <h3 className="font-bold text-lg">{recipe.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipesScreen;
