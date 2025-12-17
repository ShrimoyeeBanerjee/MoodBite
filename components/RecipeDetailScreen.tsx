
import React, { useState, useEffect } from 'react';
import { Recipe, Ingredient } from '../types';
import { generateRecipeImage } from '../services/geminiService';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  onAddToShopping: (ingredients: Ingredient[]) => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ recipe, onBack, onAddToShopping, isSaved, onToggleSave }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [recipeImage, setRecipeImage] = useState<string | null>(recipe.imageUrl || null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(!recipe.imageUrl);

  useEffect(() => {
    async function fetchImage() {
      if (!recipe.imageUrl && !recipeImage) {
        setIsGeneratingImage(true);
        const img = await generateRecipeImage(recipe.imagePrompt);
        if (img) {
          setRecipeImage(img);
          recipe.imageUrl = img; // Cache in the object for this session
        }
        setIsGeneratingImage(false);
      }
    }
    fetchImage();
  }, [recipe.id, recipe.imagePrompt]);

  const handleShare = async () => {
    const shareData = {
      title: `MoodBite: ${recipe.name}`,
      text: `Check out this recipe I found on MoodBite: ${recipe.name}. ${recipe.description}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  return (
    <div className="relative min-h-screen bg-cozy-beige font-display">
      {/* Background Content Wrapper */}
      <div className={`flex flex-col pb-32 transition-all duration-500 ease-in-out ${isShareModalOpen ? 'blur-md brightness-90 scale-[0.98]' : ''}`}>
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center bg-cozy-beige/90 backdrop-blur-md p-4 pb-2 justify-between max-w-md mx-auto">
          <button onClick={onBack} className="text-slate-900 flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex gap-1 items-center">
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center justify-center rounded-full h-12 w-12 text-slate-900 hover:bg-black/5 transition-colors"
            >
              <span className="material-symbols-outlined">share</span>
            </button>
            <button 
              onClick={onToggleSave}
              className={`flex items-center justify-center rounded-full h-12 w-12 transition-colors ${isSaved ? 'text-maroon' : 'text-slate-900'} hover:bg-black/5`}
            >
              <span className={`material-symbols-outlined ${isSaved ? 'filled-icon' : ''}`}>
                {isSaved ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col pt-20">
          <div className="px-4 py-2">
            <div className="w-full aspect-video bg-warm-gray rounded-xl shadow-lg relative overflow-hidden group">
              {isGeneratingImage ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-pulse bg-gradient-to-br from-warm-gray to-cozy-beige">
                  <span className="material-symbols-outlined text-4xl text-maroon/20 animate-spin">auto_awesome</span>
                  <p className="text-xs font-bold text-maroon/40 uppercase tracking-widest">AI Generating Visual...</p>
                </div>
              ) : recipeImage ? (
                <div 
                  className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-opacity duration-1000" 
                  style={{ backgroundImage: `url(${recipeImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40"></div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-warm-gray text-slate-400">
                  <span className="material-symbols-outlined text-4xl">restaurant</span>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 pt-4 pb-2">
            <h1 className="text-maroon tracking-tight text-[32px] font-bold leading-tight text-left">{recipe.name}</h1>
            <div className="mt-4 flex gap-3 items-start bg-white/40 p-4 rounded-xl border border-maroon/10">
              <span className="text-lg">✨</span>
              <p className="text-slate-700 text-sm font-medium leading-normal">{recipe.description}</p>
            </div>
          </div>

          <div className="flex gap-3 px-4 py-4 flex-wrap">
            {[
              { icon: 'schedule', label: recipe.time },
              { icon: 'equalizer', label: recipe.difficulty },
              { icon: 'local_fire_department', label: recipe.calories }
            ].map((item, idx) => (
              <div key={idx} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-warm-gray/50 px-4">
                <span className="material-symbols-outlined text-[18px] text-maroon">{item.icon}</span>
                <p className="text-slate-800 text-sm font-medium leading-normal">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-maroon/10 my-2"></div>

          <div className="px-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-maroon">Ingredients</h3>
              <span className="text-xs font-medium text-slate-500">{recipe.ingredients.length} Items</span>
            </div>
            <div className="flex flex-col">
              {recipe.ingredients.map((ing, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-maroon/10 px-2 transition-colors">
                  <div className="flex flex-col flex-1 gap-1">
                    <span className="text-base font-bold text-slate-900">{ing.name}</span>
                    <span className="text-sm text-slate-600 leading-relaxed">{ing.amount} {ing.note ? `• ${ing.note}` : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-6">
            <h3 className="text-xl font-bold text-maroon mb-6">Directions</h3>
            <div className="relative flex flex-col gap-8 ml-3">
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-maroon/20 -z-10"></div>
              {recipe.directions.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <div className="shrink-0 size-8 rounded-full bg-maroon text-white flex items-center justify-center font-bold text-sm shadow-md">{i + 1}</div>
                  <div className="flex flex-col gap-1 pb-2">
                    <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 pt-4 pb-12 flex flex-col gap-4">
            <button 
              onClick={() => onAddToShopping(recipe.ingredients)}
              className="flex w-full cursor-pointer items-center justify-center rounded-full h-14 bg-maroon text-white gap-2 text-base font-bold shadow-xl shadow-maroon/20 active:scale-95 transition-all"
            >
              <span>Make shopping list</span>
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            </button>
            
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center justify-center gap-2 py-2 text-maroon font-semibold hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-xl">share</span>
              <span className="text-sm">Share with friends</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal & Backdrop Layer */}
      {isShareModalOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60] bg-black/30 transition-opacity duration-300"
            onClick={() => setIsShareModalOpen(false)}
          />
          
          <div className={`fixed bottom-0 left-0 right-0 z-[70] max-w-md mx-auto bg-[#F7F4EF] rounded-t-[2.5rem] shadow-2xl transition-transform duration-500 ease-out p-6 pb-12 transform ${isShareModalOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-300 rounded-full"></div>
            
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-5 right-5 size-10 bg-black/5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex flex-col items-center mt-6 text-center">
              <div className="size-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-black/5">
                <span className="material-symbols-outlined text-3xl text-maroon">upload</span>
              </div>

              <h2 className="text-2xl font-extrabold text-[#122017] mb-2">Share this recipe</h2>
              <p className="text-gray-500 max-w-[240px] text-sm leading-relaxed mb-10">
                Send this recipe to a friend so they can cook it too.
              </p>

              <div className="flex justify-between w-full max-w-[320px] mb-10">
                {[
                  { id: 'msg', label: 'Message', icon: 'chat_bubble' },
                  { id: 'chat', label: 'Chat', icon: 'forum' },
                  { id: 'copy', label: 'Copy', icon: 'link', action: copyLink },
                  { id: 'more', label: 'More', icon: 'more_horiz', action: handleShare }
                ].map((item) => (
                  <div key={item.id} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={item.action || handleShare}>
                    <div className="size-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-black/5 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-xl text-[#122017]">{item.icon}</span>
                    </div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{item.label}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleShare}
                className="w-full h-16 bg-maroon text-white rounded-full flex items-center justify-center gap-2 font-bold text-lg active:scale-95 transition-all shadow-xl shadow-maroon/20"
              >
                <span className="material-symbols-outlined">share</span>
                Share link
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetailScreen;
