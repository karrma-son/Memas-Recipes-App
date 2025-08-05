// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {

// Initialize app FIRST
const firebaseConfig = {

  apiKey: "AIzaSyDZykzbTv_Z2rbyGGE0Jsad6P1-juL2fgo",

  authDomain: "memas-recipes.firebaseapp.com",

  databaseURL: "https://memas-recipes-default-rtdb.firebaseio.com",

  projectId: "memas-recipes",

  storageBucket: "memas-recipes.firebasestorage.app",

  messagingSenderId: "1046994662322",

  appId: "1:1046994662322:web:58bac6b5b5bbfa61716aab"

};



const app = initializeApp(firebaseConfig); // 🔥 Initialize it
const db = getDatabase(app);   // ✅ Now get the database
const recipesRef = ref(db, 'recipes');

const knownRecipes = [
  {
    id: "known-1",
    strMeal: "Classic Spaghetti",
    strCategory: "Pasta",
    strArea: "Italy",
    strInstructions: "Boil pasta. Cook sauce. Mix and serve hot.",
    strMealThumb: "images/wallpaper1.jpg"
  },
  {
    id: "known-2",
    strMeal: "Avocado Toast",
    strCategory: "Breakfast",
    strArea: "USA",
    strInstructions: "Toast bread. Mash avocado. Spread on toast.",
    strMealThumb: "images/young_leaf_icon.jpg"
  }
];

// DOM Elements
const form = document.getElementById('recipeForm');
const titleIn = document.getElementById('title');
const catIn = document.getElementById('category');
const areaIn = document.getElementById('area');
const instrIn = document.getElementById('instructions');
const imgIn = document.getElementById('image');
const recipeCont = document.getElementById('knownRecipeContainer');
const searchInput = document.getElementById('recipeSearch');

// Submit handler to push to Firebase
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newRecipe = {
    strMeal: titleIn.value,
    strCategory: catIn.value,
    strArea: areaIn.value,
    strInstructions: instrIn.value,
    strMealThumb: imgIn.value
  };

  push(recipesRef, newRecipe);

  form.reset();
});

// Render function
function renderRecipes(list, container) {
  container.innerHTML = '';
  list.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h3>${recipe.strMeal}</h3>
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
      <p><strong>${recipe.strArea}</strong> – ${recipe.strCategory}</p>
      <button class="toggle">View Instructions</button>
      <div class="instructions">${recipe.strInstructions.replace(/\n/g, '<br>')}</div>
    `;
    container.appendChild(card);
  });
}

// Toggle instructions
recipeCont.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle')) {
    const card = e.target.closest('.recipe-card');
    card.classList.toggle('open');
  }
});

// Firebase listener to sync in real-time
onValue(recipesRef, (snapshot) => {
  const data = snapshot.val();
  const userRecipes = data ? Object.values(data) : [];

  console.log('Known Recipes:', knownRecipes);
  console.log('User Recipes:', userRecipes);

  const all = [...knownRecipes, ...userRecipes];
  renderRecipes(all, recipeCont);
});

// Search filter
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.recipe-card');
  cards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = name.includes(query) ? '' : 'none';
  });
});

  // all your code here
});
