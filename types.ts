
export enum View {
  Home = 'home',
  Search = 'search',
  RecipeDetail = 'recipeDetail',
  ShoppingList = 'shoppingList',
  Success = 'success',
  Saved = 'saved',
  Profile = 'profile'
}

export interface Ingredient {
  name: string;
  amount: string;
  category: 'Produce' | 'Meat & Dairy' | 'Pantry' | 'Spices' | 'Other';
  note?: string;
  checked?: boolean;
}

export interface Direction {
  title: string;
  text: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  directions: Direction[];
  time: string;
  difficulty: string;
  calories: string;
  moodTag: string;
  emojis: string[];
  imagePrompt: string;
  imageUrl?: string;
}

export interface UserState {
  savedRecipes: Recipe[];
  shoppingList: Ingredient[];
  streak: number;
}
