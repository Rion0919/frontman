import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "src/styles/header.module.css";
import Link from "next/link";
import { auth } from "../src/pages/api/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/router";

const Header = ({ title, userId }) => {
  const [loginUser, setLoginUser] = useState(userId)
  const route = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        console.log("current user:" + user.email)
        setLoginUser(user.email.substring(0, user.email.indexOf("@")))
      } else {
        console.log('login please')
        route.push('/')
      }
    })
  })
  const onClickSignOut = async () => {
    await signOut(auth)
    await console.log("sign out")
  }
  return (
    <div>
      <Head>
        <title>Frontman</title>
        <meta name="description" content="front manegement system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/hotel.ico" />
      </Head>
      <div className={styles.header}>
        <h1>Frontman</h1>
        {title && <span>{title}</span>}
        <div className={styles.userInfo}>
          <span>{loginUser}</span>
          <Link href="/" className={styles.logout} onClick={onClickSignOut}>
            ログアウト
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
