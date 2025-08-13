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
      {recipe.strMealThumb && <img src={recipe.strMealThumb} alt={recipe.strMeal} />}
      <p>
        <strong>{recipe.strCategory}</strong>
      </p>
      <button className="toggle" onClick={() => setOpen(!open)}>
        {open ? "Hide Instructions" : "View Instructions"}
      </button>
      {open && (
        <>
          {recipe.ingredients?.length > 0 && (
            <table className="ingredients-table">
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredients.map((ing, idx) => (
                  <tr key={idx}>
                    <td>{ing.name}</td>
                    <td>{ing.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="instructions">
            {recipe.strInstructions.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
