import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "./api/firebase";
import styles from "src/styles/Home.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";

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
      <div className={styles.loginBtn}>
        <button onClick={loginHandler}>ログイン</button>
      </div>
    </div>
  );
}
