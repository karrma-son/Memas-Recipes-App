import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getStorage } from 'firebase/storage';

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
const storage = getStorage(app);

export { db, ref, push, onValue, storage };
