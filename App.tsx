
import React, { useState, useEffect } from 'react';
import { View, Recipe, Ingredient } from './types';
import HomeScreen from './components/HomeScreen';
import RecipeListScreen from './components/RecipeListScreen';
import RecipeDetailScreen from './components/RecipeDetailScreen';
import ShoppingListScreen from './components/ShoppingListScreen';
import SuccessScreen from './components/SuccessScreen';
import SavedRecipesScreen from './components/SavedRecipesScreen';
import Navigation from './components/Navigation';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2800); // Slightly longer than the loading bar for a smooth transition
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (view: View, recipe?: Recipe) => {
    if (recipe) setSelectedRecipe(recipe);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const addToShoppingList = (ingredients: Ingredient[]) => {
    setShoppingList(prev => [...prev, ...ingredients.map(i => ({ ...i, checked: false }))]);
    setCurrentView(View.ShoppingList);
  };

  const toggleSaved = (recipe: Recipe) => {
    setSavedRecipes(prev => {
      const isSaved = prev.find(r => r.id === recipe.id);
      if (isSaved) return prev.filter(r => r.id !== recipe.id);
      return [...prev, recipe];
    });
  };

  const renderView = () => {
    switch (currentView) {
      case View.Home:
        return <HomeScreen 
          onSearch={(query) => { setSearchQuery(query); setCurrentView(View.Search); }}
          setLoading={setLoading}
          setSearchResults={setSearchResults}
        />;
      case View.Search:
        return <RecipeListScreen 
          recipes={searchResults} 
          loading={loading}
          onSelect={(r) => navigateTo(View.RecipeDetail, r)}
          onBack={() => setCurrentView(View.Home)}
        />;
      case View.RecipeDetail:
        return selectedRecipe ? (
          <RecipeDetailScreen 
            recipe={selectedRecipe}
            onBack={() => setCurrentView(View.Search)}
            onAddToShopping={addToShoppingList}
            isSaved={savedRecipes.some(r => r.id === selectedRecipe.id)}
            onToggleSave={() => toggleSaved(selectedRecipe)}
          />
        ) : null;
      case View.ShoppingList:
        return <ShoppingListScreen 
          items={shoppingList}
          setItems={setShoppingList}
          onBack={() => setCurrentView(View.RecipeDetail)}
          onDone={() => setCurrentView(View.Success)}
        />;
      case View.Success:
        return <SuccessScreen onReset={() => {
          setShoppingList([]);
          setCurrentView(View.Home);
        }} />;
      case View.Saved:
        return <SavedRecipesScreen 
          recipes={savedRecipes} 
          onSelect={(r) => navigateTo(View.RecipeDetail, r)}
        />;
      default:
        return <HomeScreen onSearch={setSearchQuery} setLoading={setLoading} setSearchResults={setSearchResults} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-cozy-beige dark:bg-background-dark shadow-2xl relative overflow-hidden flex flex-col">
      {isSplashVisible && <SplashScreen />}
      
      <main className={`flex-1 pb-24 transition-opacity duration-1000 ${isSplashVisible ? 'opacity-0' : 'opacity-100'}`}>
        {renderView()}
      </main>
      
      {!isSplashVisible && (
        <Navigation currentView={currentView} onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;
