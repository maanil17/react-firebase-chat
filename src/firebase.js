
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyDSpRWlO5gHKzOe3HZNJZRC5LSXhFo1gCA",
  authDomain: "chat-174d4.firebaseapp.com",
  projectId: "chat-174d4",
  storageBucket: "chat-174d4.appspot.com",
  messagingSenderId: "611831866515",
  appId: "1:611831866515:web:e6bdc54b5db9090ea4d966"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider(); 
export const db = getFirestore(app)
