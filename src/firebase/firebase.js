// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDJxps7H6Bm-SYRlpsbK7SSCGgtjWyl4T0",
  authDomain: "joblisting-30954.firebaseapp.com",
  projectId: "joblisting-30954",
  storageBucket: "joblisting-30954.firebasestorage.app",
  messagingSenderId: "960343797836",
  appId: "1:960343797836:web:72de5745f79da09861c4e9",
  measurementId: "G-PX4839NBTG"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to localStorage ");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export default app;



// apiKey: process.env.REACT_APP_apiKey,
// authDomain: process.env.REACT_APP_authDomain,
// projectId: process.env.REACT_APP_projectId,
// storageBucket: process.env.REACT_APP_storageBucket,
// messagingSenderId: process.env.REACT_APP_messagingSenderId,
// appId: process.env.REACT_APP_appId,
// measurementId: process.env.REACT_APP_measurementId