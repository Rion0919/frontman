import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import db, { auth } from "./api/firebase";
import styles from "src/styles/Home.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";

export default function Home() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const loginHandler = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, loginId, password);
      console.log(`login successed ${loginId}/${password}`);
      const user = result.user;
      console.log(user);
      const userDoc = doc(db, "users", user.uid)
      const docSnap = await getDoc(userDoc)
      if(!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          password: password,
        })
        console.log("new user added");
      }
      route.push(
        { pathname: "/top", query: { loginId: loginId, password: password } },
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
      <div className={styles.forgotPass}>
        <Link
          href={{
            pathname: "/top",
            query: { loginId: loginId, password: password },
          }}
          as="/top"
          legacyBehavior
        >
          <a className={styles.link}>パスワードを忘れた場合はこちら</a>
        </Link>
      </div>
      <div className={styles.loginBtn}>
        <button onClick={loginHandler}>ログイン</button>
      </div>
    </div>
  );
}
