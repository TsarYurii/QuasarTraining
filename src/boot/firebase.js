import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxEvnzk3ePahiu3GpD1erD4Gw0jWzVWT0",
  authDomain: "quasartraining-49d30.firebaseapp.com",
  projectId: "quasartraining-49d30",
  storageBucket: "quasartraining-49d30.appspot.com",
  messagingSenderId: "927877166578",
  appId: "1:927877166578:web:c169fd86bcdb65d7d9276b",
  measurementId: "G-D9FM4SDJ1C",
  // storageBucket: "gs://quasartraining-49d30.appspot.com/"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export default db