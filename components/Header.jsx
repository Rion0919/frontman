import React, { memo, useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "src/styles/header.module.css";
import db, { auth } from "../src/pages/api/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { collection, getDocs, query, where } from "firebase/firestore";

const Header = ({ title, userId, back }) => {
  const [loginUser, setLoginUser] = useState(userId);
  const [permission, setPermission] = useState("");
  const route = useRouter();
  const ref = useRef([]);
  const toTop = () => {
    route.push({ pathname: "/top", query: {data: ref.current[1]}});
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        ref.current = [...ref.current, user.email]
        setLoginUser(user.email.substring(0, user.email.indexOf("@")));
        const fetch = async () => {
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const querySnap = await getDocs(q);
          querySnap.forEach((d) => {
            ref.current = [...ref.current, d.data().permission]
            setPermission(d.data().permission);
          });
        };
        fetch();
      } else {
        route.push("/");
      }
    });
  }, []);
  const onClickSignOut = async () => {
    await signOut(auth);
    console.log("sign out");
    route.push("/");
  };
  return (
    <div>
      <Head>
        <title>Frontman</title>
        <meta name="description" content="front manegement system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/hotel.ico" />
      </Head>
      {back && (
        <span onClick={toTop} className={styles.backIcon}>
          ←
        </span>
      )}
      <div className={styles.header}>
        <h1>Frontman</h1>
        {title && <span className={styles.headerTitle}>{title}</span>}
        <div className={styles.userInfo}>
          {permission === "管理者" && (
            <span className={styles.rootStyle}>管理者</span>
          )}
          <span className={styles.userName}>{loginUser}</span>
          <button className={styles.logout} onClick={onClickSignOut}>
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
