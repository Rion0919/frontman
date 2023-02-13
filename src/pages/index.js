import styles from "@/styles/home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter()

  const loginHandler = () => {
    console.log(`login successed ${loginId}/${password}`);
    route.push({ pathname: "/top", query: {loginId: loginId, password: password} }, "/top")
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>フロント業務管理ツール</span>
        <h1>Frontman</h1>
      </div>
      <form className={styles.loginForm}>
        <input
          type="text"
          placeholder="ログインID"
          onChange={(e) => {
            setLoginId(e.target.value)
            console.log(loginId);
          }}
        />
        <input
          type="password"
          placeholder="パスワード"
          onChange={(e) => {
            setPassword(e.target.value)
            console.log(password);
          }}
        />
      </form>
      <div className={styles.forgotPass}>
        <Link href={{ pathname: "/top", query: {loginId: loginId, password: password} }} as="/top" legacyBehavior>
          <a className={styles.link}>パスワードを忘れた場合はこちら</a>
        </Link>
      </div>
      <div className={styles.loginBtn}>
        <button onClick={loginHandler}>ログイン</button>
      </div>
    </div>
  );
}
