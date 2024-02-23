import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO : mettre les valeurs de apiKey et appId dans un fichier .env.local

const firebaseConfig = {
  apiKey: "AIzaSyActMsDW_xN3KG4CjHWrwy7gREiXS9JuJ0",
  authDomain: "co-voit-easy.firebaseapp.com",
  projectId: "co-voit-easy",
  storageBucket: "co-voit-easy.appspot.com",
  messagingSenderId: "430358298271",
  appId: "1:430358298271:web:477404abc52170e2ec6caa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
