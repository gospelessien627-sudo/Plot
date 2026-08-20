
// Initialize Firebase
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeMZYPPk-u9YxRFa9pSrQcbnYh5031AWo",
  authDomain: "gold-74f99.firebaseapp.com",
  projectId: "gold-74f99",
  storageBucket: "gold-74f99.firebasestorage.app",
  messagingSenderId: "97374981830",
  appId: "1:97374981830:web:b059a79d75c6dc1836d1c7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


