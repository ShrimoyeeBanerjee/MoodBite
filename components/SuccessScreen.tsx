
import React from 'react';

interface SuccessScreenProps {
  onReset: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-8 text-center gap-8">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-maroon/5 rounded-full blur-3xl transform scale-150"></div>
        <div className="relative bg-white dark:bg-[#1c2e23] w-48 h-48 rounded-full flex items-center justify-center shadow-xl">
          <span className="material-symbols-outlined text-8xl text-maroon dark:text-primary filled-icon">skillet</span>
          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-3 rounded-full border-4 border-cozy-beige shadow-lg">
            <span className="material-symbols-outlined text-2xl font-bold">check</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-w-xs">
        <h1 className="text-3xl font-bold text-maroon dark:text-primary">Bon Appétit!</h1>
        <p className="text-lg opacity-70 font-medium">
          You've completed the recipe. We hope it tastes as good as it smells!
        </p>
      </div>

      <div className="flex gap-4">
        <div className="bg-white/60 dark:bg-white/5 px-4 py-3 rounded-2xl border border-maroon/5">
          <div className="flex items-center gap-2 text-maroon dark:text-primary font-bold">
            <span className="material-symbols-outlined text-xl">timer</span>
            <span>45m</span>
          </div>
          <span className="text-xs uppercase tracking-wider opacity-50 font-bold">Time spent</span>
        </div>
        <div className="bg-white/60 dark:bg-white/5 px-4 py-3 rounded-2xl border border-maroon/5">
          <div className="flex items-center gap-2 text-maroon dark:text-primary font-bold">
            <span className="material-symbols-outlined text-xl filled-icon">local_fire_department</span>
            <span>Streak</span>
          </div>
          <span className="text-xs uppercase tracking-wider opacity-50 font-bold">3 Days</span>
        </div>
      </div>

      <div className="w-full mt-8 space-y-3">
        <button 
          onClick={onReset}
          className="w-full h-16 bg-maroon text-white rounded-full font-bold text-lg shadow-xl shadow-maroon/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Done cooking
        </button>
        <button 
          onClick={onReset}
          className="w-full h-14 bg-white dark:bg-[#1c2e23] text-maroon border-2 border-transparent rounded-full font-semibold active:scale-95 transition-all"
        >
          Try another recipe
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
