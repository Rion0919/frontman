import React, { memo, useEffect, useState } from "react";
import Head from "next/head";
import styles from "src/styles/header.module.css";
import { auth } from "../src/pages/api/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/router";

const Header = ({ title, userId, back }) => {
  const [loginUser, setLoginUser] = useState(userId)
  const route = useRouter()
  const toTop = () => {
    route.push({pathname: "/top"})
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setLoginUser(user.email.substring(0, user.email.indexOf("@")))
      } else {
        console.log('login please')
        route.push('/')
      }
    })
  })
  const onClickSignOut = async () => {
    await signOut(auth)
    console.log("sign out")
    route.push("/")
  }
  return (
    <div>
      <Head>
        <title>Frontman</title>
        <meta name="description" content="front manegement system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/hotel.ico" />
      </Head>
        {back && <span onClick={toTop} className={styles.backIcon}>←</span>}
      <div className={styles.header}>
        <h1>Frontman</h1>
        {title && <span className={styles.headerTitle}>{title}</span>}
        <div className={styles.userInfo}>
          <span className={styles.userName}>{loginUser}</span>
          <button className={styles.logout} onClick={onClickSignOut}>ログアウト</button>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
