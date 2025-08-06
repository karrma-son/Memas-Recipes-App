import React, { useState } from 'react';
import type { Recipe } from '../types/Recipe';

interface Props {
  onAddRecipe: (recipe: Recipe) => void;
}

export default function RecipeForm({ onAddRecipe }: Props) {
  const [formData, setFormData] = useState<Recipe>({
    strMeal: '',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    strMealThumb: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecipe(formData);
    setFormData({
      strMeal: '',
      strCategory: '',
      strArea: '',
      strInstructions: '',
      strMealThumb: ''
    });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <input id="strMeal" placeholder="Title" value={formData.strMeal} onChange={handleChange} required />
      <input id="strCategory" placeholder="Category" value={formData.strCategory} onChange={handleChange} required />
      <input id="strArea" placeholder="Area" value={formData.strArea} onChange={handleChange} required />
      <textarea id="strInstructions" placeholder="Instructions" value={formData.strInstructions} onChange={handleChange} required />
      <input id="strMealThumb" placeholder="Image URL" value={formData.strMealThumb} onChange={handleChange} />
      <button type="submit">Add Recipe</button>
    </form>
  );
}
