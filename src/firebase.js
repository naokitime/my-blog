import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiTeSbJTnGN-LBU7ImrqgHTKFMhbfVa7c",
  authDomain: "blog-8d9a9.firebaseapp.com",
  projectId: "blog-8d9a9",
  storageBucket: "blog-8d9a9.appspot.com",
  messagingSenderId: "144739472508",
  appId: "1:144739472508:web:fad0bece0058c9e97965f9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
