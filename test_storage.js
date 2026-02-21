import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function testStorage() {
    console.log("Testing Firebase Storage...");
    try {
        const storageRef = ref(storage, "test/test.txt");
        console.log("Uploading test file...");
        const snapshot = await uploadString(storageRef, "Hello World");
        console.log("Upload successful!");
        const url = await getDownloadURL(snapshot.ref);
        console.log("Download URL:", url);
        process.exit(0);
    } catch (err) {
        console.error("Storage Error:", err);
        process.exit(1);
    }
}

testStorage();
