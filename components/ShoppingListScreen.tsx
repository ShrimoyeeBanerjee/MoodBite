
import React from 'react';
import { Ingredient } from '../types';

interface ShoppingListScreenProps {
  items: Ingredient[];
  setItems: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  onBack: () => void;
  onDone: () => void;
}

const ShoppingListScreen: React.FC<ShoppingListScreenProps> = ({ items, setItems, onBack, onDone }) => {
  const checkedCount = items.filter(i => i.checked).length;
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0;

  const toggleItem = (index: number) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, checked: !item.checked } : item));
  };

  const groupedItems = items.reduce((acc, item, index) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push({ ...item, originalIndex: index });
    return acc;
  }, {} as Record<string, (Ingredient & { originalIndex: number })[]>);

  return (
    <div className="relative flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-6 sticky top-0 bg-cozy-beige dark:bg-background-dark z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-black/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center">Shopping list</h1>
        <div className="size-10"></div>
      </header>

      <div className="px-6 py-4 flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <p className="text-sm font-semibold opacity-60 uppercase tracking-wider">Progress</p>
          <p className="text-lg font-bold text-maroon dark:text-primary">
            {checkedCount}/{items.length} <span className="text-base font-normal opacity-70">items</span>
          </p>
        </div>
        <div className="h-3 w-full rounded-full bg-warm-gray dark:bg-[#1f3326] overflow-hidden">
          <div 
            className="h-full rounded-full bg-maroon dark:bg-primary transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="px-4 pb-40 space-y-6">
        {/* Fix: Explicitly cast Object.entries to ensure catItems is correctly typed as an array */}
        {(Object.entries(groupedItems) as [string, (Ingredient & { originalIndex: number })[]][]).map(([category, catItems]) => (
          <div key={category}>
            <h3 className="text-xs font-extrabold uppercase tracking-widest opacity-40 px-2 mb-2">{category}</h3>
            <div className="space-y-2">
              {catItems.map((item) => (
                <label 
                  key={item.originalIndex}
                  className={`group flex items-center gap-4 p-4 rounded-[1.5rem] shadow-sm border border-transparent transition-all cursor-pointer ${
                    item.checked ? 'bg-transparent opacity-60' : 'bg-white dark:bg-[#1c2e23] hover:border-maroon/10'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={item.checked} 
                    onChange={() => toggleItem(item.originalIndex)}
                    className="h-7 w-7 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-transparent text-maroon focus:ring-0"
                  />
                  <div className="flex flex-col">
                    <span className={`text-base font-semibold leading-tight ${item.checked ? 'line-through' : ''}`}>
                      {item.amount} {item.name}
                    </span>
                    {item.note && <span className="text-xs opacity-50 mt-0.5">{item.note}</span>}
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 left-0 right-0 px-6 max-w-md mx-auto">
        <button 
          onClick={onDone}
          className="w-full h-14 bg-maroon text-white rounded-full font-bold text-lg shadow-lg shadow-maroon/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">check_circle</span>
          Done shopping
        </button>
      </div>
    </div>
  );
};

export default ShoppingListScreen;
