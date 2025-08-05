// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const form = document.getElementById('recipeForm');
const titleIn = document.getElementById('title');
const catIn = document.getElementById('category');
const areaIn = document.getElementById('area');
const instrIn = document.getElementById('instructions');
const imgIn = document.getElementById('image');
const recipeCont = document.getElementById('knownRecipeContainer');
const searchInput = document.getElementById('recipeSearch');
const micBtn = document.getElementById('micBtn');
const instrField = document.getElementById('instructions');


document.addEventListener('DOMContentLoaded', () => {
const firebaseConfig = {

  apiKey: "AIzaSyDZykzbTv_Z2rbyGGE0Jsad6P1-juL2fgo",

  authDomain: "memas-recipes.firebaseapp.com",

  databaseURL: "https://memas-recipes-default-rtdb.firebaseio.com",

  projectId: "memas-recipes",

  storageBucket: "memas-recipes.firebasestorage.app",

  messagingSenderId: "1046994662322",

  appId: "1:1046994662322:web:58bac6b5b5bbfa61716aab"

};



const app = initializeApp(firebaseConfig); 
const db = getDatabase(app);
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


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newRecipe = {
    strMeal: titleIn.value,
    strCategory: catIn.value,
    strArea: areaIn.value,
    strInstructions: instrIn.value,
    strMealThumb: imgIn.value
  };

  console.log("🚀 Attempting to push:", newRecipe);

  push(recipesRef, newRecipe)
    .then(() => console.log("✅ Successfully pushed to Firebase"))
    .catch(err => console.error("❌ Push failed:", err));

  form.reset();
});

micBtn.addEventListener('click', () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  micBtn.textContent = "🎤 Listening...";

  recognition.onresult = (event) => {
    const speech = event.results[0][0].transcript;
    instrField.value += (instrField.value ? '\n' : '') + speech;
    micBtn.textContent = "🎙️ Speak Again";
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    micBtn.textContent = "❌ Try Again";
  };

  recognition.onend = () => {
    if (micBtn.textContent === "🎤 Listening...") {
      micBtn.textContent = "🎙️ Speak";
    }
  };
});

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


recipeCont.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle')) {
    const card = e.target.closest('.recipe-card');
    card.classList.toggle('open');
  }
});


onValue(recipesRef, (snapshot) => {
  const data = snapshot.val();
  const userRecipes = data ? Object.values(data) : [];

  console.log('Known Recipes:', knownRecipes);
  console.log('User Recipes:', userRecipes);

  const all = [...knownRecipes, ...userRecipes];
  renderRecipes(all, recipeCont);
});


searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.recipe-card');
  cards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = name.includes(query) ? '' : 'none';
  });
});

});
