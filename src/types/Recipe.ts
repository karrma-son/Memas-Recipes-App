export interface Recipe {
  strMeal: string;
  strCategory: string;
  ingredients: { name: string; amount: string }[];
  strInstructions: string;
  strMealThumb: string;
}
