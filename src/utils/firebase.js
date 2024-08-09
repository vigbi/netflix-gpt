// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWpVI7yJOduEVL94jS2RfTT5GGCMj9aA0",
  authDomain: "netflixgpt-29063.firebaseapp.com",
  projectId: "netflixgpt-29063",
  storageBucket: "netflixgpt-29063.appspot.com",
  messagingSenderId: "982825283965",
  appId: "1:982825283965:web:8ca9501be3532dd18b9c14",
  measurementId: "G-NHB8RPXPKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();
