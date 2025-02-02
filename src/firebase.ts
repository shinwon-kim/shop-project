// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6t-OjMqDIRaa304-D3RuNCszZ1ggxFNU",
  authDomain: "shop-project-16fe2.firebaseapp.com",
  projectId: "shop-project-16fe2",
  storageBucket: "shop-project-16fe2.firebasestorage.app",
  messagingSenderId: "349860325961",
  appId: "1:349860325961:web:aaca6dc9a0e3f6eed1ad98",
  measurementId: "G-FHKZ45N443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app); //인증

export const db = getFirestore(app); //파이어스토어

// export default analytics;
export default app;