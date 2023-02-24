import { useRouter } from "next/router";
import { useRef, useState } from "react";
import db, { auth } from "./api/firebase";
import styles from "src/styles/Home.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

export default function Home() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
  const ref = useRef([])

  const loginHandler = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, loginId, password);
      ref.current = [...ref.current, result.user.email]
      const q = query(
        collection(db, "users"),
        where("email", "==", result.user.email)
        );
      const querySnap = await getDocs(q);
      querySnap.forEach((d) => ref.current = [...ref.current, d.data().permission])
      route.push(
        { pathname: "/top", query: { loginId: loginId, permission: ref.current[1]} },
        "/top"
      );
    } catch (err) {
      console.log("--Login Error--");
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>フロント業務管理ツール</span>
        <h1>Frontman</h1>
      </div>
      <form className={styles.loginForm}>
        <input
          type="text"
          placeholder="ログイン用メールアドレス"
          onChange={(e) => {
            setLoginId(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="パスワード"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </form>
      <div className={styles.loginBtn}>
        <button onClick={loginHandler}>ログイン</button>
      </div>
    </div>
  );
}
