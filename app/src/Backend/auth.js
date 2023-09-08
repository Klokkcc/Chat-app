import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "<YOUR_KEY>",
  authDomain: "<YOUR_URL>",
  databaseURL: "<YOUR_URL>",
  projectId: "<YOUR_ID>",
  storageBucket: "<YOUR_BUCKET>",
  messagingSenderId: "<YOUR_ID>",
  appId: "<YOUR_ID>"
};
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage=getStorage();
export const getdata=getDatabase();
export const db=getFirestore();