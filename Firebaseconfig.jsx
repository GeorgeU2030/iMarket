// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMS4vFunvfX7kz-C9UReye8-UPsgVF65w",
  authDomain: "cointech-3ca1a.firebaseapp.com",
  databaseURL: "https://cointech-3ca1a-default-rtdb.firebaseio.com",
  projectId: "cointech-3ca1a",
  storageBucket: "cointech-3ca1a.appspot.com",
  messagingSenderId: "187792871287",
  appId: "1:187792871287:web:d67aa7ead41d1f6294db72"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);