import { useState } from 'react';
import type { Recipe } from '../types/Recipe';

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="recipe-card">
      <h3>{recipe.strMeal}</h3>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p><strong>{recipe.strArea}</strong> – {recipe.strCategory}</p>
      <button onClick={() => setOpen(!open)}>
        {open ? 'Hide Instructions' : 'View Instructions'}
      </button>
      {open && (
        <div className="instructions" dangerouslySetInnerHTML={{ __html: recipe.strInstructions.replace(/\n/g, '<br>') }} />
      )}
    </div>
  );
}
