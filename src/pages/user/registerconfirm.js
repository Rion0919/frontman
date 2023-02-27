import Header from "components/Header";
import { Layout } from "components/Layout";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../api/firebase";
import styles from "src/styles/registerconfirm.module.css";

export default function Registerconfirm() {
  const route = useRouter();
  const clickLogout = async () => {
    await signOut(auth);
    route.push("/");
  };
  return (
    <Layout>
      <Header title="ユーザー登録完了" />
      <div className={styles.container}>
        <div className={styles.confirmText}>
            <p>ユーザー登録が完了しました。一度ログインし直してください</p>
            <span>ユーザーId：</span>
            <p className={styles.userInfo}>{route.query.userId}</p>
            <span>メールアドレス：</span>
            <p className={styles.userInfo}>{route.query.email}</p>
        </div>
        <button onClick={clickLogout} className={styles.logoutBtn}>ログアウト</button>
      </div>
    </Layout>
  );
}
