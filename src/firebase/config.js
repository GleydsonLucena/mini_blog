import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxrqnFbS-KE2qMv0QOH87FupFjwlNqvKI",
  authDomain: "mini-blog-5b449.firebaseapp.com",
  projectId: "mini-blog-5b449",
  storageBucket: "mini-blog-5b449.appspot.com",
  messagingSenderId: "760809042716",
  appId: "1:760809042716:web:1894cbd214d09bbc5d80d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }