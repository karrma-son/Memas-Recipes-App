import { useEffect, useState } from 'react';
import { db, ref, onValue, push } from './firebase/firebase';
import type { Recipe } from './types/Recipe';
import RecipeForm from './components/RecipeForm';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';

const knownRecipes: Recipe[] = [];

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const recipesRef = ref(db, 'recipes');
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      const userRecipes = data ? Object.values(data) : [];
      setRecipes([...knownRecipes, ...userRecipes]);
    });
  }, []);

  const handleAddRecipe = (recipe: Recipe) => {
    push(ref(db, 'recipes'), recipe);
  };

  const filtered = recipes.filter(r =>
    r.strMeal.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <h1>
        <span className="M1">M</span>
        <span className="e1">e</span>
        <span className="m2">m</span>
        <span className="a1">a</span>
        <span className="s1">s</span>
      </h1>
      <h2> 
        <span className="R">R</span>
        <span className="e2">e</span>
        <span className="c">c</span>
        <span className="i">i</span>
        <span className="p">p</span>
        <span className="e3">e</span>
        <span className="s2">s</span>
      </h2>

      <RecipeForm onAddRecipe={handleAddRecipe} />
      <SearchBar query={query} setQuery={setQuery} />
      <div className="flex-container">
        {filtered.map((r, i) => (
          <RecipeCard key={i} recipe={r} />
        ))}
      </div>
    </div>
  );
}
