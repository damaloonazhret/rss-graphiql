import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
const ENV = import.meta.env;

const firebaseConfig = {
  apiKey: ENV.VITE_FIREBASE_API_KEY,
  authDomain: ENV.VITE_AUTH_DOMAIN,
  projectId: ENV.VITE_PROJECT_ID,
  storageBucket: ENV.VITE_STORAGE_BUCKET,
  messagingSenderId: ENV.VITE_MESSAGING_SENDER_ID,
  appId: ENV.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerUser = async (name: string, email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  await updateProfile(user, {
    displayName: name,
  });
};

const loginUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export { auth, registerUser, loginUser };
