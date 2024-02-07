
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCF19_mneJv3CpR8cEKK4-81hxIBJpeIN8",
  authDomain: "infoweather-d888a.firebaseapp.com",
  projectId: "infoweather-d888a",
  storageBucket: "infoweather-d888a.appspot.com",
  messagingSenderId: "252158383544",
  appId: "1:252158383544:web:c51af0da49a3ed2ad32b4d",
  measurementId: "G-0K3EVYRPVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const analytics = getAnalytics(app);

