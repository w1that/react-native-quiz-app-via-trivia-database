import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCzi2JSmQaM1Mn7DO0AuENQVu85XjgEDok",
  authDomain: "trivial-react-native.firebaseapp.com",
  projectId: "trivial-react-native",
  storageBucket: "trivial-react-native.appspot.com",
  messagingSenderId: "181510389509",
  appId: "1:181510389509:web:7d8e8dd72bb1c346d3c16c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
