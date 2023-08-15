// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8wFXMvbgJ3GcMY5XMz3jUTfwF7LjQi7o",
  authDomain: "expensify-aca45.firebaseapp.com",
  projectId: "expensify-aca45",
  storageBucket: "expensify-aca45.appspot.com",
  messagingSenderId: "1087774067983",
  appId: "1:1087774067983:web:a2fdf7c35e9ef1edfe827a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth= getAuth(app);

export const tripsRef= collection(db, "trips");
export const expensesRef= collection(db, "expenses");

export default app;