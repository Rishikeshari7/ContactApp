// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0rXVwep2e8J-GmYboLrj8ER8X16z3vK4",
  authDomain: "vite-contact-app12.firebaseapp.com",
  projectId: "vite-contact-app12",
  storageBucket: "vite-contact-app12.appspot.com",
  messagingSenderId: "495892122919",
  appId: "1:495892122919:web:e2c0f1a6e0dbd5a2c6ed02"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);