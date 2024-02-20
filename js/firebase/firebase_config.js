// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "./firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "./firebase-firestore-lite.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAgT2C7xn5vF0YqTwkG34kTGh7aOCqPgI",
  authDomain: "u-finance.firebaseapp.com",
  projectId: "u-finance",
  storageBucket: "u-finance.appspot.com",
  messagingSenderId: "864703235336",
  appId: "1:864703235336:web:f7bf9cbc77c2f3336ed8bd"
};

// Initialize Firebase
const firebase_app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebase_app);

async function get_database_elements(db_name){
  const q = query(collection(db, db_name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

async function add_database_url(name, url, ticker=false){
  try {
    const docRef = await addDoc(collection(db, "propose"), {
      name: name,
      url: url,
      ticker: ticker,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

globalThis.firebase_app = firebase_app;
globalThis.db = db;
globalThis.get_database_elements = get_database_elements;
globalThis.add_database_url = add_database_url;