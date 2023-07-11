// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFOqt2t6gzSr37onhzqiTIvabRT6RKXjc",
  authDomain: "da-um-help-e3fff.firebaseapp.com",
  projectId: "da-um-help-e3fff",
  storageBucket: "da-um-help-e3fff.appspot.com",
  messagingSenderId: "62705775547",
  appId: "1:62705775547:web:db19cadd7727e71615ca9e",
  storageBucket: 'gs://da-um-help-e3fff.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
