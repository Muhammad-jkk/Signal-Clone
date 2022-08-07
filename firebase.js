import { initializeApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBdXycRCmCWu8nl1defz-EK7ky2SHnCmjQ",
  authDomain: "signal-clone-8f452.firebaseapp.com",
  projectId: "signal-clone-8f452",
  storageBucket: "signal-clone-8f452.appspot.com",
  messagingSenderId: "788531865652",
  appId: "1:788531865652:web:1d45484a098c70eaab4261",
  measurementId: "G-VKQVBKHRNN"
};

let app= initializeApp(firebaseConfig);;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} 
// else {
//   app = getApps()
// }
const auth = getAuth(app);
const db = getFirestore(app);

export { db,auth };