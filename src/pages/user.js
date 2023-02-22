import Header from "components/Header";
import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import styles from "src/styles/user.module.css";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'src/pages/api/firebase'
import { useEffect, useState } from "react";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export default function User() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const handleRegister = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, password)
      console.log("success");
    } catch (e) {
      console.log("--register error--");
      console.log(e);
    }
  }
  
  return (
    <Layout>
      <Header user={router.query.loginId} />
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} >登録</button>
    </Layout>
  );
}
