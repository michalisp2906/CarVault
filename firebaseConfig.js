import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBzRactt9dd9KEomUcQ7-5biT4eaqqZ5Dk',
  authDomain: 'carvault-aa8a1.firebaseapp.com',
  databaseURL: 'https://carvault-aa8a1.firebaseio.com',
  projectId: 'carvault-aa8a1',
  storageBucket: 'carvault-aa8a1.appspot.com',
  messagingSenderId: '409605067281',
  appId: '1:409605067281:android:2df51193fcc102a92017b0',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
