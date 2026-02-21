require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log("Config (API Key length):", firebaseConfig.apiKey ? firebaseConfig.apiKey.length : "MISSING");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    console.log("Attempting to connect and read artworks collection...");
    const coll = collection(db, "artworks");
    const snap = await getDocs(coll);
    console.log(`Successfully read ${snap.size} artworks from Firebase.`);
    
    // Attempting a tiny write
    const writeRef = await addDoc(coll, { title: "Test DB Document from Node", delete_me: true });
    console.log(`Successfully wrote test document with ID: ${writeRef.id}`);
    
    process.exit(0);
  } catch (error) {
    console.error("Firebase Test Error:", error);
    process.exit(1);
  }
}

test();
