import { useState } from 'react';
import { storage } from '../firebase/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Recipe } from '../types/Recipe';

interface Props {
  onAddRecipe: (recipe: Recipe) => void;
}

export default function RecipeForm({ onAddRecipe }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleIngredientChange = (index: number, field: 'name' | 'amount', value: string) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setUploading(true);

    let imageUrl = '';
    if (imageFile) {
      const imgRef = storageRef(storage, `recipes/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imgRef, imageFile);
      imageUrl = await getDownloadURL(imgRef);
    }

    const newRecipe: Recipe = {
      strMeal: title.trim(),
      strCategory: category.trim(),
      ingredients: ingredients.filter(i => i.name.trim() || i.amount.trim()),
      strInstructions: instructions.trim() || 'No instructions provided.',
      strMealThumb: imageUrl || '/default-placeholder.png'
    };

    onAddRecipe(newRecipe);

    setTitle('');
    setCategory('');
    setInstructions('');
    setIngredients([{ name: '', amount: '' }]);
    setImageFile(null);
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />

      <h4>Ingredients</h4>
      {ingredients.map((ing, idx) => (
        <div key={idx} >
          <input
            value={ing.name}
            onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
            placeholder="Ingredient"
          />
          <input
            value={ing.amount}
            onChange={(e) => handleIngredientChange(idx, 'amount', e.target.value)}
            placeholder="Amount"
          />
        </div>
      ))}
      <button type="button" onClick={addIngredientRow}>
        + Add Ingredient
      </button>

      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" />

      <input title="images" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />

      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Add Recipe'}
      </button>
    </form>
  );
}
