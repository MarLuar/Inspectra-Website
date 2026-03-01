import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

/**
 * Firebase configuration interface
 */
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Firebase configuration - same as mobile app
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBfy3ZZL9DLil5UHzHCooh-teGbV8se97A",
  authDomain: "inspectra-e1de5.firebaseapp.com",
  projectId: "inspectra-e1de5",
  storageBucket: "inspectra-e1de5.firebasestorage.app",
  messagingSenderId: "147206083254",
  appId: "1:147206083254:web:071a42f530c432113d8c17",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);

export default app;
