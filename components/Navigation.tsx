
import React from 'react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const tabs = [
    { view: View.Home, label: 'Home', icon: 'home' },
    { view: View.Search, label: 'Recipes', icon: 'restaurant_menu' },
    { view: View.Saved, label: 'Saved', icon: 'favorite' },
    { view: View.ShoppingList, label: 'Shopping', icon: 'list_alt' }
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 px-4 z-50 pointer-events-none">
      <nav className="max-w-md mx-auto h-[72px] bg-white/90 dark:bg-[#1a2b22]/90 backdrop-blur-md rounded-full flex items-center justify-around px-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-white/20 dark:border-white/5 pointer-events-auto">
        {tabs.map((tab) => {
          const isActive = currentView === tab.view || 
                           (tab.view === View.Search && currentView === View.RecipeDetail);
          
          return (
            <button 
              key={tab.view}
              onClick={() => onNavigate(tab.view)}
              className={`flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-300 ${
                isActive ? 'text-maroon dark:text-primary scale-110' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <div className={`rounded-full p-2 flex flex-col items-center transition-all ${
                isActive ? 'bg-maroon/10 dark:bg-primary/10' : ''
              }`}>
                <span className={`material-symbols-outlined text-2xl ${isActive ? 'filled-icon' : ''}`}>
                  {tab.icon}
                </span>
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
