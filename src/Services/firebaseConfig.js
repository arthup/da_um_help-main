import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFOqt2t6gzSr37onhzqiTIvabRT6RKXjc",
  authDomain: "da-um-help-e3fff.firebaseapp.com",
  projectId: "da-um-help-e3fff",
  storageBucket: "da-um-help-e3fff.appspot.com",
  messagingSenderId: "62705775547",
  appId: "1:62705775547:web:db19cadd7727e71615ca9e",
  storageBucket: 'gs://da-um-help-e3fff.appspot.com'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
